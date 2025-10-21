'use client';

/**
 * React hook for currency detection and conversion
 */

import { useState, useEffect } from 'react';
import { detectCurrencyFromBrowser, CurrencyInfo } from './currency-detector';

interface UseCurrencyReturn {
  currency: CurrencyInfo;
  isLoading: boolean;
  convertPrice: (usdAmount: number) => Promise<number>;
  formatPrice: (amount: number) => string;
}

/**
 * Hook to detect user currency and provide conversion utilities
 */
export function useCurrency(): UseCurrencyReturn {
  const [currency, setCurrency] = useState<CurrencyInfo>({
    code: 'USD',
    symbol: '$',
    name: 'US Dollar'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect currency on mount
    const detectedCurrency = detectCurrencyFromBrowser();
    setCurrency(detectedCurrency);
    setIsLoading(false);
  }, []);

  /**
   * Convert USD price to user's currency
   */
  const convertPrice = async (usdAmount: number): Promise<number> => {
    try {
      const response = await fetch('/api/convert-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: usdAmount,
          from: 'USD',
          to: currency.code
        })
      });

      if (!response.ok) {
        return usdAmount; // Fallback to USD
      }

      const data = await response.json();
      return data.convertedAmount || usdAmount;
    } catch (error) {
      console.error('Price conversion failed:', error);
      return usdAmount;
    }
  };

  /**
   * Format price in user's currency
   */
  const formatPrice = (amount: number): string => {
    const decimals = ['JPY', 'KRW'].includes(currency.code) ? 0 : 2;
    return `${currency.symbol}${amount.toFixed(decimals)}`;
  };

  return {
    currency,
    isLoading,
    convertPrice,
    formatPrice
  };
}
