// NEXORA — Domain terminology normalization (deterministic)
// Maps heterogeneous field language to canonical discipline + work-type codes.

import { DISCIPLINES, WORK_TYPES } from './config'

// Discipline synonyms -> canonical discipline
const DISCIPLINE_SYNONYMS: Record<string, string> = {
  piping: 'Piping',
  pipe: 'Piping',
  pipes: 'Piping',
  pipeline: 'Piping',
  civil: 'Civil',
  concreting: 'Civil',
  excavation: 'Civil',
  mechanical: 'Mechanical',
  mech: 'Mechanical',
  equipment: 'Mechanical',
  pump: 'Mechanical',
  compressor: 'Mechanical',
  electrical: 'Electrical',
  elec: 'Electrical',
  cable: 'Electrical',
  wiring: 'Electrical',
  instrumentation: 'Instrumentation',
  instrument: 'Instrumentation',
  'instruments': 'Instrumentation',
  transmitter: 'Instrumentation',
  calibration: 'Instrumentation',
}

// Work-type synonyms -> canonical work type (per discipline)
const WORK_TYPE_SYNONYMS: Record<string, string> = {
  // Spool erection
  'spool erection': 'Spool Erection',
  'spool erected': 'Spool Erection',
  'spool erection complete': 'Spool Erection',
  'spool erection completed': 'Spool Erection',
  'spool installed': 'Spool Erection',
  'spool fix': 'Spool Erection',
  'spool fixed': 'Spool Erection',
  'spool fixing': 'Spool Erection',
  'erection finished': 'Spool Erection',
  'erection complete': 'Spool Erection',
  'erect spool': 'Spool Erection',
  'spool erect': 'Spool Erection',
  'erected': 'Spool Erection',
  // Welding
  'welding': 'Welding',
  'weld': 'Welding',
  'welded': 'Welding',
  'welding complete': 'Welding',
  // Hydrotest
  'hydrotest': 'Hydrotest',
  'hydro test': 'Hydrotest',
  'hydrostatic test': 'Hydrotest',
  'hydrostatic testing': 'Hydrotest',
  // Pipe support
  'pipe support': 'Pipe Support',
  'pipe support installation': 'Pipe Support',
  'support installed': 'Pipe Support',
  // Painting / insulation
  'painting': 'Painting',
  'paint': 'Painting',
  'insulation': 'Insulation',
  'insulate': 'Insulation',
  // Civil
  'excavation': 'Excavation',
  'excavate': 'Excavation',
  'trench': 'Excavation',
  'trenching': 'Excavation',
  'rebar': 'Rebar',
  'reinforcement': 'Rebar',
  'reinforcement steel': 'Rebar',
  'concrete': 'Concrete',
  'concreting': 'Concrete',
  'cast': 'Concrete',
  'casting': 'Concrete',
  'concrete casting': 'Concrete',
  'foundation': 'Foundation',
  'pedestal': 'Concrete',
  'curb': 'Curb',
  'backfill': 'Backfill',
  'backfilling': 'Backfill',
  // Mechanical
  'equipment installation': 'Equipment Installation',
  'install pump': 'Equipment Installation',
  'pump installation': 'Equipment Installation',
  'install compressor': 'Equipment Installation',
  'compressor installation': 'Equipment Installation',
  'install heat exchanger': 'Equipment Installation',
  'install vessel': 'Equipment Installation',
  'install valve': 'Valve Installation',
  'valve installation': 'Valve Installation',
  'alignment': 'Alignment',
  'align': 'Alignment',
  'align pump': 'Alignment',
  'align compressor': 'Alignment',
  'grouting': 'Grouting',
  'grout': 'Grouting',
  // Electrical
  'cable tray': 'Cable Tray',
  'cable tray installation': 'Cable Tray',
  'tray installation': 'Cable Tray',
  'cable pulling': 'Cable Pulling',
  'cable pull': 'Cable Pulling',
  'pulling': 'Cable Pulling',
  'lighting panel': 'Lighting Panel',
  'light panel': 'Lighting Panel',
  'earthing': 'Earthing',
  'grounding': 'Earthing',
  'earthing grid': 'Earthing',
  'termination': 'Termination',
  'megger test': 'Megger Test',
  'megger': 'Megger Test',
  'junction box': 'Junction Box',
  'jb': 'Junction Box',
  'motor control center': 'Motor Control Center',
  'mcc': 'Motor Control Center',
  // Instrumentation
  'instrument installation': 'Instrument Installation',
  'install transmitter': 'Instrument Installation',
  'transmitter installation': 'Instrument Installation',
  'install level switch': 'Instrument Installation',
  'calibration': 'Calibration',
  'calibrate': 'Calibration',
  'loop test': 'Loop Test',
  'loop testing': 'Loop Test',
  'control valve': 'Control Valve',
}

const DISCIPLINE_SET = new Set(DISCIPLINES)
const WORK_TYPE_SET = new Set(Object.values(WORK_TYPES).flat())

/**
 * Normalize a free-text discipline into a canonical discipline name.
 */
export function normalizeDiscipline(raw: string | null | undefined): string | null {
  if (!raw) return null
  const key = raw.trim().toLowerCase()
  if (DISCIPLINE_SET.has(raw.trim())) return raw.trim()
  return DISCIPLINE_SYNONYMS[key] ?? null
}

/**
 * Normalize a free-text work type into a canonical work type.
 */
export function normalizeWorkType(raw: string | null | undefined): string | null {
  if (!raw) return null
  const key = raw.trim().toLowerCase()
  if (WORK_TYPE_SET.has(raw.trim())) return raw.trim()
  // Try exact phrase
  if (WORK_TYPE_SYNONYMS[key]) return WORK_TYPE_SYNONYMS[key]
  // Try substring match for compound phrases
  for (const phrase of Object.keys(WORK_TYPE_SYNONYMS)) {
    if (key.includes(phrase)) return WORK_TYPE_SYNONYMS[phrase]
  }
  return null
}

/**
 * Normalize an identifier like "Line 24-XX" -> canonical uppercased token.
 * Strips filler words; keeps alphanumerics, dashes, slashes.
 */
export function normalizeIdentifier(raw: string | null | undefined): string | null {
  if (!raw) return null
  let s = raw.trim().toUpperCase()
  // Collapse "line 24-xx" -> "24-XX" while still keeping "F-102", "C-17"
  s = s.replace(/\bLINE\b\s*/g, '')
  s = s.replace(/\bSPPOOL\b\s*/g, '')
  s = s.replace(/\s+/g, '')
  if (!s) return null
  return s
}

/**
 * Build the searchable text representation for a schedule activity.
 * Format: "Discipline | WBS | Location | WorkType | Identifier | ActivityName"
 */
export function buildSearchText(opts: {
  discipline: string
  wbs: string
  location: string
  workType?: string
  identifier?: string
  activityName: string
}): string {
  return [
    opts.discipline,
    opts.wbs,
    opts.location,
    opts.workType ?? '',
    opts.identifier ?? '',
    opts.activityName,
  ]
    .filter(Boolean)
    .join(' | ')
    .trim()
}
