'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Animated multi-step processing state used during the AI pipeline. Steps
// light up sequentially to communicate a real pipeline (extraction ->
// normalization -> retrieval -> scoring -> confidence) while remaining
// truthful — each label names an actual stage.
const STEPS = [
  'Understanding field report…',
  'Extracting execution event…',
  'Normalizing terminology…',
  'Retrieving schedule candidates…',
  'Resolving against 75 planned activities…',
  'Computing confidence & candidate margin…',
]

export function ProcessingState({
  active,
  message,
  className,
}: {
  active: boolean
  message?: string
  className?: string
}) {
  const [step, setStep] = useState(0)
  const [prevActive, setPrevActive] = useState(active)
  // Reset the step counter when `active` turns on — done during render
  // (React's recommended pattern for adjusting state on prop change), so we
  // don't call setState synchronously inside an effect.
  if (active !== prevActive) {
    setPrevActive(active)
    if (active) setStep(0)
  }
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      setStep((s) => (s < STEPS.length - 1 ? s + 1 : s))
    }, 650)
    return () => clearInterval(id)
  }, [active])

  if (!active) return null
  return (
    <div className={cn('rounded-lg border border-slate-200 bg-slate-50 p-5', className)}>
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-500"
        />
        <p className="text-sm font-medium text-slate-700">
          {message ?? STEPS[step]}
        </p>
      </div>
      <ol className="mt-4 space-y-1.5">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={cn(
              'flex items-center gap-2 text-xs',
              i < step && 'text-slate-400',
              i === step && 'text-slate-800 font-medium',
              i > step && 'text-slate-300',
            )}
          >
            <span
              className={cn(
                'inline-block h-1.5 w-1.5 rounded-full',
                i < step && 'bg-emerald-500',
                i === step && 'bg-amber-500',
                i > step && 'bg-slate-300',
              )}
            />
            {s}
          </li>
        ))}
      </ol>
    </div>
  )
}
