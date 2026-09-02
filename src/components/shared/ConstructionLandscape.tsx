export function ConstructionLandscape() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-70 dark:opacity-90">
      <svg 
        viewBox="0 0 2400 1200" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* 
          Layer 4: Deep Background Skyline (Spanning 2400)
        */}
        <g className="fill-[#C5C6C7]/30 dark:fill-[#1F2833]/40 transition-colors">
          <rect x="0" y="500" width="180" height="700" />
          <rect x="200" y="600" width="120" height="600" />
          <rect x="350" y="300" width="220" height="900" />
          <polygon points="350,300 460,150 570,300" />
          <rect x="620" y="450" width="150" height="750" />
          <rect x="800" y="550" width="250" height="650" />
          <rect x="1100" y="350" width="180" height="850" />
          <rect x="1350" y="600" width="140" height="600" />
          <rect x="1550" y="400" width="300" height="800" />
          <polygon points="1550,400 1700,250 1700,400" />
          <rect x="1900" y="500" width="180" height="700" />
          <rect x="2120" y="300" width="250" height="900" />
          <rect x="2150" y="100" width="20" height="200" />
        </g>

        {/* 
          Layer 3: Mid-Background Scaffolding & Cranes
        */}
        <g className="fill-[#C5C6C7]/50 dark:fill-[#1F2833]/60 stroke-[#C5C6C7]/50 dark:stroke-[#1F2833]/60 transition-colors">
          
          {/* Crane 1 */}
          <g transform="translate(250, 150)">
            <rect x="0" y="0" width="12" height="1050" />
            <rect x="-150" y="-20" width="400" height="10" />
            <path d="M 0 0 L 6 -45 L 12 0 Z" />
            <line x1="6" y1="-45" x2="-150" y2="-20" strokeWidth="3" />
            <line x1="6" y1="-45" x2="250" y2="-20" strokeWidth="3" />
          </g>

          {/* Central Scaffolding Block */}
          <g transform="translate(800, 300)">
            <rect x="0" y="0" width="300" height="900" />
            {/* Grid cutouts */}
            {Array.from({ length: 10 }).map((_, row) => 
              Array.from({ length: 4 }).map((_, col) => (
                <rect key={`scaffold-${row}-${col}`} x={20 + col * 70} y={20 + row * 90} width="50" height="70" className="fill-background" />
              ))
            )}
          </g>

          {/* Crane 2 */}
          <g transform="translate(1400, 250)">
            <rect x="0" y="0" width="12" height="950" />
            <rect x="-300" y="-20" width="450" height="10" />
            <path d="M 0 0 L 6 -45 L 12 0 Z" />
            <line x1="6" y1="-45" x2="-300" y2="-20" strokeWidth="3" />
            <line x1="6" y1="-45" x2="150" y2="-20" strokeWidth="3" />
          </g>

          {/* Right Scaffolding Block */}
          <g transform="translate(1800, 450)">
            <rect x="0" y="0" width="200" height="750" />
            {Array.from({ length: 8 }).map((_, row) => 
              Array.from({ length: 3 }).map((_, col) => (
                <rect key={`scaffold2-${row}-${col}`} x={15 + col * 60} y={15 + row * 90} width="45" height="70" className="fill-background" />
              ))
            )}
          </g>

        </g>

        {/* 
          Layer 2: Midground Main Cranes and Structures
        */}
        <g className="fill-[#C5C6C7]/80 dark:fill-[#1F2833]/90 stroke-[#C5C6C7]/80 dark:stroke-[#1F2833]/90 transition-colors">
          
          {/* Far Left: Silo / Water Tower */}
          <g transform="translate(100, 500)">
            <rect x="40" y="100" width="16" height="600" />
            <rect x="120" y="100" width="16" height="600" />
            <line x1="40" y1="200" x2="136" y2="280" strokeWidth="6" />
            <line x1="136" y1="200" x2="40" y2="280" strokeWidth="6" />
            <line x1="40" y1="400" x2="136" y2="480" strokeWidth="6" />
            <line x1="136" y1="400" x2="40" y2="480" strokeWidth="6" />
            <rect x="10" y="0" width="156" height="120" rx="12" />
            <path d="M 10 0 Q 88 -60 166 0 Z" />
            <rect x="85" y="-100" width="6" height="100" />
          </g>

          {/* Giant Tower Crane (Center) */}
          <g transform="translate(550, 150)">
            <rect x="120" y="30" width="24" height="1020" />
            <rect x="100" y="15" width="30" height="30" />
            <path d="M 120 15 L 132 -50 L 144 15 Z" />
            <rect x="144" y="5" width="450" height="15" />
            <rect x="-50" y="5" width="150" height="15" />
            <line x1="132" y1="-50" x2="550" y2="5" strokeWidth="4" />
            <line x1="132" y1="-50" x2="-20" y2="5" strokeWidth="4" />
            <line x1="450" y1="20" x2="450" y2="250" strokeWidth="3" />
            <rect x="435" y="250" width="30" height="40" />
          </g>
          
          {/* Giant Tower Crane (Right) */}
          <g transform="translate(2000, 200)">
            <rect x="80" y="20" width="20" height="980" />
            <rect x="70" y="5" width="25" height="25" />
            <path d="M 80 5 L 90 -40 L 100 5 Z" />
            <rect x="-350" y="0" width="430" height="12" />
            <rect x="100" y="0" width="120" height="12" />
            <line x1="90" y1="-40" x2="-300" y2="0" strokeWidth="3" />
            <line x1="90" y1="-40" x2="180" y2="0" strokeWidth="3" />
            <line x1="-200" y1="12" x2="-200" y2="180" strokeWidth="3" />
            <rect x="-215" y="180" width="30" height="45" />
          </g>
        </g>

        {/* 
          Layer 1: Foreground
        */}
        <g className="fill-[#C5C6C7] dark:fill-[#1F2833] stroke-[#C5C6C7] dark:stroke-[#1F2833] transition-colors">
          
          {/* Ground */}
          <rect x="0" y="1150" width="2400" height="50" />
          
          {/* Foreground piles */}
          <path d="M 0 1150 L 100 1050 L 200 1150 Z" />
          <rect x="350" y="1050" width="180" height="100" />
          
          {/* Central Exposed Building */}
          <g transform="translate(1000, 650)">
            <rect x="0" y="0" width="40" height="500" />
            <rect x="120" y="0" width="40" height="500" />
            <rect x="240" y="0" width="40" height="500" />
            <rect x="360" y="0" width="40" height="500" />
            
            {/* Floors */}
            <rect x="-20" y="420" width="440" height="25" />
            <rect x="-20" y="300" width="440" height="25" />
            <rect x="-20" y="180" width="440" height="25" />
            <rect x="-20" y="60" width="440" height="25" />
            
            {/* Scaffolding on top */}
            <rect x="130" y="-80" width="12" height="80" />
            <rect x="250" y="-120" width="12" height="120" />
          </g>

          {/* Excavator 1 (Left) */}
          <g transform="translate(550, 980)">
            <rect x="100" y="100" width="160" height="60" rx="30" />
            <path d="M 120 40 L 240 40 L 260 100 L 110 100 Z" />
            <path d="M 130 -20 L 190 -20 L 190 40 L 120 40 Z" />
            <rect x="135" y="-15" width="40" height="40" className="fill-[#45A29E]/20 dark:fill-[#66FCF1]/20" />
            <path d="M 155 40 L 105 -40 L 70 -30 L 135 65 Z" />
            <path d="M 85 -30 L 15 100 L 35 110 L 105 -15 Z" />
            <path d="M 0 100 Q -30 120 -15 160 L 40 140 Z" />
          </g>

          {/* Excavator 2 (Right, facing left) */}
          <g transform="translate(1600, 980)">
            <rect x="100" y="100" width="160" height="60" rx="30" />
            <path d="M 120 40 L 240 40 L 260 100 L 110 100 Z" />
            <path d="M 170 -20 L 230 -20 L 240 40 L 170 40 Z" />
            <rect x="185" y="-15" width="40" height="40" className="fill-[#45A29E]/20 dark:fill-[#66FCF1]/20" />
            <path d="M 205 40 L 255 -40 L 290 -30 L 225 65 Z" />
            <path d="M 275 -30 L 345 100 L 325 110 L 255 -15 Z" />
            <path d="M 360 100 Q 390 120 375 160 L 320 140 Z" />
          </g>

          <path d="M 1400 1150 L 1480 1020 L 1580 1150 Z" />
          <path d="M 2100 1150 L 2200 1000 L 2300 1150 Z" />
          <rect x="2250" y="1080" width="150" height="70" />
        </g>
      </svg>
    </div>
  )
}
