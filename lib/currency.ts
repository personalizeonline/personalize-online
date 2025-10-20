/**
 * Currency conversion utilities for Razorpay integration
 *
 * Razorpay operates in INR (Indian Rupees)
 * All amounts must be in paise (1 INR = 100 paise)
 */

// Current USD to INR exchange rate (update regularly or use API)
const USD_TO_INR_RATE = 83.50; // As of 2025 - UPDATE THIS REGULARLY

/**
 * Convert USD to INR paise for Razorpay
 * @param usdAmount Amount in USD (e.g., 7.99)
 * @returns Amount in paise (smallest INR unit)
 */
export function usdToInrPaise(usdAmount: number): number {
  const inrAmount = usdAmount * USD_TO_INR_RATE;
  const paiseAmount = Math.round(inrAmount * 100);
  return paiseAmount;
}

/**
 * Format INR amount for display
 * @param paise Amount in paise
 * @returns Formatted string (e.g., "₹665.92")
 */
export function formatInr(paise: number): string {
  const inr = paise / 100;
  return `₹${inr.toFixed(2)}`;
}

/**
 * Format USD amount for display
 * @param usd Amount in USD
 * @returns Formatted string (e.g., "$7.99")
 */
export function formatUsd(usd: number): string {
  return `$${usd.toFixed(2)}`;
}

/**
 * Get display price for customer (shows both currencies)
 * @param usdAmount Amount in USD
 * @returns Formatted string with both currencies
 */
export function getDisplayPrice(usdAmount: number): string {
  const paise = usdToInrPaise(usdAmount);
  return `${formatUsd(usdAmount)} (${formatInr(paise)})`;
}

/**
 * Validate price amount
 * @param amount Price amount
 * @returns True if valid
 */
export function isValidPrice(amount: number): boolean {
  return amount > 0 && amount < 100000 && Number.isFinite(amount);
}
