import { NextRequest, NextResponse } from 'next/server'
import { setRole, getRole } from '@/lib/auth'
import { db } from '@/lib/db'
import type { Role } from '@/lib/types'

// POST /api/auth — select a demo profile.
// Body: { profile: 'supervisor' | 'planner', supervisorId?: string }
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const profile = body?.profile

  if (profile === 'supervisor') {
    // Allow choosing a supervisor; default to Ramesh Kumar.
    const supervisorId = body?.supervisorId as string | undefined
    let sup = supervisorId
      ? await db.supervisor.findUnique({ where: { id: supervisorId } })
      : null
    if (!sup) sup = await db.supervisor.findFirst({ where: { discipline: 'Piping' } })
    if (!sup) {
      return NextResponse.json(
        { ok: false, error: 'No supervisors seeded. Run /api/seed first.' },
        { status: 409 },
      )
    }
    const role: Role = {
      type: 'supervisor',
      name: sup.name,
      role: sup.role,
      discipline: sup.discipline,
      supervisorId: sup.id,
    }
    await setRole(role)
    return NextResponse.json({ ok: true, role })
  }

  if (profile === 'planner') {
    const role: Role = {
      type: 'planner',
      name: 'Arun Sharma',
      role: 'Project Planner',
    }
    await setRole(role)
    return NextResponse.json({ ok: true, role })
  }

  return NextResponse.json(
    { ok: false, error: 'Unknown profile. Use supervisor or planner.' },
    { status: 400 },
  )
}

// GET /api/auth — current role
export async function GET() {
  const role = await getRole()
  return NextResponse.json({ role })
}
