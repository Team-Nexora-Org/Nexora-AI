import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/supervisors — list demo supervisors (used by login + supervisor submissions)
export async function GET() {
  const supervisors = await db.supervisor.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json({ supervisors })
}
