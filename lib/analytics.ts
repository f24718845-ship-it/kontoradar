// Analytics & Event Tracking helper for KontoRadar
// Compatible with Google Analytics 4 (GA4), Cloudflare Web Analytics and custom event listeners

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type AnalyticsEventName =
  | 'page_view'
  | 'offer_click'
  | 'affiliate_click'
  | 'filter_used'
  | 'comparison_started'
  | 'comparison_completed'
  | 'calculator_used';

export interface PageViewParams {
  page_path: string;
  page_title?: string;
  page_location?: string;
  [key: string]: any;
}

export interface OfferClickParams {
  bank_name: string;
  account_name: string;
  offer_id?: string;
  rank_position?: number;
  cta_label?: string;
  destination_url?: string;
  [key: string]: any;
}

export interface AffiliateClickParams {
  bank_name: string;
  account_name: string;
  affiliate_url: string;
  offer_id?: string;
  rank_position?: number;
  [key: string]: any;
}

export interface FilterUsedParams {
  filter_name: string;
  filter_value: string | number | boolean;
  total_results?: number;
  [key: string]: any;
}

export interface ComparisonParams {
  comparison_count: number;
  accounts_compared?: string[];
  [key: string]: any;
}

export interface CalculatorUsedParams {
  monthly_income: number;
  monthly_spend?: number;
  savings_amount: number;
  estimated_gain: number;
  [key: string]: any;
}

export type AnalyticsEventParams =
  | PageViewParams
  | OfferClickParams
  | AffiliateClickParams
  | FilterUsedParams
  | ComparisonParams
  | CalculatorUsedParams
  | Record<string, any>;

/**
 * Universal event dispatcher for Google Analytics 4, DataLayer, and custom events.
 * Safe for SSR (no-op on server).
 */
export function trackEvent(name: AnalyticsEventName, params: AnalyticsEventParams = {}): void {
  if (typeof window === 'undefined') return;

  try {
    // 1. Google Analytics 4 (gtag.js)
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }

    // 2. DataLayer push (Standard GTM / GA4 compatibility)
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: name,
        ...params,
        timestamp: new Date().toISOString(),
      });
    }

    // 3. Custom DOM Event (allows decoupled listeners & testing)
    const customEvent = new CustomEvent('kontoradar_analytics', {
      detail: { event: name, params, timestamp: Date.now() },
    });
    window.dispatchEvent(customEvent);

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`[KontoRadar Analytics] ${name}`, params);
    }
  } catch (err) {
    console.error('Analytics tracking error:', err);
  }
}

/**
 * Tracks page view in Single Page Application navigation
 */
export function trackPageView(url: string, title?: string): void {
  const params: PageViewParams = {
    page_path: url,
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  };

  // GA4 config update if measurement ID is active
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (typeof window !== 'undefined' && typeof window.gtag === 'function' && gaId) {
    window.gtag('config', gaId, {
      page_path: url,
      page_title: params.page_title,
    });
  }

  trackEvent('page_view', params);
}

/**
 * Tracks clicks on offer cards, details, and reviews
 */
export function trackOfferClick(params: OfferClickParams): void {
  trackEvent('offer_click', {
    ...params,
    event_category: 'offer_interaction',
    event_label: `${params.bank_name} - ${params.account_name}`,
  });
}

/**
 * Tracks outbound affiliate clicks (Money2Money partner links)
 */
export function trackAffiliateClick(
  bank: string,
  account: string,
  url: string,
  offerId?: string,
  rankPosition?: number
): void {
  trackEvent('affiliate_click', {
    bank_name: bank,
    account_name: account,
    affiliate_url: url,
    offer_id: offerId,
    rank_position: rankPosition,
    event_category: 'affiliate_conversion',
    event_label: `${bank} - ${account}`,
  });
}

/**
 * Tracks filter changes and sorting in rankings
 */
export function trackFilterUsed(filterName: string, filterValue: string | number | boolean, totalResults?: number): void {
  trackEvent('filter_used', {
    filter_name: filterName,
    filter_value: String(filterValue),
    total_results: totalResults,
    event_category: 'user_engagement',
  });
}

/**
 * Tracks when a user initiates account comparison
 */
export function trackComparisonStarted(comparisonCount: number, accounts?: string[]): void {
  trackEvent('comparison_started', {
    comparison_count: comparisonCount,
    accounts_compared: accounts,
    event_category: 'comparison_tool',
  });
}

/**
 * Tracks when a user views or completes a comparison
 */
export function trackComparisonCompleted(comparisonCount: number, accounts?: string[]): void {
  trackEvent('comparison_completed', {
    comparison_count: comparisonCount,
    accounts_compared: accounts,
    event_category: 'comparison_tool',
  });
}

/**
 * Tracks usage of the banking profit/bonus calculator
 */
export function trackCalculatorUsed(params: CalculatorUsedParams): void {
  trackEvent('calculator_used', {
    ...params,
    event_category: 'calculator_tool',
    event_label: `Zysk: ${params.estimated_gain} zł`,
  });
}
