'use client';

import React from 'react';
import { Star, ShieldCheck, CheckCircle } from '@phosphor-icons/react';

const CRITERIA = [
  { label: 'Cleanliness & Hygiene', score: '4.9', width: '98%' },
  { label: 'Safety & Security', score: '4.9', width: '98%' },
  { label: 'Food & Mess Quality', score: '4.7', width: '94%' },
  { label: 'Value for Money', score: '4.8', width: '96%' },
];

export default function RatingBreakdown({ overallRating = 4.8, totalReviews = 38, reviews = [] }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-4">
        <div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">
            Resident Ratings & Reviews
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Only residents with verified UTR rent receipts can submit reviews on Dormio.
          </p>
        </div>

        {/* Overall Rating Pill */}
        <div className="flex items-center gap-3 bg-card px-4 py-2.5 rounded-lg border border-border shadow-sm shrink-0">
          <div className="font-heading font-bold text-3xl text-primary">{overallRating}</div>
          <div>
            <div className="flex items-center gap-1 text-secondary">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} weight="fill" />
              ))}
            </div>
            <div className="text-xs text-muted-foreground font-medium mt-0.5">
              {totalReviews} verified reviews
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CRITERIA.map((crit) => (
          <div key={crit.label} className="p-3 rounded-lg bg-card border border-border">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="text-foreground">{crit.label}</span>
              <span className="font-bold text-primary">{crit.score} / 5.0</span>
            </div>
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: crit.width }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Verified Reviews Cards Stream */}
      <div className="space-y-3 pt-2">
        {reviews.map((rev) => (
          <div key={rev.author} className="p-4 rounded-lg bg-card border border-border shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
                  <span>{rev.author}</span>
                  <span className="px-2 py-0.5 rounded-pill bg-muted text-mess text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck size={12} weight="fill" />
                    Verified Resident
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {rev.college} · Stayed in {rev.roomType} · {rev.duration}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-secondary">
                <Star size={14} weight="fill" />
                <span>{rev.rating}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
              &ldquo;{rev.comment}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
