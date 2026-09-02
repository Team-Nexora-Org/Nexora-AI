// NEXORA — Evaluation: baseline (keyword/fuzzy) vs NEXORA (semantic+contextual)
//
// For each ground-truth field report we run BOTH matchers and compare their
// top candidate / decision against the expected activity + expected decision.
// To keep the evaluation deterministic and free of unnecessary LLM calls, the
// NEXORA path here uses the deterministic heuristic extractor (the matching
// stage — the actual differentiator — is identical to live). The LLM extractor
// is exercised live by the supervisor flow.

import { db } from '@/lib/db'
import {
  buildIndexFromActivities,
  retrieveCandidates,
  decide,
} from './matching'
import { getGroundTruth, type GroundTruthRow } from '@/lib/seed'
import type {
  EvaluationMetrics,
  ExecutionEvent,
  ScheduleActivityDTO,
} from '@/lib/types'
import { heuristicExtract } from './extraction'

// Baseline keyword/fuzzy matcher: substring token overlap between raw report
// and activity searchText, with an AGGRESSIVE auto-link threshold (the
// realistic failure mode of naive keyword matching — it confidently links
// ambiguous/unmatched reports to the closest keyword hit, producing false
// auto-links). No semantic understanding, no normalization, no ambiguity
// model.
function baselineMatch(
  raw: string,
  activities: ScheduleActivityDTO[],
): {
  topActivityId: string | null
  top3: string[]
  decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED'
  topScore: number
  secondScore: number
} {
  const tokens = raw
    .toLowerCase()
    .replace(/[^a-z0-9\-/]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1)
  if (tokens.length === 0) {
    return { topActivityId: null, top3: [], decision: 'UNMATCHED', topScore: 0, secondScore: 0 }
  }
  const scored = activities.map((a) => {
    const hay = a.searchText.toLowerCase()
    let hits = 0
    for (const t of tokens) {
      // substring fuzzy match (e.g. "pipe" matches "piping")
      if (hay.includes(t)) hits++
    }
    return { activityId: a.activityId, score: hits / tokens.length }
  })
  scored.sort((a, b) => b.score - a.score)
  const top = scored[0]
  const second = scored[1]
  const topScore = top?.score ?? 0
  const secondScore = second?.score ?? 0
  // Aggressive: auto-link whenever the top keyword hit is decent.
  let decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED' = 'UNMATCHED'
  if (topScore >= 0.25) decision = 'HIGH_CONFIDENCE'
  else if (topScore >= 0.1) decision = 'NEEDS_REVIEW'
  return {
    topActivityId: top?.activityId ?? null,
    top3: scored.slice(0, 3).map((s) => s.activityId),
    decision,
    topScore,
    secondScore,
  }
}

async function nexoraMatch(
  raw: string,
  _inputType: 'text' | 'voice' | 'excel' | 'csv' | 'pdf',
  activities: ScheduleActivityDTO[],
  index: ReturnType<typeof buildIndexFromActivities>,
): Promise<{ topActivityId: string | null; top3: string[]; decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED'; event: ExecutionEvent }> {
  // Evaluation uses the deterministic heuristic extractor to avoid unnecessary
  // LLM calls and keep the comparison reproducible. The matching stage
  // (semantic retrieval + contextual scoring + confidence policy) is the
  // actual differentiator under test.
  const event = heuristicExtract(raw)
  const candidates = retrieveCandidates(event, activities, index)
  const verdict = decide(candidates, event)
  return {
    topActivityId: verdict.selectedActivityId,
    top3: candidates.slice(0, 3).map((c) => c.activityId),
    decision: verdict.decision,
    event,
  }
}

function computeMetrics(
  label: string,
  rows: GroundTruthRow[],
  results: {
    topActivityId: string | null
    top3: string[]
    decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED'
  }[],
): EvaluationMetrics {
  const total = rows.length
  const realGtRows = rows.filter((r) => r.ground_truth_activity_id !== 'AMBIGUOUS' && r.ground_truth_activity_id !== 'UNMATCHED')
  let top1Hits = 0
  let top3Hits = 0
  let highConfTotal = 0
  let highConfCorrect = 0
  let falseAutoLinks = 0
  let ambiguousDetected = 0
  let unmatchedDetected = 0

  for (let i = 0; i < rows.length; i++) {
    const gt = rows[i]
    const res = results[i]
    const gtId = gt.ground_truth_activity_id
    const isRealGt = gtId !== 'AMBIGUOUS' && gtId !== 'UNMATCHED'

    if (isRealGt) {
      if (res.topActivityId === gtId) top1Hits++
      if (res.top3.includes(gtId)) top3Hits++
    }
    if (res.decision === 'HIGH_CONFIDENCE') {
      highConfTotal++
      if (isRealGt && res.topActivityId === gtId) highConfCorrect++
      else falseAutoLinks++ // auto-linked a wrong/ambiguous/unmatched report
    }
    if (gt.expected_decision === 'NEEDS_REVIEW' && res.decision === 'NEEDS_REVIEW') ambiguousDetected++
    if (gt.expected_decision === 'UNMATCHED' && res.decision === 'UNMATCHED') unmatchedDetected++
  }

  return {
    label,
    total,
    top1Accuracy: realGtRows.length ? top1Hits / realGtRows.length : 0,
    top3Recall: realGtRows.length ? top3Hits / realGtRows.length : 0,
    highConfidencePrecision: highConfTotal ? highConfCorrect / highConfTotal : 0,
    falseAutoLinkRate: total ? falseAutoLinks / total : 0,
    ambiguousDetected,
    unmatchedDetected,
  }
}

export async function runEvaluation(): Promise<{
  baseline: EvaluationMetrics
  nexora: EvaluationMetrics
}> {
  const dbActivities = await db.scheduleActivity.findMany({ orderBy: { activityId: 'asc' } })
  const activities: ScheduleActivityDTO[] = dbActivities.map((a) => ({
    id: a.id,
    activityId: a.activityId,
    wbs: a.wbs,
    discipline: a.discipline,
    activityName: a.activityName,
    description: a.description,
    location: a.location,
    plannedStart: a.plannedStart,
    plannedFinish: a.plannedFinish,
    actualStart: a.actualStart,
    actualFinish: a.actualFinish,
    status: a.status,
    searchText: a.searchText,
  }))
  const index = buildIndexFromActivities(activities)
  const groundTruth = getGroundTruth()

  const baselineResults: { topActivityId: string | null; top3: string[]; decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED' }[] = []
  const nexoraResults: { topActivityId: string | null; top3: string[]; decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED' }[] = []

  for (const row of groundTruth) {
    const b = baselineMatch(row.raw_text, activities)
    baselineResults.push(b)
    const n = await nexoraMatch(
      row.raw_text,
      row.input_type as 'text' | 'voice',
      activities,
      index,
    )
    nexoraResults.push({
      topActivityId: n.topActivityId,
      top3: n.top3,
      decision: n.decision,
    })
  }

  const baseline = computeMetrics('baseline', groundTruth, baselineResults)
  const nexora = computeMetrics('nexora', groundTruth, nexoraResults)

  // Persist
  await db.modelEvaluation.deleteMany({})
  await db.modelEvaluation.create({
    data: {
      label: 'baseline',
      total: baseline.total,
      top1Accuracy: baseline.top1Accuracy,
      top3Recall: baseline.top3Recall,
      highConfidencePrecision: baseline.highConfidencePrecision,
      falseAutoLinkRate: baseline.falseAutoLinkRate,
      ambiguousDetected: baseline.ambiguousDetected,
      unmatchedDetected: baseline.unmatchedDetected,
      metricsJson: JSON.stringify(baseline),
    },
  })
  await db.modelEvaluation.create({
    data: {
      label: 'nexora',
      total: nexora.total,
      top1Accuracy: nexora.top1Accuracy,
      top3Recall: nexora.top3Recall,
      highConfidencePrecision: nexora.highConfidencePrecision,
      falseAutoLinkRate: nexora.falseAutoLinkRate,
      ambiguousDetected: nexora.ambiguousDetected,
      unmatchedDetected: nexora.unmatchedDetected,
      metricsJson: JSON.stringify(nexora),
    },
  })

  return { baseline, nexora }
}

export async function getEvaluation(): Promise<{
  baseline: EvaluationMetrics | null
  nexora: EvaluationMetrics | null
}> {
  const rows = await db.modelEvaluation.findMany({ orderBy: { createdAt: 'desc' } })
  const baseline = rows.find((r) => r.label === 'baseline')
  const nexora = rows.find((r) => r.label === 'nexora')
  const parse = (r: typeof rows[number] | undefined): EvaluationMetrics | null =>
    r
      ? {
          label: r.label,
          total: r.total,
          top1Accuracy: r.top1Accuracy,
          top3Recall: r.top3Recall,
          highConfidencePrecision: r.highConfidencePrecision,
          falseAutoLinkRate: r.falseAutoLinkRate,
          ambiguousDetected: r.ambiguousDetected,
          unmatchedDetected: r.unmatchedDetected,
        }
      : null
  return { baseline: parse(baseline), nexora: parse(nexora) }
}
