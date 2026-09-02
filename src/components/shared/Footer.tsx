'use client'

import { Brand } from '@/components/shared/Brand'
import { useApp } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { LogOut, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { api } from '@/lib/api'

export function Footer() {
  const role = useApp((s) => s.role)
  const logout = useApp((s) => s.logout)
  const [resetting, setResetting] = useState(false)

  async function resetDemo() {
    if (!confirm('Reset the demo? This restores the database to the clean seeded state (all planner decisions and live submissions will be cleared).')) return
    setResetting(true)
    try {
      await api.resetDemo()
      window.location.reload()
    } catch (e) {
      alert((e as Error).message)
    } finally {
      setResetting(false)
    }
  }

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <Brand size="sm" sub={false} />
          <span className="hidden text-xs text-slate-400 sm:inline">
            · Field-to-Schedule Execution Intelligence · SIH26122 MVP
          </span>
        </div>
        <div className="flex items-center gap-2">
          {role && (
            <span className="text-xs text-slate-500">
              Signed in as <span className="font-medium text-slate-700">{role.name}</span> · {role.role}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetDemo}
            disabled={resetting}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset Demo
          </Button>
          {role && (
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => { await api.logout(); logout() }}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              <LogOut className="mr-1.5 h-3.5 w-3.5" />
              Sign out
            </Button>
          )}
        </div>
      </div>
    </footer>
  )
}
