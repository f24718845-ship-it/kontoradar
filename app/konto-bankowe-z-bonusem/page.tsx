import React from 'react';
import { Metadata } from 'next';
import { getAllBanks } from '@/lib/data';
import { OfferCard } from '@/components/OfferCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection, FAQItem } from '@/components/FAQSection';
import { Gift, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konto Bankowe z Bonusem 2026 – Nawet 2700 zł Premii za Założenie',
  description: 'Aktualne promocje bankowe: zgarnij od 300 zł do nawet 2700 zł premii gotówkowej za otwarcie konta przez internet. Sprawdź warunki i odbierz bonus.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/konto-bankowe-z-bonusem/',
  },
};

export default function KontoBankoweZBonusemPage() {
  const bonusBanks = getAllBanks()
    .filter((b) => b.bonus.includes('zł'))
    .sort((a, b) => {
      const getNum = (str: string) => {
        const m = str.match(/\d+/g);
        return m ? parseInt(m.join(''), 10) : 0;
      };
      return getNum(b.bonus) - getNum(a.bonus);
    });

  const faqItems: FAQItem[] = [
    {
      q: 'Kiedy bank wypłaci premię za otwarcie konta?',
      a: 'Zazwyczaj premia wypłacana jest w transzach w kolejnych miesiącach po spełnieniu warunków regulaminu (np. do końca miesiąca następującego po miesiącu spełnienia warunków aktywności).'
    },
    {
      q: 'Czy premia z promocji bankowej podlega opodatkowaniu?',
      a: 'Nie, zgodnie z art. 21 ust. 1 pkt 68 ustawy o PIT, premie w sprzedaży premiowej dla osób fizycznych do kwoty 2000 zł jednorazowo są zwolnione z podatku dochodowego.'
    },
    {
      q: 'Co to jest okres karencji w promocjach bankowych?',
      a: 'To okres, w którym nie mogłeś posiadać rachunku w danym banku, aby skorzystać z promocji jako "nowy klient" (np. brak konta od 1 stycznia roku ubiegłego).'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Konto bankowe z bonusem' }]} />

        <div className="my-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>Bonusy gotówkowe i cashback</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Konto bankowe z bonusem – Promocje 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Banki rywalizują o nowych klientów, oferując realne pieniądze za otwarcie rachunku online. Wybierz konto z najwyższą premią i sprawdź, jak krok po kroku spełnić warunki regulaminu.
          </p>
        </div>

        <div className="space-y-6 my-10">
          {bonusBanks.map((offer, idx) => (
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
