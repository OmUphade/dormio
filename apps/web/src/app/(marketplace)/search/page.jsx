// ui-spec: design-system/dormio/pages/search.md
'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import ListingCard from '@/components/ListingCard';
import MapView from '@/components/MapView';
import ViewTogglePill from '@/components/ViewTogglePill';
import Footer from '@/components/Footer';
import {
  WarningCircle,
  WifiSlash,
  ArrowClockwise,
  MagnifyingGlass,
  FunnelX,
} from '@phosphor-icons/react';

const MOCK_LISTINGS = [
  {
    id: '1',
    slug: 'greenview-scholars-residency',
    title: 'Greenview Scholars Residency',
    kind: 'hostel',
    gender: 'Boys Hostel',
    locality: 'FC Road, Shivajinagar',
    distance: '200m from Fergusson College',
    rent: 7500,
    rating: 4.8,
    reviewCount: 38,
    isVerified: true,
    hasCctv: true,
    sharing: 'Double & Triple Sharing',
    hasMessAttached: true,
    amenities: ['Wi-Fi 100Mbps', 'AC', 'Attached Bath', 'Power Backup'],
    image:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    slug: 'skyline-executive-coliving',
    title: 'Skyline Executive Co-living',
    kind: 'pg',
    gender: 'Co-ed PG',
    locality: 'Kothrud, Paud Road',
    distance: '400m from MIT-WPU Campus',
    rent: 8900,
    rating: 4.6,
    reviewCount: 42,
    isVerified: true,
    hasCctv: true,
    sharing: 'Single & Double Rooms',
    hasMessAttached: false,
    amenities: ['High Speed Wi-Fi', 'Study Desks', 'Housekeeping', 'RO Water'],
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    slug: 'comfort-living-girls-residency',
    title: 'Comfort Living Girls Residency',
    kind: 'hostel',
    gender: 'Girls Hostel',
    locality: 'Viman Nagar',
    distance: '300m from Symbiosis Law Campus',
    rent: 9800,
    rating: 4.9,
    reviewCount: 56,
    isVerified: true,
    hasCctv: true,
    sharing: 'Single & Double AC',
    hasMessAttached: true,
    amenities: ['24x7 Security', 'Biometric Gate', 'AC', 'Laundry'],
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    slug: 'sai-krupa-annapurna-mess',
    title: 'Sai Krupa Annapurna Mess',
    kind: 'mess',
    gender: 'All Residents',
    locality: 'FC Road / Deccan',
    distance: 'Near BMCC & Fergusson',
    rent: 3200,
    rating: 4.7,
    reviewCount: 84,
    isVerified: true,
    hasCctv: false,
    cuisine: 'Maharashtrian & North Indian Thali',
    dietType: 'Pure Veg',
    sampleMenu: 'Poli, Dal Tadka, Seasonal Bhaji, Jeera Rice, Gulab Jamun on Sunday',
    amenities: ['Two Meals Daily', 'Skip Meal Rebate', 'Hygiene Certified'],
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    slug: 'techzone-hostel-hinjewadi',
    title: 'Techzone Professional Living',
    kind: 'pg',
    gender: 'Boys PG',
    locality: 'Hinjewadi Phase 1',
    distance: '500m from Infosys Gate 1',
    rent: 6800,
    rating: 4.5,
    reviewCount: 29,
    isVerified: true,
    hasCctv: true,
    sharing: 'Double Sharing',
    hasMessAttached: true,
    amenities: ['Power Backup', 'Wi-Fi', '2-Wheeler Parking'],
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '6',
    slug: 'shree-ganesh-bhojanalay',
    title: 'Shree Ganesh Student Bhojanalay',
    kind: 'mess',
    gender: 'All Residents',
    locality: 'Kothrud, Near Cummins College',
    distance: '150m from Karve Road',
    rent: 3000,
    rating: 4.6,
    reviewCount: 61,
    isVerified: true,
    hasCctv: false,
    cuisine: 'Home-style Maharashtrian Thali',
    dietType: 'Veg & Non-Veg Days',
    sampleMenu: 'Chapati, 2 Sabzi, Dal, Rice, Salad, Chicken Thali on Wednesday',
    amenities: ['Lunch & Dinner', 'Rotating QR Pass', 'Trial Meal Available'],
    image:
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
  },
];

const INITIAL_FILTERS = {
  kind: 'all',
  maxRent: 'any',
  gender: 'all',
  sharing: 'all',
  cctv: false,
  verified: false,
  sort: 'recommended',
};

export default function SearchPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [hoveredListingId, setHoveredListingId] = useState(null);
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'map'
  const [viewState, setViewState] = useState('default'); // 'default' | 'loading' | 'error' | 'offline'

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Count active filters (excluding sort and defaults)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.kind !== 'all') count++;
    if (filters.maxRent !== 'any') count++;
    if (filters.gender !== 'all') count++;
    if (filters.sharing !== 'all') count++;
    if (filters.cctv) count++;
    if (filters.verified) count++;
    return count;
  }, [filters]);

  // Filter listings
  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => {
      // Kind
      if (filters.kind === 'hostel' && item.kind !== 'hostel') return false;
      if (filters.kind === 'pg' && item.kind !== 'pg') return false;
      if (filters.kind === 'mess' && item.kind !== 'mess') return false;

      // Max Rent
      if (filters.maxRent !== 'any') {
        const max = parseInt(filters.maxRent, 10);
        if (item.rent > max) return false;
      }

      // Gender (for hostels/PGs)
      if (
        filters.gender === 'boys' &&
        !item.gender.toLowerCase().includes('boys') &&
        item.kind !== 'mess'
      )
        return false;
      if (
        filters.gender === 'girls' &&
        !item.gender.toLowerCase().includes('girls') &&
        item.kind !== 'mess'
      )
        return false;
      if (
        filters.gender === 'coed' &&
        !item.gender.toLowerCase().includes('co-ed') &&
        item.kind !== 'mess'
      )
        return false;

      // Sharing
      if (filters.sharing === 'single' && !item.sharing?.toLowerCase().includes('single'))
        return false;
      if (filters.sharing === 'double' && !item.sharing?.toLowerCase().includes('double'))
        return false;
      if (filters.sharing === 'triple' && !item.sharing?.toLowerCase().includes('triple'))
        return false;

      // CCTV
      if (filters.cctv && !item.hasCctv) return false;

      // Verified
      if (filters.verified && !item.isVerified) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sort === 'price-asc') return a.rent - b.rent;
      if (filters.sort === 'price-desc') return b.rent - a.rent;
      if (filters.sort === 'rating') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-canvas text-foreground flex flex-col">
      <Navbar />

      {/* State Switcher Preview Bar (For Testing & Verification) */}
      <aside
        aria-label="UI state preview selector"
        className="bg-muted border-b border-border py-2 px-4 text-xs"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium text-muted-foreground">
            <span className="font-semibold text-foreground">Search States:</span>
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
              Default Results
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

      {/* Offline Alert Banner */}
      {viewState === 'offline' && (
        <div className="bg-security text-card px-4 py-3 border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 font-medium">
              <WifiSlash size={20} weight="bold" />
              <span>
                You are offline. Showing cached search results and price pins for Pune student
                areas.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setViewState('default')}
              className="text-xs font-bold underline hover:opacity-90 shrink-0"
            >
              Reconnect
            </button>
          </div>
        </div>
      )}

      {/* Error Alert Banner */}
      {viewState === 'error' && (
        <div className="bg-muted border-b border-border px-4 py-3 text-foreground">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 text-primary font-medium">
              <WarningCircle size={20} weight="fill" />
              <span>Unable to load live map coordinates. Showing listings in text view.</span>
            </div>
            <button
              type="button"
              onClick={() => setViewState('default')}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-pill hover:bg-secondary transition-colors shrink-0"
            >
              <ArrowClockwise size={14} />
              Retry Map
            </button>
          </div>
        </div>
      )}

      {/* Filter Rail Component */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={filteredListings.length}
        activeFilterCount={activeFilterCount}
      />

      {/* Main Dual-Pane Container: Stream (Left) + Interactive Map (Right) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Results Column (Hidden on mobile if map view is toggled) */}
          <div
            className={`lg:col-span-7 space-y-4 ${
              mobileView === 'map' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Loading State */}
            {viewState === 'loading' ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="bg-card rounded-lg border border-border p-4 h-48 animate-pulse flex flex-col sm:flex-row gap-4"
                  >
                    <div className="w-full sm:w-60 h-36 sm:h-full bg-muted rounded-md shrink-0"></div>
                    <div className="flex-1 space-y-3 pt-2">
                      <div className="h-5 bg-muted rounded w-2/3"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-8 bg-muted rounded w-1/3 mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredListings.length > 0 ? (
              /* Results List */
              <div className="space-y-4">
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    isHovered={hoveredListingId === listing.id}
                    onMouseEnter={() => setHoveredListingId(listing.id)}
                    onMouseLeave={() => setHoveredListingId(null)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-card border border-border rounded-lg p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-muted text-primary mx-auto flex items-center justify-center mb-4">
                  <FunnelX size={28} />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  No stays found matching these filters
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
                  We couldn&apos;t find any properties under ₹
                  {filters.maxRent !== 'any' ? filters.maxRent : 'selected budget'} with your
                  current filter selections. Try relaxing some filters or exploring nearby
                  localities.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-pill bg-primary text-primary-foreground font-semibold text-xs hover:bg-secondary transition-colors"
                  >
                    Reset All Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilterChange('maxRent', 'any')}
                    className="px-5 py-2.5 rounded-pill bg-card border border-border text-foreground font-semibold text-xs hover:bg-muted transition-colors"
                  >
                    Remove Budget Limit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Map Column (Sticky on desktop, full-screen on mobile when toggled) */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-24 h-[550px] lg:h-[calc(100vh-140px)] ${
              mobileView === 'list' ? 'hidden lg:block' : 'block'
            }`}
          >
            <MapView
              listings={filteredListings}
              hoveredId={hoveredListingId}
              onPinHover={setHoveredListingId}
              selectedArea="FC Road & Kothrud Hub"
            />
          </div>
        </div>
      </main>

      {/* Floating Bottom View Toggle Pill for Mobile */}
      <ViewTogglePill
        currentView={mobileView}
        onToggle={() => setMobileView((curr) => (curr === 'list' ? 'map' : 'list'))}
      />

      <Footer />
    </div>
  );
}
