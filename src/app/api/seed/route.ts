import { NextResponse } from 'next/server'
import { seedDatabase } from '@/lib/seed'

// POST /api/seed — demo reset: restore the database to the clean demo state.
export async function POST() {
  try {
    const result = await seedDatabase()
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    )
  }
}
