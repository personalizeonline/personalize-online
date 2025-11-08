'use client';

import { useCurrency } from '@/lib/useCurrency';
import { useEffect, useState } from 'react';

export function Pricing(){
  const { currency, formatPrice, convertPrice, isLoading } = useCurrency();
  const [prices, setPrices] = useState({
    single: 7.99,
    bundle: 6.49,
    seasonal: 9.99,
    bundleTotal: 32.45
  });

  useEffect(() => {
    // Convert prices when currency is detected
    const updatePrices = async () => {
      if (!isLoading && currency.code !== 'USD') {
        const single = await convertPrice(7.99);
        const bundle = await convertPrice(6.49);
        const seasonal = await convertPrice(9.99);
        const bundleTotal = await convertPrice(32.45);

        setPrices({
          single,
          bundle,
          seasonal,
          bundleTotal
        });
      }
    };

    updatePrices();
  }, [currency, isLoading, convertPrice]);

  // Calculate INR for display
  const getINRPrice = (usdAmount: number) => {
    const inrAmount = (usdAmount * 83.5).toFixed(0);
    return `₹${inrAmount}`;
  };

  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <div className="pricing-header">
          <h2>Simple, Transparent Pricing</h2>
          <p className="pricing-subtitle">No subscriptions. No hidden fees. Just beautiful personalized songs.</p>
        </div>

        <div className="pricing-cards">
          {/* Single Song */}
          <div className="pricing-card">
            <div className="card-badge">Most Popular</div>
            <div className="card-icon">🎵</div>
            <h3 className="card-title">Single Song</h3>
            <div className="card-price">
              <span className="price-amount">
                {isLoading ? '$7.99' : formatPrice(prices.single)}
              </span>
              <span className="price-label">per song</span>
            </div>
            {currency.code !== 'INR' && (
              <div className="price-note">Charges in {getINRPrice(7.99)} INR</div>
            )}
            <ul className="card-features">
              <li>✓ Personalized with any name</li>
              <li>✓ Professional quality MP3</li>
              <li>✓ Fast delivery via email</li>
              <li>✓ Yours forever - unlimited replays</li>
              <li>✓ Download & share freely</li>
            </ul>
            <a href="#create" className="btn-pricing btn-primary">
              Create Your Song Now
            </a>
            <div className="trust-badges">
              <span className="trust-item">🔒 Secure Checkout</span>
              <span className="trust-item">⚡ 24-48 Hour Delivery</span>
            </div>
          </div>

          {/* Bundle */}
          <div className="pricing-card pricing-featured">
            <div className="card-badge featured-badge">Best Value</div>
            <div className="card-icon">🎁</div>
            <h3 className="card-title">Song Bundle</h3>
            <div className="card-price">
              <span className="price-amount">
                {isLoading ? '$6.49' : formatPrice(prices.bundle)}
              </span>
              <span className="price-label">per song</span>
            </div>
            <div className="savings-tag">
              Save {isLoading ? '$7.50' : formatPrice(prices.single * 5 - prices.bundleTotal)} when you buy 5!
            </div>
            {currency.code !== 'INR' && (
              <div className="price-note">Charges in {getINRPrice(32.45)} INR</div>
            )}
            <ul className="card-features">
              <li>✓ <strong>5 personalized songs</strong></li>
              <li>✓ Perfect for the whole family</li>
              <li>✓ Mix & match any categories</li>
              <li>✓ All single song benefits included</li>
              <li>✓ Great for gifting</li>
            </ul>
            <a href="#create" className="btn-pricing btn-featured">
              Get Bundle – {isLoading ? '$32.45' : formatPrice(prices.bundleTotal)}
            </a>
            <div className="trust-badges">
              <span className="trust-item">🔒 Secure Checkout</span>
              <span className="trust-item">💝 Perfect Gift</span>
            </div>
          </div>

          {/* Seasonal */}
          <div className="pricing-card">
            <div className="card-icon">🎄</div>
            <h3 className="card-title">Seasonal Songs</h3>
            <div className="card-price">
              <span className="price-amount">
                {isLoading ? '$9.99+' : `${formatPrice(prices.seasonal)}+`}
              </span>
              <span className="price-label">varies by season</span>
            </div>
            {currency.code !== 'INR' && (
              <div className="price-note">From {getINRPrice(9.99)} INR</div>
            )}
            <ul className="card-features">
              <li>✓ Holiday & seasonal themes</li>
              <li>✓ Limited-time special categories</li>
              <li>✓ Christmas, Valentine's, Mother's Day</li>
              <li>✓ All single song benefits included</li>
              <li>✓ Premium seasonal production</li>
            </ul>
            <a href="#create" className="btn-pricing btn-secondary">
              Browse Seasonal
            </a>
            <div className="trust-badges">
              <span className="trust-item">🎉 Special Occasions</span>
              <span className="trust-item">⚡ Fast Delivery</span>
            </div>
          </div>
        </div>

        <div className="pricing-guarantee">
          <div className="guarantee-icon">🛡️</div>
          <div className="guarantee-content">
            <h4>Quality Promise</h4>
            <p>We create professional-quality personalized songs. If you experience technical issues with your delivery, contact us and we'll resolve it promptly. All sales are final for digital products.</p>
          </div>
        </div>

        <div className="pricing-note">
          <p>
            {currency.code === 'INR' ? (
              'All prices in INR. '
            ) : (
              `Prices shown in ${currency.name}. All payments processed in INR. `
            )}
            Secure payment processing powered by Razorpay. No subscriptions or recurring charges.
          </p>
        </div>
      </div>

      <style jsx>{`
        .pricing {
          background: linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%);
          padding: 80px 0;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .pricing-header h2 {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
          font-family: var(--font-serif);
        }

        .pricing-subtitle {
          font-size: 1.125rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .pricing-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-bottom: 60px;
        }

        .pricing-card {
          background: white;
          border: 2px solid #f0f0f0;
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
        }

        .pricing-card:hover {
          border-color: #3B82F6;
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
        }

        .pricing-featured {
          border: 3px solid #3B82F6;
          background: linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%);
        }

        .card-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          padding: 6px 20px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .featured-badge {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #1a1a1a;
          font-weight: 700;
        }

        .card-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .card-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
        }

        .card-price {
          margin-bottom: 24px;
        }

        .price-amount {
          font-size: 3rem;
          font-weight: 800;
          color: #1a1a1a;
          display: block;
          font-family: var(--font-serif);
        }

        .price-label {
          font-size: 0.95rem;
          color: #888;
          display: block;
          margin-top: 4px;
        }

        .price-note {
          font-size: 0.85rem;
          color: #7c8471;
          margin-top: 8px;
          font-weight: 500;
        }

        .savings-tag {
          background: #10B981;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 20px;
          display: inline-block;
        }

        .card-features {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
          text-align: left;
        }

        .card-features li {
          padding: 12px 0;
          color: #666;
          font-size: 1rem;
          line-height: 1.5;
          border-bottom: 1px solid #f0f0f0;
        }

        .card-features li:last-child {
          border-bottom: none;
        }

        .card-features strong {
          color: #1a1a1a;
        }

        .btn-pricing {
          display: block;
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.25);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(59, 130, 246, 0.35);
        }

        .btn-featured {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #1a1a1a;
          box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
          font-weight: 700;
        }

        .btn-featured:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(255, 215, 0, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #3B82F6;
          border: 2px solid #3B82F6;
        }

        .btn-secondary:hover {
          background: #3B82F6;
          color: white;
        }

        .trust-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
        }

        .trust-item {
          font-size: 0.875rem;
          color: #888;
          font-weight: 500;
        }

        .pricing-guarantee {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.05));
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-radius: 16px;
          padding: 32px;
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
        }

        .guarantee-icon {
          font-size: 4rem;
          flex-shrink: 0;
        }

        .guarantee-content h4 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .guarantee-content p {
          font-size: 1rem;
          color: #666;
          margin: 0;
        }

        .pricing-note {
          text-align: center;
        }

        .pricing-note p {
          font-size: 0.875rem;
          color: #888;
          margin: 0;
        }

        @media (max-width: 768px) {
          .pricing {
            padding: 60px 0;
          }

          .pricing-cards {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .pricing-card {
            padding: 32px 24px;
          }

          .pricing-guarantee {
            flex-direction: column;
            text-align: center;
          }

          .guarantee-icon {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
