import React from 'react'

/* 
  Animated SVG DNA double-helix background.
  Features smooth, realistic curving 3D strands crossing over each other, 
  rendered in deep purple and medical red tones. Grid lines are removed.
*/
export default function DNAHelix() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            {/* ── Top-right helix (Fast, Front) ── */}
            <svg
                className="absolute -right-32 -top-20 w-[700px] h-[700px] opacity-25"
                style={{ animation: 'helixRotate 130s linear infinite' }}
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="solidGradRight1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#9333ea" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#d32f2f" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ff4c4c" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="solidGradRight2" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#6b21a8" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#9a0007" stopOpacity="0.8" />
                    </linearGradient>
                    {/* Shadow filters for 3D depth */}
                    <filter id="dnaShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
                    </filter>
                </defs>

                <g strokeWidth="4" strokeLinecap="round">
                    {/* Back strand */}
                    <path
                        d="M 280 20 
               C 220 80, 180 120, 150 160 
               C 120 200, 120 220, 150 260 
               C 180 300, 220 340, 280 400"
                        stroke="url(#solidGradRight2)"
                        strokeWidth="3.5"
                        opacity="0.8"
                    />

                    {/* Front strand overlapping */}
                    <path
                        d="M 120 20 
               C 180 80, 260 120, 290 160 
               C 320 200, 320 220, 290 260 
               C 260 300, 180 340, 120 400"
                        stroke="url(#solidGradRight1)"
                        opacity="1"
                        filter="url(#dnaShadow)"
                    />
                </g>
            </svg>

            {/* ── Bottom-left helix (Slow, Back, Mirrored) ── */}
            <svg
                className="absolute -left-20 -bottom-20 w-[600px] h-[600px] opacity-20"
                style={{ animation: 'helixRotate 180s linear infinite reverse' }}
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="solidGradLeft1" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#581c87" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.7" />
                    </linearGradient>
                </defs>

                <g strokeWidth="3" strokeLinecap="round">
                    {/* Back strand */}
                    <path
                        d="M 270 10 
               C 210 70, 150 110, 130 150 
               C 110 190, 110 210, 130 250 
               C 150 290, 210 330, 270 390"
                        stroke="#7f1d1d"
                        strokeWidth="2.5"
                        opacity="0.5"
                    />
                    {/* Front strand */}
                    <path
                        d="M 130 10 
                C 190 70, 280 110, 300 150 
                C 320 190, 320 210, 300 250 
                C 280 290, 190 330, 130 390"
                        stroke="url(#solidGradLeft1)"
                        opacity="0.9"
                    />
                </g>
            </svg>

            {/* ── Floating particles for ambiance ── */}
            <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-purpleTheme-400/50 rounded-full float-anim shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-medicalRed-light/40 rounded-full float-anim shadow-[0_0_10px_rgba(255,76,76,0.6)]" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purpleTheme-300/30 rounded-full float-anim shadow-[0_0_6px_rgba(192,132,252,0.4)]" style={{ animationDelay: '4s' }} />
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-medicalRed-dark/50 rounded-full float-anim blur-[1px]" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-purpleTheme-500/30 rounded-full float-anim blur-[2px]" style={{ animationDelay: '3s' }} />
        </div>
    )
}
