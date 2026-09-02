// NEXORA — evaluation entrypoint (spec: /scripts/evaluate-matching)
// Runs baseline vs NEXORA evaluation and writes /data/evaluation-results.json
// Run: bun run scripts/evaluate-matching.ts

import { writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { runEvaluation } from '../src/lib/ai/evaluation'

async function main() {
  const result = await runEvaluation()
  const dataDir = join(process.cwd(), 'data')
  await mkdir(dataDir, { recursive: true })
  await writeFile(
    join(dataDir, 'evaluation-results.json'),
    JSON.stringify(result, null, 2),
    'utf8',
  )
  console.log('[nexora] evaluation complete:')
  console.log(JSON.stringify(result, null, 2))
  process.exit(0)
}

main().catch((err) => {
  console.error('[nexora] evaluation failed:', err)
  process.exit(1)
})
