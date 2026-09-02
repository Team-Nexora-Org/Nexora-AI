'use client'

// PlannerReview — the full resolution card for a single field report. The
// "WOW" view on the planner side: shows the original field statement with
// evidence highlighted, the AI-extracted execution event, the suggested
// activity (top candidate) with confidence + candidate margin, a "why this
// match" explanation, planned-vs-actual with variance pill, the full
// candidate table (for disambiguation), and an action area with Approve /
// Change Match / Reject flows (with dialogs). After a decision is submitted,
// a success state replaces the action area and points to the audit trail.

import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { toast } from 'sonner'
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  FileCode,
  FileSpreadsheet,
  FileText,
  Loader2,
  Mic,
  ScrollText,
  User,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EmptyState } from '@/components/shared/EmptyState'
import { EvidenceHighlight } from '@/components/shared/EvidenceHighlight'
import { ActionBadge, StatusBadge } from '@/components/shared/StatusBadge'
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge'
import { DisciplineTag } from '@/components/shared/DisciplineTag'
import { VariancePill } from '@/components/shared/VariancePill'
import { useApp } from '@/lib/store'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { InputType } from '@/lib/types'

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

type Candidate = {
  rowId: string
  matchId: string
  activityId: string
  activityName: string
  discipline: string
  wbs: string
  location: string
  plannedStart: string
  plannedFinish: string
  actualStart: string | null
  actualFinish: string | null
  status: string
  signals: {
    identifier: number
    discipline: number
    workType: number
    semantic: number
    date: number
  }
  finalScore: number
  rank: number
  isTop: boolean
  explanation: string[]
}

type ReviewData = {
  report: {
    id: string
    supervisorName: string
    discipline: string
    inputType: InputType
    rawContent: string
    reportDate: string
    fileUrl: string | null
    createdAt: string
  }
  executionEvent: {
    discipline: string
    workType: string
    identifier: string
    location: string | null
    actualStart: string | null
    actualFinish: string | null
    status: string | null
    quantity: string | null
    unit: string | null
    evidence: string | null
  }
  candidates: Candidate[]
  decision: string | null
  topScore: number | null
  secondScore: number | null
  candidateMargin: number | null
  selectedActivityId: string | null
  plannerDecision: {
    action: string
    aiSuggestedActivityId: string | null
    selectedActivityId: string | null
    plannerName: string
    reason: string | null
    createdAt: string
  } | null
}

type SuccessState = {
  action: 'APPROVED' | 'CHANGED' | 'REJECTED'
  activity?: {
    activityId: string
    activityName: string
    actualStart: string | null
    actualFinish: string | null
    status: string
  }
  reason?: string | null
  aiSuggested?: string | null
  selectedActivityId?: string
}

function fmtDate(d?: string | null, withTime = false): string {
  if (!d) return '—'
  try {
    return format(parseISO(d), withTime ? 'd MMM yyyy HH:mm' : 'd MMM yyyy')
  } catch {
    return d
  }
}

function pct(n: number | null): string {
  if (n === null || n === undefined) return '—'
  return `${(n * 100).toFixed(1)}%`
}

function FieldCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="space-y-0.5">
      <dt className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{value ?? '—'}</dd>
    </div>
  )
}

export function PlannerReview() {
  const go = useApp((s) => s.go)
  const reportId = useApp((s) => s.selectedReportId)
  const role = useApp((s) => s.role)
  const [data, setData] = useState<ReviewData | null>(null)
  const [loading, setLoading] = useState(!!reportId)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!reportId) return
    let cancelled = false
    api
      .review(reportId)
      .then((r) => {
        if (cancelled) return
        setData(r as unknown as ReviewData)
      })
      .catch((e) => {
        if (cancelled) return
        setError((e as Error).message || 'Could not load review.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [reportId])

  if (!reportId) {
    return (
      <EmptyState
        title="No report selected"
        description="Open a report from the inbox to review."
        icon={<FileText className="h-8 w-8" />}
        action={
          <Button onClick={() => go('planner-inbox')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to inbox
          </Button>
        }
      />
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => go('planner-inbox')}
          className="-ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to inbox
        </Button>
      </div>

      {loading && <ReviewSkeleton />}

      {!loading && error && (
        <div className="space-y-3">
          <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
          <Button variant="outline" onClick={() => go('planner-inbox')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to inbox
          </Button>
        </div>
      )}

      {!loading && !error && data && (
        <ReviewContent
          data={data}
          reportId={reportId}
          plannerName={role?.name ?? 'Planner'}
          onBack={() => go('planner-inbox')}
          onAudit={() => go('planner-audit')}
        />
      )}
    </div>
  )
}

function ReviewSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading report">
      <Card className="border-border py-5">
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
      <Card className="border-border py-5">
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-border py-5">
        <CardContent className="space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

function ReviewContent({
  data,
  reportId,
  plannerName,
  onBack,
  onAudit,
}: {
  data: ReviewData
  reportId: string
  plannerName: string
  onBack: () => void
  onAudit: () => void
}) {
  const report = data.report
  const ev = data.executionEvent
  const meta = INPUT_META[report.inputType] ?? INPUT_META.text
  const InputIcon = meta.icon
  const top = data.candidates.find((c) => c.isTop) ?? data.candidates[0] ?? null
  const decision = data.decision as string | null

  return (
    <div className="space-y-4">
      {/* FIELD REPORT */}
      <Card className="border-border">
        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 text-foreground">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium">{report.supervisorName}</span>
            </span>
            <DisciplineTag value={report.discipline} />
            <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              <InputIcon className="h-3 w-3" />
              {meta.label}
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground tabular-nums">
              <Clock className="h-3 w-3 text-muted-foreground" />
              {fmtDate(report.reportDate)}
            </span>
          </div>
          <div className="rounded-md border-l-2 border-amber-300 bg-muted px-3 py-2.5">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Field report
            </p>
            <EvidenceHighlight raw={report.rawContent} evidence={ev.evidence} />
          </div>
        </CardContent>
      </Card>

      {/* AI EXTRACTED */}
      <Card className="border-border">
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              AI Extracted
            </h3>
          </div>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <FieldCell label="Discipline" value={<DisciplineTag value={ev.discipline} />} />
            <FieldCell label="Work Type" value={ev.workType} />
            <FieldCell label="Identifier" value={ev.identifier} />
            <FieldCell label="Location" value={ev.location} />
            <FieldCell label="Actual Start" value={<span className="tabular-nums">{fmtDate(ev.actualStart)}</span>} />
            <FieldCell label="Actual Finish" value={<span className="tabular-nums">{fmtDate(ev.actualFinish)}</span>} />
            <FieldCell label="Status" value={<StatusBadge value={ev.status} />} />
            <FieldCell label="Quantity" value={ev.quantity} />
            <FieldCell label="Unit" value={ev.unit} />
          </dl>
        </CardContent>
      </Card>

      {/* SUGGESTED ACTIVITY */}
      <Card className="border-border">
        <CardContent className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Suggested Activity
          </h3>
          {decision === 'UNMATCHED' || !top ? (
            <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-4 text-rose-800">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <X className="h-4 w-4" />
                No reliable match
              </div>
              <p className="mt-1 text-sm text-rose-700">
                The system could not find a sufficiently similar planned activity.
              </p>
              {top && (
                <div className="mt-3 rounded-md border border-border bg-card px-3 py-2 text-foreground">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    Weak top candidate (below threshold)
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-medium text-foreground">
                    {top.activityId}
                  </p>
                  <p className="text-sm text-foreground">{top.activityName}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="font-mono text-lg font-semibold text-foreground">
                    {top.activityId}
                  </p>
                  <p className="text-base text-foreground">{top.activityName}</p>
                  <p className="text-xs text-muted-foreground">
                    {top.wbs} · {top.location}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <ConfidenceBadge score={data.topScore} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Candidate margin:{' '}
                <span className="font-medium text-foreground tabular-nums">
                  {pct(data.candidateMargin)}
                </span>{' '}
                <span className="text-muted-foreground">
                  (second: <span className="tabular-nums">{pct(data.secondScore)}</span>)
                </span>
              </p>
            </>
          )}

          {/* WHY THIS MATCH? */}
          {top && top.explanation.length > 0 && (
            <div className="space-y-2 pt-1">
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Why this match?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {top.explanation.map((ex, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-medium text-foreground"
                  >
                    <Check className="h-3 w-3 text-emerald-600" />
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PLANNED vs ACTUAL */}
          {top && (
            <div className="grid gap-3 rounded-md border border-border bg-card px-3 py-3 sm:grid-cols-2">
              <div className="space-y-0.5">
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Planned
                </p>
                <p className="text-sm tabular-nums text-foreground">
                  {fmtDate(top.plannedStart)} → {fmtDate(top.plannedFinish)}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Actual
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm tabular-nums text-foreground">
                    {fmtDate(top.actualStart)} → {fmtDate(top.actualFinish)}
                  </p>
                  <VariancePill
                    plannedFinish={top.plannedFinish}
                    actualFinish={top.actualFinish ?? ev.actualFinish}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CANDIDATES */}
      {data.candidates.length > 0 && (
        <Card className="border-border">
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Candidates
              </h3>
              <span className="text-xs text-muted-foreground tabular-nums">
                {data.candidates.length} ranked
              </span>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8 text-right">#</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Discipline</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead>Signals</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.candidates.map((c) => (
                    <TableRow
                      key={c.rowId}
                      className={cn(
                        c.isTop && 'bg-amber-50/60',
                        'text-xs',
                      )}
                    >
                      <TableCell className="text-right font-medium tabular-nums text-muted-foreground">
                        {c.rank}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-foreground">
                            {c.activityId}
                          </span>
                          {c.isTop && (
                            <span className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-700">
                              Top
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{c.activityName}</p>
                      </TableCell>
                      <TableCell>
                        <DisciplineTag value={c.discipline} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{c.location}</TableCell>
                      <TableCell className="text-right">
                        <ConfidenceBadge score={c.finalScore} />
                      </TableCell>
                      <TableCell>
                        <SignalBar signals={c.signals} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {decision === 'NEEDS_REVIEW' && (
              <p className="text-xs text-amber-700">
                Multiple plausible activities — disambiguate via Change Match below.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* ACTIONS / DECISION SUMMARY */}
      <ActionArea
        data={data}
        reportId={reportId}
        plannerName={plannerName}
        onBack={onBack}
        onAudit={onAudit}
      />
    </div>
  )
}

function SignalBar({
  signals,
}: {
  signals: Candidate['signals']
}) {
  const items: { label: string; value: number }[] = [
    { label: 'ID', value: signals.identifier },
    { label: 'Disc', value: signals.discipline },
    { label: 'WT', value: signals.workType },
    { label: 'Sem', value: signals.semantic },
    { label: 'Date', value: signals.date },
  ]
  return (
    <div className="flex gap-1">
      {items.map((it) => {
        const pctv = Math.round(it.value * 100)
        return (
          <div
            key={it.label}
            title={`${it.label}: ${pctv}%`}
            className="flex w-9 flex-col items-center gap-0.5"
          >
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  'h-full rounded-full',
                  pctv >= 80
                    ? 'bg-emerald-500'
                    : pctv >= 50
                      ? 'bg-amber-500'
                      : 'bg-rose-400',
                )}
                style={{ width: `${pctv}%` }}
              />
            </div>
            <span className="text-[9px] tabular-nums text-muted-foreground">
              {it.label} {pctv}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function ActionArea({
  data,
  reportId,
  plannerName,
  onBack,
  onAudit,
}: {
  data: ReviewData
  reportId: string
  plannerName: string
  onBack: () => void
  onAudit: () => void
}) {
  const [success, setSuccess] = useState<SuccessState | null>(null)
  const [processing, setProcessing] = useState(false)
  const [changeOpen, setChangeOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  // If a planner decision already exists server-side, show its read-only summary.
  if (data.plannerDecision) {
    return <DecisionSummary data={data} onBack={onBack} />
  }

  // If a local success state was recorded from this session, show it.
  if (success) {
    return (
      <SuccessView
        success={success}
        plannerName={plannerName}
        onBack={onBack}
        onAudit={onAudit}
      />
    )
  }

  const decision = data.decision
  const aiSuggested =
    data.candidates.find((c) => c.isTop)?.activityId ?? data.candidates[0]?.activityId ?? null

  async function handleApprove() {
    setProcessing(true)
    try {
      const r = await api.decide(reportId, { action: 'APPROVED' })
      setSuccess({
        action: 'APPROVED',
        activity: r.activity,
        aiSuggested,
      })
      toast.success('Schedule updated')
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setProcessing(false)
    }
  }

  async function handleChange() {
    if (!selectedCandidate) return
    setProcessing(true)
    try {
      const r = await api.decide(reportId, {
        action: 'CHANGED',
        selectedActivityId: selectedCandidate,
      })
      setSuccess({
        action: 'CHANGED',
        activity: r.activity,
        aiSuggested,
        selectedActivityId: selectedCandidate,
      })
      toast.success('Schedule updated with corrected match')
      setChangeOpen(false)
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setProcessing(false)
    }
  }

  async function handleReject(reason: string | null) {
    setProcessing(true)
    try {
      await api.decide(reportId, { action: 'REJECTED', reason: reason ?? undefined })
      setSuccess({ action: 'REJECTED', reason })
      toast.success('Report rejected')
      setRejectOpen(false)
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Card className="border-border">
      <CardContent className="space-y-4">
        {decision === 'NEEDS_REVIEW' && (
          <Banner tone="amber" icon={<AlertTriangle className="h-4 w-4" />}>
            Needs Review — multiple plausible activities found. Insufficient evidence for automatic resolution.
          </Banner>
        )}
        {decision === 'UNMATCHED' && (
          <Banner tone="rose" icon={<X className="h-4 w-4" />}>
            No reliable match — no sufficiently similar planned activity found.
          </Banner>
        )}

        {decision === 'HIGH_CONFIDENCE' && (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCandidate(aiSuggested)
                setChangeOpen(true)
              }}
            >
              Change Match
            </Button>
            <Button
              variant="ghost"
              className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              onClick={() => setRejectOpen(true)}
            >
              <X className="mr-1 h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={handleApprove}
              disabled={processing}
              className="bg-emerald-600 text-foreground hover:bg-emerald-700"
            >
              {processing ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-1 h-4 w-4" />
              )}
              Approve &amp; Update
            </Button>
          </div>
        )}

        {decision === 'NEEDS_REVIEW' && (
          <>
            <p className="text-xs text-muted-foreground">
              Approve is disabled — there is no clear top candidate. Use{' '}
              <span className="font-medium text-foreground">Change Match</span> to disambiguate.
            </p>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button
                variant="ghost"
                className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                onClick={() => setRejectOpen(true)}
              >
                <X className="mr-1 h-4 w-4" />
                Reject
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCandidate(aiSuggested)
                  setChangeOpen(true)
                }}
              >
                Change Match
              </Button>
              <Button
                disabled
                title="Disabled for needs-review reports"
                className="bg-emerald-600 text-foreground"
              >
                <Check className="mr-1 h-4 w-4" />
                Approve &amp; Update
              </Button>
            </div>
          </>
        )}

        {decision === 'UNMATCHED' && (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
              variant="ghost"
              className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              disabled={processing}
              onClick={() => handleReject('Dismissed')}
            >
              {processing ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <X className="mr-1 h-4 w-4" />
              )}
              Dismiss
            </Button>
            <Button
              variant="outline"
              disabled={processing}
              onClick={() => handleReject('Flagged for manual review')}
            >
              {processing ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <AlertTriangle className="mr-1 h-4 w-4" />
              )}
              Create Review Item
            </Button>
          </div>
        )}

        {!decision && (
          <p className="text-xs text-muted-foreground">
            This report has not yet been resolved by the AI pipeline.
          </p>
        )}

        {/* Change Match dialog */}
        <Dialog open={changeOpen} onOpenChange={setChangeOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Change Match</DialogTitle>
              <DialogDescription>
                Select the planned activity this report should be matched to. Your correction is recorded as labelled feedback for the matcher.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[50vh] space-y-2 overflow-y-auto">
              {data.candidates.map((c) => {
                const selected = selectedCandidate === c.activityId
                return (
                  <button
                    key={c.rowId}
                    type="button"
                    onClick={() => setSelectedCandidate(c.activityId)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-md border p-3 text-left transition-colors',
                      selected
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-border bg-card hover:border-border',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border',
                        selected ? 'border-emerald-600' : 'border-border',
                      )}
                      aria-hidden
                    >
                      {selected && <span className="h-2 w-2 rounded-full bg-emerald-600" />}
                    </span>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm font-medium text-foreground">
                          {c.activityId}
                        </span>
                        <ConfidenceBadge score={c.finalScore} />
                        {c.isTop && (
                          <span className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-700">
                            AI Top
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground">{c.activityName}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.discipline} · {c.location} · {c.wbs}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setChangeOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleChange}
                disabled={!selectedCandidate || processing}
                className="bg-emerald-600 text-foreground hover:bg-emerald-700"
              >
                {processing ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="mr-1 h-4 w-4" />
                )}
                Confirm change
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject dialog */}
        <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject report</DialogTitle>
              <DialogDescription>
                The report will be marked as rejected and no schedule update will be made.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <label
                htmlFor="reject-reason"
                className="text-xs font-medium text-muted-foreground"
              >
                Reason (optional)
              </label>
              <Textarea
                id="reject-reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. ambiguous — supervisor should re-submit with line identifier"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setRejectOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => handleReject(rejectReason.trim() || null)}
                disabled={processing}
                className="bg-rose-600 text-foreground hover:bg-rose-700"
              >
                {processing ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <X className="mr-1 h-4 w-4" />
                )}
                Confirm reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

function Banner({
  tone,
  icon,
  children,
}: {
  tone: 'amber' | 'rose'
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const cls =
    tone === 'amber'
      ? 'border-amber-200 bg-amber-50 text-amber-800'
      : 'border-rose-200 bg-rose-50 text-rose-800'
  return (
    <div className={cn('flex items-start gap-2 rounded-md border px-3 py-2.5 text-sm', cls)}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p>{children}</p>
    </div>
  )
}

function SuccessView({
  success,
  plannerName,
  onBack,
  onAudit,
}: {
  success: SuccessState
  plannerName: string
  onBack: () => void
  onAudit: () => void
}) {
  if (success.action === 'REJECTED') {
    return (
      <Card className="border-rose-200 bg-rose-50/50">
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-rose-700">
            <X className="h-5 w-5" />
            <p className="text-base font-semibold">Report rejected</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Rejected by <span className="font-medium text-foreground">{plannerName}</span>
            {success.reason ? (
              <>
                {' '}
                — reason: <span className="text-foreground">{success.reason}</span>
              </>
            ) : null}
          </p>
          <p className="text-xs text-muted-foreground">Audit trail recorded.</p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onAudit}>
              <ScrollText className="mr-1 h-4 w-4" />
              View audit
            </Button>
            <Button onClick={onBack}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to inbox
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isChanged = success.action === 'CHANGED'
  const act = success.activity
  return (
    <Card className="border-emerald-200 bg-emerald-50/40">
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-emerald-700">
          <CheckCircle2 className="h-5 w-5" />
          <p className="text-base font-semibold">
            {isChanged ? 'Schedule updated (human-corrected match)' : 'Schedule updated'}
          </p>
        </div>
        {act && (
          <div className="rounded-md border border-border bg-card px-3 py-2.5">
            <p className="font-mono text-sm font-semibold text-foreground">
              {act.activityId}
            </p>
            <p className="text-sm text-foreground">{act.activityName}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Actual finish:{' '}
              <span className="tabular-nums text-foreground">{fmtDate(act.actualFinish)}</span>
              {'  ·  '}Status: <StatusBadge value={act.status} />
            </p>
          </div>
        )}
        {isChanged && (
          <p className="text-xs text-muted-foreground">
            AI suggested{' '}
            <span className="font-mono font-medium text-foreground">
              {success.aiSuggested ?? '—'}
            </span>
            , you selected{' '}
            <span className="font-mono font-medium text-foreground">
              {success.selectedActivityId ?? '—'}
            </span>
            . The correction is logged as labelled feedback.
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Approved by <span className="font-medium text-foreground">{plannerName}</span> · Audit trail recorded.
        </p>
        <div className="flex items-center justify-end gap-2 pt-1">
          <Button variant="outline" onClick={onAudit}>
            <ScrollText className="mr-1 h-4 w-4" />
            View audit
          </Button>
          <Button onClick={onBack}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to inbox
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DecisionSummary({
  data,
  onBack,
}: {
  data: ReviewData
  onBack: () => void
}) {
  const d = data.plannerDecision!
  const act =
    d.selectedActivityId ?? d.aiSuggestedActivityId ?? null
  const top = data.candidates.find((c) => c.isTop) ?? data.candidates[0] ?? null

  return (
    <Card className="border-border">
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <ActionBadge value={d.action} />
          <span className="text-xs text-muted-foreground">
            by <span className="font-medium text-foreground">{d.plannerName}</span> on{' '}
            <span className="tabular-nums">{fmtDate(d.createdAt, true)}</span>
          </span>
        </div>

        {(d.action === 'APPROVED' || d.action === 'CHANGED') && (
          <div className="rounded-md border border-border bg-muted px-3 py-2.5">
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Schedule activity updated
            </p>
            <p className="mt-0.5 font-mono text-sm font-semibold text-foreground">
              {act ?? '—'}
            </p>
            {top && <p className="text-sm text-foreground">{top.activityName}</p>}
            {d.action === 'CHANGED' && (
              <p className="mt-1 text-xs text-muted-foreground">
                AI suggested{' '}
                <span className="font-mono font-medium text-foreground">
                  {d.aiSuggestedActivityId ?? '—'}
                </span>
                , planner selected{' '}
                <span className="font-mono font-medium text-foreground">
                  {d.selectedActivityId ?? '—'}
                </span>
                .
              </p>
            )}
          </div>
        )}

        {d.reason && (
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Reason:</span> {d.reason}
          </p>
        )}

        <p className="text-xs text-muted-foreground">Audit trail recorded.</p>

        <div className="flex items-center justify-end pt-1">
          <Button onClick={onBack}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to inbox
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
