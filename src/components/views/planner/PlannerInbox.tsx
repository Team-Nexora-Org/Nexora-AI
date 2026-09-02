'use client'

// PlannerInbox — the planner's landing: AI Resolution Workspace. A row of
// summary stat cards (Incoming / AI Resolved / Needs Review / Unmatched) and a
// list of resolution cards (one per field report, newest first). Each card
// shows the supervisor's field statement, the AI decision + confidence + any
// planner action, a one-line resolution summary, and a Review button that
// opens the full resolution detail in PlannerReview.

import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { toast } from 'sonner'
import {
  AlertCircle,
  Check,
  ChevronRight,
  Clock,
  FileCode,
  FileSpreadsheet,
  FileText,
  Inbox,
  Mic,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/shared/EmptyState'
import { ActionBadge, DecisionBadge } from '@/components/shared/StatusBadge'
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge'
import { DisciplineTag } from '@/components/shared/DisciplineTag'
import { useApp } from '@/lib/store'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { InputType, PlannerInboxItem } from '@/lib/types'

const INPUT_META: Record<
  InputType,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  text: { label: 'Text', icon: FileText },
  voice: { label: 'Voice', icon: Mic },
  excel: { label: 'Excel', icon: FileSpreadsheet },
  csv: { label: 'CSV', icon: FileCode },
  pdf: { label: 'PDF', icon: FileText },
}

type Counts = {
  incoming: number
  aiResolved: number
  needsReview: number
  unmatched: number
  approved: number
  rejected: number
  changed: number
} | null

function formatDate(d?: string | null): string {
  if (!d) return '—'
  try {
    return format(parseISO(d), 'd MMM yyyy')
  } catch {
    return d
  }
}

export function PlannerInbox() {
  const go = useApp((s) => s.go)
  const selectReport = useApp((s) => s.selectReport)
  const [items, setItems] = useState<PlannerInboxItem[]>([])
  const [counts, setCounts] = useState<Counts>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([api.state(), api.inbox()])
      .then(([s, i]) => {
        if (cancelled) return
        setCounts(s.counts)
        setItems(i.items)
      })
      .catch((e) => {
        if (cancelled) return
        const msg = (e as Error).message || 'Could not load inbox.'
        setError(msg)
        toast.error(msg)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  function openReport(id: string) {
    selectReport(id)
    go('planner-review')
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          AI Resolution Workspace
        </h1>
        <p className="text-sm text-slate-500">
          From field reality → trusted schedule intelligence.
        </p>
      </header>

      {/* Summary stat cards */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Incoming" value={counts?.incoming ?? null} tone="slate" hint="Total field reports" />
        <StatCard label="AI Resolved" value={counts?.aiResolved ?? null} tone="emerald" hint="High-confidence auto-matches" />
        <StatCard label="Needs Review" value={counts?.needsReview ?? null} tone="amber" hint="Ambiguous candidates" />
        <StatCard label="Unmatched" value={counts?.unmatched ?? null} tone="rose" hint="No planned activity" />
      </section>

      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Execution reports
          </h2>
          {!loading && !error && items.length > 0 && (
            <span className="text-xs text-slate-400 tabular-nums">{items.length} total</span>
          )}
        </div>

        {loading && <InboxLoading />}

        {!loading && error && (
          <div className="space-y-3">
            <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLoading(true)
                setError(null)
                Promise.all([api.state(), api.inbox()])
                  .then(([s, i]) => {
                    setCounts(s.counts)
                    setItems(i.items)
                  })
                  .catch((e) => setError((e as Error).message))
                  .finally(() => setLoading(false))
              }}
            >
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <EmptyState
            title="No reports yet"
            description="Supervisor field reports and NEXORA's resolutions will appear here."
            icon={<Inbox className="h-8 w-8" />}
          />
        )}

        {!loading && !error && items.length > 0 && (
          <ul className="space-y-3">
            {items.map((item) => (
              <InboxCard key={item.reportId} item={item} onOpen={openReport} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function StatCard({
  label,
  value,
  tone,
  hint,
}: {
  label: string
  value: number | null
  tone: 'slate' | 'emerald' | 'amber' | 'rose'
  hint: string
}) {
  const toneClasses = {
    slate: 'text-slate-900',
    emerald: 'text-emerald-700',
    amber: 'text-amber-700',
    rose: 'text-rose-700',
  }[tone]
  return (
    <Card className="border-slate-200 py-4 shadow-sm">
      <CardContent className="space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
        {value === null ? (
          <Skeleton className="h-7 w-10" />
        ) : (
          <p className={cn('text-2xl font-semibold tabular-nums', toneClasses)}>{value}</p>
        )}
        <p className="text-[11px] text-slate-400">{hint}</p>
      </CardContent>
    </Card>
  )
}

function InboxLoading() {
  return (
    <ul className="space-y-3" aria-busy="true" aria-label="Loading inbox">
      {[0, 1, 2, 3].map((i) => (
        <li key={i}>
          <Card className="border-slate-200 py-4">
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-5 w-14 rounded" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

function InboxCard({
  item,
  onOpen,
}: {
  item: PlannerInboxItem
  onOpen: (id: string) => void
}) {
  const meta = INPUT_META[item.inputType] ?? INPUT_META.text
  const Icon = meta.icon
  const decided = !!item.plannerAction

  return (
    <li>
      <Card
        className={cn(
          'border-slate-200 py-4 shadow-sm transition-colors',
          decided
            ? 'hover:border-slate-300'
            : 'cursor-pointer hover:border-amber-300 hover:shadow',
        )}
        onClick={decided ? undefined : () => onOpen(item.reportId)}
        role={decided ? undefined : 'button'}
        tabIndex={decided ? undefined : 0}
        onKeyDown={(e) => {
          if (!decided && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onOpen(item.reportId)
          }
        }}
      >
        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <DisciplineTag value={item.discipline} />
            <span className="inline-flex items-center gap-1 text-slate-700">
              <User className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-medium">{item.supervisorName}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-600">
              <Icon className="h-3 w-3" />
              {meta.label}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-500 tabular-nums">
              <Clock className="h-3 w-3 text-slate-400" />
              {formatDate(item.reportDate)}
            </span>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <DecisionBadge value={item.decision} />
              <ConfidenceBadge score={item.topScore} />
              <ActionBadge value={item.plannerAction} />
            </div>
          </div>

          {/* Raw field statement */}
          <blockquote className="rounded-md border-l-2 border-amber-300 bg-slate-50 px-3 py-2 text-sm leading-relaxed text-slate-700">
            {item.rawContent}
          </blockquote>

          {/* One-line summary */}
          <ResolutionLine item={item} />

          {/* Action row */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              size="sm"
              variant={decided ? 'ghost' : 'default'}
              onClick={(e) => {
                e.stopPropagation()
                onOpen(item.reportId)
              }}
            >
              {decided ? 'View decision' : 'Review'}
              <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </li>
  )
}

function ResolutionLine({ item }: { item: PlannerInboxItem }) {
  let line: React.ReactNode = null
  let tone = 'text-slate-600'

  if (item.plannerAction === 'APPROVED' && item.plannerName) {
    line = (
      <>
        <Check className="mr-1 inline h-3 w-3" />
        Approved by <span className="font-medium">{item.plannerName}</span>
      </>
    )
    tone = 'text-emerald-700'
  } else if (item.plannerAction === 'REJECTED' && item.plannerName) {
    line = (
      <>
        Rejected by <span className="font-medium">{item.plannerName}</span>
      </>
    )
    tone = 'text-rose-700'
  } else if (item.plannerAction === 'CHANGED' && item.plannerName) {
    line = (
      <>
        Re-matched by <span className="font-medium">{item.plannerName}</span>
      </>
    )
    tone = 'text-amber-700'
  } else if (item.decision === 'HIGH_CONFIDENCE' && item.selectedActivityName) {
    line = (
      <>
        Matched to <span className="font-medium">{item.selectedActivityName}</span>
      </>
    )
    tone = 'text-emerald-700'
  } else if (item.decision === 'NEEDS_REVIEW') {
    line = 'Multiple plausible activities — needs your review'
    tone = 'text-amber-700'
  } else if (item.decision === 'UNMATCHED') {
    line = 'No matching planned activity'
    tone = 'text-rose-700'
  } else {
    line = 'Awaiting AI resolution'
  }

  return <p className={cn('text-xs font-medium', tone)}>{line}</p>
}
