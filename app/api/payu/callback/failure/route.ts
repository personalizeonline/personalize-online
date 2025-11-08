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
      mihpayid: formData.get('mihpayid') as string || 'N/A', // May not be present on failure
      key: formData.get('key') as string,
      hash: formData.get('hash') as string,
      udf1: formData.get('udf1') as string || '',
      udf2: formData.get('udf2') as string || '',
      udf3: formData.get('udf3') as string || '',
      udf4: formData.get('udf4') as string || '',
      udf5: formData.get('udf5') as string || '',
      field9: formData.get('field9') as string || '', // Error code
      error_Message: formData.get('error_Message') as string || 'Payment failed', // Error message
    };

    // Validate required fields
    if (!params.status || !params.txnid || !params.hash) {
      logger.warn('PayU failure callback: missing required fields');
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      return NextResponse.redirect(new URL('/error-payment?message=Invalid+payment+response', baseUrl));
    }

    // Verify hash to ensure response hasn't been tampered with
    const isValid = verifyPayUResponseHash(params, merchantSalt);

    if (!isValid) {
      logger.error('PayU failure callback: hash verification failed', {
        txnid: params.txnid,
        status: params.status,
      });
      // Still redirect to error page but log the hash mismatch
    }

    // Log the failure
    logger.info('Payment failed or cancelled', {
      txnid: params.txnid,
      mihpayid: params.mihpayid,
      status: params.status,
      error: params.error_Message,
      errorCode: params.field9,
      amount: params.amount,
      category: params.udf1,
      email: params.email.substring(0, 3) + '***',
    });

    // Determine appropriate error message
    let errorMessage = params.error_Message;

    if (params.status === 'userCancelled') {
      errorMessage = 'Payment was cancelled. You can try again when ready.';
    } else if (params.status === 'pending') {
      errorMessage = 'Payment is pending. Please check your email for updates.';
    } else if (params.status === 'failed') {
      errorMessage = params.error_Message || 'Payment failed. Please try again or use a different payment method.';
    }

    // Redirect to error page with details
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const errorUrl = new URL('/error-payment', baseUrl);
    errorUrl.searchParams.set('message', errorMessage);
    errorUrl.searchParams.set('txnid', params.txnid);
    errorUrl.searchParams.set('status', params.status);

    return NextResponse.redirect(errorUrl);

  } catch (error) {
    logger.error('Error processing PayU failure callback', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(new URL('/error-payment?message=Payment+processing+error', baseUrl));
  }
}
