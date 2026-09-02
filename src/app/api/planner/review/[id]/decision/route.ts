import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getRole } from '@/lib/auth'

// POST /api/planner/review/[id]/decision
// Body: { action: 'APPROVED' | 'CHANGED' | 'REJECTED', selectedActivityId?, reason? }
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const role = await getRole()
  const plannerName = role?.type === 'planner' ? role.name : 'Arun Sharma'

  const body = await req.json().catch(() => ({}))
  const action = body?.action as 'APPROVED' | 'CHANGED' | 'REJECTED' | undefined
  if (!action || !['APPROVED', 'CHANGED', 'REJECTED'].includes(action)) {
    return NextResponse.json({ ok: false, error: 'Invalid action.' }, { status: 400 })
  }

  const report = await db.fieldReport.findUnique({
    where: { id },
    include: { executionEvent: { include: { activityMatches: { where: { isTop: true } } } } },
  })
  if (!report) {
    return NextResponse.json({ ok: false, error: 'Report not found.' }, { status: 404 })
  }
  const topMatch = report.executionEvent?.activityMatches[0]
  if (!topMatch) {
    return NextResponse.json({ ok: false, error: 'Report has no AI resolution.' }, { status: 409 })
  }

  const existing = await db.plannerDecision.findUnique({ where: { matchId: topMatch.id } })
  if (existing) {
    return NextResponse.json(
      { ok: false, error: 'A planner decision already exists for this report.' },
      { status: 409 },
    )
  }

  const aiSuggestedActivityId = topMatch.activityId

  if (action === 'REJECTED') {
    const reason = (body?.reason as string) || null
    const decisionRow = await db.plannerDecision.create({
      data: {
        matchId: topMatch.id,
        decision: 'REJECTED',
        aiSuggestedActivityId,
        selectedActivityId: null,
        plannerName,
        reason,
      },
    })
    await db.auditLog.create({
      data: {
        entityType: 'PlannerDecision',
        entityId: decisionRow.id,
        action: 'REJECTED',
        actor: plannerName,
        metadata: JSON.stringify({ reportId: report.id, aiSuggestedActivityId, reason }),
      },
    })
    return NextResponse.json({ ok: true, action: 'REJECTED' })
  }

  // APPROVED or CHANGED — a target activity ID is required and must exist in
  // schedule_activities. The schedule DB is the source of truth for IDs; an
  // arbitrary LLM-suggested ID can never update the database.
  let selectedActivityId: string | undefined = body?.selectedActivityId as string | undefined
  if (!selectedActivityId) {
    if (action === 'APPROVED') selectedActivityId = aiSuggestedActivityId
    else {
      return NextResponse.json(
        { ok: false, error: 'CHANGED requires a selectedActivityId.' },
        { status: 400 },
      )
    }
  }

  const targetActivity = await db.scheduleActivity.findFirst({
    where: { activityId: selectedActivityId },
  })
  if (!targetActivity) {
    return NextResponse.json(
      { ok: false, error: `Activity ${selectedActivityId} does not exist in schedule_activities.` },
      { status: 422 },
    )
  }

  const ev = report.executionEvent
  const before = {
    actualStart: targetActivity.actualStart,
    actualFinish: targetActivity.actualFinish,
    status: targetActivity.status,
  }

  const decisionRow = await db.plannerDecision.create({
    data: {
      matchId: topMatch.id,
      decision: action,
      aiSuggestedActivityId,
      selectedActivityId,
      scheduleActivityRowId: targetActivity.id,
      plannerName,
      reason: (body?.reason as string) || null,
    },
  })

  const newStatus =
    ev.status === 'Completed'
      ? 'Completed'
      : ev.status === 'In Progress'
        ? 'In Progress'
        : ev.status === 'Delayed'
          ? 'Delayed'
          : 'Completed'

  await db.scheduleActivity.update({
    where: { id: targetActivity.id },
    data: {
      actualStart: ev.actualStart ?? targetActivity.actualStart,
      actualFinish: ev.actualFinish ?? targetActivity.actualFinish,
      status: newStatus,
    },
  })

  const after = {
    actualStart: ev.actualStart ?? targetActivity.actualStart,
    actualFinish: ev.actualFinish ?? targetActivity.actualFinish,
    status: newStatus,
  }

  await db.auditLog.create({
    data: {
      entityType: 'PlannerDecision',
      entityId: decisionRow.id,
      action,
      actor: plannerName,
      metadata: JSON.stringify({
        reportId: report.id,
        activityId: targetActivity.activityId,
        aiSuggestedActivityId,
        selectedActivityId,
        reason: body?.reason ?? null,
        before,
        after,
      }),
    },
  })
  await db.auditLog.create({
    data: {
      entityType: 'ScheduleActivity',
      entityId: targetActivity.id,
      action: 'UPDATED',
      actor: plannerName,
      metadata: JSON.stringify({
        activityId: targetActivity.activityId,
        activityName: targetActivity.activityName,
        before,
        after,
      }),
    },
  })

  return NextResponse.json({
    ok: true,
    action,
    activity: {
      activityId: targetActivity.activityId,
      activityName: targetActivity.activityName,
      actualStart: after.actualStart,
      actualFinish: after.actualFinish,
      status: after.status,
    },
  })
}
