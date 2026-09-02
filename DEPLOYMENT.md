# NEXORA-AI — Vercel Deployment Guide

This project is a Next.js (App Router) application using **Prisma ORM** against a
**Supabase PostgreSQL** database. This guide covers deploying it to Vercel.

## What is already configured for Vercel

- **`package.json`** scripts:
  - `postinstall`: `prisma generate` — generates the Prisma client during install.
  - `vercel-build`: `prisma generate && next build` — used when Vercel detects the script.
  - `prebuild` / `build`: also generate the client.
- **`vercel.json`**:
  ```json
  {
    "buildCommand": "prisma db push --skip-generate && prisma generate && next build",
    "installCommand": "npm install",
    "framework": "nextjs"
  }
  ```
  `prisma db push` keeps the Supabase schema in sync (idempotent — it is a no-op
  when the schema already matches, so it will **not** wipe or lose data).

## Required environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (for
Production, Preview, and Development):

| Variable       | Value                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------|
| `DATABASE_URL` | Supabase **pooler** connection string (port `6543`, `?pgbouncer=true`) e.g. from `.env`                           |
| `DIRECT_URL`   | Supabase **direct** connection string (port `5432`) e.g. from `.env`                                             |
| `GROQ_API_KEY` | API key for Groq speech-to-text (`whisper-large-v3-turbo`) used by `POST /api/transcribe`. If missing, voice recording falls back to manual/demo-transcript entry. |
| `ZAI_KEY`      | (optional) API key for `z-ai-web-dev-sdk`. The extractor falls back to a deterministic heuristic if this is missing, so the demo still works without it. |

> `.env` is gitignored — never commit it. The production values must be entered
> manually in the Vercel dashboard.

## Database is already seeded

The Supabase database referenced by `DATABASE_URL` already contains the demo
data (1 project, 3 supervisors, 75 schedule activities, field reports), so no
initial seed is required before first deploy.

If you ever need to reset the demo data against a given database:

```bash
npx prisma db push            # ensure schema
npx tsx scripts/seed.ts       # wipe + reseed demo data
```

## Deploy steps

1. Push the code to the Git remote:
   ```bash
   git add package.json vercel.json
   git commit -m "chore: add Vercel deployment config (prisma generate + db push)"
   git push origin main
   ```
   (The repo is already tracked at `https://github.com/Team-Nexora-Org/Nexora-AI.git`.)
2. In Vercel: **Add New → Project → Import** the `Nexora-AI` GitHub repository.
3. Set the **Environment Variables** listed above.
4. Click **Deploy**. Vercel runs `prisma db push` (no-op), `prisma generate`,
   and `next build` automatically.

## Post-deploy checks

- Open the site, log in as **Supervisor** or **Project Planner**.
- If anything 409s with *"No project seeded / No supervisors seeded"*, the DB was
  empty at deploy time — run the seed once with `DATABASE_URL`/`DIRECT_URL`
  pointing at production:
  ```bash
  npx prisma db push && npx tsx scripts/seed.ts
  ```

## Notes & security

- **All API routes are unauthenticated** (mock cookie auth only). **`POST /api/seed`
  wipes and re-seeds the entire database** and is currently public. This is fine
  for a demo/SIH submission, but add real authentication and protect `/api/seed`
  before using this in production.
- `next.config.ts` has `typescript.ignoreBuildErrors: true` (so TS type errors will
  not block the Vercel build).
- `output: "standalone"` was **removed** from `next.config.ts`. Setting it caused a
  Vercel build failure (`ENOENT: .next/next-server.js.nft.json`). Vercel does not
  need standalone output — it uses its own build/handler.
