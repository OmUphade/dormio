'use client';

import React from 'react';
import { MapPin, Plus, Minus, ArrowsClockwise, GraduationCap } from '@phosphor-icons/react';

export default function MapView({
  listings,
  hoveredId,
  onPinHover,
  selectedArea = 'Pune City Center',
}) {
  return (
    <div className="relative w-full h-full min-h-[450px] bg-muted border border-border rounded-lg overflow-hidden flex flex-col justify-between shadow-inner">
      {/* Map Header / Area Banner */}
      <div className="p-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-card px-3 py-1.5 rounded-pill border border-border shadow-md text-xs font-semibold text-foreground flex items-center gap-1.5">
          <MapPin size={14} className="text-primary" weight="fill" />
          <span>
            Viewing {selectedArea} ({listings.length} Stays & Messes)
          </span>
        </div>

        <button
          type="button"
          className="pointer-events-auto bg-card px-3 py-1.5 rounded-pill border border-border shadow-md text-xs font-semibold text-primary hover:bg-muted transition-colors flex items-center gap-1"
        >
          <ArrowsClockwise size={12} />
          <span>Search this map area</span>
        </button>
      </div>

      {/* Styled Flat Map Canvas with Real Coordinates Simulation */}
      <div className="absolute inset-0 z-0 bg-canvas overflow-hidden">
        {/* Subtle grid and road lines (pure SVG styling, no gradients, no black) */}
        <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Simulated main arterial roads in Pune */}
          <path
            d="M 0 180 Q 250 150 500 220 T 1000 160"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="4"
          />
          <path
            d="M 220 0 Q 300 300 450 600"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="3"
          />
          <path
            d="M 450 100 Q 600 350 750 700"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="3"
          />
        </svg>

        {/* Landmarks */}
        <div className="absolute top-[28%] left-[32%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1 px-2 py-1 rounded bg-card border border-border text-xs font-bold text-foreground shadow-sm">
          <GraduationCap size={14} className="text-accent" weight="fill" />
          <span>Fergusson College</span>
        </div>

        <div className="absolute top-[65%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1 px-2 py-1 rounded bg-card border border-border text-xs font-bold text-foreground shadow-sm">
          <GraduationCap size={14} className="text-accent" weight="fill" />
          <span>MIT-WPU Campus</span>
        </div>

        <div className="absolute top-[20%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1 px-2 py-1 rounded bg-card border border-border text-xs font-bold text-foreground shadow-sm">
          <GraduationCap size={14} className="text-accent" weight="fill" />
          <span>Symbiosis Viman Nagar</span>
        </div>

        {/* Dynamic Listing Price Pins */}
        {listings.map((item, idx) => {
          const isHovered = hoveredId === item.id;
          // Deterministic pin positions based on index for stable preview
          const topPercent = 25 + ((idx * 17) % 55);
          const leftPercent = 18 + ((idx * 23) % 68);

          return (
            <div
              key={item.id}
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
              onMouseEnter={() => onPinHover && onPinHover(item.id)}
              onMouseLeave={() => onPinHover && onPinHover(null)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-200 ${
                isHovered ? 'scale-110 z-30' : 'hover:scale-105'
              }`}
            >
              <div
                className={`px-2.5 py-1 rounded-pill text-xs font-bold shadow-md flex items-center gap-1 border ${
                  isHovered
                    ? 'bg-foreground text-canvas border-foreground ring-2 ring-primary'
                    : item.kind === 'mess'
                      ? 'bg-mess text-card border-mess'
                      : 'bg-primary text-primary-foreground border-primary'
                }`}
              >
                <span>₹{Math.round(item.rent / 1000)}k</span>
                {item.kind === 'mess' && <span className="text-xs font-normal">mess</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Zoom Controls */}
      <div className="p-3 z-10 flex flex-col items-end pointer-events-none">
        <div className="pointer-events-auto bg-card rounded-md border border-border shadow-md overflow-hidden flex flex-col">
          <button
            type="button"
            className="p-2 text-foreground hover:bg-muted transition-colors border-b border-border"
            aria-label="Zoom in"
          >
            <Plus size={16} />
          </button>
          <button
            type="button"
            className="p-2 text-foreground hover:bg-muted transition-colors"
            aria-label="Zoom out"
          >
            <Minus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
