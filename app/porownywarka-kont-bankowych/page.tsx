'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getAllBanks } from '@/lib/data';
import { BankOffer } from '@/types/bank';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  trackAffiliateClick, 
  trackOfferClick, 
  trackComparisonStarted, 
  trackComparisonCompleted 
} from '@/lib/analytics';
import { 
  Scale, 
  Check, 
  X, 
  ExternalLink, 
  Plus, 
  Star, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

function ComparisonContent() {
  const allBanks = useMemo(() => getAllBanks(), []);
  const searchParams = useSearchParams();

  // Selected slugs from URL or default top 3
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const completedTrackedRef = useRef<string>('');

  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (idsParam) {
      const split = idsParam.split(',').filter((s) => allBanks.some((b) => b.slug === s));
      if (split.length > 0) {
        setSelectedSlugs(split.slice(0, 4));
        return;
      }
    }
    // Default top 3
    setSelectedSlugs(['pekao-konto-przekorzystne', 'mbank-ekonto-do-uslug', 'nest-bank-nest-konto']);
  }, [searchParams, allBanks]);

  const selectedBanks = useMemo(() => {
    return selectedSlugs
      .map((slug) => allBanks.find((b) => b.slug === slug))
      .filter((b): b is BankOffer => b !== undefined);
  }, [selectedSlugs, allBanks]);

  // Track comparison_completed when comparison table with 2+ offers is viewed
  useEffect(() => {
    if (selectedBanks.length >= 2) {
      const key = selectedBanks.map((b) => b.slug).sort().join(',');
      if (completedTrackedRef.current !== key) {
        completedTrackedRef.current = key;
        trackComparisonCompleted(selectedBanks.length, selectedBanks.map((b) => b.bank));
      }
    }
  }, [selectedBanks]);

  const handleAddBank = (slug: string) => {
    if (selectedSlugs.length < 4 && !selectedSlugs.includes(slug)) {
      const nextSlugs = [...selectedSlugs, slug];
      setSelectedSlugs(nextSlugs);
      const bank = allBanks.find((b) => b.slug === slug);
      trackComparisonStarted(nextSlugs.length, [
        ...selectedBanks.map((b) => b.bank),
        bank?.bank || slug,
      ]);
    }
  };

  const handleRemoveBank = (slug: string) => {
    if (selectedSlugs.length > 1) {
      setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
    } else {
      alert('Wybierz co najmniej 1 ofertę do porównania.');
    }
  };

  const unselectedBanks = useMemo(() => {
    return allBanks.filter((b) => !selectedSlugs.includes(b.slug));
  }, [allBanks, selectedSlugs]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Porównywarka kont bankowych' },
          ]}
        />

        {/* Heading */}
        <div className="my-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <Scale className="w-4 h-4 text-blue-600" />
            <span>Narzędzie porównawcze</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Porównywarka kont bankowych
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Zestaw obok siebie do 4 kont osobistych i sprawdź dokładne opłaty, warunki premii, bankomaty oraz płatności mobilne.
          </p>
        </div>

        {/* Add Offer Dropdown */}
        {selectedSlugs.length < 4 && unselectedBanks.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 max-w-2xl mx-auto shadow-sm">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-blue-600" />
              Dodaj konto do porównania:
            </span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAddBank(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Wybierz bank z listy...</option>
              {unselectedBanks.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.bank} – {b.account_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* COMPARISON TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              {/* Header row with bank cards */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 sm:p-6 w-1/5 text-xs uppercase font-extrabold text-slate-400 align-top">
                    Parametr
                  </th>
                  {selectedBanks.map((b) => (
                    <th key={b.slug} className="p-4 sm:p-6 w-1/4 align-top">
                      <div className="flex flex-col justify-between h-full space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-blue-600 uppercase block">
                              {b.bank}
                            </span>
                            <span className="text-base font-extrabold text-slate-900 block mt-0.5">
                              {b.account_name}
                            </span>
                          </div>
                          {selectedBanks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveBank(b.slug)}
                              className="text-slate-400 hover:text-red-500 p-1"
                              title="Usuń z porównania"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 w-fit">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{b.rating.toFixed(1)}/10</span>
                        </div>

                        {/* CTA button */}
                        <a
                          href={b.affiliate_url}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          onClick={() => {
                            trackAffiliateClick(b.bank, b.account_name, b.affiliate_url, b.id);
                            trackOfferClick({
                              bank_name: b.bank,
                              account_name: b.account_name,
                              offer_id: b.id,
                              cta_label: 'Porównywarka - SPRAWDŹ OFERTĘ',
                              destination_url: b.affiliate_url,
                            });
                          }}
                          className="flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition-all"
                        >
                          <span>SPRAWDŹ OFERTĘ</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Data Rows */}
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-800">
                {/* 1. Bonus */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Bonus / Premia</td>
                  {selectedBanks.map((b) => (
                    <td key={b.slug} className="p-4 font-black text-emerald-600 text-base">
                      {b.bonus}
                      <span className="block text-xs font-normal text-slate-500 mt-1">{b.bonus_short}</span>
                    </td>
                  ))}
                </tr>

                {/* 2. Prowadzenie konta */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Prowadzenie konta</td>
                  {selectedBanks.map((b) => (
                    <td key={b.slug} className="p-4">
                      <span className="font-extrabold text-slate-900">{b.monthly_fee}</span>
                      <span className="block text-xs text-slate-500 mt-1">{b.monthly_fee_condition}</span>
                    </td>
                  ))}
                </tr>

                {/* 3. Karta do konta */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Opłata za kartę</td>
                  {selectedBanks.map((b) => (
                    <td key={b.slug} className="p-4">
                      <span className="font-extrabold text-slate-900">{b.card_fee}</span>
                      <span className="block text-xs text-slate-500 mt-1">{b.card_fee_condition}</span>
                    </td>
                  ))}
                </tr>

                {/* 4. Bankomaty */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Wypłaty z bankomatów</td>
                  {selectedBanks.map((b) => (
                    <td key={b.slug} className="p-4 leading-relaxed">
                      {b.atm_withdrawals}
                    </td>
                  ))}
                </tr>

                {/* 5. BLIK */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Płatności BLIK</td>
                  {selectedBanks.map((b) => (
                    <td key={b.slug} className="p-4">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold mb-1">
                        <Check className="w-4 h-4" />
                        <span>Dostępny (0 zł)</span>
                      </div>
                      <span className="text-xs text-slate-500">{b.blik_details}</span>
                    </td>
                  ))}
                </tr>

                {/* 6. Apple Pay & Google Pay */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Płatności mobilne</td>
                  {selectedBanks.map((b) => (
                    <td key={b.slug} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {b.mobile_payments.map((p, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 7. Przelewy Elixir */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Przelewy internetowe</td>
                  {selectedBanks.map((b) => (
                    <td key={b.slug} className="p-4">
                      {b.transfers}
                    </td>
                  ))}
                </tr>

                {/* 8. Założenie online */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Wniosek online</td>
                  {selectedBanks.map((b) => (
                    <td key={b.slug} className="p-4">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold mb-1">
                        <Check className="w-4 h-4" />
                        <span>Tak (100% online)</span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {b.online_opening_methods.join(', ')}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 9. Wymogi aktywności */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Wymagania obrotu</td>
                  {selectedBanks.map((b) => (
                    <td key={b.slug} className="p-4 text-xs text-slate-600">
                      <div><strong>Wpływy:</strong> {b.income_requirements}</div>
                      <div className="mt-1"><strong>Transakcje:</strong> {b.transaction_requirements}</div>
                    </td>
                  ))}
                </tr>

                {/* 10. Link do recenzji */}
                <tr className="hover:bg-slate-50/50 bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Pełna analiza</td>
                  {selectedBanks.map((b) => (
                    <td key={b.slug} className="p-4">
                      <Link
                        href={`/konto/${b.slug}`}
                        onClick={() => {
                          trackOfferClick({
                            bank_name: b.bank,
                            account_name: b.account_name,
                            offer_id: b.id,
                            cta_label: 'Porównywarka - Zobacz szczegółową recenzję',
                            destination_url: `/konto/${b.slug}`,
                          });
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Zobacz szczegółową recenzję &rarr;
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparisonPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Ładowanie porównywarki...</div>}>
      <ComparisonContent />
    </Suspense>
  );
}
