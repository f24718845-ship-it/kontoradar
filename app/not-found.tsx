import React from 'react';
import Link from 'next/link';
import { Home, Search, Scale } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="text-center max-w-lg bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
        <span className="text-6xl font-black text-blue-600 block mb-2">404</span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
          Strona nie została odnaleziona
        </h1>
        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          Przepraszamy, ale strona o podanym adresie nie istnieje lub została przeniesiona w ramach migracji do nowej wersji serwisu KontoRadar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Strona główna</span>
          </Link>
          <Link
            href="/ranking-kont-bankowych"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-5 rounded-xl transition-all"
          >
            <Scale className="w-4 h-4" />
            <span>Ranking kont</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
