export interface BankOffer {
  id: string;
  slug: string;
  bank: string;
  account_name: string;
  badge?: string;
  rating: number; // 0 - 10
  rating_breakdown: {
    costs: number; // 0 - 2.5
    atms: number; // 0 - 1.5
    mobile_app: number; // 0 - 2.0
    bonus: number; // 0 - 2.0
    convenience: number; // 0 - 2.0
  };
  monthly_fee: string; // np. "0 zł"
  monthly_fee_condition: string;
  card_fee: string; // np. "0 zł" lub "0 zł / 9 zł"
  card_fee_condition: string;
  bonus: string; // np. "do 650 zł"
  bonus_short: string;
  bonus_conditions: string[];
  promotion_limits: string;
  atm_withdrawals: string;
  blik: boolean;
  blik_details: string;
  transfers: string;
  mobile_payments: string[];
  apple_pay: boolean;
  google_pay: boolean;
  online_opening: boolean;
  online_opening_methods: string[];
  additional_benefits: string[];
  income_requirements: string;
  transaction_requirements: string;
  age_requirement?: string;
  pros: string[];
  cons: string[];
  for_who: string[];
  not_for_who: string[];
  fee_table: {
    item: string;
    cost: string;
    condition?: string;
  }[];
  how_to_open_steps: string[];
  faq: {
    q: string;
    a: string;
  }[];
  affiliate_url: string;
  source_url: string;
  last_verified: string;
  is_promoted?: boolean;
  category_tags: string[]; // 'darmowe' | 'bonus' | 'dla-mlodych' | 'premium' | 'mobilne' | 'bez-oplat'
  logo_bg: string;
  logo_text: string;
  accent_color: string;
}
