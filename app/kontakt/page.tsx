import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Mail, MessageSquare, ShieldCheck, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontakt z Redakcją – KontoRadar',
  description: 'Skontaktuj się z zespołem portalu KontoRadar. Pytania, sugestie dotyczące rankingu, zgłaszanie aktualizacji ofert bankowych.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/kontakt/',
  },
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Kontakt' }]} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm my-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-4">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Biuro Redakcji</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Kontakt z redakcją KontoRadar
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed pb-6 border-b border-slate-100">
            Masz pytanie dotyczące rankingu kont bankowych, zauważyłeś zmianę w tabeli opłat banku lub chcesz nawiązać współpracę redakcyjną? Napisz do nas!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="font-extrabold text-base text-slate-900">E-mail redakcyjny</h2>
              <p className="text-xs text-slate-500 mt-1 mb-3">Odpowiadamy zazwyczaj w ciągu 24–48 godzin.</p>
              <a
                href="mailto:kontakt@kontoradar.pages.dev"
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                kontakt@kontoradar.pages.dev
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h2 className="font-extrabold text-base text-slate-900">Zgłoś błąd w ofercie</h2>
              <p className="text-xs text-slate-500 mt-1 mb-3">Dbamy o stuprocentową aktualność danych.</p>
              <a
                href="mailto:aktualizacje@kontoradar.pages.dev"
                className="text-sm font-bold text-emerald-600 hover:underline"
              >
                aktualizacje@kontoradar.pages.dev
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-600 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Ważna informacja:</strong> Redakcja serwisu KontoRadar nie jest pracownikiem ani przedstawicielem handlowym żadnego z prezentowanych banków. Nie posiadamy wglądu w Twoje wnioski kredytowe, stan konta ani hasła. W sprawach dotyczących zawartych umów prosimy o bezpośredni kontakt z infolinią danego banku.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
