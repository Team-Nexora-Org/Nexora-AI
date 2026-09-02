// NEXORA — Full resolution pipeline orchestrator (server-only)
//
// FIELD REPORT -> STRUCTURED EXTRACTION -> NORMALIZATION ->
// CANDIDATE RETRIEVAL -> CONTEXTUAL SCORING -> RERANKING ->
// CONFIDENCE + CANDIDATE MARGIN -> HIGH_CONFIDENCE / NEEDS_REVIEW / UNMATCHED

import { db } from '@/lib/db'
import type {
  CandidateMatch,
  ExecutionEvent,
  InputType,
  ResolutionResult,
  ScheduleActivityDTO,
} from '@/lib/types'
import { extractExecutionEvent } from './extraction'
import {
  buildIndexFromActivities,
  decide,
  retrieveCandidates,
} from './matching'

/**
 * Load all schedule activities as DTOs (the source of truth for activity IDs).
 */
export async function loadActivities(projectId?: string): Promise<ScheduleActivityDTO[]> {
  const rows = await db.scheduleActivity.findMany({
    where: projectId ? { projectId } : undefined,
    orderBy: { activityId: 'asc' },
  })
  return rows.map((r) => ({
    id: r.id,
    activityId: r.activityId,
    wbs: r.wbs,
    discipline: r.discipline,
    activityName: r.activityName,
    description: r.description,
    location: r.location,
    plannedStart: r.plannedStart,
    plannedFinish: r.plannedFinish,
    actualStart: r.actualStart,
    actualFinish: r.actualFinish,
    status: r.status,
    searchText: r.searchText,
  }))
}

let cachedIndex: { projectId: string; index: ReturnType<typeof buildIndexFromActivities>; sig: string } | null = null

/**
 * Resolve a raw field report against the schedule. Pure-ish: performs the LLM
 * extraction call + in-memory matching. Does NOT persist anything — the
 * caller (API route) handles persistence + audit.
 */
export async function resolveReport(opts: {
  rawText: string
  inputType: InputType
  activities: ScheduleActivityDTO[]
}): Promise<ResolutionResult> {
  const executionEvent = await extractExecutionEvent(opts.rawText, opts.inputType)

  // Build/cache the embedding index. The cache key includes BOTH the row ids
  // (cuids) and activity codes so that a demo reset (which re-creates rows
  // with new ids) invalidates the cache — otherwise stale row ids would make
  // every semantic lookup miss and return 0.
  const sig = opts.activities.map((a) => `${a.id}:${a.activityId}`).join(',').slice(0, 800)
  let index =
    cachedIndex && cachedIndex.sig === sig ? cachedIndex.index : null
  if (!index) {
    index = buildIndexFromActivities(opts.activities)
    cachedIndex = { projectId: '', index, sig }
  }

  const candidates = retrieveCandidates(executionEvent, opts.activities, index)
  const verdict = decide(candidates, executionEvent)

  return {
    executionEvent,
    candidates,
    selectedActivityId: verdict.selectedActivityId,
    topScore: verdict.topScore,
    secondScore: verdict.secondScore,
    candidateMargin: verdict.candidateMargin,
    decision: verdict.decision,
    explanation: verdict.explanation,
    rawText: opts.rawText,
    inputType: opts.inputType,
  }
}

/**
 * Decide whether a candidate activity change (planner "Change Match") should be
 * accepted. Validates that the selected activity actually exists in
 * schedule_activities — never trusts an arbitrary ID.
 */
export function validateSelectedActivity(
  selectedActivityId: string,
  activities: ScheduleActivityDTO[],
): ScheduleActivityDTO | null {
  return (
    activities.find((a) => a.activityId === selectedActivityId) ?? null
  )
}

export type { CandidateMatch }
