import React from 'react';
import { Metadata } from 'next';
import { getAllBanks } from '@/lib/data';
import { OfferCard } from '@/components/OfferCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection, FAQItem } from '@/components/FAQSection';
import { GraduationCap, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konto Bankowe dla Młodych 2026 – Najlepsze Konta dla Studentów i Osób do 26 Lat',
  description: 'Ranking kont dla młodych (18–26 lat) i studentów. 0 zł za konto i kartę bez wymogu wpływów, darmowe wypłaty z bankomatów i obsługa Apple Pay/Google Pay.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/konto-bankowe-dla-mlodych/',
  },
};

export default function KontoBankoweDlaMlodychPage() {
  const youthBanks = getAllBanks()
    .filter((b) => b.category_tags.includes('dla-mlodych') || b.monthly_fee === '0 zł')
    .sort((a, b) => b.rating - a.rating);

  const faqItems: FAQItem[] = [
    {
      q: 'Czy do 26. roku życia konto bankowe jest zawsze bezpłatne?',
      a: 'W większości wiodących banków (np. Bank Pekao, Bank Millennium, ING, mBank) osoby poniżej 26. roku życia są całkowicie zwolnione z opłat za prowadzenie konta oraz mają znacznie ułatwione lub bezwarunkowe warunki darmowości karty debetowej.'
    },
    {
      q: 'Co dzieje się z kontem po ukończeniu 26 lat?',
      a: 'Konto młodzieżowe automatycznie przekształca się w standardowy rachunek osobisty dla dorosłych. Wtedy zaczynają obowiązywać standardowe warunki zwolnienia z opłat (np. wpływ 500-1000 zł i min. 1-5 płatności kartą w miesiącu).'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Konto bankowe dla młodych' }]} />

        <div className="my-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold mb-3">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <span>Dla studentów i osób w wieku 18–26 lat</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Konto bankowe dla młodych – Ranking 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Studiujesz lub dopiero wchodzisz na rynek pracy? Wybierz konto bez konieczności comiesięcznych wpływów pensji, z darmową kartą, bezpłatnymi bankomatami i wygodnym BLIKiem.
          </p>
        </div>

        <div className="space-y-6 my-10">
          {youthBanks.map((offer, idx) => (
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
