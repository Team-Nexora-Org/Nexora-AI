'use client'

import React, { useEffect, useState } from 'react'

interface IntroAnimationProps {
  onComplete: () => void
  isEnabled?: boolean
  forceShow?: boolean
}

export function IntroAnimation({
  onComplete,
  isEnabled = true,
  forceShow = false,
}: IntroAnimationProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    if (!isEnabled) {
      onComplete()
      return
    }

    setShouldRender(true)

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 3500)

    const completeTimer = setTimeout(() => {
      localStorage.setItem('nexora_intro_seen', 'true')
      setShouldRender(false)
      onComplete()
    }, 3900)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [isEnabled, forceShow, onComplete])

  if (!shouldRender) return null

  return (
    <div className={`fixed inset-0 z-[100] bg-[#0B0C10] flex items-center justify-center transition-opacity duration-[400ms] ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Subtle animated tech grid to fill the extreme sides */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#45A29E_1px,transparent_1px),linear-gradient(to_bottom,#45A29E_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.07] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_20%,black_100%)]" />
      
      <button 
        onClick={() => {
          setIsFadingOut(true)
          setTimeout(() => {
            localStorage.setItem('nexora_intro_seen', 'true')
            setShouldRender(false)
            onComplete()
          }, 400)
        }}
        className="absolute top-4 right-4 px-4 py-2 text-xs font-medium text-[#C5C6C7] hover:text-[#66FCF1] z-[110] transition-colors bg-white/5 rounded-md hover:bg-white/10"
      >
        Skip
      </button>

      <svg 
        className="w-full max-w-4xl h-auto px-4 overflow-visible" 
        viewBox="0 0 800 400" 
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0C10" stopOpacity="0" />
            <stop offset="100%" stopColor="#66FCF1" />
          </linearGradient>
          <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0C10" stopOpacity="0" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="gradViolet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0C10" stopOpacity="0" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <radialGradient id="glowCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#66FCF1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#66FCF1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowEmerald" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowAmber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <style>
          {`
            .anim-left-box {
              animation: fadeInBox 0.4s ease-out forwards;
              opacity: 0;
            }
            .anim-line-in {
              stroke-dasharray: 300;
              stroke-dashoffset: 300;
              animation: drawLineIn 0.8s ease-in-out forwards, colorLineIn 0.3s ease-in-out 1.2s forwards;
            }
            .anim-ripple {
              opacity: 0;
              animation: rippleEffect 0.6s ease-out 1.0s forwards;
            }
            .anim-nexora-box {
              animation: wakeNexora 2.5s ease-out 1.0s forwards;
            }
            .anim-nexora-text-1 {
              animation: wakeNexoraText1 2.5s ease-out 1.0s forwards;
            }
            .anim-nexora-text-2 {
              animation: wakeNexoraText2 2.5s ease-out 1.0s forwards;
            }
            .anim-line-out {
              stroke-dasharray: 300;
              stroke-dashoffset: 300;
              opacity: 0;
              animation: drawLineOut 0.7s ease-in-out forwards;
            }
            .anim-planner-shape {
              animation: pulsePlannerShapes 0.5s ease-out forwards;
            }
            .anim-planner-group {
              animation: pulsePlannerGlow 0.5s ease-out forwards;
            }
            .anim-ready-text {
              opacity: 0;
              animation: fadeInText 0.5s ease-out forwards;
            }
            .anim-ambient {
              opacity: 0;
              animation: fadeAmbient 2s ease-in-out forwards;
            }

            @keyframes fadeInBox {
              0% { opacity: 0; transform: scale(0.9); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes drawLineIn {
              0% { stroke-dashoffset: 300; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes colorLineIn {
              0% { stroke: rgba(69,162,158,0.4); }
              100% { stroke: #66FCF1; }
            }
            @keyframes wakeNexora {
              0% { stroke: #1F2833; fill: #0B0C10; filter: drop-shadow(0 0 0 rgba(102,252,241,0)); }
              10% { stroke: #66FCF1; fill: #1F2833; filter: drop-shadow(0 0 10px rgba(102,252,241,0.6)); }
              100% { stroke: #66FCF1; fill: #0B0C10; filter: drop-shadow(0 0 15px rgba(102,252,241,0.4)); }
            }
            @keyframes wakeNexoraText1 {
              0% { fill: #45A29E; }
              100% { fill: #FFFFFF; }
            }
            @keyframes wakeNexoraText2 {
              0% { fill: #45A29E; filter: drop-shadow(0 0 0 rgba(102,252,241,0)); }
              100% { fill: #66FCF1; filter: drop-shadow(0 0 5px rgba(102,252,241,0.8)); }
            }
            @keyframes rippleEffect {
              0% { r: 10; opacity: 0.6; stroke-width: 4; }
              100% { r: 100; opacity: 0; stroke-width: 0; }
            }
            @keyframes drawLineOut {
              0% { stroke-dashoffset: 300; opacity: 0; }
              1% { opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes pulsePlannerShapes {
              0% { stroke: rgba(69,162,158,0.4); }
              100% { stroke: #66FCF1; }
            }
            @keyframes pulsePlannerGlow {
              0% { filter: drop-shadow(0 0 0 rgba(102,252,241,0)); }
              100% { filter: drop-shadow(0 0 10px rgba(102,252,241,0.3)); }
            }
            @keyframes fadeInText {
              0% { opacity: 0; transform: translateY(5px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeAmbient {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }

            @media (max-width: 640px) {
              .left-label { display: none; }
            }
            @media (max-width: 400px) {
              .planner-detail { display: none; }
              .planner-simple { display: block; }
            }
            @media (min-width: 401px) {
              .planner-simple { display: none; }
            }
          `}
        </style>

        {/* Ambient Backlights */}
        <circle cx="-200" cy="200" r="400" fill="url(#glowAmber)" className="anim-ambient" style={{ animationDelay: '0.1s', opacity: 0.5 }} />
        <circle cx="1000" cy="200" r="400" fill="url(#glowAmber)" className="anim-ambient" style={{ animationDelay: '0.1s', opacity: 0.5 }} />
        <circle cx="110" cy="200" r="180" fill="url(#glowCyan)" className="anim-ambient" style={{ animationDelay: '0.1s' }} />
        <circle cx="400" cy="200" r="280" fill="url(#glowCyan)" className="anim-ambient" style={{ animationDelay: '0.8s' }} />
        <circle cx="680" cy="160" r="160" fill="url(#glowEmerald)" className="anim-ambient" style={{ animationDelay: '2.5s' }} />
        <circle cx="680" cy="240" r="160" fill="url(#glowAmber)" className="anim-ambient" style={{ animationDelay: '2.6s' }} />

        {/* Left Side Data Sources (Stage 1) */}
        <g className="anim-left-box" style={{ animationDelay: '0.2s', transformOrigin: '110px 105px' }}>
          <rect x="50" y="80" width="120" height="50" rx="4" fill="#1F2833" stroke="rgba(69,162,158,0.4)" strokeWidth="1" />
          <text className="left-label" x="110" y="110" fill="#C5C6C7" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="1">FIELD REPORTS</text>
        </g>
        
        <g className="anim-left-box" style={{ animationDelay: '0.2s', transformOrigin: '110px 200px' }}>
          <rect x="50" y="175" width="120" height="50" rx="4" fill="#1F2833" stroke="rgba(69,162,158,0.4)" strokeWidth="1" />
          <text className="left-label" x="110" y="205" fill="#C5C6C7" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="1">VOICE</text>
        </g>
        
        <g className="anim-left-box" style={{ animationDelay: '0.2s', transformOrigin: '110px 295px' }}>
          <rect x="50" y="270" width="120" height="50" rx="4" fill="#1F2833" stroke="rgba(69,162,158,0.4)" strokeWidth="1" />
          <text className="left-label" x="110" y="300" fill="#C5C6C7" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="1">UPLOADS</text>
        </g>

        {/* Incoming Lines */}
        <path className="anim-line-in" style={{ animationDelay: '0.4s' }} d="M 170 105 C 230 105, 240 165, 300 165" fill="none" stroke="rgba(69,162,158,0.4)" strokeWidth="2" />
        <path className="anim-line-in" style={{ animationDelay: '0.55s' }} d="M 170 200 L 300 200" fill="none" stroke="rgba(69,162,158,0.4)" strokeWidth="2" />
        <path className="anim-line-in" style={{ animationDelay: '0.7s' }} d="M 170 295 C 230 295, 240 235, 300 235" fill="none" stroke="rgba(69,162,158,0.4)" strokeWidth="2" />

        {/* Center NEXORA AI Box (Stage 2) */}
        <circle className="anim-ripple" cx="400" cy="200" r="10" fill="none" stroke="#66FCF1" strokeWidth="0" />
        
        <rect className="anim-nexora-box" x="300" y="150" width="200" height="100" rx="12" fill="#0B0C10" stroke="#1F2833" strokeWidth="2" />
        <text className="anim-nexora-text-1" x="400" y="195" fill="#45A29E" fontSize="26" fontWeight="900" textAnchor="middle" letterSpacing="2">NEXORA</text>
        <text className="anim-nexora-text-2" x="400" y="222" fill="#45A29E" fontSize="14" fontWeight="700" textAnchor="middle" letterSpacing="4">AI</text>

        {/* Outgoing Processed Lines (Stage 3) */}
        <path className="anim-line-out" style={{ animationDelay: '1.8s' }} d="M 500 165 C 560 165, 590 190, 680 190" fill="none" stroke="url(#gradCyan)" strokeWidth="3" />
        <path className="anim-line-out" style={{ animationDelay: '1.92s' }} d="M 500 200 L 680 200" fill="none" stroke="url(#gradEmerald)" strokeWidth="3" />
        <path className="anim-line-out" style={{ animationDelay: '2.04s' }} d="M 500 235 C 560 235, 590 210, 680 210" fill="none" stroke="url(#gradViolet)" strokeWidth="3" />

        {/* Planner Target (Stage 4) */}
        <g className="anim-planner-group" style={{ animationDelay: '3.0s' }} transform="translate(680, 180)">
          {/* Detailed Figure */}
          <g className="planner-detail">
            <circle className="anim-planner-shape" style={{ animationDelay: '3.0s' }} cx="20" cy="8" r="10" fill="#1F2833" stroke="rgba(69,162,158,0.4)" strokeWidth="2" />
            <path className="anim-planner-shape" style={{ animationDelay: '3.0s' }} d="M 2 36 Q 20 18 38 36" fill="none" stroke="rgba(69,162,158,0.4)" strokeWidth="2.5" />
          </g>
          {/* Simple Circle for ultra-small screens */}
          <circle className="planner-simple anim-planner-shape" style={{ animationDelay: '3.0s' }} cx="20" cy="20" r="16" fill="#1F2833" stroke="rgba(69,162,158,0.4)" strokeWidth="2" />
        </g>
        
        <text className="anim-ready-text" style={{ animationDelay: '3.0s' }} x="700" y="245" fill="#66FCF1" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">INTELLIGENCE READY</text>
      </svg>
    </div>
  )
}
