import { NextResponse } from 'next/server'
import { clearRole } from '@/lib/auth'

export async function POST() {
  await clearRole()
  return NextResponse.json({ ok: true })
}
