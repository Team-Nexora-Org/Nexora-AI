// NEXORA — Database seed (deterministic, no LLM dependency)
//
// Creates a representative "Unit-4 Expansion Project" schedule (75 L5/L6
// activities across 5 disciplines), 3 supervisors, and a set of demo field
// reports whose AI resolution is computed with the REAL matching pipeline
// (so seeded matches are identical to live matches). Some reports are
// pre-approved to demonstrate the schedule update + audit trail.

import { db } from '@/lib/db'
import { buildSearchText } from '@/lib/ai/normalization'
import {
  buildIndexFromActivities,
  retrieveCandidates,
  decide,
} from '@/lib/ai/matching'
import type { ExecutionEvent, ScheduleActivityDTO } from '@/lib/types'

// ---------------------------------------------------------------------------
// Schedule activities (75). Tuple: [activityId, wbs, discipline, location,
// activityName, workType, identifier, plannedStart, plannedFinish, description]
// ---------------------------------------------------------------------------
type ActivityTuple = [
  string, string, string, string, string, string, string, string, string, string,
]

const ACTIVITIES: ActivityTuple[] = [
  // ---- Piping (PIP-03 / PIP-04) ----
  ['A10931', 'PIP-03', 'Piping', 'Unit 2', 'Erect Spool Line 24-XX', 'Spool Erection', 'Line 24-XX', '2026-08-28', '2026-08-30', 'Erect and align spool piece on Line 24-XX'],
  ['A10932', 'PIP-03', 'Piping', 'Unit 2', 'Erect Spool Line 25-XX', 'Spool Erection', 'Line 25-XX', '2026-08-29', '2026-08-31', 'Erect and align spool piece on Line 25-XX'],
  ['A10933', 'PIP-03', 'Piping', 'Unit 2', 'Hydrotest Line 24-XX', 'Hydrotest', 'Line 24-XX', '2026-09-01', '2026-09-02', 'Hydrostatic pressure test on Line 24-XX'],
  ['A10934', 'PIP-03', 'Piping', 'Unit 2', 'Hydrotest Line 25-XX', 'Hydrotest', 'Line 25-XX', '2026-09-03', '2026-09-04', 'Hydrostatic pressure test on Line 25-XX'],
  ['A10935', 'PIP-03', 'Piping', 'Unit 2', 'Welding Line 24-XX', 'Welding', 'Line 24-XX', '2026-08-26', '2026-08-28', 'Field welding of Line 24-XX joints'],
  ['A10936', 'PIP-03', 'Piping', 'Unit 2', 'Welding Line 25-XX', 'Welding', 'Line 25-XX', '2026-08-27', '2026-08-29', 'Field welding of Line 25-XX joints'],
  ['A10937', 'PIP-03', 'Piping', 'Unit 2', 'Install Pipe Support P-201', 'Pipe Support', 'P-201', '2026-09-02', '2026-09-03', 'Install pipe support P-201 on Line 24-XX'],
  ['A10938', 'PIP-03', 'Piping', 'Unit 2', 'Install Pipe Support P-202', 'Pipe Support', 'P-202', '2026-09-03', '2026-09-05', 'Install pipe support P-202 on Line 25-XX'],
  ['A10939', 'PIP-03', 'Piping', 'Unit 2', 'Erect Spool Line 26-XX', 'Spool Erection', 'Line 26-XX', '2026-09-05', '2026-09-07', 'Erect and align spool piece on Line 26-XX'],
  ['A10940', 'PIP-03', 'Piping', 'Unit 2', 'Painting Line 24-XX', 'Painting', 'Line 24-XX', '2026-09-06', '2026-09-07', 'Surface preparation and painting of Line 24-XX'],
  ['A10941', 'PIP-03', 'Piping', 'Unit 2', 'Insulation Line 24-XX', 'Insulation', 'Line 24-XX', '2026-09-08', '2026-09-10', 'Thermal insulation of Line 24-XX'],
  ['A10942', 'PIP-04', 'Piping', 'Unit 3', 'Erect Spool Line 30-XX', 'Spool Erection', 'Line 30-XX', '2026-08-30', '2026-09-01', 'Erect and align spool piece on Line 30-XX'],
  ['A10943', 'PIP-04', 'Piping', 'Unit 3', 'Welding Line 30-XX', 'Welding', 'Line 30-XX', '2026-09-01', '2026-09-03', 'Field welding of Line 30-XX joints'],
  ['A10944', 'PIP-04', 'Piping', 'Unit 3', 'Hydrotest Line 30-XX', 'Hydrotest', 'Line 30-XX', '2026-09-04', '2026-09-05', 'Hydrostatic pressure test on Line 30-XX'],
  ['A10945', 'PIP-04', 'Piping', 'Unit 3', 'Install Pipe Support P-301', 'Pipe Support', 'P-301', '2026-09-05', '2026-09-06', 'Install pipe support P-301 on Line 30-XX'],

  // ---- Civil (CIV-02 / CIV-03) ----
  ['A20418', 'CIV-02', 'Civil', 'Unit 1', 'Cast Foundation F-102', 'Concrete', 'Foundation F-102', '2026-08-27', '2026-08-30', 'Cast concrete for foundation F-102'],
  ['A20419', 'CIV-02', 'Civil', 'Unit 1', 'Cast Foundation F-103', 'Concrete', 'Foundation F-103', '2026-08-28', '2026-08-31', 'Cast concrete for foundation F-103'],
  ['A20420', 'CIV-02', 'Civil', 'Unit 1', 'Excavation Trench T-11', 'Excavation', 'Trench T-11', '2026-08-25', '2026-08-27', 'Excavate cable trench T-11 in Unit 1'],
  ['A20421', 'CIV-02', 'Civil', 'Unit 1', 'Excavation Trench T-12', 'Excavation', 'Trench T-12', '2026-08-26', '2026-08-28', 'Excavate cable trench T-12 in Unit 1'],
  ['A20422', 'CIV-02', 'Civil', 'Unit 1', 'Rebar Foundation F-102', 'Rebar', 'Foundation F-102', '2026-08-24', '2026-08-26', 'Place rebar cage for foundation F-102'],
  ['A20423', 'CIV-02', 'Civil', 'Unit 1', 'Rebar Foundation F-103', 'Rebar', 'Foundation F-103', '2026-08-25', '2026-08-27', 'Place rebar cage for foundation F-103'],
  ['A20424', 'CIV-02', 'Civil', 'Unit 1', 'Concrete Pedestal P-51', 'Concrete', 'Pedestal P-51', '2026-09-01', '2026-09-02', 'Cast concrete pedestal P-51'],
  ['A20425', 'CIV-02', 'Civil', 'Unit 1', 'Concrete Pedestal P-52', 'Concrete', 'Pedestal P-52', '2026-09-02', '2026-09-03', 'Cast concrete pedestal P-52'],
  ['A20426', 'CIV-02', 'Civil', 'Unit 1', 'Backfill Trench T-11', 'Backfill', 'Trench T-11', '2026-08-29', '2026-08-30', 'Backfill cable trench T-11 after cable pulling'],
  ['A20427', 'CIV-02', 'Civil', 'Unit 1', 'Backfill Trench T-12', 'Backfill', 'Trench T-12', '2026-08-30', '2026-08-31', 'Backfill cable trench T-12 after cable pulling'],
  ['A20428', 'CIV-03', 'Civil', 'Unit 4', 'Cast Foundation F-201', 'Concrete', 'Foundation F-201', '2026-09-01', '2026-09-04', 'Cast concrete for foundation F-201 in Unit 4'],
  ['A20429', 'CIV-03', 'Civil', 'Unit 4', 'Excavation Storm Culvert SC-1', 'Excavation', 'Storm Culvert SC-1', '2026-08-20', '2026-08-24', 'Excavate storm culvert SC-1 in Unit 4'],
  ['A20430', 'CIV-03', 'Civil', 'Unit 4', 'Rebar Pedestal P-70', 'Rebar', 'Pedestal P-70', '2026-09-04', '2026-09-06', 'Place rebar for pedestal P-70 in Unit 4'],
  ['A20431', 'CIV-03', 'Civil', 'Unit 4', 'Concrete Curb C-15', 'Curb', 'Curb C-15', '2026-09-05', '2026-09-07', 'Cast concrete curb C-15 in Unit 4'],
  ['A20432', 'CIV-03', 'Civil', 'Unit 4', 'Backfill Storm Culvert SC-1', 'Backfill', 'Storm Culvert SC-1', '2026-08-25', '2026-08-26', 'Backfill storm culvert SC-1 in Unit 4'],

  // ---- Electrical (ELE-04) ----
  ['A30512', 'ELE-04', 'Electrical', 'Compressor Area', 'Install Cable Tray C-17', 'Cable Tray', 'Cable Tray C-17', '2026-08-29', '2026-09-01', 'Install cable tray C-17 in compressor area'],
  ['A30513', 'ELE-04', 'Electrical', 'Compressor Area', 'Install Cable Tray C-18', 'Cable Tray', 'Cable Tray C-18', '2026-08-30', '2026-09-02', 'Install cable tray C-18 in compressor area'],
  ['A30514', 'ELE-04', 'Electrical', 'Compressor Area', 'Cable Pulling CT-17', 'Cable Pulling', 'Cable Tray C-17', '2026-09-02', '2026-09-04', 'Pull cables through tray C-17'],
  ['A30515', 'ELE-04', 'Electrical', 'Compressor Area', 'Cable Pulling CT-18', 'Cable Pulling', 'Cable Tray C-18', '2026-09-03', '2026-09-05', 'Pull cables through tray C-18'],
  ['A30516', 'ELE-04', 'Electrical', 'Unit 2', 'Install Lighting Panel LP-1', 'Lighting Panel', 'Lighting Panel LP-1', '2026-09-01', '2026-09-03', 'Install lighting panel LP-1 in Unit 2'],
  ['A30517', 'ELE-04', 'Electrical', 'Unit 2', 'Install Lighting Panel LP-2', 'Lighting Panel', 'Lighting Panel LP-2', '2026-09-02', '2026-09-04', 'Install lighting panel LP-2 in Unit 2'],
  ['A30518', 'ELE-04', 'Electrical', 'Unit 2', 'Cable Pulling LP-1', 'Cable Pulling', 'Lighting Panel LP-1', '2026-09-04', '2026-09-06', 'Pull feeders to lighting panel LP-1'],
  ['A30519', 'ELE-04', 'Electrical', 'Unit 3', 'Install Cable Tray C-21', 'Cable Tray', 'Cable Tray C-21', '2026-09-05', '2026-09-07', 'Install cable tray C-21 in Unit 3'],
  ['A30520', 'ELE-04', 'Electrical', 'Unit 3', 'Cable Pulling CT-21', 'Cable Pulling', 'Cable Tray C-21', '2026-09-07', '2026-09-09', 'Pull cables through tray C-21'],
  ['A30521', 'ELE-04', 'Electrical', 'Compressor Area', 'Termination Panel P-9', 'Termination', 'Panel P-9', '2026-09-06', '2026-09-08', 'Termination at panel P-9 in compressor area'],
  ['A30522', 'ELE-04', 'Electrical', 'Unit 2', 'Earthing Grid Install', 'Earthing', 'Earthing Grid', '2026-09-08', '2026-09-10', 'Install earthing grid in Unit 2'],
  ['A30523', 'ELE-04', 'Electrical', 'Unit 3', 'Earthing Grid Install', 'Earthing', 'Earthing Grid', '2026-09-09', '2026-09-11', 'Install earthing grid in Unit 3'],
  ['A30524', 'ELE-04', 'Electrical', 'Compressor Area', 'Megger Test CT-17', 'Megger Test', 'Cable Tray C-17', '2026-09-09', '2026-09-10', 'Megger insulation test on cables in tray C-17'],
  ['A30525', 'ELE-04', 'Electrical', 'Unit 2', 'Install Junction Box JB-3', 'Junction Box', 'Junction Box JB-3', '2026-09-10', '2026-09-12', 'Install junction box JB-3 in Unit 2'],
  ['A30526', 'ELE-04', 'Electrical', 'Unit 2', 'Install Motor Control Center', 'Motor Control Center', 'Motor Control Center', '2026-09-11', '2026-09-14', 'Install motor control center in Unit 2'],

  // ---- Mechanical (MEC-05) ----
  ['A40601', 'MEC-05', 'Mechanical', 'Unit 2', 'Install Pump P-101', 'Equipment Installation', 'Pump P-101', '2026-08-28', '2026-09-01', 'Install pump P-101 in Unit 2'],
  ['A40602', 'MEC-05', 'Mechanical', 'Unit 2', 'Install Pump P-102', 'Equipment Installation', 'Pump P-102', '2026-08-29', '2026-09-02', 'Install pump P-102 in Unit 2'],
  ['A40603', 'MEC-05', 'Mechanical', 'Unit 2', 'Align Pump P-101', 'Alignment', 'Pump P-101', '2026-09-02', '2026-09-03', 'Align pump P-101 with motor'],
  ['A40604', 'MEC-05', 'Mechanical', 'Unit 2', 'Align Pump P-102', 'Alignment', 'Pump P-102', '2026-09-03', '2026-09-04', 'Align pump P-102 with motor'],
  ['A40605', 'MEC-05', 'Mechanical', 'Compressor Area', 'Install Compressor C-1', 'Equipment Installation', 'Compressor C-1', '2026-09-01', '2026-09-05', 'Install compressor C-1 in compressor area'],
  ['A40606', 'MEC-05', 'Mechanical', 'Compressor Area', 'Align Compressor C-1', 'Alignment', 'Compressor C-1', '2026-09-05', '2026-09-06', 'Align compressor C-1'],
  ['A40607', 'MEC-05', 'Mechanical', 'Unit 2', 'Install Heat Exchanger E-1', 'Equipment Installation', 'Heat Exchanger E-1', '2026-09-03', '2026-09-07', 'Install heat exchanger E-1 in Unit 2'],
  ['A40608', 'MEC-05', 'Mechanical', 'Unit 2', 'Install Heat Exchanger E-2', 'Equipment Installation', 'Heat Exchanger E-2', '2026-09-04', '2026-09-08', 'Install heat exchanger E-2 in Unit 2'],
  ['A40609', 'MEC-05', 'Mechanical', 'Unit 3', 'Install Pump P-201', 'Equipment Installation', 'Pump P-201', '2026-09-06', '2026-09-09', 'Install pump P-201 in Unit 3'],
  ['A40610', 'MEC-05', 'Mechanical', 'Unit 3', 'Align Pump P-201', 'Alignment', 'Pump P-201', '2026-09-09', '2026-09-10', 'Align pump P-201 with motor'],
  ['A40611', 'MEC-05', 'Mechanical', 'Unit 3', 'Install Vessel V-5', 'Equipment Installation', 'Vessel V-5', '2026-09-08', '2026-09-12', 'Install vessel V-5 in Unit 3'],
  ['A40612', 'MEC-05', 'Mechanical', 'Unit 2', 'Install Valve V-301', 'Valve Installation', 'Valve V-301', '2026-09-06', '2026-09-07', 'Install valve V-301 on Line 24-XX'],
  ['A40613', 'MEC-05', 'Mechanical', 'Unit 2', 'Install Valve V-302', 'Valve Installation', 'Valve V-302', '2026-09-07', '2026-09-08', 'Install valve V-302 on Line 25-XX'],
  ['A40614', 'MEC-05', 'Mechanical', 'Compressor Area', 'Install Compressor C-2', 'Equipment Installation', 'Compressor C-2', '2026-09-08', '2026-09-12', 'Install compressor C-2 in compressor area'],
  ['A40615', 'MEC-05', 'Mechanical', 'Unit 2', 'Grouting Pump Base P-101', 'Grouting', 'Pump P-101', '2026-09-04', '2026-09-05', 'Grout base of pump P-101'],

  // ---- Instrumentation (INS-06) ----
  ['A50701', 'INS-06', 'Instrumentation', 'Unit 2', 'Install Temperature Transmitter TT-101', 'Instrument Installation', 'Transmitter TT-101', '2026-09-05', '2026-09-06', 'Install temperature transmitter TT-101'],
  ['A50702', 'INS-06', 'Instrumentation', 'Unit 2', 'Install Pressure Transmitter PT-101', 'Instrument Installation', 'Transmitter PT-101', '2026-09-06', '2026-09-07', 'Install pressure transmitter PT-101'],
  ['A50703', 'INS-06', 'Instrumentation', 'Unit 2', 'Install Flow Transmitter FT-101', 'Instrument Installation', 'Transmitter FT-101', '2026-09-07', '2026-09-08', 'Install flow transmitter FT-101'],
  ['A50704', 'INS-06', 'Instrumentation', 'Unit 2', 'Calibrate TT-101', 'Calibration', 'Transmitter TT-101', '2026-09-08', '2026-09-09', 'Calibrate temperature transmitter TT-101'],
  ['A50705', 'INS-06', 'Instrumentation', 'Unit 2', 'Calibrate PT-101', 'Calibration', 'Transmitter PT-101', '2026-09-09', '2026-09-10', 'Calibrate pressure transmitter PT-101'],
  ['A50706', 'INS-06', 'Instrumentation', 'Compressor Area', 'Install Level Switch LS-7', 'Instrument Installation', 'Level Switch LS-7', '2026-09-06', '2026-09-07', 'Install level switch LS-7 in compressor area'],
  ['A50707', 'INS-06', 'Instrumentation', 'Compressor Area', 'Install Level Switch LS-8', 'Instrument Installation', 'Level Switch LS-8', '2026-09-07', '2026-09-08', 'Install level switch LS-8 in compressor area'],
  ['A50708', 'INS-06', 'Instrumentation', 'Unit 3', 'Install Temperature Transmitter TT-201', 'Instrument Installation', 'Transmitter TT-201', '2026-09-09', '2026-09-10', 'Install temperature transmitter TT-201 in Unit 3'],
  ['A50709', 'INS-06', 'Instrumentation', 'Unit 3', 'Install Pressure Transmitter PT-201', 'Instrument Installation', 'Transmitter PT-201', '2026-09-11', '2026-09-12', 'Install pressure transmitter PT-201 in Unit 3'],
  ['A50710', 'INS-06', 'Instrumentation', 'Unit 2', 'Loop Test LT-101', 'Loop Test', 'Loop LT-101', '2026-09-10', '2026-09-11', 'Loop test LT-101 from transmitter to panel'],
  ['A50711', 'INS-06', 'Instrumentation', 'Unit 2', 'Loop Test LT-102', 'Loop Test', 'Loop LT-102', '2026-09-11', '2026-09-12', 'Loop test LT-102 from transmitter to panel'],
  ['A50712', 'INS-06', 'Instrumentation', 'Compressor Area', 'Install Control Valve CV-1', 'Control Valve', 'Control Valve CV-1', '2026-09-08', '2026-09-10', 'Install control valve CV-1 in compressor area'],
  ['A50713', 'INS-06', 'Instrumentation', 'Compressor Area', 'Install Control Valve CV-2', 'Control Valve', 'Control Valve CV-2', '2026-09-10', '2026-09-12', 'Install control valve CV-2 in compressor area'],
  ['A50714', 'INS-06', 'Instrumentation', 'Unit 2', 'Install Junction Box JBI-3', 'Instrument Installation', 'Junction Box JBI-3', '2026-09-12', '2026-09-13', 'Install instrument junction box JBI-3 in Unit 2'],
  ['A50715', 'INS-06', 'Instrumentation', 'Unit 3', 'Calibrate TT-201', 'Calibration', 'Transmitter TT-201', '2026-09-13', '2026-09-14', 'Calibrate temperature transmitter TT-201 in Unit 3'],
]

// ---------------------------------------------------------------------------
// Supervisors
// ---------------------------------------------------------------------------
const SUPERVISORS = [
  { name: 'Ramesh Kumar', role: 'Piping Supervisor', discipline: 'Piping' },
  { name: 'Amit Verma', role: 'Civil Supervisor', discipline: 'Civil' },
  { name: 'Suresh Singh', role: 'Electrical Supervisor', discipline: 'Electrical' },
]

// ---------------------------------------------------------------------------
// Demo field reports. `approved` = already acted on by planner (shows audit +
// schedule update). The execution event is the "AI extracted" structure.
// ---------------------------------------------------------------------------
interface DemoReport {
  supervisorIdx: number
  inputType: 'text' | 'voice' | 'excel' | 'csv' | 'pdf'
  raw: string
  reportDate: string
  event: ExecutionEvent
  approved?: boolean
  plannerName?: string
  reason?: string
}

const DEMO_REPORTS: DemoReport[] = [
  {
    supervisorIdx: 0,
    inputType: 'text',
    raw: 'Line 24-XX ka spool erection 29 August ko start hua tha aur 31 August ko complete hua.',
    reportDate: '2026-08-31',
    event: {
      discipline: 'Piping',
      workType: 'Spool Erection',
      identifier: 'Line 24-XX',
      location: 'Unit 2',
      actualStart: '2026-08-29',
      actualFinish: '2026-08-31',
      status: 'Completed',
      quantity: null,
      unit: null,
      evidence: 'Line 24-XX ka spool erection 29 August ko start hua tha aur 31 August ko complete hua',
    },
  },
  {
    supervisorIdx: 1,
    inputType: 'text',
    raw: 'Foundation F-102 ka concrete casting 28 August ko start hua, 30 August ko complete ho gaya.',
    reportDate: '2026-08-30',
    event: {
      discipline: 'Civil',
      workType: 'Concrete',
      identifier: 'Foundation F-102',
      location: 'Unit 1',
      actualStart: '2026-08-28',
      actualFinish: '2026-08-30',
      status: 'Completed',
      quantity: null,
      unit: null,
      evidence: 'Foundation F-102 ka concrete casting 28 August ko start hua, 30 August ko complete ho gaya',
    },
  },
  {
    supervisorIdx: 2,
    inputType: 'voice',
    raw: 'Compressor area me cable tray C-17 ki installation 29 August ko start ho gayi hai.',
    reportDate: '2026-08-29',
    event: {
      discipline: 'Electrical',
      workType: 'Cable Tray',
      identifier: 'Cable Tray C-17',
      location: 'Compressor Area',
      actualStart: '2026-08-29',
      actualFinish: null,
      status: 'In Progress',
      quantity: null,
      unit: null,
      evidence: 'Compressor area me cable tray C-17 ki installation 29 August ko start ho gayi hai',
    },
  },
  {
    supervisorIdx: 0,
    inputType: 'text',
    raw: 'Line 25-XX ka spool erection 29 August se 31 August tak complete hua.',
    reportDate: '2026-08-31',
    event: {
      discipline: 'Piping',
      workType: 'Spool Erection',
      identifier: 'Line 25-XX',
      location: 'Unit 2',
      actualStart: '2026-08-29',
      actualFinish: '2026-08-31',
      status: 'Completed',
      quantity: null,
      unit: null,
      evidence: 'Line 25-XX ka spool erection 29 August se 31 August tak complete hua',
    },
    approved: true,
    plannerName: 'Arun Sharma',
    reason: 'On-time completion; verified with site walkdown',
  },
  {
    supervisorIdx: 0,
    inputType: 'text',
    raw: 'Pipe work completed.',
    reportDate: '2026-08-31',
    event: {
      discipline: 'Piping',
      workType: null,
      identifier: null,
      location: null,
      actualStart: null,
      actualFinish: null,
      status: 'Completed',
      quantity: null,
      unit: null,
      evidence: 'Pipe work completed',
    },
  },
  {
    supervisorIdx: 1,
    inputType: 'text',
    raw: 'New drainage trench completed near Unit 4.',
    reportDate: '2026-08-31',
    event: {
      discipline: 'Civil',
      workType: 'Drainage',
      identifier: null,
      location: 'Unit 4',
      actualStart: null,
      actualFinish: null,
      status: 'Completed',
      quantity: null,
      unit: null,
      evidence: 'New drainage trench completed near Unit 4',
    },
  },
]

// ---------------------------------------------------------------------------
// Evaluation ground truth (used by /api/evaluation). Each row maps a raw
// field report to the expected activity ID, or to a special label
// ("AMBIGUOUS" / "UNMATCHED").
// ---------------------------------------------------------------------------
export interface GroundTruthRow {
  id: string
  supervisor: string
  discipline: string
  input_type: string
  raw_text: string
  ground_truth_activity_id: string
  ground_truth_start: string | null
  ground_truth_finish: string | null
  ground_truth_status: string | null
  expected_decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED'
}

const GROUND_TRUTH: GroundTruthRow[] = [
  { id: 'GT-001', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: 'Line 24-XX ka spool erection 29 August ko start hua tha aur 31 August ko complete hua.', ground_truth_activity_id: 'A10931', ground_truth_start: '2026-08-29', ground_truth_finish: '2026-08-31', ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-002', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: '24-XX spool fixed and erection finished.', ground_truth_activity_id: 'A10931', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-003', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: 'Piping team completed erection of the 24-XX spool.', ground_truth_activity_id: 'A10931', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-004', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: '24-XX ka spool erect kar diya hai.', ground_truth_activity_id: 'A10931', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-005', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'voice', raw_text: 'Line 25-XX ka spool erection complete hai.', ground_truth_activity_id: 'A10932', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-006', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: 'Hydrotest on Line 24-XX finished on 2nd September.', ground_truth_activity_id: 'A10933', ground_truth_start: null, ground_truth_finish: '2026-09-02', ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-007', supervisor: 'Amit Verma', discipline: 'Civil', input_type: 'text', raw_text: 'Foundation F-102 concrete casting completed on 30 August.', ground_truth_activity_id: 'A20418', ground_truth_start: null, ground_truth_finish: '2026-08-30', ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-008', supervisor: 'Amit Verma', discipline: 'Civil', input_type: 'text', raw_text: 'Rebar for foundation F-103 placed and checked.', ground_truth_activity_id: 'A20423', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-009', supervisor: 'Amit Verma', discipline: 'Civil', input_type: 'text', raw_text: 'Cable trench T-11 excavation done.', ground_truth_activity_id: 'A20420', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-010', supervisor: 'Amit Verma', discipline: 'Civil', input_type: 'text', raw_text: 'Backfilling of trench T-12 completed on 31 August.', ground_truth_activity_id: 'A20427', ground_truth_start: null, ground_truth_finish: '2026-08-31', ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-011', supervisor: 'Suresh Singh', discipline: 'Electrical', input_type: 'voice', raw_text: 'Cable tray installation started in compressor area on 29 August.', ground_truth_activity_id: 'A30512', ground_truth_start: '2026-08-29', ground_truth_finish: null, ground_truth_status: 'In Progress', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-012', supervisor: 'Suresh Singh', discipline: 'Electrical', input_type: 'text', raw_text: 'Cables pulled through tray C-18, completed 5 September.', ground_truth_activity_id: 'A30515', ground_truth_start: null, ground_truth_finish: '2026-09-05', ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-013', supervisor: 'Suresh Singh', discipline: 'Electrical', input_type: 'text', raw_text: 'Earthing grid installation in Unit 2 finished.', ground_truth_activity_id: 'A30522', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-014', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: 'Welding on Line 25-XX completed on 29 August.', ground_truth_activity_id: 'A10936', ground_truth_start: null, ground_truth_finish: '2026-08-29', ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-015', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: 'Pipe support P-201 installed.', ground_truth_activity_id: 'A10937', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-016', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: 'Insulation on Line 24-XX completed.', ground_truth_activity_id: 'A10941', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  // Semantic / terminology variation hard negatives
  { id: 'GT-017', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: 'Line 30-XX ka spool erection ho gaya.', ground_truth_activity_id: 'A10942', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-018', supervisor: 'Amit Verma', discipline: 'Civil', input_type: 'text', raw_text: 'Concrete pedestal P-51 cast.', ground_truth_activity_id: 'A20424', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-019', supervisor: 'Suresh Singh', discipline: 'Electrical', input_type: 'text', raw_text: 'Lighting panel LP-2 installed in Unit 2.', ground_truth_activity_id: 'A30517', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  { id: 'GT-020', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: 'Hydrotest of Line 25-XX done.', ground_truth_activity_id: 'A10934', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'HIGH_CONFIDENCE' },
  // Ambiguous cases (NEEDS_REVIEW)
  { id: 'GT-021', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: 'Pipe work completed.', ground_truth_activity_id: 'AMBIGUOUS', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'NEEDS_REVIEW' },
  { id: 'GT-022', supervisor: 'Ramesh Kumar', discipline: 'Piping', input_type: 'text', raw_text: 'Welding completed in Unit 2.', ground_truth_activity_id: 'AMBIGUOUS', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'NEEDS_REVIEW' },
  { id: 'GT-023', supervisor: 'Suresh Singh', discipline: 'Electrical', input_type: 'text', raw_text: 'Cable work finished.', ground_truth_activity_id: 'AMBIGUOUS', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'NEEDS_REVIEW' },
  // Unmatched cases
  { id: 'GT-024', supervisor: 'Amit Verma', discipline: 'Civil', input_type: 'text', raw_text: 'New drainage trench completed near Unit 4.', ground_truth_activity_id: 'UNMATCHED', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'UNMATCHED' },
  { id: 'GT-025', supervisor: 'Amit Verma', discipline: 'Civil', input_type: 'text', raw_text: 'Security cabin foundation cast near main gate.', ground_truth_activity_id: 'UNMATCHED', ground_truth_start: null, ground_truth_finish: null, ground_truth_status: 'Completed', expected_decision: 'UNMATCHED' },
]

export async function seedDatabase() {
  // Wipe everything (order matters for FKs; cascade handles most)
  await db.auditLog.deleteMany()
  await db.plannerDecision.deleteMany()
  await db.activityMatch.deleteMany()
  await db.executionEvent.deleteMany()
  await db.fieldReport.deleteMany()
  await db.scheduleActivity.deleteMany()
  await db.supervisor.deleteMany()
  await db.project.deleteMany()
  await db.modelEvaluation.deleteMany()

  const project = await db.project.create({
    data: {
      code: 'UNIT4-EXP',
      name: 'Unit-4 Expansion Project',
      description:
        'Representative Primavera/MS Project export. L5/L6 planned activities across Civil, Mechanical, Piping, Electrical and Instrumentation disciplines.',
      scheduleSource: 'Representative Primavera/MS Project export',
    },
  })

  const supervisors = await Promise.all(
    SUPERVISORS.map((s) =>
      db.supervisor.create({ data: { name: s.name, role: s.role, discipline: s.discipline } }),
    ),
  )

  // Create activities and keep a DTO map for matching
  const activityDtos: ScheduleActivityDTO[] = []
  for (const a of ACTIVITIES) {
    const [
      activityId,
      wbs,
      discipline,
      location,
      activityName,
      workType,
      identifier,
      plannedStart,
      plannedFinish,
      description,
    ] = a
    const searchText = buildSearchText({
      discipline,
      wbs,
      location,
      workType,
      identifier,
      activityName,
    })
    const row = await db.scheduleActivity.create({
      data: {
        projectId: project.id,
        activityId,
        wbs,
        discipline,
        activityName,
        description,
        location,
        plannedStart,
        plannedFinish,
        actualStart: null,
        actualFinish: null,
        status: 'Not Started',
        searchText,
      },
    })
    activityDtos.push({
      id: row.id,
      activityId: row.activityId,
      wbs: row.wbs,
      discipline: row.discipline,
      activityName: row.activityName,
      description: row.description,
      location: row.location,
      plannedStart: row.plannedStart,
      plannedFinish: row.plannedFinish,
      actualStart: row.actualStart,
      actualFinish: row.actualFinish,
      status: row.status,
      searchText: row.searchText,
    })
  }

  const index = buildIndexFromActivities(activityDtos)
  const activityByCode = new Map(activityDtos.map((a) => [a.activityId, a]))

  // Demo field reports + resolution
  for (const r of DEMO_REPORTS) {
    const supervisor = supervisors[r.supervisorIdx]
    const report = await db.fieldReport.create({
      data: {
        projectId: project.id,
        supervisorId: supervisor.id,
        supervisorName: supervisor.name,
        discipline: supervisor.discipline,
        inputType: r.inputType,
        rawContent: r.raw,
        reportDate: r.reportDate,
      },
    })

    const candidates = retrieveCandidates(r.event, activityDtos, index)
    const verdict = decide(candidates, r.event)

    const executionEvent = await db.executionEvent.create({
      data: {
        reportId: report.id,
        discipline: r.event.discipline ?? '',
        workType: r.event.workType ?? '',
        identifier: r.event.identifier ?? '',
        location: r.event.location ?? '',
        actualStart: r.event.actualStart,
        actualFinish: r.event.actualFinish,
        status: r.event.status ?? '',
        quantity: r.event.quantity,
        unit: r.event.unit,
        evidence: r.event.evidence,
      },
    })

    // Persist candidates (top + alternatives)
    const topMatchRow = candidates[0]
      ? await db.activityMatch.create({
          data: {
            executionEventId: executionEvent.id,
            activityId: candidates[0].activityId,
            scheduleActivityRowId: activityByCode.get(candidates[0].activityId)?.id ?? null,
            semanticScore: candidates[0].signals.semantic,
            identifierScore: candidates[0].signals.identifier,
            disciplineScore: candidates[0].signals.discipline,
            workTypeScore: candidates[0].signals.workType,
            dateScore: candidates[0].signals.date,
            finalScore: candidates[0].finalScore,
            candidateMargin: verdict.candidateMargin,
            rank: 1,
            isTop: true,
            explanation: JSON.stringify(verdict.explanation),
          },
        })
      : null

    for (const c of candidates.slice(1)) {
      await db.activityMatch.create({
        data: {
          executionEventId: executionEvent.id,
          activityId: c.activityId,
          scheduleActivityRowId: activityByCode.get(c.activityId)?.id ?? null,
          semanticScore: c.signals.semantic,
          identifierScore: c.signals.identifier,
          disciplineScore: c.signals.discipline,
          workTypeScore: c.signals.workType,
          dateScore: c.signals.date,
          finalScore: c.finalScore,
          candidateMargin: 0,
          rank: c.rank,
          isTop: false,
          explanation: JSON.stringify(c.explanation),
        },
      })
    }

    await db.auditLog.create({
      data: {
        entityType: 'FieldReport',
        entityId: report.id,
        action: 'SUBMITTED',
        actor: supervisor.name,
        metadata: JSON.stringify({ inputType: r.inputType, discipline: supervisor.discipline }),
      },
    })
    await db.auditLog.create({
      data: {
        entityType: 'FieldReport',
        entityId: report.id,
        action: 'RESOLVED',
        actor: 'NEXORA-AI',
        metadata: JSON.stringify({
          decision: verdict.decision,
          selectedActivityId: verdict.selectedActivityId,
          topScore: verdict.topScore,
          candidateMargin: verdict.candidateMargin,
        }),
      },
    })

    // Pre-approve a report to demonstrate the schedule update + audit trail
    if (r.approved && topMatchRow && verdict.selectedActivityId) {
      const targetActivity = activityByCode.get(verdict.selectedActivityId)
      if (targetActivity) {
        const decisionRow = await db.plannerDecision.create({
          data: {
            matchId: topMatchRow.id,
            decision: 'APPROVED',
            aiSuggestedActivityId: verdict.selectedActivityId,
            selectedActivityId: verdict.selectedActivityId,
            scheduleActivityRowId: targetActivity.id,
            plannerName: r.plannerName ?? 'Arun Sharma',
            reason: r.reason ?? null,
          },
        })
        await db.scheduleActivity.update({
          where: { id: targetActivity.id },
          data: {
            actualStart: r.event.actualStart,
            actualFinish: r.event.actualFinish,
            status:
              r.event.status === 'Completed'
                ? 'Completed'
                : r.event.status === 'In Progress'
                  ? 'In Progress'
                  : r.event.status === 'Delayed'
                    ? 'Delayed'
                    : 'Completed',
          },
        })
        await db.auditLog.create({
          data: {
            entityType: 'PlannerDecision',
            entityId: decisionRow.id,
            action: 'APPROVED',
            actor: r.plannerName ?? 'Arun Sharma',
            metadata: JSON.stringify({
              activityId: targetActivity.activityId,
              activityName: targetActivity.activityName,
              aiSuggested: verdict.selectedActivityId,
              selected: verdict.selectedActivityId,
              actualStart: r.event.actualStart,
              actualFinish: r.event.actualFinish,
              status: r.event.status,
              before: { actualStart: null, actualFinish: null, status: 'Not Started' },
              after: {
                actualStart: r.event.actualStart,
                actualFinish: r.event.actualFinish,
                status: r.event.status,
              },
            }),
          },
        })
        await db.auditLog.create({
          data: {
            entityType: 'ScheduleActivity',
            entityId: targetActivity.id,
            action: 'UPDATED',
            actor: r.plannerName ?? 'Arun Sharma',
            metadata: JSON.stringify({
              activityId: targetActivity.activityId,
              actualFinish: r.event.actualFinish,
              status: r.event.status,
            }),
          },
        })
      }
    }
  }

  return {
    project: project.code,
    activities: activityDtos.length,
    supervisors: supervisors.length,
    reports: DEMO_REPORTS.length,
    groundTruth: GROUND_TRUTH.length,
  }
}

export function getGroundTruth(): GroundTruthRow[] {
  return GROUND_TRUTH
}

export function getActivitiesForEval(): ActivityTuple[] {
  return ACTIVITIES
}
