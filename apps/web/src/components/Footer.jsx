'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-border">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                D
              </div>
              <span className="font-heading font-bold text-2xl text-foreground">Dormio</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              India’s student and professional accommodation marketplace. Find hostels, PGs, and
              verified messes by college or area with direct UPI payments.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <ShieldCheck size={16} className="text-mess" weight="fill" />
              <span>Zero fake listings · 100% physically inspected properties</span>
            </div>
          </div>

          {/* Column 1: Popular Localities */}
          <div>
            <h4 className="font-heading font-bold text-sm text-foreground mb-3">
              Popular Localities
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/search?area=kothrud" className="hover:text-primary transition-colors">
                  Kothrud, Pune
                </Link>
              </li>
              <li>
                <Link href="/search?area=fc-road" className="hover:text-primary transition-colors">
                  FC Road / Shivajinagar
                </Link>
              </li>
              <li>
                <Link
                  href="/search?area=viman-nagar"
                  className="hover:text-primary transition-colors"
                >
                  Viman Nagar
                </Link>
              </li>
              <li>
                <Link
                  href="/search?area=hinjewadi"
                  className="hover:text-primary transition-colors"
                >
                  Hinjewadi Phase 1
                </Link>
              </li>
              <li>
                <Link href="/search?area=katraj" className="hover:text-primary transition-colors">
                  Katraj / BVDU
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="font-heading font-bold text-sm text-foreground mb-3">
              Browse Categories
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/search?type=boys-hostel"
                  className="hover:text-primary transition-colors"
                >
                  Boys Hostels
                </Link>
              </li>
              <li>
                <Link
                  href="/search?type=girls-hostel"
                  className="hover:text-primary transition-colors"
                >
                  Girls Hostels
                </Link>
              </li>
              <li>
                <Link href="/search?type=pg" className="hover:text-primary transition-colors">
                  Co-living & PGs
                </Link>
              </li>
              <li>
                <Link href="/search?type=mess" className="hover:text-mess transition-colors">
                  Daily Mess Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/search?type=ac-rooms" className="hover:text-primary transition-colors">
                  AC Single Rooms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Owners */}
          <div>
            <h4 className="font-heading font-bold text-sm text-foreground mb-3">
              For Property Owners
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/owner/register" className="font-semibold text-primary hover:underline">
                  List Your Property Free
                </Link>
              </li>
              <li>
                <Link href="/owner/dashboard" className="hover:text-primary transition-colors">
                  Operator Console
                </Link>
              </li>
              <li>
                <Link href="/owner/pricing" className="hover:text-primary transition-colors">
                  Direct UPI Settlement
                </Link>
              </li>
              <li>
                <Link href="/owner/guidelines" className="hover:text-primary transition-colors">
                  Verification Criteria
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <div className="flex items-center gap-1">
            <span>© 2026 Dormio Technologies. Built with</span>
            <Heart size={14} className="text-secondary inline" weight="fill" />
            <span>for students & owners.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/safety" className="hover:text-foreground transition-colors">
              Safety Standards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
