'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

function RouteChangeTracker({ gaId }: { gaId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    const fullUrl = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    // Avoid duplicate page_view fires on initial mount if already tracked
    if (lastPathnameRef.current === fullUrl) return;
    lastPathnameRef.current = fullUrl;

    trackPageView(fullUrl, document.title);
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  // Validate GA4 Measurement ID format (e.g. G-XXXXXXXXXX)
  // Ensures no random/fake placeholder scripts are loaded if not provided
  const isValidGaId = gaId && /^G-[A-Z0-9]+$/i.test(gaId) && !gaId.includes('XXXX');

  return (
    <>
      {isValidGaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                  send_page_view: false // Page views handled dynamically by RouteChangeTracker
                });
              `,
            }}
          />
        </>
      )}

      {/* Dynamic Route Change Tracker across all Next.js App Router navigations */}
      <Suspense fallback={null}>
        <RouteChangeTracker gaId={isValidGaId ? gaId : undefined} />
      </Suspense>
    </>
  );
}
