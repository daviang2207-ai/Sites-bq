/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BQLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function BQLogo({ className = 'h-10 w-10', iconOnly = false }: BQLogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 500 500"
        className={`${className} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" /> {/* sky-400 */}
            <stop offset="100%" stopColor="#0284c7" /> {/* sky-600 */}
          </linearGradient>
          <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" /> {/* slate-900 */}
            <stop offset="100%" stopColor="#1e293b" /> {/* slate-800 */}
          </linearGradient>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0369a1" /> {/* sky-700 */}
            <stop offset="100%" stopColor="#075985" /> {/* sky-800 */}
          </linearGradient>
          <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Protective Hand (Bottom and right cup) */}
        <path
          d="M 170 330 C 230 375, 310 365, 345 315 C 352 305, 360 288, 350 280 C 342 274, 330 285, 320 292 C 285 315, 230 310, 190 270"
          stroke="url(#primaryGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow)"
        />
        {/* Support fingers structure details */}
        <path
          d="M 235 312 C 270 318, 305 305, 330 280 C 334 276, 340 270, 335 265 C 330 260, 322 268, 315 273 C 280 300, 240 295, 210 275"
          stroke="url(#primaryGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

        {/* Upper Outer Curved Arch starting from a pointer on left */}
        <path
          d="M 152 285 C 158 200, 210 120, 310 115 C 385 112, 442 170, 440 245 C 438 290, 415 328, 380 345"
          stroke="url(#primaryGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow)"
        />

        {/* House Roof structure */}
        <path
          d="M 190 245 L 300 150 L 410 245"
          stroke="url(#roofGradient)"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Inner roof outline accent */}
        <path
          d="M 210 238 L 300 162 L 390 238"
          stroke="url(#primaryGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
        />

        {/* Chimney on the right side of the roof */}
        <path
          d="M 370 185 L 370 165 L 392 165 L 392 205"
          stroke="url(#roofGradient)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Central Heart */}
        <path
          d="M 300 245 C 295 240, 282 225, 282 214 C 282 206, 288 200, 296 200 C 301 200, 305 204, 308 208 C 311 204, 315 200, 320 200 C 328 200, 334 206, 334 214 C 334 225, 321 240, 316 245 L 308 252 L 300 245 Z"
          fill="url(#primaryGradient)"
        />
        
        {/* Heartbeat sinusoidal line (inside the heart) */}
        <path
          d="M 288 214 L 294 214 L 297 207 L 301 223 L 305 205 L 308 217 L 311 214 L 320 214"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Left vehicle (Car Front) */}
        <g transform="translate(212, 235)">
          {/* Main Body */}
          <path
            d="M 6 12 C 8 4, 12 4, 25 4 C 38 4, 42 4, 44 12 C 48 12, 50 14, 50 18 L 50 28 C 50 30, 48 32, 45 32 L 42 32 L 42 35 C 42 38, 38 38, 38 35 L 38 32 L 12 32 L 12 35 C 12 38, 8 38, 8 35 L 8 32 L 5 32 C 2 32, 0 30, 0 28 L 0 18 C 0 14, 2 12, 6 12 Z"
            fill="url(#roofGradient)"
          />
          {/* Windshield */}
          <path d="M 10 11 L 13 5 L 37 5 L 40 11 Z" fill="#ffffff" opacity="0.9" />
          {/* Lights */}
          <circle cx="8" cy="22" r="3.5" fill="#ffffff" />
          <circle cx="42" cy="22" r="3.5" fill="#ffffff" />
          {/* Grille */}
          <rect x="18" y="22" width="14" height="4" rx="1.5" fill="#ffffff" opacity="0.8" />
        </g>

        {/* Right vehicle (Truck/Lorry Front) */}
        <g transform="translate(325, 235)">
          {/* Main Cab */}
          <path
            d="M 5 2 C 5 2, 45 2, 45 2 C 48 2, 50 4, 50 7 L 50 28 C 50 30, 48 32, 45 32 L 42 32 L 42 35 C 42 38, 38 38, 38 35 L 38 32 L 12 32 L 12 35 C 12 38, 8 38, 8 35 L 8 32 L 5 32 C 2 32, 0 30, 0 28 L 0 7 C 0 4, 2 2, 5 2 Z"
            fill="url(#roofGradient)"
          />
          {/* Large Windshield */}
          <path d="M 5 5 L 45 5 L 45 16 L 5 16 Z" fill="#ffffff" opacity="0.9" />
          {/* Lights */}
          <circle cx="8" cy="24" r="3.5" fill="#ffffff" />
          <circle cx="42" cy="24" r="3.5" fill="#ffffff" />
          {/* Grille */}
          <rect x="16" y="22" width="18" height="6" rx="1" fill="#ffffff" opacity="0.8" />
        </g>
      </svg>
      {!iconOnly && (
        <div className="flex flex-col">
          <span className="font-display font-bold text-xl tracking-tight text-white leading-none flex items-center gap-1">
            BQ <span className="text-sky-400 font-normal text-lg">Seguros</span>
          </span>
          <span className="text-[9px] text-slate-400 tracking-wider uppercase font-semibold mt-0.5">
            Corretora Digital
          </span>
        </div>
      )}
    </div>
  );
}
