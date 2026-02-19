import React from 'react'

/* Animated SVG DNA double-helix background — very subtle, slow rotation */
export default function DNAHelix() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            {/* Top-right helix */}
            <svg
                className="absolute -right-20 -top-20 w-[500px] h-[500px] helix-rot"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="helixGrad1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00d4c4" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#4dd0e1" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
                <g stroke="url(#helixGrad1)" strokeWidth="1.5" strokeLinecap="round" opacity="0.12">
                    {/* Left strand */}
                    <path d="M120 20 C180 80, 180 120, 120 180 C60 240, 60 280, 120 340" />
                    {/* Right strand */}
                    <path d="M280 20 C220 80, 220 120, 280 180 C340 240, 340 280, 280 340" />
                    {/* Rungs connecting strands */}
                    <line x1="135" y1="50" x2="265" y2="50" opacity="0.5" />
                    <line x1="125" y1="90" x2="275" y2="90" opacity="0.4" />
                    <line x1="140" y1="130" x2="260" y2="130" opacity="0.5" />
                    <line x1="120" y1="170" x2="280" y2="170" opacity="0.3" />
                    <line x1="130" y1="210" x2="270" y2="210" opacity="0.4" />
                    <line x1="115" y1="250" x2="285" y2="250" opacity="0.5" />
                    <line x1="130" y1="290" x2="270" y2="290" opacity="0.4" />
                    <line x1="140" y1="330" x2="260" y2="330" opacity="0.3" />
                </g>
                {/* Glow dots at intersections */}
                <g fill="#00d4c4" opacity="0.08">
                    <circle cx="120" cy="180" r="4" />
                    <circle cx="280" cy="180" r="4" />
                    <circle cx="120" cy="340" r="3" />
                    <circle cx="280" cy="340" r="3" />
                </g>
            </svg>

            {/* Bottom-left helix (mirrored, slower) */}
            <svg
                className="absolute -left-16 -bottom-16 w-[420px] h-[420px] opacity-[0.04]"
                style={{ animation: 'helixRotate 120s linear infinite reverse' }}
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g stroke="#00d4c4" strokeWidth="1.2" strokeLinecap="round" opacity="0.2">
                    <path d="M120 30 C190 90, 190 130, 120 190 C50 250, 50 290, 120 350" />
                    <path d="M280 30 C210 90, 210 130, 280 190 C350 250, 350 290, 280 350" />
                    <line x1="135" y1="60" x2="265" y2="60" opacity="0.4" />
                    <line x1="125" y1="110" x2="275" y2="110" opacity="0.3" />
                    <line x1="140" y1="160" x2="260" y2="160" opacity="0.4" />
                    <line x1="120" y1="210" x2="280" y2="210" opacity="0.3" />
                    <line x1="130" y1="260" x2="270" y2="260" opacity="0.4" />
                    <line x1="140" y1="310" x2="260" y2="310" opacity="0.3" />
                </g>
            </svg>

            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-teal-400/20 rounded-full float-anim" />
            <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-teal-300/15 rounded-full float-anim" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-teal-400/10 rounded-full float-anim" style={{ animationDelay: '4s' }} />
            <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-teal-200/20 rounded-full float-anim" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-cyan-400/10 rounded-full float-anim" style={{ animationDelay: '3s' }} />
        </div>
    )
}
