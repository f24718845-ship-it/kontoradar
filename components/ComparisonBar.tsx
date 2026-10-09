'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, X, ArrowRight } from 'lucide-react';
import { BankOffer } from '@/types/bank';
import { trackComparisonStarted } from '@/lib/analytics';

interface ComparisonBarProps {
  selectedOffers: BankOffer[];
  onRemove: (slug: string) => void;
  onClear: () => void;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  selectedOffers,
  onRemove,
  onClear,
}) => {
  if (selectedOffers.length === 0) return null;

  return (
    <aside aria-label="Pasek porównywania ofert" className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-700 shadow-2xl py-3 px-4 animate-in slide-in-from-bottom-4 duration-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-2">
              <span>Porównanie ofert</span>
              <span className="bg-blue-500/30 text-blue-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {selectedOffers.length} / 4
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Wybierz do 4 ofert i sprawdź różnice parametrów obok siebie
            </p>
          </div>
        </div>

        {/* Selected chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedOffers.map((offer) => (
            <div
              key={offer.slug}
              className="flex items-center gap-1.5 bg-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700"
            >
              <span className="font-semibold">{offer.bank}</span>
              <button
                type="button"
                onClick={() => onRemove(offer.slug)}
                className="text-slate-400 hover:text-red-400 ml-1 p-0.5"
                title="Usuń z porównania"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 transition-colors"
          >
            Wyczyść
          </button>

          <Link
            href={`/porownywarka-kont-bankowych?ids=${selectedOffers.map((o) => o.slug).join(',')}`}
            onClick={() => {
              trackComparisonStarted(
                selectedOffers.length,
                selectedOffers.map((o) => o.bank)
              );
            }}
            className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg transition-all"
          >
            <span>Porównaj teraz</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
