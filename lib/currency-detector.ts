/**
 * Currency detection based on user location
 * Uses Vercel geolocation headers and fallbacks
 */

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

// Currency mappings by country code
const CURRENCY_MAP: Record<string, CurrencyInfo> = {
  US: { code: 'USD', symbol: '$', name: 'US Dollar' },
  GB: { code: 'GBP', symbol: '£', name: 'British Pound' },
  EU: { code: 'EUR', symbol: '€', name: 'Euro' },
  AU: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  CA: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  SG: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  IN: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  NZ: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  JP: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  CN: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  CH: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  SE: { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  NO: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  DK: { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  ZA: { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
};

// EU countries that use EUR
const EU_COUNTRIES = [
  'AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES'
];

/**
 * Detect user's currency from request headers (server-side)
 */
export function detectCurrencyFromHeaders(headers: Headers): CurrencyInfo {
  // Try Vercel geolocation header
  const country = headers.get('x-vercel-ip-country') ||
                  headers.get('cf-ipcountry') || // CloudFlare
                  headers.get('x-country-code'); // Generic

  if (country) {
    // Check if EU country
    if (EU_COUNTRIES.includes(country)) {
      return CURRENCY_MAP.EU;
    }

    // Direct country mapping
    if (CURRENCY_MAP[country]) {
      return CURRENCY_MAP[country];
    }
  }

  // Default to USD
  return CURRENCY_MAP.US;
}

/**
 * Detect user's currency from browser (client-side)
 */
export function detectCurrencyFromBrowser(): CurrencyInfo {
  if (typeof window === 'undefined') {
    return CURRENCY_MAP.US;
  }

  try {
    // Get locale and timezone
    const locale = navigator.language || 'en-US';
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log('[Currency Detection]', { locale, timezone });

    // Check timezone first (more reliable for India)
    if (timezone && timezone.toLowerCase().includes('kolkata') ||
        timezone && timezone.toLowerCase().includes('asia/calcutta')) {
      console.log('[Currency Detection] Detected India via timezone');
      return CURRENCY_MAP.IN;
    }

    // Try to detect currency from Intl API
    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'INR',
        currencyDisplay: 'code'
      });
      const parts = formatter.formatToParts(1000);
      const currencyPart = parts.find(p => p.type === 'currency');

      if (currencyPart && CURRENCY_MAP[currencyPart.value]) {
        console.log('[Currency Detection] Detected via Intl:', currencyPart.value);
        return getCurrencyByCode(currencyPart.value) || CURRENCY_MAP.US;
      }
    } catch (e) {
      // Intl API detection failed, continue
    }

    // Extract country code from locale (e.g., "en-IN" -> "IN", "hi-IN" -> "IN")
    const parts = locale.split('-');
    const countryCode = parts.length > 1 ? parts[1].toUpperCase() :
                       parts.length === 1 && parts[0].length === 2 ? parts[0].toUpperCase() :
                       'US';

    console.log('[Currency Detection] Country code from locale:', countryCode);

    // Check if EU country
    if (EU_COUNTRIES.includes(countryCode)) {
      return CURRENCY_MAP.EU;
    }

    // Check direct mapping
    if (CURRENCY_MAP[countryCode]) {
      console.log('[Currency Detection] Matched country:', countryCode);
      return CURRENCY_MAP[countryCode];
    }
  } catch (error) {
    console.warn('[Currency Detection] Failed:', error);
  }

  // Default fallback
  console.log('[Currency Detection] Using fallback: USD');
  return CURRENCY_MAP.US;
}

/**
 * Get all supported currencies
 */
export function getSupportedCurrencies(): CurrencyInfo[] {
  return Object.values(CURRENCY_MAP);
}

/**
 * Get currency info by code
 */
export function getCurrencyByCode(code: string): CurrencyInfo | null {
  const entry = Object.entries(CURRENCY_MAP).find(([_, curr]) => curr.code === code);
  return entry ? entry[1] : null;
}
