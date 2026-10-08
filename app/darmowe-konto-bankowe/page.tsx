import React from 'react';
import { Metadata } from 'next';
import { getAllBanks } from '@/lib/data';
import { OfferCard } from '@/components/OfferCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection, FAQItem } from '@/components/FAQSection';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Darmowe Konto Bankowe 2026 – Konta za 0 zł Bez Ukrytych Opłat',
  description: 'Szukasz konta za 0 zł? Sprawdź zestawienie darmowych kont bankowych: 0 zł za otwarcie, prowadzenie i kartę. Zobacz, które banki nie wymagają wpływów.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/darmowe-konto-bankowe/',
  },
};

export default function DarmoweKontoBankowePage() {
  const freeBanks = getAllBanks()
    .filter((b) => b.monthly_fee === '0 zł')
    .sort((a, b) => b.rating - a.rating);

  const faqItems: FAQItem[] = [
    {
      q: 'Czy istnieje konto bankowe w 100% bezwarunkowo darmowe?',
      a: 'Tak, takim kontem jest Nest Konto w Nest Banku. Zarówno otwarcie i prowadzenie rachunku, jak i obsługa pierwszej karty debetowej Visa są całkowicie bezpłatne bez konieczności wykonywania jakichkolwiek płatności czy zapewniania wpływów.'
    },
    {
      q: 'Co oznacza, że konto jest darmowe warunkowo?',
      a: 'Oznacza to, że bank nie pobierze opłaty za prowadzenie konta lub kartę (np. 7-10 zł), pod warunkiem że w danym miesiącu spełnisz prosty warunek aktywności: np. wykonasz od 1 do 5 płatności kartą lub BLIKiem.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Darmowe konto bankowe' }]} />

        <div className="my-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>0 zł za prowadzenie rachunku</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Darmowe konta bankowe – Zestawienie 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Nie chcesz płacić za posiadanie konta bankowego? Zobacz oferty banków, które gwarantują 0 zł za prowadzenie rachunku i proste zasady bezpłatności karty debetowej.
          </p>
        </div>

        <div className="space-y-6 my-10">
          {freeBanks.map((offer, idx) => (
            <OfferCard key={offer.id} offer={offer} rankPosition={idx + 1} />
          ))}
        </div>

        <div className="my-16">
          <FAQSection items={faqItems} />
        </div>
      </div>
    </div>
  );
}
