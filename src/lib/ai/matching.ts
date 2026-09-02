// NEXORA — Candidate retrieval + contextual scoring + confidence/margin
//
// Pipeline stage: given a structured ExecutionEvent and the schedule
// activities, compute per-candidate signals, combine with configured
// weights, rank, and produce a decision (HIGH_CONFIDENCE | NEEDS_REVIEW |
// UNMATCHED) plus a candidate margin.
//
// The schedule database is the source of truth for activity IDs. This module
// never trusts an LLM-suggested activity ID; it only scores activities that
// actually exist in schedule_activities.

import { SCORING_WEIGHTS, THRESHOLDS } from './config'
import { normalizeIdentifier, normalizeWorkType } from './normalization'
import { cosine, embedQuery, buildIndex, type EmbeddingIndex } from './embeddings'
import type {
  CandidateMatch,
  DecisionLabel,
  ExecutionEvent,
  ScheduleActivityDTO,
} from '@/lib/types'

/**
 * Identifier similarity (token-level, normalised). Returns 0..1.
 * Compares the event identifier against the activity's identifier
 * (extracted from activityName / searchText) and the full activityId code.
 */
export function scoreIdentifier(
  eventIdentifier: string | null,
  activity: ScheduleActivityDTO,
): number {
  if (!eventIdentifier) return 0
  const ev = normalizeIdentifier(eventIdentifier)
  if (!ev) return 0
  // Pull candidate identifier tokens from activity name + search text. We
  // collapse spaces so multi-word identifiers ("Cable Tray C-17") match as a
  // single contiguous token against the haystack.
  const haystack = `${activity.activityName} ${activity.searchText}`.toUpperCase()
  const hayNorm = haystack.replace(/\s+/g, '')
  const evTok = ev.toUpperCase()
  const evNorm = evTok.replace(/\s+/g, '')
  // Strong: exact identifier substring appears
  if (hayNorm.includes(evNorm)) return 1
  // Fuzzy: token overlap on the alphanumeric core (strip dashes)
  const evCore = evNorm.replace(/[^A-Z0-9]/g, '')
  const hayCore = hayNorm.replace(/[^A-Z0-9]/g, '')
  if (evCore.length >= 3 && hayCore.includes(evCore)) return 0.9
  // Partial token overlap
  const evTokens = evTok.split(/[^A-Z0-9]+/).filter((t) => t.length > 0)
  const hayTokens = new Set(
    haystack.split(/[^A-Z0-9]+/).filter((t) => t.length > 0),
  )
  if (evTokens.length === 0) return 0
  let hits = 0
  for (const t of evTokens) if (hayTokens.has(t)) hits++
  return hits / evTokens.length
}

export function scoreDiscipline(
  eventDiscipline: string | null,
  activity: ScheduleActivityDTO,
): number {
  if (!eventDiscipline) return 0
  return eventDiscipline.trim().toLowerCase() === activity.discipline.trim().toLowerCase()
    ? 1
    : 0
}

export function scoreWorkType(
  eventWorkType: string | null,
  activity: ScheduleActivityDTO,
): number {
  if (!eventWorkType) return 0
  const evCanon = normalizeWorkType(eventWorkType)
  if (!evCanon) return 0
  // Canonical-to-canonical comparison: normalize the activity's own work
  // (from its name, falling back to name+description) and compare. This
  // handles phrasing differences like "Erect Spool" vs "Spool Erection".
  const actCanon =
    normalizeWorkType(activity.activityName) ??
    normalizeWorkType(`${activity.activityName} ${activity.description}`)
  if (actCanon && actCanon === evCanon) return 1
  // Fallback: full canonical phrase as substring of the activity name +
  // description. (Token-level overlap is intentionally NOT used — it causes
  // false cross-matches like "cable" + "tray" crediting a "Cable Pulling"
  // activity for a "Cable Tray" event.)
  const haystack = `${activity.activityName} ${activity.description}`.toLowerCase()
  const canonKey = evCanon.toLowerCase()
  if (haystack.includes(canonKey)) return 0.9
  return 0
}

/**
 * Date consistency (0..1). Rewards events whose actual dates overlap or are
 * close to the planned window. Returns null when no dates are available.
 */
export function scoreDate(
  event: ExecutionEvent,
  activity: ScheduleActivityDTO,
): number {
  const aStart = event.actualStart ? parseDate(event.actualStart) : null
  const aFinish = event.actualFinish ? parseDate(event.actualFinish) : null
  const pStart = parseDate(activity.plannedStart)
  const pFinish = parseDate(activity.plannedFinish)
  if (!aStart && !aFinish) return 0.5 // neutral when no dates
  const ref = (aFinish ?? aStart)!
  // closeness to planned window
  if (pStart && pFinish) {
    if (ref >= pStart && ref <= pFinish) return 1
    const span = Math.max(1, (pFinish - pStart) / 86400000)
    const dist = Math.min(Math.abs(ref - pStart), Math.abs(ref - pFinish)) / 86400000
    return Math.max(0, 1 - dist / (span * 3))
  }
  return 0.3
}

function parseDate(s: string | null): number | null {
  if (!s) return null
  const t = Date.parse(s)
  return Number.isNaN(t) ? null : t
}

export type ScoredCandidate = CandidateMatch

/**
 * Build a textual query for the event to embed for semantic similarity.
 */
export function eventQueryText(ev: ExecutionEvent): string {
  return [
    ev.discipline ?? '',
    ev.workType ?? '',
    ev.identifier ?? '',
    ev.location ?? '',
  ]
    .filter(Boolean)
    .join(' | ')
}

/**
 * Retrieve + score the top-K candidate activities for an execution event.
 */
export function retrieveCandidates(
  event: ExecutionEvent,
  activities: ScheduleActivityDTO[],
  index: EmbeddingIndex,
  topK: number = THRESHOLDS.topK,
): CandidateMatch[] {
  const queryVec = embedQuery(eventQueryText(event), index)

  const scored: CandidateMatch[] = activities.map((a) => {
    const entry = index.entries.find((e) => e.rowId === a.id)
    const semantic = entry ? cosine(queryVec, entry.vector) : 0
    const identifier = scoreIdentifier(event.identifier, a)
    const discipline = scoreDiscipline(event.discipline, a)
    const workType = scoreWorkType(event.workType, a)
    const date = scoreDate(event, a)
    const finalScore =
      SCORING_WEIGHTS.identifier * identifier +
      SCORING_WEIGHTS.discipline * discipline +
      SCORING_WEIGHTS.workType * workType +
      SCORING_WEIGHTS.semantic * semantic +
      SCORING_WEIGHTS.date * date

    const explanation = buildExplanation({
      identifier,
      discipline,
      workType,
      semantic,
      date,
      finalScore,
    })
    return {
      rowId: a.id,
      activityId: a.activityId,
      activityName: a.activityName,
      discipline: a.discipline,
      location: a.location,
      plannedStart: a.plannedStart,
      plannedFinish: a.plannedFinish,
      actualStart: a.actualStart,
      actualFinish: a.actualFinish,
      status: a.status,
      signals: { identifier, discipline, workType, semantic, date },
      finalScore,
      rank: 0,
      explanation,
    }
  })

  // Filter by discipline when the event discipline is known (candidate
  // retrieval stage of the pipeline). We still keep the top-of-discipline
  // plus a few cross-discipline distractors so the UI can show "why not".
  const eventDisc = event.discipline?.trim().toLowerCase()
  let pool = scored
  if (eventDisc) {
    const inDisc = scored.filter((c) => c.discipline.toLowerCase() === eventDisc)
    const outDisc = scored
      .filter((c) => c.discipline.toLowerCase() !== eventDisc)
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, 2) // keep 2 distractors
    pool = [...inDisc, ...outDisc]
  }

  pool.sort((a, b) => b.finalScore - a.finalScore)
  const top = pool.slice(0, topK).map((c, i) => ({ ...c, rank: i + 1 }))
  return top
}

function buildExplanation(s: {
  identifier: number
  discipline: number
  workType: number
  semantic: number
  date: number
  finalScore: number
}): string[] {
  const out: string[] = []
  if (s.identifier >= 0.9) out.push('Identifier match')
  else if (s.identifier > 0) out.push('Partial identifier overlap')
  if (s.discipline === 1) out.push('Discipline match')
  if (s.workType >= 0.9) out.push('Work type match')
  else if (s.workType > 0) out.push('Partial work-type overlap')
  if (s.semantic >= 0.6) out.push('High semantic similarity')
  else if (s.semantic >= 0.3) out.push('Moderate semantic similarity')
  if (s.date >= 0.9) out.push('Date consistency')
  else if (s.date >= 0.5) out.push('Date plausible')
  return out
}

/**
 * Decide HIGH_CONFIDENCE | NEEDS_REVIEW | UNMATCHED from ranked candidates.
 *
 * Signal-based confidence policy (the schedule DB is the source of truth):
 *
 *  - HIGH_CONFIDENCE: exactly one candidate matches BOTH the identifier and
 *    the work type within the event's discipline, with a final score above
 *    the high-confidence threshold and a candidate margin above the ambiguity
 *    limit. This is the only state that may auto-suggest a schedule update.
 *
 *  - NEEDS_REVIEW: plausible candidates exist (the report clearly belongs to
 *    a discipline and either an identifier or work type narrows it down, but
 *    not to a single clear winner) — OR a generic discipline-level report
 *    ("Pipe work completed") with several same-discipline candidates and no
 *    disambiguator. AI refuses to guess; planner must review.
 *
 *  - UNMATCHED: no candidate is plausible — the report's subject (work type /
 *    identifier) does not correspond to any planned activity. Information is
 *    preserved for human review rather than forced into an unrelated activity.
 */
export function decide(
  candidates: CandidateMatch[],
  event: ExecutionEvent,
): {
  decision: DecisionLabel
  selectedActivityId: string | null
  topScore: number
  secondScore: number
  candidateMargin: number
  explanation: string[]
} {
  const top = candidates[0]
  const second = candidates[1]
  const topScore = top?.finalScore ?? 0
  const secondScore = second?.finalScore ?? 0
  const margin = topScore - secondScore

  if (!top) {
    return unmatched(topScore, 0, 0)
  }

  const hasDiscipline = !!event.discipline
  const sameDiscipline = candidates.filter((c) => c.signals.discipline === 1)

  // No discipline signal at all → rely on raw score
  if (!hasDiscipline || sameDiscipline.length === 0) {
    if (topScore < THRESHOLDS.unmatchedTopScore) return unmatched(topScore, secondScore, margin)
    if (
      top.signals.identifier >= 0.9 &&
      topScore >= THRESHOLDS.highConfidenceScore &&
      margin >= THRESHOLDS.ambiguityMargin
    ) {
      return highConfidence(top, topScore, secondScore, margin)
    }
    return needsReview(top, topScore, secondScore, margin, [
      'No clear discipline signal; ambiguous resolution',
    ])
  }

  // Discipline matches some candidates. Look for a STRONG match = identifier
  // AND work type within the discipline (the disambiguator).
  const strong = sameDiscipline.filter(
    (c) => c.signals.identifier >= 0.9 && c.signals.workType >= 0.5,
  )

  if (strong.length === 1) {
    const best = strong[0]
    if (
      best.finalScore >= THRESHOLDS.highConfidenceScore &&
      best.signals.identifier >= 0.9 &&
      best.signals.workType >= 0.9 &&
      margin >= THRESHOLDS.ambiguityMargin
    ) {
      return highConfidence(best, topScore, secondScore, margin)
    }
    return needsReview(best, topScore, secondScore, margin, [
      'Single strong candidate but confidence below auto-accept threshold',
    ])
  }
  if (strong.length >= 2) {
    return needsReview(strong[0], topScore, secondScore, margin, [
      'Multiple candidates match identifier and work type',
    ])
  }

  // No strong (id + work-type) match.
  const idOnly = sameDiscipline.filter((c) => c.signals.identifier >= 0.9)
  const wtOnly = sameDiscipline.filter((c) => c.signals.workType >= 0.5)

  if (idOnly.length === 0 && wtOnly.length === 0) {
    // No specific signal at all.
    if (event.workType === null) {
      // Generic discipline-level report ("Pipe work completed") → ambiguous
      // which same-discipline activity was meant. Refuse to guess.
      return needsReview(top, topScore, secondScore, margin, [
        'Generic discipline-level report; multiple plausible activities',
        'No identifier or work type to disambiguate',
        'Insufficient evidence for automatic resolution',
      ])
    }
    // Work type present but matches nothing in the schedule → unmatched.
    return unmatched(topScore, secondScore, margin)
  }

  // Has identifier or work-type signal but not both → not confident.
  return needsReview(top, topScore, secondScore, margin, [
    'Partial signal match (identifier or work type, not both)',
    'Insufficient evidence for automatic resolution',
  ])
}

function highConfidence(
  c: CandidateMatch,
  topScore: number,
  secondScore: number,
  margin: number,
) {
  return {
    decision: 'HIGH_CONFIDENCE' as DecisionLabel,
    selectedActivityId: c.activityId,
    topScore,
    secondScore,
    candidateMargin: margin,
    explanation: [
      'Single candidate matches identifier + work type + discipline',
      `Final score ${topScore.toFixed(3)} above high-confidence threshold`,
      `Candidate margin ${margin.toFixed(3)} above ambiguity limit`,
      ...c.explanation,
    ],
  }
}

function needsReview(
  c: CandidateMatch,
  topScore: number,
  secondScore: number,
  margin: number,
  extra: string[],
) {
  return {
    decision: 'NEEDS_REVIEW' as DecisionLabel,
    selectedActivityId: c.activityId,
    topScore,
    secondScore,
    candidateMargin: margin,
    explanation: [...extra, `Top candidate ${c.activityId} (score ${topScore.toFixed(2)})`, 'Insufficient evidence for automatic resolution'],
  }
}

function unmatched(topScore: number, secondScore: number, margin: number) {
  return {
    decision: 'UNMATCHED' as DecisionLabel,
    selectedActivityId: null,
    topScore,
    secondScore,
    candidateMargin: margin,
    explanation: [
      'No sufficiently similar planned activity found',
      'Information preserved for human review',
    ],
  }
}

export function buildIndexFromActivities(activities: ScheduleActivityDTO[]): EmbeddingIndex {
  return buildIndex(
    activities.map((a) => ({ rowId: a.id, activityId: a.activityId, searchText: a.searchText })),
  )
}
