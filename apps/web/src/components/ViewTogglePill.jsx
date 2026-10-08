'use client';

import React from 'react';
import { MapTrifold, ListBullets } from '@phosphor-icons/react';

export default function ViewTogglePill({ currentView, onToggle }) {
  const isMap = currentView === 'map';

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 px-5 py-3 rounded-pill bg-foreground text-canvas font-bold text-xs shadow-xl border-2 border-border hover:opacity-95 transition-all"
        aria-label={isMap ? 'Switch to List View' : 'Switch to Map View'}
      >
        {isMap ? (
          <>
            <ListBullets size={18} weight="bold" className="text-secondary" />
            <span>View List ({/* mobile count */}Stays)</span>
          </>
        ) : (
          <>
            <MapTrifold size={18} weight="bold" className="text-secondary" />
            <span>View Map</span>
          </>
        )}
      </button>
    </div>
  );
}
