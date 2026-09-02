'use client'

import { cn } from '@/lib/utils'

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 px-6 py-12 text-center',
        className,
      )}
    >
      {icon && <div className="mb-3 text-slate-300">{icon}</div>}
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description && <p className="mt-1 max-w-md text-xs text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
