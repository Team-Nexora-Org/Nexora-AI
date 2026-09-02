'use client'

import { useEffect, useState } from 'react'
import { Brand } from '@/components/shared/Brand'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { api } from '@/lib/api'
import { useApp } from '@/lib/store'
import { HardHat, ClipboardList, ArrowRight, Loader2 } from 'lucide-react'

export function Login() {
  const setRole = useApp((s) => s.setRole)
  const [supervisors, setSupervisors] = useState<{ id: string; name: string; role: string; discipline: string }[]>([])
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('')
  const [busy, setBusy] = useState<'supervisor' | 'planner' | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.supervisors().then((r) => {
      setSupervisors(r.supervisors)
      if (r.supervisors[0]) setSelectedSupervisor(r.supervisors[0].id)
    }).catch(() => setError('Run the seed first to load demo supervisors.'))
  }, [])

  async function loginSupervisor() {
    if (!selectedSupervisor) return
    setBusy('supervisor')
    setError(null)
    try {
      const { role } = await api.login('supervisor', selectedSupervisor)
      setRole(role)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  async function loginPlanner() {
    setBusy('planner')
    setError(null)
    try {
      const { role } = await api.login('planner')
      setRole(role)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 flex flex-col items-center text-center">
          <Brand size="lg" sub={false} />
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Field-to-Schedule Execution Intelligence
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
            The project schedule knows what was planned. The field knows what actually happened.
            <span className="font-medium text-slate-700"> NEXORA is the intelligent bridge between them.</span>
          </p>
        </div>

        <div className="grid w-full gap-5 sm:grid-cols-2">
          <Card className="overflow-hidden border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-900 pb-4 text-white">
              <div className="flex items-center gap-2">
                <HardHat className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-base">Supervisor</CardTitle>
              </div>
              <CardDescription className="text-slate-300">
                Just tell us what happened.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Demo profile
                </label>
                <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {supervisors.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} — {s.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={loginSupervisor} disabled={busy !== null || !selectedSupervisor}>
                {busy === 'supervisor' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Continue as Supervisor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-800 pb-4 text-white">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-base">Project Planner</CardTitle>
              </div>
              <CardDescription className="text-slate-300">
                Review decisions, not raw reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Demo profile
                </label>
                <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
                  <div className="font-medium text-slate-800">Arun Sharma</div>
                  <div className="text-xs text-slate-500">Project Planner — Unit-4 Expansion Project</div>
                </div>
              </div>
              <Button variant="secondary" className="w-full bg-slate-800 text-white hover:bg-slate-700" onClick={loginPlanner} disabled={busy !== null}>
                {busy === 'planner' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Continue as Project Planner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {error && (
          <p className="mt-6 text-sm text-rose-600">{error}</p>
        )}

        <p className="mt-10 max-w-2xl text-center text-xs text-slate-400">
          Mock authentication for the SIH prototype — swappable for Supabase Auth in production.
          Schedule source: representative Primavera / MS Project export.
        </p>
      </div>
    </div>
  )
}
