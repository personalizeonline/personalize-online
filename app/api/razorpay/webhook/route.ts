import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { logger } from '@/lib/logger';
import { webhookLimiter } from '@/lib/rate-limit';

/**
 * Razorpay Webhook Handler
 *
 * This endpoint receives payment events from Razorpay servers.
 * It's critical for handling cases where users close the browser
 * before payment confirmation completes.
 *
 * Setup in Razorpay Dashboard:
 * 1. Go to Settings → Webhooks
 * 2. Add webhook URL: https://yourdomain.com/api/razorpay/webhook
 * 3. Select events: payment.authorized, payment.failed, payment.captured
 * 4. Get webhook secret and add to .env as RAZORPAY_WEBHOOK_SECRET
 */

export async function POST(req: NextRequest) {
  // Apply rate limiting (100 requests per minute per IP)
  const rateLimitResponse = await webhookLimiter(req);
  if (rateLimitResponse) {
    return rateLimitResponse; // Rate limit exceeded
  }

  try {
    const body = await req.text(); // Get raw body for signature verification
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      logger.warn('Webhook rejected: missing signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      logger.error('Webhook secret not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    );

    if (!isValid) {
      logger.error('Webhook rejected: invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Parse the event
    const event = JSON.parse(body);
    const eventType = event.event;
    const payment = event.payload?.payment?.entity;
    const order = event.payload?.order?.entity;

    logger.info('Webhook received', {
      event: eventType,
      paymentId: payment?.id,
      orderId: payment?.order_id || order?.id,
    });

    // Handle different event types
    switch (eventType) {
      case 'payment.authorized':
        await handlePaymentAuthorized(payment);
        break;

      case 'payment.captured':
        await handlePaymentCaptured(payment);
        break;

      case 'payment.failed':
        await handlePaymentFailed(payment);
        break;

      case 'order.paid':
        await handleOrderPaid(order);
        break;

      default:
        logger.debug('Unhandled webhook event', { event: eventType });
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    logger.error('Webhook processing error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentAuthorized(payment: any) {
  logger.info('Payment authorized', {
    paymentId: payment.id,
    orderId: payment.order_id,
    amount: payment.amount,
  });

  // TODO: Update order status to "authorized"
  // Payment has been authorized but not captured yet
}

async function handlePaymentCaptured(payment: any) {
  logger.info('Payment captured', {
    paymentId: payment.id,
    orderId: payment.order_id,
    amount: payment.amount,
  });

  // TODO: This is the final confirmation!
  // 1. Mark order as paid in database
  // 2. Trigger song generation
  // 3. Send confirmation email
  // 4. Add to fulfillment queue
}

async function handlePaymentFailed(payment: any) {
  logger.warn('Payment failed', {
    paymentId: payment.id,
    orderId: payment.order_id,
    errorCode: payment.error_code,
    errorDescription: payment.error_description,
  });

  // TODO:
  // 1. Mark order as failed
  // 2. Send failed payment notification
  // 3. Optionally send retry link
}

async function handleOrderPaid(order: any) {
  logger.info('Order marked as paid', {
    orderId: order.id,
    amount: order.amount,
  });

  // TODO: Backup handler for order completion
}
