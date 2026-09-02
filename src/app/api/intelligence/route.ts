import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import type { IntelligenceResultRow } from '@/lib/types'

function days(a: string | null, b: string | null): number | null {
  if (!a || !b) return null
  const ta = Date.parse(a)
  const tb = Date.parse(b)
  if (Number.isNaN(ta) || Number.isNaN(tb)) return null
  return Math.round((tb - ta) / 86400000)
}

// GET /api/intelligence?q=delayed|piping-delayed|completed|in-progress|all
// Controlled queries over the structured execution data — NOT a chatbot.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') ?? 'delayed').toLowerCase()

  const activities = await db.scheduleActivity.findMany({ orderBy: { activityId: 'asc' } })

  let filtered = activities
  let title = ''
  let description = ''

  switch (q) {
    case 'delayed':
      title = 'Activities completed later than planned'
      description = 'Activities with actual finish after planned finish (positive variance).'
      filtered = activities.filter((a) => {
        const v = days(a.plannedFinish, a.actualFinish)
        return v !== null && v > 0
      })
      break
    case 'piping-delayed':
      title = 'Piping activities that are delayed'
      description = 'Piping discipline activities with positive variance.'
      filtered = activities.filter((a) => {
        if (a.discipline !== 'Piping') return false
        const v = days(a.plannedFinish, a.actualFinish)
        return v !== null && v > 0
      })
      break
    case 'completed':
      title = 'Activities completed'
      description = 'All activities whose status is Completed.'
      filtered = activities.filter((a) => a.status === 'Completed')
      break
    case 'in-progress':
      title = 'Activities in progress'
      description = 'All activities whose status is In Progress.'
      filtered = activities.filter((a) => a.status === 'In Progress')
      break
    case 'not-started':
      title = 'Activities not started'
      description = 'All activities whose status is Not Started.'
      filtered = activities.filter((a) => a.status === 'Not Started')
      break
    case 'on-time':
      title = 'Activities completed on or before planned finish'
      description = 'Activities with zero or negative variance.'
      filtered = activities.filter((a) => {
        const v = days(a.plannedFinish, a.actualFinish)
        return v !== null && v <= 0
      })
      break
    default:
      title = 'All schedule activities'
      description = 'Full schedule.'
      filtered = activities
  }

  const rows: IntelligenceResultRow[] = filtered.map((a) => ({
    activityId: a.activityId,
    activityName: a.activityName,
    discipline: a.discipline,
    location: a.location,
    plannedFinish: a.plannedFinish,
    actualFinish: a.actualFinish ?? '',
    status: a.status,
    varianceDays: days(a.plannedFinish, a.actualFinish),
  }))

  return NextResponse.json({ q, title, description, rows })
}
