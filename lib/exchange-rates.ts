/**
 * Exchange rate management with caching
 * Uses ExchangeRate-API (free tier: 1,500 requests/month)
 */

export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

// In-memory cache (resets on server restart, which is fine for daily updates)
let cachedRates: ExchangeRates | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Fallback static rates (updated manually as backup)
const FALLBACK_RATES: ExchangeRates = {
  base: 'USD',
  rates: {
    USD: 1,
    GBP: 0.79,
    EUR: 0.93,
    AUD: 1.53,
    CAD: 1.36,
    SGD: 1.34,
    INR: 83.50,
    NZD: 1.63,
    JPY: 149.50,
    CNY: 7.24,
    CHF: 0.88,
    SEK: 10.45,
    NOK: 10.65,
    DKK: 6.93,
    ZAR: 18.45,
  },
  timestamp: Date.now(),
};

/**
 * Fetch exchange rates from API
 */
async function fetchRatesFromAPI(): Promise<ExchangeRates | null> {
  try {
    // Using ExchangeRate-API (free, no key required for basic usage)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!response.ok) {
      console.error('Exchange rate API error:', response.status);
      return null;
    }

    const data = await response.json();

    return {
      base: 'USD',
      rates: data.rates,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return null;
  }
}

/**
 * Get current exchange rates (with caching)
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
  // Check if cache is still valid
  if (cachedRates && Date.now() - cachedRates.timestamp < CACHE_DURATION) {
    return cachedRates;
  }

  // Try to fetch fresh rates
  const freshRates = await fetchRatesFromAPI();

  if (freshRates) {
    cachedRates = freshRates;
    return freshRates;
  }

  // Use cached rates even if expired (better than fallback)
  if (cachedRates) {
    console.warn('Using expired cached rates');
    return cachedRates;
  }

  // Last resort: use fallback static rates
  console.warn('Using fallback static rates');
  return FALLBACK_RATES;
}

/**
 * Convert amount from USD to target currency
 */
export async function convertFromUSD(
  amountUSD: number,
  targetCurrency: string
): Promise<number> {
  const rates = await getExchangeRates();

  const rate = rates.rates[targetCurrency];
  if (!rate) {
    console.warn(`Rate not found for ${targetCurrency}, using USD`);
    return amountUSD;
  }

  return amountUSD * rate;
}

/**
 * Convert amount from any currency to INR
 */
export async function convertToINR(
  amount: number,
  fromCurrency: string
): Promise<number> {
  if (fromCurrency === 'INR') {
    return amount;
  }

  const rates = await getExchangeRates();

  // Convert to USD first, then to INR
  const usdRate = rates.rates[fromCurrency];
  const inrRate = rates.rates.INR;

  if (!usdRate || !inrRate) {
    console.warn(`Conversion rate not found, using fallback`);
    return amount * FALLBACK_RATES.rates.INR;
  }

  const amountInUSD = amount / usdRate;
  return amountInUSD * inrRate;
}

/**
 * Get specific exchange rate
 */
export async function getRate(targetCurrency: string): Promise<number> {
  const rates = await getExchangeRates();
  return rates.rates[targetCurrency] || 1;
}

/**
 * Clear cache (for testing/admin purposes)
 */
export function clearRateCache(): void {
  cachedRates = null;
}
