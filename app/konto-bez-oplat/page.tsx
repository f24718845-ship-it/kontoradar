import React from 'react';
import { Metadata } from 'next';
import { getAllBanks } from '@/lib/data';
import { OfferCard } from '@/components/OfferCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection, FAQItem } from '@/components/FAQSection';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konto Bez Opłat 2026 – Ranking Kont Bez Ukrytych Prowizji',
  description: 'Gdzie założyć konto bez opłat? Sprawdź zestawienie rachunków bankowych z zerowymi kosztami prowadzenia, bezpłatną kartą i darmowymi bankomatami.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/konto-bez-oplat/',
  },
};

export default function KontoBezOplatPage() {
  const banks = getAllBanks()
    .filter((b) => b.monthly_fee === '0 zł')
    .sort((a, b) => b.rating - a.rating);

  const faqItems: FAQItem[] = [
    {
      q: 'Jak upewnić się, że bank nie naliczy ukrytych opłat?',
      a: 'Zawsze sprawdzaj Tabelę Opłat i Prowizji pod kątem: opłaty za wznowienie karty, prowizji za SMS-y autoryzacyjne (zmień na autoryzację w aplikacji PUSH) oraz kosztu wypłaty małych kwot z bankomatów.'
    },
    {
      q: 'Czy bank może zmienić tabelę opłat w trakcie trwania umowy?',
      a: 'Tak, bank ma prawo zmienić taryfę opłat, jednak ma ustawowy obowiązek poinformować Cię o tym co najmniej 2 miesiące przed wejściem zmian w życie. Masz wtedy prawo do bezpłatnego wypowiedzenia umowy.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Konto bez opłat' }]} />

        <div className="my-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Bez gwiazdek i ukrytych prowizji</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Konto bankowe bez opłat – Wybierz rachunek za 0 zł
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Darmowe prowadzenie konta, brak prowizji za krajowe przelewy internetowe oraz bezpłatne wypłaty z bankomatów BLIKiem. Poznaj oferty, w których nie płacisz za codzienne operacje.
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
