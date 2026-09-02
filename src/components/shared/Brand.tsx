'use client'

import { cn } from '@/lib/utils'

export function Brand({
  size = 'md',
  className,
  sub = true,
}: {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  sub?: boolean
}) {
  const sizes = {
    sm: { mark: 'h-6 w-6', title: 'text-base', sub: 'text-[10px]' },
    md: { mark: 'h-8 w-8', title: 'text-lg', sub: 'text-[11px]' },
    lg: { mark: 'h-12 w-12', title: 'text-2xl', sub: 'text-xs' },
  }[size]
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className={cn(
          'grid place-items-center rounded-md bg-background text-amber-400 shadow-sm',
          sizes.mark,
        )}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-2/3 w-2/3">
          <path d="M4 16 L10 8 L14 13 L20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="6" r="1.6" fill="currentColor" />
          <circle cx="4" cy="16" r="1.6" fill="currentColor" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={cn('font-semibold tracking-tight text-foreground', sizes.title)}>NEXORA</div>
        {sub && (
          <div className={cn('uppercase tracking-[0.16em] text-muted-foreground', sizes.sub)}>
            Field-to-Schedule Intelligence
          </div>
        )}
      </div>
    </div>
  )
}
