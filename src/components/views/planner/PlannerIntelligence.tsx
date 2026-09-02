'use client'

// PlannerIntelligence — Execution Intelligence. Six controlled queries over
// the structured (already-updated) schedule: delayed, piping-delayed,
// on-time, completed, in-progress, not-started. NOT a chatbot — deterministic
// filters that return a typed table the planner can act on. The "delayed"
// query is empty until the planner approves a delayed report, so we surface a
// helpful tip when its result is empty.

import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { toast } from 'sonner'
import { AlertCircle, BrainCircuit, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EmptyState } from '@/components/shared/EmptyState'
import { DisciplineTag } from '@/components/shared/DisciplineTag'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { VariancePill } from '@/components/shared/VariancePill'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { IntelligenceResultRow } from '@/lib/types'

const QUERIES: { q: string; label: string }[] = [
  { q: 'delayed', label: 'Completed later than planned' },
  { q: 'piping-delayed', label: 'Piping activities that are delayed' },
  { q: 'on-time', label: 'Completed on or before planned' },
  { q: 'completed', label: 'All completed' },
  { q: 'in-progress', label: 'In progress' },
  { q: 'not-started', label: 'Not started' },
]

function fmt(d?: string | null): string {
  if (!d) return '—'
  try {
    return format(parseISO(d), 'd MMM yy')
  } catch {
    return d
  }
}

export function PlannerIntelligence() {
  const [active, setActive] = useState<string>('delayed')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [rows, setRows] = useState<IntelligenceResultRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    api
      .intelligence(active)
      .then((r) => {
        if (cancelled) return
        setTitle(r.title)
        setDescription(r.description)
        setRows(r.rows)
      })
      .catch((e) => {
        if (cancelled) return
        const msg = (e as Error).message || 'Could not load query results.'
        setError(msg)
        toast.error(msg)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [active])

  function rerun(q: string) {
    setLoading(true)
    setActive(q)
  }

  async function refetch() {
    setLoading(true)
    setError(null)
    try {
      const r = await api.intelligence(active)
      setTitle(r.title)
      setDescription(r.description)
      setRows(r.rows)
    } catch (e) {
      const msg = (e as Error).message || 'Could not load query results.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Execution Intelligence
        </h1>
        <p className="text-sm text-slate-500">
          Structured answers from the executed schedule — not a chatbot.
        </p>
      </header>

      {/* Query chips */}
      <div className="flex flex-wrap gap-2">
        {QUERIES.map((q) => {
          const isActive = q.q === active
          return (
            <button
              key={q.q}
              type="button"
              onClick={() => rerun(q.q)}
              className={cn(
                'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
                isActive
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
              )}
              aria-pressed={isActive}
            >
              {q.label}
            </button>
          )
        })}
      </div>

      {/* Active query heading */}
      <div className="space-y-1 border-l-2 border-amber-400 pl-3">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {!error && loading && <IntelligenceSkeleton />}

      {!error && !loading && rows.length === 0 && active === 'delayed' && (
        <div className="space-y-3">
          <EmptyState
            title="No delayed activities yet"
            description="The schedule currently has no activities with positive variance."
            icon={<BrainCircuit className="h-8 w-8" />}
          />
          <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-center text-xs text-slate-500">
            Tip: approve a report whose actual finish is later than planned (e.g. the
            Line 24-XX report which is +1 day), then re-run this query — delayed
            activities will appear here.
          </p>
        </div>
      )}

      {!error && !loading && rows.length === 0 && active !== 'delayed' && (
        <EmptyState
          title="No activities match this query"
          description="Try a different query above."
          icon={<BrainCircuit className="h-8 w-8" />}
        />
      )}

      {!error && !loading && rows.length > 0 && (
        <Card className="border-slate-200 py-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white">
                <TableRow className="border-b border-slate-200">
                  <TableHead className="w-20 text-xs uppercase tracking-wide text-slate-500">Activity</TableHead>
                  <TableHead className="min-w-48 text-xs uppercase tracking-wide text-slate-500">Activity</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Discipline</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Location</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Planned Finish</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Actual Finish</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Status</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.activityId} className="text-xs">
                    <TableCell>
                      <span className="font-mono text-xs font-semibold text-slate-900">
                        {r.activityId}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-800">{r.activityName}</TableCell>
                    <TableCell>
                      <DisciplineTag value={r.discipline} />
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{r.location}</TableCell>
                    <TableCell className="tabular-nums text-slate-700">
                      {fmt(r.plannedFinish)}
                    </TableCell>
                    <TableCell className="tabular-nums text-slate-700">
                      {fmt(r.actualFinish)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge value={r.status} />
                    </TableCell>
                    <TableCell>
                      <VariancePill
                        plannedFinish={r.plannedFinish}
                        actualFinish={r.actualFinish || null}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 px-3 py-2">
            <p className="text-xs text-slate-500 tabular-nums">
              {rows.length} activit{rows.length === 1 ? 'y' : 'ies'}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-slate-500"
              onClick={refetch}
            >
              <Loader2 className={cn('mr-1 h-3.5 w-3.5', loading && 'animate-spin')} />
              Re-run query
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

function IntelligenceSkeleton() {
  return (
    <Card className="border-slate-200 py-0">
      <div className="border-b border-slate-200 px-3 py-2">
        <div className="flex gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-20" />
          ))}
        </div>
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border-b border-slate-100 px-3 py-2.5">
          <div className="flex gap-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </Card>
  )
}
