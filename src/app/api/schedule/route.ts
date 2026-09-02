import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/schedule?discipline=&status=&search=
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const discipline = searchParams.get('discipline') ?? undefined
  const status = searchParams.get('status') ?? undefined
  const search = searchParams.get('search') ?? undefined

  const where: Record<string, unknown> = {}
  if (discipline) where.discipline = discipline
  if (status) where.status = status
  if (search) {
    where.OR = [
      { activityId: { contains: search } },
      { activityName: { contains: search } },
      { location: { contains: search } },
      { searchText: { contains: search } },
    ]
  }

  const activities = await db.scheduleActivity.findMany({
    where,
    orderBy: { activityId: 'asc' },
  })
  return NextResponse.json({ activities })
}
