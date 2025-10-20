import { NextRequest, NextResponse } from 'next/server';
import { logger } from './logger';

/**
 * Rate Limiting Middleware for Next.js API Routes
 *
 * Implements IP-based rate limiting to prevent abuse and DOS attacks.
 * Uses in-memory storage (suitable for single-server deployments).
 * For multi-server deployments, consider Redis-based rate limiting.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory storage for rate limit tracking
// Key: IP address, Value: { count, resetTime }
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 10 * 60 * 1000); // 10 minutes

/**
 * Get client IP address from request
 */
function getClientIp(req: NextRequest): string {
  // Check common headers for IP address (proxy/CDN scenarios)
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip'); // Cloudflare

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback to a generic identifier
  return 'unknown';
}

/**
 * Rate Limiter Configuration
 */
export interface RateLimitConfig {
  /**
   * Time window in milliseconds
   * Default: 60000 (1 minute)
   */
  windowMs?: number;

  /**
   * Maximum number of requests per window
   * Default: 10
   */
  max?: number;

  /**
   * Message to return when rate limit is exceeded
   */
  message?: string;

  /**
   * Skip rate limiting in development mode
   * Default: false
   */
  skipInDev?: boolean;
}

/**
 * Create a rate limiter middleware
 */
export function createRateLimiter(config: RateLimitConfig = {}) {
  const {
    windowMs = 60000, // 1 minute default
    max = 10,
    message = 'Too many requests, please try again later',
    skipInDev = false,
  } = config;

  return async (req: NextRequest): Promise<NextResponse | null> => {
    // Skip rate limiting in development if configured
    if (skipInDev && process.env.NODE_ENV === 'development') {
      return null;
    }

    const ip = getClientIp(req);
    const now = Date.now();

    // Get or create rate limit entry for this IP
    let entry = rateLimitStore.get(ip);

    if (!entry || now > entry.resetTime) {
      // First request or window expired, reset
      entry = {
        count: 1,
        resetTime: now + windowMs,
      };
      rateLimitStore.set(ip, entry);

      // Log first request in window
      logger.debug('Rate limit: new window', {
        ip: ip.substring(0, 8) + '***', // Partially mask IP for privacy
        count: 1,
        max,
      });

      return null; // Allow request
    }

    // Increment request count
    entry.count++;

    if (entry.count > max) {
      // Rate limit exceeded
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000); // seconds

      logger.warn('Rate limit exceeded', {
        ip: ip.substring(0, 8) + '***',
        count: entry.count,
        max,
        retryAfter,
      });

      return NextResponse.json(
        {
          error: message,
          retryAfter,
        },
        {
          status: 429, // Too Many Requests
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': max.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': entry.resetTime.toString(),
          },
        }
      );
    }

    // Update entry
    rateLimitStore.set(ip, entry);

    logger.debug('Rate limit: request allowed', {
      ip: ip.substring(0, 8) + '***',
      count: entry.count,
      max,
      remaining: max - entry.count,
    });

    return null; // Allow request
  };
}

/**
 * Pre-configured rate limiters for different endpoints
 */

/**
 * Order Creation Rate Limiter
 * 10 requests per minute per IP
 * Prevents spam order creation
 */
export const orderCreationLimiter = createRateLimiter({
  windowMs: 60000, // 1 minute
  max: 10,
  message: 'Too many order creation attempts. Please wait a minute before trying again.',
  skipInDev: false, // Apply in all environments
});

/**
 * Payment Verification Rate Limiter
 * 20 requests per minute per IP
 * More lenient as users might retry verification
 */
export const paymentVerificationLimiter = createRateLimiter({
  windowMs: 60000, // 1 minute
  max: 20,
  message: 'Too many verification attempts. Please wait before trying again.',
  skipInDev: false,
});

/**
 * Webhook Rate Limiter
 * 100 requests per minute per IP
 * Razorpay may send multiple webhooks for different events
 */
export const webhookLimiter = createRateLimiter({
  windowMs: 60000, // 1 minute
  max: 100,
  message: 'Webhook rate limit exceeded',
  skipInDev: false,
});

/**
 * Strict Rate Limiter for sensitive operations
 * 5 requests per minute per IP
 */
export const strictLimiter = createRateLimiter({
  windowMs: 60000, // 1 minute
  max: 5,
  message: 'Too many requests. Please slow down.',
  skipInDev: false,
});

/**
 * Helper function to apply rate limiter to a Next.js API route handler
 */
export async function withRateLimit(
  req: NextRequest,
  limiter: (req: NextRequest) => Promise<NextResponse | null>
): Promise<NextResponse | null> {
  return await limiter(req);
}
