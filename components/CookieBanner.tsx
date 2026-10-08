'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, Check } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('kontoradar_cookie_consent');
      if (!consent) {
        setIsOpen(true);
      }
    } catch (e) {
      // localStorage may fail in private mode
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('kontoradar_cookie_consent', JSON.stringify({
        essential: true,
        analytics: true,
        affiliate: true,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
    setIsOpen(false);
  };

  const handleAcceptNecessary = () => {
    try {
      localStorage.setItem('kontoradar_cookie_consent', JSON.stringify({
        essential: true,
        analytics: false,
        affiliate: false,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <aside aria-label="Zgoda na pliki cookies" className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-start gap-3.5 mb-3">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Szanujemy Twoją prywatność
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Portal <strong>KontoRadar</strong> wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania serwisu, analizy ruchu oraz prawidłowego rozliczania linków afiliacyjnych z sieciami partnerskimi (np. Money2Money).
          </p>
        </div>
      </div>

      <div className="text-xs text-slate-500 mb-4 pl-1">
        Więcej szczegółów w naszej{' '}
        <Link href="/polityka-prywatnosci" className="text-blue-600 underline font-medium">
          Polityce prywatności
        </Link>{' '}
        oraz{' '}
        <Link href="/cookies" className="text-blue-600 underline font-medium">
          Polityce cookies
        </Link>.
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleAcceptAll}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors shadow-sm"
        >
          Zaakceptuj wszystkie
        </button>
        <button
          type="button"
          onClick={handleAcceptNecessary}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors"
        >
          Tylko niezbędne
        </button>
      </div>
    </aside>
  );
};
