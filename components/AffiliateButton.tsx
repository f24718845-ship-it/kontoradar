'use client';

import React from 'react';
import { trackAffiliateClick, trackOfferClick } from '@/lib/analytics';
import { ExternalLink } from 'lucide-react';

interface AffiliateButtonProps {
  bankName: string;
  accountName: string;
  affiliateUrl: string;
  offerId?: string;
  rankPosition?: number;
  label?: string;
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export const AffiliateButton: React.FC<AffiliateButtonProps> = ({
  bankName,
  accountName,
  affiliateUrl,
  offerId,
  rankPosition,
  label = 'PRZEJDŹ DO BANKU',
  className = '',
  showIcon = true,
  children,
}) => {
  const handleClick = () => {
    trackAffiliateClick(bankName, accountName, affiliateUrl, offerId, rankPosition);
    trackOfferClick({
      bank_name: bankName,
      account_name: accountName,
      offer_id: offerId,
      rank_position: rankPosition,
      cta_label: label,
      destination_url: affiliateUrl,
    });
  };

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={className}
    >
      {children || (
        <>
          <span>{label}</span>
          {showIcon && <ExternalLink className="w-4 h-4 ml-1.5 inline-block shrink-0" />}
        </>
      )}
    </a>
  );
};
