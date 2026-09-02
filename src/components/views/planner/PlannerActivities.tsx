'use client'

// PlannerActivities — the schedule (source of truth). A dense, filterable
// table of all 75 planned activities. The planner is the only role that sees
// WBS codes and activity IDs here. Filters: discipline, status, free-text
// search (by activityId / name / location).

import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { toast } from 'sonner'
import { AlertCircle, CalendarRange, Loader2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import type { ScheduleActivityDTO } from '@/lib/types'

const DISCIPLINES = ['All', 'Civil', 'Mechanical', 'Piping', 'Electrical', 'Instrumentation']
const STATUSES = ['All', 'Not Started', 'In Progress', 'Completed', 'Delayed']

function fmt(d?: string | null): string {
  if (!d) return '—'
  try {
    return format(parseISO(d), 'd MMM yy')
  } catch {
    return d
  }
}

export function PlannerActivities() {
  const [activities, setActivities] = useState<ScheduleActivityDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [discipline, setDiscipline] = useState<string>('All')
  const [status, setStatus] = useState<string>('All')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    fetchSchedule({ discipline, status, search })
    return () => {
      cancelled = true
    }
    function fetchSchedule(p: { discipline: string; status: string; search: string }) {
      setLoading(true)
      setError(null)
      api
        .schedule({
          discipline: p.discipline === 'All' ? undefined : p.discipline,
          status: p.status === 'All' ? undefined : p.status,
          search: p.search.trim() || undefined,
        })
        .then((r) => setActivities(r.activities))
        .catch((e) => {
          const msg = (e as Error).message || 'Could not load schedule.'
          setError(msg)
          toast.error(msg)
        })
        .finally(() => setLoading(false))
    }
  }, [discipline, status, search])

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Schedule
        </h1>
        <p className="text-sm text-slate-500">
          The source of truth — 75 planned activities across 5 disciplines.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Select value={discipline} onValueChange={setDiscipline}>
          <SelectTrigger size="sm" className="w-full sm:w-44">
            <SelectValue placeholder="Discipline" />
          </SelectTrigger>
          <SelectContent>
            {DISCIPLINES.map((d) => (
              <SelectItem key={d} value={d}>
                {d === 'All' ? 'All disciplines' : d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger size="sm" className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s === 'All' ? 'All statuses' : s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activity ID, name, or location"
            className="h-8 pl-8 text-sm"
          />
        </div>
      </div>

      <p className="text-xs text-slate-500">
        {!loading && !error && (
          <span className="tabular-nums">
            {activities.length} activit{activities.length === 1 ? 'y' : 'ies'}
          </span>
        )}
        {(loading || error) && <span>&nbsp;</span>}
      </p>

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
                .schedule({
                  discipline: discipline === 'All' ? undefined : discipline,
                  status: status === 'All' ? undefined : status,
                  search: search.trim() || undefined,
                })
                .then((r) => setActivities(r.activities))
                .catch((e) => setError((e as Error).message))
                .finally(() => setLoading(false))
            }}
          >
            <Loader2 className="mr-1 h-4 w-4" />
            Retry
          </Button>
        </div>
      )}

      {!error && loading && <ScheduleSkeleton />}

      {!error && !loading && activities.length === 0 && (
        <EmptyState
          title="No activities match your filters"
          description="Adjust the discipline, status, or search filter above."
          icon={<CalendarRange className="h-8 w-8" />}
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDiscipline('All')
                setStatus('All')
                setSearch('')
              }}
            >
              Clear filters
            </Button>
          }
        />
      )}

      {!error && !loading && activities.length > 0 && (
        <Card className="border-slate-200 py-0">
          <div className="max-h-[70vh] overflow-auto" style={{ scrollbarWidth: 'thin' }}>
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-white">
                <TableRow className="border-b border-slate-200">
                  <TableHead className="w-20 text-xs uppercase tracking-wide text-slate-500">Activity</TableHead>
                  <TableHead className="w-20 text-xs uppercase tracking-wide text-slate-500">WBS</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Discipline</TableHead>
                  <TableHead className="min-w-48 text-xs uppercase tracking-wide text-slate-500">Activity</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Location</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Planned</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Actual</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Status</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-slate-500">Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((a) => (
                  <TableRow key={a.id} className="text-xs">
                    <TableCell>
                      <span className="font-mono text-xs font-semibold text-slate-900">
                        {a.activityId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-slate-600">{a.wbs}</span>
                    </TableCell>
                    <TableCell>
                      <DisciplineTag value={a.discipline} />
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-slate-800">{a.activityName}</p>
                      {a.description && (
                        <p className="line-clamp-1 text-[11px] text-slate-500">
                          {a.description}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{a.location}</TableCell>
                    <TableCell className="tabular-nums text-slate-700">
                      <span className="block">{fmt(a.plannedStart)}</span>
                      <span className="block text-slate-400">→ {fmt(a.plannedFinish)}</span>
                    </TableCell>
                    <TableCell className="tabular-nums text-slate-700">
                      {a.actualStart || a.actualFinish ? (
                        <>
                          <span className="block">{fmt(a.actualStart)}</span>
                          <span className="block text-slate-400">→ {fmt(a.actualFinish)}</span>
                        </>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge value={a.status} />
                    </TableCell>
                    <TableCell>
                      <VariancePill
                        plannedFinish={a.plannedFinish}
                        actualFinish={a.actualFinish}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  )
}

function ScheduleSkeleton() {
  return (
    <Card className="border-slate-200 py-0">
      <div className="space-y-0">
        <div className="border-b border-slate-200 px-3 py-2">
          <div className="flex gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-16" />
            ))}
          </div>
        </div>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-b border-slate-100 px-3 py-2.5">
            <div className="flex gap-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
