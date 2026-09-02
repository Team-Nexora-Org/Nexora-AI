// NEXORA — seed entrypoint (run: bun run scripts/seed.ts)
// Also acts as the demo-reset command.

import { seedDatabase } from '../src/lib/seed'

async function main() {
  console.log('[nexora] seeding database...')
  const result = await seedDatabase()
  console.log('[nexora] seed complete:', result)
  process.exit(0)
}

main().catch((err) => {
  console.error('[nexora] seed failed:', err)
  process.exit(1)
})
