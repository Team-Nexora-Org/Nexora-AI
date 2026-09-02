import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/planner/review/[id] — full resolution detail for a report.
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const report = await db.fieldReport.findUnique({
    where: { id },
    include: {
      executionEvent: {
        include: {
          activityMatches: {
            orderBy: { rank: 'asc' },
          },
        },
      },
    },
  })
  if (!report) {
    return NextResponse.json({ ok: false, error: 'Report not found.' }, { status: 404 })
  }
  if (!report.executionEvent) {
    return NextResponse.json({ ok: false, error: 'Report not yet resolved.' }, { status: 409 })
  }

  const topMatch = report.executionEvent.activityMatches.find((m) => m.isTop)
  const resolvedAudit = await db.auditLog.findFirst({
    where: { action: 'RESOLVED', entityType: 'FieldReport', entityId: report.id },
  })
  const decisionMeta = resolvedAudit
    ? JSON.parse(resolvedAudit.metadata ?? '{}')
    : {}

  const plannerDecision = topMatch
    ? await db.plannerDecision.findUnique({ where: { matchId: topMatch.id } })
    : null

  // Hydrate candidate activities
  const activityIds = report.executionEvent.activityMatches.map((m) => m.activityId)
  const activities = await db.scheduleActivity.findMany({
    where: { activityId: { in: activityIds } },
  })
  const activityByCode = new Map(activities.map((a) => [a.activityId, a]))

  const candidates = report.executionEvent.activityMatches.map((m) => {
    const act = activityByCode.get(m.activityId)
    return {
      rowId: m.id,
      matchId: m.id,
      activityId: m.activityId,
      activityName: act?.activityName ?? '',
      discipline: act?.discipline ?? '',
      wbs: act?.wbs ?? '',
      location: act?.location ?? '',
      plannedStart: act?.plannedStart ?? '',
      plannedFinish: act?.plannedFinish ?? '',
      actualStart: act?.actualStart ?? null,
      actualFinish: act?.actualFinish ?? null,
      status: act?.status ?? '',
      signals: {
        identifier: m.identifierScore,
        discipline: m.disciplineScore,
        workType: m.workTypeScore,
        semantic: m.semanticScore,
        date: m.dateScore,
      },
      finalScore: m.finalScore,
      rank: m.rank,
      isTop: m.isTop,
      explanation: JSON.parse(m.explanation ?? '[]'),
    }
  })

  return NextResponse.json({
    ok: true,
    report: {
      id: report.id,
      supervisorName: report.supervisorName,
      discipline: report.discipline,
      inputType: report.inputType,
      rawContent: report.rawContent,
      reportDate: report.reportDate,
      fileUrl: report.fileUrl,
      createdAt: report.createdAt.toISOString(),
    },
    executionEvent: {
      discipline: report.executionEvent.discipline,
      workType: report.executionEvent.workType,
      identifier: report.executionEvent.identifier,
      location: report.executionEvent.location,
      actualStart: report.executionEvent.actualStart,
      actualFinish: report.executionEvent.actualFinish,
      status: report.executionEvent.status,
      quantity: report.executionEvent.quantity,
      unit: report.executionEvent.unit,
      evidence: report.executionEvent.evidence,
    },
    candidates,
    decision: decisionMeta.decision ?? null,
    topScore: decisionMeta.topScore ?? null,
    secondScore: decisionMeta.secondScore ?? null,
    candidateMargin: decisionMeta.candidateMargin ?? null,
    selectedActivityId: decisionMeta.selectedActivityId ?? null,
    plannerDecision: plannerDecision
      ? {
          action: plannerDecision.decision,
          aiSuggestedActivityId: plannerDecision.aiSuggestedActivityId,
          selectedActivityId: plannerDecision.selectedActivityId,
          plannerName: plannerDecision.plannerName,
          reason: plannerDecision.reason,
          createdAt: plannerDecision.createdAt.toISOString(),
        }
      : null,
  })
}
