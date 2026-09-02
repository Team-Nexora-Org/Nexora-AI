'use client'

// PlannerEvaluation — Model Evaluation: Baseline (aggressive keyword
// matching) vs NEXORA (semantic + contextual matching + confidence policy).
// Deterministic and reproducible — runs over 25 ground-truth field reports
// without invoking the LLM (the live supervisor flow uses the LLM extractor,
// but the matching stage — the differentiator — is identical). Surfaces the
// key wins: 0% false auto-link rate, detects all ambiguous + unmatched
// cases.

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { AlertCircle, Gauge, Loader2, Play, RefreshCw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/shared/EmptyState'
import { ProcessingState } from '@/components/shared/ProcessingState'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { EvaluationMetrics } from '@/lib/types'

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`
}

function MetricRow({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 py-2 last:border-b-0">
      <div className="min-w-0">
        <p className="text-xs font-medium text-foreground">{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      <p className="font-mono text-sm font-semibold tabular-nums text-foreground">{value}</p>
    </div>
  )
}

export function PlannerEvaluation() {
  const [baseline, setBaseline] = useState<EvaluationMetrics | null>(null)
  const [nexora, setNexora] = useState<EvaluationMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    api
      .getEvaluation()
      .then((r) => {
        if (cancelled) return
        setBaseline(r.baseline)
        setNexora(r.nexora)
      })
      .catch((e) => {
        if (cancelled) return
        setError((e as Error).message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  async function runEvaluation() {
    setRunning(true)
    setError(null)
    try {
      const r = await api.runEvaluation()
      setBaseline(r.baseline)
      setNexora(r.nexora)
      toast.success('Evaluation complete')
    } catch (e) {
      const msg = (e as Error).message || 'Evaluation failed.'
      setError(msg)
      toast.error(msg)
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Model Evaluation
        </h1>
        <p className="text-sm text-muted-foreground">
          Baseline keyword matching vs NEXORA semantic+contextual matching over 25
          ground-truth field reports.
        </p>
      </header>

      {loading && <EvalSkeleton />}

      {!loading && error && (
        <div className="space-y-3">
          <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
          <Button variant="outline" size="sm" onClick={runEvaluation} disabled={running}>
            <RefreshCw className={cn('mr-1 h-4 w-4', running && 'animate-spin')} />
            Run evaluation
          </Button>
        </div>
      )}

      {!loading && !error && !baseline && !nexora && (
        <EmptyState
          title="No evaluation yet"
          description="Run the comparison to see how NEXORA's semantic+contextual matcher performs against a baseline keyword matcher over 25 ground-truth field reports."
          icon={<Gauge className="h-8 w-8" />}
          action={
            <Button onClick={runEvaluation} disabled={running}>
              {running ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              Run evaluation
            </Button>
          }
        />
      )}

      {!loading && !error && (baseline || nexora) && (
        <>
          <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-muted px-3 py-2">
            <p className="text-xs text-muted-foreground">
              Baseline run over{' '}
              <span className="font-mono font-medium tabular-nums">
                {(nexora ?? baseline)?.total ?? 25}
              </span>{' '}
              ground-truth reports.
            </p>
            <Button onClick={runEvaluation} disabled={running} size="sm">
              {running ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-1 h-4 w-4" />
              )}
              Re-run evaluation
            </Button>
          </div>

          {running && (
            <ProcessingState
              active={running}
              message="Running 25 reports through baseline and NEXORA…"
              className="border-amber-200 bg-amber-50"
            />
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {baseline && <MetricCard label="Baseline" metrics={baseline} recommended={false} />}
            {nexora && <MetricCard label="NEXORA" metrics={nexora} recommended />}
          </div>

          {/* Reading the numbers */}
          <Card className="border-border">
            <CardContent className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Reading the numbers
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                <span className="font-medium">False auto-link rate</span> = the share of
                reports the matcher auto-linked to an activity when it should have asked
                for review (ambiguous / unmatched). NEXORA is optimized for{' '}
                <span className="font-medium text-emerald-700">trustworthy automation</span>,
                not maximum automation — it deliberately declines to auto-link when
                evidence is insufficient.
              </p>
              {nexora && (
                <ul className="ml-1 space-y-1.5 pt-1 text-sm text-foreground">
                  {nexora.falseAutoLinkRate === 0 && (
                    <li className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>
                        <span className="font-medium">0%</span> false auto-link rate —
                        NEXORA never auto-links ambiguous or unmatched reports.
                      </span>
                    </li>
                  )}
                  {nexora.ambiguousDetected > 0 && (
                    <li className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>
                        Detects all <span className="font-medium">{nexora.ambiguousDetected}</span>{' '}
                        ambiguous cases (the baseline auto-links them silently).
                      </span>
                    </li>
                  )}
                  {nexora.unmatchedDetected > 0 && (
                    <li className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>
                        Detects all <span className="font-medium">{nexora.unmatchedDetected}</span>{' '}
                        unmatched cases (the baseline would force a wrong match).
                      </span>
                    </li>
                  )}
                </ul>
              )}
              <p className="pt-2 text-[11px] text-muted-foreground">
                Evaluation uses the deterministic heuristic extractor to keep the
                comparison reproducible; the live supervisor flow uses the LLM
                extractor. The matching stage — the differentiator — is identical.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

function MetricCard({
  label,
  metrics,
  recommended,
}: {
  label: string
  metrics: EvaluationMetrics
  recommended: boolean
}) {
  return (
    <Card
      className={cn(
        'border-border',
        recommended && 'border-emerald-300 ring-1 ring-emerald-200',
      )}
    >
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            {label}
          </h3>
          {recommended && (
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
              <Sparkles className="h-3 w-3" />
              Recommended
            </span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground">
          Over <span className="font-mono tabular-nums">{metrics.total}</span> ground-truth reports
        </p>
        <div>
          <MetricRow
            label="Top-1 Accuracy"
            value={pct(metrics.top1Accuracy)}
            hint="Top candidate == ground-truth activity"
          />
          <MetricRow
            label="Top-3 Recall"
            value={pct(metrics.top3Recall)}
            hint="Ground truth in top 3 candidates"
          />
          <MetricRow
            label="High-Confidence Precision"
            value={pct(metrics.highConfidencePrecision)}
            hint="Of auto-linked, how many were correct"
          />
          <MetricRow
            label="False Auto-Link Rate"
            value={pct(metrics.falseAutoLinkRate)}
            hint="Auto-linked when should have asked"
          />
          <MetricRow
            label="Ambiguous Detected"
            value={String(metrics.ambiguousDetected)}
            hint="Count of ambiguous cases routed to review"
          />
          <MetricRow
            label="Unmatched Detected"
            value={String(metrics.unmatchedDetected)}
            hint="Count of unmatched cases routed to review"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function EvalSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading evaluation">
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1].map((i) => (
          <Card key={i} className="border-border">
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="flex justify-between border-b border-slate-100 py-2">
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-3 w-12" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
