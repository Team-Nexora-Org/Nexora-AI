'use client'

// SupervisorSubmissions — this supervisor's own submitted reports and how
// NEXORA resolved each one. The supervisor never sees WBS codes or activity
// IDs here — only the matched activity NAME (when high-confidence), the AI
// decision, and the planner's eventual action.

import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { toast } from 'sonner'
import {
  FileCode,
  FileSpreadsheet,
  FileText,
  Inbox,
  ListChecks,
  Loader2,
  Mic,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/shared/EmptyState'
import { DecisionBadge, ActionBadge } from '@/components/shared/StatusBadge'
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

function formatDate(d?: string | null): string {
  if (!d) return '—'
  try {
    return format(parseISO(d), 'd MMM yyyy')
  } catch {
    return d
  }
}

export function SupervisorSubmissions() {
  const role = useApp((s) => s.role)
  const go = useApp((s) => s.go)
  const [items, setItems] = useState<PlannerInboxItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    api
      .inbox()
      .then((r) => {
        if (cancelled) return
        const mine = r.items
          .filter((i) => i.supervisorName === role?.name)
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        setItems(mine)
      })
      .catch((e) => {
        if (cancelled) return
        const msg = (e as Error).message || 'Could not load your submissions.'
        setError(msg)
        toast.error(msg)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [role?.name])

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          My submissions
        </h1>
        <p className="text-sm text-muted-foreground">
          What you reported and how NEXORA resolved it.
          {!loading && !error && items.length > 0 && (
            <span className="ml-1 text-muted-foreground">
              · {items.length} report{items.length === 1 ? '' : 's'}
            </span>
          )}
        </p>
      </header>

      {loading && <LoadingList />}

      {!loading && error && (
        <div className="space-y-3">
          <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setLoading(true)
              setError(null)
              api
                .inbox()
                .then((r) => {
                  const mine = r.items
                    .filter((i) => i.supervisorName === role?.name)
                    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                  setItems(mine)
                })
                .catch((e) => setError((e as Error).message))
                .finally(() => setLoading(false))
            }}
          >
            <Loader2 className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <EmptyState
          title="No submissions yet"
          description="When you report what happened on site, your reports and NEXORA's resolution will appear here."
          icon={<ListChecks className="h-8 w-8" />}
          action={
            <Button onClick={() => go('supervisor-home')}>
              <FileText className="h-4 w-4" />
              Report now
            </Button>
          }
        />
      )}

      {!loading && !error && items.length > 0 && (
        <ul className="space-y-3">
          {items.map((item) => (
            <SubmissionCard key={item.reportId} item={item} />
          ))}
        </ul>
      )}
    </div>
  )
}

function LoadingList() {
  return (
    <ul className="space-y-3" aria-busy="true" aria-label="Loading your submissions">
      {[0, 1, 2].map((i) => (
        <li key={i}>
          <Card className="border-border">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-5 w-14 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

function SubmissionCard({ item }: { item: PlannerInboxItem }) {
  const meta = INPUT_META[item.inputType] ?? INPUT_META.text
  const Icon = meta.icon

  return (
    <li>
      <Card className="border-border shadow-sm transition-colors hover:border-border">
        <CardContent className="space-y-3">
          {/* Top row: date · inputType · discipline */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-medium text-foreground tabular-nums">
              {formatDate(item.reportDate)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              <Icon className="h-3 w-3" />
              {meta.label}
            </span>
            <DisciplineTag value={item.discipline} />
            {item.resolved ? (
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                <Inbox className="h-3 w-3" />
                In planner inbox
              </span>
            ) : null}
          </div>

          {/* Raw statement (truncated to ~2 lines) */}
          <p className="line-clamp-2 text-sm leading-relaxed text-foreground">
            {item.rawContent}
          </p>

          {/* Decision + confidence + planner action */}
          <div className="flex flex-wrap items-center gap-2">
            <DecisionBadge value={item.decision} />
            <ConfidenceBadge score={item.topScore} />
            <ActionBadge value={item.plannerAction} />
          </div>

          {/* Resolution status line */}
          <ResolutionLine item={item} />
        </CardContent>
      </Card>
    </li>
  )
}

function ResolutionLine({ item }: { item: PlannerInboxItem }) {
  let line: React.ReactNode = null
  let tone = 'text-muted-foreground'

  if (item.plannerAction === 'APPROVED' && item.plannerName) {
    line = (
      <>
        Approved by <span className="font-medium text-foreground">{item.plannerName}</span>
      </>
    )
    tone = 'text-emerald-700'
  } else if (item.plannerAction === 'REJECTED' && item.plannerName) {
    line = (
      <>
        Rejected by <span className="font-medium text-foreground">{item.plannerName}</span>
      </>
    )
    tone = 'text-rose-700'
  } else if (item.plannerAction === 'CHANGED' && item.plannerName) {
    line = (
      <>
        Updated by <span className="font-medium text-foreground">{item.plannerName}</span>
      </>
    )
    tone = 'text-amber-700'
  } else if (item.decision === 'HIGH_CONFIDENCE' && item.selectedActivityName) {
    line = (
      <>
        Connected to{' '}
        <span className="font-medium text-foreground">{item.selectedActivityName}</span>
      </>
    )
    tone = 'text-emerald-700'
  } else if (item.decision === 'NEEDS_REVIEW') {
    line = 'Awaiting planner review'
    tone = 'text-amber-700'
  } else if (item.decision === 'UNMATCHED') {
    line = 'No matching planned activity — under review'
    tone = 'text-rose-700'
  } else {
    line = 'Awaiting review'
  }

  return <p className={cn('text-xs font-medium', tone)}>{line}</p>
}
