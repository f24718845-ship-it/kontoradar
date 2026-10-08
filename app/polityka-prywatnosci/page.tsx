import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Polityka Prywatności (RODO) – KontoRadar',
  description: 'Polityka prywatności i ochrona danych osobowych użytkowników portalu KontoRadar zgodnie z RODO.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/polityka-prywatnosci/',
  },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Polityka prywatności' }]} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm my-8 prose prose-slate max-w-none">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight not-prose mb-6">
            Polityka prywatności i ochrona danych (RODO)
          </h1>

          <p className="text-sm text-slate-500">Ostatnia aktualizacja: 8 października 2026 r.</p>

          <h2>1. Informacje ogólne</h2>
          <p>
            Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników korzystających z serwisu <strong>KontoRadar</strong> (<code>https://kontoradar.pages.dev</code>) zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).
          </p>

          <h2>2. Administrator Danych Osobowych</h2>
          <p>
            Administratorem serwisu KontoRadar jest Redakcja Portalu KontoRadar. W sprawach związanych z ochroną danych osobowych można kontaktować się drogą elektroniczną pod adresem: <code>kontakt@kontoradar.pages.dev</code>.
          </p>

          <h2>3. Zakres i cel przetwarzania danych</h2>
          <p>
            Serwis KontoRadar w celach przeglądania rankingu <strong>nie wymaga rejestracji, logowania ani podawania danych osobowych (takich jak imię, nazwisko, PESEL czy numer telefonu)</strong>. Wnioski o konta bankowe składane są bezpośrednio na stronach poszczególnych banków.
          </p>
          <p>Dane zbierane automatycznie obejmują wyłącznie:</p>
          <ul>
            <li>Adres IP (poddawany anonimizacji),</li>
            <li>Informacje o przeglądarce i systemie operacyjnym,</li>
            <li>Dane analityczne dotyczące przeglądanych stron (w celach statystycznych),</li>
            <li>Identyfikatory sesji afiliacyjnych (w celu weryfikacji poprawności przekierowania partnerskiego).</li>
          </ul>

          <h2>4. Prawa użytkownika</h2>
          <p>
            Każdemu użytkownikowi przysługuje prawo dostępu do swoich danych, sprostowania, usunięcia ('prawo do bycia zapomnianym'), ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu do Prezesa Urzędu Ochrony Danych Osobowych (UODO).
          </p>
        </div>
      </div>
    </div>
  );
}
