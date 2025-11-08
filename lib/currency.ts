/**
 * Currency conversion utilities for Razorpay integration
 *
 * Razorpay operates in INR (Indian Rupees)
 * All amounts must be in paise (1 INR = 100 paise)
 */

import { convertFromUSD, getRate } from './exchange-rates';
import { CurrencyInfo } from './currency-detector';

// Fallback USD to INR exchange rate (if API fails)
const FALLBACK_USD_TO_INR_RATE = 83.50;

/**
 * Convert USD to INR paise for Razorpay (with live rates)
 * @param usdAmount Amount in USD (e.g., 7.99)
 * @returns Amount in paise (smallest INR unit)
 */
export async function usdToInrPaiseAsync(usdAmount: number): Promise<number> {
  try {
    const inrAmount = await convertFromUSD(usdAmount, 'INR');
    const paiseAmount = Math.round(inrAmount * 100);
    return paiseAmount;
  } catch (error) {
    console.error('Failed to convert USD to INR:', error);
    // Fallback to static rate
    const inrAmount = usdAmount * FALLBACK_USD_TO_INR_RATE;
    return Math.round(inrAmount * 100);
  }
}

/**
 * Convert USD to INR paise for Razorpay (synchronous, uses fallback rate)
 * @param usdAmount Amount in USD (e.g., 7.99)
 * @returns Amount in paise (smallest INR unit)
 */
export function usdToInrPaise(usdAmount: number): number {
  const inrAmount = usdAmount * FALLBACK_USD_TO_INR_RATE;
  const paiseAmount = Math.round(inrAmount * 100);
  return paiseAmount;
}

/**
 * Convert USD to INR for PayU (synchronous, uses fallback rate)
 * @param usdAmount Amount in USD (e.g., 7.99)
 * @returns Amount in INR (e.g., 667.165)
 */
export function usdToInr(usdAmount: number): number {
  return usdAmount * FALLBACK_USD_TO_INR_RATE;
}

/**
 * Convert USD to any currency
 * @param usdAmount Amount in USD
 * @param targetCurrency Target currency code
 * @returns Converted amount
 */
export async function convertPrice(
  usdAmount: number,
  targetCurrency: string
): Promise<number> {
  if (targetCurrency === 'USD') {
    return usdAmount;
  }

  try {
    return await convertFromUSD(usdAmount, targetCurrency);
  } catch (error) {
    console.error('Price conversion failed:', error);
    return usdAmount; // Return USD as fallback
  }
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
 * Format amount in specific currency
 * @param amount Amount to format
 * @param currencyInfo Currency information
 * @returns Formatted string (e.g., "$7.99", "£6.29", "€7.39")
 */
export function formatCurrency(amount: number, currencyInfo: CurrencyInfo): string {
  // Special handling for currencies without decimals (JPY, etc.)
  const decimals = ['JPY', 'KRW'].includes(currencyInfo.code) ? 0 : 2;

  return `${currencyInfo.symbol}${amount.toFixed(decimals)}`;
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
 * Get display price for customer (shows local currency + INR)
 * @param usdAmount Amount in USD
 * @param userCurrency User's detected currency
 * @param localAmount Amount in user's currency
 * @returns Formatted string with user currency and INR
 */
export function getLocalizedDisplayPrice(
  usdAmount: number,
  userCurrency: CurrencyInfo,
  localAmount: number
): string {
  const paise = usdToInrPaise(usdAmount);
  const inrAmount = formatInr(paise);

  // If user is from India, show INR only
  if (userCurrency.code === 'INR') {
    return inrAmount;
  }

  // Show local currency with INR conversion
  return `${formatCurrency(localAmount, userCurrency)} (${inrAmount})`;
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
