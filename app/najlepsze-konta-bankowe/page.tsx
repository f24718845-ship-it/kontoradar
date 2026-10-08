import React from 'react';
import { Metadata } from 'next';
import { getAllBanks } from '@/lib/data';
import { OfferCard } from '@/components/OfferCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection, FAQItem } from '@/components/FAQSection';
import { Sparkles, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Najlepsze Konta Bankowe 2026 – TOP Oferty wg Oceny Ekspertów',
  description: 'Zobacz ranking najlepszych kont bankowych w Polsce. Tylko konta z najwyższą notą (powyżej 9.3/10) w kategoriach: brak opłat, aplikacja mobilna i premie.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/najlepsze-konta-bankowe/',
  },
};

export default function NajlepszeKontaBankowePage() {
  const topBanks = getAllBanks()
    .filter((b) => b.rating >= 9.3)
    .sort((a, b) => b.rating - a.rating);

  const faqItems: FAQItem[] = [
    {
      q: 'Dlaczego w tym zestawieniu znajdują się tylko wybrane banki?',
      a: 'W kategorii "Najlepsze konta bankowe" prezentujemy wyłącznie rachunki, które w naszej obiektywnej analizie uzyskały ocenę co najmniej 9.3/10 punktów na podstawie kosztów, aplikacji, sieci bankomatów i warunków premii.'
    },
    {
      q: 'Czy najlepsze konto oznacza całkowicie darmowe konto?',
      a: 'Nie zawsze. Najwyżej oceniane konta to takie, które oferują idealny stosunek jakości usług do kosztów. Większość z nich pozwala uniknąć opłat za prowadzenie i kartę poprzez wykonanie standardowych, codziennych zakupów.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Najlepsze konta bankowe' }]} />

        <div className="my-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Ścisła czołówka rynku • Ocena 9.3+</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Najlepsze konta bankowe – Wybór Redakcji 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Nie masz czasu na przeglądanie kilkudziesięciu ofert? Oto wyselekcjonowane konta osobiste, które deklasują konkurencję pod względem nowoczesności aplikacji, wygody płatności i minimalnych kosztów.
          </p>
        </div>

        <div className="space-y-6 my-10">
          {topBanks.map((offer, idx) => (
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
