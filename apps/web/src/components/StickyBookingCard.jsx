'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  QrCode,
  CalendarCheck,
  CheckCircle,
  CurrencyInr,
  User,
} from '@phosphor-icons/react';

export default function StickyBookingCard({
  selectedRoom,
  ownerName = 'Mr. Rajesh Kulkarni',
  ownerResponseTime = 'Usually responds in 15 mins',
  onBook,
  onScheduleVisit,
}) {
  const [moveInDate, setMoveInDate] = useState('2026-10-15');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const rent = selectedRoom?.rent || 7500;
  const deposit = selectedRoom?.deposit || 15000;
  const roomName = selectedRoom?.name || 'Double Sharing AC';

  return (
    <>
      {/* Desktop & Tablet Sticky Panel */}
      <aside
        aria-label="Booking and reservation card"
        className="hidden md:block bg-card rounded-lg border border-border p-6 shadow-md space-y-5 sticky top-24"
      >
        {/* Pricing Header */}
        <div className="pb-4 border-b border-border">
          <div className="text-xs text-muted-foreground font-medium mb-1">Selected Room Rent</div>
          <div className="flex items-baseline gap-1">
            <span className="font-heading font-bold text-3xl text-primary">
              ₹{rent.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <span className="font-semibold text-foreground">{roomName}</span>
            <span>· Deposit: ₹{deposit.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Move-in Date Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1">
            <CalendarCheck size={14} className="text-primary" />
            <span>Target Move-in Date</span>
          </label>
          <input
            type="date"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            className="w-full bg-canvas border border-border rounded-md px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Cost Summary Box */}
        <div className="p-3.5 rounded-md bg-canvas border border-border space-y-2 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>First Month Rent</span>
            <span className="font-semibold text-foreground">₹{rent.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Refundable Security Deposit</span>
            <span className="font-semibold text-foreground">
              ₹{deposit.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between text-mess font-semibold pt-1 border-t border-border">
            <span>Dormio Brokerage Fee</span>
            <span>₹0 (100% Free)</span>
          </div>
        </div>

        {/* Direct UPI Notice */}
        <div className="p-3 rounded-md bg-muted border border-border flex items-start gap-2.5">
          <QrCode size={20} className="text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-semibold block">Direct UPI to Owner</strong>
            Pay token or rent directly to the owner&apos;s verified VPA. We verify the UTR and issue
            instant receipts.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={() => onBook && onBook(selectedRoom, moveInDate)}
            className="w-full py-3 rounded-pill bg-primary text-primary-foreground font-heading font-bold text-sm hover:bg-secondary transition-colors shadow-md text-center block"
          >
            Enquire / Book Room
          </button>

          <button
            type="button"
            onClick={() => onScheduleVisit && onScheduleVisit(moveInDate)}
            className="w-full py-2.5 rounded-pill bg-card border border-border text-foreground font-semibold text-xs hover:bg-muted transition-colors text-center block"
          >
            Schedule Free Visit
          </button>
        </div>

        {/* Owner Info & Response Tag */}
        <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-primary font-bold">
              <User size={14} weight="bold" />
            </div>
            <div>
              <div className="font-semibold text-foreground">{ownerName}</div>
              <div className="text-muted-foreground text-xs">{ownerResponseTime}</div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-pill bg-muted text-mess text-xs font-semibold flex items-center gap-1">
            <ShieldCheck size={12} weight="fill" />
            KYC Verified
          </span>
        </div>
      </aside>

      {/* Mobile Floating Action Bar (Always Reachable) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border p-3 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-muted-foreground">Rent from</div>
            <div className="font-heading font-bold text-lg text-primary">
              ₹{rent.toLocaleString('en-IN')}
              <span className="text-xs text-muted-foreground font-normal">/mo</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onScheduleVisit && onScheduleVisit(moveInDate)}
              className="px-3 py-2 rounded-pill bg-canvas border border-border text-foreground font-semibold text-xs"
            >
              Visit
            </button>
            <button
              type="button"
              onClick={() => onBook && onBook(selectedRoom, moveInDate)}
              className="px-5 py-2.5 rounded-pill bg-primary text-primary-foreground font-bold text-xs shadow-md"
            >
              Book / Enquire
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
