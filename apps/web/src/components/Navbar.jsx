'use client';

import React from 'react';
import Link from 'next/link';
import { House, MapPin, ForkKnife, ShieldCheck } from '@phosphor-icons/react';

export default function Navbar() {
  return (
    <header className="w-full bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & City Selector */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-sm">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-2xl text-foreground tracking-tight">
                  Dormio
                </span>
                <span className="text-xs text-muted-foreground font-medium -mt-1 hidden sm:block">
                  Verified Stays & Messes
                </span>
              </div>
            </Link>

            {/* City Selector Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-muted border border-border text-xs font-medium text-foreground">
              <MapPin size={14} className="text-primary" weight="fill" />
              <span>Pune, Maharashtra</span>
            </div>
          </div>

          {/* Nav Categories */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link
              href="/search?type=hostel"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <House size={16} />
              <span>Hostels & PGs</span>
            </Link>
            <Link
              href="/search?type=mess"
              className="hover:text-mess transition-colors flex items-center gap-1.5"
            >
              <ForkKnife size={16} />
              <span>Daily Messes</span>
            </Link>
            <Link
              href="#why-dormio"
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck size={16} />
              <span>Why Dormio</span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/owner/register"
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-pill border border-border bg-card text-foreground hover:bg-muted transition-colors"
            >
              List Property
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-pill bg-primary text-primary-foreground hover:bg-secondary transition-colors shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
