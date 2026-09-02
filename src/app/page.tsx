'use client'

import { useEffect, useState } from 'react'
import { useApp, SUPERVISOR_VIEWS, PLANNER_VIEWS, type View } from '@/lib/store'
import { Login } from '@/components/views/Login'
import { Footer } from '@/components/shared/Footer'
import { Brand } from '@/components/shared/Brand'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import {
  Home, Mic, FileText, ListChecks, Inbox, CalendarRange, BrainCircuit,
  Gauge, ScrollText, Loader2, LogOut, RotateCcw, HardHat, ClipboardList,
} from 'lucide-react'

import { SupervisorHome } from '@/components/views/supervisor/SupervisorHome'
import { SupervisorSubmissions } from '@/components/views/supervisor/SupervisorSubmissions'
import { PlannerInbox } from '@/components/views/planner/PlannerInbox'
import { PlannerReview } from '@/components/views/planner/PlannerReview'
import { PlannerActivities } from '@/components/views/planner/PlannerActivities'
import { PlannerIntelligence } from '@/components/views/planner/PlannerIntelligence'
import { PlannerEvaluation } from '@/components/views/planner/PlannerEvaluation'
import { PlannerAudit } from '@/components/views/planner/PlannerAudit'

const SUPERVISOR_NAV: { view: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { view: 'supervisor-home', label: 'Report', icon: Home },
  { view: 'supervisor-submissions', label: 'My Submissions', icon: ListChecks },
]

const PLANNER_NAV: { view: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { view: 'planner-inbox', label: 'Resolution Inbox', icon: Inbox },
  { view: 'planner-activities', label: 'Schedule', icon: CalendarRange },
  { view: 'planner-intelligence', label: 'Execution Intelligence', icon: BrainCircuit },
  { view: 'planner-evaluation', label: 'Model Evaluation', icon: Gauge },
  { view: 'planner-audit', label: 'Audit Trail', icon: ScrollText },
]

export default function Page() {
  const role = useApp((s) => s.role)
  const view = useApp((s) => s.view)
  const hydrated = useApp((s) => s.hydrated)
  const selectedReportId = useApp((s) => s.selectedReportId)
  const setRole = useApp((s) => s.setRole)
  const setHydrated = useApp((s) => s.setHydrated)
  const go = useApp((s) => s.go)
  const logout = useApp((s) => s.logout)

  const [bootError, setBootError] = useState<string | null>(null)

  // Hydrate role from the server cookie on first mount.
  useEffect(() => {
    let cancelled = false
    api
      .state()
      .then((s) => {
        if (cancelled) return
        if (s.role) setRole(s.role)
        setHydrated(true)
      })
      .catch((e) => {
        setBootError((e as Error).message)
        setHydrated(true)
      })
    return () => {
      cancelled = true
    }
  }, [setRole, setHydrated])

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-muted">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-sm">Loading NEXORA…</p>
        </div>
      </div>
    )
  }

  if (!role) return <Login />

  // Guard: if a stored view doesn't match the current role, fall back to home.
  const isInRoleViews =
    role.type === 'supervisor'
      ? SUPERVISOR_VIEWS.includes(view)
      : PLANNER_VIEWS.includes(view)
  const effectiveView: View = isInRoleViews ? view : role.type === 'supervisor' ? 'supervisor-home' : 'planner-inbox'

  return (
    <div className="flex min-h-screen flex-col bg-muted text-foreground">
      {role.type === 'supervisor' ? (
        <SupervisorShell
          view={effectiveView}
          onNav={go}
          role={role}
          onLogout={async () => { await api.logout(); logout() }}
        >
          {renderSupervisorView(effectiveView)}
        </SupervisorShell>
      ) : (
        <PlannerShell
          view={effectiveView}
          onNav={go}
          role={role}
          onLogout={async () => { await api.logout(); logout() }}
        >
          {renderPlannerView(effectiveView, selectedReportId)}
        </PlannerShell>
      )}
      <Footer />
    </div>
  )
}

function renderSupervisorView(view: View) {
  switch (view) {
    case 'supervisor-home':
    case 'supervisor-report':
      return <SupervisorHome />
    case 'supervisor-submissions':
      return <SupervisorSubmissions />
    default:
      return <SupervisorHome />
  }
}

function renderPlannerView(view: View, key: string | null) {
  switch (view) {
    case 'planner-inbox':
      return <PlannerInbox />
    case 'planner-review':
      return <PlannerReview key={key ?? 'none'} />
    case 'planner-activities':
      return <PlannerActivities />
    case 'planner-intelligence':
      return <PlannerIntelligence />
    case 'planner-evaluation':
      return <PlannerEvaluation />
    case 'planner-audit':
      return <PlannerAudit />
    default:
      return <PlannerInbox />
  }
}

function SupervisorShell({
  view,
  onNav,
  role,
  onLogout,
  children,
}: {
  view: View
  onNav: (v: View) => void
  role: { name: string; role: string; discipline?: string }
  onLogout: () => void
  children: React.ReactNode
}) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Brand size="sm" />
          <div className="flex items-center gap-2 text-right">
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-medium text-foreground">{role.name}</div>
              <div className="text-[11px] text-muted-foreground">{role.role}</div>
            </div>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-amber-100 text-amber-700">
              <HardHat className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
      {/* Mobile bottom nav */}
      <nav className="sticky bottom-0 z-20 border-t border-border bg-card sm:hidden">
        <div className="flex">
          {SUPERVISOR_NAV.map((n) => {
            const Icon = n.icon
            const active = view === n.view
            return (
              <button
                key={n.view}
                onClick={() => onNav(n.view)}
                className={cn(
                  'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium',
                  active ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                <Icon className="h-5 w-5" />
                {n.label}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}

function PlannerShell({
  view,
  onNav,
  role,
  onLogout,
  children,
}: {
  view: View
  onNav: (v: View) => void
  role: { name: string; role: string }
  onLogout: () => void
  children: React.ReactNode
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-background text-slate-300 md:flex">
        <div className="flex items-center justify-between px-5 py-4">
          <Brand size="sm" className="[&_div]:text-foreground" />
        </div>
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 rounded-md bg-card/60 px-3 py-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-amber-100 text-amber-700">
              <ClipboardList className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-medium text-foreground">{role.name}</div>
              <div className="text-[11px] text-muted-foreground">{role.role}</div>
            </div>
          </div>
        </div>
        <nav className="mt-2 flex-1 space-y-1 px-3">
          {PLANNER_NAV.map((n) => {
            const Icon = n.icon
            const active = view === n.view
            return (
              <button
                key={n.view}
                onClick={() => onNav(n.view)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active ? 'bg-card text-foreground' : 'text-muted-foreground hover:bg-card/50 hover:text-slate-200',
                )}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </button>
            )
          })}
        </nav>
        <div className="border-t border-border p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="w-full justify-start text-muted-foreground hover:bg-card hover:text-slate-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-1 flex-col md:hidden">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background px-4 py-3 text-foreground">
          <Brand size="sm" className="[&_div]:text-foreground" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileNavOpen((v) => !v)}
            className="text-slate-300 hover:bg-card"
          >
            Menu
          </Button>
        </header>
        {mobileNavOpen && (
          <nav className="space-y-1 border-b border-border bg-card p-2">
            {PLANNER_NAV.map((n) => {
              const Icon = n.icon
              const active = view === n.view
              return (
                <button
                  key={n.view}
                  onClick={() => { onNav(n.view); setMobileNavOpen(false) }}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium',
                    active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {n.label}
                </button>
              )
            })}
          </nav>
        )}
        <main className="flex-1 px-4 py-6">{children}</main>
      </div>

      {/* Desktop main */}
      <main className="hidden flex-1 px-6 py-6 md:block">{children}</main>
    </div>
  )
}
