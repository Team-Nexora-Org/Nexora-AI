import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getRole } from '@/lib/auth'
import { resolveReport, loadActivities } from '@/lib/ai/pipeline'
import type { InputType, ResolutionResult } from '@/lib/types'

// POST /api/reports — submit a field report and run the full AI resolution.
// Body: { supervisorId?, inputType, rawContent }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const inputType = (body?.inputType as InputType) ?? 'text'
    const rawContent = (body?.rawContent as string) ?? ''
    if (!rawContent.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Empty report content.' },
        { status: 400 },
      )
    }

    const role = await getRole()
    // Resolve the supervisor. Prefer the logged-in supervisor; fall back to a
    // supervisorId supplied in the body (e.g. demo mode), else default to the
    // first Piping supervisor.
    let supervisorId = role?.type === 'supervisor' ? role.supervisorId : (body?.supervisorId as string | undefined)
    let supervisor =
      supervisorId ? await db.supervisor.findUnique({ where: { id: supervisorId } }) : null
    if (!supervisor) {
      supervisor = await db.supervisor.findFirst({ where: { discipline: 'Piping' } })
    }
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

    // 1. Persist the raw field report
    const report = await db.fieldReport.create({
      data: {
        projectId: project.id,
        supervisorId: supervisor.id,
        supervisorName: supervisor.name,
        discipline: supervisor.discipline,
        inputType,
        rawContent,
        reportDate: new Date().toISOString().slice(0, 10),
      },
    })

    await db.auditLog.create({
      data: {
        entityType: 'FieldReport',
        entityId: report.id,
        action: 'SUBMITTED',
        actor: supervisor.name,
        metadata: JSON.stringify({ inputType, discipline: supervisor.discipline }),
      },
    })

    // 2. Run the resolution pipeline (extraction -> normalization ->
    //    candidate retrieval -> contextual scoring -> confidence/margin)
    const activities = await loadActivities(project.id)
    const result: ResolutionResult = await resolveReport({
      rawText: rawContent,
      inputType,
      activities,
    })

    // 3. Persist the structured execution event + candidates
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
          secondScore: result.secondScore,
          candidateMargin: result.candidateMargin,
          topMatchId,
        }),
      },
    })

    return NextResponse.json({
      ok: true,
      reportId: report.id,
      result,
    })
  } catch (err) {
    console.error('[nexora] /api/reports failed:', err)
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    )
  }
}
