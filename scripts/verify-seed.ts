import { db } from '../src/lib/db'
async function main() {
  const events = await db.executionEvent.findMany({
    include: { report: true, activityMatches: { orderBy: { rank: 'asc' } } },
  })
  for (const ev of events) {
    const top = ev.activityMatches.find((m) => m.isTop)
    const second = ev.activityMatches.find((m) => m.rank === 2)
    const decision = await db.auditLog.findFirst({
      where: { entityType: 'FieldReport', entityId: ev.reportId, action: 'RESOLVED' },
    })
    const dm = JSON.parse(decision?.metadata ?? '{}')
    console.log(`--- ${ev.report.supervisorName} [${ev.report.inputType}]`)
    console.log(`  raw: ${ev.report.rawContent}`)
    console.log(`  event: disc=${ev.discipline} wt=${ev.workType} id=${ev.identifier} loc=${ev.location} ${ev.actualStart ?? '-'} -> ${ev.actualFinish ?? '-'} [${ev.status}]`)
    console.log(`  top: ${top?.activityId} score=${((top?.finalScore ?? 0) * 100).toFixed(1)} | second: ${second?.activityId ?? '-'} score=${((second?.finalScore ?? 0) * 100).toFixed(1)}`)
    console.log(`  DECISION: ${dm.decision} selected=${dm.selectedActivityId} margin=${(dm.candidateMargin * 100).toFixed(1)}`)
  }
  await db.$disconnect()
}
main()
