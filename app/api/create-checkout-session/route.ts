import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCategoryBySlug, isCategoryActive } from '@/lib/categories';

// Initialize Stripe lazily to avoid build-time errors
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  });
};

export async function POST(req: NextRequest) {
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
      // price is not used - we get it from categoryData.price instead
    } = body;

    // Validate required fields
    if (!category || !name || !email || !personalStory || !musicalStyle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get category details
    const categoryData = getCategoryBySlug(category);
    if (!categoryData) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Check if seasonal category is active
    if (!isCategoryActive(category)) {
      return NextResponse.json(
        { error: `${categoryData.name} is currently out of season` },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Personalized ${categoryData.name}`,
              description: `Personalized song with your name in the lyrics`,
              images: [], // Add your product image URL here
              metadata: {
                category: category,
              },
            },
            unit_amount: Math.round(categoryData.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${category}`,
      customer_email: email,
      metadata: {
        category,
        name,
        email,
        age: age || '',
        recipientName: recipientName || '',
        specificGoal: specificGoal || '',
        personalStory,
        musicalStyle,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
