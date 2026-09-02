// NEXORA — typed client API wrappers (browser fetch, relative paths only)

import type {
  AuditEventDTO,
  EvaluationMetrics,
  IntelligenceResultRow,
  InputType,
  PlannerInboxItem,
  ResolutionResult,
  Role,
  ScheduleActivityDTO,
} from '@/lib/types'

async function jsonOrThrow<T>(resOrPromise: Response | Promise<Response>): Promise<T> {
  const res = await resOrPromise
  const data = (await res.json().catch(() => ({}))) as T & { ok?: boolean; error?: string }
  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error ?? `Request failed (${res.status})`)
  }
  return data as T
}

export interface StateResponse {
  role: Role | null
  project: {
    id: string
    code: string
    name: string
    description: string
    scheduleSource: string
    _count: { scheduleActivities: number; fieldReports: number }
  } | null
  counts: {
    incoming: number
    aiResolved: number
    needsReview: number
    unmatched: number
    approved: number
    rejected: number
    changed: number
  } | null
}

export const api = {
  state: () => jsonOrThrow<StateResponse>(fetch('/api/state')),

  login: (profile: 'supervisor' | 'planner', supervisorId?: string) =>
    jsonOrThrow<{ ok: boolean; role: Role }>(
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, supervisorId }),
      }),
    ),
  logout: () =>
    jsonOrThrow<{ ok: boolean }>(fetch('/api/auth/logout', { method: 'POST' })),

  supervisors: () =>
    jsonOrThrow<{
      supervisors: { id: string; name: string; role: string; discipline: string }[]
    }>(fetch('/api/supervisors')),

  schedule: (params?: { discipline?: string; status?: string; search?: string }) => {
    const q = new URLSearchParams()
    if (params?.discipline) q.set('discipline', params.discipline)
    if (params?.status) q.set('status', params.status)
    if (params?.search) q.set('search', params.search)
    return jsonOrThrow<{ activities: ScheduleActivityDTO[] }>(
      fetch(`/api/schedule?${q.toString()}`),
    )
  },

  submitReport: (body: { supervisorId?: string; inputType: InputType; rawContent: string }) =>
    jsonOrThrow<{ ok: boolean; reportId: string; result: ResolutionResult }>(
      fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
    ),

  uploadReport: (file: File) => {
    const form = new FormData()
    form.append('file', file)
    return jsonOrThrow<{
      ok: boolean
      reportId: string
      filename: string
      inputType: InputType
      extractedPreview: string
      result: ResolutionResult
    }>(fetch('/api/reports/upload', { method: 'POST', body: form }))
  },

  transcribe: (blob: Blob, filename = 'recording.webm') => {
    const form = new FormData()
    form.append('file', new File([blob], filename, { type: blob.type || 'audio/webm' }))
    return jsonOrThrow<{ ok: boolean; text: string }>(
      fetch('/api/transcribe', { method: 'POST', body: form }),
    )
  },

  inbox: () => jsonOrThrow<{ items: PlannerInboxItem[] }>(fetch('/api/planner/inbox')),

  review: (id: string) =>
    jsonOrThrow<{
      ok: boolean
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
      candidates: Array<{
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
        signals: { identifier: number; discipline: number; workType: number; semantic: number; date: number }
        finalScore: number
        rank: number
        isTop: boolean
        explanation: string[]
      }>
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
    }>(fetch(`/api/planner/review/${id}`)),

  decide: (id: string, body: { action: 'APPROVED' | 'CHANGED' | 'REJECTED'; selectedActivityId?: string; reason?: string }) =>
    jsonOrThrow<{
      ok: boolean
      action: string
      activity?: { activityId: string; activityName: string; actualStart: string | null; actualFinish: string | null; status: string }
    }>(fetch(`/api/planner/review/${id}/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })),

  intelligence: (q: string) =>
    jsonOrThrow<{
      q: string
      title: string
      description: string
      rows: IntelligenceResultRow[]
    }>(fetch(`/api/intelligence?q=${encodeURIComponent(q)}`)),

  audit: (params?: { entityType?: string; entityId?: string; limit?: number }) => {
    const u = new URLSearchParams()
    if (params?.entityType) u.set('entityType', params.entityType)
    if (params?.entityId) u.set('entityId', params.entityId)
    if (params?.limit) u.set('limit', String(params.limit))
    return jsonOrThrow<{ events: AuditEventDTO[] }>(fetch(`/api/audit?${u.toString()}`))
  },

  runEvaluation: () =>
    jsonOrThrow<{ ok: boolean; baseline: EvaluationMetrics; nexora: EvaluationMetrics }>(
      fetch('/api/evaluation', { method: 'POST' }),
    ),
  getEvaluation: () =>
    jsonOrThrow<{ ok: boolean; baseline: EvaluationMetrics | null; nexora: EvaluationMetrics | null }>(
      fetch('/api/evaluation'),
    ),

  resetDemo: () => jsonOrThrow<{ ok: boolean }>(fetch('/api/seed', { method: 'POST' })),
}
