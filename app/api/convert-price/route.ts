import { NextRequest, NextResponse } from 'next/server';
import { convertFromUSD } from '@/lib/exchange-rates';

export async function POST(req: NextRequest) {
  try {
    const { amount, from, to } = await req.json();

    // Validate inputs
    if (!amount || !to) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, to' },
        { status: 400 }
      );
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // For now, we only support conversion from USD
    if (from && from !== 'USD') {
      return NextResponse.json(
        { error: 'Only USD conversions supported currently' },
        { status: 400 }
      );
    }

    // Convert price
    const convertedAmount = await convertFromUSD(amount, to);

    return NextResponse.json({
      from: 'USD',
      to,
      amount,
      convertedAmount,
      rate: convertedAmount / amount
    });

  } catch (error) {
    console.error('Price conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert price' },
      { status: 500 }
    );
  }
}

// Allow GET for checking API health
export async function GET() {
  return NextResponse.json({
    message: 'Price conversion API',
    supportedFrom: ['USD'],
    supportedTo: ['USD', 'GBP', 'EUR', 'AUD', 'CAD', 'SGD', 'INR', 'NZD', 'JPY', 'CNY', 'CHF', 'SEK', 'NOK', 'DKK', 'ZAR']
  });
}
