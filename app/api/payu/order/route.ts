import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getCategoryBySlug, isCategoryActive } from '@/lib/categories';
import { usdToInr, isValidPrice } from '@/lib/currency';
import { logger } from '@/lib/logger';
import { orderCreationLimiter } from '@/lib/rate-limit';

/**
 * Generate SHA-512 hash for PayU payment request
 * Formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
 */
function generatePayUHash(params: {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}, salt: string): string {
  const hashString = `${params.key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|${params.udf1 || ''}|${params.udf2 || ''}|${params.udf3 || ''}|${params.udf4 || ''}|${params.udf5 || ''}||||||${salt}`;

  return crypto.createHash('sha512').update(hashString).digest('hex');
}

/**
 * Generate unique transaction ID
 */
function generateTxnId(): string {
  return `TXN${Date.now()}${Math.random().toString(36).substring(2, 9)}`;
}

export async function POST(req: NextRequest) {
  // Apply rate limiting (10 requests per minute per IP)
  const rateLimitResponse = await orderCreationLimiter(req);
  if (rateLimitResponse) {
    return rateLimitResponse; // Rate limit exceeded
  }

  try {
    // Check PayU credentials
    const merchantKey = process.env.NEXT_PUBLIC_PAYU_MERCHANT_KEY;
    const merchantSalt = process.env.PAYU_MERCHANT_SALT;
    const baseUrl = process.env.NEXT_PUBLIC_PAYU_BASE_URL || 'https://test.payu.in';

    if (!merchantKey || !merchantSalt) {
      logger.error('PayU credentials not configured');
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const {
      category,
      name,
      email,
      age,
      recipientName,
      specificGoal,
      personalStory,
      musicalStyle,
      phone, // PayU requires phone number
    } = body;

    // Validate required fields
    if (!category || !name || !email || !personalStory || !musicalStyle) {
      logger.warn('Order creation failed: missing required fields', {
        category,
        hasName: !!name,
        hasEmail: !!email
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn('Order creation failed: invalid email', { category });
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate phone if provided (PayU prefers phone for better checkout experience)
    if (phone) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
        logger.warn('Order creation failed: invalid phone', { category });
        return NextResponse.json(
          { error: 'Invalid phone number. Please provide 10 digit number.' },
          { status: 400 }
        );
      }
    }

    // Validate story length
    if (personalStory.length < 20 || personalStory.length > 2000) {
      logger.warn('Order creation failed: invalid story length', {
        category,
        length: personalStory.length
      });
      return NextResponse.json(
        { error: 'Personal story must be between 20 and 2000 characters' },
        { status: 400 }
      );
    }

    // Get category details
    const categoryData = getCategoryBySlug(category);
    if (!categoryData) {
      logger.warn('Order creation failed: invalid category', { category });
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Check if seasonal category is active
    if (!isCategoryActive(category)) {
      logger.warn('Order creation failed: category out of season', {
        category: categoryData.name
      });
      return NextResponse.json(
        { error: `${categoryData.name} is currently out of season` },
        { status: 400 }
      );
    }

    // Validate price
    if (!isValidPrice(categoryData.price)) {
      logger.error('Invalid price configuration', {
        category,
        price: categoryData.price
      });
      return NextResponse.json(
        { error: 'Invalid price configuration' },
        { status: 500 }
      );
    }

    // Convert USD to INR (PayU works with INR)
    const amountInINR = usdToInr(categoryData.price);
    const amountFormatted = amountInINR.toFixed(2); // PayU expects decimal format

    // Generate unique transaction ID
    const txnid = generateTxnId();

    // Prepare product info
    const productinfo = `${categoryData.name} - Personalized Song`;

    // Get base URL for callbacks
    const appBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Prepare PayU parameters
    const payuParams = {
      key: merchantKey,
      txnid: txnid,
      amount: amountFormatted,
      productinfo: productinfo,
      firstname: name,
      email: email,
      phone: phone || '9999999999', // PayU requires phone (use dummy if not provided)
      // User Defined Fields (UDF) - store order metadata
      udf1: category,
      udf2: musicalStyle,
      udf3: recipientName || '',
      udf4: specificGoal || '',
      udf5: age || '',
      // Callback URLs
      surl: `${appBaseUrl}/api/payu/callback/success`,
      furl: `${appBaseUrl}/api/payu/callback/failure`,
    };

    // Generate hash
    const hash = generatePayUHash(payuParams, merchantSalt);

    logger.info('Creating PayU order', {
      category: categoryData.name,
      usdPrice: categoryData.price,
      inrAmount: amountFormatted,
      txnid: txnid,
      customerEmail: email.substring(0, 3) + '***',
    });

    // Return PayU payment parameters
    // Frontend will submit these via form POST to PayU
    return NextResponse.json({
      success: true,
      paymentUrl: `${baseUrl}/_payment`,
      params: {
        key: merchantKey,
        txnid: txnid,
        amount: amountFormatted,
        productinfo: productinfo,
        firstname: name,
        email: email,
        phone: payuParams.phone,
        udf1: payuParams.udf1,
        udf2: payuParams.udf2,
        udf3: payuParams.udf3,
        udf4: payuParams.udf4,
        udf5: payuParams.udf5,
        surl: payuParams.surl,
        furl: payuParams.furl,
        hash: hash,
      },
      // Store order metadata for later reference
      orderData: {
        txnid: txnid,
        category: category,
        categoryName: categoryData.name,
        customerName: name,
        customerEmail: email,
        recipientName: recipientName || '',
        specificGoal: specificGoal || '',
        personalStory: personalStory.substring(0, 200), // Store first 200 chars
        musicalStyle: musicalStyle,
        usdPrice: categoryData.price.toString(),
        inrAmount: amountFormatted,
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    logger.error('Error creating PayU order', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Unable to process order. Please try again.' },
      { status: 500 }
    );
  }
}
