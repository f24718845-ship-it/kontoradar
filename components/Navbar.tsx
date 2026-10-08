'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Menu, X, ArrowRight, ShieldCheck, Scale, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/ranking-kont-bankowych', label: 'Ranking 2026' },
    { href: '/porownywarka-kont-bankowych', label: 'Porównywarka' },
    { href: '/konto-bankowe-z-bonusem', label: 'Premie i Bonusy' },
    { href: '/darmowe-konto-bankowe', label: 'Darmowe konta' },
    { href: '/konto-bankowe-dla-mlodych', label: 'Dla młodych' },
    { href: '/blog', label: 'Poradniki' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top micro-bar for trust */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Niezależny ranking i porównywarka kont bankowych w Polsce
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Aktualizacja: Październik 2026</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <Link href="/jak-tworzymy-ranking" className="hover:text-white transition-colors">
              Jak oceniamy oferty?
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/afiliacja" className="hover:text-white transition-colors">
              Zasady afiliacji
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo showSlogan={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 font-bold'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/porownywarka-kont-bankowych"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm shadow-blue-500/20 transition-all hover:shadow-md hover:shadow-blue-500/30"
            >
              <Scale className="w-4 h-4" />
              Porównaj konta
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-100 mt-2 flex flex-col gap-2">
              <Link
                href="/porownywarka-kont-bankowych"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md"
              >
                <Scale className="w-5 h-5" />
                Otwórz porównywarkę ofert
              </Link>
              <div className="flex justify-between items-center text-xs text-slate-500 px-2 pt-2">
                <Link href="/jak-tworzymy-ranking" onClick={() => setMobileMenuOpen(false)}>
                  Metodyka rankingu
                </Link>
                <Link href="/afiliacja" onClick={() => setMobileMenuOpen(false)}>
                  Transparentność
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
