'use client'

// SupervisorHome — the supervisor's field capture flow ("just tell us what
// happened"). Three input modes (Write / Speak / Upload), one AI pipeline,
// then a truthful "I understood" preview before the supervisor confirms the
// (already-persisted) report is sent to the planner.

import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  FileUp,
  ListChecks,
  Mic,
  Pencil,
  Square,
  Upload,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ProcessingState } from '@/components/shared/ProcessingState'
import { EvidenceHighlight } from '@/components/shared/EvidenceHighlight'
import { DisciplineTag } from '@/components/shared/DisciplineTag'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useApp } from '@/lib/store'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { InputType, ResolutionResult } from '@/lib/types'

type Mode = 'text' | 'voice' | 'upload'
type Phase = 'capture' | 'preview' | 'success'

const MODE_META: Record<Mode, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  text: { label: 'Write', icon: FileText },
  voice: { label: 'Speak', icon: Mic },
  upload: { label: 'Upload Report', icon: Upload },
}

function placeholderFor(discipline?: string): string {
  switch (discipline) {
    case 'Piping':
      return 'e.g. "Line 24-XX ka spool erection 29 August ko start hua tha aur 31 August ko complete hua."'
    case 'Civil':
      return 'e.g. "Foundation F-102 ka concrete casting 28 August ko start hua, 30 August ko complete ho gaya."'
    case 'Electrical':
      return 'e.g. "Compressor area me cable tray C-17 ki installation 29 August ko start ho gayi hai."'
    default:
      return 'e.g. "Line 24-XX ka spool erection 29 August ko start hua tha aur 31 August ko complete hua."'
  }
}

function transcriptFor(discipline?: string): string {
  switch (discipline) {
    case 'Piping':
      return 'Line 24-XX ka spool erection 29 August ko start hua tha aur 31 August ko complete hua. Pipe rack area me, Unit-4 expansion ke liye. Status completed hai.'
    case 'Civil':
      return 'Foundation F-102 ka concrete casting 28 August ko start hua, 30 August ko complete ho gaya. Total 45 cubic meter concrete pour kiya gaya. Status completed.'
    case 'Electrical':
      return 'Compressor area me cable tray C-17 ki installation 29 August ko start ho gayi hai. Abhi tak 40 meter tray install ho chuki hai. Status in progress.'
    default:
      return 'Line 24-XX ka spool erection 29 August ko start hua tha aur 31 August ko complete hua.'
  }
}

function formatSeconds(total: number): string {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function Dash() {
  return <span className="text-slate-400">—</span>
}

export function SupervisorHome() {
  const role = useApp((s) => s.role)
  const go = useApp((s) => s.go)

  const [mode, setMode] = useState<Mode>('text')
  const [phase, setPhase] = useState<Phase>('capture')

  // Write mode
  const [text, setText] = useState('')

  // Voice mode
  const [transcript, setTranscript] = useState('')
  const [recording, setRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [micError, setMicError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Upload mode
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null)
  const [extractedPreview, setExtractedPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  // Shared
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<ResolutionResult | null>(null)
  const [reportId, setReportId] = useState<string | null>(null)

  const mediaSupported =
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== 'undefined'

  // Cleanup any live mic stream + timer on unmount.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop()
        } catch {
          /* noop */
        }
      }
    }
  }, [])

  function switchMode(next: Mode) {
    if (next === mode) return
    if (recording) stopRecording()
    setMode(next)
    setPhase('capture')
    setResult(null)
    setReportId(null)
    setUploadedFilename(null)
    setExtractedPreview(null)
    setMicError(null)
    setProcessing(false)
  }

  function resetForAnother() {
    setText('')
    setTranscript('')
    setUploadedFilename(null)
    setExtractedPreview(null)
    setResult(null)
    setReportId(null)
    setPhase('capture')
    setProcessing(false)
  }

  async function runPipeline(inputType: InputType, rawContent: string) {
    if (!rawContent.trim()) return
    setProcessing(true)
    setPhase('capture')
    try {
      const r = await api.submitReport({ inputType, rawContent })
      setResult(r.result)
      setReportId(r.reportId)
      setPhase('preview')
    } catch (e) {
      toast.error((e as Error).message || 'Could not understand your report. Try again.')
    } finally {
      setProcessing(false)
    }
  }

  async function handleFileSelected(file: File) {
    setProcessing(true)
    setPhase('capture')
    setResult(null)
    setReportId(null)
    setUploadedFilename(null)
    setExtractedPreview(null)
    try {
      const r = await api.uploadReport(file)
      setResult(r.result)
      setReportId(r.reportId)
      setUploadedFilename(r.filename)
      setExtractedPreview(r.extractedPreview)
      setPhase('preview')
    } catch (e) {
      toast.error((e as Error).message || 'Could not process that file.')
    } finally {
      setProcessing(false)
    }
  }

  function startRecording() {
    setMicError(null)
    if (!mediaSupported) {
      setMicError('Voice recording is not available in this browser. Use the demo transcript below.')
      return
    }
    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then((stream) => {
        streamRef.current = stream
        const mr = new MediaRecorder(stream)
        audioChunksRef.current = []
        mr.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data)
        }
        mr.onstop = () => {
          setRecording(false)
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop())
            streamRef.current = null
          }
          mediaRecorderRef.current = null
        }
        mr.start()
        mediaRecorderRef.current = mr
        setRecording(true)
        setSeconds(0)
        timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
      })
      .catch(() => {
        setMicError('Microphone permission denied. Use the demo transcript below.')
      })
  }

  function stopRecording() {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    } catch {
      /* noop */
    }
  }

  function useDemoTranscript() {
    setTranscript(transcriptFor(role?.discipline))
  }

  // ---- Render ----

  if (phase === 'success' && result) {
    return (
      <SuccessCard
        decision={result.decision}
        onViewSubmissions={() => go('supervisor-submissions')}
        onReportAnother={resetForAnother}
      />
    )
  }

  if (phase === 'preview' && result) {
    return (
      <PreviewCard
        result={result}
        mode={mode}
        uploadedFilename={uploadedFilename}
        extractedPreview={extractedPreview}
        onConfirm={() => setPhase('success')}
        onEdit={() => {
          setResult(null)
          setReportId(null)
          setUploadedFilename(null)
          setExtractedPreview(null)
          setPhase('capture')
        }}
      />
    )
  }

  // phase === 'capture'
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-500">
          Hi, {role?.name ?? 'Supervisor'} — {role?.role ?? ''}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          What happened today?
        </h1>
        <p className="text-sm text-slate-500">
          Tell NEXORA. We&apos;ll connect it to the project schedule.
        </p>
      </div>

      {/* Mode segmented control */}
      <div
        role="tablist"
        aria-label="Reporting mode"
        className="grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1"
      >
        {(['text', 'voice', 'upload'] as Mode[]).map((m) => {
          const cfg = MODE_META[m]
          const Icon = cfg.icon
          const active = mode === m
          return (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => switchMode(m)}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-transparent text-slate-600 hover:bg-slate-200/60',
              )}
            >
              <Icon className="h-4 w-4" />
              {cfg.label}
            </button>
          )
        })}
      </div>

      {processing && <ProcessingState active message="Understanding field report…" />}

      {!processing && mode === 'text' && (
        <WriteForm
          text={text}
          setText={setText}
          placeholder={placeholderFor(role?.discipline)}
          onSubmit={() => runPipeline('text', text)}
        />
      )}

      {!processing && mode === 'voice' && (
        <VoiceForm
          transcript={transcript}
          setTranscript={setTranscript}
          recording={recording}
          seconds={seconds}
          micError={micError}
          mediaSupported={mediaSupported}
          onStart={startRecording}
          onStop={stopRecording}
          onUseDemo={useDemoTranscript}
          onSubmit={() => runPipeline('voice', transcript)}
        />
      )}

      {!processing && mode === 'upload' && (
        <UploadForm
          dragActive={dragActive}
          setDragActive={setDragActive}
          onFileSelected={handleFileSelected}
        />
      )}
    </div>
  )
}

// ---- Write form ----
function WriteForm({
  text,
  setText,
  placeholder,
  onSubmit,
}: {
  text: string
  setText: (v: string) => void
  placeholder: string
  onSubmit: () => void
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-3"
    >
      <label htmlFor="report-text" className="sr-only">
        Your field report
      </label>
      <Textarea
        id="report-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="min-h-[140px] resize-y"
        aria-describedby="report-text-count"
      />
      <div className="flex items-center justify-between gap-3">
        <span id="report-text-count" className="text-xs text-slate-400 tabular-nums">
          {text.length} characters
        </span>
        <Button type="submit" disabled={!text.trim()}>
          <FileText className="h-4 w-4" />
          Understand this report
        </Button>
      </div>
    </form>
  )
}

// ---- Voice form ----
function VoiceForm({
  transcript,
  setTranscript,
  recording,
  seconds,
  micError,
  mediaSupported,
  onStart,
  onStop,
  onUseDemo,
  onSubmit,
}: {
  transcript: string
  setTranscript: (v: string) => void
  recording: boolean
  seconds: number
  micError: string | null
  mediaSupported: boolean
  onStart: () => void
  onStop: () => void
  onUseDemo: () => void
  onSubmit: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        {recording ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-3 w-3 animate-pulse rounded-full bg-rose-500"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">Recording…</p>
                <p className="text-xs text-slate-500 tabular-nums" aria-live="polite">
                  {formatSeconds(seconds)}
                </p>
              </div>
            </div>
            <Button type="button" variant="destructive" onClick={onStop}>
              <Square className="h-4 w-4" />
              Stop
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={onStart}
              className="h-12 w-12 rounded-full bg-slate-900 p-0 text-white hover:bg-slate-800"
              aria-label="Start voice recording"
              disabled={!mediaSupported}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <div className="text-sm">
              <p className="font-medium text-slate-800">Record your update</p>
              <p className="text-xs text-slate-500">
                {mediaSupported
                  ? 'Tap to record from your microphone.'
                  : 'Voice recording is not available in this browser.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {micError && (
        <p className="text-xs text-amber-700" role="status">
          {micError}
        </p>
      )}

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
        Demo transcript mode — voice transport is mocked; the AI resolution is real.
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onUseDemo}>
          Use a demo transcript
        </Button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="space-y-3"
      >
        <label htmlFor="report-transcript" className="sr-only">
          Voice transcript
        </label>
        <Textarea
          id="report-transcript"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Your transcript will appear here. You can also edit it before submitting."
          className="min-h-[120px] resize-y"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!transcript.trim()}>
            <Mic className="h-4 w-4" />
            Submit transcript
          </Button>
        </div>
      </form>
    </div>
  )
}

// ---- Upload form ----
function UploadForm({
  dragActive,
  setDragActive,
  onFileSelected,
}: {
  dragActive: boolean
  setDragActive: (v: boolean) => void
  onFileSelected: (file: File) => void
}) {
  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) onFileSelected(file)
  }
  return (
    <div>
      <label className="block cursor-pointer">
        <span className="sr-only">Upload a report file (.txt, .csv, .xlsx, .pdf)</span>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDragEnter={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setDragActive(false)
          }}
          className={cn(
            'rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors',
            dragActive
              ? 'border-amber-400 bg-amber-50'
              : 'border-slate-300 bg-slate-50 hover:bg-slate-100',
          )}
        >
          <FileUp className="mx-auto h-10 w-10 text-slate-400" aria-hidden />
          <p className="mt-3 text-sm font-medium text-slate-700">
            Tap to choose a file or drag it here
          </p>
          <p className="mt-1 text-xs text-slate-500">.txt, .csv, .xlsx, .pdf</p>
          <input
            type="file"
            accept=".txt,.csv,.xlsx,.xls,.pdf"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              e.target.value = ''
              if (file) onFileSelected(file)
            }}
          />
        </div>
      </label>
    </div>
  )
}

// ---- Preview card ----
function PreviewCard({
  result,
  mode,
  uploadedFilename,
  extractedPreview,
  onConfirm,
  onEdit,
}: {
  result: ResolutionResult
  mode: Mode
  uploadedFilename: string | null
  extractedPreview: string | null
  onConfirm: () => void
  onEdit: () => void
}) {
  const ev = result.executionEvent
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <Check className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">I understood</h2>
          <p className="text-xs text-slate-500">
            Here is what NEXORA extracted from your report.
          </p>
        </div>
      </div>

      {mode === 'upload' && uploadedFilename && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
            <FileText className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{uploadedFilename}</span>
          </div>
          {extractedPreview && (
            <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-xs text-slate-600">
              {extractedPreview}
            </p>
          )}
        </div>
      )}

      <Card className="border-slate-200">
        <CardContent className="space-y-4">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <Field label="Discipline">
              {ev.discipline ? <DisciplineTag value={ev.discipline} /> : <Dash />}
            </Field>
            <Field label="Work Type">{ev.workType ?? <Dash />}</Field>
            <Field label="Identifier">{ev.identifier ?? <Dash />}</Field>
            <Field label="Location">{ev.location ?? <Dash />}</Field>
            <Field label="Actual Start">{ev.actualStart ?? <Dash />}</Field>
            <Field label="Actual Finish">{ev.actualFinish ?? <Dash />}</Field>
            <Field label="Status">
              {ev.status ? <StatusBadge value={ev.status} /> : <Dash />}
            </Field>
            <Field label="Quantity / Unit">
              {ev.quantity || ev.unit
                ? `${ev.quantity ?? '—'} ${ev.unit ?? ''}`.trim()
                : <Dash />}
            </Field>
          </dl>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Evidence from your report
            </div>
            <EvidenceHighlight raw={result.rawText} evidence={ev.evidence} />
          </div>

          <DecisionSummary decision={result.decision} />

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button type="button" onClick={onConfirm}>
              <Check className="h-4 w-4" />
              Confirm &amp; Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="text-sm font-medium text-slate-800">{children}</dd>
    </div>
  )
}

function DecisionSummary({ decision }: { decision: ResolutionResult['decision'] }) {
  if (decision === 'HIGH_CONFIDENCE') {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        NEXORA connected this to a planned schedule activity with high confidence. Your planner
        will review and update the schedule.
      </div>
    )
  }
  if (decision === 'NEEDS_REVIEW') {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        NEXORA found several plausible planned activities but needs your planner to confirm which
        one. Your report has been sent for review.
      </div>
    )
  }
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
      NEXORA could not find a matching planned activity. Your report has been preserved for your
      planner to review.
    </div>
  )
}

// ---- Success card ----
function SuccessCard({
  decision,
  onViewSubmissions,
  onReportAnother,
}: {
  decision: ResolutionResult['decision']
  onViewSubmissions: () => void
  onReportAnother: () => void
}) {
  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h2 className="mt-5 text-xl font-semibold text-slate-900">Submitted to your planner</h2>
      <p className="mt-1.5 text-sm text-slate-500">{summaryForSuccess(decision)}</p>
      <div className="mt-6 flex flex-col gap-2">
        <Button onClick={onViewSubmissions}>
          <ListChecks className="h-4 w-4" />
          View my submissions
        </Button>
        <Button variant="ghost" onClick={onReportAnother}>
          <ArrowRight className="h-4 w-4" />
          Report another
        </Button>
      </div>
    </div>
  )
}

function summaryForSuccess(decision: ResolutionResult['decision']): string {
  if (decision === 'HIGH_CONFIDENCE') {
    return 'Your field report was connected to the schedule with high confidence and sent for planner review.'
  }
  if (decision === 'NEEDS_REVIEW') {
    return 'Your field report was sent to your planner, who will confirm the matching activity.'
  }
  return 'Your field report was preserved for your planner to review.'
}
