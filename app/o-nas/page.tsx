import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShieldCheck, Target, Users, Sparkles, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'O Nas – Misja Portalu KontoRadar',
  description: 'Poznaj zespół i misję portalu KontoRadar. Dlaczego stworzyliśmy niezależną porównywarkę kont bankowych w Polsce.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/o-nas/',
  },
};

export default function ONasPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'O nas' }]} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm my-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-4">
            <Target className="w-4 h-4 text-blue-600" />
            <span>Misja i Wartości</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            O portalu KontoRadar
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed pb-6 border-b border-slate-100">
            <strong>KontoRadar</strong> powstał w odpowiedzi na chaos informacyjny panujący na polskim rynku produktów finansowych. Naszą misją jest dostarczanie czytelnych, obiektywnych i stale weryfikowanych danych o kontach bankowych, aby żaden użytkownik nie płacił niepotrzebnych prowizji.
          </p>

          <div className="mt-8 space-y-6 text-slate-800 leading-relaxed text-base">
            <h2 className="text-2xl font-extrabold text-slate-900">Kim jesteśmy?</h2>
            <p>
              Jesteśmy zespołem pasjonatów bankowości cyfrowej, analityków finansowych oraz programistów. Wierzymy, że w XXI wieku nowoczesne konto bankowe powinno być tanie, intuicyjne i w pełni dostępne z poziomu smartfona.
            </p>

            <h2 className="text-2xl font-extrabold text-slate-900 mt-8">Nasze 3 kluczowe zasady</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 w-fit mb-3">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Obiektywizm</h3>
                <p className="text-xs text-slate-600">
                  Ranking wyliczany według ścisłej formuły matematycznej 0–10, bez faworyzowania ofert na podstawie prowizji.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 w-fit mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Weryfikacja TOiP</h3>
                <p className="text-xs text-slate-600">
                  Nie zgadujemy – wszystkie opłaty sprawdzamy bezpośrednio w oficjalnych regulaminach i tabelach banków.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 w-fit mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Dla ludzi</h3>
                <p className="text-xs text-slate-600">
                  Tłumaczymy zawiłości regulaminów na prosty, zrozumiały język, wskazując zarówno zalety, jak i wady.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
