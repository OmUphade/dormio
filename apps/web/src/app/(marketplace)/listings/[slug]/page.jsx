// ui-spec: design-system/dormio/pages/listing-detail.md
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PhotoCollageGallery from '@/components/PhotoCollageGallery';
import RoomTypeSelector from '@/components/RoomTypeSelector';
import RulesAccordion from '@/components/RulesAccordion';
import RatingBreakdown from '@/components/RatingBreakdown';
import StickyBookingCard from '@/components/StickyBookingCard';
import Footer from '@/components/Footer';
import {
  MapPin,
  Star,
  ShieldCheck,
  Camera,
  ShareNetwork,
  Heart,
  WifiHigh,
  Fan,
  Drop,
  Desktop,
  Lightning,
  Sparkle,
  WarningCircle,
  WifiSlash,
  ArrowClockwise,
  CheckCircle,
} from '@phosphor-icons/react';

const PROPERTY_DATA = {
  title: 'Greenview Scholars Residency',
  kind: 'hostel',
  gender: 'Boys Hostel',
  locality: 'FC Road, Shivajinagar, Pune',
  address: 'Plot 42, Lane 3, Near Fergusson College Main Gate, Pune 411004',
  distance: '200m from Fergusson College',
  rating: 4.8,
  reviewCount: 38,
  isVerified: true,
  hasCctv: true,
  hasGuard: true,
  hasBiometric: true,
  curfew: '10:00 PM (Weekdays) · 10:30 PM (Weekends)',
  noticePeriod: '30 Days',
  visitorPolicy: 'Visitors allowed in ground floor study lounge until 8:00 PM.',
  photos: [
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
  ],
  roomTypes: [
    {
      id: 'double-ac',
      name: 'Double Sharing AC',
      sharing: '2 Beds per room',
      ac: true,
      rent: 8500,
      deposit: 15000,
      availableBeds: 2,
      attachedBath: true,
    },
    {
      id: 'triple-non-ac',
      name: 'Triple Sharing Standard',
      sharing: '3 Beds per room',
      ac: false,
      rent: 6500,
      deposit: 12000,
      availableBeds: 4,
      attachedBath: true,
    },
    {
      id: 'single-executive',
      name: 'Single Executive Private',
      sharing: '1 Bed private room',
      ac: true,
      rent: 12500,
      deposit: 20000,
      availableBeds: 1,
      attachedBath: true,
    },
  ],
  amenities: [
    { label: 'High Speed Wi-Fi (100 Mbps)', icon: WifiHigh },
    { label: 'Air Conditioned Rooms', icon: Fan },
    { label: 'Purified RO Drinking Water', icon: Drop },
    { label: 'Ergonomic Study Desks', icon: Desktop },
    { label: '24x7 Power Backup', icon: Lightning },
    { label: 'Daily Room Cleaning', icon: Sparkle },
  ],
  messDetails: {
    name: 'Greenview Pure Veg Dining Hall',
    cuisine: 'Maharashtrian & North Indian Daily Meals',
  },
  reviews: [
    {
      author: 'Ananya Joshi',
      college: 'Fergusson College (B.Sc Computer Science)',
      roomType: 'Double Sharing AC',
      duration: 'Resident for 8 months',
      rating: 5,
      comment:
        'The location is unbeatable if you study at Fergusson. 2 minutes walk to the gate. Mess food is hygienic and homely, and rent receipts are generated automatically via Dormio.',
    },
    {
      author: 'Sameer Kulkarni',
      college: 'BMCC Pune',
      roomType: 'Single Executive Private',
      duration: 'Resident for 1 year',
      rating: 5,
      comment:
        'Peaceful environment for exams. Wi-Fi has zero drops, and the biometric gate with curfew keeps everything secure and quiet after 10 PM.',
    },
    {
      author: 'Kunal Patil',
      college: 'COEP Tech',
      roomType: 'Triple Sharing Standard',
      duration: 'Resident for 4 months',
      rating: 4,
      comment:
        'Great value for money in the FC Road area. The warden handles maintenance requests logged through the Dormio app within a few hours.',
    },
  ],
};

export default function ListingDetailPage() {
  const [selectedRoomId, setSelectedRoomId] = useState('double-ac');
  const [viewState, setViewState] = useState('default'); // 'default' | 'loading' | 'error' | 'offline'
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const selectedRoom =
    PROPERTY_DATA.roomTypes.find((r) => r.id === selectedRoomId) || PROPERTY_DATA.roomTypes[0];

  const handleBook = (room, date) => {
    setInquirySubmitted(true);
  };

  const handleScheduleVisit = (date) => {
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-canvas text-foreground flex flex-col">
      <Navbar />

      {/* State Preview Switcher Bar */}
      <aside
        aria-label="UI state preview selector"
        className="bg-muted border-b border-border py-2 px-4 text-xs"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium text-muted-foreground">
            <span className="font-semibold text-foreground">Listing States:</span>
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

      {/* Offline Alert Banner */}
      {viewState === 'offline' && (
        <div className="bg-security text-card px-4 py-3 border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 font-medium">
              <WifiSlash size={20} weight="bold" />
              <span>
                Offline mode: Viewing cached property details. Booking inquiries will be dispatched
                once you reconnect.
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
              <span>Listing details could not be synchronized with owner records.</span>
            </div>
            <button
              type="button"
              onClick={() => setViewState('default')}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-pill hover:bg-secondary transition-colors shrink-0"
            >
              <ArrowClockwise size={14} />
              Retry Sync
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-muted-foreground mb-4"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/search" className="hover:text-primary transition-colors">
            Pune Stays
          </Link>
          <span>/</span>
          <Link href="/search?area=fc-road" className="hover:text-primary transition-colors">
            FC Road
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">{PROPERTY_DATA.title}</span>
        </nav>

        {/* Loading State Placeholder */}
        {viewState === 'loading' ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-[400px] bg-muted rounded-lg w-full"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-4">
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="h-24 bg-muted rounded"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
              <div className="lg:col-span-4 h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Title & Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-pill bg-primary text-primary-foreground text-xs font-semibold">
                    {PROPERTY_DATA.gender}
                  </span>
                  {PROPERTY_DATA.isVerified && (
                    <span className="px-2.5 py-0.5 rounded-pill bg-muted text-mess text-xs font-semibold flex items-center gap-1 border border-border">
                      <ShieldCheck size={14} weight="fill" />
                      100% Owner Verified
                    </span>
                  )}
                  {PROPERTY_DATA.hasCctv && (
                    <span className="px-2.5 py-0.5 rounded-pill bg-card text-security text-xs font-semibold flex items-center gap-1 border border-border">
                      <Camera size={14} weight="fill" />
                      CCTV Monitored
                    </span>
                  )}
                </div>

                <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">
                  {PROPERTY_DATA.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <MapPin size={16} weight="fill" />
                    {PROPERTY_DATA.locality}
                  </span>
                  <span>·</span>
                  <span className="font-medium text-foreground">{PROPERTY_DATA.distance}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-secondary font-bold">
                    <Star size={16} weight="fill" />
                    {PROPERTY_DATA.rating} ({PROPERTY_DATA.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Share & Save Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  className="p-2.5 rounded-pill bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                  aria-label="Share property"
                >
                  <ShareNetwork size={16} />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  className="p-2.5 rounded-pill bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                  aria-label="Save to favorites"
                >
                  <Heart size={16} className="text-secondary" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Photo Collage Gallery */}
            <PhotoCollageGallery photos={PROPERTY_DATA.photos} title={PROPERTY_DATA.title} />

            {/* 2-Column Split: Content (68%) / Sticky Booking (32%) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
              {/* Left Column */}
              <div className="md:col-span-7 lg:col-span-8 space-y-8">
                {/* Inquiry confirmation notification if triggered */}
                {inquirySubmitted && (
                  <div className="p-4 rounded-lg bg-card border-2 border-mess text-foreground shadow-sm flex items-start gap-3">
                    <CheckCircle size={24} className="text-mess shrink-0 mt-0.5" weight="fill" />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-foreground">
                        Inquiry Sent to Mr. Rajesh Kulkarni!
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        The property owner has been notified. You can pay your reservation token
                        directly via UPI or visit the property at your scheduled time.
                      </p>
                    </div>
                  </div>
                )}

                {/* About the Property */}
                <section className="space-y-3">
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    About this Residence
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Greenview Scholars Residency is a premier student hostel located in the heart of
                    Pune on FC Road. Specifically tailored for students of Fergusson College, BMCC,
                    and COEP, the property provides quiet study floors, high-speed fiber internet,
                    and three fresh meals daily. Strict 10 PM curfew and physical CCTV surveillance
                    ensure complete peace of mind for parents and residents.
                  </p>
                </section>

                {/* Room Types Selector */}
                <section className="pt-2">
                  <RoomTypeSelector
                    roomTypes={PROPERTY_DATA.roomTypes}
                    selectedRoomId={selectedRoomId}
                    onSelectRoom={setSelectedRoomId}
                  />
                </section>

                {/* Amenities Matrix */}
                <section className="space-y-4 pt-2">
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    Property Amenities & Inclusions
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PROPERTY_DATA.amenities.map((am) => {
                      const Icon = am.icon;
                      return (
                        <div
                          key={am.label}
                          className="p-3 rounded-lg bg-card border border-border flex items-center gap-2.5 text-xs font-medium text-foreground"
                        >
                          <div className="w-8 h-8 rounded-md bg-muted text-primary flex items-center justify-center shrink-0">
                            <Icon size={18} weight="bold" />
                          </div>
                          <span>{am.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* House Rules & Safety Standards */}
                <section className="pt-2">
                  <RulesAccordion
                    curfew={PROPERTY_DATA.curfew}
                    noticePeriod={PROPERTY_DATA.noticePeriod}
                    visitorPolicy={PROPERTY_DATA.visitorPolicy}
                    hasCctv={PROPERTY_DATA.hasCctv}
                    hasGuard={PROPERTY_DATA.hasGuard}
                    hasBiometric={PROPERTY_DATA.hasBiometric}
                    messDetails={PROPERTY_DATA.messDetails}
                  />
                </section>

                {/* Rating Breakdown & Verified Reviews */}
                <section className="pt-2">
                  <RatingBreakdown
                    overallRating={PROPERTY_DATA.rating}
                    totalReviews={PROPERTY_DATA.reviewCount}
                    reviews={PROPERTY_DATA.reviews}
                  />
                </section>
              </div>

              {/* Right Column: Sticky Reservation Panel */}
              <div className="md:col-span-5 lg:col-span-4">
                <StickyBookingCard
                  selectedRoom={selectedRoom}
                  ownerName="Mr. Rajesh Kulkarni"
                  ownerResponseTime="Usually responds in 15 mins"
                  onBook={handleBook}
                  onScheduleVisit={handleScheduleVisit}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
