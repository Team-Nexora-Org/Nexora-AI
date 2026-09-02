'use client'

import { useEffect, useState } from 'react'
import { Brand } from '@/components/shared/Brand'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { api } from '@/lib/api'
import { useApp } from '@/lib/store'
import { HardHat, ClipboardList, ArrowRight, Loader2 } from 'lucide-react'
import { ConstructionLandscape } from '@/components/shared/ConstructionLandscape'

export function Login() {
  const setRole = useApp((s) => s.setRole)
  const [supervisors, setSupervisors] = useState<{ id: string; name: string; role: string; discipline: string }[]>([])
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('')
  const [busy, setBusy] = useState<'supervisor' | 'planner' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [selectedRole, setSelectedRole] = useState<'supervisor' | 'planner' | null>(null)
  const [tempRole, setTempRole] = useState<'supervisor' | 'planner' | ''>('')

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
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <ConstructionLandscape />
      
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-12 pb-32">
        <div className="mb-8 flex flex-col items-center text-center">
          <Brand size="lg" sub={false} />
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Field-to-Schedule Execution Intelligence
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            The project schedule knows what was planned. The field knows what actually happened.
            <span className="font-medium text-foreground"> NEXORA is the intelligent bridge between them.</span>
          </p>
        </div>

        <div className="flex w-full justify-center">
          {selectedRole === null && (
            <div className="w-full max-w-md">
              <Card className="overflow-hidden border-border shadow-sm">
                <CardHeader className="bg-background pb-4 text-foreground">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-amber-400" />
                    <CardTitle className="text-base">Role Selection</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    Please select your role to continue.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Select your role
                    </label>
                    <Select value={tempRole} onValueChange={(v) => setTempRole(v as 'supervisor' | 'planner')}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a role..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="planner">Project Planner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedRole(tempRole as 'supervisor' | 'planner')} 
                    disabled={!tempRole}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedRole === 'supervisor' && (
            <div className="w-full max-w-md">
              <button 
                onClick={() => setSelectedRole(null)}
                className="mb-3 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                &larr; Back to role selection
              </button>
              <Card className="overflow-hidden border-border shadow-sm">
                <CardHeader className="bg-background pb-4 text-foreground">
                  <div className="flex items-center gap-2">
                    <HardHat className="h-5 w-5 text-amber-400" />
                    <CardTitle className="text-base">Supervisor</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    Just tell us what happened.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
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
            </div>
          )}

          {selectedRole === 'planner' && (
            <div className="w-full max-w-md">
              <button 
                onClick={() => setSelectedRole(null)}
                className="mb-3 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                &larr; Back to role selection
              </button>
              <Card className="overflow-hidden border-border shadow-sm">
                <CardHeader className="bg-card pb-4 text-foreground">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-amber-400" />
                    <CardTitle className="text-base">Project Planner</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    Review decisions, not raw reports.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Demo profile
                    </label>
                    <div className="rounded-md border border-border bg-muted px-3 py-2.5 text-sm">
                      <div className="font-medium text-foreground">Arun Sharma</div>
                      <div className="text-xs text-muted-foreground">Project Planner — Unit-4 Expansion Project</div>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full bg-card text-foreground hover:bg-muted" onClick={loginPlanner} disabled={busy !== null}>
                    {busy === 'planner' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Continue as Project Planner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-6 text-sm text-rose-600">{error}</p>
        )}

        <p className="mt-10 max-w-2xl text-center text-xs text-muted-foreground">
          Mock authentication for the SIH prototype — swappable for Supabase Auth in production.
          Schedule source: representative Primavera / MS Project export.
        </p>
      </div>
    </div>
  )
}
