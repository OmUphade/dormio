'use client';

import React from 'react';
import {
  SlidersHorizontal,
  CaretDown,
  X,
  ShieldCheck,
  Camera,
  Buildings,
  ForkKnife,
} from '@phosphor-icons/react';

export default function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  activeFilterCount,
}) {
  return (
    <div className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Filter Controls */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full md:w-auto">
            {/* Filter Count Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-muted border border-border text-xs font-semibold text-foreground shrink-0">
              <SlidersHorizontal size={14} className="text-primary" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </div>

            {/* Kind Dropdown */}
            <div className="relative shrink-0">
              <select
                value={filters.kind}
                onChange={(e) => onFilterChange('kind', e.target.value)}
                className="appearance-none bg-card border border-border text-xs font-medium text-foreground rounded-pill px-3 py-1.5 pr-7 focus:outline-none focus:border-primary hover:bg-muted cursor-pointer"
                aria-label="Filter by accommodation kind"
              >
                <option value="all">All Stays & Messes</option>
                <option value="hostel">Hostels Only</option>
                <option value="pg">PG & Co-living</option>
                <option value="mess">Daily Messes Only</option>
              </select>
              <CaretDown
                size={12}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
              />
            </div>

            {/* Budget / Max Rent Dropdown */}
            <div className="relative shrink-0">
              <select
                value={filters.maxRent}
                onChange={(e) => onFilterChange('maxRent', e.target.value)}
                className="appearance-none bg-card border border-border text-xs font-medium text-foreground rounded-pill px-3 py-1.5 pr-7 focus:outline-none focus:border-primary hover:bg-muted cursor-pointer"
                aria-label="Filter by maximum rent"
              >
                <option value="any">Max Budget (Any)</option>
                <option value="6000">Under ₹6,000</option>
                <option value="8500">Under ₹8,500</option>
                <option value="12000">Under ₹12,000</option>
                <option value="15000">Under ₹15,000</option>
              </select>
              <CaretDown
                size={12}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
              />
            </div>

            {/* Gender Dropdown */}
            <div className="relative shrink-0">
              <select
                value={filters.gender}
                onChange={(e) => onFilterChange('gender', e.target.value)}
                className="appearance-none bg-card border border-border text-xs font-medium text-foreground rounded-pill px-3 py-1.5 pr-7 focus:outline-none focus:border-primary hover:bg-muted cursor-pointer"
                aria-label="Filter by gender"
              >
                <option value="all">Gender (Any)</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="coed">Co-ed</option>
              </select>
              <CaretDown
                size={12}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
              />
            </div>

            {/* Sharing Dropdown */}
            <div className="relative shrink-0">
              <select
                value={filters.sharing}
                onChange={(e) => onFilterChange('sharing', e.target.value)}
                className="appearance-none bg-card border border-border text-xs font-medium text-foreground rounded-pill px-3 py-1.5 pr-7 focus:outline-none focus:border-primary hover:bg-muted cursor-pointer"
                aria-label="Filter by room sharing"
              >
                <option value="all">Sharing (Any)</option>
                <option value="single">Single Room</option>
                <option value="double">Double Sharing</option>
                <option value="triple">Triple Sharing</option>
                <option value="four">4+ Sharing</option>
              </select>
              <CaretDown
                size={12}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
              />
            </div>

            {/* CCTV Security Quick Toggle */}
            <button
              type="button"
              onClick={() => onFilterChange('cctv', !filters.cctv)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-pill text-xs font-medium transition-colors shrink-0 border ${
                filters.cctv
                  ? 'bg-security text-card border-security font-semibold'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted'
              }`}
            >
              <Camera size={14} weight={filters.cctv ? 'fill' : 'regular'} />
              <span>CCTV Security</span>
            </button>

            {/* Verified Only Quick Toggle */}
            <button
              type="button"
              onClick={() => onFilterChange('verified', !filters.verified)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-pill text-xs font-medium transition-colors shrink-0 border ${
                filters.verified
                  ? 'bg-mess text-card border-mess font-semibold'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted'
              }`}
            >
              <ShieldCheck size={14} weight={filters.verified ? 'fill' : 'regular'} />
              <span>Verified Only</span>
            </button>

            {/* Reset Button */}
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={onResetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-primary font-semibold hover:underline shrink-0"
              >
                <X size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right: Results Count & Sort */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto text-xs border-t md:border-t-0 pt-2 md:pt-0">
            <span className="text-muted-foreground font-medium">
              <strong className="text-foreground font-bold">{totalResults}</strong> properties found
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-muted-foreground font-medium">Sort:</span>
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => onFilterChange('sort', e.target.value)}
                  className="appearance-none bg-card border border-border text-xs font-semibold text-foreground rounded-pill px-3 py-1.5 pr-6 focus:outline-none focus:border-primary hover:bg-muted cursor-pointer"
                  aria-label="Sort listings"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Rent: Low to High</option>
                  <option value="price-desc">Rent: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
                <CaretDown
                  size={12}
                  className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
