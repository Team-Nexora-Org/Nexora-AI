'use client'

import { cn } from '@/lib/utils'

function varianceDays(planned: string | null, actual: string | null): number | null {
  if (!planned || !actual) return null
  const t1 = Date.parse(planned)
  const t2 = Date.parse(actual)
  if (Number.isNaN(t1) || Number.isNaN(t2)) return null
  return Math.round((t2 - t1) / 86400000)
}

export function VariancePill({
  plannedFinish,
  actualFinish,
  className,
}: {
  plannedFinish: string | null
  actualFinish: string | null
  className?: string
}) {
  const v = varianceDays(plannedFinish, actualFinish)
  if (v === null) return <span className={cn('text-xs text-slate-400', className)}>—</span>
  if (v === 0)
    return (
      <span className={cn('inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700', className)}>
        On time
      </span>
    )
  if (v > 0)
    return (
      <span className={cn('inline-flex items-center rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700 tabular-nums', className)}>
        +{v} day{v === 1 ? '' : 's'}
      </span>
    )
  return (
    <span className={cn('inline-flex items-center rounded-md border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700 tabular-nums', className)}>
      {v} day{v === -1 ? '' : 's'}
    </span>
  )
}
