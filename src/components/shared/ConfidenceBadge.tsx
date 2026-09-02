'use client'

import { cn } from '@/lib/utils'

function labelFor(score: number): { label: string; tone: string } {
  if (score >= 0.85) return { label: 'High', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  if (score >= 0.5) return { label: 'Medium', tone: 'bg-amber-50 text-amber-700 border-amber-200' }
  return { label: 'Low', tone: 'bg-rose-50 text-rose-700 border-rose-200' }
}

export function ConfidenceBadge({
  score,
  className,
}: {
  score: number | null
  className?: string
}) {
  if (score === null || score === undefined) return null
  const pct = Math.round(score * 100)
  const { label, tone } = labelFor(score)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold tabular-nums',
        tone,
        className,
      )}
    >
      <span className="font-mono">{pct}</span>
      <span className="opacity-70">·</span>
      <span>{label}</span>
    </span>
  )
}
