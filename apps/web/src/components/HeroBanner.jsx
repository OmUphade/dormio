'use client';

import React from 'react';
import Image from 'next/image';
import AreaSearchBar from './AreaSearchBar';
import CategoryTabs from './CategoryTabs';
import { ShieldCheck, CurrencyInr, DeviceMobile } from '@phosphor-icons/react';

export default function HeroBanner({ activeCategory, onSelectCategory, onSearch, isLoading }) {
  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subhead, Search & Tabs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-card border border-border text-xs font-semibold text-primary shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Pune Student & Professional Housing Hub
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight leading-tight">
              Find a place you trust in minutes.{' '}
              <span className="text-primary block">Live with zero paperwork.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Verified student hostels, PGs, and daily meal messes near your campus. Direct UPI rent
              payments, verified owners, and resident stay manager in one place.
            </p>

            {/* Category selection */}
            <div className="w-full pt-1">
              <CategoryTabs activeCategory={activeCategory} onSelectCategory={onSelectCategory} />
            </div>

            {/* Pill Search Bar */}
            <div className="w-full pt-1">
              <AreaSearchBar onSearch={onSearch} isLoading={isLoading} />
            </div>

            {/* Quick Proof Micro-Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-mess" weight="fill" />
                100% Owner Verified
              </span>
              <span className="flex items-center gap-1.5">
                <CurrencyInr size={16} className="text-primary" weight="bold" />
                Zero Broker Fees
              </span>
              <span className="flex items-center gap-1.5">
                <DeviceMobile size={16} className="text-accent" weight="fill" />
                Resident Pass Included
              </span>
            </div>
          </div>

          {/* Right Column: Arched Photographic Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Arched Photo Container */}
              <div className="relative rounded-arch overflow-hidden border-4 border-card shadow-xl bg-card aspect-[4/5] max-h-[480px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
                  alt="Modern verified student room with study desk and natural light"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  unoptimized
                  className="object-cover"
                />

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-card p-4 rounded-lg border border-border shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Featured Hostel
                      </div>
                      <div className="font-heading font-bold text-sm text-foreground">
                        Greenview Scholars Residency
                      </div>
                      <div className="text-xs text-muted-foreground">
                        FC Road, Shivajinagar · 200m from Fergusson
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">From</div>
                      <div className="font-heading font-bold text-primary text-base">
                        ₹7,500<span className="text-xs text-muted-foreground font-normal">/mo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Verified Trust Tag */}
              <div className="absolute -top-4 -left-4 bg-card border-2 border-border p-3 rounded-lg shadow-lg flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-mess">
                  <ShieldCheck size={20} weight="fill" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Dormio Inspected</div>
                  <div className="text-xs text-muted-foreground">Physical premises verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
