import React from 'react';
import Link from 'next/link';
import { Award, ShieldAlert, CheckCircle2, RefreshCw, Scale, DollarSign } from 'lucide-react';

export const RatingExplainer: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30 mb-4">
          <Scale className="w-4 h-4" />
          <span>Metodyka Oceny KontoRadar</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white">
          Jak tworzymy niezależny ranking kont bankowych?
        </h2>
        <p className="text-slate-300 text-base leading-relaxed mb-8">
          W KontoRadar nie stosujemy subiektywnych opinii ani nie układamy pozycji ofert na podstawie prowizji afiliacyjnej. Każde konto oceniane jest według obiektywnego, 10-punktowego algorytmu analitycznego opartego na 5 kluczowych filarach.
        </p>
      </div>

      {/* 5 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Filar 1 */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-wider">Filar 1 (do 2.5 pkt)</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-bold text-base text-white mb-1.5">Koszty i prostota zwolnienia</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Najwyższe noty otrzymują konta bezwarunkowo darmowe oraz te, gdzie uniknięcie opłaty za kartę wymaga symbolicznej aktywności (np. 1 płatność).
          </p>
        </div>

        {/* Filar 2 */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-wider">Filar 2 (do 1.5 pkt)</span>
            <RefreshCw className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="font-bold text-base text-white mb-1.5">Dostęp do bankomatów</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Oceniamy sieć bankomatów własnych, prowizje w Euronet i Planet Cash, darmowe wypłaty BLIK oraz koszty wypłat za granicą.
          </p>
        </div>

        {/* Filar 3 */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-wider">Filar 3 (do 2.0 pkt)</span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="font-bold text-base text-white mb-1.5">Aplikacja i płatności mobilne</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Weryfikujemy stabilność aplikacji, biometrię, BLIK zbliżeniowy, przelewy P2P na telefon oraz wsparcie Apple Pay, Google Pay i smartwatchy.
          </p>
        </div>

        {/* Filar 4 */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-wider">Filar 4 (do 2.0 pkt)</span>
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="font-bold text-base text-white mb-1.5">Realna premia i bonusy</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Liczy się nie tylko wysokość premii, ale przejrzystość regulaminu, brak skomplikowanych wymogów oraz oprocentowanie konta oszczędnościowego.
          </p>
        </div>

        {/* Filar 5 */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-wider">Filar 5 (do 2.0 pkt)</span>
            <ShieldAlert className="w-5 h-5 text-teal-400" />
          </div>
          <h3 className="font-bold text-base text-white mb-1.5">Wygoda i otwarcie online</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Punkty za weryfikację na selfie, e-Dowód, brak konieczności wizyty kuriera oraz jakość obsługi klienta i transparentność dokumentów TOiP.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Dane weryfikowane na bieżąco w oficjalnych Tabelach Opłat i Prowizji (TOiP) banków. Ostatnia aktualizacja bazy: <strong className="text-white">Październik 2026</strong>.
        </div>
        <Link
          href="/jak-tworzymy-ranking"
          className="text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1 shrink-0"
        >
          Zobacz pełną metodykę i wzór punktacji &rarr;
        </Link>
      </div>
    </section>
  );
};
