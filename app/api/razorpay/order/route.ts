import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getCategoryBySlug, isCategoryActive } from '@/lib/categories';
import { usdToInrPaise, isValidPrice } from '@/lib/currency';
import { logger } from '@/lib/logger';
import { orderCreationLimiter } from '@/lib/rate-limit';

// Initialize Razorpay instance
const getRazorpay = () => {
  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    logger.error('Razorpay credentials not configured');
    throw new Error('Payment gateway not configured');
  }

  return new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

export async function POST(req: NextRequest) {
  // Apply rate limiting (10 requests per minute per IP)
  const rateLimitResponse = await orderCreationLimiter(req);
  if (rateLimitResponse) {
    return rateLimitResponse; // Rate limit exceeded
  }

  try {
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
    } = body;

    // Validate required fields
    if (!category || !name || !email || !personalStory || !musicalStyle) {
      logger.warn('Order creation failed: missing required fields', { category, hasName: !!name, hasEmail: !!email });
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

    // Validate story length
    if (personalStory.length < 20 || personalStory.length > 2000) {
      logger.warn('Order creation failed: invalid story length', { category, length: personalStory.length });
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
      logger.warn('Order creation failed: category out of season', { category: categoryData.name });
      return NextResponse.json(
        { error: `${categoryData.name} is currently out of season` },
        { status: 400 }
      );
    }

    // Validate price
    if (!isValidPrice(categoryData.price)) {
      logger.error('Invalid price configuration', { category, price: categoryData.price });
      return NextResponse.json(
        { error: 'Invalid price configuration' },
        { status: 500 }
      );
    }

    // Create Razorpay order
    const razorpay = getRazorpay();

    // Convert USD to INR paise (CRITICAL: Razorpay uses INR, our prices are in USD)
    // Example: $7.99 USD → ₹665.92 → 66592 paise
    const amountInPaise = usdToInrPaise(categoryData.price);

    logger.info('Creating Razorpay order', {
      category: categoryData.name,
      usdPrice: categoryData.price,
      inrPaise: amountInPaise,
      customerEmail: email.substring(0, 3) + '***', // Partially mask email
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `order_${Date.now()}_${category}`,
      notes: {
        category,
        categoryName: categoryData.name,
        customerName: name,
        customerEmail: email,
        age: age || '',
        recipientName: recipientName || '',
        specificGoal: specificGoal || '',
        personalStory: personalStory.substring(0, 200), // Store only first 200 chars in notes
        musicalStyle,
        usdPrice: categoryData.price.toString(),
        timestamp: new Date().toISOString(),
      },
    });

    logger.info('Razorpay order created successfully', {
      orderId: order.id,
      amount: order.amount,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    logger.error('Error creating Razorpay order', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Unable to process order. Please try again.' },
      { status: 500 }
    );
  }
}
