import { NextRequest, NextResponse } from 'next/server'
import { runEvaluation, getEvaluation } from '@/lib/ai/evaluation'

// POST /api/evaluation — run baseline vs NEXORA evaluation over the ground
// truth and persist metrics.
export async function POST() {
  try {
    const result = await runEvaluation()
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    console.error('[nexora] evaluation failed:', err)
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    )
  }
}

// GET /api/evaluation — latest stored metrics
export async function GET(_req: NextRequest) {
  const result = await getEvaluation()
  return NextResponse.json({ ok: true, ...result })
}
