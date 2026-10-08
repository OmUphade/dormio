'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MagnifyingGlass, MapPin, X, GraduationCap } from '@phosphor-icons/react';

const SUGGESTIONS = [
  { name: 'Kothrud', landmark: 'Near MIT-WPU & Cummins College', count: 142, type: 'area' },
  {
    name: 'FC Road / Shivajinagar',
    landmark: 'Near Fergusson College & BMCC',
    count: 98,
    type: 'area',
  },
  {
    name: 'Viman Nagar',
    landmark: 'Near Symbiosis Campus & Phoenix Mall',
    count: 116,
    type: 'area',
  },
  {
    name: 'Hinjewadi Phase 1',
    landmark: 'Near Infosys & Wipro Tech Park',
    count: 84,
    type: 'area',
  },
  {
    name: 'Katraj / Bharati Vidyapeeth',
    landmark: 'Near BVDU Campus & Lake',
    count: 76,
    type: 'area',
  },
  {
    name: 'COEP / Shivaji Nagar',
    landmark: 'College of Engineering Pune',
    count: 45,
    type: 'college',
  },
];

export default function AreaSearchBar({ onSearch, isLoading = false }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = query.trim()
    ? SUGGESTIONS.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.landmark.toLowerCase().includes(query.toLowerCase())
      )
    : SUGGESTIONS;

  const handleSelect = (item) => {
    setQuery(item.name);
    setIsOpen(false);
    if (onSearch) onSearch(item.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (onSearch) onSearch(query || 'Pune');
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-2 bg-card rounded-pill border-2 border-primary shadow-md focus-within:ring-2 focus-within:ring-primary"
      >
        <div className="pl-3 text-primary">
          <MagnifyingGlass size={22} weight="bold" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by college, area, or landmark (e.g. FC Road, Kothrud)..."
          className="w-full bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none px-2 py-1"
          aria-label="Search area or college"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="p-1 text-muted-foreground hover:text-foreground rounded-full"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        <button
          type="submit"
          className="px-6 py-2.5 rounded-pill bg-primary text-primary-foreground font-semibold text-sm hover:bg-secondary transition-colors shrink-0"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card rounded-lg border border-border shadow-lg z-50 overflow-hidden">
          {isLoading ? (
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
              <div className="h-8 bg-muted rounded w-full animate-pulse"></div>
              <div className="h-8 bg-muted rounded w-full animate-pulse"></div>
            </div>
          ) : filtered.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {query.trim() ? 'Matching Localities & Colleges' : 'Popular Student Areas in Pune'}
              </div>
              {filtered.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center justify-between transition-colors border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-primary shrink-0">
                      {item.type === 'college' ? (
                        <GraduationCap size={18} weight="fill" />
                      ) : (
                        <MapPin size={18} weight="fill" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.landmark}</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-pill bg-canvas text-primary shrink-0">
                    {item.count} stays
                  </span>
                </button>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-muted text-secondary mx-auto flex items-center justify-center mb-3">
                <MapPin size={24} />
              </div>
              <div className="font-heading font-semibold text-foreground text-sm mb-1">
                No properties found in &ldquo;{query}&rdquo;
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                We are rapidly adding new verified hostels and messes. Try these popular student
                hubs:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTIONS.slice(0, 3).map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="px-3 py-1.5 rounded-pill bg-muted text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
