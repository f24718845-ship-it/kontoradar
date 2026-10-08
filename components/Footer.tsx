import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ShieldCheck, Info, CheckCircle2, Lock, FileText, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Affiliate & Legal Warning Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-12 shadow-inner">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
              <p className="font-semibold text-white">
                Nota prawna i przejrzystość afiliacyjna serwisu KontoRadar
              </p>
              <p>
                Serwis <strong className="text-white">KontoRadar</strong> może otrzymywać prowizję za przejście do wybranych ofert za pośrednictwem linków partnerskich (m.in. sieci afiliacyjnych takich jak Money2Money). Wynagrodzenie to nie wpływa na pozycję w rankingu ani na obiektywizm prezentowanych danych – oceny wyliczane są według ścisłej metodyki matematycznej 0–10.
              </p>
              <p className="text-slate-400">
                Wszystkie treści zamieszczone w portalu mają wyłącznie charakter informacyjno-edukacyjny i nie stanowią rekomendacji ani doradztwa finansowego w rozumieniu art. 69 ust. 2 pkt 5 ustawy o obrocie instrumentami finansowymi ani porady prawnej. Przed zawarciem umowy z bankiem zapoznaj się z aktualną Tabelą Opłat i Prowizji oraz regulaminem danej promocji na oficjalnej stronie instytucji finansowej.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Logo isDark={true} showSlogan={true} />
            <p className="text-sm text-slate-400 leading-relaxed">
              Profesjonalny, niezależny portal finansowy dedykowany porównywaniu kont bankowych w Polsce. Pomagamy wybrać optymalny rachunek, uniknąć opłat i zyskać najwyższe premie gotówkowe.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Bezpieczne linki do oficjalnych stron banków</span>
            </div>
          </div>

          {/* Col 2: Rankingi SEO */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Rankingi Kont
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/ranking-kont-bankowych" className="hover:text-blue-400 transition-colors">
                  Ranking Kont Osobistych 2026
                </Link>
              </li>
              <li>
                <Link href="/najlepsze-konta-bankowe" className="hover:text-blue-400 transition-colors">
                  Najlepsze Konta Bankowe
                </Link>
              </li>
              <li>
                <Link href="/darmowe-konto-bankowe" className="hover:text-blue-400 transition-colors">
                  Darmowe Konta Bankowe (0 zł)
                </Link>
              </li>
              <li>
                <Link href="/konto-bankowe-z-bonusem" className="hover:text-blue-400 transition-colors">
                  Konta z Bonusem i Premią
                </Link>
              </li>
              <li>
                <Link href="/konto-bankowe-dla-mlodych" className="hover:text-blue-400 transition-colors">
                  Konta dla Młodych (18–26 lat)
                </Link>
              </li>
              <li>
                <Link href="/najlepsze-konto-mobilne" className="hover:text-blue-400 transition-colors">
                  Najlepsze Konta Mobilne & BLIK
                </Link>
              </li>
              <li>
                <Link href="/konto-bez-oplat" className="hover:text-blue-400 transition-colors">
                  Konta Bez Ukrytych Opłat
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Poradniki i Baza Wiedzy */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Poradniki i Edukacja
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/blog/jak-wybrac-konto-bankowe" className="hover:text-blue-400 transition-colors">
                  Jak wybrać konto bankowe?
                </Link>
              </li>
              <li>
                <Link href="/blog/jak-zalozyc-konto-przez-internet" className="hover:text-blue-400 transition-colors">
                  Jak założyć konto online?
                </Link>
              </li>
              <li>
                <Link href="/blog/jak-dziala-bonus-za-otwarcie-konta" className="hover:text-blue-400 transition-colors">
                  Jak działa premia za konto?
                </Link>
              </li>
              <li>
                <Link href="/blog/jak-dziala-blik" className="hover:text-blue-400 transition-colors">
                  Przewodnik po płatnościach BLIK
                </Link>
              </li>
              <li>
                <Link href="/blog/jakie-oplaty-sprawdzic-przed-otwarciem-konta" className="hover:text-blue-400 transition-colors">
                  Checklista opłat bankowych
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-400 font-semibold hover:underline">
                  Wszystkie artykuły na blogu &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: O portalu i Legal */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              O portalu i Compliance
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/jak-tworzymy-ranking" className="hover:text-blue-400 transition-colors">
                  Jak tworzymy ranking? (Metodyka)
                </Link>
              </li>
              <li>
                <Link href="/afiliacja" className="hover:text-blue-400 transition-colors">
                  Zasady afiliacji i monetyzacja
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="hover:text-blue-400 transition-colors">
                  O nas i misja serwisu
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-blue-400 transition-colors">
                  Kontakt z redakcją
                </Link>
              </li>
              <li>
                <Link href="/regulamin" className="hover:text-blue-400 transition-colors">
                  Regulamin serwisu
                </Link>
              </li>
              <li>
                <Link href="/polityka-prywatnosci" className="hover:text-blue-400 transition-colors">
                  Polityka prywatności (RODO)
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-blue-400 transition-colors">
                  Polityka plików cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} KontoRadar. Wszelkie prawa zastrzeżone. Ranking i porównywarka kont bankowych.
          </p>
          <div className="flex items-center gap-6">
            <span>Hosting: Cloudflare Pages</span>
            <span>Domena: kontoradar.pages.dev</span>
            <span className="flex items-center gap-1 text-slate-400">
              Stworzone dla użytkowników
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
