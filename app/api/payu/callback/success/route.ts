import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { logger } from '@/lib/logger';

/**
 * Verify PayU response hash
 * Response hash formula: sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 */
function verifyPayUResponseHash(params: {
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

export async function POST(req: NextRequest) {
  try {
    const merchantSalt = process.env.PAYU_MERCHANT_SALT;

    if (!merchantSalt) {
      logger.error('PayU merchant salt not configured');
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      return NextResponse.redirect(new URL('/error-payment?message=Payment+gateway+configuration+error', baseUrl));
    }

    // PayU sends response as form data
    const formData = await req.formData();

    // Extract all parameters
    const params = {
      status: formData.get('status') as string,
      txnid: formData.get('txnid') as string,
      amount: formData.get('amount') as string,
      productinfo: formData.get('productinfo') as string,
      firstname: formData.get('firstname') as string,
      email: formData.get('email') as string,
      mihpayid: formData.get('mihpayid') as string, // PayU transaction ID
      key: formData.get('key') as string,
      hash: formData.get('hash') as string,
      udf1: formData.get('udf1') as string || '',
      udf2: formData.get('udf2') as string || '',
      udf3: formData.get('udf3') as string || '',
      udf4: formData.get('udf4') as string || '',
      udf5: formData.get('udf5') as string || '',
      field9: formData.get('field9') as string || '', // Error code
      error_Message: formData.get('error_Message') as string || '', // Error message
    };

    // Validate required fields
    if (!params.status || !params.txnid || !params.hash) {
      logger.warn('PayU success callback: missing required fields');
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      return NextResponse.redirect(new URL('/error-payment?message=Invalid+payment+response', baseUrl));
    }

    // Verify hash to ensure response hasn't been tampered with
    const isValid = verifyPayUResponseHash(params, merchantSalt);

    if (!isValid) {
      logger.error('PayU success callback: hash verification failed', {
        txnid: params.txnid,
        mihpayid: params.mihpayid,
      });
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      return NextResponse.redirect(new URL('/error-payment?message=Payment+verification+failed', baseUrl));
    }

    // Check payment status
    if (params.status === 'success') {
      logger.info('Payment successful', {
        txnid: params.txnid,
        mihpayid: params.mihpayid,
        amount: params.amount,
        category: params.udf1,
        email: params.email.substring(0, 3) + '***',
      });

      // TODO: Production requirements:
      // 1. Save order to database with payment details
      // 2. Trigger song generation workflow
      // 3. Send confirmation email to customer
      // 4. Send notification to admin/fulfillment team
      // 5. Update order status to "paid"
      // 6. Add order to fulfillment queue

      // Redirect to success page with transaction details
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const successUrl = new URL('/success', baseUrl);
      successUrl.searchParams.set('txnid', params.txnid);
      successUrl.searchParams.set('mihpayid', params.mihpayid);
      successUrl.searchParams.set('amount', params.amount);

      return NextResponse.redirect(successUrl);
    } else {
      // Payment was not successful but came to success URL (shouldn't happen)
      logger.warn('Payment not successful but received at success URL', {
        status: params.status,
        txnid: params.txnid,
        error: params.error_Message,
      });

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const failureUrl = new URL('/error-payment', baseUrl);
      failureUrl.searchParams.set('message', params.error_Message || 'Payment failed');
      failureUrl.searchParams.set('txnid', params.txnid);

      return NextResponse.redirect(failureUrl);
    }

  } catch (error) {
    logger.error('Error processing PayU success callback', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(new URL('/error-payment?message=Payment+processing+error', baseUrl));
  }
}
