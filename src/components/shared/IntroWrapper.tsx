'use client'

import { useState, useEffect } from 'react'
import { IntroAnimation } from './IntroAnimation'

export function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false)
  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    setIsInitialRender(false)
  }, [])

  if (isInitialRender) {
    return <div className="opacity-0">{children}</div>
  }

  return (
    <>
      {!introDone && (
        <IntroAnimation onComplete={() => setIntroDone(true)} />
      )}
      <div className={`transition-opacity duration-500 ${introDone ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </>
  )
}
