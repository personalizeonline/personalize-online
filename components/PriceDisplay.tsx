'use client';

import { useCurrency } from '@/lib/useCurrency';
import { useEffect, useState } from 'react';

interface PriceDisplayProps {
  usdAmount: number;
  className?: string;
  showINR?: boolean; // Show INR conversion for non-Indian users
}

/**
 * Simple price display component that auto-converts based on user location
 * Usage: <PriceDisplay usdAmount={7.99} />
 */
export function PriceDisplay({ usdAmount, className = '', showINR = false }: PriceDisplayProps) {
  const { currency, formatPrice, convertPrice, isLoading } = useCurrency();
  const [localPrice, setLocalPrice] = useState(usdAmount);

  useEffect(() => {
    const updatePrice = async () => {
      if (!isLoading && currency.code !== 'USD') {
        const converted = await convertPrice(usdAmount);
        setLocalPrice(converted);
      }
    };
    updatePrice();
  }, [usdAmount, currency, isLoading, convertPrice]);

  if (isLoading) {
    return <span className={className}>${usdAmount.toFixed(2)}</span>;
  }

  const displayPrice = formatPrice(localPrice);

  // For Indian users, show only INR
  if (currency.code === 'INR') {
    return <span className={className}>{displayPrice}</span>;
  }

  // For others, show local currency + INR if requested
  if (showINR) {
    const inrAmount = (usdAmount * 83.5).toFixed(0);
    return (
      <span className={className}>
        {displayPrice} <span style={{ fontSize: '0.9em', opacity: 0.8 }}>(₹{inrAmount})</span>
      </span>
    );
  }

  return <span className={className}>{displayPrice}</span>;
}
