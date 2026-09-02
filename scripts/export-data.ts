// NEXORA — export spec-required data CSVs + run evaluation entrypoint
// Run: bun run scripts/export-data.ts   (writes /data/*.csv)
// Run: bun run scripts/evaluate-matching.ts  (runs evaluation, writes /data/evaluation-results.json)

import { writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { getActivitiesForEval, getGroundTruth } from '../src/lib/seed'

async function exportData() {
  const dataDir = join(process.cwd(), 'data')
  await mkdir(dataDir, { recursive: true })

  const activities = getActivitiesForEval()
  const scheduleCsv = [
    'activity_id,wbs,discipline,location,activity_name,work_type,identifier,planned_start,planned_finish',
    ...activities.map((a) =>
      [
        a[0], a[1], a[2], a[3], csvEscape(a[4]), csvEscape(a[5]), csvEscape(a[6]), a[7], a[8],
      ].join(','),
    ),
  ].join('\n')
  await writeFile(join(dataDir, 'schedule.csv'), scheduleCsv, 'utf8')

  const gt = getGroundTruth()
  const fieldReportsCsv = [
    'id,supervisor,discipline,input_type,raw_text,ground_truth_activity_id,ground_truth_start,ground_truth_finish,ground_truth_status',
    ...gt.map((r) =>
      [
        r.id,
        csvEscape(r.supervisor),
        r.discipline,
        r.input_type,
        csvEscape(r.raw_text),
        r.ground_truth_activity_id,
        r.ground_truth_start ?? '',
        r.ground_truth_finish ?? '',
        r.ground_truth_status ?? '',
      ].join(','),
    ),
  ].join('\n')
  await writeFile(join(dataDir, 'field_reports.csv'), fieldReportsCsv, 'utf8')

  const groundTruthCsv = [
    'id,raw_text,ground_truth_activity_id,expected_decision',
    ...gt.map((r) => [r.id, csvEscape(r.raw_text), r.ground_truth_activity_id, r.expected_decision].join(',')),
  ].join('\n')
  await writeFile(join(dataDir, 'ground_truth.csv'), groundTruthCsv, 'utf8')

  console.log(`[nexora] exported ${activities.length} activities + ${gt.length} field reports to /data`)
}

function csvEscape(s: string): string {
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

exportData().catch((err) => {
  console.error(err)
  process.exit(1)
})
