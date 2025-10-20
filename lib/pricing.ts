// Pricing tiers and logic for personalized songs

export interface PricingTier {
  id: string;
  name: string;
  quantity: number;
  launchPrice: number;
  standardPrice: number;
  perSongPrice: number;
  savings: number;
  badge?: string;
  description: string;
  popular?: boolean;
  bestValue?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'single',
    name: 'Single Song',
    quantity: 1,
    launchPrice: 5.99,
    standardPrice: 7.99,
    perSongPrice: 5.99,
    savings: 0,
    badge: '⚡ Try It Out',
    description: 'Perfect for first-timers or one-time gifts',
    popular: false,
    bestValue: false
  },
  {
    id: 'triple',
    name: '3 Songs',
    quantity: 3,
    launchPrice: 15.99,
    standardPrice: 19.99,
    perSongPrice: 5.33,
    savings: 2.00,
    badge: '⭐ MOST POPULAR',
    description: 'Different moods, multiple gifts, or just stock up',
    popular: true,
    bestValue: false
  },
  {
    id: 'bundle',
    name: '10 Songs',
    quantity: 10,
    launchPrice: 39.99,
    standardPrice: 44.99,
    perSongPrice: 4.00,
    savings: 20.00,
    badge: '💎 BEST VALUE',
    description: 'The creator pack - perfect for power users',
    popular: false,
    bestValue: true
  }
];

// Launch pricing: First 1000 customers get discounted rates
export const LAUNCH_CUSTOMER_LIMIT = 1000;

/**
 * Get current sales count from API or localStorage
 * In production, this would hit your backend
 */
export function getCurrentSalesCount(): number {
  if (typeof window === 'undefined') return 0;

  // For now, use localStorage as demo
  const count = localStorage.getItem('totalSalesCount');
  return count ? parseInt(count, 10) : 0;
}

/**
 * Check if launch pricing is still active
 */
export function isLaunchPricingActive(): boolean {
  return getCurrentSalesCount() < LAUNCH_CUSTOMER_LIMIT;
}

/**
 * Get remaining launch pricing slots
 */
export function getRemainingLaunchSlots(): number {
  const remaining = LAUNCH_CUSTOMER_LIMIT - getCurrentSalesCount();
  return Math.max(0, remaining);
}

/**
 * Get current price for a tier
 */
export function getCurrentPrice(tierId: string): number {
  const tier = PRICING_TIERS.find(t => t.id === tierId);
  if (!tier) return 0;

  return isLaunchPricingActive() ? tier.launchPrice : tier.standardPrice;
}

/**
 * Get pricing tier by ID
 */
export function getPricingTier(tierId: string): PricingTier | undefined {
  return PRICING_TIERS.find(t => t.id === tierId);
}

/**
 * Calculate savings for standard pricing
 */
export function getStandardSavings(tier: PricingTier): number {
  if (tier.quantity === 1) return 0;
  const regularTotal = tier.quantity * 7.99;
  return regularTotal - tier.standardPrice;
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * Get seasonal premium pricing
 */
export interface SeasonalPricing {
  slug: string;
  price: number;
}

export const SEASONAL_PREMIUM_PRICING: SeasonalPricing[] = [
  { slug: 'christmas', price: 9.99 },
  { slug: 'valentines', price: 9.99 },
  { slug: 'mothers-day', price: 8.99 },
  { slug: 'fathers-day', price: 8.99 }
];

/**
 * Get price for a category (includes seasonal premium)
 */
export function getCategoryPrice(categorySlug: string): number {
  const seasonal = SEASONAL_PREMIUM_PRICING.find(s => s.slug === categorySlug);
  if (seasonal) return seasonal.price;

  // Default to launch or standard single song price
  return isLaunchPricingActive() ? 5.99 : 7.99;
}
