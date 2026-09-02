'use client'

import { cn } from '@/lib/utils'

const DISCIPLINE_STYLES: Record<string, string> = {
  Piping: 'bg-amber-50 text-amber-700 border-amber-200',
  Civil: 'bg-stone-100 text-stone-700 border-stone-300',
  Mechanical: 'bg-slate-100 text-slate-700 border-slate-300',
  Electrical: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Instrumentation: 'bg-violet-50 text-violet-700 border-violet-200',
}

export function DisciplineTag({ value, className }: { value: string | null; className?: string }) {
  if (!value) return null
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide',
        DISCIPLINE_STYLES[value] ?? 'bg-slate-100 text-slate-600 border-slate-200',
        className,
      )}
    >
      {value}
    </span>
  )
}
