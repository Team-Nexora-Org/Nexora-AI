import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import type { PlannerInboxItem } from '@/lib/types'

// GET /api/planner/inbox — all field reports with their AI resolution +
// planner decision state, newest first.
export async function GET() {
  const reports = await db.fieldReport.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      executionEvent: {
        include: {
          activityMatches: {
            where: { isTop: true },
            take: 1,
          },
        },
      },
    },
  })

  // Pull all RESOLVED audit metadata (decision source of truth)
  const resolvedAudits = await db.auditLog.findMany({
    where: { action: 'RESOLVED', entityType: 'FieldReport' },
  })
  const decisionByReport = new Map<string, { decision: string; selectedActivityId: string | null; topScore: number }>()
  for (const a of resolvedAudits) {
    try {
      const meta = JSON.parse(a.metadata ?? '{}')
      decisionByReport.set(a.entityId, {
        decision: meta.decision,
        selectedActivityId: meta.selectedActivityId,
        topScore: meta.topScore,
      })
    } catch {
      /* ignore */
    }
  }

  const plannerDecisions = await db.plannerDecision.findMany()
  const decisionByMatch = new Map(plannerDecisions.map((d) => [d.matchId, d]))

  // Map activityId -> activityName for display
  const activities = await db.scheduleActivity.findMany()
  const nameByCode = new Map(activities.map((a) => [a.activityId, a.activityName]))

  const items: PlannerInboxItem[] = reports.map((r) => {
    const topMatch = r.executionEvent?.activityMatches[0]
    const dec = decisionByReport.get(r.id)
    const plannerDec = topMatch ? decisionByMatch.get(topMatch.id) : undefined
    return {
      reportId: r.id,
      supervisorName: r.supervisorName,
      discipline: r.discipline,
      inputType: r.inputType as PlannerInboxItem['inputType'],
      rawContent: r.rawContent,
      reportDate: r.reportDate,
      createdAt: r.createdAt.toISOString(),
      resolved: !!r.executionEvent,
      decision: (dec?.decision as PlannerInboxItem['decision']) ?? null,
      selectedActivityId: dec?.selectedActivityId ?? null,
      selectedActivityName: dec?.selectedActivityId ? nameByCode.get(dec.selectedActivityId) ?? null : null,
      topScore: dec?.topScore ?? null,
      plannerAction: (plannerDec?.decision as PlannerInboxItem['plannerAction']) ?? null,
      plannerName: plannerDec?.plannerName ?? null,
    }
  })

  return NextResponse.json({ items })
}
