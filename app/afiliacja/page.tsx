import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Info, ShieldCheck, CheckCircle2, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Zasady Afiliacji i Transparentność Finansowa – KontoRadar',
  description: 'Informacje o zasadach monetyzacji i linkach partnerskich w portalu KontoRadar. Przejrzystość, brak wpływu prowizji na pozycje w rankingu.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/afiliacja/',
  },
};

export default function AfiliacjaPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Zasady afiliacji' }]} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm my-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-4">
            <HeartHandshake className="w-4 h-4 text-blue-600" />
            <span>Przejrzystość Biznesowa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Zasady afiliacji i monetyzacja serwisu
          </h1>

          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 my-6 text-sm text-blue-950 leading-relaxed flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Podstawowe oświadczenie:</strong> Serwis KontoRadar może otrzymywać prowizję za przejście do wybranych ofert za pośrednictwem linków afiliacyjnych. Korzystanie z portalu jest całkowicie bezpłatne dla użytkowników.
            </div>
          </div>

          <div className="space-y-6 text-slate-800 leading-relaxed text-base">
            <h2 className="text-2xl font-extrabold text-slate-900">Jak finansujemy działanie portalu?</h2>
            <p>
              Prowadzenie profesjonalnego portalu porównawczego wymaga ciągłego nakładu pracy: monitorowania kilkudziesięciu tabel opłat bankowych, aktualizowania regulaminów promocji, tworzenia wartościowych artykułów edukacyjnych oraz utrzymania infrastruktury technologicznej (Cloudflare Pages, narzędzia analityczne).
            </p>
            <p>
              Działanie serwisu jest finansowane z programów partnerskich i sieci afiliacyjnych (w tym m.in. programu Money2Money prowadzonego przez Totalmoney.pl sp. z o.o.). Jeśli klikniesz w link 'SPRAWDŹ OFERTĘ' i otworzysz konto w danym banku, bank lub sieć partnerska może wypłacić nam prowizję marketingową.
            </p>

            <h2 className="text-2xl font-extrabold text-slate-900 mt-8">Czy płacisz więcej z powodu linku partnerskiego?</h2>
            <p>
              <strong>Absolutnie NIE.</strong> Koszt konta, opłaty oraz warunki promocji są dokładnie takie same, jak w przypadku bezpośredniego wejścia na stronę banku. W wielu przypadkach, dzięki promocjom dostępnym w sieci partnerskiej, otrzymujesz dodatkowy bonus pieniężny lub dedykowaną premię powitalną.
            </p>

            <h2 className="text-2xl font-extrabold text-slate-900 mt-8">Gwarancja obiektywizmu</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Prowizja nie decyduje o kolejności w rankingu – oferty sortowane są na podstawie matematycznej oceny punktowej.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Prezentujemy również oferty bezpłatne i instytucje, które nie oferują prowizji afiliacyjnej (np. Nest Bank), jeśli ich parametry są korzystne dla konsumenta.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Uczciwie opisujemy wady i pułapki regulaminowe każdej oferty w sekcjach 'Wady' oraz 'Dla kogo nie'.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
