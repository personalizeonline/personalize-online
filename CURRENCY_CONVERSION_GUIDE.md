# Automatic Currency Conversion - Implementation Guide

## Overview

Your app now supports automatic currency conversion based on user location. Prices are displayed in the user's local currency, but all payments are processed in INR through Razorpay (as required).

## How It Works

### User Experience:
1. **US Visitor** → Sees "$7.99 (₹667 INR)"
2. **UK Visitor** → Sees "£6.29 (₹667 INR)"
3. **EU Visitor** → Sees "€7.39 (₹667 INR)"
4. **Indian Visitor** → Sees "₹667"

All customers pay the same ₹667 to Razorpay - the display just adapts to their currency.

## Implementation Details

### 1. Currency Detection (`lib/currency-detector.ts`)
- **Server-side**: Uses Vercel's `x-vercel-ip-country` header
- **Client-side**: Uses browser's `navigator.language`
- **Supports**: 15+ currencies (USD, GBP, EUR, AUD, CAD, SGD, INR, etc.)
- **Fallback**: Defaults to USD if detection fails

### 2. Exchange Rates (`lib/exchange-rates.ts`)
- **API**: ExchangeRate-API (free tier: 1,500 requests/month)
- **Caching**: 24-hour in-memory cache
- **Fallback**: Static rates if API fails
- **Update**: Fetches fresh rates once per day

### 3. Price Conversion API (`/api/convert-price`)
**Endpoint**: `POST /api/convert-price`

**Request**:
```json
{
  "amount": 7.99,
  "from": "USD",
  "to": "GBP"
}
```

**Response**:
```json
{
  "from": "USD",
  "to": "GBP",
  "amount": 7.99,
  "convertedAmount": 6.31,
  "rate": 0.79
}
```

### 4. React Hook (`lib/useCurrency.ts`)
Components use the `useCurrency` hook to:
- Detect user's currency automatically
- Convert prices from USD to local currency
- Format prices correctly (e.g., £6.29, €7.39)

**Usage**:
```typescript
const { currency, formatPrice, convertPrice, isLoading } = useCurrency();

const localPrice = await convertPrice(7.99);
const formatted = formatPrice(localPrice); // "£6.29"
```

### 5. Updated Components

#### Pricing Component
- Shows prices in user's currency
- Displays INR conversion for non-Indian users
- Updates footer text dynamically

#### Hero Component
- CTA button shows local price
- Falls back to USD while loading

#### CategoryGrid Component
- All category prices converted
- Smooth loading experience

## Supported Currencies

| Country/Region | Currency | Symbol | Code |
|---------------|----------|--------|------|
| United States | US Dollar | $ | USD |
| United Kingdom | British Pound | £ | GBP |
| Eurozone | Euro | € | EUR |
| Australia | Australian Dollar | A$ | AUD |
| Canada | Canadian Dollar | C$ | CAD |
| Singapore | Singapore Dollar | S$ | SGD |
| India | Indian Rupee | ₹ | INR |
| New Zealand | NZ Dollar | NZ$ | NZD |
| Japan | Japanese Yen | ¥ | JPY |
| China | Chinese Yuan | ¥ | CNY |
| Switzerland | Swiss Franc | CHF | CHF |
| Sweden | Swedish Krona | kr | SEK |
| Norway | Norwegian Krone | kr | NOK |
| Denmark | Danish Krone | kr | DKK |
| South Africa | South African Rand | R | ZAR |

## How Razorpay Handles It

### Payment Flow:
1. User sees price in their currency (e.g., "$7.99")
2. They click "Buy Now"
3. Razorpay checkout shows INR amount (₹667)
4. User pays with international card
5. Their bank converts ₹667 to local currency
6. Small forex fee may apply (2-3% from bank)

### Razorpay International Support:
✅ Accepts international cards (Visa, Mastercard, Amex)
✅ Customers can pay from any country
✅ All transactions must be in INR
✅ Automatic currency conversion by customer's bank

## Exchange Rate Management

### Automatic Updates:
- Rates fetch from API once every 24 hours
- Cached in-memory for performance
- Automatic fallback if API is down

### Manual Updates:
If you need to update fallback rates manually, edit `lib/exchange-rates.ts`:

```typescript
const FALLBACK_RATES: ExchangeRates = {
  base: 'USD',
  rates: {
    USD: 1,
    GBP: 0.79,  // ← Update these manually
    EUR: 0.93,
    // ...
  },
  timestamp: Date.now(),
};
```

## Testing

### Test Currency Detection:
1. Use browser developer tools
2. Change browser language (Chrome: Settings → Languages)
3. Reload page - prices update automatically

### Test API:
```bash
curl -X POST http://localhost:3000/api/convert-price \
  -H "Content-Type: application/json" \
  -d '{"amount": 7.99, "to": "GBP"}'
```

### Test on Vercel:
Vercel automatically detects visitor's country via IP.
No configuration needed!

## Production Deployment

### Environment Variables:
No additional environment variables needed! The exchange rate API works without authentication on the free tier.

### Optional (For Higher Limits):
If you exceed 1,500 requests/month, sign up at https://www.exchangerate-api.com/ and add:

```
EXCHANGE_RATE_API_KEY=your_api_key_here
```

Then update `lib/exchange-rates.ts` to use the authenticated endpoint.

## Files Modified/Created

### Created:
- `lib/currency-detector.ts` - Currency detection logic
- `lib/exchange-rates.ts` - Exchange rate fetching & caching
- `lib/useCurrency.ts` - React hook for components
- `app/api/convert-price/route.ts` - Price conversion API

### Modified:
- `lib/currency.ts` - Added multi-currency support
- `components/Pricing.tsx` - Dynamic currency display
- `components/Hero.tsx` - Local currency in CTA
- `components/CategoryGrid.tsx` - Converted category prices

## Future Enhancements

### Possible Additions:
1. **Manual Currency Selector** - Let users choose their preferred currency
2. **More Currencies** - Add more supported currencies as needed
3. **Real-time Rates** - Use WebSocket for live exchange rates
4. **Analytics** - Track which currencies users prefer
5. **A/B Testing** - Test impact on conversion rates

## Support

### Common Issues:

**Q: Prices not converting?**
A: Check browser console for errors. Fallback to USD is automatic.

**Q: Wrong currency detected?**
A: VPN users may see incorrect currency. This is expected behavior.

**Q: Exchange rates outdated?**
A: Rates update every 24 hours. Manual fallback rates in code as backup.

**Q: API rate limit exceeded?**
A: Free tier: 1,500 req/month. Caching prevents most API calls.

---

## Summary

✅ **Automatic currency detection** based on user location
✅ **15+ supported currencies** with proper formatting
✅ **24-hour cached exchange rates** for performance
✅ **Razorpay integration maintained** (all payments in INR)
✅ **Graceful fallbacks** if detection or API fails
✅ **Zero additional costs** (free tier sufficient for most traffic)

The implementation is production-ready and will work automatically on Vercel deployment!
