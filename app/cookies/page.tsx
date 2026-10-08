import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Polityka Plików Cookies – KontoRadar',
  description: 'Zasady stosowania plików cookies (ciasteczek) i technologii lokalnego przechowywania w portalu KontoRadar.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/cookies/',
  },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Polityka cookies' }]} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm my-8 prose prose-slate max-w-none">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight not-prose mb-6">
            Polityka plików cookies (ciasteczek)
          </h1>

          <p className="text-sm text-slate-500">Ostatnia aktualizacja: 8 października 2026 r.</p>

          <h2>1. Czym są pliki cookies?</h2>
          <p>
            Pliki cookies (tzw. ciasteczka) to niewielkie pliki tekstowe zapisywane na Twoim urządzeniu końcowym (komputerze, smartfonie, tablecie) podczas przeglądania stron internetowych.
          </p>

          <h2>2. Jakie rodzaje cookies stosujemy?</h2>
          <ul>
            <li>
              <strong>Cookies techniczne (niezbędne):</strong> Umożliwiają prawidłowe działanie strony, zapamiętanie wyboru zgód oraz poprawne wyświetlanie układu strony.
            </li>
            <li>
              <strong>Cookies analityczne:</strong> Pozwalają zbierać zanonimizowane dane statystyczne o ruchu na stronie w celu optymalizacji prędkości i czytelności serwisu.
            </li>
            <li>
              <strong>Cookies afiliacyjne / marketingowe:</strong> Umożliwiają rejestrację przejścia użytkownika do banku za pośrednictwem sieci partnerskich (np. Money2Money) w celu weryfikacji prowizji. Nie przechowują one danych wrażliwych.
            </li>
          </ul>

          <h2>3. Jak zarządzać plikami cookies?</h2>
          <p>
            Możesz w każdej chwili zmienić ustawienia dotyczące cookies w swojej przeglądarce internetowej (Chrome, Firefox, Safari, Edge), w tym całkowicie zablokować ich zapisywanie.
          </p>
        </div>
      </div>
    </div>
  );
}
