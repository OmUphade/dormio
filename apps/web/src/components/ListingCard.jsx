'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Star,
  ShieldCheck,
  Camera,
  WifiHigh,
  ForkKnife,
  CheckCircle,
} from '@phosphor-icons/react';

export default function ListingCard({ listing, isHovered, onMouseEnter, onMouseLeave }) {
  const isMess = listing.kind === 'mess';

  return (
    <article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group bg-card rounded-lg border transition-all overflow-hidden shadow-sm flex flex-col sm:flex-row ${
        isHovered
          ? 'border-primary ring-2 ring-primary shadow-md'
          : 'border-border hover:border-primary'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative sm:w-64 h-48 sm:h-auto overflow-hidden bg-muted shrink-0">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 100vw, 260px"
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Kind Tag */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className={`px-2.5 py-0.5 rounded-pill text-xs font-semibold shadow-sm ${
              isMess ? 'bg-mess text-card' : 'bg-primary text-primary-foreground'
            }`}
          >
            {isMess ? 'Daily Mess' : listing.gender}
          </span>
          {listing.isVerified && (
            <span className="px-2 py-0.5 rounded-pill text-xs font-semibold bg-card text-mess border border-border shadow-sm flex items-center gap-1">
              <ShieldCheck size={12} weight="fill" />
              Verified
            </span>
          )}
        </div>

        {/* CCTV Badge if enabled */}
        {listing.hasCctv && (
          <div className="absolute bottom-3 left-3 bg-card px-2 py-0.5 rounded-md text-xs font-medium text-security border border-border shadow-sm flex items-center gap-1">
            <Camera size={12} weight="fill" />
            <span>CCTV Secured</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <MapPin size={14} className="text-primary shrink-0" weight="fill" />
                <span>{listing.locality}</span>
                <span>·</span>
                <span className="font-medium text-foreground">{listing.distance}</span>
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                <Link href={`/listings/${listing.slug}`}>{listing.title}</Link>
              </h3>
            </div>

            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted border border-border text-xs font-bold text-foreground shrink-0">
              <Star size={14} className="text-secondary" weight="fill" />
              <span>{listing.rating}</span>
              <span className="text-muted-foreground font-normal">({listing.reviewCount})</span>
            </div>
          </div>

          {/* Sub details: Amenities / Cuisine */}
          {isMess ? (
            <div className="space-y-1.5 my-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ForkKnife size={14} className="text-mess" weight="fill" />
                <span className="font-semibold text-foreground">{listing.cuisine}</span>
                <span>({listing.dietType})</span>
              </div>
              <p className="line-clamp-1">{listing.sampleMenu}</p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2 my-3">
              <span className="px-2 py-0.5 rounded-md bg-muted text-xs font-medium text-foreground">
                {listing.sharing}
              </span>
              {listing.hasMessAttached && (
                <span className="px-2 py-0.5 rounded-md bg-muted text-xs font-medium text-mess">
                  Mess Attached
                </span>
              )}
              {listing.amenities.map((a) => (
                <span
                  key={a}
                  className="px-2 py-0.5 rounded-md bg-canvas border border-border text-xs text-muted-foreground"
                >
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Row: Price & CTA */}
        <div className="pt-3 border-t border-border flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-muted-foreground">
              {isMess ? 'Monthly Plan from' : 'Rent from'}
            </div>
            <div className="font-heading font-bold text-lg sm:text-xl text-primary">
              ₹{listing.rent.toLocaleString('en-IN')}
              <span className="text-xs text-muted-foreground font-normal">/month</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/listings/${listing.slug}`}
              className="px-4 py-2 rounded-pill bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-secondary transition-colors shadow-sm"
            >
              {isMess ? 'View Menu' : 'View Details'}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
