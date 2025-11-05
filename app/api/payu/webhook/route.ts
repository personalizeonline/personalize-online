import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { logger } from '@/lib/logger';

/**
 * Verify PayU webhook hash
 * PayU webhooks use the same response hash formula
 */
function verifyPayUWebhookHash(params: {
  status: string;
  udf5?: string;
  udf4?: string;
  udf3?: string;
  udf2?: string;
  udf1?: string;
  email: string;
  firstname: string;
  productinfo: string;
  amount: string;
  txnid: string;
  key: string;
  hash: string;
}, salt: string): boolean {
  const hashString = `${salt}|${params.status}||||||${params.udf5 || ''}|${params.udf4 || ''}|${params.udf3 || ''}|${params.udf2 || ''}|${params.udf1 || ''}|${params.email}|${params.firstname}|${params.productinfo}|${params.amount}|${params.txnid}|${params.key}`;

  const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

  return calculatedHash === params.hash;
}

/**
 * PayU Webhook Handler
 *
 * PayU can send webhooks for payment status updates
 * This provides a server-to-server confirmation independent of user redirects
 *
 * Configure webhook URL in PayU Dashboard:
 * https://your-domain.com/api/payu/webhook
 */
export async function POST(req: NextRequest) {
  try {
    const merchantSalt = process.env.PAYU_MERCHANT_SALT;

    if (!merchantSalt) {
      logger.error('PayU merchant salt not configured');
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    // PayU sends webhook as form data
    const formData = await req.formData();

    // Extract all parameters
    const params = {
      status: formData.get('status') as string,
      txnid: formData.get('txnid') as string,
      amount: formData.get('amount') as string,
      productinfo: formData.get('productinfo') as string,
      firstname: formData.get('firstname') as string,
      email: formData.get('email') as string,
      mihpayid: formData.get('mihpayid') as string,
      key: formData.get('key') as string,
      hash: formData.get('hash') as string,
      udf1: formData.get('udf1') as string || '',
      udf2: formData.get('udf2') as string || '',
      udf3: formData.get('udf3') as string || '',
      udf4: formData.get('udf4') as string || '',
      udf5: formData.get('udf5') as string || '',
      field9: formData.get('field9') as string || '',
      error_Message: formData.get('error_Message') as string || '',
      mode: formData.get('mode') as string || '', // Payment mode (CC, DC, NB, UPI, etc.)
      bankcode: formData.get('bankcode') as string || '',
      cardnum: formData.get('cardnum') as string || '', // Masked card number
    };

    // Validate required fields
    if (!params.status || !params.txnid || !params.hash) {
      logger.warn('PayU webhook: missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify hash to prevent tampering
    const isValid = verifyPayUWebhookHash(params, merchantSalt);

    if (!isValid) {
      logger.error('PayU webhook: hash verification failed', {
        txnid: params.txnid,
        mihpayid: params.mihpayid,
      });
      return NextResponse.json(
        { error: 'Invalid hash' },
        { status: 400 }
      );
    }

    // Log webhook reception
    logger.info('PayU webhook received', {
      txnid: params.txnid,
      mihpayid: params.mihpayid,
      status: params.status,
      amount: params.amount,
      mode: params.mode,
      category: params.udf1,
      email: params.email.substring(0, 3) + '***',
    });

    // Handle different payment statuses
    switch (params.status) {
      case 'success':
        logger.info('Webhook: Payment successful', {
          txnid: params.txnid,
          mihpayid: params.mihpayid,
          amount: params.amount,
        });

        // TODO: Production requirements:
        // 1. Update order status in database to "paid"
        // 2. If not already triggered, start song generation workflow
        // 3. Send confirmation email if not sent
        // 4. Send admin notification
        // 5. Mark webhook as processed to avoid duplicates

        break;

      case 'pending':
        logger.info('Webhook: Payment pending', {
          txnid: params.txnid,
          mihpayid: params.mihpayid,
        });

        // TODO: Update order status to "pending"
        // Wait for final confirmation webhook

        break;

      case 'failed':
        logger.info('Webhook: Payment failed', {
          txnid: params.txnid,
          mihpayid: params.mihpayid,
          error: params.error_Message,
          errorCode: params.field9,
        });

        // TODO: Update order status to "failed"
        // Optionally send failure notification email

        break;

      case 'userCancelled':
        logger.info('Webhook: Payment cancelled by user', {
          txnid: params.txnid,
        });

        // TODO: Update order status to "cancelled"

        break;

      default:
        logger.warn('Webhook: Unknown payment status', {
          status: params.status,
          txnid: params.txnid,
        });
    }

    // Return success response to PayU
    // PayU expects a 200 OK response to confirm webhook was received
    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      txnid: params.txnid,
    });

  } catch (error) {
    logger.error('Error processing PayU webhook', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Webhook processing error' },
      { status: 500 }
    );
  }
}
