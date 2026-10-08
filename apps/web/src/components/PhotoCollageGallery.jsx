'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, CaretLeft, CaretRight, Images } from '@phosphor-icons/react';

export default function PhotoCollageGallery({ photos = [], title = 'Property Gallery' }) {
  const [mobileIndex, setMobileIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm">
        <Camera size={24} className="mr-2" /> No photos available
      </div>
    );
  }

  const prev = () => {
    setMobileIndex((curr) => (curr === 0 ? photos.length - 1 : curr - 1));
  };

  const next = () => {
    setMobileIndex((curr) => (curr === photos.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className="w-full">
      {/* Desktop & Tablet: 5-Photo Architectural Collage */}
      <div className="hidden sm:grid grid-cols-4 gap-3 h-[420px] rounded-lg overflow-hidden relative">
        {/* Main Hero Photo (Takes 2 cols & full height) */}
        <div className="col-span-2 relative h-full bg-muted overflow-hidden group">
          <Image
            src={photos[0]}
            alt={`${title} - Primary room view`}
            fill
            sizes="(max-width: 1024px) 50vw, 600px"
            priority
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 2nd & 3rd Photo Column */}
        <div className="grid grid-rows-2 gap-3 h-full">
          <div className="relative h-full bg-muted overflow-hidden group">
            <Image
              src={photos[1] || photos[0]}
              alt={`${title} - Study space`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-full bg-muted overflow-hidden group">
            <Image
              src={photos[2] || photos[0]}
              alt={`${title} - Washroom or amenities`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* 4th & 5th Photo Column with 'View All' Badge */}
        <div className="grid grid-rows-2 gap-3 h-full">
          <div className="relative h-full bg-muted overflow-hidden group">
            <Image
              src={photos[3] || photos[0]}
              alt={`${title} - Common lounge`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-full bg-muted overflow-hidden group">
            <Image
              src={photos[4] || photos[0]}
              alt={`${title} - Dining hall`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* View All Button */}
            <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center p-2">
              <span className="px-3 py-1.5 rounded-pill bg-card text-foreground font-semibold text-xs border border-border shadow-md flex items-center gap-1.5 hover:bg-muted transition-colors cursor-pointer">
                <Images size={16} className="text-primary" />
                <span>View all {photos.length} photos</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Carousel with Counter */}
      <div className="sm:hidden relative h-64 w-full rounded-lg overflow-hidden bg-muted">
        <Image
          src={photos[mobileIndex]}
          alt={`${title} - Photo ${mobileIndex + 1}`}
          fill
          sizes="100vw"
          priority
          unoptimized
          className="object-cover"
        />

        {/* Left/Right Controls */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/90 text-foreground flex items-center justify-center shadow-md border border-border"
          aria-label="Previous photo"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/90 text-foreground flex items-center justify-center shadow-md border border-border"
          aria-label="Next photo"
        >
          <CaretRight size={16} weight="bold" />
        </button>

        {/* Photo Counter */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-pill bg-foreground/80 text-canvas text-xs font-semibold">
          {mobileIndex + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
}
