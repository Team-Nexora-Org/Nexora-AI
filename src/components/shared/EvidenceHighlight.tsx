'use client'

// Highlight the evidence quote inside the raw field report. We render the
// raw report text and bold the evidence substring if it can be located.
import { cn } from '@/lib/utils'

export function EvidenceHighlight({
  raw,
  evidence,
  className,
}: {
  raw: string
  evidence?: string | null
  className?: string
}) {
  if (!evidence) {
    return <p className={cn('whitespace-pre-wrap text-sm text-slate-700', className)}>{raw}</p>
  }
  const idx = raw.toLowerCase().indexOf(evidence.toLowerCase().slice(0, 24))
  if (idx === -1) {
    return (
      <p className={cn('whitespace-pre-wrap text-sm text-slate-700', className)}>
        {raw}
      </p>
    )
  }
  const before = raw.slice(0, idx)
  const mid = raw.slice(idx, idx + evidence.length)
  const after = raw.slice(idx + evidence.length)
  return (
    <p className={cn('whitespace-pre-wrap text-sm leading-relaxed text-slate-700', className)}>
      {before}
      <mark className="rounded bg-amber-200/70 px-0.5 font-medium text-slate-900">{mid}</mark>
      {after}
    </p>
  )
}
