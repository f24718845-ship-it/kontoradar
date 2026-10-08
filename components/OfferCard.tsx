'use client';

import React from 'react';
import Link from 'next/link';
import { BankOffer } from '@/types/bank';
import { trackAffiliateClick, trackEvent } from '@/lib/analytics';
import { 
  Check, 
  ExternalLink, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  Plus, 
  CheckSquare, 
  Square,
  Sparkles,
  Smartphone,
  CreditCard
} from 'lucide-react';

interface OfferCardProps {
  offer: BankOffer;
  isCompared?: boolean;
  onToggleCompare?: (slug: string) => void;
  rankPosition?: number;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  isCompared = false,
  onToggleCompare,
  rankPosition,
}) => {
  const handleCtaClick = () => {
    trackAffiliateClick(offer.bank, offer.account_name, offer.affiliate_url, offer.id);
  };

  return (
    <div
      className={`relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-xl hover:border-blue-300 overflow-hidden flex flex-col justify-between ${
        offer.is_promoted
          ? 'border-blue-200 shadow-md ring-1 ring-blue-500/10'
          : 'border-slate-200 shadow-sm'
      }`}
    >
      {/* Top Banner (Badge / Rank Position) */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2">
          {rankPosition && (
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 text-white font-extrabold text-xs shadow-sm">
              #{rankPosition}
            </span>
          )}
          {offer.badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100/80 text-blue-800 border border-blue-200/60">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              {offer.badge}
            </span>
          )}
        </div>

        {/* Comparison toggle */}
        {onToggleCompare && (
          <button
            type="button"
            onClick={() => onToggleCompare(offer.slug)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
              isCompared
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/60'
            }`}
          >
            {isCompared ? (
              <>
                <CheckSquare className="w-4 h-4" />
                <span>Wybrano</span>
              </>
            ) : (
              <>
                <Square className="w-4 h-4" />
                <span>Porównaj</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Bank Brand & Titles */}
          <div className="flex items-start gap-4">
            {/* Visual Bank Emblem */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-sm tracking-wider shadow-md shrink-0 border border-white/20 select-none"
              style={{ backgroundColor: offer.logo_bg }}
            >
              <span className="truncate px-1 font-bold text-center leading-tight">
                {offer.logo_text}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {offer.bank}
              </span>
              <Link
                href={`/konto/${offer.slug}`}
                className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors inline-block mt-0.5"
              >
                {offer.account_name}
              </Link>

              {/* Rating 0-10 & Verification Date */}
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>OCENA: {offer.rating.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ostatnia weryfikacja: {offer.last_verified}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Financial Metrics (Bonus, Fees) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 shrink-0 lg:w-auto">
            {/* Bonus */}
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-medium">Bonus / Premia</span>
              <span className="text-lg font-extrabold text-emerald-600">
                {offer.bonus}
              </span>
              <span className="text-[11px] text-slate-500 line-clamp-1">{offer.bonus_short}</span>
            </div>

            {/* Monthly Fee */}
            <div className="flex flex-col border-l border-slate-200 pl-3">
              <span className="text-xs text-slate-500 font-medium">Prowadzenie</span>
              <span className="text-lg font-extrabold text-slate-900">
                {offer.monthly_fee}
              </span>
              <span className="text-[11px] text-slate-500">bezwarunkowo lub warunkowo</span>
            </div>

            {/* Card Fee */}
            <div className="flex flex-col border-l border-slate-200 pl-3 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-500 font-medium">Karta debetowa</span>
              <span className="text-lg font-extrabold text-slate-900">
                {offer.card_fee}
              </span>
              <span className="text-[11px] text-slate-500">zależnie od aktywności</span>
            </div>
          </div>
        </div>

        {/* 3-5 Key Features / Advantages */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {offer.pros.slice(0, 4).map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Wniosek online bez wychodzenia z domu</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href={`/konto/${offer.slug}`}
            className="flex-1 sm:flex-initial text-center px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            Szczegóły oferty
          </Link>

          <a
            href={offer.affiliate_url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={handleCtaClick}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
          >
            <span>SPRAWDŹ OFERTĘ</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
