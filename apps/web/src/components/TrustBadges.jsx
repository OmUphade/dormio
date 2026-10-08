'use client';

import React from 'react';
import { ShieldCheck, QrCode, DeviceMobile, UsersThree, LockKey } from '@phosphor-icons/react';

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: '100% Verified Owners',
    desc: 'Every hostel, PG and mess undergoes physical premises inspection and KYC review.',
    tagColor: 'text-mess',
    bgColor: 'bg-muted',
  },
  {
    icon: QrCode,
    title: 'Direct UPI to Owner',
    desc: 'Zero platform commissions or wallet lock-ins. Pay directly to the owner UPI VPA with instant UTR tracking.',
    tagColor: 'text-primary',
    bgColor: 'bg-muted',
  },
  {
    icon: DeviceMobile,
    title: 'Resident Stay App',
    desc: 'Manage your monthly rent receipts, daily mess meal passes, complaints, and gate entry passes on your phone.',
    tagColor: 'text-accent',
    bgColor: 'bg-muted',
  },
  {
    icon: LockKey,
    title: 'Strict Gate Security',
    desc: 'Optional QR check-in, real-time guardian alerts, and emergency broadcast support.',
    tagColor: 'text-security',
    bgColor: 'bg-muted',
  },
];

export default function TrustBadges() {
  return (
    <section id="why-dormio" className="py-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Metric Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-border gap-4">
          <div>
            <div className="text-xs font-bold text-primary tracking-wider uppercase mb-1">
              Safety & Transparency First
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
              Why 12,000+ residents choose Dormio
            </h2>
          </div>
          <div className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            <div className="flex items-center gap-2">
              <UsersThree size={22} className="text-primary" weight="fill" />
              <span>
                <strong className="text-foreground font-bold">500+</strong> Verified Stays
              </span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div>
              <strong className="text-foreground font-bold">12,000+</strong> Active Residents
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-lg bg-canvas border border-border flex flex-col justify-between hover:border-primary transition-colors"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-md ${item.bgColor} ${item.tagColor} flex items-center justify-center mb-4`}
                  >
                    <Icon size={26} weight="fill" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
