'use client'

// PlannerAudit — Audit Trail. Every submission, AI resolution, and planner
// decision in an immutable, reverse-chronological timeline. Color-coded by
// action with a concise one-line metadata summary (no JSON dumps).

import { useEffect, useMemo, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { toast } from 'sonner'
import { AlertCircle, ScrollText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EmptyState } from '@/components/shared/EmptyState'
import { ActionBadge } from '@/components/shared/StatusBadge'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { AuditEventDTO } from '@/lib/types'

const ACTIONS = [
  'All',
  'SUBMITTED',
  'RESOLVED',
  'APPROVED',
  'CHANGED',
  'REJECTED',
  'UPDATED',
  'SEEDED',
  'RESET',
] as const

type ActionFilter = (typeof ACTIONS)[number]

const DOT_BY_ACTION: Record<string, string> = {
  APPROVED: 'bg-emerald-500',
  UPDATED: 'bg-emerald-500',
  RESOLVED: 'bg-amber-500',
  CHANGED: 'bg-amber-500',
  REJECTED: 'bg-rose-500',
  SUBMITTED: 'bg-slate-400',
  SEEDED: 'bg-slate-400',
  RESET: 'bg-slate-400',
}

function fmtTime(d: string): string {
  try {
    return format(parseISO(d), 'd MMM yyyy HH:mm')
  } catch {
    return d
  }
}

function summarize(action: string, meta: Record<string, unknown>): string {
  const get = (k: string): string | null => {
    const v = meta[k]
    if (v === null || v === undefined) return null
    return String(v)
  }
  switch (action) {
    case 'SUBMITTED': {
      const inputType = get('inputType')
      const discipline = get('discipline')
      return [inputType && `${inputType} report`, discipline].filter(Boolean).join(' · ')
    }
    case 'RESOLVED': {
      const decision = get('decision')
      const score = get('topScore')
      const margin = get('candidateMargin')
      const sid = get('selectedActivityId')
      const parts: string[] = []
      if (decision) parts.push(`decision ${decision}`)
      if (sid) parts.push(`activity ${sid}`)
      if (score !== null) parts.push(`score ${Math.round(Number(score) * 100)}%`)
      if (margin !== null) parts.push(`margin ${Math.round(Number(margin) * 100)}%`)
      return parts.join(' · ')
    }
    case 'APPROVED':
    case 'CHANGED': {
      const activityId = get('activityId') ?? get('selectedActivityId')
      const ai = get('aiSuggestedActivityId') ?? get('aiSuggested')
      const sel = get('selectedActivityId') ?? get('selected')
      const before = meta.before as { status?: string } | undefined
      const after = meta.after as { status?: string; actualFinish?: string } | undefined
      const parts: string[] = []
      if (activityId) parts.push(`activity ${activityId}`)
      if (action === 'CHANGED' && ai && sel && ai !== sel) {
        parts.push(`AI ${ai} → planner ${sel}`)
      }
      if (after?.actualFinish) parts.push(`actual finish ${after.actualFinish}`)
      if (before?.status && after?.status && before.status !== after.status) {
        parts.push(`status ${before.status} → ${after.status}`)
      }
      return parts.join(' · ')
    }
    case 'REJECTED': {
      const reason = get('reason')
      const ai = get('aiSuggestedActivityId')
      const parts: string[] = []
      if (ai) parts.push(`AI suggested ${ai}`)
      if (reason) parts.push(`reason: ${reason}`)
      return parts.join(' · ')
    }
    case 'UPDATED': {
      const activityId = get('activityId')
      const before = meta.before as { status?: string; actualFinish?: string } | undefined
      const after = meta.after as { status?: string; actualFinish?: string } | undefined
      const parts: string[] = []
      if (activityId) parts.push(`activity ${activityId}`)
      if (after?.actualFinish) parts.push(`actual finish ${after.actualFinish}`)
      if (before?.status && after?.status && before.status !== after.status) {
        parts.push(`status ${before.status} → ${after.status}`)
      }
      return parts.join(' · ')
    }
    case 'SEEDED':
    case 'RESET':
    default: {
      // best-effort: stringify a couple of useful fields
      const keys = Object.keys(meta).slice(0, 3)
      if (keys.length === 0) return ''
      return keys.map((k) => `${k}: ${String(meta[k])}`).join(' · ')
    }
  }
}

export function PlannerAudit() {
  const [events, setEvents] = useState<AuditEventDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<ActionFilter>('All')

  useEffect(() => {
    let cancelled = false
    api
      .audit({ limit: 200 })
      .then((r) => {
        if (cancelled) return
        setEvents(r.events)
      })
      .catch((e) => {
        if (cancelled) return
        const msg = (e as Error).message || 'Could not load audit trail.'
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

  const visible = useMemo(() => {
    if (filter === 'All') return events
    return events.filter((e) => e.action === filter)
  }, [events, filter])

  return (
    <div className="space-y-5">
      <TimelineStyle />
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Audit Trail
        </h1>
        <p className="text-sm text-slate-500">
          Every submission, AI resolution, and planner decision — immutable record.
        </p>
      </header>

      <div className="flex items-center justify-between gap-2">
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as ActionFilter)}
        >
          <SelectTrigger size="sm" className="w-44">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            {ACTIONS.map((a) => (
              <SelectItem key={a} value={a}>
                {a === 'All' ? 'All actions' : a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!loading && !error && (
          <p className="text-xs text-slate-500 tabular-nums">
            {visible.length} of {events.length} event{events.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      {error && (
        <div className="space-y-3">
          <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setError(null)
              setLoading(true)
              api
                .audit({ limit: 200 })
                .then((r) => setEvents(r.events))
                .catch((e) => setError((e as Error).message))
                .finally(() => setLoading(false))
            }}
          >
            Retry
          </Button>
        </div>
      )}

      {!error && loading && <AuditSkeleton />}

      {!error && !loading && visible.length === 0 && (
        <EmptyState
          title={filter === 'All' ? 'No audit events yet' : `No ${filter} events`}
          description="Activity will appear here as supervisors submit reports, NEXORA resolves them, and you make decisions."
          icon={<ScrollText className="h-8 w-8" />}
        />
      )}

      {!error && !loading && visible.length > 0 && (
        <Card className="border-slate-200 py-0">
          <CardContent className="px-3 py-2">
            <ol
              className="nexora-scrollbar max-h-[75vh] space-y-1 overflow-auto pr-2"
              style={{ scrollbarWidth: 'thin' }}
            >
              {visible.map((ev, i) => {
                const dotCls = DOT_BY_ACTION[ev.action] ?? 'bg-slate-400'
                const isLast = i === visible.length - 1
                const summary = summarize(ev.action, ev.metadata)
                const showActionBadge = ['APPROVED', 'CHANGED', 'REJECTED'].includes(ev.action)
                return (
                  <li
                    key={ev.id}
                    className="relative flex gap-3 px-1 py-2.5"
                  >
                    {!isLast && (
                      <span
                        aria-hidden
                        className="absolute left-[5px] top-7 bottom-0 w-px bg-slate-200"
                      />
                    )}
                    <span
                      aria-hidden
                      className={cn(
                        'mt-1 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-white',
                        dotCls,
                      )}
                    />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-xs font-medium tabular-nums text-slate-500">
                          {fmtTime(ev.createdAt)}
                        </span>
                        {showActionBadge ? (
                          <ActionBadge value={ev.action} />
                        ) : (
                          <span
                            className={cn(
                              'inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
                              ev.action === 'RESOLVED' &&
                                'border-amber-200 bg-amber-50 text-amber-700',
                              ev.action === 'SUBMITTED' &&
                                'border-slate-200 bg-slate-50 text-slate-600',
                              (ev.action === 'SEEDED' || ev.action === 'RESET') &&
                                'border-slate-200 bg-slate-50 text-slate-500',
                              ev.action === 'UPDATED' &&
                                'border-emerald-200 bg-emerald-50 text-emerald-700',
                            )}
                          >
                            {ev.action}
                          </span>
                        )}
                        <span className="text-xs text-slate-500">
                          by{' '}
                          <span className="font-medium text-slate-700">
                            {ev.actor}
                          </span>
                        </span>
                      </div>
                      {summary && (
                        <p className="text-xs text-slate-600">{summary}</p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Injects a small scoped style block for nicer scrollbars (only rendered
// once when the timeline mounts). Webkit browsers (Chrome/Safari/Edge) get
// the styled thumb; Firefox already gets a thin scrollbar via scrollbarWidth.
function TimelineStyle() {
  const css = `
    .nexora-scrollbar::-webkit-scrollbar { width: 8px; }
    .nexora-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    .nexora-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

function AuditSkeleton() {
  return (
    <Card className="border-slate-200 py-0">
      <CardContent className="px-3 py-2">
        <ol className="space-y-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i} className="flex gap-3 px-1 py-2.5">
              <Skeleton className="mt-1 h-2.5 w-2.5 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <div className="flex gap-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-4 w-16 rounded" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-3 w-2/3" />
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
