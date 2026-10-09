import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://kontoradar.pages.dev'),
  title: {
    default: 'KontoRadar | Ranking i porównywarka kont bankowych',
    template: '%s | KontoRadar',
  },
  description:
    'Porównaj konta bankowe, opłaty, bonusy i warunki i wybierz ofertę dopasowaną do swoich potrzeb. Obiektywny ranking kont osobistych w Polsce.',
  keywords: [
    'ranking kont bankowych',
    'porównywarka kont bankowych',
    'konta osobiste',
    'darmowe konto bankowe',
    'konto bankowe z bonusem',
    'konto dla młodych',
    'najlepsze konto osobiste',
    'premie bankowe',
    'KontoRadar',
  ],
  authors: [{ name: 'KontoRadar Redakcja Finansowa' }],
  creator: 'KontoRadar',
  publisher: 'KontoRadar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://kontoradar.pages.dev/',
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN
    ? {
        google: process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN.trim(),
      }
    : undefined,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'KontoRadar | Ranking i porównywarka kont bankowych',
    description:
      'Porównaj konta bankowe, opłaty, bonusy i warunki i wybierz ofertę dopasowaną do swoich potrzeb.',
    url: 'https://kontoradar.pages.dev',
    siteName: 'KontoRadar',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KontoRadar | Ranking i porównywarka kont bankowych',
    description:
      'Obiektywny ranking i porównywarka kont bankowych. Sprawdź opłaty, bankomaty i odbierz nawet 2700 zł premii.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KontoRadar',
    url: 'https://kontoradar.pages.dev',
    logo: 'https://kontoradar.pages.dev/logo.svg',
    description: 'Niezależny ranking i porównywarka kont bankowych w Polsce.',
    sameAs: [],
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KontoRadar',
    url: 'https://kontoradar.pages.dev',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kontoradar.pages.dev/ranking-kont-bankowych?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased">
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
