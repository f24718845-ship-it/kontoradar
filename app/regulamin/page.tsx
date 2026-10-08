import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Regulamin Serwisu – KontoRadar',
  description: 'Regulamin świadczenia usług drogą elektroniczną w serwisie internetowym KontoRadar. Prawa i obowiązki użytkownika.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/regulamin/',
  },
};

export default function RegulaminPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Regulamin serwisu' }]} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm my-8 prose prose-slate max-w-none">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight not-prose mb-6">
            Regulamin serwisu internetowego KontoRadar
          </h1>

          <p className="text-sm text-slate-500">Ostatnia aktualizacja: 8 października 2026 r.</p>

          <h2>§ 1. Postanowienia ogólne</h2>
          <p>
            1. Niniejszy Regulamin określa zasady korzystania z portalu internetowego <strong>KontoRadar</strong>, działającego pod adresem internetowym <code>https://kontoradar.pages.dev</code>.
          </p>
          <p>
            2. Portal KontoRadar jest niezależnym serwisem o charakterze informacyjno-edukacyjnym i porównawczym, prezentującym zestawienia, rankingi oraz recenzje rachunków bankowych i produktów finansowych dostępnych na rynku polskim.
          </p>

          <h2>§ 2. Charakter usług i wyłączenie odpowiedzialności</h2>
          <p>
            1. Wszelkie materiały, rankingi, artykuły i kalkulatory zamieszczone w portalu KontoRadar mają charakter wyłącznie ogólnoinformacyjny i nie stanowią oferty w rozumieniu art. 66 Kodeksu Cywilnego.
          </p>
          <p>
            2. Treści prezentowane w serwisie <strong>nie stanowią doradztwa finansowego, podatkowego ani prawnego</strong>, w szczególności rekomendacji w rozumieniu przepisów ustawy z dnia 29 lipca 2005 r. o obrocie instrumentami finansowymi.
          </p>
          <p>
            3. Redakcja dokłada najwyższej staranności w celu weryfikacji aktualności Tabel Opłat i Prowizji (TOiP) banków, jednak wiążące prawnie warunki umowy określa wyłącznie właściwa instytucja finansowa (bank) w bezpośredniej umowie z klientem.
          </p>

          <h2>§ 3. Linki partnerskie i afiliacja</h2>
          <p>
            1. Serwis wykorzystuje linki afiliacyjne (m.in. sieci Money2Money), które przekierowują użytkownika bezpośrednio na oficjalne strony banków.
          </p>
          <p>
            2. Przejście przez link partnerski nie powoduje naliczenia jakichkolwiek dodatkowych opłat po stronie użytkownika.
          </p>

          <h2>§ 4. Własność intelektualna</h2>
          <p>
            Wszelkie prawa do nazwy marki, logotypu, unikalnych artykułów oraz kodu źródłowego serwisu KontoRadar są zastrzeżone. Kopiowanie i redystrybucja materiałów bez zgody redakcji jest zabroniona.
          </p>
        </div>
      </div>
    </div>
  );
}
