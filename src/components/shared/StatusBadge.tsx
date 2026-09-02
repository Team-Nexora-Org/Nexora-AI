'use client'

import { cn } from '@/lib/utils'

const DECISION_STYLES: Record<string, string> = {
  HIGH_CONFIDENCE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  NEEDS_REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
  UNMATCHED: 'bg-rose-50 text-rose-700 border-rose-200',
}

const ACTION_STYLES: Record<string, string> = {
  APPROVED: 'bg-emerald-600 text-white border-emerald-600',
  CHANGED: 'bg-sky-700 text-white border-sky-700',
  REJECTED: 'bg-rose-600 text-white border-rose-600',
}

const STATUS_STYLES: Record<string, string> = {
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  Delayed: 'bg-rose-50 text-rose-700 border-rose-200',
  'Not Started': 'bg-slate-100 text-slate-600 border-slate-200',
}

export function DecisionBadge({ value, className }: { value: string | null; className?: string }) {
  if (!value) return null
  const label = value === 'HIGH_CONFIDENCE' ? 'High Confidence' : value === 'NEEDS_REVIEW' ? 'Needs Review' : 'Unmatched'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
        DECISION_STYLES[value] ?? 'bg-slate-100 text-slate-600 border-slate-200',
        className,
      )}
    >
      {value === 'NEEDS_REVIEW' && <span aria-hidden>⚠</span>}
      {value === 'UNMATCHED' && <span aria-hidden>✕</span>}
      {value === 'HIGH_CONFIDENCE' && <span aria-hidden>✓</span>}
      {label}
    </span>
  )
}

export function ActionBadge({ value, className }: { value: string | null; className?: string }) {
  if (!value) return null
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
        ACTION_STYLES[value] ?? 'bg-slate-100 text-slate-600 border-slate-200',
        className,
      )}
    >
      {value}
    </span>
  )
}

export function StatusBadge({ value, className }: { value: string | null; className?: string }) {
  if (!value) return null
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        STATUS_STYLES[value] ?? 'bg-slate-100 text-slate-600 border-slate-200',
        className,
      )}
    >
      {value}
    </span>
  )
}
