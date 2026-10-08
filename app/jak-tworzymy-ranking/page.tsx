import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Scale, CheckCircle2, DollarSign, RefreshCw, Award, ShieldAlert, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Jak Tworzymy Ranking? – Metodyka Oceny 0–10 | KontoRadar',
  description: 'Dowiedz się, jak wyliczamy oceny 0-10 dla kont bankowych w portalu KontoRadar. Poznaj kryteria: koszty, bankomaty, aplikacja, premie i wygoda.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/jak-tworzymy-ranking/',
  },
};

export default function JakTworzymyRankingPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Jak tworzymy ranking?' }]} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm my-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-4">
            <Scale className="w-4 h-4 text-blue-600" />
            <span>Niezależna Metodyka Analityczna</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Jak tworzymy ranking kont bankowych KontoRadar?
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed pb-6 border-b border-slate-100">
            Zaufanie użytkowników jest dla nas najwyższą wartością. Poniżej przedstawiamy transparentny opis kryteriów, wag punktowych oraz zasad aktualizacji, na podstawie których powstaje ocena w skali 0–10 dla każdego rachunku.
          </p>

          <div className="mt-8 space-y-8 text-slate-800 leading-relaxed">
            <section>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span>1. Zasada niezależności afiliacyjnej</span>
              </h2>
              <p>
                W KontoRadar stosujemy żelazną regułę: <strong>wysokość prowizji partnerskiej ani obecność w sieci afiliacyjnej (np. Money2Money) nie ma wpływu na ocenę punktową ani pozycję w rankingu</strong>. Nasz algorytm ocenia wyłącznie obiektywne parametry z oficjalnych Tabel Opłat i Prowizji (TOiP) oraz regulaminów promocji.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
                2. Podział punktacji (maksymalnie 10.0 punktów)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">Koszty i warunki zwolnienia</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">do 2.5 pkt</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    2.5 pkt otrzymują konta bezwarunkowo darmowe. Jeśli zwolnienie z opłaty za kartę wymaga symbolicznej aktywności (np. 1 płatność w miesiącu), przyznajemy 2.1–2.4 pkt. Trudne warunki (np. obrót 500+ zł) obniżają notę.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">Dostęp do bankomatów</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">do 1.5 pkt</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Oceniamy bezpłatne wypłaty ze wszystkich bankomatów w kraju, darmowe wypłaty BLIK, sieć urządzeń własnych oraz koszty wypłat zagranicznych.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">Aplikacja i bankowość mobilna</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">do 2.0 pkt</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Średnia ocen w App Store i Google Play, ergonomia UI, obsługa Apple Pay, Google Pay, Garmin Pay, BLIK zbliżeniowy i przelewy na telefon.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">Bonus powitalny i promocje</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">do 2.0 pkt</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Wysokość premii finansowej, prostota i przejrzystość regulaminu akcji promocyjnej oraz oprocentowanie powiązanego konta oszczędnościowego.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">Wygoda i otwarcie online</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">do 2.0 pkt</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Szybkość procesu weryfikacji tożsamości (selfie, e-Dowód, mObywatel), brak konieczności wizyty w placówce lub czekania na kuriera, czytelność strony internetowej banku.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
                3. Cykl weryfikacji i aktualizacji danych
              </h2>
              <p>
                Wszystkie dane ofertowe są weryfikowane na bieżąco. Przy każdej ofercie prezentujemy pole <strong>Ostatnia weryfikacja: [data]</strong> oraz bezpośredni link do źródłowej Tabeli Opłat i Prowizji (TOiP) banku. Jeżeli jakikolwiek parametr ulegnie zmianie, nasza redakcja niezwłocznie aktualizuje punktację.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
