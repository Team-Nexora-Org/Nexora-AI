import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getRole } from '@/lib/auth'
import { resolveReport, loadActivities } from '@/lib/ai/pipeline'
import type { InputType } from '@/lib/types'
import * as XLSX from 'xlsx'

// Minimal PDF text extractor: pulls strings shown via Tj/TJ operators.
// Not a full PDF parser — sufficient for text-based PDFs in the demo.
function extractPdfText(buf: Buffer): string {
  const text = buf.toString('latin1')
  const out: string[] = []
  const re = /\(((?:\\.|[^()\\])*)\)\s*Tj/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    const s = m[1]
      .replace(/\\(\(|\)|\\)/g, '$1')
      .replace(/\\n/g, ' ')
      .replace(/\\r/g, ' ')
      .replace(/\\t/g, ' ')
    if (s.trim()) out.push(s)
  }
  // TJ arrays: [ (str1) (str2) ] TJ
  const re2 = /\[((?:\((?:\\.|[^()\\])*\)\s*)+)\]\s*TJ/g
  while ((m = re2.exec(text)) !== null) {
    const inner = m[1].match(/\(((?:\\.|[^()\\])*)\)/g) ?? []
    for (const piece of inner) {
      const s = piece
        .slice(1, -1)
        .replace(/\\(\(|\)|\\)/g, '$1')
        .replace(/\\[nrt]/g, ' ')
      if (s.trim()) out.push(s)
    }
  }
  return out.join(' ').replace(/\s+/g, ' ').trim()
}

function parseCsvText(text: string): string {
  const lines = text.split(/\r?\n/).filter((l) => l.trim())
  return lines.join(' | ')
}

function parseXlsx(buf: Buffer): string {
  const wb = XLSX.read(buf, { type: 'buffer' })
  const rows: string[] = []
  for (const sheetName of wb.SheetNames) {
    const sheet = wb.Sheets[sheetName]
    const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: '',
    })
    for (const row of json) {
      const cells = Object.values(row).map((v) => String(v ?? '').trim()).filter(Boolean)
      if (cells.length) rows.push(cells.join(' | '))
    }
  }
  return rows.join('\n').trim()
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120)
}

// POST /api/reports/upload — multipart file ingestion (.txt, .csv, .xlsx, .pdf)
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: 'No file uploaded.' },
        { status: 400 },
      )
    }
    const filename = sanitizeFilename(file.name)
    const lower = filename.toLowerCase()
    let inputType: InputType = 'text'
    if (lower.endsWith('.csv')) inputType = 'csv'
    else if (lower.endsWith('.xlsx') || lower.endsWith('.xls')) inputType = 'excel'
    else if (lower.endsWith('.pdf')) inputType = 'pdf'
    else if (lower.endsWith('.txt')) inputType = 'text'

    const buf = Buffer.from(await file.arrayBuffer())
    let extracted = ''
    try {
      if (inputType === 'csv') {
        extracted = parseCsvText(buf.toString('utf8'))
      } else if (inputType === 'excel') {
        extracted = parseXlsx(buf)
      } else if (inputType === 'pdf') {
        extracted = extractPdfText(buf)
        if (!extracted || extracted.length < 20) {
          return NextResponse.json({
            ok: false,
            error:
              'PDF text extraction returned little or no text. Please paste the report text directly, or upload a .txt/.csv/.xlsx file.',
            filename,
          })
        }
      } else {
        extracted = buf.toString('utf8')
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Unable to process this file. Please verify the format.', filename },
        { status: 422 },
      )
    }

    if (!extracted.trim()) {
      return NextResponse.json(
        { ok: false, error: 'No readable text found in the uploaded file.', filename },
        { status: 422 },
      )
    }
    if (extracted.length > 8000) extracted = extracted.slice(0, 8000)

    const role = await getRole()
    let supervisor =
      role?.type === 'supervisor' && role.supervisorId
        ? await db.supervisor.findUnique({ where: { id: role.supervisorId } })
        : null
    if (!supervisor) supervisor = await db.supervisor.findFirst({ where: { discipline: 'Piping' } })
    if (!supervisor) {
      return NextResponse.json(
        { ok: false, error: 'No supervisors seeded. Run /api/seed first.' },
        { status: 409 },
      )
    }
    const project = await db.project.findFirst()
    if (!project) {
      return NextResponse.json(
        { ok: false, error: 'No project seeded. Run /api/seed first.' },
        { status: 409 },
      )
    }

    const report = await db.fieldReport.create({
      data: {
        projectId: project.id,
        supervisorId: supervisor.id,
        supervisorName: supervisor.name,
        discipline: supervisor.discipline,
        inputType,
        rawContent: extracted,
        fileUrl: filename,
        reportDate: new Date().toISOString().slice(0, 10),
      },
    })
    await db.auditLog.create({
      data: {
        entityType: 'FieldReport',
        entityId: report.id,
        action: 'SUBMITTED',
        actor: supervisor.name,
        metadata: JSON.stringify({ inputType, filename, discipline: supervisor.discipline }),
      },
    })

    const activities = await loadActivities(project.id)
    const result = await resolveReport({ rawText: extracted, inputType, activities })

    const executionEvent = await db.executionEvent.create({
      data: {
        reportId: report.id,
        discipline: result.executionEvent.discipline ?? '',
        workType: result.executionEvent.workType ?? '',
        identifier: result.executionEvent.identifier ?? '',
        location: result.executionEvent.location ?? '',
        actualStart: result.executionEvent.actualStart,
        actualFinish: result.executionEvent.actualFinish,
        status: result.executionEvent.status ?? '',
        quantity: result.executionEvent.quantity,
        unit: result.executionEvent.unit,
        evidence: result.executionEvent.evidence,
      },
    })
    const activityByCode = new Map(activities.map((a) => [a.activityId, a]))
    let topMatchId: string | null = null
    for (const c of result.candidates) {
      const row = await db.activityMatch.create({
        data: {
          executionEventId: executionEvent.id,
          activityId: c.activityId,
          scheduleActivityRowId: activityByCode.get(c.activityId)?.id ?? null,
          semanticScore: c.signals.semantic,
          identifierScore: c.signals.identifier,
          disciplineScore: c.signals.discipline,
          workTypeScore: c.signals.workType,
          dateScore: c.signals.date,
          finalScore: c.finalScore,
          candidateMargin: result.candidateMargin,
          rank: c.rank,
          isTop: c.rank === 1,
          explanation: JSON.stringify(c.explanation),
        },
      })
      if (c.rank === 1) topMatchId = row.id
    }
    await db.auditLog.create({
      data: {
        entityType: 'FieldReport',
        entityId: report.id,
        action: 'RESOLVED',
        actor: 'NEXORA-AI',
        metadata: JSON.stringify({
          decision: result.decision,
          selectedActivityId: result.selectedActivityId,
          topScore: result.topScore,
          candidateMargin: result.candidateMargin,
          topMatchId,
        }),
      },
    })

    return NextResponse.json({
      ok: true,
      reportId: report.id,
      filename,
      inputType,
      extractedPreview: extracted.slice(0, 400),
      result,
    })
  } catch (err) {
    console.error('[nexora] /api/reports/upload failed:', err)
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    )
  }
}
