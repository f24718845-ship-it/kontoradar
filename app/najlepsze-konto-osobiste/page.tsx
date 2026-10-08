import React from 'react';
import { Metadata } from 'next';
import { getAllBanks } from '@/lib/data';
import { OfferCard } from '@/components/OfferCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection, FAQItem } from '@/components/FAQSection';
import { UserCheck, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Najlepsze Konto Osobiste 2026 – Ranking Kont ROR w Polsce',
  description: 'Szukasz idealnego rachunku osobistego? Zobacz porównanie czołowych kont ROR w polskich bankach. Przejrzyste warunki, zero prowizji i wygoda.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/najlepsze-konto-osobiste/',
  },
};

export default function NajlepszeKontoOsobistePage() {
  const banks = getAllBanks()
    .filter((b) => b.category_tags.includes('osobiste'))
    .sort((a, b) => b.rating - a.rating);

  const faqItems: FAQItem[] = [
    {
      q: 'Czym jest rachunek oszczędnościowo-rozliczeniowy (ROR)?',
      a: 'ROR to podstawowe konto osobiste służące do codziennego zarządzania pieniędzmi: odbierania wynagrodzenia, realizacji przelewów, opłacania rachunków oraz płatności kartą i telefonem.'
    },
    {
      q: 'Jakie konto osobiste wybrać jako konto główne?',
      a: 'Jako konto główne najlepiej sprawdza się rachunek w dużym, stabilnym banku oferującym darmowe przelewy natychmiastowe, świetną aplikację mobilną oraz szeroką sieć bankomatów i wpłatomatów (np. Pekao, mBank, Santander czy Millennium).'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Najlepsze konto osobiste' }]} />

        <div className="my-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-3">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>Konta ROR do codziennego bankowania</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Najlepsze konto osobiste – Przegląd ofert 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Rachunek ROR to fundament Twoich finansów. Porównaj czołowe polskie banki i wybierz konto osobiste z intuicyjną bankowością, przejrzystą tabelą opłat i wsparciem biometrii.
          </p>
        </div>

        <div className="space-y-6 my-10">
          {banks.map((offer, idx) => (
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
