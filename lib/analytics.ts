// Analytics & Event Tracking helper for KontoRadar
// Compatible with Google Analytics 4 (GA4), Cloudflare Web Analytics and custom event listeners

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type AnalyticsEventName =
  | 'offer_click'
  | 'affiliate_click'
  | 'filter_used'
  | 'comparison_started'
  | 'comparison_completed'
  | 'newsletter_subscribed';

export interface AnalyticsEventParams {
  bank_name?: string;
  account_name?: string;
  offer_id?: string;
  affiliate_url?: string;
  filter_name?: string;
  filter_value?: string;
  comparison_count?: number;
  [key: string]: any;
}

export function trackEvent(name: AnalyticsEventName, params: AnalyticsEventParams = {}): void {
  if (typeof window === 'undefined') return;

  try {
    // 1. Google Analytics 4 (gtag.js)
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }

    // 2. DataLayer push
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: name,
        ...params,
        timestamp: new Date().toISOString(),
      });
    }

    // 3. Custom DOM Event
    const customEvent = new CustomEvent('kontoradar_analytics', {
      detail: { event: name, params },
    });
    window.dispatchEvent(customEvent);

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[KontoRadar Analytics] ${name}`, params);
    }
  } catch (err) {
    console.error('Analytics tracking error:', err);
  }
}

export function trackAffiliateClick(bank: string, account: string, url: string, offerId?: string): void {
  trackEvent('affiliate_click', {
    bank_name: bank,
    account_name: account,
    affiliate_url: url,
    offer_id: offerId,
    event_category: 'affiliate',
    event_label: `${bank} - ${account}`,
  });
}
