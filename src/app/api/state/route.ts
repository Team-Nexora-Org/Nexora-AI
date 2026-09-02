import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getRole } from '@/lib/auth'

// GET /api/state — auth role + project + planner inbox counts
export async function GET() {
  const role = await getRole()
  const project = await db.project.findFirst({
    include: { _count: { select: { scheduleActivities: true, fieldReports: true } } },
  })

  let counts = null
  if (project) {
    const reports = await db.fieldReport.findMany({
      where: { projectId: project.id },
      include: { executionEvent: { include: { activityMatches: { where: { isTop: true } } } } },
    })
    let incoming = 0
    let resolved = 0
    let needsReview = 0
    let unmatched = 0
    let approved = 0
    let rejected = 0
    let changed = 0

    for (const r of reports) {
      incoming++
      const topMatch = r.executionEvent?.activityMatches[0]
      if (!topMatch) continue
      const explJson = topMatch.explanation
      // decision is recorded in the RESOLVED audit log; recompute via metadata
    }
    // Recompute via audit logs (source of truth for decisions)
    const audits = await db.auditLog.findMany({
      where: { action: 'RESOLVED', entityType: 'FieldReport' },
    })
    for (const a of audits) {
      const meta = JSON.parse(a.metadata ?? '{}')
      if (meta.decision === 'HIGH_CONFIDENCE') resolved++
      else if (meta.decision === 'NEEDS_REVIEW') needsReview++
      else if (meta.decision === 'UNMATCHED') unmatched++
    }
    const decisions = await db.plannerDecision.findMany()
    for (const d of decisions) {
      if (d.decision === 'APPROVED') approved++
      else if (d.decision === 'REJECTED') rejected++
      else if (d.decision === 'CHANGED') changed++
    }

    counts = {
      incoming,
      aiResolved: resolved,
      needsReview,
      unmatched,
      approved,
      rejected,
      changed,
    }
  }

  return NextResponse.json({ role, project, counts })
}
