# 🚀 Vercel Deployment Guide

**Application**: Personalize Online - Custom Song Platform
**Status**: ✅ Production Ready
**Date**: 2025-10-15

---

## 📋 Pre-Deployment Checklist

Before deploying to Vercel, ensure you have:

- [ ] ✅ Razorpay account created (https://dashboard.razorpay.com/)
- [ ] ✅ Razorpay KYC completed (required for LIVE keys)
- [ ] ✅ Business bank account linked to Razorpay
- [ ] ⏳ Razorpay LIVE keys obtained (switch from Test to Live mode)
- [ ] ✅ GitHub repository ready (if using Git deployment)
- [ ] ✅ Vercel account created (https://vercel.com/)
- [ ] ✅ Domain name ready (optional, can use Vercel subdomain)

---

## 🎯 Deployment Options

### Option 1: Deploy with Vercel CLI (Recommended)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Login to Vercel**
```bash
vercel login
```

**Step 3: Deploy**
```bash
# From your project directory
cd /root/personalize-online
vercel
```

**Step 4: Follow the prompts**
```
? Set up and deploy "~/personalize-online"? [Y/n] Y
? Which scope do you want to deploy to? [Your Team/Personal]
? Link to existing project? [y/N] N
? What's your project's name? personalize-online
? In which directory is your code located? ./
```

**Step 5: Add Environment Variables**
```bash
# Add environment variables via CLI or dashboard
vercel env add NEXT_PUBLIC_RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
vercel env add RAZORPAY_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_BASE_URL
```

**Step 6: Deploy to Production**
```bash
vercel --prod
```

---

### Option 2: Deploy via GitHub (Easier for Updates)

**Step 1: Push to GitHub**
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Production ready"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/personalize-online.git
git branch -M main
git push -u origin main
```

**Step 2: Import to Vercel**
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

**Step 3: Add Environment Variables**
In Vercel dashboard, go to Settings → Environment Variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_live_xxxxx` | Production |
| `RAZORPAY_KEY_SECRET` | `your_secret_key` | Production |
| `RAZORPAY_WEBHOOK_SECRET` | `your_webhook_secret` | Production |
| `NEXT_PUBLIC_BASE_URL` | `https://yourdomain.com` | Production |
| `NODE_ENV` | `production` | Production |

**Important**: Use LIVE keys (starting with `rzp_live_`) for production!

**Step 4: Deploy**
Click "Deploy" button and wait for deployment to complete.

---

## 🔑 Environment Variables Setup

### Required Environment Variables

#### 1. NEXT_PUBLIC_RAZORPAY_KEY_ID
**Value**: Your Razorpay LIVE Key ID
**Format**: `rzp_live_xxxxxxxxxxxxx`
**Get it from**: https://dashboard.razorpay.com/app/keys (Live Mode)
**Public**: Yes (safe to expose to frontend)

#### 2. RAZORPAY_KEY_SECRET
**Value**: Your Razorpay LIVE Key Secret
**Format**: `xxxxxxxxxxxxxxxxxxxxxxxx`
**Get it from**: https://dashboard.razorpay.com/app/keys (Live Mode)
**Public**: No (server-side only, keep secret)

#### 3. RAZORPAY_WEBHOOK_SECRET
**Value**: Webhook secret from Razorpay Dashboard
**Get it from**: https://dashboard.razorpay.com/app/webhooks
**Setup**:
1. Go to Razorpay Dashboard → Settings → Webhooks
2. Click "Create New Webhook"
3. URL: `https://yourdomain.vercel.app/api/razorpay/webhook`
4. Events to select:
   - ✅ payment.authorized
   - ✅ payment.captured
   - ✅ payment.failed
5. Click "Create Webhook"
6. Copy the webhook secret shown
7. Add to Vercel environment variables

#### 4. NEXT_PUBLIC_BASE_URL
**Value**: Your production domain
**Examples**:
- Vercel subdomain: `https://personalize-online.vercel.app`
- Custom domain: `https://yourdomain.com`

#### 5. NODE_ENV (Optional)
**Value**: `production`
**Note**: Vercel sets this automatically

---

## 🌐 Domain Configuration

### Using Vercel Subdomain
Your app will be available at: `https://[project-name].vercel.app`

No additional configuration needed!

### Using Custom Domain

**Step 1: Add Domain in Vercel**
1. Go to Project Settings → Domains
2. Enter your domain: `yourdomain.com`
3. Click "Add"

**Step 2: Configure DNS**
Add these records in your domain registrar:

**For Root Domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Step 3: Wait for Propagation**
DNS changes can take 1-48 hours to propagate.

**Step 4: Update Environment Variable**
Update `NEXT_PUBLIC_BASE_URL` to your custom domain:
```
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## 🔗 Razorpay Integration Setup

### Step 1: Switch to Live Mode
1. Log in to https://dashboard.razorpay.com/
2. Toggle from "Test Mode" to "Live Mode" (top right)
3. Complete KYC if not done (required for live payments)

### Step 2: Get Live API Keys
1. Go to Settings → API Keys (Live Mode)
2. Click "Generate Live Keys"
3. Copy both Key ID and Key Secret
4. Add to Vercel environment variables

### Step 3: Configure Webhook
1. Go to Settings → Webhooks
2. Create webhook with URL: `https://yourdomain.vercel.app/api/razorpay/webhook`
3. Select events: payment.authorized, payment.captured, payment.failed
4. Copy webhook secret
5. Add to Vercel environment variables as `RAZORPAY_WEBHOOK_SECRET`

### Step 4: Test Payment
1. Visit your deployed site
2. Create a test order
3. Use real payment method (small amount like ₹10)
4. Verify order appears in Razorpay Dashboard
5. Check order notes contain customer data

---

## 🧪 Post-Deployment Testing

### 1. Homepage Load Test
```bash
curl -I https://yourdomain.vercel.app
# Expected: HTTP/2 200
```

### 2. API Endpoints Test
```bash
# Test order creation (should fail without valid data)
curl -X POST https://yourdomain.vercel.app/api/razorpay/order \
  -H "Content-Type: application/json" \
  -d '{"test":"invalid"}'
# Expected: {"error":"Missing required fields"}
```

### 3. Rate Limiting Test
```bash
# Make 15 rapid requests
for i in {1..15}; do
  curl -X POST https://yourdomain.vercel.app/api/razorpay/order \
    -H "Content-Type: application/json" \
    -d '{"category":"birthday","name":"Test","email":"test@example.com","personalStory":"Rate limit test...","musicalStyle":"Pop"}'
  sleep 0.5
done
# Expected: First 10 succeed, last 5 get 429 (rate limited)
```

### 4. Real Payment Test
1. Visit site in browser
2. Select a category
3. Fill out form with real details
4. Use real payment method (₹10-20)
5. Verify:
   - ✅ Payment completes successfully
   - ✅ Redirects to success page
   - ✅ Order appears in Razorpay Dashboard
   - ✅ Customer data in order notes

---

## 📊 Monitoring Setup

### Vercel Analytics (Built-in)
1. Go to Project → Analytics
2. View:
   - Page views
   - Load times
   - Visitor locations
   - Referrers

### Razorpay Dashboard Monitoring
1. Dashboard → Payments
2. Monitor:
   - Payment success rate
   - Failed payments
   - Refunds
   - Settlement status

### Error Monitoring (Optional - Sentry)
```bash
# Install Sentry
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs

# Add DSN to Vercel environment variables
SENTRY_DSN=your_sentry_dsn
```

---

## 🔧 Troubleshooting

### Build Fails on Vercel

**Issue**: Build fails with "Module not found"
**Solution**:
```bash
# Ensure package.json has all dependencies
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Environment Variables Not Working

**Issue**: "Payment gateway not configured" error
**Solution**:
1. Verify environment variables in Vercel dashboard
2. Ensure they're set for "Production" environment
3. Redeploy: `vercel --prod`

### Webhook Not Receiving Events

**Issue**: Payments complete but webhook not triggered
**Solution**:
1. Check webhook URL is correct: `https://yourdomain.vercel.app/api/razorpay/webhook`
2. Verify webhook secret matches environment variable
3. Check Razorpay Dashboard → Webhooks → Logs

### Rate Limiting Too Strict

**Issue**: Legitimate users getting rate limited
**Solution**:
Edit `lib/rate-limit.ts`:
```typescript
export const orderCreationLimiter = createRateLimiter({
  windowMs: 60000,
  max: 20, // Increase from 10 to 20
});
```
Commit and redeploy.

### Currency Conversion Wrong

**Issue**: Price showing incorrect amount
**Solution**:
Update exchange rate in `lib/currency.ts`:
```typescript
const USD_TO_INR_RATE = 85.00; // Update to current rate
```
Commit and redeploy.

---

## 🚀 Deployment Checklist

### Before First Deployment
- [ ] Razorpay KYC completed
- [ ] Live API keys obtained
- [ ] Test payment successful locally
- [ ] All environment variables prepared
- [ ] Domain name configured (if using custom domain)

### During Deployment
- [ ] Environment variables added to Vercel
- [ ] NEXT_PUBLIC_BASE_URL set to production domain
- [ ] Build successful
- [ ] No errors in deployment logs

### After Deployment
- [ ] Homepage loads correctly
- [ ] API endpoints responding
- [ ] Webhook configured in Razorpay
- [ ] Test payment with real money (small amount)
- [ ] Order appears in Razorpay Dashboard
- [ ] Success page redirects correctly
- [ ] Rate limiting working
- [ ] SSL certificate active (https)

---

## 📈 Scaling Considerations

### Current Setup (Good for 1-1000 orders/day)
✅ In-memory rate limiting
✅ Vercel serverless functions
✅ Razorpay handles payment processing
✅ No database needed

### If You Need to Scale (1000+ orders/day)
Consider:
- **Redis for rate limiting**: Replace in-memory storage
- **Database for analytics**: PostgreSQL or MongoDB
- **CDN for assets**: Cloudflare or Vercel Edge
- **Email service**: SendGrid or AWS SES for order confirmations
- **Background jobs**: Vercel Cron or external service

---

## 💰 Cost Estimate

### Vercel Hosting
- **Hobby Plan**: FREE
  - 100GB bandwidth/month
  - Unlimited deployments
  - Custom domains
  - Perfect for starting

- **Pro Plan**: $20/month (if needed)
  - 1TB bandwidth/month
  - Advanced analytics
  - Password protection

### Razorpay Fees
- **No Setup Fees**: FREE
- **Transaction Fee**: 2% per transaction
  - Example: ₹667 order = ₹13.34 fee
  - You receive: ₹653.66

### Total Monthly Cost
- **Minimum**: $0 (Vercel Free + Razorpay fees)
- **Recommended**: $20 (Vercel Pro + Razorpay fees)

---

## 📞 Support Resources

### Vercel Support
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Email: support@vercel.com

### Razorpay Support
- Docs: https://razorpay.com/docs/
- Support: https://dashboard.razorpay.com/support
- Email: support@razorpay.com

### Your Application Docs
- `PRODUCTION_DEPLOYMENT.md` - General deployment
- `SECURITY_AUDIT_REPORT.md` - Security details
- `RATE_LIMITING_IMPLEMENTATION.md` - Rate limit configuration
- `TEST_RESULTS.md` - Test documentation

---

## ✅ Ready to Deploy Commands

```bash
# Quick deployment to Vercel (CLI)
npm install -g vercel
vercel login
vercel --prod

# Or via GitHub
git init
git add .
git commit -m "Production ready deployment"
git remote add origin https://github.com/yourusername/personalize-online.git
git push -u origin main
# Then import to Vercel from dashboard
```

---

## 🎉 Congratulations!

Once deployed, your application will be:
- ✅ Live on the internet
- ✅ Accepting real payments
- ✅ Secured with rate limiting
- ✅ Protected with HTTPS
- ✅ Monitored with analytics
- ✅ Scalable and reliable

**Good luck with your launch!** 🚀

---

**Last Updated**: 2025-10-15
**Version**: 1.0.0
**Status**: Production Ready
