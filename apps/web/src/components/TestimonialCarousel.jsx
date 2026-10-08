'use client';

import React, { useState } from 'react';
import { CaretLeft, CaretRight, ShieldCheck, Quotes } from '@phosphor-icons/react';

const TESTIMONIALS = [
  {
    quote:
      'Found my PG on FC Road in 20 minutes without paying a single rupee to brokers. The direct UPI payment and resident pass on Dormio made moving seamless.',
    author: 'Ananya Joshi',
    role: 'Fergusson College Student',
    stay: 'Greenview Scholars Residency · FC Road',
    room: 'Double Occupancy AC',
  },
  {
    quote:
      'The mess subscription feature is a lifesaver. I can see the daily menu, skip meals when I go home for the weekend, and get rebates directly into my balance.',
    author: 'Rohan Deshmukh',
    role: 'COEP Tech Graduate',
    stay: 'Skyline Executive PG & Mess · Shivajinagar',
    room: 'Single Room + Full Mess Plan',
  },
  {
    quote:
      'Zero landlord drama. Rent receipts are generated automatically every month with verified UTR numbers. Our warden uses the Dormio notice board for everything.',
    author: 'Priya Sharma',
    role: 'Symbiosis Law School',
    stay: 'Comfort Living Hostel · Viman Nagar',
    room: 'Triple Sharing Bed',
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? TESTIMONIALS.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === TESTIMONIALS.length - 1 ? 0 : curr + 1));
  };

  return (
    <section className="py-12 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-primary tracking-wider uppercase mb-1">
              Real Experiences
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
              What verified residents say
            </h2>
          </div>

          {/* Carousel Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              aria-label="Previous review"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              aria-label="Next review"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>
        </div>

        {/* 3 Testimonial Cards (Visible on desktop; active highlighted on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => {
            const isHighlight = idx === currentIndex;
            return (
              <div
                key={t.author}
                className={`p-6 rounded-lg bg-card border transition-all flex flex-col justify-between ${
                  isHighlight
                    ? 'border-primary ring-2 ring-primary shadow-md'
                    : 'border-border opacity-85 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quotes size={32} className="text-secondary" weight="fill" />
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill bg-muted text-mess text-xs font-semibold">
                      <ShieldCheck size={14} weight="fill" />
                      Verified Stay
                    </span>
                  </div>

                  <p className="text-sm text-foreground leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="font-heading font-bold text-sm text-foreground">{t.author}</div>
                  <div className="text-xs text-primary font-medium">{t.role}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {t.stay} ({t.room})
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
