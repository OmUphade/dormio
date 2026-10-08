// ui-spec: design-system/dormio/pages/home.md
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import TrustBadges from '@/components/TrustBadges';
import AreaTile from '@/components/AreaTile';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Footer from '@/components/Footer';
import {
  WarningCircle,
  WifiSlash,
  ArrowClockwise,
  CheckCircle,
  Sparkle,
} from '@phosphor-icons/react';

const SAMPLE_AREAS = [
  {
    name: 'Kothrud',
    slug: 'kothrud',
    landmarks: 'Near MIT-WPU, Cummins College, Paud Road',
    count: 142,
    hostelCount: 96,
    messCount: 46,
    avgRent: '₹7,200/mo avg',
    image:
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'FC Road / Shivajinagar',
    slug: 'fc-road',
    landmarks: 'Near Fergusson College, BMCC, Model Colony',
    count: 98,
    hostelCount: 68,
    messCount: 30,
    avgRent: '₹8,500/mo avg',
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Viman Nagar',
    slug: 'viman-nagar',
    landmarks: 'Near Symbiosis Campus, Phoenix Marketcity',
    count: 116,
    hostelCount: 78,
    messCount: 38,
    avgRent: '₹9,800/mo avg',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Hinjewadi Phase 1',
    slug: 'hinjewadi',
    landmarks: 'Near Infosys, Wipro, Quadron Tech Park',
    count: 84,
    hostelCount: 52,
    messCount: 32,
    avgRent: '₹6,800/mo avg',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewState, setViewState] = useState('default'); // 'default' | 'loading' | 'error' | 'offline'

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredAreas =
    activeCategory === 'hostel'
      ? SAMPLE_AREAS.filter((a) => a.hostelCount > 0)
      : activeCategory === 'mess'
        ? SAMPLE_AREAS.filter((a) => a.messCount > 0)
        : SAMPLE_AREAS;

  return (
    <div className="min-h-screen bg-canvas text-foreground flex flex-col">
      <Navbar />

      {/* State Switcher Bar (For Testing & Verification of all states: default, loading, error, offline) */}
      <aside
        aria-label="UI state preview selector"
        className="bg-muted border-b border-border py-2 px-4 text-xs"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium text-muted-foreground">
            <span className="font-semibold text-foreground">State Preview:</span>
            <span>Switch UI state to inspect all design specifications:</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setViewState('default')}
              className={`px-2.5 py-1 rounded-pill font-medium transition-colors ${
                viewState === 'default'
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                  : 'bg-card text-foreground border border-border hover:bg-card'
              }`}
            >
              Default Active
            </button>
            <button
              type="button"
              onClick={() => setViewState('loading')}
              className={`px-2.5 py-1 rounded-pill font-medium transition-colors ${
                viewState === 'loading'
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                  : 'bg-card text-foreground border border-border hover:bg-card'
              }`}
            >
              Loading Skeleton
            </button>
            <button
              type="button"
              onClick={() => setViewState('error')}
              className={`px-2.5 py-1 rounded-pill font-medium transition-colors ${
                viewState === 'error'
                  ? 'bg-secondary text-secondary-foreground font-semibold shadow-sm'
                  : 'bg-card text-foreground border border-border hover:bg-card'
              }`}
            >
              Error State
            </button>
            <button
              type="button"
              onClick={() => setViewState('offline')}
              className={`px-2.5 py-1 rounded-pill font-medium transition-colors ${
                viewState === 'offline'
                  ? 'bg-security text-card font-semibold shadow-sm'
                  : 'bg-card text-foreground border border-border hover:bg-card'
              }`}
            >
              Offline State
            </button>
          </div>
        </div>
      </aside>

      {/* Offline Alert State Banner */}
      {viewState === 'offline' && (
        <div className="bg-security text-card px-4 py-3 border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 font-medium">
              <WifiSlash size={20} weight="bold" />
              <span>
                You are currently offline. Showing cached Pune localities and saved searches from
                your device.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setViewState('default')}
              className="text-xs font-bold underline hover:opacity-90 shrink-0"
            >
              Try Reconnecting
            </button>
          </div>
        </div>
      )}

      {/* Error Alert State Banner */}
      {viewState === 'error' && (
        <div className="bg-muted border-b border-border px-4 py-3 text-foreground">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 text-primary font-medium">
              <WarningCircle size={20} weight="fill" />
              <span>
                Location geocoding service timed out. Please enter your college or locality name
                manually.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setViewState('default')}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-pill hover:bg-secondary transition-colors shrink-0"
            >
              <ArrowClockwise size={14} />
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <HeroBanner
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onSearch={handleSearch}
        isLoading={viewState === 'loading'}
      />

      {/* Trust Badges Strip */}
      <TrustBadges />

      {/* Featured Student Areas Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-bold text-primary tracking-wider uppercase mb-1">
                Local Discovery
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                Popular Student Hubs in Pune
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Explore student residences, co-living PGs, and daily meal messes grouped by
                proximity to top universities.
              </p>
            </div>

            {searchQuery && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-card border border-border text-xs text-foreground font-medium">
                <span>Filter: &ldquo;{searchQuery}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-primary font-bold hover:underline"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Area Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {viewState === 'loading'
              ? [1, 2, 3, 4].map((n) => <AreaTile key={n} isLoading={true} />)
              : filteredAreas.map((area) => (
                  <AreaTile key={area.slug} area={area} isLoading={false} />
                ))}
          </div>
        </div>
      </section>

      {/* Why Choose Dormio Editorial Strip */}
      <section className="py-12 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-md bg-muted text-primary flex items-center justify-center font-bold text-lg mb-3">
                <CheckCircle size={22} weight="fill" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">
                Direct UPI Rent Payments
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No middleman escrow holding your deposit. You transfer rent directly to the owner’s
                verified UPI VPA. Dormio records the UTR and generates an instant tax-ready receipt.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-md bg-muted text-mess flex items-center justify-center font-bold text-lg mb-3">
                <Sparkle size={22} weight="fill" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">
                Integrated Meal Messes
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect your hostel stay to local daily dining messes. View daily breakfast and
                dinner menus in advance, skip meals when away, and receive automatic billing
                rebates.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-md bg-muted text-accent flex items-center justify-center font-bold text-lg mb-3">
                <CheckCircle size={22} weight="fill" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">
                Resident Digital Outpass & Gate Pass
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No physical registers or sign-out logs. Request night outpasses digitally with
                instant guardian and warden approvals and rotating QR security check-ins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialCarousel />

      <Footer />
    </div>
  );
}
