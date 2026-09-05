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
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-[400ms] ease-in-out overflow-hidden bg-[#0B0C10] ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* 0. MESH GRADIENT BACKGROUND (MERGING LIGHT AND DARK) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Light theme orb (Left) */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[140%] bg-[#F8F9FA] rounded-full blur-[140px] opacity-100" />

        {/* Soft Teal transition (Middle-Left) */}
        <div className="absolute top-[10%] left-[25%] w-[40%] h-[80%] bg-[#45A29E] rounded-full blur-[120px] opacity-40" />

        {/* Vibrant Cyan core (Center/Right) */}
        <div className="absolute top-[20%] left-[45%] w-[35%] h-[60%] bg-[#66FCF1] rounded-full blur-[100px] opacity-20 mix-blend-screen" />

        {/* Deep Purple accent (Right/Bottom) */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[45%] h-[70%] bg-[#8B5CF6] rounded-full blur-[130px] opacity-15" />
      </div>

      {/* Unified Dotted Grid over the mesh */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]"
        style={{
          backgroundImage: 'radial-gradient(circle, #888888 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.15,
          mixBlendMode: 'overlay'
        }}
      />

      {/* 1. TOP-LEFT CORNER BRANDING */}
      <div className="fixed top-6 left-6 z-50 pointer-events-none flex flex-col gap-1">
        <div className="text-[10px] tracking-widest uppercase text-[#0B0C10] font-mono font-bold">
          NEXORA
        </div>
        <div className="text-[9px] tracking-wider uppercase text-[#0B0C10]/70 font-mono">
          FIELD-TO-SCHEDULE INTELLIGENCE
        </div>
      </div>

      {/* 3. TOP-RIGHT NAV-LIKE ELEMENTS */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-6">
        <div className="text-[10px] tracking-widest uppercase text-[#F8F9FA]/70 font-mono pointer-events-none hidden sm:block">
          SIH26122
        </div>
        <button
          onClick={() => {
            setIsFadingOut(true)
            setTimeout(() => {
              localStorage.setItem('nexora_intro_seen', 'true')
              setShouldRender(false)
              onComplete()
            }, 400)
          }}
          className="text-[10px] tracking-widest uppercase text-[#F8F9FA]/70 hover:text-[#66FCF1] transition-colors font-mono font-bold"
        >
          SKIP
        </button>
      </div>

      <svg
        className="w-full max-w-4xl h-auto px-4 overflow-visible z-10"
        viewBox="0 0 800 400"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Soft shadow for glass elements */}
          <filter id="glassShadowDark" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#0B0C10" floodOpacity="0.06" />
          </filter>

          <filter id="glassShadowGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#66FCF1" floodOpacity="0.2" />
          </filter>

          <linearGradient id="lineGradientLight" gradientUnits="userSpaceOnUse" x1="170" y1="0" x2="300" y2="0">
            <stop offset="0%" stopColor="#0B0C10" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <style>
          {`
            /* Global SVG animations */
            .box-fade {
              opacity: 0;
              transform: scale(0.95);
              animation: boxFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
            }
            .left-box-border {
              stroke: rgba(0,0,0,0.15);
            }
            .box-border-anim-1 { animation: borderFlashLight 0.5s ease-out 0.4s; }
            .box-border-anim-2 { animation: borderFlashLight 0.5s ease-out 0.55s; }
            .box-border-anim-3 { animation: borderFlashLight 0.5s ease-out 0.7s; }

            .line-in {
              stroke-dasharray: 200;
              stroke-dashoffset: 200;
              animation: drawLine 0.6s ease-out forwards;
            }
            .packet-in {
              opacity: 0;
              animation: travelPacket 0.6s ease-in forwards;
            }

            .nexora-box-scale {
              transform-origin: 400px 200px;
              animation: nexoraSpring 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.0s forwards;
            }

            .line-out {
              stroke-dasharray: 250;
              stroke-dashoffset: 250;
              animation: drawLine 0.6s ease-out forwards;
            }
            .packet-out {
              opacity: 0;
              animation: travelPacket 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }

            .planner-head {
              animation: fillPlanner 0.3s ease-out 3.0s forwards;
            }
            .planner-halo {
              opacity: 0;
              transform-origin: 700px 200px;
              animation: expandHalo 1s ease-out 3.0s forwards;
            }
            .typewriter {
              opacity: 0;
              animation: fadeChar 0.1s forwards;
            }
            .pulse-dot {
              animation: pulseOpacity 1.5s infinite;
            }

            /* Keyframes */
            @keyframes boxFadeIn {
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes borderFlashLight {
              50% { stroke: rgba(0,0,0,0.5); }
            }
            @keyframes drawLine {
              to { stroke-dashoffset: 0; }
            }
            @keyframes travelPacket {
              0% { opacity: 0; offset-distance: 0%; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { opacity: 0; offset-distance: 100%; }
            }
            @keyframes nexoraSpring {
              0% { transform: scale(0.95); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes fillPlanner {
              to { fill: rgba(102, 252, 241, 0.15); }
            }
            @keyframes expandHalo {
              0% { opacity: 0.6; r: 12px; }
              100% { opacity: 0; r: 28px; stroke-width: 0; }
            }
            @keyframes fadeChar {
              to { opacity: 1; }
            }
            @keyframes pulseOpacity {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
          `}
        </style>

        {/* 1. LEFT SOURCE BOXES (Light frosted glass) */}
        <g className="box-fade" style={{ transformOrigin: '110px 105px' }} filter="url(#glassShadowDark)">
          <rect x="50" y="80" width="120" height="50" rx="12" fill="rgba(0,0,0,0.03)" strokeWidth="1.5" className="left-box-border box-border-anim-1" />
          <g stroke="#0B0C10" strokeWidth="1.5" fill="none" transform="translate(102, 88)">
            <path d="M3 14V2C3 1.44772 3.44772 1 4 1H10.5L14 4.5V14C14 14.5523 13.5523 15 13 15H4C3.44772 15 3 14.5523 3 14Z" />
            <path d="M10 1V5H14" />
          </g>
          <text x="110" y="118" fill="#0B0C10" fontSize="10" fontWeight="700" letterSpacing="2" textAnchor="middle">FIELD REPORTS</text>
        </g>

        <g className="box-fade" style={{ transformOrigin: '110px 200px' }} filter="url(#glassShadowDark)">
          <rect x="50" y="175" width="120" height="50" rx="12" fill="rgba(0,0,0,0.03)" strokeWidth="1.5" className="left-box-border box-border-anim-2" />
          <g stroke="#0B0C10" strokeWidth="1.5" fill="none" transform="translate(102, 183)">
            <path d="M8 1V9C8 10.1046 7.10457 11 6 11C4.89543 11 4 10.1046 4 9V1" />
            <path d="M2 7V9C2 11.2091 3.79086 13 6 13C8.20914 13 10 11.2091 10 9V7" />
            <path d="M6 13V16" />
            <path d="M4 16H8" />
          </g>
          <text x="110" y="213" fill="#0B0C10" fontSize="10" fontWeight="700" letterSpacing="2" textAnchor="middle">VOICE</text>
        </g>

        <g className="box-fade" style={{ transformOrigin: '110px 295px' }} filter="url(#glassShadowDark)">
          <rect x="50" y="270" width="120" height="50" rx="12" fill="rgba(0,0,0,0.03)" strokeWidth="1.5" className="left-box-border box-border-anim-3" />
          <g stroke="#0B0C10" strokeWidth="1.5" fill="none" transform="translate(102, 278)">
            <path d="M11 10.5V13.5C11 14.3284 10.3284 15 9.5 15H2.5C1.67157 15 1 14.3284 1 13.5V10.5" />
            <path d="M6 11V1M6 1L9 4M6 1L3 4" />
          </g>
          <text x="110" y="308" fill="#0B0C10" fontSize="10" fontWeight="700" letterSpacing="2" textAnchor="middle">UPLOADS</text>
        </g>

        {/* 2. CONNECTION LINES (INPUT) */}
        <g stroke="url(#lineGradientLight)" strokeWidth="2" fill="none">
          <path id="inPath1" className="line-in" style={{ animationDelay: '0.4s' }} d="M 170 105 C 230 105, 240 165, 300 165" />
          <path id="inPath2" className="line-in" style={{ animationDelay: '0.55s' }} d="M 170 200 C 210 199.5, 260 200.5, 300 200" />
          <path id="inPath3" className="line-in" style={{ animationDelay: '0.7s' }} d="M 170 295 C 230 295, 240 235, 300 235" />
        </g>

        {/* Input Particles (White as they approach the center) */}
        <circle className="packet-in" r="3" fill="#FFFFFF" style={{ animationDelay: '0.6s' }}>
          <animateMotion dur="0.6s" begin="0.6s" fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#inPath1" /></animateMotion>
        </circle>
        <circle className="packet-in" r="3" fill="#FFFFFF" style={{ animationDelay: '0.7s' }}>
          <animateMotion dur="0.5s" begin="0.7s" fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#inPath2" /></animateMotion>
        </circle>
        <circle className="packet-in" r="3" fill="#FFFFFF" style={{ animationDelay: '0.8s' }}>
          <animateMotion dur="0.6s" begin="0.8s" fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#inPath3" /></animateMotion>
        </circle>

        {/* 3. CENTER NEXORA AI BOX (PURE FROSTED GLASS) */}
        <g className="nexora-box-scale" style={{ opacity: 0 }} filter="url(#glassShadowGlow)">
          {/* Frosted Glass Fill with static subtle border */}
          <rect x="300" y="150" width="200" height="100" rx="16" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

          <text x="400" y="195" fill="#FFFFFF" fontSize="30" fontWeight="800" textAnchor="middle" letterSpacing="4">NEXORA</text>
          <text x="400" y="222" fill="#66FCF1" fontSize="14" fontWeight="600" textAnchor="middle" letterSpacing="6">AI</text>
        </g>

        {/* 4. CONNECTION LINES (OUTPUT) */}
        <g fill="none" strokeWidth="2" strokeLinecap="round">
          <path id="outPath1" className="line-out" style={{ animationDelay: '1.6s' }} stroke="#66FCF1" d="M 500 165 C 570 145, 620 180, 680 190" />
          <path id="outPath2" className="line-out" style={{ animationDelay: '1.72s' }} stroke="#10B981" d="M 500 200 C 560 200, 620 200, 680 200" />
          <path id="outPath3" className="line-out" style={{ animationDelay: '1.84s' }} stroke="#8B5CF6" d="M 500 235 C 570 255, 620 220, 680 210" />
        </g>

        {/* Output Particles */}
        <circle className="packet-out" r="4" fill="#66FCF1" style={{ animationDelay: '2.2s' }}>
          <animateMotion dur="0.6s" begin="2.2s" fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#outPath1" /></animateMotion>
        </circle>
        <circle className="packet-out" r="4" fill="#10B981" style={{ animationDelay: '2.35s' }}>
          <animateMotion dur="0.6s" begin="2.35s" fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#outPath2" /></animateMotion>
        </circle>
        <circle className="packet-out" r="4" fill="#8B5CF6" style={{ animationDelay: '2.5s' }}>
          <animateMotion dur="0.6s" begin="2.5s" fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#outPath3" /></animateMotion>
        </circle>

        {/* 5. PLANNER TARGET (Over Dark Gradient) */}
        <g transform="translate(680, 180)">
          <circle className="planner-halo" cx="20" cy="8" r="12" fill="none" stroke="#66FCF1" strokeWidth="1" />
          <g>
            <circle className="planner-head" cx="20" cy="8" r="10" fill="none" stroke="#66FCF1" strokeWidth="2" />
            <path d="M 2 36 Q 20 25 38 36" fill="none" stroke="#45A29E" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>

        {/* INTELLIGENCE READY Text */}
        <g transform="translate(700, 245)">
          <g className="typewriter" style={{ animationDelay: '2.8s' }}>
            <circle cx="-65" cy="-3" r="2" fill="#66FCF1" className="pulse-dot" />
          </g>
          <text fill="#66FCF1" fillOpacity="0.8" fontSize="9" fontWeight="600" letterSpacing="3" textAnchor="middle">
            {Array.from("INTELLIGENCE READY").map((char, i) => (
              <tspan key={i} className="typewriter" style={{ animationDelay: `${2.8 + i * 0.025}s` }}>
                {char}
              </tspan>
            ))}
          </text>
        </g>
      </svg>

      {/* 4. BOTTOM-LEFT HEADLINE */}
      <div className="absolute bottom-12 left-6 md:left-12 z-20 pointer-events-none">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-[#0B0C10] tracking-tight drop-shadow-sm">
          Meet <span className="text-[#0B0C10] relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1.5 after:bg-[#45A29E] after:-z-10">NEXORA</span>
        </h1>
      </div>

      {/* 5. BOTTOM-RIGHT DESCRIPTION */}
      <div className="absolute bottom-12 right-6 md:right-12 z-20 pointer-events-none hidden sm:block max-w-[320px]">
        <p className="text-sm md:text-base text-[#F8F9FA]/80 font-medium leading-relaxed text-right drop-shadow-md">
          The project schedule knows what was planned. The field knows what actually happened. NEXORA is the <span className="text-[#66FCF1] font-bold">intelligent</span> bridge between them.
        </p>
      </div>

      {/* 6. SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 opacity-50 mix-blend-overlay">
        <span className="text-[10px] tracking-widest uppercase text-[#F8F9FA] font-mono font-bold">
          SCROLL TO ENTER
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="animate-bounce">
          <path d="M1 1L5 5L9 1" stroke="#F8F9FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
