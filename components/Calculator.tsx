'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Coins, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { getAllBanks } from '@/lib/data';
import { BankOffer } from '@/types/bank';
import { trackCalculatorUsed, trackAffiliateClick, trackOfferClick } from '@/lib/analytics';

export function CalculatorSection() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(4000);
  const [monthlySpend, setMonthlySpend] = useState<number>(1200);
  const [savingsAmount, setSavingsAmount] = useState<number>(20000);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const allBanks = useRef<BankOffer[]>(getAllBanks());

  // Calculations:
  // 1. Average top bonus (e.g. 650 zł)
  // 2. Savings on fees vs typical legacy bank (approx. 18 zł/mo = 216 zł/yr)
  // 3. High-yield savings interest (approx. 7% promo on savings for 3 months net of Belka tax: savings * 0.07 * 0.25 * 0.81)
  const promoBonus = 650;
  const feesSaved = 216;
  const interestEarned = Math.round(savingsAmount * 0.07 * 0.25 * 0.81);
  const totalGain = promoBonus + feesSaved + interestEarned;

  // Track event with debounce when user interacts
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      trackCalculatorUsed({
        monthly_income: monthlyIncome,
        monthly_spend: monthlySpend,
        savings_amount: savingsAmount,
        estimated_gain: totalGain,
      });
    }, 1200);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [monthlyIncome, monthlySpend, savingsAmount, totalGain]);

  // Pick top 2 recommended bank offers
  const topOffers = allBanks.current.slice(0, 2);

  return (
    <section id="kalkulator-korzysci" className="my-16 scroll-mt-20">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-3">
            <Calculator className="w-4 h-4 text-blue-400" />
            <span>Interaktywny kalkulator finansowy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Ile możesz zyskać, zmieniając konto na lepsze?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Większość Polaków niepotrzebnie płaci za konto i traci szansę na wysokie premie gotówkowe oraz promocyjne oprocentowanie. Sprawdź swoją szacunkową roczną korzyść.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6 bg-slate-800/70 p-6 sm:p-8 rounded-2xl border border-slate-700/80 backdrop-blur-sm">
            {/* Slider 1: Wpływy */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="income-range" className="text-xs sm:text-sm font-bold text-slate-200">
                  Miesięczne wpływy na konto (wynagrodzenie / przelewy):
                </label>
                <span className="text-base font-extrabold text-blue-400">
                  {monthlyIncome.toLocaleString('pl-PL')} zł
                </span>
              </div>
              <input
                id="income-range"
                type="range"
                min={1000}
                max={20000}
                step={500}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>1 000 zł</span>
                <span>10 000 zł</span>
                <span>20 000 zł+</span>
              </div>
            </div>

            {/* Slider 2: Wydatki kartą */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="spend-range" className="text-xs sm:text-sm font-bold text-slate-200">
                  Miesięczne płatności kartą lub BLIK:
                </label>
                <span className="text-base font-extrabold text-blue-400">
                  {monthlySpend.toLocaleString('pl-PL')} zł
                </span>
              </div>
              <input
                id="spend-range"
                type="range"
                min={200}
                max={8000}
                step={100}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>200 zł</span>
                <span>4 000 zł</span>
                <span>8 000 zł+</span>
              </div>
            </div>

            {/* Slider 3: Oszczędności */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="savings-range" className="text-xs sm:text-sm font-bold text-slate-200">
                  Kwota oszczędności na konto promocyjne (np. 7%):
                </label>
                <span className="text-base font-extrabold text-emerald-400">
                  {savingsAmount.toLocaleString('pl-PL')} zł
                </span>
              </div>
              <input
                id="savings-range"
                type="range"
                min={0}
                max={100000}
                step={1000}
                value={savingsAmount}
                onChange={(e) => setSavingsAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>0 zł</span>
                <span>50 000 zł</span>
                <span>100 000 zł+</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Warunki bezpłatności spełnione automatycznie przy Twoich parametrach</span>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900/80 to-slate-900 p-6 sm:p-8 rounded-2xl border border-blue-500/30 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-300 block mb-1">
                Szacowany roczny zysk dla Ciebie
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  +{totalGain.toLocaleString('pl-PL')} zł
                </span>
                <span className="text-slate-400 text-xs font-semibold">/ pierwszy rok</span>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs sm:text-sm border-t border-slate-700/80 pt-4 mb-6">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    Premia gotówkowa za otwarcie:
                  </span>
                  <span className="font-bold text-white">+{promoBonus} zł</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    Oszczędność na opłatach (0 zł):
                  </span>
                  <span className="font-bold text-white">+{feesSaved} zł</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-emerald-400 shrink-0" />
                    Odsetki z konta oszczędn. (netto):
                  </span>
                  <span className="font-bold text-emerald-400">+{interestEarned} zł</span>
                </div>
              </div>
            </div>

            {/* Top Recommended Offer Button */}
            <div className="space-y-3 pt-2">
              <Link
                href="/ranking-kont-bankowych"
                className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-center text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <span>ZOBACZ NAJLEPSZE KONTA W RANKINGU</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-center text-slate-400">
                Wybierz konto z premią i załóż online w 15 minut
              </p>
            </div>
          </div>
        </div>

        {/* Matched offers quick preview */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">
            Oferty najlepiej dopasowane do Twojego profilu:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topOffers.map((offer, idx) => (
              <div
                key={offer.slug}
                className="bg-slate-800/50 hover:bg-slate-800/90 transition-colors p-4 rounded-xl border border-slate-700 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shrink-0"
                    style={{ backgroundColor: offer.logo_bg }}
                  >
                    {offer.logo_text}
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">{offer.bank}</span>
                    <span className="text-sm font-bold text-white block">{offer.account_name}</span>
                    <span className="text-xs font-extrabold text-emerald-400">Premia: {offer.bonus}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/konto/${offer.slug}`}
                    onClick={() => {
                      trackOfferClick({
                        bank_name: offer.bank,
                        account_name: offer.account_name,
                        offer_id: offer.id,
                        rank_position: idx + 1,
                        cta_label: 'Kalkulator - Szczegóły',
                      });
                    }}
                    className="text-xs px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
                  >
                    Szczegóły
                  </Link>
                  <a
                    href={offer.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    onClick={() => {
                      trackAffiliateClick(offer.bank, offer.account_name, offer.affiliate_url, offer.id, idx + 1);
                      trackOfferClick({
                        bank_name: offer.bank,
                        account_name: offer.account_name,
                        offer_id: offer.id,
                        rank_position: idx + 1,
                        cta_label: 'Kalkulator - Załóż konto',
                      });
                    }}
                    className="text-xs px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-extrabold transition-colors inline-flex items-center gap-1 shadow-md"
                  >
                    <span>Wybierz</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
