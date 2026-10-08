'use client';

import React from 'react';
import { House, Buildings, ForkKnife, Sparkle } from '@phosphor-icons/react';

const CATEGORIES = [
  { id: 'all', label: 'All Stays & Meals', icon: Sparkle, badge: 'Popular' },
  { id: 'hostel', label: 'Hostels', icon: House, badge: '500+ Beds' },
  { id: 'pg', label: 'PG & Co-living', icon: Buildings, badge: 'Rooms & Flats' },
  { id: 'mess', label: 'Daily Messes', icon: ForkKnife, badge: 'Monthly Plans' },
];

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-pill text-sm font-semibold whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-card text-foreground border-border hover:bg-muted'
            }`}
          >
            <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
            <span>{cat.label}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-pill font-medium ${
                isActive
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {cat.badge}
            </span>
          </button>
        );
      })}
    </div>
  );
}
