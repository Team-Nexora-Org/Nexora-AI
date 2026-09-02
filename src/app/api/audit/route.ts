import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/audit?entityType=&entityId=&limit=
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const entityType = searchParams.get('entityType') ?? undefined
  const entityId = searchParams.get('entityId') ?? undefined
  const limit = Number(searchParams.get('limit') ?? 200)

  const where: Record<string, unknown> = {}
  if (entityType) where.entityType = entityType
  if (entityId) where.entityId = entityId

  const logs = await db.auditLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: Math.min(Math.max(limit, 1), 500),
  })

  const events = logs.map((l) => ({
    id: l.id,
    entityType: l.entityType,
    entityId: l.entityId,
    action: l.action,
    actor: l.actor,
    metadata: safeJson(l.metadata),
    createdAt: l.createdAt.toISOString(),
  }))

  return NextResponse.json({ events })
}

function safeJson(s: string | null): Record<string, unknown> {
  if (!s) return {}
  try {
    return JSON.parse(s)
  } catch {
    return { raw: s }
  }
}
