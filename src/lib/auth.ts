// NEXORA — mock auth helpers (cookie-based, swappable for Supabase Auth later)

import { cookies } from 'next/headers'
import type { Role } from '@/lib/types'

const COOKIE = 'nexora-role'

export async function getRole(): Promise<Role | null> {
  const store = await cookies()
  const raw = store.get(COOKIE)?.value
  if (!raw) return null
  try {
    return JSON.parse(raw) as Role
  } catch {
    return null
  }
}

export async function setRole(role: Role): Promise<void> {
  const store = await cookies()
  store.set(COOKIE, JSON.stringify(role), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearRole(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE)
}
