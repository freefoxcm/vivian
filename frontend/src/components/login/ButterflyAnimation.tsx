"use client";

import { cn } from "@/lib/utils";

interface ButterflyAnimationProps {
  className?: string;
}

export function ButterflyAnimation({ className }: ButterflyAnimationProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Butterfly SVG with CSS animation */}
      <div className="butterfly-container">
        <svg
          viewBox="0 0 100 80"
          className="butterfly h-16 w-16 md:h-24 md:w-24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left wing */}
          <path
            className="wing wing-left"
            d="M50 40 Q30 20 10 30 Q5 45 20 55 Q35 60 50 45"
            fill="url(#wingGradient)"
            opacity="0.9"
          />
          {/* Right wing */}
          <path
            className="wing wing-right"
            d="M50 40 Q70 20 90 30 Q95 45 80 55 Q65 60 50 45"
            fill="url(#wingGradient)"
            opacity="0.9"
          />
          {/* Body */}
          <ellipse
            cx="50"
            cy="45"
            rx="4"
            ry="15"
            fill="#4A3728"
          />
          {/* Wing gradient definition */}
          <defs>
            <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8C42" />
              <stop offset="50%" stopColor="#FFB6C1" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}