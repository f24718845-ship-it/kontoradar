'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllBanks } from '@/lib/data';
import { BankOffer } from '@/types/bank';
import { OfferCard } from '@/components/OfferCard';
import { FilterBar, FilterKey, SortKey } from '@/components/FilterBar';
import { RatingExplainer } from '@/components/RatingExplainer';
import { ComparisonBar } from '@/components/ComparisonBar';
import { FAQSection, FAQItem } from '@/components/FAQSection';
import { CalculatorSection } from '@/components/Calculator';
import { trackComparisonStarted } from '@/lib/analytics';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  HelpCircle,
  Zap,
  BookOpen
} from 'lucide-react';

export default function HomePage() {
  const allBanks = useMemo(() => getAllBanks(), []);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [activeSort, setActiveSort] = useState<SortKey>('rating');
  const [comparedSlugs, setComparedSlugs] = useState<string[]>([]);

  // Filtering logic
  const filteredBanks = useMemo(() => {
    let result = [...allBanks];

    switch (activeFilter) {
      case 'free':
        result = result.filter(
          (b) => b.category_tags.includes('darmowe') || b.monthly_fee === '0 zł'
        );
        break;
      case 'bonus':
        result = result.filter(
          (b) => b.category_tags.includes('bonus') || b.bonus.includes('zł')
        );
        break;
      case 'young':
        result = result.filter(
          (b) => b.category_tags.includes('dla-mlodych') || b.monthly_fee === '0 zł'
        );
        break;
      case 'no_fee':
        result = result.filter((b) => b.monthly_fee === '0 zł');
        break;
      case 'blik':
        result = result.filter((b) => b.blik);
        break;
      case 'apple_pay':
        result = result.filter((b) => b.apple_pay);
        break;
      case 'google_pay':
        result = result.filter((b) => b.google_pay);
        break;
      case 'online_opening':
        result = result.filter((b) => b.online_opening);
        break;
      case 'all':
      default:
        break;
    }

    // Sorting logic
    result.sort((a, b) => {
      if (activeSort === 'rating') {
        return b.rating - a.rating;
      }
      if (activeSort === 'bonus') {
        const getBonusNum = (str: string) => {
          const match = str.match(/\d+/g);
          return match ? parseInt(match.join(''), 10) : 0;
        };
        return getBonusNum(b.bonus) - getBonusNum(a.bonus);
      }
      if (activeSort === 'costs') {
        const isFreeA = a.monthly_fee === '0 zł' && a.card_fee === '0 zł' ? 1 : 0;
        const isFreeB = b.monthly_fee === '0 zł' && b.card_fee === '0 zł' ? 1 : 0;
        return isFreeB - isFreeA;
      }
      return 0;
    });

    return result;
  }, [allBanks, activeFilter, activeSort]);

  // Comparison helpers
  const handleToggleCompare = (slug: string) => {
    if (comparedSlugs.includes(slug)) {
      setComparedSlugs(comparedSlugs.filter((s) => s !== slug));
    } else {
      if (comparedSlugs.length < 4) {
        const nextSlugs = [...comparedSlugs, slug];
        setComparedSlugs(nextSlugs);
        const bank = allBanks.find((b) => b.slug === slug);
        trackComparisonStarted(nextSlugs.length, [
          ...selectedComparedOffers.map((b) => b.bank),
          bank?.bank || slug,
        ]);
      } else {
        alert('Możesz porównać maksymalnie 4 oferty jednocześnie.');
      }
    }
  };

  const selectedComparedOffers = useMemo(() => {
    return allBanks.filter((b) => comparedSlugs.includes(b.slug));
  }, [allBanks, comparedSlugs]);

  const homeFaqItems: FAQItem[] = [
    {
      q: 'Czy korzystanie z porównywarki KontoRadar jest bezpłatne?',
      a: 'Tak, korzystanie z serwisu KontoRadar jest w 100% bezpłatne dla użytkowników. Nie pobieramy żadnych prowizji ani opłat za porównywanie ofert czy przejście do banku.'
    },
    {
      q: 'Jak banki wypłacają premie za otwarcie konta?',
      a: 'Premie gotówkowe przekazywane są jako bezpośredni przelew na Twój nowo otwarty rachunek po spełnieniu prostych warunków regulaminu (np. zrobieniu kilku płatności kartą czy zapewnieniu wpływu). Zgodnie z polskim prawem, premie do 2000 zł w sprzedaży premiowej są zwolnione z podatku dochodowego.'
    },
    {
      q: 'Czy można mieć kilka kont bankowych jednocześnie?',
      a: 'Tak, polskie prawo nie ogranicza liczby posiadanych rachunków bankowych. Wiele osób posiada jedno konto główne (na pensję) oraz drugie konto z promocyjnym oprocentowaniem oszczędności lub darmowymi wypłatami z bankomatów na całym świecie.'
    },
    {
      q: 'Jak często aktualizowane są dane w rankingu?',
      a: 'Nasz zespół na bieżąco monitoruje Tabele Opłat i Prowizji (TOiP) banków oraz nowe regulaminy promocji. Wszystkie prezentowane parametry są weryfikowane co najmniej raz w miesiącu, a każda oferta posiada oznaczoną datę ostatniej weryfikacji.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-16 pb-20 sm:pt-20 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-semibold border border-blue-400/30 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Aktualny ranking kont osobistych • Październik 2026</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Ranking kont bankowych
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mt-6 leading-relaxed">
            Porównaj konta bankowe, opłaty, bonusy i warunki i wybierz ofertę dopasowaną do swoich potrzeb.
          </p>

          {/* Micro Value Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <span className="text-xs text-slate-400 block">Najwyższa premia</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">do 2700 zł</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">gotówka + cashback</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <span className="text-xs text-slate-400 block">Prowadzenie konta</span>
              <span className="text-xl sm:text-2xl font-black text-white">0 zł</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">w większości banków</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <span className="text-xs text-slate-400 block">Otwarcie rachunku</span>
              <span className="text-xl sm:text-2xl font-black text-blue-400">Online</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">na selfie w 15 minut</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <span className="text-xs text-slate-400 block">Niezależność</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400">10/10</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">matematyczna ocena</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-20">
        {/* Interactive Filter Bar */}
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          totalCount={filteredBanks.length}
        />

        {/* Section: Najlepsze konta bankowe */}
        <section aria-labelledby="ranking-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h2 id="ranking-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Najlepsze konta bankowe
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Zestawienie uszeregowane według obiektywnej punktacji algorytmu KontoRadar.
              </p>
            </div>

            <Link
              href="/porownywarka-kont-bankowych"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <Scale className="w-4 h-4" />
              <span>Przejdź do pełnej tabeli porównawczej &rarr;</span>
            </Link>
          </div>

          {/* Offer Cards List */}
          <div className="space-y-6">
            {filteredBanks.map((offer, index) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                rankPosition={index + 1}
                isCompared={comparedSlugs.includes(offer.slug)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>

          {filteredBanks.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-600 font-medium">
                Brak ofert spełniających wybrane kryteria filtrowania.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Pokaż wszystkie konta
              </button>
            </div>
          )}
        </section>

        {/* Section: Kalkulator korzyści finansowych */}
        <CalculatorSection />

        {/* Section: Jak tworzymy ranking? */}
        <div className="mt-16">
          <RatingExplainer />
        </div>

        {/* Section: FAQ */}
        <div className="mt-16">
          <FAQSection items={homeFaqItems} />
        </div>

        {/* Section: Poradniki z Bloga */}
        <section className="mt-16 bg-blue-50/60 rounded-3xl p-8 sm:p-12 border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Baza Wiedzy Finansowej</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Aktualne poradniki i analizy
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 text-sm hover:underline"
            >
              <span>Wszystkie poradniki</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/blog/jak-wybrac-konto-bankowe"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">Poradnik</span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mt-2">
                  Jak wybrać konto bankowe w 2026 roku? Kompletny poradnik
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                  Wybór odpowiedniego rachunku oszczędnościowo-rozliczeniowego (ROR) to decyzja, która wpływa na Twoje codzienne finanse.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500 mt-4 block">7 min czytania &rarr;</span>
            </Link>

            <Link
              href="/blog/jak-zalozyc-konto-przez-internet"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">Instrukcja</span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mt-2">
                  Jak założyć konto bankowe przez internet? Weryfikacja na selfie i e-Dowód
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                  Wizyta w oddziale banku to już przeszłość. Dowiedz się, jak bezpiecznie i błyskawicznie otworzyć konto w aplikacji.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500 mt-4 block">5 min czytania &rarr;</span>
            </Link>

            <Link
              href="/blog/jak-dziala-bonus-za-otwarcie-konta"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">Finanse</span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mt-2">
                  Jak działa bonus za otwarcie konta? Czy banki naprawdę płacą?
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                  Dowiedz się, dlaczego banki płacą kilkaset złotych za założenie konta i czy od nagrody trzeba płacić podatek.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500 mt-4 block">6 min czytania &rarr;</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Floating comparison bar */}
      <ComparisonBar
        selectedOffers={selectedComparedOffers}
        onRemove={(slug) => setComparedSlugs(comparedSlugs.filter((s) => s !== slug))}
        onClear={() => setComparedSlugs([])}
      />
    </div>
  );
}
