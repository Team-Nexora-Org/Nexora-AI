# NEXORA — Build Worklog

Project: Intelligent Field-to-Schedule Execution Intelligence Platform (SIH26122 MVP)
Stack adaptation: Prisma + SQLite (instead of Supabase), single-page app with Zustand view switching (instead of multiple Next routes), z-ai-web-dev-sdk LLM for structured extraction, in-memory TF-IDF cosine for semantic similarity.

---
Task ID: 0
Agent: main
Task: Bootstrap worklog and define architecture.

Work Log:
- Read full NEXORA master spec (2365 lines) from upload.
- Confirmed environment: Next.js 16 + TS, Prisma/SQLite, shadcn/ui, z-ai-web-dev-sdk installed, dev server running on :3000.
- Adapted spec to environment constraints (single `/` route, Prisma instead of Supabase).
- Defined architecture: Prisma schema, AI pipeline (lib/ai), API routes (app/api), single-page frontend with Zustand store.

Stage Summary:
- Architecture decided. Ready to build schema + seed + AI pipeline + API + frontend.

---
Task ID: 1
Agent: main
Task: Prisma schema + AI pipeline + seed data

Work Log:
- Wrote prisma/schema.prisma (Project, Supervisor, ScheduleActivity, FieldReport, ExecutionEvent, ActivityMatch, PlannerDecision, AuditLog, ModelEvaluation). Pushed to SQLite.
- Built src/lib/ai/config.ts (weights: identifier 40%, discipline 20%, workType 20%, semantic 15%, date 5%; thresholds).
- Built src/lib/ai/normalization.ts (discipline + work-type + identifier canonicalization, buildSearchText).
- Built src/lib/ai/embeddings.ts (deterministic in-memory TF-IDF + cosine index).
- Built src/lib/ai/matching.ts (scoreIdentifier/Discipline/WorkType/Date, retrieveCandidates top-K with discipline filter + 2 distractors, decide() with signal-based confidence policy: HIGH_CONFIDENCE requires id+wt+discipline match + score>=0.80 + margin>=0.08; NEEDS_REVIEW for ambiguous/generic; UNMATCHED when workType present but matches nothing).
- Built src/lib/ai/extraction.ts (LLM via z-ai-web-dev-sdk, strict JSON schema, ISO dates, nulls for unknowns, never invents activity IDs; deterministic heuristic fallback).
- Built src/lib/ai/pipeline.ts (orchestrator: extraction -> matching -> ResolutionResult; validateSelectedActivity).
- Built src/lib/seed.ts: Unit-4 Expansion Project, 75 schedule activities (15 per discipline), 3 supervisors, 6 demo field reports (3 HIGH_CONFIDENCE pending, 1 pre-approved to show audit+schedule update, 1 NEEDS_REVIEW "Pipe work completed", 1 UNMATCHED "New drainage trench completed near Unit 4"), 25 ground-truth rows for evaluation. Seeded matches use REAL retrieveCandidates+decide so seeded + live behavior are identical.
- scripts/seed.ts entrypoint; package.json `seed` and `demo:reset` scripts.

Stage Summary:
- Seed verified: all 6 demo scenarios produce expected decisions:
  Line 24-XX -> HIGH_CONFIDENCE A10931 (score 97.6, margin 23.1)
  Foundation F-102 -> HIGH_CONFIDENCE A20418 (score 98.2)
  Cable Tray C-17 -> HIGH_CONFIDENCE A30512 (score 99.5)
  Line 25-XX (pre-approved) -> HIGH_CONFIDENCE A10932 (audit + schedule update applied)
  "Pipe work completed" -> NEEDS_REVIEW (ambiguous, margin 0)
  "New drainage trench completed near Unit 4" -> UNMATCHED
- DB populated. Ready for API routes + frontend.

---
Task ID: 4
Agent: main
Task: API routes + evaluation + data exports

Work Log:
- lib/auth.ts: cookie-based mock role (swappable for Supabase Auth).
- POST /api/seed (demo reset), GET/POST /api/auth, POST /api/auth/logout, GET /api/state (role + project + inbox counts).
- GET /api/supervisors, GET /api/schedule (discipline/status/search filters).
- POST /api/reports (submit + run full pipeline: LLM extraction -> matching -> persist event+matches+audit). POST /api/reports/upload (multipart .txt/.csv/.xlsx via SheetJS + .pdf via minimal Tj/TJ text extractor; graceful fallback).
- GET /api/planner/inbox (PlannerInboxItem[]), GET /api/planner/review/[id] (full resolution), POST /api/planner/review/[id]/decision (APPROVED/CHANGED/REJECTED; validates selectedActivityId exists in schedule_activities before any DB update — security rule).
- GET /api/intelligence?q=delayed|piping-delayed|completed|in-progress|not-started|on-time|all (controlled queries, not a chatbot).
- GET /api/audit (filterable timeline).
- lib/ai/evaluation.ts: baseline (aggressive keyword substring matching) vs NEXORA (heuristic extraction + semantic+contextual matching + confidence policy). Metrics: top1, top3, highConfPrecision, falseAutoLinkRate, ambiguousDetected, unmatchedDetected. POST /api/evaluation runs it; GET returns stored.
- scripts/export-data.ts writes /data/schedule.csv, field_reports.csv, ground_truth.csv. scripts/evaluate-matching.ts runs eval + writes /data/evaluation-results.json.
- Fixed toIsoDate bug in extraction.ts (LLM extraction now normalizes dates instead of falling back).

Stage Summary:
- Evaluation result (deterministic, no LLM):
  baseline: top1 0.80, highConfPrecision 0.625, falseAutoLink 0.36, ambiguous 0, unmatched 0
  nexora:   top1 0.85, highConfPrecision 1.00, falseAutoLink 0.00, ambiguous 3, unmatched 1
- All API routes ready. Frontend (store + api client + shell + views) next.

---
Task ID: 7-a
Agent: supervisor-views
Task: Build supervisor-side views (SupervisorHome capture flow + SupervisorSubmissions list)

Work Log:
- Read worklog.md + lib/store.ts + lib/api.ts + lib/types.ts + all shared components + shell (page.tsx) + upload/reports API to align with existing contracts.
- Confirmed DecisionBadge + ActionBadge live in @/components/shared/StatusBadge.tsx (re-exported from there); ConfidenceBadge, DisciplineTag, EvidenceHighlight, ProcessingState, EmptyState, StatusBadge all exist as spec'd.
- Wrote SupervisorHome.tsx: a single component with three input modes (Write/Speak/Upload) using a button-group segmented control (active = bg-slate-900 text-white). Local state: mode, phase (capture/preview/success), text, transcript, processing, result, reportId, plus voice recording state (MediaRecorder + getUserMedia + timer) and upload state (filename, extractedPreview, dragActive).
- Write mode: Textarea min-h-[140px] with discipline-specific placeholder, char count, "Understand this report" button inside a <form> for keyboard accessibility. Submit calls api.submitReport({ inputType:'text', rawContent }).
- Speak mode: large round Record button (disabled if MediaRecorder unavailable), pulsing red dot + timer + Stop button while recording, honest amber note ("Demo transcript mode — voice transport is mocked; the AI resolution is real."), "Use a demo transcript" button (fills discipline-specific transcript), editable transcript Textarea, "Submit transcript" button. Mic permission errors surfaced inline as amber status text. MediaRecorder is feature-detected; the demo-transcript path is the reliable fallback the supervisor can always use.
- Upload mode: accessible <label>-wrapped dropzone with drag handlers, accepts .txt/.csv/.xlsx/.xls/.pdf. On file select, immediately calls api.uploadReport(file); ProcessingState shows during the call; on success transitions to phase='preview' with the filename + extractedPreview shown at the top of the preview card.
- Preview ("I understood") card: emerald check header, sm:grid-cols-2 dl of execution event fields (Discipline as DisciplineTag, Work Type, Identifier, Location, Actual Start, Actual Finish, Status as StatusBadge, Quantity/Unit) with "—" for nulls, bordered EvidenceHighlight box labeled "Evidence from your report", decision-tinted summary line (emerald/amber/rose for HIGH_CONFIDENCE/NEEDS_REVIEW/UNMATCHED — NO activity ID/code shown to the supervisor), and [Confirm & Submit] (primary) + [Edit] (ghost) buttons. The report is already persisted server-side; Confirm just transitions to the success state; Edit discards the result and returns to capture with the typed text preserved.
- Success state: centered emerald CheckCircle2, "Submitted to your planner", one-line summary based on decision, and [View my submissions] (→ go('supervisor-submissions')) / [Report another] (resets text/transcript/result/reportId and returns to phase='capture') buttons.
- On API error: toast.error(message) and return to capture form. Mode switch and "Report another" both reset cleanly.
- Wrote SupervisorSubmissions.tsx: on mount calls api.inbox(), filters items where supervisorName === role.name, sorts by createdAt desc. Loading state = 3 skeleton cards; error state = rose inline banner + Retry button; empty state = EmptyState with "Report now" button → go('supervisor-home'). Each card shows formatted reportDate (date-fns format(parseISO, 'd MMM yyyy')), inputType chip with icon (FileText/Mic/FileSpreadsheet/FileCode), DisciplineTag, line-clamp-2 raw content, a row of DecisionBadge + ConfidenceBadge(topScore) + ActionBadge(plannerAction), and a resolution line ("Approved/Rejected/Updated by {plannerName}" if plannerAction set, else "Connected to {selectedActivityName}" for HIGH_CONFIDENCE, "Awaiting planner review" for NEEDS_REVIEW, "No matching planned activity — under review" for UNMATCHED). Supervisor never sees a WBS code or activity ID.
- Left the now-unused SupervisorReport.tsx stub untouched (shell no longer imports it).
- Used sonner's toast.success/error per the spec; the radix-based toaster mounted in layout.tsx is unchanged (toast calls are silent no-ops if Sonner Toaster is not mounted — main agent may wire Sonner Toaster into layout during integration).
- Did NOT run lint/build/dev (per instructions). Files compile cleanly in the dev log.

Stage Summary:
- Files overwritten:
  - src/components/views/supervisor/SupervisorHome.tsx — full field capture flow (Write/Speak/Upload), AI processing state, "I understood" preview, confirm/edit, success state.
  - src/components/views/supervisor/SupervisorSubmissions.tsx — this supervisor's own reports with AI resolution + planner action, full loading/error/empty states.
- Files left untouched: SupervisorReport.tsx (stub), everything else.
- Key behaviors: three input modes; real api.submitReport + api.uploadReport calls; LLM extraction + matching + confidence run server-side; supervisor sees activity NAME only (never WBS/activity ID); decision-colored summary lines; mobile-first single column; keyboard-accessible forms; uses existing shared components (ProcessingState, EvidenceHighlight, DisciplineTag, StatusBadge, DecisionBadge, ActionBadge, ConfidenceBadge, EmptyState).

---
Task ID: 8
Agent: planner-views
Task: Build planner-side views (Inbox, Review, Activities, Intelligence, Evaluation, Audit)

Work Log:
- Read worklog.md, lib/store.ts, lib/api.ts, lib/types.ts, all planner API routes (state, inbox, review/[id], decision, schedule, intelligence, audit, evaluation), shared components (DecisionBadge/ActionBadge/StatusBadge, ConfidenceBadge, DisciplineTag, VariancePill, EvidenceHighlight, EmptyState, ProcessingState, Brand), shadcn button/card/select/table/dialog/textarea/skeleton APIs, and the supervisor views to align stylistically. Confirmed DecisionBadge + ActionBadge live in @/components/shared/StatusBadge.
- Wrote PlannerInbox.tsx: top header + 4 bordered summary stat cards (Incoming slate / AI Resolved emerald / Needs Review amber / Unmatched rose, all via api.state()), "Execution reports" section, list of resolution cards (newest-first via api.inbox). Each card: top row with DisciplineTag + supervisor (User icon + name) + inputType chip (FileText/Mic/FileSpreadsheet/FileCode icon) + date (Clock) + right-side DecisionBadge + ConfidenceBadge + ActionBadge. Raw statement in a slate-50 box with amber left border. One-line ResolutionLine (emerald/amber/rose) summarizing planner action or AI decision. Review button on the right; for decided reports it becomes ghost "View decision". Whole card is keyboard-clickable (Enter/Space) when not yet decided; loading = 4 skeleton cards; error = rose banner + Retry; empty = EmptyState. Review button uses stopPropagation so clicking it doesn't double-trigger the card click.
- Wrote PlannerReview.tsx — the planner "WOW" view. Uses selectedReportId; if null shows EmptyState with Back-to-inbox. Fetches api.review(id) on mount / when id changes. Back-to-inbox ghost button at top. Six stacked cards: (1) FIELD REPORT — supervisor (User + name) + DisciplineTag + inputType + date + EvidenceHighlight in amber-left slate-50 box. (2) AI EXTRACTED — 3-col grid of labeled fields (Discipline as DisciplineTag, Work Type, Identifier, Location, Actual Start, Actual Finish, Status as StatusBadge, Quantity, Unit) with "—" for nulls. (3) SUGGESTED ACTIVITY — top candidate's activityId (mono) + activityName + WBS/location + ConfidenceBadge(topScore) + candidate margin line ("second: x%"); for UNMATCHED shows a rose "No reliable match" panel with the weak top candidate (if any) as a side note. WHY THIS MATCH? renders top.explanation as slate chips with emerald checks. PLANNED vs ACTUAL two-column block with VariancePill. (4) CANDIDATES — shadcn Table (overflow-x-auto) of all ranked candidates with rank, activityId+name, DisciplineTag, location, ConfidenceBadge, and a compact 5-signal mini bar (identifier/discipline/workType/semantic/date) with color threshold; top row tinted amber. (5) ACTIONS card — for HIGH_CONFIDENCE shows [Change Match / Reject / Approve & Update (emerald)]; for NEEDS_REVIEW shows amber banner + "Approve is disabled" caption + disabled Approve + [Reject / Change Match]; for UNMATCHED shows rose banner + [Dismiss (reject reason "Dismissed") / Create Review Item (reject reason "Flagged for manual review")] — no approve. Change Match opens a Dialog listing all candidates as radio-style selectable rows with ConfidenceBadge + AI Top tag, then Confirm change → api.decide({action:'CHANGED', selectedActivityId}). Reject opens a small Dialog with an optional Textarea + Confirm reject → api.decide({action:'REJECTED', reason}). On success: success state replaces the action area — emerald for APPROVED/CHANGED (shows activity + actual finish + "Approved by {plannerName}" + for CHANGED "AI suggested X, you selected Y" labelled-feedback note), rose for REJECTED (shows reason). Success and back buttons always include [View audit] → go('planner-audit') and [Back to inbox]. If plannerDecision already exists server-side, shows a read-only DecisionSummary card (ActionBadge + planner name + createdAt + activity updated + reason). All processing states show a Loader2 spinner; all errors toast.error.
- Wrote PlannerActivities.tsx — the schedule (source of truth). Filters bar: Select for discipline (All/Civil/Mechanical/Piping/Electrical/Instrumentation), Select for status (All/Not Started/In Progress/Completed/Delayed), Input with Search icon for free-text. Refetches api.schedule(...) on every filter change. Results count line. Dense shadcn Table inside a Card with sticky header and max-h-[70vh] overflow-auto. Columns: Activity ID (mono), WBS (mono), Discipline (tag), Activity (name + 1-line description), Location, Planned (start → finish), Actual (start → finish or —), Status (StatusBadge), Variance (VariancePill). Skeleton rows + empty state with Clear filters.
- Wrote PlannerIntelligence.tsx — Execution Intelligence (six controlled queries, not a chatbot). Page title + subtitle. Six query chips (delayed default selected, piping-delayed, on-time, completed, in-progress, not-started) — clicking selects it as active and refetches. Active query's title + description shown as a left-amber-bar heading. Results in a shadcn Table (overflow-x-auto): activityId (mono), activity name, DisciplineTag, location, planned finish, actual finish, StatusBadge, VariancePill. Footer shows count + Re-run button. Empty state for the delayed query is paired with a tip: "approve a report whose actual finish is later than planned (e.g. Line 24-XX, +1 day), then re-run this query — delayed activities will appear here." EmptyState for other empty queries is plain. Loading skeleton table.
- Wrote PlannerEvaluation.tsx — baseline vs NEXORA model evaluation. On mount fetches api.getEvaluation(). If both null shows EmptyState with [Run evaluation]. If present shows the metrics and a [Re-run evaluation] button. Running uses ProcessingState ("Running 25 reports through baseline and NEXORA…") plus a header banner with the report count. Renders a 2-col comparison: a baseline card and a NEXORA card (emerald ring + "Recommended" tag). Each card shows a 6-row metric table (Top-1 Accuracy, Top-3 Recall, High-Confidence Precision, False Auto-Link Rate — all as percentages with 1 decimal; Ambiguous Detected, Unmatched Detected — integer counts). A "Reading the numbers" card explains False Auto-Link Rate and surfaces the three NEXORA wins as Sparkles bullets (0% false auto-link, detects all N ambiguous, detects all N unmatched) — only rendered when the corresponding metric is non-zero. Final small note explains the deterministic heuristic extractor is used for reproducibility while the live supervisor flow uses the LLM extractor, and that the matching stage — the differentiator — is identical.
- Wrote PlannerAudit.tsx — Audit Trail timeline. Select for action filter (All/SUBMITTED/RESOLVED/APPROVED/CHANGED/REJECTED/UPDATED/SEEDED/RESET) — filters client-side. Fetches api.audit({limit:200}) on mount. Vertical timeline (max-h-[75vh] overflow-auto) with left dots colored by action (emerald APPROVED/UPDATED, amber RESOLVED/CHANGED, rose REJECTED, slate SUBMITTED/SEEDED/RESET) and a thin connecting line between entries. Each entry shows: timestamp (d MMM yyyy HH:mm via date-fns), an action badge (reuses ActionBadge for APPROVED/CHANGED/REJECTED, a small colored badge for the others), actor name, and a one-line metadata summary from a typed summarize() helper (no JSON dumps — extracts activityId / decision / score / margin / before→after status / reason / actual finish per action). Custom thin scrollbars injected once via a <style dangerouslySetInnerHTML> block scoped to .nexora-scrollbar (8px width, #cbd5e1 thumb) — used instead of styled-jsx to avoid TS prop typing issues; Firefox gets a thin scrollbar via scrollbarWidth. Skeleton timeline; empty state with filtered-title copy.
- Verified all 6 files compile cleanly — the latest dev log entries show only "✓ Compiled in Nms" with no error/warning lines after each save.

Stage Summary:
- Files overwritten (all 6 in src/components/views/planner/):
  - PlannerInbox.tsx — AI Resolution Workspace: 4 stat cards (Incoming/AI Resolved/Needs Review/Unmatched) + resolution card list with clickable cards, inputType chip, decision+confidence+action badges, one-line resolution summary, Review / View decision button.
  - PlannerReview.tsx — full resolution detail: Field Report (with evidence highlight) → AI Extracted grid → Suggested Activity (with confidence + margin + why-this-match chips + planned-vs-actual variance) → Candidates table with signal mini-bars → Actions area with High-confidence / Needs-review / Unmatched variants, Change Match dialog, Reject dialog, success states for APPROVED / CHANGED / REJECTED, read-only DecisionSummary when planner already decided.
  - PlannerActivities.tsx — schedule source-of-truth table (75 activities) with discipline/status/search filters, sticky-header scroll, WBS + activityId shown (planner-only), VariancePill per row.
  - PlannerIntelligence.tsx — six controlled-query chips + results table + delayed-empty tip + Re-run button.
  - PlannerEvaluation.tsx — Baseline vs NEXORA two-column comparison, Recommended tag on NEXORA, metric table, "Reading the numbers" explainer with Sparkles bullets for the 0% false auto-link / detects-all-ambiguous / detects-all-unmatched wins, deterministic-evaluator note, ProcessingState during run.
  - PlannerAudit.tsx — color-coded timeline of every SUBMITTED/RESOLVED/APPROVED/CHANGED/REJECTED/UPDATED/SEEDED/RESET event with one-line metadata summaries, client-side action filter, custom thin scrollbar styling.
- Key behaviors: every interactive element keyboard-accessible; loading + error + empty states everywhere; dates via date-fns format(parseISO, 'd MMM yyyy') (or 'd MMM yyyy HH:mm' for timestamps); planner-only visibility of WBS codes + activity IDs in Activities/Review/Intelligence/Audit summaries; dense tables on desktop with overflow-x-auto, stacked/scrollable on mobile (responsive grids + sticky table headers); status colors emerald/amber/rose/sky only (no indigo/blue); slate/zinc charcoal + amber accent throughout; toast.success/error on all API call outcomes; uses existing shared components + shadcn/ui (button, card, input, textarea, select, dialog, table, skeleton) without reinventing. No lint/build/dev commands run, per instructions.

---
Task ID: 9
Agent: main
Task: Integrate, fix bugs, lint, verify end-to-end with Agent Browser

Work Log:
- Wired Sonner `<Toaster/>` into layout.tsx (toasts were silent before); kept radix Toaster. Updated metadata to NEXORA.
- Fixed critical API client bug: `jsonOrThrow` received the raw `fetch()` Promise (not a Response) so every API call failed with "res.json is not a function". Made jsonOrThrow await the fetch promise. This unblocked ALL frontend data fetching (login dropdown, inbox, review, etc.).
- Fixed AI pipeline cache bug: embedding index cache key only checked activity codes, so a demo reset (new row ids) hit a stale cache and every semantic score returned 0. Cache key now includes row ids + codes.
- Fixed LLM date extraction: LLM hallucinated year 2023; updated system prompt to pin the demo project year to 2026.
- Fixed planner navigation: `'planner-review'` was missing from PLANNER_VIEWS, so the shell's role guard fell back to inbox even after selecting a report. Added it.
- Fixed 7 lint errors (react-hooks/set-state-in-effect across ProcessingState/SupervisorSubmissions/PlannerInbox/PlannerReview/PlannerIntelligence/PlannerAudit + an empty interface in matching.ts) by initializing loading state in useState and moving refetch/active-change setState into event handlers + render-time reset pattern.
- Added `key={selectedReportId}` to PlannerReview so it remounts cleanly when switching reports.

Agent Browser verification (all passed):
- Login renders; supervisor dropdown lists Ramesh/Amit/Suresh; planner login works.
- Supervisor: Write "Line 24-XX ka spool erection 29 August ko start hua tha aur 31 August ko complete hua." -> ProcessingState -> "I understood" with extracted event + evidence highlight + "connected with high confidence" -> Confirm & Submit -> "Submitted to your planner" success. Decision: HIGH_CONFIDENCE, A10931, score 0.976, margin 0.231, semantic 0.89, dates 2026.
- Supervisor Submissions: lists own reports; shows activity NAME (no IDs), decision/confidence/planner-action.
- Planner Inbox: summary counts (Incoming/AI Resolved/Needs Review/Unmatched) + resolution cards with decisions + confidence + Review buttons.
- Planner Review: full card (A10931, confidence 98, margin 23.1%, why-this-match, planned vs actual, +1 day variance, candidates table, Approve/Change/Reject).
- Approve & Update -> "Schedule updated", "Approved by Arun Sharma · Audit trail recorded".
- Execution Intelligence "Completed later than planned" -> A10931 +1 day appears (the WOW).
- Audit Trail: UPDATED + APPROVED entries with before->after ("status Not Started -> Completed"), plus RESOLVED + SUBMITTED.
- NEEDS REVIEW ("Pipe work completed"): "Insufficient evidence for automatic resolution", Approve disabled, Change Match + Reject only.
- UNMATCHED ("New drainage trench completed near Unit 4"): "No reliable match", Dismiss + Create Review Item only (no Approve).
- Model Evaluation: Baseline (top1 80%, false-auto-link 36%) vs NEXORA Recommended (top1 85%, high-conf precision 100%, false-auto-link 0%, detects 3 ambiguous + 1 unmatched).
- Schedule view: 75 activities, filters, A10931 shows Completed +1 day, A10932 on time.
- Responsive: mobile menu + desktop sidebar both work. Sticky footer verified (sticks to viewport bottom on tall viewport, pushes down on long content).
- Final `bun run lint` clean. Demo re-seeded to clean state.

Stage Summary:
- NEXORA MVP is fully functional and browser-verified end-to-end. The field-to-schedule resolution loop (MESSY FIELD LANGUAGE -> UNDERSTOOD -> STRUCTURED -> MATCHED -> EXPLAINED -> VERIFIED -> SCHEDULE UPDATED -> INTELLIGENCE CREATED) works, including the ambiguous (refuses to guess) and unmatched (refuses to force) safety behaviors. AI/ML credibility demonstrated via real LLM extraction + semantic retrieval + contextual scoring + confidence/margin policy + human-in-the-loop + audit + baseline-vs-NEXORA evaluation.
