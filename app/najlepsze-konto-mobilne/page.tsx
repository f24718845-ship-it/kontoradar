import React from 'react';
import { Metadata } from 'next';
import { getAllBanks } from '@/lib/data';
import { OfferCard } from '@/components/OfferCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection, FAQItem } from '@/components/FAQSection';
import { Smartphone, Zap, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Najlepsze Konto Mobilne 2026 – Ranking Aplikacji Bankowych i BLIK',
  description: 'Który bank ma najlepszą aplikację na telefon? Zobacz ranking kont mobilnych z obsługą BLIK zbliżeniowego, Apple Pay, Google Pay oraz biletów i parkingów.',
  alternates: {
    canonical: 'https://kontoradar.pages.dev/najlepsze-konto-mobilne/',
  },
};

export default function NajlepszeKontoMobilnePage() {
  const mobileBanks = getAllBanks()
    .filter((b) => b.blik && b.apple_pay && b.google_pay)
    .sort((a, b) => b.rating_breakdown.mobile_app - a.rating_breakdown.mobile_app);

  const faqItems: FAQItem[] = [
    {
      q: 'Czym charakteryzuje się najlepsze konto mobilne?',
      a: 'To konto oferujące intuicyjną aplikację na smartfony (iOS/Android), szybkie logowanie biometryczne (Face ID / Touch ID), natychmiastowe przelewy BLIK na numer telefonu, płatności Apple Pay/Google Pay oraz dodatkowe usługi: bilety komunikacji, parkingi i kantor walutowy.'
    },
    {
      q: 'Czy założenie konta przez aplikację mobilną jest szybsze niż przez stronę www?',
      a: 'Tak, aplikacje mobilne banków wykorzystują aparat w smartfonie do skanowania dowodu osobistego i biometrii twarzy (selfie), co pozwala zweryfikować tożsamość i aktywować konto nawet w 10-15 minut.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Najlepsze konto mobilne' }]} />

        <div className="my-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-3">
            <Smartphone className="w-4 h-4 text-blue-600" />
            <span>Mobilna bankowość i płatności telefonem</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Najlepsze konto mobilne – Ranking aplikacji 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Bankujesz głównie na smartfonie? Wybierz konto z najwyżej ocenianą aplikacją w App Store i Google Play, obsługą BLIK zbliżeniowego, Apple Pay, Google Pay i natychmiastowych powiadomień PUSH.
          </p>
        </div>

        <div className="space-y-6 my-10">
          {mobileBanks.map((offer, idx) => (
            <OfferCard key={offer.id} offer={offer} rankPosition={idx + 1} />
          ))}
        </div>

        <div className="my-16">
          <FAQSection items={faqItems} />
        </div>
      </div>
    </div>
  );
}
