'use client';

import React from 'react';
import {
  Clock,
  CalendarBlank,
  UsersThree,
  ShieldCheck,
  Camera,
  ForkKnife,
  LockKey,
} from '@phosphor-icons/react';

export default function RulesAccordion({
  curfew = '10:00 PM',
  noticePeriod = '30 days',
  visitorPolicy = 'Visitors permitted in lounge until 8:00 PM',
  hasCctv = true,
  hasGuard = true,
  hasBiometric = true,
  messDetails = null,
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">
        House Rules & Safety Standards
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Curfew */}
        <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
          <div className="w-9 h-9 rounded-md bg-muted text-primary flex items-center justify-center shrink-0">
            <Clock size={20} weight="fill" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">Gate Curfew</div>
            <div className="font-heading font-bold text-sm text-foreground">{curfew}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Digital late-pass available on Dormio app with warden approval.
            </div>
          </div>
        </div>

        {/* Notice Period */}
        <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
          <div className="w-9 h-9 rounded-md bg-muted text-secondary flex items-center justify-center shrink-0">
            <CalendarBlank size={20} weight="fill" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">Notice Period</div>
            <div className="font-heading font-bold text-sm text-foreground">{noticePeriod}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Full deposit refund upon checkout subject to agreement clearance.
            </div>
          </div>
        </div>

        {/* Visitor Policy */}
        <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
          <div className="w-9 h-9 rounded-md bg-muted text-accent flex items-center justify-center shrink-0">
            <UsersThree size={20} weight="fill" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">Visitor Policy</div>
            <div className="font-heading font-bold text-sm text-foreground">Guests in Lounge</div>
            <div className="text-xs text-muted-foreground mt-0.5">{visitorPolicy}</div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
          <div className="w-9 h-9 rounded-md bg-muted text-security flex items-center justify-center shrink-0">
            <LockKey size={20} weight="fill" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">Gate & Surveillance</div>
            <div className="font-heading font-bold text-sm text-foreground">
              {hasCctv ? 'CCTV Active' : 'Monitored Entry'}
              {hasGuard ? ' · 24x7 Guard' : ''}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {hasBiometric
                ? 'Rotating QR check-in & physical security logs.'
                : 'Registered resident entry.'}
            </div>
          </div>
        </div>
      </div>

      {/* Mess Details Section if attached */}
      {messDetails && (
        <div className="mt-4 p-4 rounded-lg bg-canvas border border-border flex items-start gap-3">
          <div className="w-9 h-9 rounded-md bg-muted text-mess flex items-center justify-center shrink-0">
            <ForkKnife size={20} weight="fill" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-foreground">
                Attached Dining Mess: {messDetails.name}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-pill bg-muted text-mess">
                {messDetails.cuisine}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Timings: Breakfast 7:30–9:30 AM · Dinner 7:30–10:00 PM. Residents can pause meals
              directly on Dormio to get monthly rebates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
