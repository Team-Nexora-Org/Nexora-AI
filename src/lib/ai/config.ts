// NEXORA — AI pipeline configuration
// Prototype decision weights & thresholds. Not scientifically optimal —
// these are configurable prototype decision weights.

export const SCORING_WEIGHTS = {
  identifier: 0.4, // 40%
  discipline: 0.2, // 20%
  workType: 0.2, // 20%
  semantic: 0.15, // 15%
  date: 0.05, // 5%
} as const

export const THRESHOLDS = {
  // Below this top score -> UNMATCHED
  unmatchedTopScore: 0.5,
  // Above this top score AND margin above ambiguity -> HIGH_CONFIDENCE
  highConfidenceScore: 0.85,
  // If (top - second) below this -> NEEDS REVIEW (ambiguous)
  ambiguityMargin: 0.08,
  // Candidate retrieval top-K
  topK: 5,
} as const

export const DISCIPLINES = [
  'Civil',
  'Mechanical',
  'Piping',
  'Electrical',
  'Instrumentation',
] as const

export type Discipline = (typeof DISCIPLINES)[number]

// Canonical work types per discipline. Used by normalization + matching.
export const WORK_TYPES = {
  Civil: ['Excavation', 'Rebar', 'Concrete', 'Foundation', 'Backfill', 'Curb'],
  Mechanical: [
    'Equipment Installation',
    'Alignment',
    'Grouting',
    'Valve Installation',
  ],
  Piping: ['Welding', 'Spool Erection', 'Hydrotest', 'Pipe Support', 'Painting', 'Insulation'],
  Electrical: ['Cable Tray', 'Cable Pulling', 'Lighting Panel', 'Earthing', 'Termination', 'Megger Test', 'Junction Box', 'Motor Control Center'],
  Instrumentation: [
    'Instrument Installation',
    'Calibration',
    'Loop Test',
    'Control Valve',
  ],
} as const
