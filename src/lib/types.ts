// NEXORA — Shared domain types (used across AI pipeline, API, and frontend)

export type InputType = 'text' | 'voice' | 'excel' | 'csv' | 'pdf'

export type ActivityStatus =
  | 'Not Started'
  | 'In Progress'
  | 'Completed'
  | 'Delayed'

export type DecisionLabel = 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED'

export type PlannerAction = 'APPROVED' | 'CHANGED' | 'REJECTED'

export interface ExecutionEvent {
  discipline: string | null
  workType: string | null
  identifier: string | null
  location: string | null
  actualStart: string | null
  actualFinish: string | null
  status: string | null
  quantity: string | null
  unit: string | null
  evidence: string | null
}

export interface ScheduleActivityDTO {
  id: string
  activityId: string
  wbs: string
  discipline: string
  activityName: string
  description: string
  location: string
  plannedStart: string
  plannedFinish: string
  actualStart: string | null
  actualFinish: string | null
  status: string
  searchText: string
}

export interface MatchSignal {
  identifier: number
  discipline: number
  workType: number
  semantic: number
  date: number
}

export interface CandidateMatch {
  rowId: string
  activityId: string
  activityName: string
  discipline: string
  location: string
  plannedStart: string
  plannedFinish: string
  actualStart: string | null
  actualFinish: string | null
  status: string
  signals: MatchSignal
  finalScore: number
  rank: number
  explanation: string[]
}

export interface ResolutionResult {
  executionEvent: ExecutionEvent
  candidates: CandidateMatch[]
  selectedActivityId: string | null
  topScore: number
  secondScore: number
  candidateMargin: number
  decision: DecisionLabel
  explanation: string[]
  rawText: string
  inputType: InputType
}

export interface AuditEventDTO {
  id: string
  entityType: string
  entityId: string
  action: string
  actor: string
  metadata: Record<string, unknown>
  createdAt: string
}

export interface PlannerInboxItem {
  reportId: string
  supervisorName: string
  discipline: string
  inputType: InputType
  rawContent: string
  reportDate: string
  createdAt: string
  resolved: boolean
  decision: DecisionLabel | null
  selectedActivityId: string | null
  selectedActivityName: string | null
  topScore: number | null
  plannerAction: PlannerAction | null
  plannerName: string | null
}

export interface IntelligenceResultRow {
  activityId: string
  activityName: string
  discipline: string
  location: string
  plannedFinish: string
  actualFinish: string
  status: string
  varianceDays: number | null
}

export interface EvaluationMetrics {
  label: string
  total: number
  top1Accuracy: number
  top3Recall: number
  highConfidencePrecision: number
  falseAutoLinkRate: number
  ambiguousDetected: number
  unmatchedDetected: number
  detail?: unknown
}

export interface Role {
  type: 'supervisor' | 'planner'
  name: string
  role: string
  discipline?: string
}
