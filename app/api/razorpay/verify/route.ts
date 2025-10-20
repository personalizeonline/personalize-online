import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { logger } from '@/lib/logger';
import { paymentVerificationLimiter } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  // Apply rate limiting (20 requests per minute per IP)
  const rateLimitResponse = await paymentVerificationLimiter(req);
  if (rateLimitResponse) {
    return rateLimitResponse; // Rate limit exceeded
  }

  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      logger.warn('Payment verification failed: missing data');
      return NextResponse.json(
        { error: 'Missing payment verification data' },
        { status: 400 }
      );
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      logger.error('Razorpay secret key not configured');
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    // Verify signature using HMAC SHA256
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Use constant-time comparison to prevent timing attacks
    const isAuthentic = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(razorpay_signature)
    );

    if (isAuthentic) {
      logger.info('Payment verified successfully', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });

      // TODO: Production requirements:
      // 1. Save order to database with payment details
      // 2. Trigger song generation workflow
      // 3. Send confirmation email to customer
      // 4. Send notification to admin/fulfillment team
      // 5. Update order status to "paid"
      // 6. Add order to fulfillment queue

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } else {
      // Signature verification failed - possible fraud attempt
      logger.error('Payment verification failed: invalid signature', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });

      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    logger.error('Error during payment verification', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      { error: 'Payment verification error' },
      { status: 500 }
    );
  }
}
