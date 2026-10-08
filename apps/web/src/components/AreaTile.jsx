'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Buildings, ForkKnife } from '@phosphor-icons/react';

export default function AreaTile({ area, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm animate-pulse">
        <div className="h-44 bg-muted w-full"></div>
        <div className="p-4 space-y-3">
          <div className="h-5 bg-muted rounded w-2/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/search?area=${encodeURIComponent(area.slug)}`}
      className="group block bg-card rounded-lg border border-border hover:border-primary transition-all overflow-hidden shadow-sm hover:shadow-md"
    >
      {/* Photo with Arch Header effect */}
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        <Image
          src={area.image}
          alt={`Student housing and rooms in ${area.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-card px-2.5 py-1 rounded-pill text-xs font-semibold text-primary border border-border shadow-sm flex items-center gap-1">
          <MapPin size={12} weight="fill" />
          <span>{area.name}</span>
        </div>
        <div className="absolute bottom-3 right-3 bg-card px-2.5 py-1 rounded-md text-xs font-bold text-foreground border border-border shadow-sm">
          {area.avgRent}
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors">
            {area.name}
          </h3>
          <span className="text-xs font-semibold text-muted-foreground">
            {area.count} properties
          </span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-1 mb-3">{area.landmarks}</p>

        {/* Feature Pill Tags */}
        <div className="flex items-center gap-3 pt-2 border-t border-border text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1">
            <Buildings size={14} className="text-primary" />
            {area.hostelCount} Stays
          </span>
          <span className="flex items-center gap-1">
            <ForkKnife size={14} className="text-mess" />
            {area.messCount} Messes
          </span>
        </div>
      </div>
    </Link>
  );
}
