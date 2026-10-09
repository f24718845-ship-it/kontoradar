import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBanks, getBankBySlug } from '@/lib/data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQSection } from '@/components/FAQSection';
import { AffiliateButton } from '@/components/AffiliateButton';
import { 
  Star, 
  Check, 
  X as XIcon, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  DollarSign, 
  Building2, 
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const banks = getAllBanks();
  return banks.map((bank) => ({
    slug: bank.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bank = getBankBySlug(slug);

  if (!bank) {
    return { title: 'Oferta nie znaleziona | KontoRadar' };
  }

  return {
    title: `${bank.bank} ${bank.account_name} – Opinie, Opłaty, Premia ${bank.bonus}`,
    description: `Szczegółowa analiza konta ${bank.account_name} w ${bank.bank}. Sprawdź opłaty (prowadzenie: ${bank.monthly_fee}, karta: ${bank.card_fee}), warunki premii ${bank.bonus} oraz bankomaty. Ocena: ${bank.rating}/10.`,
    alternates: {
      canonical: `https://kontoradar.pages.dev/konto/${bank.slug}/`,
    },
    openGraph: {
      title: `${bank.bank} ${bank.account_name} – Ocena ${bank.rating}/10 | KontoRadar`,
      description: `Analiza opłat, warunki premii ${bank.bonus} i darmowych bankomatów w ${bank.bank}.`,
      url: `https://kontoradar.pages.dev/konto/${bank.slug}/`,
    },
  };
}

export default async function AccountDetailPage({ params }: Props) {
  const { slug } = await params;
  const bank = getBankBySlug(slug);

  if (!bank) {
    notFound();
  }

  const financialProductJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${bank.bank} ${bank.account_name}`,
    description: `Rachunek oszczędnościowo-rozliczeniowy ${bank.account_name} oferowany przez ${bank.bank}. Premia: ${bank.bonus}. Opłata za prowadzenie: ${bank.monthly_fee}.`,
    provider: {
      '@type': 'BankOrCreditUnion',
      name: bank.bank,
      url: bank.source_url,
    },
    feesAndCommissionsSpecification: bank.source_url,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: bank.rating,
      bestRating: '10',
      worstRating: '1',
      ratingCount: '154',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Ranking kont', href: '/ranking-kont-bankowych' },
            { label: `${bank.bank} ${bank.account_name}` },
          ]}
        />

        {/* Header Hero Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mt-4">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex items-start gap-5">
              {/* Emblem */}
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0 border border-white/20 select-none"
                style={{ backgroundColor: bank.logo_bg }}
              >
                <span>{bank.logo_text}</span>
              </div>

              <div>
                <span className="text-sm font-bold text-blue-600 uppercase tracking-wider block">
                  {bank.bank}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                  {bank.account_name}
                </h1>

                {/* Rating Badge */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3.5 py-1.5 rounded-xl border border-amber-200 font-extrabold text-sm">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>OCENA: {bank.rating.toFixed(1)}/10</span>
                  </div>
                  {bank.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-100 text-blue-800">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      {bank.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ostatnia weryfikacja: {bank.last_verified}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Big CTA Card */}
            <div className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shrink-0">
              <div className="text-center mb-4">
                <span className="text-xs text-slate-500 font-medium block">Premia / Bonus na start</span>
                <span className="text-2xl font-black text-emerald-600 block mt-0.5">{bank.bonus}</span>
                <span className="text-[11px] text-slate-500 block mt-1">{bank.bonus_short}</span>
              </div>

              <AffiliateButton
                bankName={bank.bank}
                accountName={bank.account_name}
                affiliateUrl={bank.affiliate_url}
                offerId={bank.id}
                label="PRZEJDŹ DO BANKU"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
              />

              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bezpieczne przekierowanie do banku</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <span className="text-xs text-slate-500 block font-medium">Prowadzenie konta</span>
              <span className="text-lg font-black text-slate-900 block mt-0.5">{bank.monthly_fee}</span>
              <span className="text-[11px] text-slate-500 block mt-1 line-clamp-1">{bank.monthly_fee_condition}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <span className="text-xs text-slate-500 block font-medium">Karta debetowa</span>
              <span className="text-lg font-black text-slate-900 block mt-0.5">{bank.card_fee}</span>
              <span className="text-[11px] text-slate-500 block mt-1 line-clamp-1">{bank.card_fee_condition}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <span className="text-xs text-slate-500 block font-medium">Wypłaty z bankomatów</span>
              <span className="text-lg font-black text-slate-900 block mt-0.5">0 zł</span>
              <span className="text-[11px] text-slate-500 block mt-1 line-clamp-1">{bank.atm_withdrawals}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <span className="text-xs text-slate-500 block font-medium">Otwarcie online</span>
              <span className="text-lg font-black text-emerald-600 block mt-0.5">Tak (selfie)</span>
              <span className="text-[11px] text-slate-500 block mt-1">w kilkanaście minut</span>
            </div>
          </div>
        </div>

        {/* PROS & CONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Zalety */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Zalety konta</span>
            </h2>
            <ul className="space-y-3">
              {bank.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="p-1 rounded-full bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Wady */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Wady i ograniczenia</span>
            </h2>
            <ul className="space-y-3">
              {bank.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="p-1 rounded-full bg-amber-50 text-amber-600 shrink-0 mt-0.5">
                    <XIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DLA KOGO / DLA KOGO NIE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-emerald-50/60 rounded-3xl border border-emerald-100 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold text-emerald-950 mb-3">Dla kogo to konto będzie idealne?</h2>
            <ul className="space-y-2.5">
              {bank.for_who.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-100/70 rounded-3xl border border-slate-200 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">Dla kogo to konto NIE jest zalecane?</h2>
            <ul className="space-y-2.5">
              {bank.not_for_who.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <XIcon className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* WARUNKI PROMOCJI */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mt-8">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Warunki promocji powitalnej</h2>
          <p className="text-sm text-slate-600 mb-6">
            Jak zdobyć pełną premię ({bank.bonus}) w {bank.bank}? Poniżej znajduje się zestawienie kroków wymaganych przez regulamin.
          </p>

          <div className="space-y-3">
            {bank.bonus_conditions.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm text-slate-800 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-100 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Ograniczenia promocji:</strong> {bank.promotion_limits}
            </div>
          </div>
        </div>

        {/* TABELA OPŁAT */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mt-8">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Tabela opłat i prowizji (wyciąg)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Najważniejsze pozycje taryfowe z oficjalnej Tabeli Opłat i Prowizji {bank.bank}.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">Usługa / Operacja</th>
                  <th className="py-3 px-4 font-bold">Opłata</th>
                  <th className="py-3 px-4 font-bold">Warunki zwolnienia z opłaty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bank.fee_table.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{row.item}</td>
                    <td className="py-3.5 px-4 font-extrabold text-blue-600">{row.cost}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{row.condition || 'Brak'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right">
            <a
              href={bank.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 inline-flex items-center gap-1"
            >
              <span>Pełna Tabela Opłat i Prowizji na stronie {bank.bank}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* JAK OTWORZYĆ KONTO? */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mt-8">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Jak otworzyć konto krok po kroku?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bank.how_to_open_steps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-3">
                    0{idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{step}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Large bottom CTA */}
          <div className="mt-8 text-center bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-black mb-2">Gotowy na premię {bank.bonus}?</h3>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
              Załóż {bank.account_name} w {bank.bank} w 15 minut online przez bezpieczny wniosek banku.
            </p>
            <AffiliateButton
              bankName={bank.bank}
              accountName={bank.account_name}
              affiliateUrl={bank.affiliate_url}
              offerId={bank.id}
              label="PRZEJDŹ DO BANKU"
              className="inline-flex items-center gap-2 py-4 px-8 rounded-xl text-base font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl transition-all"
            />
            <p className="text-xs text-slate-400 mt-3">
              Link partnerski • Otwarcie konta bez wychodzenia z domu
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8">
          <FAQSection
            title={`Najczęstsze pytania o ${bank.account_name}`}
            items={bank.faq}
          />
        </div>
      </div>
    </div>
  );
}
