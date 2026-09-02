// NEXORA — Structured extraction (LLM via z-ai-web-dev-sdk, server-only)
//
// Stage 1 of the pipeline: turn a free-text field report into a structured
// ExecutionEvent. The LLM is used ONLY for extraction. It must NEVER invent
// schedule activity IDs — activity IDs are always selected from
// schedule_activities by the matching stage.
//
// On any failure (SDK unavailable / parse error / network), we fall back to a
// deterministic heuristic extractor so the demo workflow keeps working. The
// matching stage (which actually resolves to the schedule) is always real.

import ZAI from 'z-ai-web-dev-sdk'
import type { ExecutionEvent, InputType } from '@/lib/types'
import { normalizeDiscipline, normalizeWorkType } from './normalization'

const SYSTEM_PROMPT = `You are the NEXORA structured-event extractor for infrastructure construction field reports.
You convert a supervisor's free-text field report into a single structured execution event.

RULES (do not break these):
- Output ONLY a JSON object. No markdown, no code fences, no commentary.
- Field reports may be in English, Hindi-English (Hinglish), or mixed.
- Translate/normalize values to canonical English.
- discipline must be one of: Civil, Mechanical, Piping, Electrical, Instrumentation.
- work_type must be a short canonical phrase (e.g. "Spool Erection", "Concrete", "Cable Tray").
- identifier is the line / tag / equipment code the supervisor refers to (e.g. "Line 24-XX", "F-102", "C-17", "P-101").
- location is the area / unit, e.g. "Unit 2", "Compressor Area", "Unit 4". Infer it from context when possible.
- DATES: the demo project's schedule year is 2026. All reported dates are in 2026. If the report does not state a year, use 2026. NEVER use a year other than 2026 unless the report explicitly and unambiguously states a different year. Return dates as ISO YYYY-MM-DD.
- actual_start and actual_finish MUST be ISO dates (YYYY-MM-DD). If only a single date is given for a completed activity, infer a 1-2 day window (start a day or two before finish). If unavailable, return null.
- status: "Completed" | "In Progress" | "Delayed" | null.
- evidence: a SHORT verbatim quote from the report supporting the extraction (<= 120 chars). Do not invent quotes.
- NEVER invent an activity ID (Axxxxx). You are not asked for one.
- If a field cannot be determined, return null — never fabricate.

SCHEMA:
{
  "discipline": string | null,
  "work_type": string | null,
  "identifier": string | null,
  "location": string | null,
  "actual_start": string | null,
  "actual_finish": string | null,
  "status": string | null,
  "quantity": string | null,
  "unit": string | null,
  "evidence": string | null
}`

export async function extractExecutionEvent(
  rawText: string,
  inputType: InputType = 'text',
): Promise<ExecutionEvent> {
  const trimmed = rawText.trim()
  if (!trimmed) return emptyEvent()

  try {
    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Field report (input_type=${inputType}):\n"""${trimmed}"""\n\nReturn the JSON object now.`,
        },
      ],
      thinking: { type: 'disabled' },
    })
    const content = completion.choices[0]?.message?.content ?? ''
    const parsed = safeParseJson(content)
    if (parsed) return normalizeEvent(parsed, trimmed)
  } catch (err) {
    // Fall through to heuristic extraction
    console.error('[nexora] extraction LLM failed, using heuristic fallback:', (err as Error).message)
  }
  return heuristicExtract(trimmed)
}

function emptyEvent(): ExecutionEvent {
  return {
    discipline: null,
    workType: null,
    identifier: null,
    location: null,
    actualStart: null,
    actualFinish: null,
    status: null,
    quantity: null,
    unit: null,
    evidence: null,
  }
}

function safeParseJson(content: string): Record<string, unknown> | null {
  if (!content) return null
  // strip code fences if present
  const cleaned = content
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim()
  // find first { ... last }
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  const slice = cleaned.slice(start, end + 1)
  try {
    return JSON.parse(slice)
  } catch {
    return null
  }
}

function normalizeEvent(parsed: Record<string, unknown>, raw: string): ExecutionEvent {
  const discipline = normalizeDiscipline(str(parsed.discipline))
  const workType = normalizeWorkType(str(parsed.work_type)) ?? str(parsed.work_type)
  return {
    discipline,
    workType,
    identifier: str(parsed.identifier),
    location: str(parsed.location),
    actualStart: toIsoDate(str(parsed.actual_start)),
    actualFinish: toIsoDate(str(parsed.actual_finish)),
    status: canonicalStatus(str(parsed.status)),
    quantity: str(parsed.quantity),
    unit: str(parsed.unit),
    evidence: str(parsed.evidence) ?? raw.slice(0, 120),
  }
}

// Coerce a date-ish string to ISO YYYY-MM-DD. Accepts ISO, "29 August 2026",
// "29 Aug 2026", "Aug 29 2026", "2026/08/29", etc. Returns null if unparseable.
function toIsoDate(v: string | null): string | null {
  if (!v) return null
  const s = v.trim()
  if (!s || s.toLowerCase() === 'null') return null
  // Already ISO
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`
  const t = Date.parse(s)
  if (!Number.isNaN(t)) {
    const d = new Date(t)
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
  }
  // "29 Aug" / "29 August" -> assume demo project year 2026
  const months = 'jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec'
  const m = s.match(new RegExp(`(\\d{1,2})\\s*(${months})[a-z]*\\s*(\\d{4})?`, 'i'))
  if (m) {
    const day = m[1].padStart(2, '0')
    const mon = String(monthIdx(m[2])).padStart(2, '0')
    const year = m[3] ?? '2026'
    return `${year}-${mon}-${day}`
  }
  const m2 = s.match(new RegExp(`(${months})[a-z]*\\s*(\\d{1,2})\\s*(\\d{4})?`, 'i'))
  if (m2) {
    const day = m2[2].padStart(2, '0')
    const mon = String(monthIdx(m2[1])).padStart(2, '0')
    const year = m2[3] ?? '2026'
    return `${year}-${mon}-${day}`
  }
  return null
}

function str(v: unknown): string | null {
  if (v === null || v === undefined) return null
  const s = String(v).trim()
  return s === '' ? null : s
}

function canonicalStatus(v: string | null): string | null {
  if (!v) return null
  const l = v.toLowerCase()
  if (l.includes('complete')) return 'Completed'
  if (l.includes('progress') || l.includes('start') || l.includes('ongoing')) return 'In Progress'
  if (l.includes('delay')) return 'Delayed'
  return v
}

// ---------------------------------------------------------------------------
// Heuristic fallback — deterministic, honest. Used only when the LLM is
// unavailable. Still produces a real structured event (not a fake match).
// Also exported for evaluation (which intentionally avoids unnecessary LLM
// calls — the matching stage is the differentiator under test).
// ---------------------------------------------------------------------------
export function heuristicExtract(raw: string): ExecutionEvent {
  const lower = raw.toLowerCase()
  const discipline = detectDiscipline(lower)
  const workType = detectWorkType(lower)
  const identifier = detectIdentifier(raw)
  const dates = detectDates(lower)
  const status: string | null = lower.includes('complete') || lower.includes('finished') || lower.includes('ho gaya') || lower.includes('ho gayi') || lower.includes('kar diya')
    ? 'Completed'
    : lower.includes('start') || lower.includes('shuru')
      ? 'In Progress'
      : null
  const location = detectLocation(lower)
  return {
    discipline,
    workType,
    identifier,
    location,
    actualStart: dates.start,
    actualFinish: dates.finish,
    status,
    quantity: null,
    unit: null,
    evidence: raw.slice(0, 120),
  }
}

function detectDiscipline(lower: string): string | null {
  if (/(pipe|spool|weld|hydrotest|line \d)/.test(lower)) return 'Piping'
  if (/(civil|concrete|found|excavat|rebar|trench|backfill|curb|pedestal)/.test(lower)) return 'Civil'
  if (/(pump|compressor|heat exchanger|vessel|align|grout|mechanical)/.test(lower)) return 'Mechanical'
  if (/(cable|tray|lighting|earth|termination|megger|junction box|mcc)/.test(lower)) return 'Electrical'
  if (/(instrument|transmitter|calibrat|loop test|control valve|level switch)/.test(lower)) return 'Instrumentation'
  return null
}

function detectWorkType(lower: string): string | null {
  if (/(drainage)/.test(lower)) return 'Drainage'
  if (/(spool|erection|erect)/.test(lower)) return 'Spool Erection'
  if (/(hydrotest)/.test(lower)) return 'Hydrotest'
  if (/(weld)/.test(lower)) return 'Welding'
  if (/(cable tray|tray install)/.test(lower)) return 'Cable Tray'
  if (/(cable pull|pulling)/.test(lower)) return 'Cable Pulling'
  if (/(concrete|casting|cast|pedestal)/.test(lower)) return 'Concrete'
  if (/(excavat)/.test(lower)) return 'Excavation'
  if (/(rebar|reinforcement)/.test(lower)) return 'Rebar'
  if (/(backfill)/.test(lower)) return 'Backfill'
  if (/(install pump|pump install|compressor install|heat exchanger|vessel install)/.test(lower)) return 'Equipment Installation'
  if (/(align)/.test(lower)) return 'Alignment'
  if (/(transmitter|level switch|instrument install)/.test(lower)) return 'Instrument Installation'
  if (/(calibrat)/.test(lower)) return 'Calibration'
  if (/(loop test)/.test(lower)) return 'Loop Test'
  if (/(control valve)/.test(lower)) return 'Control Valve'
  return null
}

function detectIdentifier(raw: string): string | null {
  // Line 24-XX / 24-XX / F-102 / C-17 / P-101 / TT-101 / Line XX-XX
  const lineMatch = raw.match(/\b(line\s*)?(\d{1,3}-[a-z]{1,4})\b/i)
  if (lineMatch) return `Line ${lineMatch[2].toUpperCase()}`
  const eqMatch = raw.match(/\b([a-z]{1,3}-\d{1,4})\b/i)
  if (eqMatch) return eqMatch[1].toUpperCase()
  return null
}

function detectDates(lower: string): { start: string | null; finish: string | null } {
  const months = 'jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec'
  const re = new RegExp(`(\\d{1,2})\\s*(${months})`, 'gi')
  const found: { day: number; m: number }[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(lower)) !== null) {
    const day = parseInt(m[1], 10)
    const mIdx = monthIdx(m[2])
    if (mIdx >= 0) found.push({ day, m: mIdx })
  }
  if (found.length === 0) return { start: null, finish: null }
  // demo project year is 2026
  const year = 2026
  const toIso = (d: number, m: number) =>
    `${year}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  if (found.length === 1) {
    const iso = toIso(found[0].day, found[0].m)
    return { start: iso, finish: iso }
  }
  found.sort((a, b) => a.m - b.m || a.day - b.day)
  return { start: toIso(found[0].day, found[0].m), finish: toIso(found[1].day, found[1].m) }
}

function monthIdx(m: string): number {
  const map: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  }
  return map[m.toLowerCase().slice(0, 3)] ?? -1
}

function detectLocation(lower: string): string | null {
  if (/compressor area/.test(lower)) return 'Compressor Area'
  const unitMatch = lower.match(/unit\s*(\d)/)
  if (unitMatch) return `Unit ${unitMatch[1]}`
  return null
}
