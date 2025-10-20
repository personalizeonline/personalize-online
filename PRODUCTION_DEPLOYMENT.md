# 🚀 Production Deployment Guide

## ⚠️ CRITICAL FIXES APPLIED

The following **production-breaking** issues have been fixed:

### 1. ✅ Currency Conversion Fixed
- **Problem**: Prices were stored in USD but sent to Razorpay as INR
- **Impact**: Customers would have paid ₹7.99 instead of ~₹665!
- **Solution**: Added proper USD→INR conversion utility
- **File**: `lib/currency.ts`

### 2. ✅ Security Improvements
- Replaced `console.log` with secure logger
- Added input validation and sanitization
- Added timing-safe signature comparison
- Masked sensitive data in logs
- **Files**: `lib/logger.ts`, all API routes

### 3. ✅ Webhook Handler Added
- Handles payment confirmations from Razorpay
- Backup verification method
- Handles edge cases (user closes browser)
- **File**: `app/api/razorpay/webhook/route.ts`

### 4. ✅ Input Validation
- Email format validation
- Story length validation (20-2000 chars)
- Price validation
- Field sanitization

---

## 📋 Pre-Deployment Checklist

### Step 1: Razorpay Account Setup

1. **Create Razorpay Account**
   - Go to https://dashboard.razorpay.com
   - Complete KYC verification (required for production)
   - Verify your business details

2. **Get API Keys**
   - Go to Settings → API Keys
   - For TESTING: Use "Test Mode" keys (start with `rzp_test_`)
   - For PRODUCTION: Use "Live Mode" keys (start with `rzp_live_`)
   - Copy both Key ID and Key Secret

3. **Setup Webhook**
   - Go to Settings → Webhooks
   - Click "Add New Webhook"
   - Webhook URL: `https://yourdomain.com/api/razorpay/webhook`
   - Select Events:
     - `payment.authorized`
     - `payment.captured`
     - `payment.failed`
     - `order.paid`
   - Copy the Webhook Secret

### Step 2: Environment Variables

Update your `.env.production` file:

```bash
# Razorpay Production Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=your_live_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Production URL
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Node Environment
NODE_ENV=production
```

⚠️ **NEVER commit production keys to Git!**

### Step 3: Update Currency Rate

The USD to INR conversion rate is hardcoded in `lib/currency.ts`:

```typescript
const USD_TO_INR_RATE = 83.50; // UPDATE THIS REGULARLY
```

**Options:**
1. **Manual**: Update this value weekly
2. **Automated**: Use an exchange rate API (recommended for production)

Example with API:
```typescript
// Add to lib/currency.ts
async function getCurrentRate(): Promise<number> {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
  return data.rates.INR;
}
```

### Step 4: Database Setup (CRITICAL - NOT IMPLEMENTED YET)

⚠️ **WARNING**: This app currently does NOT save orders to a database!

**You MUST implement:**

1. **Database Schema**
   ```sql
   CREATE TABLE orders (
     id UUID PRIMARY KEY,
     razorpay_order_id VARCHAR(255) UNIQUE NOT NULL,
     razorpay_payment_id VARCHAR(255),
     customer_name VARCHAR(255) NOT NULL,
     customer_email VARCHAR(255) NOT NULL,
     category VARCHAR(100) NOT NULL,
     personal_story TEXT,
     musical_style VARCHAR(100),
     usd_amount DECIMAL(10,2),
     inr_amount DECIMAL(10,2),
     status VARCHAR(50) DEFAULT 'pending',
     created_at TIMESTAMP DEFAULT NOW(),
     paid_at TIMESTAMP,
     fulfilled_at TIMESTAMP
   );
   ```

2. **Save Orders**
   - In `/api/razorpay/verify/route.ts` (line 56)
   - In `/api/razorpay/webhook/route.ts` (line 126)

3. **Database Options**
   - PostgreSQL (recommended)
   - MySQL
   - MongoDB
   - Supabase (easiest)

### Step 5: Email Notifications (NOT IMPLEMENTED)

⚠️ **WARNING**: No emails are being sent!

**You MUST implement:**

1. **Email Service** (choose one):
   - SendGrid
   - Mailgun
   - AWS SES
   - Resend

2. **Email Templates Needed**:
   - Order confirmation
   - Payment receipt
   - Song delivery
   - Payment failed notification

3. **Implementation Points**:
   - After payment verification: `/api/razorpay/verify/route.ts:56`
   - In webhook handler: `/api/razorpay/webhook/route.ts:126`

### Step 6: Song Fulfillment (NOT IMPLEMENTED)

⚠️ **WARNING**: No automation for song generation!

**You MUST implement**:

1. **Song Generation Workflow**
   - Manual: Email admin when order is paid
   - Automated: API integration with AI music generation service

2. **Fulfillment Queue**
   - Track orders that need fulfillment
   - Notify admins of new orders
   - Update order status when delivered

### Step 7: Build and Test

```bash
# Test production build locally
npm run build

# Run production server locally
npm start

# Test payment flow with test keys
# Only switch to live keys when everything works!
```

### Step 8: Deploy

**Recommended Platforms:**
- Vercel (easiest for Next.js)
- AWS Amplify
- Railway
- Render

**Deployment Steps**:
1. Push code to Git (GitHub, GitLab, etc.)
2. Connect repository to hosting platform
3. Add environment variables in platform dashboard
4. Deploy!

---

## 🔒 Security Best Practices

### ✅ Implemented
- Secure logging (no sensitive data)
- Input validation
- Timing-safe signature verification
- HTTPS only (via hosting platform)

### ⚠️ TODO (Before Launch)
- [ ] Add rate limiting to API routes
- [ ] Add CORS configuration
- [ ] Add DDoS protection (Cloudflare)
- [ ] Add monitoring (Sentry, DataDog)
- [ ] Add automated backups
- [ ] Add uptime monitoring
- [ ] Set up error alerting

---

## 💰 Pricing Display Issue

**Current State:**
- Frontend shows: `$7.99`
- Razorpay charges: `₹665.92` (converted)

**Recommendations:**

1. **Show both currencies**:
   ```typescript
   import { getDisplayPrice } from '@/lib/currency';

   // Shows: "$7.99 (₹665.92)"
   <span>{getDisplayPrice(category.price)}</span>
   ```

2. **Or switch to INR completely**:
   - Update all prices in `lib/categories.ts` to INR
   - Remove USD→INR conversion
   - Update all `$` symbols to `₹`

---

## 📊 Monitoring & Analytics

### Essential Metrics to Track
- Payment success rate
- Payment failure reasons
- Order fulfillment time
- Customer email delivery rate
- API error rates
- Server response times

### Recommended Tools
- **Errors**: Sentry
- **Analytics**: Google Analytics, Plausible
- **Uptime**: UptimeRobot, Pingdom
- **Logs**: Logtail, Papertrail

---

## 🚨 Production Incident Response

### If Payments Fail
1. Check Razorpay Dashboard for errors
2. Verify API keys are correct
3. Check webhook is receiving events
4. Check server logs for errors

### If Customers Don't Receive Orders
1. Check database for order record
2. Verify payment was captured
3. Check email delivery logs
4. Manually fulfill order if needed

### Contact
- Razorpay Support: https://razorpay.com/support/
- Check webhook logs in Razorpay Dashboard

---

## 📝 Final Pre-Launch Checklist

- [ ] Razorpay KYC completed and approved
- [ ] Live API keys configured
- [ ] Webhook endpoint tested and working
- [ ] Database schema created and tested
- [ ] Email service configured and tested
- [ ] Song fulfillment process defined
- [ ] Test order completed successfully
- [ ] Production build tested
- [ ] Domain SSL certificate valid
- [ ] Error monitoring configured
- [ ] Backup system in place
- [ ] Customer support email set up
- [ ] Terms of Service and Privacy Policy updated
- [ ] Refund policy documented
- [ ] Launch announcement ready

---

## 🎯 Next Steps After Launch

1. **Week 1**: Monitor closely, fix any issues immediately
2. **Week 2**: Analyze payment success rate, optimize conversion
3. **Week 3**: Automate fulfillment if possible
4. **Month 1**: Add more payment methods if needed (PayPal)
5. **Ongoing**: Update exchange rate, monitor for fraud

---

## 💡 Recommendations

### High Priority (Before Launch)
1. ✅ Currency conversion - FIXED
2. ✅ Secure logging - FIXED
3. ✅ Webhook handler - FIXED
4. ❌ Database integration - **MUST ADD**
5. ❌ Email notifications - **MUST ADD**
6. ❌ Order fulfillment - **MUST ADD**

### Medium Priority (First Week)
- Rate limiting
- Error monitoring
- Analytics setup

### Low Priority (First Month)
- Additional payment methods
- Automated exchange rates
- Advanced analytics

---

**Questions? Issues? Check:**
- Razorpay Docs: https://razorpay.com/docs/
- Next.js Docs: https://nextjs.org/docs
- This project's GitHub issues (if applicable)
