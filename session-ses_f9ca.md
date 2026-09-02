# I'll analyze your project to understand all APIs and their purposes. Let me start by exploring th...

**Session ID:** ses_f9cad0a74ffe0VHtBwf9z3Hvc1
**Created:** 9/2/2026, 11:42:56 PM
**Updated:** 9/2/2026, 11:55:15 PM

---

## User

analyse the complete project deeply , check all the apis created with its purpose

---

## Assistant (Plan · Nemotron 3 Ultra Free · 48.6s)

_Thinking:_

The user wants me to analyze the complete project deeply and check all the APIs created with their purposes. Since I'm in plan mode (read-only), I need to explore the codebase first to understand the project structure and identify all APIs.

Let me start by exploring the project structure to understand what kind of project this is and where the APIs might be located

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/*"
}
```

**Output:**
```
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\next-env.d.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\Caddyfile
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\bun.lock
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\mini-services\.gitkeep
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\worklog.md
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.zscripts\start.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.zscripts\python-runtime-build.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.zscripts\mini-services-start.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.zscripts\mini-services-install.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.zscripts\mini-services-build.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.zscripts\dev.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.zscripts\dev.pid
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.zscripts\database-runtime-build.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.zscripts\build.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\upload\Pasted Content_1788359594984.txt
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\tsconfig.json
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\public\robots.txt
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\public\logo.svg
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\prisma\schema.prisma
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\prisma\dev.db
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\postcss.config.mjs
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\package.json
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\package-lock.json
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.next\dev\types\validator.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.next\dev\types\routes.d.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.next\dev\types\root-params.d.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.next\dev\types\cache-life.d.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.next\dev\trace
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\.next\dev\fallback-build-manifest.json
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\tool-results\read_1788362537949_4ae5fba44983.txt
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\tool-results\read_1788359617739_3f61ffade934.txt
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\tool-results\read_1788359612442_3dc6f28b02f7.txt
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\tests\python-runtime-container.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\tests\python-runtime-build.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\tests\database-runtime-build.sh
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\tailwind.config.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\examples\websocket\server.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\examples\websocket\frontend.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\eslint.config.mjs
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\utils.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\types.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\store.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\seed.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\db.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\auth.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\api.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\download\README.md
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\dev.log
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\pipeline.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\normalization.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\matching.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\extraction.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\evaluation.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\embeddings.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\config.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\db\custom.db
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\hooks\use-toast.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\hooks\use-mobile.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\data\schedule.csv
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\data\ground_truth.csv
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\data\field_reports.csv
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\data\evaluation-results.json
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\components.json
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\scripts\verify-seed.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\scripts\seed.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\scripts\export-data.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\scripts\evaluate-matching.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\node_modules\@panva\hkdf\README.md
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\views\supervisor\SupervisorSubmissions.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\views\supervisor\SupervisorReport.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\views\supervisor\SupervisorHome.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\node_modules\@panva\hkdf\package.json
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\node_modules\@panva\hkdf\LICENSE.md
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\shared\VariancePill.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\shared\StatusBadge.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\shared\ProcessingState.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\shared\Footer.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\shared\EvidenceHighlight.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\shared\EmptyState.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\shared\DisciplineTag.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\shared\ConfidenceBadge.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\shared\Brand.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\views\planner\PlannerReview.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\views\planner\PlannerIntelligence.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\views\planner\PlannerInbox.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\views\planner\PlannerEvaluation.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\views\planner\PlannerAudit.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\views\planner\PlannerActivities.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\views\Login.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\page.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\layout.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\globals.css
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\node_modules\@panva\hkdf\dist\web\runtime\hkdf.js
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\node_modules\@panva\hkdf\dist\web\package.json
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\node_modules\@panva\hkdf\dist\web\index.js
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\node_modules\@panva\hkdf\dist\types\index.d.ts
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\ui\tooltip.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\ui\toggle.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\ui\toggle-group.tsx
D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\components\ui\toaster.tsx

(Results are truncated: showing first 100 results. Consider using a more specific path or pattern.)
```

---

## Assistant (Plan · Nemotron 3 Ultra Free · 26.4s)

_Thinking:_

This is a Next.js project (Nexora-AI). Let me look at the structure more specifically for API routes and understand the project structure. Let me check for API routes in the src/app directory and also check the lib/api.ts file which seems like it might contain API definitions.

**Tool: glob**

**Input:**
```json
{
  "pattern": "src/app/api/**/*"
}
```

**Output:**
```
No files found
```

---

## Assistant (Plan · Nemotron 3 Ultra Free · 28.1s)

_Thinking:_

Let me check the app directory structure and the lib/api.ts file which might contain API definitions.

**Tool: glob**

**Input:**
```json
{
  "pattern": "src/app/**/*"
}
```

**Output:**
```
No files found
```

---

## Assistant (Plan · Nemotron 3 Ultra Free · 30.9s)

_Thinking:_

Let me look at the src directory structure and also check the lib/api.ts file.

**Tool: glob**

**Input:**
```json
{
  "pattern": "src/**/*"
}
```

**Output:**
```
No files found
```

---

## Assistant (Plan · Nemotron 3 Ultra Free · 26.3s)

_Thinking:_

It seems the glob pattern isn't finding files. Let me try reading some of the key files I saw earlier, like the lib/api.ts and the prisma schema to understand the project.

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\lib\\api.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\api.ts</path>
<type>file</type>
<content>
1: // NEXORA — typed client API wrappers (browser fetch, relative paths only)
2: 
3: import type {
4:   AuditEventDTO,
5:   EvaluationMetrics,
6:   IntelligenceResultRow,
7:   InputType,
8:   PlannerInboxItem,
9:   ResolutionResult,
10:   Role,
11:   ScheduleActivityDTO,
12: } from '@/lib/types'
13: 
14: async function jsonOrThrow<T>(resOrPromise: Response | Promise<Response>): Promise<T> {
15:   const res = await resOrPromise
16:   const data = (await res.json().catch(() => ({}))) as T & { ok?: boolean; error?: string }
17:   if (!res.ok || data?.ok === false) {
18:     throw new Error(data?.error ?? `Request failed (${res.status})`)
19:   }
20:   return data as T
21: }
22: 
23: export interface StateResponse {
24:   role: Role | null
25:   project: {
26:     id: string
27:     code: string
28:     name: string
29:     description: string
30:     scheduleSource: string
31:     _count: { scheduleActivities: number; fieldReports: number }
32:   } | null
33:   counts: {
34:     incoming: number
35:     aiResolved: number
36:     needsReview: number
37:     unmatched: number
38:     approved: number
39:     rejected: number
40:     changed: number
41:   } | null
42: }
43: 
44: export const api = {
45:   state: () => jsonOrThrow<StateResponse>(fetch('/api/state')),
46: 
47:   login: (profile: 'supervisor' | 'planner', supervisorId?: string) =>
48:     jsonOrThrow<{ ok: boolean; role: Role }>(
49:       fetch('/api/auth', {
50:         method: 'POST',
51:         headers: { 'Content-Type': 'application/json' },
52:         body: JSON.stringify({ profile, supervisorId }),
53:       }),
54:     ),
55:   logout: () =>
56:     jsonOrThrow<{ ok: boolean }>(fetch('/api/auth/logout', { method: 'POST' })),
57: 
58:   supervisors: () =>
59:     jsonOrThrow<{
60:       supervisors: { id: string; name: string; role: string; discipline: string }[]
61:     }>(fetch('/api/supervisors')),
62: 
63:   schedule: (params?: { discipline?: string; status?: string; search?: string }) => {
64:     const q = new URLSearchParams()
65:     if (params?.discipline) q.set('discipline', params.discipline)
66:     if (params?.status) q.set('status', params.status)
67:     if (params?.search) q.set('search', params.search)
68:     return jsonOrThrow<{ activities: ScheduleActivityDTO[] }>(
69:       fetch(`/api/schedule?${q.toString()}`),
70:     )
71:   },
72: 
73:   submitReport: (body: { supervisorId?: string; inputType: InputType; rawContent: string }) =>
74:     jsonOrThrow<{ ok: boolean; reportId: string; result: ResolutionResult }>(
75:       fetch('/api/reports', {
76:         method: 'POST',
77:         headers: { 'Content-Type': 'application/json' },
78:         body: JSON.stringify(body),
79:       }),
80:     ),
81: 
82:   uploadReport: (file: File) => {
83:     const form = new FormData()
84:     form.append('file', file)
85:     return jsonOrThrow<{
86:       ok: boolean
87:       reportId: string
88:       filename: string
89:       inputType: InputType
90:       extractedPreview: string
91:       result: ResolutionResult
92:     }>(fetch('/api/reports/upload', { method: 'POST', body: form }))
93:   },
94: 
95:   inbox: () => jsonOrThrow<{ items: PlannerInboxItem[] }>(fetch('/api/planner/inbox')),
96: 
97:   review: (id: string) =>
98:     jsonOrThrow<{
99:       ok: boolean
100:       report: {
101:         id: string
102:         supervisorName: string
103:         discipline: string
104:         inputType: InputType
105:         rawContent: string
106:         reportDate: string
107:         fileUrl: string | null
108:         createdAt: string
109:       }
110:       executionEvent: {
111:         discipline: string
112:         workType: string
113:         identifier: string
114:         location: string | null
115:         actualStart: string | null
116:         actualFinish: string | null
117:         status: string | null
118:         quantity: string | null
119:         unit: string | null
120:         evidence: string | null
121:       }
122:       candidates: Array<{
123:         rowId: string
124:         matchId: string
125:         activityId: string
126:         activityName: string
127:         discipline: string
128:         wbs: string
129:         location: string
130:         plannedStart: string
131:         plannedFinish: string
132:         actualStart: string | null
133:         actualFinish: string | null
134:         status: string
135:         signals: { identifier: number; discipline: number; workType: number; semantic: number; date: number }
136:         finalScore: number
137:         rank: number
138:         isTop: boolean
139:         explanation: string[]
140:       }>
141:       decision: string | null
142:       topScore: number | null
143:       secondScore: number | null
144:       candidateMargin: number | null
145:       selectedActivityId: string | null
146:       plannerDecision: {
147:         action: string
148:         aiSuggestedActivityId: string | null
149:         selectedActivityId: string | null
150:         plannerName: string
151:         reason: string | null
152:         createdAt: string
153:       } | null
154:     }>(fetch(`/api/planner/review/${id}`)),
155: 
156:   decide: (id: string, body: { action: 'APPROVED' | 'CHANGED' | 'REJECTED'; selectedActivityId?: string; reason?: string }) =>
157:     jsonOrThrow<{
158:       ok: boolean
159:       action: string
160:       activity?: { activityId: string; activityName: string; actualStart: string | null; actualFinish: string | null; status: string }
161:     }>(fetch(`/api/planner/review/${id}/decision`, {
162:       method: 'POST',
163:       headers: { 'Content-Type': 'application/json' },
164:       body: JSON.stringify(body),
165:     })),
166: 
167:   intelligence: (q: string) =>
168:     jsonOrThrow<{
169:       q: string
170:       title: string
171:       description: string
172:       rows: IntelligenceResultRow[]
173:     }>(fetch(`/api/intelligence?q=${encodeURIComponent(q)}`)),
174: 
175:   audit: (params?: { entityType?: string; entityId?: string; limit?: number }) => {
176:     const u = new URLSearchParams()
177:     if (params?.entityType) u.set('entityType', params.entityType)
178:     if (params?.entityId) u.set('entityId', params.entityId)
179:     if (params?.limit) u.set('limit', String(params.limit))
180:     return jsonOrThrow<{ events: AuditEventDTO[] }>(fetch(`/api/audit?${u.toString()}`))
181:   },
182: 
183:   runEvaluation: () =>
184:     jsonOrThrow<{ ok: boolean; baseline: EvaluationMetrics; nexora: EvaluationMetrics }>(
185:       fetch('/api/evaluation', { method: 'POST' }),
186:     ),
187:   getEvaluation: () =>
188:     jsonOrThrow<{ ok: boolean; baseline: EvaluationMetrics | null; nexora: EvaluationMetrics | null }>(
189:       fetch('/api/evaluation'),
190:     ),
191: 
192:   resetDemo: () => jsonOrThrow<{ ok: boolean }>(fetch('/api/seed', { method: 'POST' })),
193: }

(End of file - total 193 lines)
</content>
```

---

## Assistant (Plan · Nemotron 3 Ultra Free · 28.6s)

_Thinking:_

This is the API client wrapper. Now I need to find the actual API route handlers. Let me check the app directory structure - it seems like the project uses Next.js App Router. Let me check the actual app folder structure.

**Tool: bash**

**Input:**
```json
{
  "command": "ls -la D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app"
}
```

**Output:**
```
Get-ChildItem : A parameter cannot be found that matches parameter name 'la'.
At line:1 char:4
+ ls -la D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexo ...
+    ~~~
    + CategoryInfo          : InvalidArgument: (:) [Get-ChildItem], ParameterBindingException
    + FullyQualifiedErrorId : NamedParameterNotFound,Microsoft.PowerShell.Commands.GetChildItemCommand
 

```

---

## Assistant (Plan · Nemotron 3 Ultra Free · 55.6s)

---

## User

analyse the complete project deeply , check all the apis created with its purpose

---

## Assistant (Plan · Big Pickle · 7.6s)

_Thinking:_

I need to analyze the complete project deeply and check all the APIs created with their purposes. I'm in plan mode, so I can only read files and not make any modifications. Let me start by exploring the project structure to understand what kind of project this is.

From the earlier glob results, I can see this is a Next.js project with App Router (since there's a src/app directory). Let me first look at the main project files to understand the architecture.

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\package.json"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\package.json</path>
<type>file</type>
<content>
1: {
2:   "name": "nextjs_tailwind_shadcn_ts",
3:   "version": "0.2.1",
4:   "private": true,
5:   "scripts": {
6:     "dev": "next dev -p 3000 2>&1 | tee dev.log",
7:     "build": "next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/",
8:     "start": "NODE_ENV=production node .next/standalone/server.js 2>&1 | tee server.log",
9:     "lint": "eslint .",
10:     "seed": "npx tsx scripts/seed.ts",
11:     "demo:reset": "npx tsx scripts/seed.ts",
12:     "db:push": "prisma db push --accept-data-loss",
13:     "db:generate": "prisma generate",
14:     "db:migrate": "prisma migrate dev",
15:     "db:reset": "prisma migrate reset"
16:   },
17:   "dependencies": {
18:     "@dnd-kit/core": "^6.3.1",
19:     "@dnd-kit/sortable": "^10.0.0",
20:     "@dnd-kit/utilities": "^3.2.2",
21:     "@hookform/resolvers": "^5.1.1",
22:     "@mdxeditor/editor": "^3.39.1",
23:     "@prisma/client": "^6.11.1",
24:     "@radix-ui/react-accordion": "^1.2.11",
25:     "@radix-ui/react-alert-dialog": "^1.1.14",
26:     "@radix-ui/react-aspect-ratio": "^1.1.7",
27:     "@radix-ui/react-avatar": "^1.1.10",
28:     "@radix-ui/react-checkbox": "^1.3.2",
29:     "@radix-ui/react-collapsible": "^1.1.11",
30:     "@radix-ui/react-context-menu": "^2.2.15",
31:     "@radix-ui/react-dialog": "^1.1.14",
32:     "@radix-ui/react-dropdown-menu": "^2.1.15",
33:     "@radix-ui/react-hover-card": "^1.1.14",
34:     "@radix-ui/react-label": "^2.1.7",
35:     "@radix-ui/react-menubar": "^1.1.15",
36:     "@radix-ui/react-navigation-menu": "^1.2.13",
37:     "@radix-ui/react-popover": "^1.1.14",
38:     "@radix-ui/react-progress": "^1.1.7",
39:     "@radix-ui/react-radio-group": "^1.3.7",
40:     "@radix-ui/react-scroll-area": "^1.2.9",
41:     "@radix-ui/react-select": "^2.2.5",
42:     "@radix-ui/react-separator": "^1.1.7",
43:     "@radix-ui/react-slider": "^1.3.5",
44:     "@radix-ui/react-slot": "^1.2.3",
45:     "@radix-ui/react-switch": "^1.2.5",
46:     "@radix-ui/react-tabs": "^1.1.12",
47:     "@radix-ui/react-toast": "^1.2.14",
48:     "@radix-ui/react-toggle": "^1.1.9",
49:     "@radix-ui/react-toggle-group": "^1.1.10",
50:     "@radix-ui/react-tooltip": "^1.2.7",
51:     "@reactuses/core": "^6.0.5",
52:     "@tanstack/react-query": "^5.82.0",
53:     "@tanstack/react-table": "^8.21.3",
54:     "class-variance-authority": "^0.7.1",
55:     "clsx": "^2.1.1",
56:     "cmdk": "^1.1.1",
57:     "date-fns": "^4.1.0",
58:     "embla-carousel-react": "^8.6.0",
59:     "framer-motion": "^12.23.2",
60:     "input-otp": "^1.4.2",
61:     "lucide-react": "^0.525.0",
62:     "next": "^16.1.1",
63:     "next-auth": "^4.24.11",
64:     "next-intl": "^4.3.4",
65:     "next-themes": "^0.4.6",
66:     "prisma": "^6.11.1",
67:     "react": "^19.0.0",
68:     "react-day-picker": "^9.8.0",
69:     "react-dom": "^19.0.0",
70:     "react-hook-form": "^7.60.0",
71:     "react-markdown": "^10.1.0",
72:     "react-resizable-panels": "^3.0.3",
73:     "react-syntax-highlighter": "^15.6.1",
74:     "recharts": "^2.15.4",
75:     "sharp": "^0.34.3",
76:     "sonner": "^2.0.6",
77:     "tailwind-merge": "^3.3.1",
78:     "tailwindcss-animate": "^1.0.7",
79:     "uuid": "^11.1.0",
80:     "vaul": "^1.1.2",
81:     "xlsx": "^0.18.5",
82:     "z-ai-web-dev-sdk": "^0.0.18",
83:     "zod": "^4.0.2",
84:     "zustand": "^5.0.6"
85:   },
86:   "devDependencies": {
87:     "@tailwindcss/postcss": "^4",
88:     "@types/react": "^19",
89:     "@types/react-dom": "^19",
90:     "bun-types": "^1.3.4",
91:     "eslint": "^9",
92:     "eslint-config-next": "^16.1.1",
93:     "tailwindcss": "^4",
94:     "tsx": "^4.23.13",
95:     "tw-animate-css": "^1.3.5",
96:     "typescript": "^5"
97:   }
98: }

(End of file - total 98 lines)
</content>
```

---

## Assistant (Plan · Big Pickle · 319.0s)

_Thinking:_

Let me now launch multiple explore agents in parallel to deeply analyze all aspects of this project.

Let me launch multiple agents in parallel to deeply explore all aspects of the project.

**Tool: task**

**Input:**
```json
{
  "description": "Explore all API routes",
  "prompt": "Explore the Nexora-AI project at D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI thoroughly. \n\nFind ALL API route handlers (Next.js App Router style: route.ts files in src/app/api/**/). For each API route, read the complete file content and document:\n1. The HTTP method(s) supported (GET, POST, PUT, DELETE, etc.)\n2. The exact endpoint path\n3. What the route does (purpose/description)\n4. Request parameters/body it accepts\n5. Response shape it returns\n6. Any business logic or validation it performs\n7. Any database operations it performs\n\nBe VERY thorough - find every single route.ts file under src/app/api/. Return a comprehensive list of ALL API routes with full details.",
  "subagent_type": "explore"
}
```

**Output:**
```
<task id="ses_f9ca87d73ffeywPfDEfq17SYTD" state="completed">
<task_result>
Confirmed: there are exactly 15 route.ts files under `src/app/api/`. I have read all of them fully. Here is the comprehensive documentation of every API route.

---

# Complete API Route Documentation — Nexora-AI

**Project:** Nexora-AI (SIH demo application)
**Root API directory:** `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\`

There are **15 route.ts files** defining **18 HTTP handlers** across **14 unique endpoints**. Below is every route, fully documented.

---

## 1. `GET /api` (Root API)

**File:** `src/app/api/route.ts`

- **HTTP Method:** `GET`
- **Purpose:** Simple health/hello endpoint returning a test message.
- **Request params:** None
- **Response shape:**
  - `{ message: "Hello, world!" }`
- **Business logic:** None (static).
- **DB operations:** None.

---

## 2. `POST /api/auth` & `GET /api/auth` (Auth / Role selection)

**File:** `src/app/api/auth/route.ts`

### `POST /api/auth` — Select a demo profile
- **HTTP Method:** `POST`
- **Purpose:** Lets a user "log in" as either a **supervisor** or a **planner** demo profile, storing the selected role in an auth cookie.
- **Request body (JSON):**
  - `profile`: `'supervisor'` | `'planner'` (required)
  - `supervisorId`: string (optional, only for supervisor)
- **Business logic / validation:**
  - If `profile = 'supervisor'`: uses provided `supervisorId` if valid, otherwise falls back to the first supervisor with discipline `'Piping'` (defaults to "Ramesh Kumar"). Returns **409** if no supervisors are seeded.
  - If `profile = 'planner'`: hardcodes a role object for "Arun Sharma" / "Project Planner".
  - Any other profile value returns **400** with `{ ok: false, error: 'Unknown profile...' }`.
- **Response shape:**
  - Success: `{ ok: true, role: { type, name, role, discipline?, supervisorId? } }`
  - Failure: `{ ok: false, error: string }` with 400 or 409 status.
- **DB operations:** Reads supervisors (`db.supervisor.findUnique`, `db.supervisor.findFirst`).

### `GET /api/auth` — Get current role
- **HTTP Method:** `GET`
- **Purpose:** Returns the currently stored role (from cookie) without accepting any parameters.
- **Response shape:** `{ role: Role | null }`
- **DB operations:** None.

---

## 3. `POST /api/auth/logout`

**File:** `src/app/api/auth/logout/route.ts`

- **HTTP Method:** `POST`
- **Purpose:** Clears the current authenticated role by deleting the auth cookie.
- **Request params/body:** None.
- **Response shape:** `{ ok: true }`
- **Business logic:** Calls `clearRole()`.
- **DB operations:** None.

---

## 4. `POST /api/seed`

**File:** `src/app/api/seed/route.ts`

- **HTTP Method:** `POST`
- **Purpose:** Demo data reset — restores the database to a clean seeded demo state.
- **Request params/body:** None.
- **Business logic:** Wrapped in try/catch; on error returns **500** with the error message.
- **Response shape:**
  - Success: `{ ok: true, ...result }` (result spread from `seedDatabase()`)
  - Failure: `{ ok: false, error: string }` with **500**
- **DB operations:** Delegates to `seedDatabase()` (`db` used indirectly through `@/lib/seed`).

---

## 5. `GET /api/supervisors`

**File:** `src/app/api/supervisors/route.ts`

- **HTTP Method:** `GET`
- **Purpose:** Lists all demo supervisors, sorted by name ascending. Used by login screens and supervisor submission flows.
- **Request params:** None.
- **Response shape:** `{ supervisors: Supervisor[] }` (all columns from the `Supervisor` table)
- **Business logic:** None.
- **DB operations:** `db.supervisor.findMany({ orderBy: { name: 'asc' } })`.

---

## 6. `GET /api/audit`

**File:** `src/app/api/audit/route.ts`

- **HTTP Method:** `GET`
- **Purpose:** Queries the audit log trail with optional filtering.
- **Request query params:**
  - `entityType`: string (optional) — filter by entity type (e.g. `FieldReport`, `PlannerDecision`, `ScheduleActivity`)
  - `entityId`: string (optional) — filter by specific entity ID
  - `limit`: number (optional, default `200`) — clamped between 1 and 500
- **Business logic / validation:**
  - Builds a Prisma `where` object from the presence of `entityType`/`entityId`.
  - Orders results by `createdAt` descending.
  - Any `metadata` that fails JSON parsing is wrapped as `{ raw: s }`.
- **Response shape:**
  ```
  { events: Array<{ id, entityType, entityId, action, actor, metadata, createdAt }> }
  ```
- **DB operations:** `db.auditLog.findMany({ where, orderBy, take })`.

---

## 7. `GET /api/state`

**File:** `src/app/api/state/route.ts`

- **HTTP Method:** `GET`
- **Purpose:** Dashboard bootstrap — returns the current auth role, the first project (with activity/report counts), and computed plan-state metrics.
- **Request params:** None.
- **Business logic:**
  - Fetches the current `role` via `getRole()`.
  - Fetches the first project with `_count` of `scheduleActivities` and `fieldReports`.
  - If a project exists, iterates all its field reports to count `incoming`.
  - Recomputes AI decision counts (`resolved`, `needsReview`, `unmatched`) by parsing **RESOLVED audit logs** for `FieldReport` entities (treating the logs as the source of truth).
  - Counts planner decisions separately: `approved`, `rejected`, `changed` by querying `plannerDecision`.
- **Response shape:**
  ```
  {
    role: Role | null,
    project: ProjectWithCounts | null,
    counts: { incoming, aiResolved, needsReview, unmatched, approved, rejected, changed } | null
  }
  ```
- **DB operations:**
  - `db.project.findFirst` (with `_count`)
  - `db.fieldReport.findMany` (with nested `executionEvent.activityMatches` where `isTop`)
  - `db.auditLog.findMany` (action `RESOLVED`)
  - `db.plannerDecision.findMany`

---

## 8. `GET /api/schedule`

**File:** `src/app/api/schedule/route.ts`

- **HTTP Method:** `GET`
- **Purpose:** Retrieves schedule activities with optional filters.
- **Request query params:**
  - `discipline`: string (optional) — exact match on discipline
  - `status`: string (optional) — exact match on status
  - `search`: string (optional) — substring match across `activityId`, `activityName`, `location`, and `searchText` (case-insensitive via `contains`)
- **Business logic / validation:**
  - Builds Prisma `where` clause conditionally. If `search` present, adds an `OR` array for substring matching.
  - Orders by `activityId` ascending.
- **Response shape:** `{ activities: ScheduleActivity[] }`
- **DB operations:** `db.scheduleActivity.findMany({ where, orderBy })`.

---

## 9. `POST /api/reports` (Submit a field report + AI resolution)

**File:** `src/app/api/reports/route.ts`

- **HTTP Method:** `POST`
- **Purpose:** Accepts a field report's raw text and runs the full NEXORA AI resolution pipeline (extraction → normalization → candidate retrieval → contextual scoring → confidence/margin), persisting the report, the execution event, activity match candidates, and audit logs.
- **Request body (JSON):**
  - `inputType`: `'text'` | `'csv'` | `'excel'` | `'pdf'` (optional, defaults `'text'`)
  - `rawContent`: string (required — must be non-blank)
  - `supervisorId`: string (optional, used in demo mode / when not a logged-in supervisor)
- **Business logic / validation:**
  - Returns **400** if `rawContent` is empty.
  - Resolves the submitting supervisor: prefers logged-in supervisor role → falls back to `body.supervisorId` → falls back to first `Piping` supervisor. Returns **409** if none exist.
  - Requires at least one seeded project; returns **409** if absent.
  - Runs the AI pipeline via `loadActivities(project.id)` then `resolveReport(...)`.
  - Persists a `fieldReport`, a `SUBMITTED` audit log, an `executionEvent`, an `activityMatch` row for **every** candidate, and a `RESOLVED` audit log detailing the AI decision.
- **Response shape:**
  - Success: `{ ok: true, reportId, result: ResolutionResult }`
  - Error: `{ ok: false, error: string }` (400, 409, or 500)
- **DB operations:**
  - `db.supervisor.findUnique` / `findFirst`
  - `db.project.findFirst`
  - `db.fieldReport.create`
  - `db.auditLog.create` (x2)
  - `db.executionEvent.create`
  - `db.activityMatch.create` (per candidate)

---

## 10. `POST /api/reports/upload` (File-based report ingestion)

**File:** `src/app/api/reports/upload/route.ts`

- **HTTP Method:** `POST`
- **Purpose:** Accepts a multipart file upload (.txt, .csv, .xlsx/.xls, .pdf), extracts text from it, and runs the same AI resolution pipeline as `POST /api/reports`, persisting the report including the filename.
- **Request body:** `multipart/form-data` with field `file` (File object).
- **Business logic / validation:**
  - Returns **400** if no file uploaded.
  - Sanitizes filename (keeps only `[a-zA-Z0-9._-]`, max 120 chars).
  - Detects input type by extension: `.csv` → `csv`, `.xlsx`/`.xls` → `excel`, `.pdf` → `pdf`, `.txt` → `text`, else `text`.
  - **PDF:** uses a minimal regex-based text extractor (pulls `Tj`/`TJ` operator strings). If extracted text is < 20 chars, returns an error asking the user to paste text instead.
  - **Excel:** uses the `xlsx` package to read all sheets into `|`-joined rows.
  - **CSV:** joins non-blank lines with `|`.
  - **Text:** reads UTF-8 string.
  - Returns **422** if processing fails or no readable text found.
  - Truncates extracted text to 8000 chars.
  - Same resolution flow as `POST /api/reports` (supervisor fallback, project existence, AI pipeline, persistence).
- **Response shape:**
  - Success: `{ ok: true, reportId, filename, inputType, extractedPreview, result }`
  - Error: `{ ok: false, error: string, filename? }` (400, 409, 422, or 500)
- **DB operations:** Same set as `POST /api/reports` plus persisting `fileUrl: filename` on the field report.

---

## 11. `GET /api/intelligence`

**File:** `src/app/api/intelligence/route.ts`

- **HTTP Method:** `GET`
- **Purpose:** Controlled query endpoint over structured execution data — supports a fixed set of pre-defined queries (NOT a chatbot).
- **Request query params:**
  - `q`: one of `delayed` (default), `piping-delayed`, `completed`, `in-progress`, `not-started`, `on-time`, or `all`/anything-else (treated as "all").
- **Business logic / validation:**
  - `delayed`: actual finish after planned finish (positive variance days).
  - `piping-delayed`: same as delayed but only discipline `'Piping'`.
  - `completed`: status === `'Completed'`.
  - `in-progress`: status === `'In Progress'`.
  - `not-started`: status === `'Not Started'`.
  - `on-time`: variance days <= 0.
  - Default → all activities.
  - Computes `varianceDays` as rounded `(actualFinish − plannedFinish) / 86400000` days.
- **Response shape:**
  ```
  { q, title, description, rows: Array<{ activityId, activityName, discipline, location, plannedFinish, actualFinish, status, varianceDays }> }
  ```
- **DB operations:** `db.scheduleActivity.findMany({ orderBy: { activityId: 'asc' } })`.

---

## 12. `POST /api/evaluation` & `GET /api/evaluation`

**File:** `src/app/api/evaluation/route.ts`

### `POST /api/evaluation` — run evaluation
- **HTTP Method:** `POST`
- **Purpose:** Runs a baseline-vs-NEXORA evaluation over ground truth data and persists the resulting metrics.
- **Request params/body:** None.
- **Business logic:** Wrapped in try/catch; errors return **500**.
- **Response shape:**
  - Success: `{ ok: true, ...result }`
  - Failure: `{ ok: false, error: string }` (500)
- **DB operations:** Delegated to `runEvaluation()` in `@/lib/ai/evaluation`.

### `GET /api/evaluation` — latest metrics
- **HTTP Method:** `GET`
- **Purpose:** Returns the latest stored evaluation metrics.
- **Request params/body:** None.
- **Response shape:** `{ ok: true, ...result }` from `getEvaluation()`.
- **DB operations:** Delegated to `getEvaluation()` in `@/lib/ai/evaluation`.

---

## 13. `GET /api/planner/inbox`

**File:** `src/app/api/planner/inbox/route.ts`

- **HTTP Method:** `GET`
- **Purpose:** Builds the planner's review queue: every field report with its AI resolution state and any planner decision, newest first.
- **Request params/body:** None.
- **Business logic / validation:**
  - Fetches all field reports (including their top activity match).
  - Loads **RESOLVED audit logs** and maps them per-report (decision source of truth).
  - Loads all `plannerDecision` rows and maps by `matchId`.
  - Loads all schedule activities to map `activityId` → `activityName`.
  - Assembles `PlannerInboxItem[]` combining report data, AI decision info, and planner action info.
- **Response shape:**
  ```
  {
    items: Array<{
      reportId, supervisorName, discipline, inputType, rawContent, reportDate, createdAt,
      resolved, decision, selectedActivityId, selectedActivityName, topScore,
      plannerAction, plannerName
    }>
  }
  ```
- **DB operations:**
  - `db.fieldReport.findMany` (with nested `executionEvent.activityMatches` top match)
  - `db.auditLog.findMany` (action `RESOLVED`)
  - `db.plannerDecision.findMany`
  - `db.scheduleActivity.findMany`

---

## 14. `GET /api/planner/review/[id]`

**File:** `src/app/api/planner/review/[id]/route.ts`

- **HTTP Method:** `GET`
- **Purpose:** Details of one report's full AI resolution for the planner review screen.
- **URL parameter:**
  - `id`: field report ID (dynamic segment)
- **Business logic / validation:**
  - Returns **404** if the report doesn't exist.
  - Returns **409** if the report exists but has no `executionEvent` (not yet resolved).
  - Loads the RESOLVED audit metadata for the AI decision.
  - Loads the planner decision for the top match if present.
  - Hydrates candidate activity info by re-querying schedule activities by code.
  - Parses each candidate's `explanation` JSON string.
- **Response shape:**
  ```
  {
    ok: true,
    report: { id, supervisorName, discipline, inputType, rawContent, reportDate, fileUrl, createdAt },
    executionEvent: { discipline, workType, identifier, location, actualStart, actualFinish, status, quantity, unit, evidence },
    candidates: Array<{ rowId, matchId, activityId, activityName, discipline, wbs, location, plannedStart, plannedFinish, actualStart, actualFinish, status, signals: {identifier, discipline, workType, semantic, date}, finalScore, rank, isTop, explanation }>,
    decision, topScore, secondScore, candidateMargin, selectedActivityId,
    plannerDecision: { action, aiSuggestedActivityId, selectedActivityId, plannerName, reason, createdAt } | null
  }
  ```
- **DB operations:**
  - `db.fieldReport.findUnique` (with nested `executionEvent.activityMatches`)
  - `db.auditLog.findFirst`
  - `db.plannerDecision.findUnique`
  - `db.scheduleActivity.findMany`

---

## 15. `POST /api/planner/review/[id]/decision`

**File:** `src/app/api/planner/review/[id]/decision/route.ts`

- **HTTP Method:** `POST`
- **Purpose:** Records a planner's decision (APPROVE / CHANGE / REJECT) on an AI-resolved report, and if approved/changed, **mutates the schedule activity** (actualStart, actualFinish, status). Writes comprehensive audit logs.
- **URL parameter:**
  - `id`: field report ID (dynamic segment)
- **Request body (JSON):**
  - `action`: `'APPROVED'` | `'CHANGED'` | `'REJECTED'` (required)
  - `selectedActivityId`: string (required for `CHANGED`; optional/derived for `APPROVED`)
  - `reason`: string (optional)
- **Business logic / validation:**
  - Planner name derived from current role (falls back to `'Arun Sharma'`).
  - Returns **400** if `action` is invalid.
  - Returns **404** if report not found.
  - Returns **409** if the report has no top AI match, or **409** if a planner decision for the top match already exists (one decision per report).
  - **REJECTED:** just records the decision (selectedActivityId set to null). No schedule update.
  - **APPROVED:** defaults `selectedActivityId` to the AI-suggested activity.
  - **CHANGED:** requires `selectedActivityId`.
  - Validates the target activity exists in `schedule_activities`; returns **422** if not (explicitly noted that schedule DB is the source of truth).
  - For APPROVED/CHANGED: captures `before`/`after` state, computes a new status (preserves `Completed`/`In Progress`/`Delayed`, otherwise defaults to `Completed`), and **updates** `actualStart`, `actualFinish`, and `status` on the schedule activity row.
  - Writes two audit logs: one `PlannerDecision` log and one `ScheduleActivity`/`UPDATED` log.
- **Response shape:**
  - `REJECTED` success: `{ ok: true, action: 'REJECTED' }`
  - `APPROVED`/`CHANGED` success: `{ ok: true, action, activity: { activityId, activityName, actualStart, actualFinish, status } }`
  - Errors: `{ ok: false, error: string }` (400, 404, 409, 422, 500)
- **DB operations:**
  - `db.fieldReport.findUnique` (with execution event + top match)
  - `db.plannerDecision.findUnique` (dup check)
  - `db.scheduleActivity.findFirst` (validate target)
  - `db.plannerDecision.create`
  - `db.scheduleActivity.update`
  - `db.auditLog.create` (x2)

---

# Summary Table

| # | Endpoint | Method | Purpose | DB Ops |
|---|----------|--------|---------|--------|
| 1 | `/api` | GET | Hello message | — |
| 2 | `/api/auth` | POST | Select demo profile (supervisor/planner) | supervisor reads |
| 3 | `/api/auth` | GET | Get current role | — |
| 4 | `/api/auth/logout` | POST | Clear role cookie | — |
| 5 | `/api/seed` | POST | Reset demo DB | seedDatabase() |
| 6 | `/api/supervisors` | GET | List supervisors | supervisor findMany |
| 7 | `/api/audit` | GET | Query audit logs (filterable) | auditLog findMany |
| 8 | `/api/state` | GET | Dashboard role/project/counts | project, fieldReport, auditLog, plannerDecision |
| 9 | `/api/schedule` | GET | Filtered schedule activities | scheduleActivity findMany |
| 10 | `/api/reports` | POST | Submit text report + AI resolution | fieldReport, auditLog, executionEvent, activityMatch, supervisor, project |
| 11 | `/api/reports/upload` | POST | Upload file report + AI resolution | same as #10 + fileUrl |
| 12 | `/api/intelligence` | GET | Pre-defined analytics queries | scheduleActivity findMany |
| 13 | `/api/evaluation` | POST | Run baseline vs NEXORA evaluation | runEvaluation() |
| 14 | `/api/evaluation` | GET | Fetch latest evaluation metrics | getEvaluation() |
| 15 | `/api/planner/inbox` | GET | Planner review queue | fieldReport, auditLog, plannerDecision, scheduleActivity |
| 16 | `/api/planner/review/[id]` | GET | Single report resolution detail | fieldReport, auditLog, plannerDecision, scheduleActivity |
| 17 | `/api/planner/review/[id]/decision` | POST | Approve/change/reject AI resolution; update schedule | fieldReport, plannerDecision, scheduleActivity, auditLog |

**Key architectural patterns across all routes:**
- **Prisma ORM** is used exclusively for all database access (via `@/lib/db`).
- **Auth** is cookie-based role management via `@/lib/auth` (`setRole`, `getRole`, `clearRole`).
- The **reports submission routes** (`/api/reports` and `/api/reports/upload`) are the "heavy" routes — they run the complete AI resolution pipeline and persist multiple related records transactionally.
- **Audit logging** recurs throughout: reports get `SUBMITTED`/`RESOLVED` logs, planner decisions and schedule updates each generate their own audit entries.
- **Decisions** are stored in two places: the AI decision lives in the `RESOLVED` audit log metadata, and the planner decision lives in the `plannerDecision` table (effectively a journal).
- **Validation** is handled inline (manual if-checks) rather than through a schema-validation library.
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Explore database schema",
  "prompt": "Explore the Nexora-AI project at D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI thoroughly.\n\nRead and analyze:\n1. The Prisma schema at prisma/schema.prisma - document ALL models, their fields, relationships, and enums\n2. The seed script at src/lib/seed.ts or scripts/seed.ts - understand initial data setup\n3. The database client at src/lib/db.ts - understand how DB is accessed\n\nReturn a complete analysis of the database layer including all models, their fields and types, relationships between models, and any enums defined.",
  "subagent_type": "explore"
}
```

**Output:**
```
<task id="ses_f9ca8716effek51z0VGJc1t60N" state="completed">
<task_result>
I now have a comprehensive and thorough understanding of the Nexora-AI database layer. Let me compile the complete analysis.

# Nexora-AI Database Layer: Complete Analysis

## Overview

Nexora-AI is a **Field-to-Schedule Execution Intelligence Platform** (SIH26122 MVP). The database layer is built on **Prisma ORM**. The schema declares **PostgreSQL** as the provider (pointing at Supabase), with local `dev.db` and `db/custom.db` SQLite files present for local dev. It models a construction-project domain where supervisor field reports are AI-resolved and matched against a planned schedule, with human-in-the-loop planner decisions.

---

## 1. Database Connection & Configuration

### `prisma/schema.prisma` (lines 5-15)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

- **Provider:** `postgresql`
- **URLs come from environment** via `DATABASE_URL` and `DIRECT_URL` (a Supabase pooler setup — note `pgbouncer=true` in the URL).

### `.env`

```
DATABASE_URL=postgresql://postgres.ysropjfydslgzzzcdxaf:***@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.ysropjfydslgzzzcdxaf:***@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

### DB Client — `src/lib/db.ts`

A standard **Prisma singleton** pattern to avoid exhausting connection pools during Next.js hot-reload in development:

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ['error', 'warn'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

- The client is cached on `globalThis` in non-production to prevent multiple PrismaClient instances across HMR reloads.
- Logs only `error` and `warn` levels.

---

## 2. Database Models (from `prisma/schema.prisma`)

There are **9 models** in total. No Prisma `enum` types are defined in the schema — all "enums" are modeled as plain `String` fields with documented allowed values (and mirrored as TypeScript union types in `src/lib/types.ts`). Each model uses `cuid()` string IDs.

---

### 2.1 `Project`

Represents a single representative Primavera/MS Project export.

| Field | Type | Attributes |
|-------|------|-----------|
| `id` | `String` | `@id @default(cuid())` |
| `code` | `String` | `@unique` (e.g. `"UNIT4-EXP"`) |
| `name` | `String` | |
| `description` | `String` | |
| `scheduleSource` | `String` | "Representative Primavera/MS Project export" |
| `createdAt` | `DateTime` | `@default(now())` |
| `updatedAt` | `DateTime` | `@updatedAt` |

**Relationships:**
- has-many `scheduleActivities: ScheduleActivity[]`
- has-many `fieldReports: FieldReport[]`

---

### 2.2 `Supervisor`

Field reporters who submit field reports.

| Field | Type | Attributes |
|-------|------|-----------|
| `id` | `String` | `@id @default(cuid())` |
| `name` | `String` | |
| `role` | `String` | e.g. "Piping Supervisor" |
| `discipline` | `String` | Civil / Mechanical / Piping / Electrical / Instrumentation |
| `createdAt` | `DateTime` | `@default(now())` |

**Relationships:**
- has-many `fieldReports: FieldReport[]`

---

### 2.3 `ScheduleActivity`

L5/L6 planned activities imported from the schedule. This is the **source of truth for activity IDs**.

| Field | Type | Attributes |
|-------|------|-----------|
| `id` | `String` | `@id @default(cuid())` |
| `projectId` | `String` | FK |
| `activityId` | `String` | e.g. `"A10931"` |
| `wbs` | `String` | e.g. `"PIP-03"` |
| `discipline` | `String` | |
| `activityName` | `String` | |
| `description` | `String` | |
| `location` | `String` | |
| `plannedStart` | `String` | ISO date |
| `plannedFinish` | `String` | ISO date |
| `actualStart` | `String?` | nullable |
| `actualFinish` | `String?` | nullable |
| `status` | `String` | Not Started / In Progress / Completed / Delayed |
| `searchText` | `String` | "Piping \| PIP-03 \| Unit 2 \| Spool Erection \| Line 24-XX \| Erect Spool Line 24-XX" |
| `createdAt` | `DateTime` | `@default(now())` |
| `updatedAt` | `DateTime` | `@updatedAt` |

**Constraints/Indexes:**
- `@@unique([projectId, activityId])`
- `@@index([discipline])`

**Relationships:**
- belongs to `project: Project` (`onDelete: Cascade`)
- has-many `activityMatches: ActivityMatch[]`
- has-many `plannerDecisions: PlannerDecision[]`

---

### 2.4 `FieldReport`

Raw input from a supervisor (text / voice-transcript / file).

| Field | Type | Attributes |
|-------|------|-----------|
| `id` | `String` | `@id @default(cuid())` |
| `projectId` | `String` | FK |
| `supervisorId` | `String` | FK |
| `supervisorName` | `String` | denormalized |
| `discipline` | `String` | |
| `inputType` | `String` | text / voice / excel / csv / pdf |
| `rawContent` | `String` | |
| `fileUrl` | `String?` | nullable |
| `reportDate` | `String` | ISO date |
| `createdAt` | `DateTime` | `@default(now())` |

**Relationships:**
- belongs to `project: Project` (`onDelete: Cascade`)
- belongs to `supervisor: Supervisor` (`onDelete: Cascade`)
- has-one `executionEvent: ExecutionEvent?`

---

### 2.5 `ExecutionEvent`

Structured extraction result derived from a field report by the AI pipeline.

| Field | Type | Attributes |
|-------|------|-----------|
| `id` | `String` | `@id @default(cuid())` |
| `reportId` | `String` | `@unique` (FK) |
| `discipline` | `String` | |
| `workType` | `String` | |
| `identifier` | `String` | |
| `location` | `String?` | |
| `actualStart` | `String?` | |
| `actualFinish` | `String?` | |
| `status` | `String?` | |
| `quantity` | `String?` | |
| `unit` | `String?` | |
| `evidence` | `String?` | |
| `createdAt` | `DateTime` | `@default(now())` |

**Relationships:**
- belongs to `report: FieldReport` (`onDelete: Cascade`) — **1:1** (unique FK)
- has-many `activityMatches: ActivityMatch[]`

---

### 2.6 `ActivityMatch`

Candidate produced by the AI matching pipeline for an execution event.

| Field | Type | Attributes |
|-------|------|-----------|
| `id` | `String` | `@id @default(cuid())` |
| `executionEventId` | `String` | FK |
| `activityId` | `String` | references `ScheduleActivity.activityId` (validated) |
| `scheduleActivityRowId` | `String?` | FK to `ScheduleActivity.id` (validated server-side) |
| `semanticScore` | `Float` | |
| `identifierScore` | `Float` | |
| `disciplineScore` | `Float` | |
| `workTypeScore` | `Float` | |
| `dateScore` | `Float` | |
| `finalScore` | `Float` | |
| `candidateMargin` | `Float` | |
| `rank` | `Int` | |
| `isTop` | `Boolean` | `@default(false)` |
| `explanation` | `String` | JSON string of explanation lines |
| `createdAt` | `DateTime` | `@default(now())` |

**Relationships:**
- belongs to `executionEvent: ExecutionEvent` (`onDelete: Cascade`)
- belongs to `scheduleActivity: ScheduleActivity?` (`onDelete: SetNull`) — **1:1** via `plannerDecision`
- has-one `plannerDecision: PlannerDecision?` (unique FK on the other side)

---

### 2.7 `PlannerDecision`

Human-in-the-loop decision (approve / change / reject).

| Field | Type | Attributes |
|-------|------|-----------|
| `id` | `String` | `@id @default(cuid())` |
| `matchId` | `String` | `@unique` (FK) |
| `decision` | `String` | APPROVED / CHANGED / REJECTED |
| `aiSuggestedActivityId` | `String?` | |
| `selectedActivityId` | `String?` | validated against schedule_activities |
| `scheduleActivityRowId` | `String?` | FK |
| `plannerName` | `String` | |
| `reason` | `String?` | |
| `createdAt` | `DateTime` | `@default(now())` |

**Relationships:**
- belongs to `match: ActivityMatch` (`onDelete: Cascade`) — **1:1** (unique FK)
- belongs to `scheduleActivity: ScheduleActivity?` (`onDelete: SetNull`)

---

### 2.8 `AuditLog`

Immutable trail of every meaningful action.

| Field | Type | Attributes |
|-------|------|-----------|
| `id` | `String` | `@id @default(cuid())` |
| `entityType` | `String` | FieldReport / ScheduleActivity / PlannerDecision / ... |
| `entityId` | `String` | |
| `action` | `String` | SUBMITTED / RESOLVED / APPROVED / CHANGED / REJECTED / SEEDED / RESET |
| `actor` | `String` | supervisor / planner name / "system" |
| `metadata` | `String` | JSON string |
| `createdAt` | `DateTime` | `@default(now())` |

**Index:**
- `@@index([entityType, entityId])`

**Relationships:** none (standalone/poly-morphic-ish log table).

---

### 2.9 `ModelEvaluation`

Baseline vs NEXORA comparison metrics.

| Field | Type | Attributes |
|-------|------|-----------|
| `id` | `String` | `@id @default(cuid())` |
| `label` | `String` | "baseline" / "nexora" |
| `total` | `Int` | |
| `top1Accuracy` | `Float` | |
| `top3Recall` | `Float` | |
| `highConfidencePrecision` | `Float` | |
| `falseAutoLinkRate` | `Float` | |
| `ambiguousDetected` | `Int` | |
| `unmatchedDetected` | `Int` | |
| `metricsJson` | `String` | full detail |
| `createdAt` | `DateTime` | `@default(now())` |

**Relationships:** none.

---

## 3. Entity-Relationship Diagram

```
Project 1───* ScheduleActivity
   │
   └───────* FieldReport 1───1 ExecutionEvent 1───* ActivityMatch 1───1 PlannerDecision
                │                                      │                  │
                └──*─ Supervisor                     *──┴──?─ ScheduleActivity (SetNull)

AuditLog (standalone — logs all entity types)
ModelEvaluation (standalone)
```

Note the important 1:1 chain: **FieldReport → ExecutionEvent → ActivityMatch(top) → PlannerDecision**. The `ExecutionEvent.reportId` is `@unique` (1:1), and `PlannerDecision.matchId` is `@unique` (1:1 against a match). The seed stores multiple `ActivityMatch` rows per event (ranked candidates), but only the top-ranked match (`isTop=true`) can receive a `PlannerDecision`.

The `ActivityMatch.scheduleActivityRowId` and `PlannerDecision.scheduleActivityRowId` are both nullable FKs with `onDelete: SetNull` — they reference the schedule activity but can be null because the AI pipeline never trusts an arbitrary ID; matches are only softly linked and validated server-side against `schedule_activities`.

---

## 4. Enums / Domain Vocabulary

Prisma does not define native enums; instead, string fields carry documented allowed values, enforced in the application layer via TypeScript union types in `src/lib/types.ts`:

**TypeScript unions in `src/lib/types.ts`:**
- `InputType = 'text' | 'voice' | 'excel' | 'csv' | 'pdf'` → `FieldReport.inputType`
- `ActivityStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Delayed'` → `ScheduleActivity.status`
- `DecisionLabel = 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED'` (not a DB column — used by the AI pipeline resolution, persisted partly in `ActivityMatch`/`ExecutionEvent`)
- `PlannerAction = 'APPROVED' | 'CHANGED' | 'REJECTED'` → `PlannerDecision.decision`
- `Discipline` derived from `DISCIPLINES = ['Civil', 'Mechanical', 'Piping', 'Electrical', 'Instrumentation']` (in `src/lib/ai/config.ts`)

**Discipline-bound work-type vocabulary** (`src/lib/ai/config.ts`):
- **Civil:** Excavation, Rebar, Concrete, Foundation, Backfill, Curb
- **Mechanical:** Equipment Installation, Alignment, Grouting, Valve Installation
- **Piping:** Welding, Spool Erection, Hydrotest, Pipe Support, Painting, Insulation
- **Electrical:** Cable Tray, Cable Pulling, Lighting Panel, Earthing, Termination, Megger Test, Junction Box, Motor Control Center
- **Instrumentation:** Instrument Installation, Calibration, Loop Test, Control Valve

---

## 5. Seed Data (`src/lib/seed.ts` + `scripts/seed.ts`)

### Entry point

`scripts/seed.ts` just imports and calls `seedDatabase()` from `src/lib/seed.ts` (also acts as a demo-reset command).

### `seedDatabase()` flow

1. **Wipe all tables** in FK-safe order:
   `auditLog → plannerDecision → activityMatch → executionEvent → fieldReport → scheduleActivity → supervisor → project → modelEvaluation` (cascades handle most).

2. **Create 1 Project**: code `UNIT4-EXP`, name "Unit-4 Expansion Project", representing a Primavera/MS Project export across 5 disciplines.

3. **Create 3 Supervisors:**
   - Ramesh Kumar — Piping Supervisor (Piping)
   - Amit Verma — Civil Supervisor (Civil)
   - Suresh Singh — Electrical Supervisor (Electrical)

4. **Create 75 ScheduleActivities** across the 5 disciplines, each with `status: 'Not Started'`, null actual dates, and a `searchText` built by `buildSearchText()` (format: `"Discipline | WBS | Location | WorkType | Identifier | ActivityName"`).
   - Piping (15), Civil (15), Electrical (15), Mechanical (15), Instrumentation (15).
   - Activity IDs are `Axxxxx` style (e.g. `A10931`, `A20418`, `A30512`, `A40601`, `A50701`), with WBS codes like `PIP-03`, `CIV-02`, `ELE-04`, `MEC-05`, `INS-06`.

5. **Build an embedding index** from the activities and run the real matching pipeline for each of **6 demo FieldReports** (some in Hinglish). Each report produces:
   - A `FieldReport`
   - An `ExecutionEvent` (structured extraction, using in-seed `event` data)
   - Top + alternative `ActivityMatch` rows (via `retrieveCandidates` + `decide`)
   - `AuditLog` entries: `SUBMITTED` (actor = supervisor) and `RESOLVED` (actor = `NEXORA-AI`)

6. **Pre-approve one report** (Line 25-XX spool erection, `APPROVED` by Arun Sharma) to demonstrate the schedule-update + audit trail. This creates a `PlannerDecision`, updates the target `ScheduleActivity` (actual dates + status), and writes `APPROVED` (PlannerDecision) and `UPDATED` (ScheduleActivity) audit entries.

7. **Returns** a summary `{ project, activities, supervisors, reports, groundTruth }`.

### Ground truth dataset

The seed module also exports **25 `GroundTruthRow` entries** (`getGroundTruth()`) and the raw 75-activity tuples (`getActivitiesForEval()`) used for evaluation:
- **20 real** mappings to specific activity IDs (expected `HIGH_CONFIDENCE`)
- **3 ambiguous** cases (`AMBIGUOUS`, expected `NEEDS_REVIEW`) — e.g. "Pipe work completed."
- **2 unmatched** cases (`UNMATCHED`, expected `UNMATCHED`) — e.g. "New drainage trench completed near Unit 4."

These are used by `scripts/export-data.ts` (writes CSVs to `/data/`) and by `scripts/evaluate-matching.ts` → `src/lib/ai/evaluation.ts` (runs baseline vs NEXORA comparison and persists two `ModelEvaluation` rows).

---

## 6. How the Database Is Accessed in Practice

### DB client usage pattern
All modules import the singleton `db` from `@/lib/db`. Example usages found:
- **`src/lib/ai/pipeline.ts`** — `loadActivities()` reads all `scheduleActivity` rows (optionally filtered by `projectId`).
- **`src/app/api/reports/route.ts`** — POST flow: finds `supervisor`, `project`, creates `fieldReport`, `executionEvent`, multiple `activityMatch` rows, and `auditLog` entries.
- **`src/app/api/planner/review/[id]/decision/route.ts`** — validates `activityId` against `schedule_activities`, creates `plannerDecision`, updates the target `scheduleActivity`, writes audit.
- **`src/lib/ai/evaluation.ts`** — reads `scheduleActivity`, deletes & writes `modelEvaluation` rows.
- **`scripts/verify-seed.ts`** — reads `executionEvent` with eager-loaded `report` + `activityMatches`, plus `auditLog`.
- Other API routes: `schedule`, `audit`, `state`, `supervisors`, `intelligence`, `planner/inbox`, `planner/review/[id]`, `seed`, `auth`, `reports/upload`, `evaluation`.

### Key invariant
Per the comments throughout (`matching.ts`, `pipeline.ts`, `extraction.ts`, and the decision route): **the schedule database is the source of truth for activity IDs.** The AI pipeline never trusts an LLM-suggested activity ID — it only scores activities that actually exist in `schedule_activities`, and `validateSelectedActivity()` / the decision route double-check before any DB write.

---

## 7. Key Files Referenced (Absolute Paths)

- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\prisma\schema.prisma`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\db.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\seed.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\scripts\seed.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\scripts\verify-seed.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\scripts\export-data.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\scripts\evaluate-matching.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\types.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\config.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\matching.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\normalization.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\pipeline.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\extraction.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\evaluation.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\reports\route.ts`
- `D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\planner\review\[id]\decision\route.ts`
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Explore AI pipeline and libs",
  "prompt": "Explore the Nexora-AI project at D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI thoroughly.\n\nRead and analyze ALL files under src/lib/ai/ directory:\n1. src/lib/ai/config.ts\n2. src/lib/ai/embeddings.ts\n3. src/lib/ai/extraction.ts\n4. src/lib/ai/normalization.ts\n5. src/lib/ai/matching.ts\n6. src/lib/ai/evaluation.ts\n7. src/lib/ai/pipeline.ts\n\nAlso read:\n- src/lib/auth.ts\n- src/lib/store.ts\n- src/lib/types.ts\n- src/lib/utils.ts\n\nDocument the complete AI pipeline: how it extracts data from reports, normalizes it, matches it to schedule activities, and evaluates results. Also document the auth system and state management.\n\nReturn a comprehensive analysis of the AI pipeline, authentication, state management, and type system.",
  "subagent_type": "explore"
}
```

**Output:**
```
<task id="ses_f9ca860f0ffe59bobvcxVNUdmS" state="completed">
<task_result>
I now have a comprehensive understanding of the entire codebase. Let me compile my full analysis.

---

# Nexora-AI — Comprehensive Codebase Analysis

## Project Overview

**Nexora-AI** is a "Field-to-Schedule Execution Intelligence Platform" (SIH26122 MVP) — a Next.js/TypeScript application that ingests free-text construction field reports from supervisors, uses an AI pipeline to extract structured data, semantically matches it against planned schedule activities, and produces confidence-graded resolution decisions for a planner to review. It is a prototype that swaps the PostgreSQL + pgvector design from the original specification for a **Prisma + SQLite** database and an **in-memory deterministic TF-IDF semantic index**.

The stack is:
- **Next.js (App Router)** — single-route SPA
- **Prisma ORM** over SQLite (`db/custom.db`)
- **Zustand** with `persist` middleware — client-side state
- **z-ai-web-dev-sdk** — optional LLM for structured extraction
- **Tailwind CSS + clsx/tailwind-merge** for styling (`cn` utility in `utils.ts`)

---

# Part 1: The AI Pipeline

The pipeline is orchestrated in `src/lib/ai/pipeline.ts` and described by its header comment:

```
FIELD REPORT -> STRUCTURED EXTRACTION -> NORMALIZATION ->
CANDIDATE RETRIEVAL -> CONTEXTUAL SCORING -> RERANKING ->
CONFIDENCE + CANDIDATE MARGIN -> HIGH_CONFIDENCE / NEEDS_REVIEW / UNMATCHED
```

`resolveReport()` is the orchestrator. It is **pure-ish** — it performs extraction + matching but does NOT persist anything; persistence and audit logging are handled by the calling API route (`/api/reports`). The matching stage is always real; the LLM is used only for extraction and can fall back deterministically.

## Stage 1 — Structured Extraction (`extraction.ts`)

**Goal:** Turn free-text (English, Hindi-English/Hinglish, mixed) field reports into a structured `ExecutionEvent`.

Two mechanisms:

1. **Primary — LLM extraction** via `z-ai-web-dev-sdk` (`extractExecutionEvent`):
   - Sends a strict `SYSTEM_PROMPT` with rules: output ONLY JSON, canonicalize values, constrain discipline to the 5 canonical values, use content as `evidence` (≤120 chars), convert dates to ISO `YYYY-MM-DD`, never fabricate, never invent activity IDs.
   - Parses the response via `safeParseJson` (strips code fences, extracts first `{...}` block).
   - On any failure (SDK unavailable, parse error, network) it falls through to the heuristic extractor.

2. **Fallback — deterministic heuristic extractor** (`heuristicExtract`):
   - `detectDiscipline` — regex matching keywords (e.g. `pipe|spool|weld|hydrotest` → Piping).
   - `detectWorkType` — keyword→work-type mapping (e.g. `spool|erection|erect` → "Spool Erection").
   - `detectIdentifier` — line/equipment codes (`Line 24-XX`, `F-102`, `C-17`).
   - `detectDates` — extracts date tokens (uses demo year 2026), infers a start/finish window.
   - `detectLocation` — recognizes "Compressor Area" / "Unit N".
   - Status inference from English + Hinglish completion words ("complete", "ho gaya", "kar diya").

`normalizeEvent` applies domain normalization (see Stage 2) and date/status canonicalization. The year **2026** is hard-coded as the demo project year throughout.

**Key invariant:** Extraction NEVER invents a schedule activity ID — IDs are only ever selected from `schedule_activities` by the matching stage.

## Stage 2 — Normalization (`normalization.ts`)

Deterministic mapping of heterogeneous field language onto canonical domain codes.

- `normalizeDiscipline` — maps synonyms to the 5 canonical disciplines (piping/pipe/pipeline→Piping, concreting/excavation→Civil, pump/compressor/equipment→Mechanical, cable/wiring→Electrical, instrument/transmitter/calibration→Instrumentation, etc.).
- `normalizeWorkType` — large synonym table mapping phrases → canonical work types per discipline (e.g. "spool erection complete"/"spool installed"/"erected" → "Spool Erection"). Supports exact phrase then substring matching for compound phrases.
- `normalizeIdentifier` — collapses to an uppercased alphanumeric+dash+slash token (strips "LINE"/"SPOOL" fillers).
- `buildSearchText` — builds the searchable string for each schedule activity: `"Discipline | WBS | Location | WorkType | Identifier | ActivityName"`. This is used at **seed time** to populate `ScheduleActivity.searchText`.

## Stage 3 — Semantic Embedding (`embeddings.ts`)

An **in-memory deterministic TF-IDF + cosine** semantic index over schedule activities (a stand-in for the spec's pgvector, requiring zero extra infrastructure).

- **Tokenization:** lowercases, keeps `[a-z0-9-/]`, filters a stopword list that includes English AND Hindi/Hinglish words (`the, ko, ka, ke, hai, huya, hua, kar, diya, gayi, gaya, aur`, plus generic verbs like `install/done/work/complete`).
- **TF:** sub-linear term frequency `1 + log(v)`.
- **IDF:** smoothing `log((N+1)/(d+1)) + 1`.
- `buildIndex` produces `EmbeddingIndex { entries, idf, version }` where each entry has a **unit-normalized TF-IDF vector** (Map of term→weight). `version` is derived from activity count + IDs (used for cache invalidation).
- `embedQuery` embeds a query and `cosine()` computes similarity (vectors are pre-normalized so dot product == cosine, iterating over the smaller map for efficiency).
- `buildIndexFromActivities` (in `matching.ts`) bridges DTOs → index entries (`searchText` → tokens).

## Stage 4 — Candidate Retrieval + Contextual Scoring (`matching.ts`)

`retrieveCandidates(event, activities, index, topK=5)`:

1. Builds a query text from the event: `discipline | workType | identifier | location`.
2. Embeds it against the index.
3. For **every** activity, computes 5 weighted signal scores and combines them via the configured weights (`config.ts`):
   - `identifier` (0.4 = 40%) — `scoreIdentifier`: normalized identifier substring match (1.0 exact, 0.9 fuzzy alphanumeric core, else token-overlap ratio).
   - `discipline` (0.2 = 20%) — `scoreDiscipline`: exact (case-insensitive) match → 1 else 0.
   - `workType` (0.2 = 20%) — `scoreWorkType`: canonical-to-canonical comparison (normalizes both sides; handles "Erect Spool" vs "Spool Erection"). Deliberately avoids token-level overlap to prevent cross-matches like "cable" + "tray" crediting a "Cable Pulling" activity.
   - `semantic` (0.15 = 15%) — cosine similarity of TF-IDF vectors.
   - `date` (0.05 = 5%) — `scoreDate`: rewards events whose actual dates overlap or are close to the planned window; neutral 0.5 if no dates.
   - **Final score** = weighted sum.
4. **Discipline filtering** (retrieval-stage): when the event's discipline is known, the pool is the same-discipline candidates plus up to 2 cross-discipline "distractors" (kept so the UI can show "why not").
5. Pools are sorted by final score, sliced to top-K, and assigned `rank` 1..K.

Each candidate gets a human-readable `explanation` (via `buildExplanation`) describing which signals fired.

## Stage 5 — Confidence Decision (`decide`)

The **signal-based confidence policy**. The schedule DB is the sole source of truth for activity IDs; the module never trusts an LLM-suggested ID.

Computes `topScore`, `secondScore`, and `candidateMargin = top - second`. Thresholds from `config.ts`:
- `unmatchedTopScore = 0.5` — below this → UNMATCHED
- `highConfidenceScore = 0.85` — auto-accept threshold
- `ambiguityMargin = 0.08` — minimum margin between top and second to avoid ambiguity

**High-confidence branch (auto-suggest SCHEDULE UPDATE only state):**
- Exactly **one** same-discipline candidate matches BOTH identifier (≥0.9) AND work type (≥0.9)
- AND final score ≥ 0.85 AND margin ≥ 0.08

This is the signal-based definition: a single candidate matching *identifier + work type + discipline* with strong score and unambiguous margin.

**NEEDS_REVIEW branches:**
- No discipline signal → ambiguous resolution (unless a very strong id+score+margin case above).
- Single strong candidate but below the auto-accept threshold.
- Multiple candidates matching identifier AND work type.
- Generic discipline-level report ("Pipe work completed") where the work type is null → refuses to guess.
- Partial signal match (identifier OR work type, not both).

**UNMATCHED branches:**
- No candidates.
- Below `unmatchedTopScore`.
- Work type present but matches nothing in the schedule (report subject not in any planned activity).

The decision deliberately **refuses to force** a report into an unrelated activity — information is preserved for human review.

## Stage 6 — Orchestration & Persistence (`pipeline.ts` + API route)

`resolveReport`:
1. `extractExecutionEvent(rawText, inputType)` → structured event.
2. Builds/caches the embedding index keyed by a signature (`id:activityId` pairs, truncated to 800 chars). The signature includes both CUIDs and activity codes so a demo reset (re-creating rows with new IDs) invalidates the cache.
3. `retrieveCandidates` → `decide` → returns full `ResolutionResult` (event, candidates, selectedActivityId, topScore, secondScore, candidateMargin, decision, explanation, rawText, inputType).

`validateSelectedActivity` verifies an arbitrary planner-chosen activity ID actually exists in `schedule_activities`.

**API route `/api/reports`** ties it together:
1. Persists the raw `FieldReport` + `SUBMITTED` audit log.
2. `loadActivities(projectId)` → `resolveReport`.
3. Persists the structured `ExecutionEvent`.
4. Persists each candidate as an `ActivityMatch` row (scores, margin, rank, `isTop`, explanation JSON).
5. Writes a `RESOLVED` audit log with decision/selectedActivity/topScore/margin.

## Evaluation (`evaluation.ts`)

Compares a **baseline (naive keyword/fuzzy)** matcher against the **NEXORA** pipeline using 25 hand-labeled ground-truth rows (`getGroundTruth` in `seed.ts`). Each row maps a raw report to an expected activity ID or to the special labels `"AMBIGUOUS"` or `"UNMATCHED"`.

- **Baseline:** substring token-overlap against `searchText`, with an aggressive auto-link threshold (topScore ≥0.25 → HIGH_CONFIDENCE, ≥0.1 → NEEDS_REVIEW). This models the realistic failure mode of naive keyword matching — confident false links.
- **NEXORA:** uses the **deterministic heuristic extractor** (not the LLM) to keep evaluation reproducible and free of unnecessary LLM calls (the matching stage — the actual differentiator — is identical to live).

Metrics computed (`computeMetrics`):
- `top1Accuracy` (top candidate == ground-truth, on non-AMBIGUOUS/non-UNMATCHED rows)
- `top3Recall`
- `highConfidencePrecision` (auto-links that are actually correct / total auto-links)
- `falseAutoLinkRate` (wrong/ambiguous/unmatched reports that were auto-linked)
- `ambiguousDetected` and `unmatchedDetected` (correctly flagged NEEDS_REVIEW / UNMATCHED)

Results are persisted to the `ModelEvaluation` table (two rows: "baseline" and "nexora").

**Verdict from `data/evaluation-results.json` (25 rows):**
| Metric | Baseline | Nexora |
|---|---|---|
| top1Accuracy | 0.80 | 0.85 |
| top3Recall | 0.95 | 0.95 |
| highConfidencePrecision | 0.625 | 1.0 |
| falseAutoLinkRate | 0.36 | 0.0 |
| ambiguousDetected | 0 | 3 |
| unmatchedDetected | 0 | 1 |

The Nexora pipeline achieves **100% auto-link precision** (no false auto-links) vs. the baseline's 62.5%, correctly flags 3 ambiguous and 1 unmatched case that the baseline blindly force-links — demonstrating the value of the ambiguity/confidence model.

---

# Part 2: Configuration (`config.ts`)

Centralized prototype tuning knobs:
- `SCORING_WEIGHTS`: identifier 40%, discipline 20%, work type 20%, semantic 15%, date 5%.
- `THRESHOLDS`: `unmatchedTopScore` 0.5, `highConfidenceScore` 0.85, `ambiguityMargin` 0.08, `topK` 5.
- `DISCIPLINES`: Civil, Mechanical, Piping, Electrical, Instrumentation.
- `WORK_TYPES`: canonical per-discipline work types (used by normalization + matching).

Comments explicitly note these are "prototype decision weights & thresholds, not scientifically optimal."

---

# Part 3: Authentication System (`auth.ts` + API)

**Mock, cookie-based auth**, swappable for Supabase Auth later:
- Uses Next.js `cookies()`.
- A single cookie `nexora-role` stores the JSON-serialized `Role` object.
- `getRole()` → parses/resolves the Role.
- `setRole(role)` → writes an `httpOnly`, `sameSite='lax'`, 7-day (`maxAge`) cookie with path `/`.
- `clearRole()` → deletes the cookie.

The `/api/auth` route:
- `POST /api/auth` with `{ profile, supervisorId? }`:
  - **supervisor:** looks up a seeded supervisor (or defaults to the first Piping supervisor `Ramesh Kumar`), builds a `Role { type:'supervisor', name, role, discipline, supervisorId }`, sets it.
  - **planner:** builds a static `Role { type:'planner', name:'Arun Sharma', role:'Project Planner' }`.
- `GET /api/auth` returns current role.
- `POST /api/auth/logout` clears the role.

The role is used in API routes (e.g., `/api/reports` picks the supervisor from the logged-in role) and in the client store.

---

# Part 4: State Management (`store.ts`)

**Client-side Zustand store** (`useApp`) with `persist` middleware (localStorage under key `nexora-app`):

- Since the environment exposes only the `/` route, every spec "route" is modeled as a **view** in the store.
- **Views:** `login`, `supervisor-home/report/submissions`, `planner-inbox/review/activities/intelligence/evaluation/audit`.
- `SUPERVISOR_VIEWS` and `PLANNER_VIEWS` constants partition the accessible views by role.
- **State:** `role` (`Role | null`), `view`, `selectedReportId` (for planner review), `hydrated` flag.
- **Actions:**
  - `setRole` — sets role and switches to role-appropriate home view.
  - `go` — navigates views.
  - `selectReport` — selects a report for review.
  - `setHydrated` — marks rehydration done.
  - `logout` — resets role/view/selectedReport.
- `persist` `partialize` only persists `{ role, view }`; `onRehydrateStorage` sets `hydrated = true` so UI can avoid hydration mismatches.

There is no server-side state; the store is purely client-side view/auth-role navigation.

---

# Part 5: Type System (`types.ts`)

The shared domain types used across AI pipeline, API, and frontend:

- **`InputType`** = `'text' | 'voice' | 'excel' | 'csv' | 'pdf'` — report input source.
- **`ActivityStatus`** = `'Not Started' | 'In Progress' | 'Completed' | 'Delayed'`.
- **`DecisionLabel`** = `'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED'`.
- **`PlannerAction`** = `'APPROVED' | 'CHANGED' | 'REJECTED'`.
- **`ExecutionEvent`** — the structured extraction: discipline, workType, identifier, location, actualStart/Finish (ISO), status, quantity, unit, evidence.
- **`ScheduleActivityDTO`** — id, activityId, wbs, discipline, activityName, description, location, planned/actual dates, status, searchText.
- **`MatchSignal`** — the 5 numeric signal scores (identifier, discipline, workType, semantic, date).
- **`CandidateMatch`** — an activity + its signals, finalScore, rank, explanation.
- **`ResolutionResult`** — the full pipeline output (event, candidates, decision, margin, explanation, rawText, inputType).
- **`AuditEventDTO`** — immutable audit trail record.
- **`PlannerInboxItem`** — report + resolution + planner-decision summary for the planner UI.
- **`IntelligenceResultRow`** — variance analysis row (planned vs actual finish, status, varianceDays).
- **`EvaluationMetrics`** — the baseline/Nexora comparison outputs.
- **`Role`** — `{ type: 'supervisor' | 'planner', name, role, discipline?, supervisorId? }`.

---

# Part 6: Persistence Layer / Data Model (`db.ts` + `schema.prisma`)

Singleton Prisma client in `db.ts` (reuses global in dev). Prisma schema (SQLite driver in use) models:
- **Project** — the representative schedule export (code like "UNIT4-EXP").
- **Supervisor** — field reporters (name, role, discipline).
- **ScheduleActivity** — planned activity (activityId "A10931", wbs, discipline, name/description, location, planned/actual dates, status, precomputed `searchText`). Unique `[projectId, activityId]`.
- **FieldReport** — raw input (inputType, rawContent, reportDate).
- **ExecutionEvent** — the structured extraction (1:1 with report).
- **ActivityMatch** — pipeline candidates (per-signal scores + finalScore + margin + rank + `isTop` + explanation JSON).
- **PlannerDecision** — human in-the-loop (APPROVED/CHANGED/REJECTED), 1:1 with a match, validates selected activity.
- **AuditLog** — immutable action trail.
- **ModelEvaluation** — baseline/Nexora metrics rows.

**Notes:** the schema declares `datasource db { provider = "postgresql" }`, but the actual runtime database is `db/custom.db` (SQLite, per `data/` and runtime build scripts). This is an intentional prototype adaptation of the Supabase/PostgreSQL spec to Prisma + SQLite.

---

# End-to-End Flow Summary

```
Supervisor submits report (text/voice/excel/csv/pdf/file upload)
   │
   ▼  /api/reports or /api/reports/upload
Persist FieldReport + SUBMITTED audit
   │
   ▼  pipeline.resolveReport()
extractExecutionEvent  ──LLM (z-ai-sdk)──┐
   │  fallback: heuristicExtract         │
   ▼                                     │
ExecutionEvent (structured)              │
   │ normalizeDiscipline/WorkType/Id     │
   ▼                                     │
retrieveCandidates (TF-IDF cosine +      │
   identifier/discipline/workType/date   │
   weighted scoring, discipline filtered)│
   │  semantic via embeddings.ts         │
   ▼                                     │
decide() → HIGH_CONFIDENCE / NEEDS_REVIEW / UNMATCHED
   │  (thresholds + ambiguity margin)    │
   ▼                                     │
Persist ExecutionEvent + ActivityMatch[] + RESOLVED audit
   │                                     │
   ▼                                     │
Planner Inbox → Review → APPROVE/CHANGE/REJECT
   │  (validateSelectedActivity on change)│
   ▼                                     │
Persist PlannerDecision + schedule update + audit
```

**Human-in-the-loop safety:** The pipeline is deliberately conservative — it auto-links (HIGH_CONFIDENCE) only when a single candidate matches identifier + work type + discipline with high score and unambiguous margin. Ambiguous and unmatched reports are preserved and routed to the planner rather than force-matched. `data/evaluation-results.json` confirms this achieves 100% auto-link precision with zero false auto-links, versus 62.5% precision and 36% false-auto-link rate for the naive baseline.

### Files Analyzed
- `src/lib/ai/config.ts`, `embeddings.ts`, `extraction.ts`, `normalization.ts`, `matching.ts`, `evaluation.ts`, `pipeline.ts`
- `src/lib/auth.ts`, `store.ts`, `types.ts`, `utils.ts`
- Supporting: `db.ts`, `api.ts`, `seed.ts`, `prisma/schema.prisma`, `app/api/reports/route.ts`, `app/api/auth/route.ts`, `data/evaluation-results.json`
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Explore frontend components",
  "prompt": "Explore the Nexora-AI project at D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI thoroughly.\n\nAnalyze the frontend components:\n1. Read src/app/page.tsx, src/app/layout.tsx\n2. Read all files under src/components/views/ - both planner/ and supervisor/ subdirectories\n3. Read key shared components under src/components/shared/\n\nFor each view/page component, document:\n- What view/page it renders\n- What data it fetches (which API calls)\n- What UI elements and interactions it provides\n- What role it serves (planner vs supervisor)\n\nReturn a comprehensive analysis of the frontend architecture, all views, their purposes, and how they interact with the API layer.",
  "subagent_type": "explore"
}
```

**Output:**
```
<task id="ses_f9ca8523dffeHvQDTf2xJ2HHN4" state="completed">
<task_result>
Now I have read every relevant file. Here is the comprehensive analysis.

---

# NEXORA-AI Frontend Architecture -- Comprehensive Analysis

## 1. Project Identity and Purpose

**NEXORA** (full title: "Field-to-Schedule Execution Intelligence") is a Next.js (App Router) single-page application built as an **SIH26122 MVP** (Smart India Hackathon). It provides an intelligent bridge between heterogeneous **field execution reports** (written by construction supervisors on-site) and a structured **L5/L6 project schedule** (from Primavera/MS Project exports). The core differentiator is a multi-signal AI matching pipeline that resolves free-text field statements into scheduled activities with confidence scoring.

---

## 2. Overall Architecture

```
src/
  app/
    page.tsx            <-- SPA root, client-side view router
    layout.tsx          <-- Root layout (fonts, toast providers)
    api/                <-- Next.js API routes (server-side)
      auth/route.ts
      auth/logout/route.ts
      state/route.ts
      reports/route.ts
      reports/upload/route.ts
      schedule/route.ts
      supervisors/route.ts
      intelligence/route.ts
      evaluation/route.ts
      audit/route.ts
      seed/route.ts
      planner/inbox/route.ts
      planner/review/[id]/route.ts
      planner/review/[id]/decision/route.ts
  lib/
    store.ts            <-- Zustand client store (view routing + auth state)
    api.ts              <-- Typed fetch wrappers for all API endpoints
    types.ts            <-- Shared domain types
    auth.ts             <-- Server-side mock auth (cookie-based)
    db.ts               <-- Prisma client
    seed.ts             <-- Seed data
    utils.ts            <-- cn() utility
    ai/                 <-- AI pipeline modules
      pipeline.ts
      extraction.ts
      normalization.ts
      matching.ts
      embeddings.ts
      evaluation.ts
      config.ts
  components/
    views/
      Login.tsx
      supervisor/
        SupervisorHome.tsx
        SupervisorSubmissions.tsx
        SupervisorReport.tsx
      planner/
        PlannerInbox.tsx
        PlannerReview.tsx
        PlannerActivities.tsx
        PlannerIntelligence.tsx
        PlannerEvaluation.tsx
        PlannerAudit.tsx
    shared/             <-- 9 reusable display components
    ui/                 <-- shadcn/ui primitives
```

**Key architectural decision:** The entire app is served from a **single route** (`/`). View switching is handled client-side via a **Zustand store** (`src/lib/store.ts`) with `persist` middleware (localStorage). The store holds the current `role`, `view`, `selectedReportId`, and hydration state. This makes the app behave like a client-side SPA even though it runs on Next.js App Router.

---

## 3. Client State Management (`src/lib/store.ts`)

| State field | Purpose |
|---|---|
| `role: Role \| null` | Current user identity (`{ type, name, role, discipline? }`) |
| `view: View` | Active view/panel (one of 10 possible views) |
| `selectedReportId: string \| null` | The report ID being reviewed in PlannerReview |
| `hydrated: boolean` | Whether localStorage has been read |

**View routing functions:**
- `setRole(r)` -- sets role and auto-navigates to the home view for that role
- `go(view)` -- navigates to any view
- `selectReport(id)` -- sets the report ID, then `go('planner-review')` opens it
- `logout()` -- clears role, view, and selectedReportId

**Persisted to localStorage** under key `"nexora-app"`: only `role` and `view` are saved, ensuring the user lands back in the right view on refresh.

**View constants:**
- `SUPERVISOR_VIEWS`: `['supervisor-home', 'supervisor-report', 'supervisor-submissions']`
- `PLANNER_VIEWS`: `['planner-inbox', 'planner-review', 'planner-activities', 'planner-intelligence', 'planner-evaluation', 'planner-audit']`

---

## 4. Client API Layer (`src/lib/api.ts`)

A thin typed wrapper around `fetch()` using relative URLs. Every method calls `jsonOrThrow<T>()` which parses JSON, checks `res.ok`, and throws on error.

| API Method | HTTP | Endpoint | Used By |
|---|---|---|---|
| `api.state()` | GET | `/api/state` | Page.tsx (hydration), PlannerInbox |
| `api.login(profile, supervisorId?)` | POST | `/api/auth` | Login |
| `api.logout()` | POST | `/api/auth/logout` | Footer, Page shell |
| `api.supervisors()` | GET | `/api/supervisors` | Login |
| `api.schedule(params?)` | GET | `/api/schedule` | PlannerActivities |
| `api.submitReport(body)` | POST | `/api/reports` | SupervisorHome (text/voice) |
| `api.uploadReport(file)` | POST | `/api/reports/upload` | SupervisorHome (upload) |
| `api.inbox()` | GET | `/api/planner/inbox` | PlannerInbox, SupervisorSubmissions |
| `api.review(id)` | GET | `/api/planner/review/:id` | PlannerReview |
| `api.decide(id, body)` | POST | `/api/planner/review/:id/decision` | PlannerReview |
| `api.intelligence(q)` | GET | `/api/intelligence` | PlannerIntelligence |
| `api.audit(params?)` | GET | `/api/audit` | PlannerAudit |
| `api.runEvaluation()` | POST | `/api/evaluation` | PlannerEvaluation |
| `api.getEvaluation()` | GET | `/api/evaluation` | PlannerEvaluation |
| `api.resetDemo()` | POST | `/api/seed` | Footer |

---

## 5. Root Page and Layout

### `src/app/layout.tsx`
Standard Next.js root layout. Provides:
- **Fonts:** Geist Sans + Geist Mono (via `next/font/google`)
- **Toast providers:** Both shadcn `<Toaster>` and Sonner `<SonnerToaster>` (position: top-right, richColors, closeButton)
- **Metadata:** Title "NEXORA -- Field-to-Schedule Execution Intelligence", description, keywords

### `src/app/page.tsx` (307 lines)
The **single entry point** for the entire SPA. It:

1. **Bootstraps:** Calls `api.state()` on mount to hydrate the role from the server-side cookie. Shows a spinner until hydrated.
2. **Guards:** If no role, renders `<Login />`. If the stored view is not valid for the current role, falls back to the role's home view.
3. **Renders the correct shell:**
   - `SupervisorShell` -- a compact mobile-first layout with a sticky header (Brand, user info, HardHat icon) and a bottom tab bar with 2 nav items.
   - `PlannerShell` -- a desktop sidebar + mobile top-bar layout with a dark (`bg-slate-900`) sidebar containing Brand, user card, 5 nav items, and a Sign-out button.
4. **Renders the active view** via `renderSupervisorView()` or `renderPlannerView()` switch statements.
5. **Footer** is always shown at the bottom.

**Supervisor navigation:** Report (Home), My Submissions
**Planner navigation:** Resolution Inbox, Schedule, Execution Intelligence, Model Evaluation, Audit Trail

---

## 6. View-by-View Analysis

### 6.1 Login (`src/components/views/Login.tsx`)

| Aspect | Detail |
|---|---|
| **Role** | Authentication gate for both roles |
| **API calls** | `api.supervisors()` (GET) to populate the dropdown; `api.login('supervisor', id)` or `api.login('planner')` (POST) |
| **UI elements** | Brand (lg), two side-by-side Cards (Supervisor / Project Planner), Supervisor dropdown (Select), "Continue as" buttons |
| **Interactions** | Select a supervisor from dropdown -> click Continue as Supervisor; OR click Continue as Project Planner (hardcoded "Arun Sharma") |
| **Notes** | Mock auth for prototype. The planner profile is fixed. The supervisor profile is selectable from seeded demo data. Error state prompts user to run seed. |

### 6.2 SupervisorHome (`src/components/views/supervisor/SupervisorHome.tsx`, 740 lines)

| Aspect | Detail |
|---|---|
| **Role** | The primary field capture interface -- "just tell us what happened" |
| **API calls** | `api.submitReport({ inputType, rawContent })` (POST) for text/voice; `api.uploadReport(file)` (POST) for file upload |
| **Phases** | Three: `capture` -> `preview` -> `success` |

**Phase: Capture** -- Three input modes selectable via segmented control:
1. **Write (text):** Textarea with discipline-aware placeholder (Hinglish examples for Piping/Civil/Electrical). Character count. "Understand this report" button triggers `runPipeline('text', text)`.
2. **Speak (voice):** MediaRecorder-based mic recording with timer, stop button, error handling for unsupported browsers. Includes a "Use a demo transcript" button that fills discipline-specific Hinglish text. Transcript textarea is editable before submission.
3. **Upload:** Drag-and-drop zone + file input accepting `.txt, .csv, .xlsx, .xls, .pdf`. Calls `api.uploadReport(file)` which returns extracted text preview.

**Processing State:** While the API call is in flight, the `ProcessingState` shared component shows animated multi-step pipeline visualization.

**Phase: Preview ("I understood"):** Shows a structured extraction card:
- Discipline (DisciplineTag), Work Type, Identifier, Location, Actual Start/Finish, Status (StatusBadge), Quantity/Unit
- Evidence Highlight: the original field statement with the AI-identified evidence substring highlighted
- Decision Summary: color-coded banner for HIGH_CONFIDENCE / NEEDS_REVIEW / UNMATCHED
- "Edit" and "Confirm & Submit" buttons

**Phase: Success:** Confirmation with green checkmark, decision-dependent message, "View my submissions" and "Report another" buttons.

### 6.3 SupervisorSubmissions (`src/components/views/supervisor/SupervisorSubmissions.tsx`, 273 lines)

| Aspect | Detail |
|---|---|
| **Role** | Shows the supervisor's own submitted reports and their resolution status |
| **API calls** | `api.inbox()` (GET `/api/planner/inbox`) -- fetches ALL reports, then filters client-side by `supervisorName === role.name` |
| **UI elements** | Header with count, loading skeletons, error retry, empty state, list of `SubmissionCard` components |

Each `SubmissionCard` shows:
- Date, input type icon + label, discipline tag, "In planner inbox" indicator
- Raw field statement (truncated to 2 lines)
- `DecisionBadge` (HIGH_CONFIDENCE/NEEDS_REVIEW/UNMATCHED)
- `ConfidenceBadge` (score + High/Medium/Low label)
- `ActionBadge` (APPROVED/CHANGED/REJECTED or null)
- `ResolutionLine`: color-coded text describing the outcome (e.g., "Approved by Arun Sharma", "Awaiting planner review")

**Important:** The supervisor never sees WBS codes or activity IDs -- only activity NAME when matched, and the AI/planner decision.

### 6.4 SupervisorReport (`src/components/views/supervisor/SupervisorReport.tsx`, 4 lines)

| Aspect | Detail |
|---|---|
| **Role** | Placeholder/stub |
| **UI** | Just shows "Supervisor report (building...)" |

### 6.5 PlannerInbox (`src/components/views/planner/PlannerInbox.tsx`, 358 lines)

| Aspect | Detail |
|---|---|
| **Role** | Planner's landing page -- "AI Resolution Workspace" |
| **API calls** | `Promise.all([api.state(), api.inbox()])` -- fetches summary counts + all inbox items on mount |
| **UI elements** | 4 summary stat cards, list of `InboxCard` components |

**Summary stat cards** (2x2 grid):
- Incoming (slate) -- total field reports
- AI Resolved (emerald) -- high-confidence auto-matches
- Needs Review (amber) -- ambiguous candidates
- Unmatched (rose) -- no planned activity

Each `InboxCard` shows:
- Discipline tag, supervisor name, input type badge, date, decision badge, confidence badge, action badge
- Raw field statement in a blockquote with amber left border
- Resolution summary line (color-coded)
- "Review" button (for undecided) or "View decision" button (for decided)

**Interaction:** Clicking an undecided card calls `selectReport(id)` + `go('planner-review')`, opening the full review detail.

### 6.6 PlannerReview (`src/components/views/planner/PlannerReview.tsx`, 1121 lines -- the largest component)

| Aspect | Detail |
|---|---|
| **Role** | The "WOW" view -- full resolution detail for a single field report |
| **API calls** | `api.review(reportId)` (GET `/api/planner/review/:id`); `api.decide(reportId, body)` (POST `/api/planner/review/:id/decision`) |
| **Key state** | `data: ReviewData`, `success: SuccessState \| null`, `changeOpen`, `rejectOpen`, `selectedCandidate` |

**Sections rendered sequentially:**

1. **Back to inbox** button

2. **Field Report card:** Supervisor name, discipline, input type, date, raw report with `EvidenceHighlight` (AI-extracted evidence substring highlighted in amber)

3. **AI Extracted card:** 3-column grid of 9 fields: Discipline, Work Type, Identifier, Location, Actual Start, Actual Finish, Status, Quantity, Unit

4. **Suggested Activity card:**
   - If UNMATCHED: rose-colored error box with "No reliable match" message, weak top candidate info
   - Otherwise: Activity ID (mono font), Activity Name, WBS + Location, `ConfidenceBadge`, Candidate margin percentage, second candidate score
   - "Why this match?" section: explanation chips with green checkmarks
   - "Planned vs Actual" comparison grid with `VariancePill` (days early/late/on time)

5. **Candidates table:** Full ranked table of all candidates with columns: Rank, Activity (ID + name + "Top" tag), Discipline, Location, Score (ConfidenceBadge), Signals (bar chart of 5 signal components: ID, Disc, WT, Sem, Date -- each a mini progress bar color-coded green/amber/rose)

6. **Action Area:** Decision-dependent action buttons:
   - **HIGH_CONFIDENCE:** Approve & Update (green), Change Match, Reject
   - **NEEDS_REVIEW:** Approve disabled (with explanation), Change Match, Reject
   - **UNMATCHED:** Dismiss, Create Review Item
   - **Already decided:** Read-only `DecisionSummary` showing the recorded decision

7. **Change Match dialog:** Modal with scrollable list of all candidates as radio-button cards. Select one -> "Confirm change" posts to `api.decide()` with `action: 'CHANGED'`.

8. **Reject dialog:** Modal with optional reason textarea. Posts `action: 'REJECTED'` to `api.decide()`.

9. **Success state:** After a decision, shows success card with activity details, correction notes (for CHANGED), audit trail confirmation, and "View audit" / "Back to inbox" buttons.

### 6.7 PlannerActivities (`src/components/views/planner/PlannerActivities.tsx`, 296 lines)

| Aspect | Detail |
|---|---|
| **Role** | The schedule (source of truth) -- dense, filterable table |
| **API calls** | `api.schedule({ discipline, status, search })` (GET `/api/schedule`) -- re-fetched on every filter change |
| **UI elements** | 3 filters + data table |

**Filters:**
- Discipline dropdown (All / Civil / Mechanical / Piping / Electrical / Instrumentation)
- Status dropdown (All / Not Started / In Progress / Completed / Delayed)
- Free-text search (by activityId, name, or location)

**Table columns:** Activity ID (mono), WBS (mono), Discipline (tag), Activity Name + description, Location, Planned (start->finish), Actual (start->finish), Status (StatusBadge), Variance (VariancePill)

This is the **only view where WBS codes and activity IDs are fully visible** -- it is planner-only.

### 6.8 PlannerIntelligence (`src/components/views/planner/PlannerIntelligence.tsx`, 272 lines)

| Aspect | Detail |
|---|---|
| **Role** | Execution Intelligence -- structured queries over the executed schedule |
| **API calls** | `api.intelligence(active)` (GET `/api/intelligence?q=...`) -- re-fetched on query change |
| **UI elements** | Query chip buttons, title/description, results table |

**Six predefined queries** (NOT a chatbot -- deterministic filters):
1. `delayed` -- Completed later than planned (positive variance)
2. `piping-delayed` -- Piping activities that are delayed
3. `on-time` -- Completed on or before planned
4. `completed` -- All completed
5. `in-progress` -- In progress
6. `not-started` -- Not started

**Results table columns:** Activity ID, Activity Name, Discipline, Location, Planned Finish, Actual Finish, Status, Variance

Special UX: When "delayed" returns empty, a helpful tip explains that the planner needs to approve a report first to populate this view.

### 6.9 PlannerEvaluation (`src/components/views/planner/PlannerEvaluation.tsx`, 311 lines)

| Aspect | Detail |
|---|---|
| **Role** | Model Evaluation -- Baseline vs NEXORA comparison |
| **API calls** | `api.getEvaluation()` (GET) on mount; `api.runEvaluation()` (POST) on button click |
| **UI elements** | Two side-by-side metric cards, explanatory text, "Reading the numbers" card |

**Compares** Baseline (aggressive keyword matching) vs NEXORA (semantic + contextual matching + confidence policy) over **25 ground-truth field reports**.

**Metrics displayed (per side):**
- Top-1 Accuracy
- Top-3 Recall
- High-Confidence Precision
- False Auto-Link Rate (the key differentiator)
- Ambiguous Detected
- Unmatched Detected

Key wins highlighted: 0% false auto-link rate, detects all ambiguous + unmatched cases. The NEXORA card has a green "Recommended" badge and ring border.

**Important note** in the UI: "Evaluation uses the deterministic heuristic extractor to keep the comparison reproducible; the live supervisor flow uses the LLM extractor. The matching stage -- the differentiator -- is identical."

### 6.10 PlannerAudit (`src/components/views/planner/PlannerAudit.tsx`, 345 lines)

| Aspect | Detail |
|---|---|
| **Role** | Audit Trail -- immutable timeline of all system events |
| **API calls** | `api.audit({ limit: 200 })` (GET `/api/audit`) |
| **UI elements** | Action filter dropdown, reverse-chronological timeline |

**Action filter options:** All, SUBMITTED, RESOLVED, APPROVED, CHANGED, REJECTED, UPDATED, SEEDED, RESET

**Timeline rendering:** Each event is a list item with:
- Color-coded dot (green=APPROVED/UPDATED, amber=RESOLVED/CHANGED, rose=REJECTED, slate=SUBMITTED/SEEDED/RESET)
- Timestamp, action badge or label, actor name
- One-line summary (intelligently formatted per action type -- not raw JSON)

The `summarize()` function parses audit metadata and creates human-readable summaries like "Piping report -- decision HIGH_CONFIDENCE -- activity P-041 -- score 92% -- margin 15%".

---

## 7. Shared Components (`src/components/shared/`)

| Component | File | Purpose |
|---|---|---|
| **Brand** | `Brand.tsx` | Logo mark (SVG sparkline icon in dark square) + "NEXORA" title + optional "Field-to-Schedule Intelligence" subtitle. Sizes: sm/md/lg |
| **ConfidenceBadge** | `ConfidenceBadge.tsx` | Renders a score (0-1) as "92 . High" with color: green (>=0.85), amber (>=0.5), rose (<0.5) |
| **DecisionBadge** | `StatusBadge.tsx` | Renders AI decision labels: HIGH_CONFIDENCE (green), NEEDS_REVIEW (amber), UNMATCHED (rose) |
| **ActionBadge** | `StatusBadge.tsx` | Renders planner actions: APPROVED (green solid), CHANGED (sky blue solid), REJECTED (rose solid) |
| **StatusBadge** | `StatusBadge.tsx` | Renders activity status: Completed (green), In Progress (amber), Delayed (rose), Not Started (slate) |
| **DisciplineTag** | `DisciplineTag.tsx` | Color-coded discipline tag: Piping (amber), Civil (stone), Mechanical (slate), Electrical (yellow), Instrumentation (violet) |
| **VariancePill** | `VariancePill.tsx` | Calculates days between planned and actual finish; shows "On time" (green), "+N days" (rose), or "-N days" (sky) |
| **EvidenceHighlight** | `EvidenceHighlight.tsx` | Renders raw text with the AI-identified evidence substring highlighted in amber `<mark>` |
| **ProcessingState** | `ProcessingState.tsx` | Animated 6-step pipeline visualization that lights up sequentially every 650ms: Understanding -> Extracting -> Normalizing -> Retrieving -> Resolving -> Computing |
| **EmptyState** | `EmptyState.tsx` | Centered dashed-border card with icon, title, description, optional action button |
| **Footer** | `Footer.tsx` | Global footer with Brand, "Reset Demo" button (calls `api.resetDemo()` then reloads), "Sign out" button, current user display |

---

## 8. Data Flow and Interaction Map

```
                  +------------------+
                  |     Login.tsx    |
                  |  api.supervisors |
                  |    api.login     |
                  +--------+---------+
                           |
            +--------------+--------------+
            |                             |
   Supervisor Flow                  Planner Flow
            |                             |
   +--------v---------+       +----------v----------+
   |  SupervisorHome   |       |    PlannerInbox     |
   |  api.submitReport |       |  api.state +        |
   |  api.uploadReport |       |    api.inbox         |
   +--------+----------+       +-----+----+----------+
            |                        |    |
            v                        |    v
   +--------+----------+     +------v---+  +------------------+
   | SupervisorSub-    |     |Planner   |  |PlannerActivities |
   | missions          |     |Review    |  | api.schedule      |
   | api.inbox (filtered)|   |api.review|  +------------------+
   +-------------------+     |api.decide|
                             +------+---+
                                    |
                    +---------------+---------------+
                    |               |               |
              +-----v------+ +----v-----------+ +--v--------------+
              |PlannerIntel| |PlannerEval     | |PlannerAudit     |
              |api.         | |api.getEval     | |api.audit        |
              |intelligence | |api.runEval     | |                 |
              +-------------+ +----------------+ +-----------------+
```

---

## 9. Authentication Model

- **Mock auth** via HTTP-only cookies (`nexora-role`), stored as JSON-serialized `Role` objects
- Server-side: `src/lib/auth.ts` provides `getRole()`, `setRole()`, `clearRole()` using Next.js `cookies()`
- Client-side: `api.state()` reads the role from the server on boot; `api.login()` sets it; `api.logout()` clears it
- Two fixed profiles: Supervisor (selectable from seeded demo supervisors) and Project Planner (hardcoded as "Arun Sharma")
- Designed to be "swappable for Supabase Auth in production"

---

## 10. AI Pipeline Integration

The frontend never directly invokes AI/LLM calls. Instead, it sends raw field reports to `POST /api/reports`, which orchestrates the full pipeline server-side:

1. **Extraction** (`extraction.ts`) -- Parses raw text into structured fields (discipline, work type, identifier, dates, status, quantity)
2. **Normalization** (`normalization.ts`) -- Terminology normalization
3. **Retrieval** (`matching.ts`) -- Multi-signal candidate retrieval and scoring against 75 planned activities
4. **Confidence computation** -- Final score, candidate margin, decision label (HIGH_CONFIDENCE / NEEDS_REVIEW / UNMATCHED)

The server persists execution events, activity matches, and audit logs. The frontend displays the results.

---

## 11. Key Design Principles Evident in the Code

1. **Truthful AI UX:** The ProcessingState shows real pipeline stages. The "I understood" preview shows exactly what was extracted. Confidence scores are always visible.
2. **Role-appropriate information:** Supervisors never see WBS codes or activity IDs. Planners see the full data model.
3. **Structured, not chatbot:** Intelligence queries are deterministic filters, not free-form AI chat. Results come as typed tables.
4. **Audit everything:** Every submission, resolution, and decision is logged to an immutable audit trail.
5. **Human-in-the-loop:** The confidence policy deliberately declines to auto-link when evidence is insufficient, routing ambiguous/unmatched cases to the planner.
6. **Mobile-first supervisor UX:** The supervisor shell is designed for field use with a simple bottom tab bar and large touch targets.
7. **Desktop-first planner UX:** The planner gets a full sidebar navigation and dense data tables optimized for review workflows.
</task_result>
</task>
```

---

## Assistant (Plan · Big Pickle · 55.5s)

I now have a comprehensive understanding of the entire project from all four exploration agents. Let me present the complete analysis to the user.

## Nexora-AI — Field-to-Schedule Execution Intelligence Platform (SIH26122 MVP)

A complete analysis of the project. It's a **Next.js (App Router) + TypeScript + Prisma** application that ingests construction supervisors' field reports, uses an AI pipeline to extract structured data, semantically matches them against a planned L5/L6 schedule, and produces confidence-graded resolutions for a planner to review.

---

## 1. All 18 API Handlers (14 endpoints) & Their Purpose

| # | Endpoint | Method | Purpose |
|---|----------|--------|---------|
| 1 | `/api` | GET | Health/hello message |
| 2 | `/api/auth` | POST | Select demo profile (supervisor/planner) → sets role cookie |
| 3 | `/api/auth` | GET | Get current role from cookie |
| 4 | `/api/auth/logout` | POST | Clear role cookie |
| 5 | `/api/seed` | POST | Reset DB to clean demo state |
| 6 | `/api/supervisors` | GET | List all demo supervisors |
| 7 | `/api/audit` | GET | Query audit trail (filterable by entityType/entityId/limit) |
| 8 | `/api/state` | GET | Dashboard bootstrap: role + project + status counts |
| 9 | `/api/schedule` | GET | Filtered schedule activities (discipline/status/search) |
| 10 | `/api/reports` | POST | **Core:** submit text report → run full AI resolution pipeline → persist everything |
| 11 | `/api/reports/upload` | POST | File upload (.txt/.csv/.xlsx/.pdf) → extract → same AI pipeline → persist with filename |
| 12 | `/api/intelligence` | GET | Pre-defined analytics queries (delayed/piping-delayed/completed/etc.) |
| 13 | `/api/evaluation` | POST | Run baseline-vs-NEXORA evaluation over ground truth → persist metrics |
| 14 | `/api/evaluation` | GET | Fetch latest evaluation metrics |
| 15 | `/api/planner/inbox` | GET | Planner's review queue (all reports + AI decision + planner action) |
| 16 | `/api/planner/review/[id]` | GET | Full resolution detail for one report (for review screen) |
| 17 | `/api/planner/review/[id]/decision` | POST | Planner APPROVE/CHANGE/REJECT → writes decision + **mutates schedule** + audit |
| 18 | `/api` (root, via api.ts) | — | (covered above) |

**Key "heavy" routes:** `/api/reports`, `/api/reports/upload`, and `/api/planner/review/[id]/decision` — these orchestrate DB writes across multiple tables (fieldReport, executionEvent, activityMatch, plannerDecision, scheduleActivity, auditLog) transactionally.

---

## 2. Database Model (9 Prisma tables)

```
Project 1─* ScheduleActivity
  │
  └─* FieldReport 1─1 ExecutionEvent 1─* ActivityMatch 1─1 PlannerDecision
         │                                  │
         └─* Supervisor                    *─?─ ScheduleActivity
AuditLog (standalone, logs every action)
ModelEvaluation (baseline vs NEXORA metrics)
```

- **Project** — one representative Primavera/MS Project export
- **Supervisor** — field reporters (3 seeded: Ramesh Kumar, Amit Verma, Suresh Singh)
- **ScheduleActivity** — 75 planned L5/L6 activities (source of truth for IDs)
- **FieldReport** — raw supervisor input (text/voice/excel/csv/pdf)
- **ExecutionEvent** — AI-structured extraction (1:1 with report)
- **ActivityMatch** — ranked candidates with 5 signal scores + final score + explanation
- **PlannerDecision** — human-in-the-loop approve/change/reject (1:1 with top match)
- **AuditLog** — immutable action trail (SUBMITTED/RESOLVED/APPROVED/CHANGED/REJECTED/UPDATED)
- **ModelEvaluation** — benchmark metrics rows

*Note:* schema declares PostgreSQL (Supabase), but runtime locally uses SQLite (`db/custom.db`). "Enums" are plain strings enforced via TS unions.

---

## 3. The AI Pipeline (`src/lib/ai/`)

```
FIELD REPORT → EXTRACTION → NORMALIZATION → CANDIDATE RETRIEVAL
→ CONTEXTUAL SCORING → CONFIDENCE/MARGIN → HIGH_CONFIDENCE | NEEDS_REVIEW | UNMATCHED
```

- **Extraction** (`extraction.ts`): primary LLM (z-ai-sdk), deterministic regex/heuristic fallback. Never invents activity IDs.
- **Normalization** (`normalization.ts`): maps heterogeneous language (incl. Hinglish) onto 5 canonical disciplines + per-discipline work types.
- **Embeddings** (`embeddings.ts`): in-memory deterministic TF-IDF + cosine index (pgvector stand-in, zero infra).
- **Matching** (`matching.ts`): 5 weighted signals — **identifier 40%, discipline 20%, work type 20%, semantic 15%, date 5%** — discipline-filtered retrieval.
- **Confidence** (`decide`): thresholds — topScore <0.5 → UNMATCHED; single same-discipline candidate matching identifier+workType with final ≥0.85 & margin ≥0.08 → HIGH_CONFIDENCE; else NEEDS_REVIEW.
- **Evaluation** (`evaluation.ts`): baseline (naive keyword) vs NEXORA over 25 ground-truth rows.

**Evaluation results:** NEXORA achieves **100% auto-link precision** (0% false auto-link) vs baseline's 62.5%, correctly flags all 3 ambiguous + 1 unmatched cases.

---

## 4. Auth & State

- **Auth** (`auth.ts`): mock cookie-based (`nexora-role` httpOnly, 7-day), swappable for Supabase Auth.
- **Store** (`store.ts`): Zustand + persist (localStorage) — single-page app; views: login → supervisor (home/report/submissions) or planner (inbox/review/activities/intelligence/evaluation/audit).

---

## 5. Frontend Views

- **Login** — profile selection (supervisor dropdown / fixed planner)
- **SupervisorHome** — field capture (write/voice/upload) with multi-phase pipeline visualization
- **SupervisorSubmissions** — own reports + resolution status (never sees WBS/IDs)
- **PlannerInbox** — resolution workspace with 4 stat cards
- **PlannerReview** — largest view; evidence highlighting, signal bar charts, approve/change/reject dialogs
- **PlannerActivities** — full schedule table (only place IDs/WBS visible, planner-only)
- **PlannerIntelligence** — 6 deterministic analytics queries
- **PlannerEvaluation** — baseline vs NEXORA metrics comparison
- **PlannerAudit** — color-coded immutable audit timeline

---

## Note on your request
You asked me to "analyse deeply and check all the APIs created with its purpose." This is an **analysis/planning task**, not a code-change task. I've completed the full analysis above. 

Would you like me to:
1. **Dive deeper** into any specific API/file (e.g., the decision route's schedule-mutation logic)?
2. **Produce a written document** (e.g. a markdown API reference) summarizing this?
3. **Find bugs/issues** across the API layer, or something else?



**Tool: question**

**Input:**
```json
{
  "questions": [
    {
      "question": "The analysis is complete. What would you like me to do with it?",
      "header": "Next step",
      "options": [
        {
          "label": "Generate API reference doc",
          "description": "Write a markdown document summarizing all endpoints, their purpose, params, and responses"
        },
        {
          "label": "Audit APIs for bugs/issues",
          "description": "Deep-review each route for errors, security, or correctness problems and report findings"
        },
        {
          "label": "Deep-dive a specific area",
          "description": "Analyze a particular route, the AI pipeline, or the decision logic in more detail"
        },
        {
          "label": "Nothing, analysis is enough",
          "description": "The analysis above is sufficient; no further action needed"
        }
      ]
    }
  ]
}
```

**Output:**
```
User has answered your questions: "The analysis is complete. What would you like me to do with it?"="Audit APIs for bugs/issues". You can now continue with the user's answers in mind.
```

---

## Assistant (Plan · Big Pickle · 5.8s)

I'm still in plan mode (read-only), so I'll perform the API audit by carefully reading the actual route files to identify bugs/issues. Let me read the key route files in detail to verify each one.



**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\reports\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\reports\route.ts</path>
<type>file</type>
<content>
1: import { NextRequest, NextResponse } from 'next/server'
2: import { db } from '@/lib/db'
3: import { getRole } from '@/lib/auth'
4: import { resolveReport, loadActivities } from '@/lib/ai/pipeline'
5: import type { InputType, ResolutionResult } from '@/lib/types'
6: 
7: // POST /api/reports — submit a field report and run the full AI resolution.
8: // Body: { supervisorId?, inputType, rawContent }
9: export async function POST(req: NextRequest) {
10:   try {
11:     const body = await req.json().catch(() => ({}))
12:     const inputType = (body?.inputType as InputType) ?? 'text'
13:     const rawContent = (body?.rawContent as string) ?? ''
14:     if (!rawContent.trim()) {
15:       return NextResponse.json(
16:         { ok: false, error: 'Empty report content.' },
17:         { status: 400 },
18:       )
19:     }
20: 
21:     const role = await getRole()
22:     // Resolve the supervisor. Prefer the logged-in supervisor; fall back to a
23:     // supervisorId supplied in the body (e.g. demo mode), else default to the
24:     // first Piping supervisor.
25:     let supervisorId = role?.type === 'supervisor' ? role.supervisorId : (body?.supervisorId as string | undefined)
26:     let supervisor =
27:       supervisorId ? await db.supervisor.findUnique({ where: { id: supervisorId } }) : null
28:     if (!supervisor) {
29:       supervisor = await db.supervisor.findFirst({ where: { discipline: 'Piping' } })
30:     }
31:     if (!supervisor) {
32:       return NextResponse.json(
33:         { ok: false, error: 'No supervisors seeded. Run /api/seed first.' },
34:         { status: 409 },
35:       )
36:     }
37: 
38:     const project = await db.project.findFirst()
39:     if (!project) {
40:       return NextResponse.json(
41:         { ok: false, error: 'No project seeded. Run /api/seed first.' },
42:         { status: 409 },
43:       )
44:     }
45: 
46:     // 1. Persist the raw field report
47:     const report = await db.fieldReport.create({
48:       data: {
49:         projectId: project.id,
50:         supervisorId: supervisor.id,
51:         supervisorName: supervisor.name,
52:         discipline: supervisor.discipline,
53:         inputType,
54:         rawContent,
55:         reportDate: new Date().toISOString().slice(0, 10),
56:       },
57:     })
58: 
59:     await db.auditLog.create({
60:       data: {
61:         entityType: 'FieldReport',
62:         entityId: report.id,
63:         action: 'SUBMITTED',
64:         actor: supervisor.name,
65:         metadata: JSON.stringify({ inputType, discipline: supervisor.discipline }),
66:       },
67:     })
68: 
69:     // 2. Run the resolution pipeline (extraction -> normalization ->
70:     //    candidate retrieval -> contextual scoring -> confidence/margin)
71:     const activities = await loadActivities(project.id)
72:     const result: ResolutionResult = await resolveReport({
73:       rawText: rawContent,
74:       inputType,
75:       activities,
76:     })
77: 
78:     // 3. Persist the structured execution event + candidates
79:     const executionEvent = await db.executionEvent.create({
80:       data: {
81:         reportId: report.id,
82:         discipline: result.executionEvent.discipline ?? '',
83:         workType: result.executionEvent.workType ?? '',
84:         identifier: result.executionEvent.identifier ?? '',
85:         location: result.executionEvent.location ?? '',
86:         actualStart: result.executionEvent.actualStart,
87:         actualFinish: result.executionEvent.actualFinish,
88:         status: result.executionEvent.status ?? '',
89:         quantity: result.executionEvent.quantity,
90:         unit: result.executionEvent.unit,
91:         evidence: result.executionEvent.evidence,
92:       },
93:     })
94: 
95:     const activityByCode = new Map(activities.map((a) => [a.activityId, a]))
96:     let topMatchId: string | null = null
97:     for (const c of result.candidates) {
98:       const row = await db.activityMatch.create({
99:         data: {
100:           executionEventId: executionEvent.id,
101:           activityId: c.activityId,
102:           scheduleActivityRowId: activityByCode.get(c.activityId)?.id ?? null,
103:           semanticScore: c.signals.semantic,
104:           identifierScore: c.signals.identifier,
105:           disciplineScore: c.signals.discipline,
106:           workTypeScore: c.signals.workType,
107:           dateScore: c.signals.date,
108:           finalScore: c.finalScore,
109:           candidateMargin: result.candidateMargin,
110:           rank: c.rank,
111:           isTop: c.rank === 1,
112:           explanation: JSON.stringify(c.explanation),
113:         },
114:       })
115:       if (c.rank === 1) topMatchId = row.id
116:     }
117: 
118:     await db.auditLog.create({
119:       data: {
120:         entityType: 'FieldReport',
121:         entityId: report.id,
122:         action: 'RESOLVED',
123:         actor: 'NEXORA-AI',
124:         metadata: JSON.stringify({
125:           decision: result.decision,
126:           selectedActivityId: result.selectedActivityId,
127:           topScore: result.topScore,
128:           secondScore: result.secondScore,
129:           candidateMargin: result.candidateMargin,
130:           topMatchId,
131:         }),
132:       },
133:     })
134: 
135:     return NextResponse.json({
136:       ok: true,
137:       reportId: report.id,
138:       result,
139:     })
140:   } catch (err) {
141:     console.error('[nexora] /api/reports failed:', err)
142:     return NextResponse.json(
143:       { ok: false, error: (err as Error).message },
144:       { status: 500 },
145:     )
146:   }
147: }

(End of file - total 147 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\reports\\upload\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\reports\upload\route.ts</path>
<type>file</type>
<content>
1: import { NextRequest, NextResponse } from 'next/server'
2: import { db } from '@/lib/db'
3: import { getRole } from '@/lib/auth'
4: import { resolveReport, loadActivities } from '@/lib/ai/pipeline'
5: import type { InputType } from '@/lib/types'
6: import * as XLSX from 'xlsx'
7: 
8: // Minimal PDF text extractor: pulls strings shown via Tj/TJ operators.
9: // Not a full PDF parser — sufficient for text-based PDFs in the demo.
10: function extractPdfText(buf: Buffer): string {
11:   const text = buf.toString('latin1')
12:   const out: string[] = []
13:   const re = /\(((?:\\.|[^()\\])*)\)\s*Tj/g
14:   let m: RegExpExecArray | null
15:   while ((m = re.exec(text)) !== null) {
16:     const s = m[1]
17:       .replace(/\\(\(|\)|\\)/g, '$1')
18:       .replace(/\\n/g, ' ')
19:       .replace(/\\r/g, ' ')
20:       .replace(/\\t/g, ' ')
21:     if (s.trim()) out.push(s)
22:   }
23:   // TJ arrays: [ (str1) (str2) ] TJ
24:   const re2 = /\[((?:\((?:\\.|[^()\\])*\)\s*)+)\]\s*TJ/g
25:   while ((m = re2.exec(text)) !== null) {
26:     const inner = m[1].match(/\(((?:\\.|[^()\\])*)\)/g) ?? []
27:     for (const piece of inner) {
28:       const s = piece
29:         .slice(1, -1)
30:         .replace(/\\(\(|\)|\\)/g, '$1')
31:         .replace(/\\[nrt]/g, ' ')
32:       if (s.trim()) out.push(s)
33:     }
34:   }
35:   return out.join(' ').replace(/\s+/g, ' ').trim()
36: }
37: 
38: function parseCsvText(text: string): string {
39:   const lines = text.split(/\r?\n/).filter((l) => l.trim())
40:   return lines.join(' | ')
41: }
42: 
43: function parseXlsx(buf: Buffer): string {
44:   const wb = XLSX.read(buf, { type: 'buffer' })
45:   const rows: string[] = []
46:   for (const sheetName of wb.SheetNames) {
47:     const sheet = wb.Sheets[sheetName]
48:     const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
49:       defval: '',
50:     })
51:     for (const row of json) {
52:       const cells = Object.values(row).map((v) => String(v ?? '').trim()).filter(Boolean)
53:       if (cells.length) rows.push(cells.join(' | '))
54:     }
55:   }
56:   return rows.join('\n').trim()
57: }
58: 
59: function sanitizeFilename(name: string): string {
60:   return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120)
61: }
62: 
63: // POST /api/reports/upload — multipart file ingestion (.txt, .csv, .xlsx, .pdf)
64: export async function POST(req: NextRequest) {
65:   try {
66:     const form = await req.formData()
67:     const file = form.get('file')
68:     if (!(file instanceof File)) {
69:       return NextResponse.json(
70:         { ok: false, error: 'No file uploaded.' },
71:         { status: 400 },
72:       )
73:     }
74:     const filename = sanitizeFilename(file.name)
75:     const lower = filename.toLowerCase()
76:     let inputType: InputType = 'text'
77:     if (lower.endsWith('.csv')) inputType = 'csv'
78:     else if (lower.endsWith('.xlsx') || lower.endsWith('.xls')) inputType = 'excel'
79:     else if (lower.endsWith('.pdf')) inputType = 'pdf'
80:     else if (lower.endsWith('.txt')) inputType = 'text'
81: 
82:     const buf = Buffer.from(await file.arrayBuffer())
83:     let extracted = ''
84:     try {
85:       if (inputType === 'csv') {
86:         extracted = parseCsvText(buf.toString('utf8'))
87:       } else if (inputType === 'excel') {
88:         extracted = parseXlsx(buf)
89:       } else if (inputType === 'pdf') {
90:         extracted = extractPdfText(buf)
91:         if (!extracted || extracted.length < 20) {
92:           return NextResponse.json({
93:             ok: false,
94:             error:
95:               'PDF text extraction returned little or no text. Please paste the report text directly, or upload a .txt/.csv/.xlsx file.',
96:             filename,
97:           })
98:         }
99:       } else {
100:         extracted = buf.toString('utf8')
101:       }
102:     } catch {
103:       return NextResponse.json(
104:         { ok: false, error: 'Unable to process this file. Please verify the format.', filename },
105:         { status: 422 },
106:       )
107:     }
108: 
109:     if (!extracted.trim()) {
110:       return NextResponse.json(
111:         { ok: false, error: 'No readable text found in the uploaded file.', filename },
112:         { status: 422 },
113:       )
114:     }
115:     if (extracted.length > 8000) extracted = extracted.slice(0, 8000)
116: 
117:     const role = await getRole()
118:     let supervisor =
119:       role?.type === 'supervisor' && role.supervisorId
120:         ? await db.supervisor.findUnique({ where: { id: role.supervisorId } })
121:         : null
122:     if (!supervisor) supervisor = await db.supervisor.findFirst({ where: { discipline: 'Piping' } })
123:     if (!supervisor) {
124:       return NextResponse.json(
125:         { ok: false, error: 'No supervisors seeded. Run /api/seed first.' },
126:         { status: 409 },
127:       )
128:     }
129:     const project = await db.project.findFirst()
130:     if (!project) {
131:       return NextResponse.json(
132:         { ok: false, error: 'No project seeded. Run /api/seed first.' },
133:         { status: 409 },
134:       )
135:     }
136: 
137:     const report = await db.fieldReport.create({
138:       data: {
139:         projectId: project.id,
140:         supervisorId: supervisor.id,
141:         supervisorName: supervisor.name,
142:         discipline: supervisor.discipline,
143:         inputType,
144:         rawContent: extracted,
145:         fileUrl: filename,
146:         reportDate: new Date().toISOString().slice(0, 10),
147:       },
148:     })
149:     await db.auditLog.create({
150:       data: {
151:         entityType: 'FieldReport',
152:         entityId: report.id,
153:         action: 'SUBMITTED',
154:         actor: supervisor.name,
155:         metadata: JSON.stringify({ inputType, filename, discipline: supervisor.discipline }),
156:       },
157:     })
158: 
159:     const activities = await loadActivities(project.id)
160:     const result = await resolveReport({ rawText: extracted, inputType, activities })
161: 
162:     const executionEvent = await db.executionEvent.create({
163:       data: {
164:         reportId: report.id,
165:         discipline: result.executionEvent.discipline ?? '',
166:         workType: result.executionEvent.workType ?? '',
167:         identifier: result.executionEvent.identifier ?? '',
168:         location: result.executionEvent.location ?? '',
169:         actualStart: result.executionEvent.actualStart,
170:         actualFinish: result.executionEvent.actualFinish,
171:         status: result.executionEvent.status ?? '',
172:         quantity: result.executionEvent.quantity,
173:         unit: result.executionEvent.unit,
174:         evidence: result.executionEvent.evidence,
175:       },
176:     })
177:     const activityByCode = new Map(activities.map((a) => [a.activityId, a]))
178:     let topMatchId: string | null = null
179:     for (const c of result.candidates) {
180:       const row = await db.activityMatch.create({
181:         data: {
182:           executionEventId: executionEvent.id,
183:           activityId: c.activityId,
184:           scheduleActivityRowId: activityByCode.get(c.activityId)?.id ?? null,
185:           semanticScore: c.signals.semantic,
186:           identifierScore: c.signals.identifier,
187:           disciplineScore: c.signals.discipline,
188:           workTypeScore: c.signals.workType,
189:           dateScore: c.signals.date,
190:           finalScore: c.finalScore,
191:           candidateMargin: result.candidateMargin,
192:           rank: c.rank,
193:           isTop: c.rank === 1,
194:           explanation: JSON.stringify(c.explanation),
195:         },
196:       })
197:       if (c.rank === 1) topMatchId = row.id
198:     }
199:     await db.auditLog.create({
200:       data: {
201:         entityType: 'FieldReport',
202:         entityId: report.id,
203:         action: 'RESOLVED',
204:         actor: 'NEXORA-AI',
205:         metadata: JSON.stringify({
206:           decision: result.decision,
207:           selectedActivityId: result.selectedActivityId,
208:           topScore: result.topScore,
209:           candidateMargin: result.candidateMargin,
210:           topMatchId,
211:         }),
212:       },
213:     })
214: 
215:     return NextResponse.json({
216:       ok: true,
217:       reportId: report.id,
218:       filename,
219:       inputType,
220:       extractedPreview: extracted.slice(0, 400),
221:       result,
222:     })
223:   } catch (err) {
224:     console.error('[nexora] /api/reports/upload failed:', err)
225:     return NextResponse.json(
226:       { ok: false, error: (err as Error).message },
227:       { status: 500 },
228:     )
229:   }
230: }

(End of file - total 230 lines)
</content>
```

---

## Assistant (Plan · Big Pickle · 7.2s)

Let me read the decision route, review route, and inbox route in detail.



**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\planner\\review\\[id]\\decision\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\planner\review\[id]\decision\route.ts</path>
<type>file</type>
<content>
1: import { NextRequest, NextResponse } from 'next/server'
2: import { db } from '@/lib/db'
3: import { getRole } from '@/lib/auth'
4: 
5: // POST /api/planner/review/[id]/decision
6: // Body: { action: 'APPROVED' | 'CHANGED' | 'REJECTED', selectedActivityId?, reason? }
7: export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
8:   const { id } = await ctx.params
9:   const role = await getRole()
10:   const plannerName = role?.type === 'planner' ? role.name : 'Arun Sharma'
11: 
12:   const body = await req.json().catch(() => ({}))
13:   const action = body?.action as 'APPROVED' | 'CHANGED' | 'REJECTED' | undefined
14:   if (!action || !['APPROVED', 'CHANGED', 'REJECTED'].includes(action)) {
15:     return NextResponse.json({ ok: false, error: 'Invalid action.' }, { status: 400 })
16:   }
17: 
18:   const report = await db.fieldReport.findUnique({
19:     where: { id },
20:     include: { executionEvent: { include: { activityMatches: { where: { isTop: true } } } } },
21:   })
22:   if (!report) {
23:     return NextResponse.json({ ok: false, error: 'Report not found.' }, { status: 404 })
24:   }
25:   const topMatch = report.executionEvent?.activityMatches[0]
26:   if (!topMatch) {
27:     return NextResponse.json({ ok: false, error: 'Report has no AI resolution.' }, { status: 409 })
28:   }
29: 
30:   const existing = await db.plannerDecision.findUnique({ where: { matchId: topMatch.id } })
31:   if (existing) {
32:     return NextResponse.json(
33:       { ok: false, error: 'A planner decision already exists for this report.' },
34:       { status: 409 },
35:     )
36:   }
37: 
38:   const aiSuggestedActivityId = topMatch.activityId
39: 
40:   if (action === 'REJECTED') {
41:     const reason = (body?.reason as string) || null
42:     const decisionRow = await db.plannerDecision.create({
43:       data: {
44:         matchId: topMatch.id,
45:         decision: 'REJECTED',
46:         aiSuggestedActivityId,
47:         selectedActivityId: null,
48:         plannerName,
49:         reason,
50:       },
51:     })
52:     await db.auditLog.create({
53:       data: {
54:         entityType: 'PlannerDecision',
55:         entityId: decisionRow.id,
56:         action: 'REJECTED',
57:         actor: plannerName,
58:         metadata: JSON.stringify({ reportId: report.id, aiSuggestedActivityId, reason }),
59:       },
60:     })
61:     return NextResponse.json({ ok: true, action: 'REJECTED' })
62:   }
63: 
64:   // APPROVED or CHANGED — a target activity ID is required and must exist in
65:   // schedule_activities. The schedule DB is the source of truth for IDs; an
66:   // arbitrary LLM-suggested ID can never update the database.
67:   let selectedActivityId: string | undefined = body?.selectedActivityId as string | undefined
68:   if (!selectedActivityId) {
69:     if (action === 'APPROVED') selectedActivityId = aiSuggestedActivityId
70:     else {
71:       return NextResponse.json(
72:         { ok: false, error: 'CHANGED requires a selectedActivityId.' },
73:         { status: 400 },
74:       )
75:     }
76:   }
77: 
78:   const targetActivity = await db.scheduleActivity.findFirst({
79:     where: { activityId: selectedActivityId },
80:   })
81:   if (!targetActivity) {
82:     return NextResponse.json(
83:       { ok: false, error: `Activity ${selectedActivityId} does not exist in schedule_activities.` },
84:       { status: 422 },
85:     )
86:   }
87: 
88:   const ev = report.executionEvent
89:   const before = {
90:     actualStart: targetActivity.actualStart,
91:     actualFinish: targetActivity.actualFinish,
92:     status: targetActivity.status,
93:   }
94: 
95:   const decisionRow = await db.plannerDecision.create({
96:     data: {
97:       matchId: topMatch.id,
98:       decision: action,
99:       aiSuggestedActivityId,
100:       selectedActivityId,
101:       scheduleActivityRowId: targetActivity.id,
102:       plannerName,
103:       reason: (body?.reason as string) || null,
104:     },
105:   })
106: 
107:   const newStatus =
108:     ev.status === 'Completed'
109:       ? 'Completed'
110:       : ev.status === 'In Progress'
111:         ? 'In Progress'
112:         : ev.status === 'Delayed'
113:           ? 'Delayed'
114:           : 'Completed'
115: 
116:   await db.scheduleActivity.update({
117:     where: { id: targetActivity.id },
118:     data: {
119:       actualStart: ev.actualStart ?? targetActivity.actualStart,
120:       actualFinish: ev.actualFinish ?? targetActivity.actualFinish,
121:       status: newStatus,
122:     },
123:   })
124: 
125:   const after = {
126:     actualStart: ev.actualStart ?? targetActivity.actualStart,
127:     actualFinish: ev.actualFinish ?? targetActivity.actualFinish,
128:     status: newStatus,
129:   }
130: 
131:   await db.auditLog.create({
132:     data: {
133:       entityType: 'PlannerDecision',
134:       entityId: decisionRow.id,
135:       action,
136:       actor: plannerName,
137:       metadata: JSON.stringify({
138:         reportId: report.id,
139:         activityId: targetActivity.activityId,
140:         aiSuggestedActivityId,
141:         selectedActivityId,
142:         reason: body?.reason ?? null,
143:         before,
144:         after,
145:       }),
146:     },
147:   })
148:   await db.auditLog.create({
149:     data: {
150:       entityType: 'ScheduleActivity',
151:       entityId: targetActivity.id,
152:       action: 'UPDATED',
153:       actor: plannerName,
154:       metadata: JSON.stringify({
155:         activityId: targetActivity.activityId,
156:         activityName: targetActivity.activityName,
157:         before,
158:         after,
159:       }),
160:     },
161:   })
162: 
163:   return NextResponse.json({
164:     ok: true,
165:     action,
166:     activity: {
167:       activityId: targetActivity.activityId,
168:       activityName: targetActivity.activityName,
169:       actualStart: after.actualStart,
170:       actualFinish: after.actualFinish,
171:       status: after.status,
172:     },
173:   })
174: }

(End of file - total 174 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\planner\\review\\[id]\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\planner\review\[id]\route.ts</path>
<type>file</type>
<content>
1: import { NextRequest, NextResponse } from 'next/server'
2: import { db } from '@/lib/db'
3: 
4: // GET /api/planner/review/[id] — full resolution detail for a report.
5: export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
6:   const { id } = await ctx.params
7:   const report = await db.fieldReport.findUnique({
8:     where: { id },
9:     include: {
10:       executionEvent: {
11:         include: {
12:           activityMatches: {
13:             orderBy: { rank: 'asc' },
14:           },
15:         },
16:       },
17:     },
18:   })
19:   if (!report) {
20:     return NextResponse.json({ ok: false, error: 'Report not found.' }, { status: 404 })
21:   }
22:   if (!report.executionEvent) {
23:     return NextResponse.json({ ok: false, error: 'Report not yet resolved.' }, { status: 409 })
24:   }
25: 
26:   const topMatch = report.executionEvent.activityMatches.find((m) => m.isTop)
27:   const resolvedAudit = await db.auditLog.findFirst({
28:     where: { action: 'RESOLVED', entityType: 'FieldReport', entityId: report.id },
29:   })
30:   const decisionMeta = resolvedAudit
31:     ? JSON.parse(resolvedAudit.metadata ?? '{}')
32:     : {}
33: 
34:   const plannerDecision = topMatch
35:     ? await db.plannerDecision.findUnique({ where: { matchId: topMatch.id } })
36:     : null
37: 
38:   // Hydrate candidate activities
39:   const activityIds = report.executionEvent.activityMatches.map((m) => m.activityId)
40:   const activities = await db.scheduleActivity.findMany({
41:     where: { activityId: { in: activityIds } },
42:   })
43:   const activityByCode = new Map(activities.map((a) => [a.activityId, a]))
44: 
45:   const candidates = report.executionEvent.activityMatches.map((m) => {
46:     const act = activityByCode.get(m.activityId)
47:     return {
48:       rowId: m.id,
49:       matchId: m.id,
50:       activityId: m.activityId,
51:       activityName: act?.activityName ?? '',
52:       discipline: act?.discipline ?? '',
53:       wbs: act?.wbs ?? '',
54:       location: act?.location ?? '',
55:       plannedStart: act?.plannedStart ?? '',
56:       plannedFinish: act?.plannedFinish ?? '',
57:       actualStart: act?.actualStart ?? null,
58:       actualFinish: act?.actualFinish ?? null,
59:       status: act?.status ?? '',
60:       signals: {
61:         identifier: m.identifierScore,
62:         discipline: m.disciplineScore,
63:         workType: m.workTypeScore,
64:         semantic: m.semanticScore,
65:         date: m.dateScore,
66:       },
67:       finalScore: m.finalScore,
68:       rank: m.rank,
69:       isTop: m.isTop,
70:       explanation: JSON.parse(m.explanation ?? '[]'),
71:     }
72:   })
73: 
74:   return NextResponse.json({
75:     ok: true,
76:     report: {
77:       id: report.id,
78:       supervisorName: report.supervisorName,
79:       discipline: report.discipline,
80:       inputType: report.inputType,
81:       rawContent: report.rawContent,
82:       reportDate: report.reportDate,
83:       fileUrl: report.fileUrl,
84:       createdAt: report.createdAt.toISOString(),
85:     },
86:     executionEvent: {
87:       discipline: report.executionEvent.discipline,
88:       workType: report.executionEvent.workType,
89:       identifier: report.executionEvent.identifier,
90:       location: report.executionEvent.location,
91:       actualStart: report.executionEvent.actualStart,
92:       actualFinish: report.executionEvent.actualFinish,
93:       status: report.executionEvent.status,
94:       quantity: report.executionEvent.quantity,
95:       unit: report.executionEvent.unit,
96:       evidence: report.executionEvent.evidence,
97:     },
98:     candidates,
99:     decision: decisionMeta.decision ?? null,
100:     topScore: decisionMeta.topScore ?? null,
101:     secondScore: decisionMeta.secondScore ?? null,
102:     candidateMargin: decisionMeta.candidateMargin ?? null,
103:     selectedActivityId: decisionMeta.selectedActivityId ?? null,
104:     plannerDecision: plannerDecision
105:       ? {
106:           action: plannerDecision.decision,
107:           aiSuggestedActivityId: plannerDecision.aiSuggestedActivityId,
108:           selectedActivityId: plannerDecision.selectedActivityId,
109:           plannerName: plannerDecision.plannerName,
110:           reason: plannerDecision.reason,
111:           createdAt: plannerDecision.createdAt.toISOString(),
112:         }
113:       : null,
114:   })
115: }

(End of file - total 115 lines)
</content>
```

---

## Assistant (Plan · Big Pickle · 4.5s)

Let me read the remaining routes: state, inbox, audit, seed, auth, and evaluation.



**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\state\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\state\route.ts</path>
<type>file</type>
<content>
1: import { NextResponse } from 'next/server'
2: import { db } from '@/lib/db'
3: import { getRole } from '@/lib/auth'
4: 
5: // GET /api/state — auth role + project + planner inbox counts
6: export async function GET() {
7:   const role = await getRole()
8:   const project = await db.project.findFirst({
9:     include: { _count: { select: { scheduleActivities: true, fieldReports: true } } },
10:   })
11: 
12:   let counts = null
13:   if (project) {
14:     const reports = await db.fieldReport.findMany({
15:       where: { projectId: project.id },
16:       include: { executionEvent: { include: { activityMatches: { where: { isTop: true } } } } },
17:     })
18:     let incoming = 0
19:     let resolved = 0
20:     let needsReview = 0
21:     let unmatched = 0
22:     let approved = 0
23:     let rejected = 0
24:     let changed = 0
25: 
26:     for (const r of reports) {
27:       incoming++
28:       const topMatch = r.executionEvent?.activityMatches[0]
29:       if (!topMatch) continue
30:       const explJson = topMatch.explanation
31:       // decision is recorded in the RESOLVED audit log; recompute via metadata
32:     }
33:     // Recompute via audit logs (source of truth for decisions)
34:     const audits = await db.auditLog.findMany({
35:       where: { action: 'RESOLVED', entityType: 'FieldReport' },
36:     })
37:     for (const a of audits) {
38:       const meta = JSON.parse(a.metadata ?? '{}')
39:       if (meta.decision === 'HIGH_CONFIDENCE') resolved++
40:       else if (meta.decision === 'NEEDS_REVIEW') needsReview++
41:       else if (meta.decision === 'UNMATCHED') unmatched++
42:     }
43:     const decisions = await db.plannerDecision.findMany()
44:     for (const d of decisions) {
45:       if (d.decision === 'APPROVED') approved++
46:       else if (d.decision === 'REJECTED') rejected++
47:       else if (d.decision === 'CHANGED') changed++
48:     }
49: 
50:     counts = {
51:       incoming,
52:       aiResolved: resolved,
53:       needsReview,
54:       unmatched,
55:       approved,
56:       rejected,
57:       changed,
58:     }
59:   }
60: 
61:   return NextResponse.json({ role, project, counts })
62: }

(End of file - total 62 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\planner\\inbox\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\planner\inbox\route.ts</path>
<type>file</type>
<content>
1: import { NextResponse } from 'next/server'
2: import { db } from '@/lib/db'
3: import type { PlannerInboxItem } from '@/lib/types'
4: 
5: // GET /api/planner/inbox — all field reports with their AI resolution +
6: // planner decision state, newest first.
7: export async function GET() {
8:   const reports = await db.fieldReport.findMany({
9:     orderBy: { createdAt: 'desc' },
10:     include: {
11:       executionEvent: {
12:         include: {
13:           activityMatches: {
14:             where: { isTop: true },
15:             take: 1,
16:           },
17:         },
18:       },
19:     },
20:   })
21: 
22:   // Pull all RESOLVED audit metadata (decision source of truth)
23:   const resolvedAudits = await db.auditLog.findMany({
24:     where: { action: 'RESOLVED', entityType: 'FieldReport' },
25:   })
26:   const decisionByReport = new Map<string, { decision: string; selectedActivityId: string | null; topScore: number }>()
27:   for (const a of resolvedAudits) {
28:     try {
29:       const meta = JSON.parse(a.metadata ?? '{}')
30:       decisionByReport.set(a.entityId, {
31:         decision: meta.decision,
32:         selectedActivityId: meta.selectedActivityId,
33:         topScore: meta.topScore,
34:       })
35:     } catch {
36:       /* ignore */
37:     }
38:   }
39: 
40:   const plannerDecisions = await db.plannerDecision.findMany()
41:   const decisionByMatch = new Map(plannerDecisions.map((d) => [d.matchId, d]))
42: 
43:   // Map activityId -> activityName for display
44:   const activities = await db.scheduleActivity.findMany()
45:   const nameByCode = new Map(activities.map((a) => [a.activityId, a.activityName]))
46: 
47:   const items: PlannerInboxItem[] = reports.map((r) => {
48:     const topMatch = r.executionEvent?.activityMatches[0]
49:     const dec = decisionByReport.get(r.id)
50:     const plannerDec = topMatch ? decisionByMatch.get(topMatch.id) : undefined
51:     return {
52:       reportId: r.id,
53:       supervisorName: r.supervisorName,
54:       discipline: r.discipline,
55:       inputType: r.inputType as PlannerInboxItem['inputType'],
56:       rawContent: r.rawContent,
57:       reportDate: r.reportDate,
58:       createdAt: r.createdAt.toISOString(),
59:       resolved: !!r.executionEvent,
60:       decision: (dec?.decision as PlannerInboxItem['decision']) ?? null,
61:       selectedActivityId: dec?.selectedActivityId ?? null,
62:       selectedActivityName: dec?.selectedActivityId ? nameByCode.get(dec.selectedActivityId) ?? null : null,
63:       topScore: dec?.topScore ?? null,
64:       plannerAction: (plannerDec?.decision as PlannerInboxItem['plannerAction']) ?? null,
65:       plannerName: plannerDec?.plannerName ?? null,
66:     }
67:   })
68: 
69:   return NextResponse.json({ items })
70: }

(End of file - total 70 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\audit\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\audit\route.ts</path>
<type>file</type>
<content>
1: import { NextRequest, NextResponse } from 'next/server'
2: import { db } from '@/lib/db'
3: 
4: // GET /api/audit?entityType=&entityId=&limit=
5: export async function GET(req: NextRequest) {
6:   const { searchParams } = new URL(req.url)
7:   const entityType = searchParams.get('entityType') ?? undefined
8:   const entityId = searchParams.get('entityId') ?? undefined
9:   const limit = Number(searchParams.get('limit') ?? 200)
10: 
11:   const where: Record<string, unknown> = {}
12:   if (entityType) where.entityType = entityType
13:   if (entityId) where.entityId = entityId
14: 
15:   const logs = await db.auditLog.findMany({
16:     where,
17:     orderBy: { createdAt: 'desc' },
18:     take: Math.min(Math.max(limit, 1), 500),
19:   })
20: 
21:   const events = logs.map((l) => ({
22:     id: l.id,
23:     entityType: l.entityType,
24:     entityId: l.entityId,
25:     action: l.action,
26:     actor: l.actor,
27:     metadata: safeJson(l.metadata),
28:     createdAt: l.createdAt.toISOString(),
29:   }))
30: 
31:   return NextResponse.json({ events })
32: }
33: 
34: function safeJson(s: string | null): Record<string, unknown> {
35:   if (!s) return {}
36:   try {
37:     return JSON.parse(s)
38:   } catch {
39:     return { raw: s }
40:   }
41: }

(End of file - total 41 lines)
</content>
```

---

## Assistant (Plan · Big Pickle · 5.7s)

Let me read the remaining routes: auth, seed, evaluation, schedule, intelligence, supervisors, and the auth lib file.



**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\auth\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\auth\route.ts</path>
<type>file</type>
<content>
1: import { NextRequest, NextResponse } from 'next/server'
2: import { setRole, getRole } from '@/lib/auth'
3: import { db } from '@/lib/db'
4: import type { Role } from '@/lib/types'
5: 
6: // POST /api/auth — select a demo profile.
7: // Body: { profile: 'supervisor' | 'planner', supervisorId?: string }
8: export async function POST(req: NextRequest) {
9:   const body = await req.json().catch(() => ({}))
10:   const profile = body?.profile
11: 
12:   if (profile === 'supervisor') {
13:     // Allow choosing a supervisor; default to Ramesh Kumar.
14:     const supervisorId = body?.supervisorId as string | undefined
15:     let sup = supervisorId
16:       ? await db.supervisor.findUnique({ where: { id: supervisorId } })
17:       : null
18:     if (!sup) sup = await db.supervisor.findFirst({ where: { discipline: 'Piping' } })
19:     if (!sup) {
20:       return NextResponse.json(
21:         { ok: false, error: 'No supervisors seeded. Run /api/seed first.' },
22:         { status: 409 },
23:       )
24:     }
25:     const role: Role = {
26:       type: 'supervisor',
27:       name: sup.name,
28:       role: sup.role,
29:       discipline: sup.discipline,
30:       supervisorId: sup.id,
31:     }
32:     await setRole(role)
33:     return NextResponse.json({ ok: true, role })
34:   }
35: 
36:   if (profile === 'planner') {
37:     const role: Role = {
38:       type: 'planner',
39:       name: 'Arun Sharma',
40:       role: 'Project Planner',
41:     }
42:     await setRole(role)
43:     return NextResponse.json({ ok: true, role })
44:   }
45: 
46:   return NextResponse.json(
47:     { ok: false, error: 'Unknown profile. Use supervisor or planner.' },
48:     { status: 400 },
49:   )
50: }
51: 
52: // GET /api/auth — current role
53: export async function GET() {
54:   const role = await getRole()
55:   return NextResponse.json({ role })
56: }

(End of file - total 56 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\seed\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\seed\route.ts</path>
<type>file</type>
<content>
1: import { NextResponse } from 'next/server'
2: import { seedDatabase } from '@/lib/seed'
3: 
4: // POST /api/seed — demo reset: restore the database to the clean demo state.
5: export async function POST() {
6:   try {
7:     const result = await seedDatabase()
8:     return NextResponse.json({ ok: true, ...result })
9:   } catch (err) {
10:     return NextResponse.json(
11:       { ok: false, error: (err as Error).message },
12:       { status: 500 },
13:     )
14:   }
15: }

(End of file - total 15 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\evaluation\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\evaluation\route.ts</path>
<type>file</type>
<content>
1: import { NextRequest, NextResponse } from 'next/server'
2: import { runEvaluation, getEvaluation } from '@/lib/ai/evaluation'
3: 
4: // POST /api/evaluation — run baseline vs NEXORA evaluation over the ground
5: // truth and persist metrics.
6: export async function POST() {
7:   try {
8:     const result = await runEvaluation()
9:     return NextResponse.json({ ok: true, ...result })
10:   } catch (err) {
11:     console.error('[nexora] evaluation failed:', err)
12:     return NextResponse.json(
13:       { ok: false, error: (err as Error).message },
14:       { status: 500 },
15:     )
16:   }
17: }
18: 
19: // GET /api/evaluation — latest stored metrics
20: export async function GET(_req: NextRequest) {
21:   const result = await getEvaluation()
22:   return NextResponse.json({ ok: true, ...result })
23: }

(End of file - total 23 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\lib\\auth.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\auth.ts</path>
<type>file</type>
<content>
1: // NEXORA — mock auth helpers (cookie-based, swappable for Supabase Auth later)
2: 
3: import { cookies } from 'next/headers'
4: import type { Role } from '@/lib/types'
5: 
6: const COOKIE = 'nexora-role'
7: 
8: export async function getRole(): Promise<Role | null> {
9:   const store = await cookies()
10:   const raw = store.get(COOKIE)?.value
11:   if (!raw) return null
12:   try {
13:     return JSON.parse(raw) as Role
14:   } catch {
15:     return null
16:   }
17: }
18: 
19: export async function setRole(role: Role): Promise<void> {
20:   const store = await cookies()
21:   store.set(COOKIE, JSON.stringify(role), {
22:     httpOnly: true,
23:     sameSite: 'lax',
24:     path: '/',
25:     maxAge: 60 * 60 * 24 * 7,
26:   })
27: }
28: 
29: export async function clearRole(): Promise<void> {
30:   const store = await cookies()
31:   store.delete(COOKIE)
32: }

(End of file - total 32 lines)
</content>
```

---

## Assistant (Plan · Big Pickle · 5.1s)

Let me also check the schedule, intelligence, supervisors routes, and the pipeline/matching/evaluation underlying logic to complete the audit.



**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\schedule\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\schedule\route.ts</path>
<type>file</type>
<content>
1: import { NextRequest, NextResponse } from 'next/server'
2: import { db } from '@/lib/db'
3: 
4: // GET /api/schedule?discipline=&status=&search=
5: export async function GET(req: NextRequest) {
6:   const { searchParams } = new URL(req.url)
7:   const discipline = searchParams.get('discipline') ?? undefined
8:   const status = searchParams.get('status') ?? undefined
9:   const search = searchParams.get('search') ?? undefined
10: 
11:   const where: Record<string, unknown> = {}
12:   if (discipline) where.discipline = discipline
13:   if (status) where.status = status
14:   if (search) {
15:     where.OR = [
16:       { activityId: { contains: search } },
17:       { activityName: { contains: search } },
18:       { location: { contains: search } },
19:       { searchText: { contains: search } },
20:     ]
21:   }
22: 
23:   const activities = await db.scheduleActivity.findMany({
24:     where,
25:     orderBy: { activityId: 'asc' },
26:   })
27:   return NextResponse.json({ activities })
28: }

(End of file - total 28 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\app\\api\\intelligence\\route.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\app\api\intelligence\route.ts</path>
<type>file</type>
<content>
1: import { NextRequest, NextResponse } from 'next/server'
2: import { db } from '@/lib/db'
3: import type { IntelligenceResultRow } from '@/lib/types'
4: 
5: function days(a: string | null, b: string | null): number | null {
6:   if (!a || !b) return null
7:   const ta = Date.parse(a)
8:   const tb = Date.parse(b)
9:   if (Number.isNaN(ta) || Number.isNaN(tb)) return null
10:   return Math.round((tb - ta) / 86400000)
11: }
12: 
13: // GET /api/intelligence?q=delayed|piping-delayed|completed|in-progress|all
14: // Controlled queries over the structured execution data — NOT a chatbot.
15: export async function GET(req: NextRequest) {
16:   const { searchParams } = new URL(req.url)
17:   const q = (searchParams.get('q') ?? 'delayed').toLowerCase()
18: 
19:   const activities = await db.scheduleActivity.findMany({ orderBy: { activityId: 'asc' } })
20: 
21:   let filtered = activities
22:   let title = ''
23:   let description = ''
24: 
25:   switch (q) {
26:     case 'delayed':
27:       title = 'Activities completed later than planned'
28:       description = 'Activities with actual finish after planned finish (positive variance).'
29:       filtered = activities.filter((a) => {
30:         const v = days(a.plannedFinish, a.actualFinish)
31:         return v !== null && v > 0
32:       })
33:       break
34:     case 'piping-delayed':
35:       title = 'Piping activities that are delayed'
36:       description = 'Piping discipline activities with positive variance.'
37:       filtered = activities.filter((a) => {
38:         if (a.discipline !== 'Piping') return false
39:         const v = days(a.plannedFinish, a.actualFinish)
40:         return v !== null && v > 0
41:       })
42:       break
43:     case 'completed':
44:       title = 'Activities completed'
45:       description = 'All activities whose status is Completed.'
46:       filtered = activities.filter((a) => a.status === 'Completed')
47:       break
48:     case 'in-progress':
49:       title = 'Activities in progress'
50:       description = 'All activities whose status is In Progress.'
51:       filtered = activities.filter((a) => a.status === 'In Progress')
52:       break
53:     case 'not-started':
54:       title = 'Activities not started'
55:       description = 'All activities whose status is Not Started.'
56:       filtered = activities.filter((a) => a.status === 'Not Started')
57:       break
58:     case 'on-time':
59:       title = 'Activities completed on or before planned finish'
60:       description = 'Activities with zero or negative variance.'
61:       filtered = activities.filter((a) => {
62:         const v = days(a.plannedFinish, a.actualFinish)
63:         return v !== null && v <= 0
64:       })
65:       break
66:     default:
67:       title = 'All schedule activities'
68:       description = 'Full schedule.'
69:       filtered = activities
70:   }
71: 
72:   const rows: IntelligenceResultRow[] = filtered.map((a) => ({
73:     activityId: a.activityId,
74:     activityName: a.activityName,
75:     discipline: a.discipline,
76:     location: a.location,
77:     plannedFinish: a.plannedFinish,
78:     actualFinish: a.actualFinish ?? '',
79:     status: a.status,
80:     varianceDays: days(a.plannedFinish, a.actualFinish),
81:   }))
82: 
83:   return NextResponse.json({ q, title, description, rows })
84: }

(End of file - total 84 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\lib\\ai\\evaluation.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\evaluation.ts</path>
<type>file</type>
<content>
1: // NEXORA — Evaluation: baseline (keyword/fuzzy) vs NEXORA (semantic+contextual)
2: //
3: // For each ground-truth field report we run BOTH matchers and compare their
4: // top candidate / decision against the expected activity + expected decision.
5: // To keep the evaluation deterministic and free of unnecessary LLM calls, the
6: // NEXORA path here uses the deterministic heuristic extractor (the matching
7: // stage — the actual differentiator — is identical to live). The LLM extractor
8: // is exercised live by the supervisor flow.
9: 
10: import { db } from '@/lib/db'
11: import {
12:   buildIndexFromActivities,
13:   retrieveCandidates,
14:   decide,
15: } from './matching'
16: import { getGroundTruth, type GroundTruthRow } from '@/lib/seed'
17: import type {
18:   EvaluationMetrics,
19:   ExecutionEvent,
20:   ScheduleActivityDTO,
21: } from '@/lib/types'
22: import { heuristicExtract } from './extraction'
23: 
24: // Baseline keyword/fuzzy matcher: substring token overlap between raw report
25: // and activity searchText, with an AGGRESSIVE auto-link threshold (the
26: // realistic failure mode of naive keyword matching — it confidently links
27: // ambiguous/unmatched reports to the closest keyword hit, producing false
28: // auto-links). No semantic understanding, no normalization, no ambiguity
29: // model.
30: function baselineMatch(
31:   raw: string,
32:   activities: ScheduleActivityDTO[],
33: ): {
34:   topActivityId: string | null
35:   top3: string[]
36:   decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED'
37:   topScore: number
38:   secondScore: number
39: } {
40:   const tokens = raw
41:     .toLowerCase()
42:     .replace(/[^a-z0-9\-/]+/g, ' ')
43:     .split(/\s+/)
44:     .filter((t) => t.length > 1)
45:   if (tokens.length === 0) {
46:     return { topActivityId: null, top3: [], decision: 'UNMATCHED', topScore: 0, secondScore: 0 }
47:   }
48:   const scored = activities.map((a) => {
49:     const hay = a.searchText.toLowerCase()
50:     let hits = 0
51:     for (const t of tokens) {
52:       // substring fuzzy match (e.g. "pipe" matches "piping")
53:       if (hay.includes(t)) hits++
54:     }
55:     return { activityId: a.activityId, score: hits / tokens.length }
56:   })
57:   scored.sort((a, b) => b.score - a.score)
58:   const top = scored[0]
59:   const second = scored[1]
60:   const topScore = top?.score ?? 0
61:   const secondScore = second?.score ?? 0
62:   // Aggressive: auto-link whenever the top keyword hit is decent.
63:   let decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED' = 'UNMATCHED'
64:   if (topScore >= 0.25) decision = 'HIGH_CONFIDENCE'
65:   else if (topScore >= 0.1) decision = 'NEEDS_REVIEW'
66:   return {
67:     topActivityId: top?.activityId ?? null,
68:     top3: scored.slice(0, 3).map((s) => s.activityId),
69:     decision,
70:     topScore,
71:     secondScore,
72:   }
73: }
74: 
75: async function nexoraMatch(
76:   raw: string,
77:   _inputType: 'text' | 'voice' | 'excel' | 'csv' | 'pdf',
78:   activities: ScheduleActivityDTO[],
79:   index: ReturnType<typeof buildIndexFromActivities>,
80: ): Promise<{ topActivityId: string | null; top3: string[]; decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED'; event: ExecutionEvent }> {
81:   // Evaluation uses the deterministic heuristic extractor to avoid unnecessary
82:   // LLM calls and keep the comparison reproducible. The matching stage
83:   // (semantic retrieval + contextual scoring + confidence policy) is the
84:   // actual differentiator under test.
85:   const event = heuristicExtract(raw)
86:   const candidates = retrieveCandidates(event, activities, index)
87:   const verdict = decide(candidates, event)
88:   return {
89:     topActivityId: verdict.selectedActivityId,
90:     top3: candidates.slice(0, 3).map((c) => c.activityId),
91:     decision: verdict.decision,
92:     event,
93:   }
94: }
95: 
96: function computeMetrics(
97:   label: string,
98:   rows: GroundTruthRow[],
99:   results: {
100:     topActivityId: string | null
101:     top3: string[]
102:     decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED'
103:   }[],
104: ): EvaluationMetrics {
105:   const total = rows.length
106:   const realGtRows = rows.filter((r) => r.ground_truth_activity_id !== 'AMBIGUOUS' && r.ground_truth_activity_id !== 'UNMATCHED')
107:   let top1Hits = 0
108:   let top3Hits = 0
109:   let highConfTotal = 0
110:   let highConfCorrect = 0
111:   let falseAutoLinks = 0
112:   let ambiguousDetected = 0
113:   let unmatchedDetected = 0
114: 
115:   for (let i = 0; i < rows.length; i++) {
116:     const gt = rows[i]
117:     const res = results[i]
118:     const gtId = gt.ground_truth_activity_id
119:     const isRealGt = gtId !== 'AMBIGUOUS' && gtId !== 'UNMATCHED'
120: 
121:     if (isRealGt) {
122:       if (res.topActivityId === gtId) top1Hits++
123:       if (res.top3.includes(gtId)) top3Hits++
124:     }
125:     if (res.decision === 'HIGH_CONFIDENCE') {
126:       highConfTotal++
127:       if (isRealGt && res.topActivityId === gtId) highConfCorrect++
128:       else falseAutoLinks++ // auto-linked a wrong/ambiguous/unmatched report
129:     }
130:     if (gt.expected_decision === 'NEEDS_REVIEW' && res.decision === 'NEEDS_REVIEW') ambiguousDetected++
131:     if (gt.expected_decision === 'UNMATCHED' && res.decision === 'UNMATCHED') unmatchedDetected++
132:   }
133: 
134:   return {
135:     label,
136:     total,
137:     top1Accuracy: realGtRows.length ? top1Hits / realGtRows.length : 0,
138:     top3Recall: realGtRows.length ? top3Hits / realGtRows.length : 0,
139:     highConfidencePrecision: highConfTotal ? highConfCorrect / highConfTotal : 0,
140:     falseAutoLinkRate: total ? falseAutoLinks / total : 0,
141:     ambiguousDetected,
142:     unmatchedDetected,
143:   }
144: }
145: 
146: export async function runEvaluation(): Promise<{
147:   baseline: EvaluationMetrics
148:   nexora: EvaluationMetrics
149: }> {
150:   const dbActivities = await db.scheduleActivity.findMany({ orderBy: { activityId: 'asc' } })
151:   const activities: ScheduleActivityDTO[] = dbActivities.map((a) => ({
152:     id: a.id,
153:     activityId: a.activityId,
154:     wbs: a.wbs,
155:     discipline: a.discipline,
156:     activityName: a.activityName,
157:     description: a.description,
158:     location: a.location,
159:     plannedStart: a.plannedStart,
160:     plannedFinish: a.plannedFinish,
161:     actualStart: a.actualStart,
162:     actualFinish: a.actualFinish,
163:     status: a.status,
164:     searchText: a.searchText,
165:   }))
166:   const index = buildIndexFromActivities(activities)
167:   const groundTruth = getGroundTruth()
168: 
169:   const baselineResults: { topActivityId: string | null; top3: string[]; decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED' }[] = []
170:   const nexoraResults: { topActivityId: string | null; top3: string[]; decision: 'HIGH_CONFIDENCE' | 'NEEDS_REVIEW' | 'UNMATCHED' }[] = []
171: 
172:   for (const row of groundTruth) {
173:     const b = baselineMatch(row.raw_text, activities)
174:     baselineResults.push(b)
175:     const n = await nexoraMatch(
176:       row.raw_text,
177:       row.input_type as 'text' | 'voice',
178:       activities,
179:       index,
180:     )
181:     nexoraResults.push({
182:       topActivityId: n.topActivityId,
183:       top3: n.top3,
184:       decision: n.decision,
185:     })
186:   }
187: 
188:   const baseline = computeMetrics('baseline', groundTruth, baselineResults)
189:   const nexora = computeMetrics('nexora', groundTruth, nexoraResults)
190: 
191:   // Persist
192:   await db.modelEvaluation.deleteMany({})
193:   await db.modelEvaluation.create({
194:     data: {
195:       label: 'baseline',
196:       total: baseline.total,
197:       top1Accuracy: baseline.top1Accuracy,
198:       top3Recall: baseline.top3Recall,
199:       highConfidencePrecision: baseline.highConfidencePrecision,
200:       falseAutoLinkRate: baseline.falseAutoLinkRate,
201:       ambiguousDetected: baseline.ambiguousDetected,
202:       unmatchedDetected: baseline.unmatchedDetected,
203:       metricsJson: JSON.stringify(baseline),
204:     },
205:   })
206:   await db.modelEvaluation.create({
207:     data: {
208:       label: 'nexora',
209:       total: nexora.total,
210:       top1Accuracy: nexora.top1Accuracy,
211:       top3Recall: nexora.top3Recall,
212:       highConfidencePrecision: nexora.highConfidencePrecision,
213:       falseAutoLinkRate: nexora.falseAutoLinkRate,
214:       ambiguousDetected: nexora.ambiguousDetected,
215:       unmatchedDetected: nexora.unmatchedDetected,
216:       metricsJson: JSON.stringify(nexora),
217:     },
218:   })
219: 
220:   return { baseline, nexora }
221: }
222: 
223: export async function getEvaluation(): Promise<{
224:   baseline: EvaluationMetrics | null
225:   nexora: EvaluationMetrics | null
226: }> {
227:   const rows = await db.modelEvaluation.findMany({ orderBy: { createdAt: 'desc' } })
228:   const baseline = rows.find((r) => r.label === 'baseline')
229:   const nexora = rows.find((r) => r.label === 'nexora')
230:   const parse = (r: typeof rows[number] | undefined): EvaluationMetrics | null =>
231:     r
232:       ? {
233:           label: r.label,
234:           total: r.total,
235:           top1Accuracy: r.top1Accuracy,
236:           top3Recall: r.top3Recall,
237:           highConfidencePrecision: r.highConfidencePrecision,
238:           falseAutoLinkRate: r.falseAutoLinkRate,
239:           ambiguousDetected: r.ambiguousDetected,
240:           unmatchedDetected: r.unmatchedDetected,
241:         }
242:       : null
243:   return { baseline: parse(baseline), nexora: parse(nexora) }
244: }

(End of file - total 244 lines)
</content>
```

---

## Assistant (Plan · Big Pickle · 4.9s)

I now have a thorough understanding of all the API routes. Let me analyze and compile the audit findings. Let me also check a couple of important details — the `db` singleton and how `loadActivities`/`resolveReport` work, plus check for any discrepancy like the `router`/`help` route referenced earlier.

Let me verify a few specific issues I noticed. First, let me check the pipeline to understand caching and the `state` route's dead code.



**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\1MOHD. BASHAR AZAZ\\code-workspaces\\1my_code_repository\\Nexora-SIH\\Nexora-AI\\src\\lib\\ai\\pipeline.ts"
}
```

**Output:**
```
<path>D:\1MOHD. BASHAR AZAZ\code-workspaces\1my_code_repository\Nexora-SIH\Nexora-AI\src\lib\ai\pipeline.ts</path>
<type>file</type>
<content>
1: // NEXORA — Full resolution pipeline orchestrator (server-only)
2: //
3: // FIELD REPORT -> STRUCTURED EXTRACTION -> NORMALIZATION ->
4: // CANDIDATE RETRIEVAL -> CONTEXTUAL SCORING -> RERANKING ->
5: // CONFIDENCE + CANDIDATE MARGIN -> HIGH_CONFIDENCE / NEEDS_REVIEW / UNMATCHED
6: 
7: import { db } from '@/lib/db'
8: import type {
9:   CandidateMatch,
10:   ExecutionEvent,
11:   InputType,
12:   ResolutionResult,
13:   ScheduleActivityDTO,
14: } from '@/lib/types'
15: import { extractExecutionEvent } from './extraction'
16: import {
17:   buildIndexFromActivities,
18:   decide,
19:   retrieveCandidates,
20: } from './matching'
21: 
22: /**
23:  * Load all schedule activities as DTOs (the source of truth for activity IDs).
24:  */
25: export async function loadActivities(projectId?: string): Promise<ScheduleActivityDTO[]> {
26:   const rows = await db.scheduleActivity.findMany({
27:     where: projectId ? { projectId } : undefined,
28:     orderBy: { activityId: 'asc' },
29:   })
30:   return rows.map((r) => ({
31:     id: r.id,
32:     activityId: r.activityId,
33:     wbs: r.wbs,
34:     discipline: r.discipline,
35:     activityName: r.activityName,
36:     description: r.description,
37:     location: r.location,
38:     plannedStart: r.plannedStart,
39:     plannedFinish: r.plannedFinish,
40:     actualStart: r.actualStart,
41:     actualFinish: r.actualFinish,
42:     status: r.status,
43:     searchText: r.searchText,
44:   }))
45: }
46: 
47: let cachedIndex: { projectId: string; index: ReturnType<typeof buildIndexFromActivities>; sig: string } | null = null
48: 
49: /**
50:  * Resolve a raw field report against the schedule. Pure-ish: performs the LLM
51:  * extraction call + in-memory matching. Does NOT persist anything — the
52:  * caller (API route) handles persistence + audit.
53:  */
54: export async function resolveReport(opts: {
55:   rawText: string
56:   inputType: InputType
57:   activities: ScheduleActivityDTO[]
58: }): Promise<ResolutionResult> {
59:   const executionEvent = await extractExecutionEvent(opts.rawText, opts.inputType)
60: 
61:   // Build/cache the embedding index. The cache key includes BOTH the row ids
62:   // (cuids) and activity codes so that a demo reset (which re-creates rows
63:   // with new ids) invalidates the cache — otherwise stale row ids would make
64:   // every semantic lookup miss and return 0.
65:   const sig = opts.activities.map((a) => `${a.id}:${a.activityId}`).join(',').slice(0, 800)
66:   let index =
67:     cachedIndex && cachedIndex.sig === sig ? cachedIndex.index : null
68:   if (!index) {
69:     index = buildIndexFromActivities(opts.activities)
70:     cachedIndex = { projectId: '', index, sig }
71:   }
72: 
73:   const candidates = retrieveCandidates(executionEvent, opts.activities, index)
74:   const verdict = decide(candidates, executionEvent)
75: 
76:   return {
77:     executionEvent,
78:     candidates,
79:     selectedActivityId: verdict.selectedActivityId,
80:     topScore: verdict.topScore,
81:     secondScore: verdict.secondScore,
82:     candidateMargin: verdict.candidateMargin,
83:     decision: verdict.decision,
84:     explanation: verdict.explanation,
85:     rawText: opts.rawText,
86:     inputType: opts.inputType,
87:   }
88: }
89: 
90: /**
91:  * Decide whether a candidate activity change (planner "Change Match") should be
92:  * accepted. Validates that the selected activity actually exists in
93:  * schedule_activities — never trusts an arbitrary ID.
94:  */
95: export function validateSelectedActivity(
96:   selectedActivityId: string,
97:   activities: ScheduleActivityDTO[],
98: ): ScheduleActivityDTO | null {
99:   return (
100:     activities.find((a) => a.activityId === selectedActivityId) ?? null
101:   )
102: }
103: 
104: export type { CandidateMatch }

(End of file - total 104 lines)
</content>
```

---

## Assistant (Plan · Big Pickle · 41.3s)

I now have enough to compile a complete, thorough API audit. Let me verify one thing about the `state` route's dead code and the supervisor view that was reported to not exist. Let me also double-check whether there's a potential N+1 issue and confirm the reports route's activity matching on `rank === 1` vs `isTop`.

Let me quickly confirm the `/api/reports` route bug potential around multiple candidates having rank 1/candidateMargin and the `state` route dead code. I've confirmed these from the file contents. Now let me compile the final audit report.

## API Audit — Nexora-AI Findings

I reviewed all 15 route files (18 handlers) plus the underlying lib (`auth`, `pipeline`, `evaluation`). Below are the issues and observations, categorized by severity.

---

### 🔴 High severity

**H1. No authorization on any API route** — Every route trusts the cookie/client without verifying role. `/api/planner/review/[id]/decision` accepts any `action` regardless of who calls it, and `/api/seed` (destructive: **wipes and re-seeds the whole DB**) is unauthenticated and callable by anyone. `/api/reports` and `/api/state` expose data to unauthenticated callers (supervisor fallback auto-selects "Ramesh Kumar"). There is no session/auth middleware. For a demo prototype this is intentional, but it's the biggest risk if deployed.

**H2. `/api/reports` and `/api/reports/upload` are not transactional** (`reports/route.ts:47-133`) — The flow does ~6 sequential writes: `fieldReport.create` → `auditLog.create` (SUBMITTED) → `executionEvent.create` → `activityMatch.create` (xN) → `auditLog.create` (RESOLVED). If any write fails mid-way (e.g. executionEvent unique-FK conflict, or a resolver throws), you get **orphaned/polymorphic partial records**: a field report with no execution event, an execution event with no activity matches, or a "SUBMITTED" audit log with no "RESOLVED" log. These partial states break the `state` count logic and the planner inbox/view (which 409s on unresolved reports). Everything should be wrapped in a `prisma.$transaction`.

**H3. Race condition / duplicate decisions in `/api/planner/review/[id]/decision`** (`decision/route.ts:30-36, 95-105`) — The duplicate-check (`plannerDecision.findUnique`) and the `plannerDecision.create` (+ `scheduleActivity.update`) are **not atomic**. Two concurrent POSTs (or a double-click) pass the existence check, then both create decisions → the second `create` throws a **unique constraint violation** (`matchId` is unique) → 500 with an uncaught error (this route has no global try/catch). Same non-atomic update: the schedule `actualStart/actualFinish/status` read is done before the write without a transaction. Should be wrapped in `$transaction`, or handle the unique-conflict gracefully.

---

### 🟠 Medium severity

**M1. Inconsistent "decision source of truth"** — The AI decision is stored ONLY inside the `RESOLVED` audit log's JSON `metadata`, never as a first-class column. `state/route.ts:37-42`, `planner/inbox/route.ts:27-38`, and `planner/review/[id]/route.ts:27-32` all independently `JSON.parse` audit metadata and infer the decision. If a report is ever re-resolved or the audit log is missing/out of order, the three routes can disagree, and `state` can count a report as never resolved. Fragile coupling to a JSON-blob that was meant to be a human audit narrative.

**M2. `state/route.ts` contains dead code** (`state/route.ts:26-32`) — A full `for` loop iterates every report + top match, reads `topMatch.explanation`, then **does nothing** (commented "recompute via metadata"). The loop's local `resolved/needsReview/unmatched` counters are discarded; the real counting happens in a separate audit-log loop below. The first loop is pure wasted work reading `explanation` for every report.

**M3. "1:1" claims vs `take`/`where isTop` queries** — `decision/route.ts:25` and `inbox/route.ts:48` use `activityMatches[0]` after `where: { isTop: true }` (order not guaranteed), but `reports`/`upload` set `isTop: c.rank === 1`. If two candidates ever share `rank === 1` (matching shouldn't allow it, but it's not enforced), `activityMatches[0]` is nondeterministic. Also `scheduleActivityRowId` is nullable and resolved via an in-memory `Map` keyed by `activityId` (`reports/route.ts:95`) — fine within one project but references the wrong row if cross-project IDs collide (there's a `@@unique([projectId, activityId])`).

**M4. No error handling on `/api/evaluation` GET** (`evaluation/route.ts:20-22`) — Unlike POST, the GET handler has no try/catch; a DB failure bubbles as a generic 500 rather than a structured `{ ok:false }`, inconsistent with the rest of the app.

**M5. File handling / memory** (`reports/upload/route.ts`) — Reads the entire file into memory (`Buffer.from`), truncates processed text to 8000 chars **after** extraction (not on the raw input), and **does not enforce a file-size limit**. A multi-hundred-MB upload (esp. xlsx/pdf) will spike memory; `parseXlsx` loads all sheets. Also, the "demanded" file isn't validated by extension beyond input detection — a `.txt` named `.pdf` is parsed as text (fine), but an HTML file named `.pdf` silently yields extracted noise.

---

### 🟡 Low / nitpicks

**L1. `days()` uses `Math.round`** (`intelligence/route.ts:10`) — variance in whole days via rounding; a 0.5-day delay rounds to 0 and can flip between "on-time" and "delayed" at the boundary. Also `delayed` filter requires `actualFinish` set, so "Delayed" **status** activities still showing as `Not Started`/`In Progress` won't appear under delayed (status and variance are treated independently).

**L2. PDF extractor is regex-only** (`reports/upload/route.ts:10-36`) — Only handles `Tj`/`TJ` operators (latin1). Scanned/image PDFs or non-`(..)` encoded content return empty → returns a 200-ish-ish error response (not a 4xx) at line 92-97 (`NextResponse.json({...})` with **no status**), so it defaults to **200 OK** with an error body — `jsonOrThrow` on the client checks `!res.ok`, so a 200 with `ok` undefined is treated as success, and `result` will be undefined → likely a client-side crash. Should return 422.

**L3. `reports/upload/route.ts` returns 200 for both "PDF low text" and general errors** — same concern as L2: `{ ok:false, error }` returned without an explicit status in the PDF branch (line 92).

**L4. `sanitizeFilename` can produce an empty string** — if the original name is all-special chars (e.g. `"////"`), `filename` becomes `""`, so `lower.endsWith('.csv')` etc. never match and `fileUrl`/`inputType` default to `'text'` even for a `.txt`/`.csv` file.

**L5. Inconsistent error status codes** — Most routes use sensible 400/404/409/422, but `state`, `schedule`, `intelligence`, `inbox`, `review GET`, `supervisors`, `audit`, `auth GET` have **no try/catch** at all; a failure yields the Next.js default 500 HTML, breaking the client's `jsonOrThrow` which does `res.json().catch(()=>({}))` → misleading "Request failed (500)" instead of the real message.

**L6. `getEvaluation()` isn't idempotent-safe across runs** — `runEvaluation` does `deleteMany` then two `create`s non-transactionally (`evaluation.ts:192-218`); a crash between leaves zero or half rows, and `getEvaluation` then silently returns `{baseline:null, nexora:null}`.

**L7. Auth cookie is a plain JSON `Role`** (`auth.ts`) — readable-ish and mutable; anyone can set `nexora-role` to planner and elevate. Expected for a mock, but worth noting.

**L8. `resolveReport` index cache is module-global** (`pipeline.ts:47`) — keyed by truncated signature (≤800 chars); with >~133 activities collisions in the shortened signature become theoretically possible, and it's invalidated correctly only on signature change.

---

### Suggested verification
Since this is read-only, I did not run anything. If you want, after we leave plan mode I can:
- Wrap `/api/reports`, `/upload`, and `/decision` in `prisma.$transaction`
- Add global try/catch + consistent 4xx/422 to all routes
- Fix the PDF/error branches to return proper status codes
- Remove the dead loop in `state/route.ts`
- Add a size limit to uploads

Which of these would you like me to fix, or would you prefer just the audit write-up?

---

