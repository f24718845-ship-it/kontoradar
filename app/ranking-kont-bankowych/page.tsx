import React from 'react';
import { Metadata } from 'next';
import { getAllBanks } from '@/lib/data';
import { OfferCard } from '@/components/OfferCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection, FAQItem } from '@/components/FAQSection';
import { RatingExplainer } from '@/components/RatingExplainer';
import { ShieldCheck, Award, Sparkles, Scale, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ranking Kont Bankowych 2026 – Aktualne Zestawienie Kont Osobistych',
  description: 'Sprawdź niezależny ranking kont bankowych w Polsce na 2026 rok. Porównaj opłaty za prowadzenie i kartę, darmowe bankomaty oraz premie gotówkowe do 2700 zł.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/ranking-kont-bankowych/',
  },
};

export default function RankingKontBankowychPage() {
  const banks = getAllBanks().sort((a, b) => b.rating - a.rating);

  const faqItems: FAQItem[] = [
    {
      q: 'Które konto bankowe zajmuje 1. miejsce w rankingu?',
      a: 'Liderem obecnego zestawienia jest Konto Przekorzystne w Banku Pekao S.A. (ocena 9.6/10) dzięki bezwarunkowo darmowemu prowadzeniu konta, rekordowej premii do 2700 zł w promocji z cashbackiem oraz świetnej karcie wielowalutowej.'
    },
    {
      q: 'Czy założenie konta przez ranking KontoRadar jest bezpieczne?',
      a: 'Tak, wszystkie przyciski CTA kierują bezpośrednio do oficjalnych, szyfrowanych (SSL) formularzy wniosków na stronach banków. Nie przetwarzamy Twoich danych osobowych ani finansowych.'
    },
    {
      q: 'Jak często zmieniają się pozycje w rankingu?',
      a: 'Pozycje w rankingu aktualizujemy za każdym razem, gdy bank wprowadza nową Tabelę Opłat i Prowizji (TOiP) lub modyfikuje warunki promocji powitalnej.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Ranking kont bankowych' }]} />

        {/* Header */}
        <div className="my-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Aktualizacja: Październik 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Ranking kont bankowych w Polsce – Październik 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Kompletne, obiektywne zestawienie rachunków oszczędnościowo-rozliczeniowych (ROR). Sprawdź koszty stałe, warunki darmowych bankomatów i zgarnij nawet do 2700 zł w aktualnych promocjach bankowych.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="space-y-6 my-10">
          {banks.map((offer, idx) => (
            <OfferCard key={offer.id} offer={offer} rankPosition={idx + 1} />
          ))}
        </div>

        {/* Explainer */}
        <div className="my-16">
          <RatingExplainer />
        </div>

        {/* FAQ */}
        <div className="my-16">
          <FAQSection items={faqItems} />
        </div>
      </div>
    </div>
  );
}
