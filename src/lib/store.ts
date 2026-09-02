'use client'

// NEXORA — client view store (single-page app, view switching via Zustand)
//
// The environment exposes only the `/` route, so every spec "route" becomes a
// "view" in this store. The store also holds the mock auth role (persisted to
// localStorage) and the currently-selected report id for the planner review.

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Role } from '@/lib/types'

export type View =
  | 'login'
  | 'supervisor-home'
  | 'supervisor-report'
  | 'supervisor-submissions'
  | 'planner-inbox'
  | 'planner-review'
  | 'planner-activities'
  | 'planner-intelligence'
  | 'planner-evaluation'
  | 'planner-audit'

export const SUPERVISOR_VIEWS: View[] = [
  'supervisor-home',
  'supervisor-report',
  'supervisor-submissions',
]
export const PLANNER_VIEWS: View[] = [
  'planner-inbox',
  'planner-review',
  'planner-activities',
  'planner-intelligence',
  'planner-evaluation',
  'planner-audit',
]

interface AppState {
  role: Role | null
  view: View
  selectedReportId: string | null
  hydrated: boolean
  setRole: (r: Role | null) => void
  go: (v: View) => void
  selectReport: (id: string | null) => void
  setHydrated: (b: boolean) => void
  logout: () => void
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      role: null,
      view: 'login',
      selectedReportId: null,
      hydrated: false,
      setRole: (r) =>
        set({ role: r, view: r ? (r.type === 'supervisor' ? 'supervisor-home' : 'planner-inbox') : 'login' }),
      go: (v) => set({ view: v }),
      selectReport: (id) => set({ selectedReportId: id }),
      setHydrated: (b) => set({ hydrated: b }),
      logout: () => set({ role: null, view: 'login', selectedReportId: null }),
    }),
    {
      name: 'nexora-app',
      partialize: (s) => ({ role: s.role, view: s.view }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    },
  ),
)
