"use client";
import { Category } from '@/lib/categories';
import { useCurrency } from '@/lib/useCurrency';
import { useEffect, useState } from 'react';

interface CategoryGridProps {
  categories: Category[];
}

// Popular categories get badges
const FEATURED_CATEGORIES = {
  'birthday': 'Most Popular',
  'love': 'Trending',
  'manifestation': 'Fan Favorite'
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  const { currency, formatPrice, convertPrice, isLoading } = useCurrency();
  const [convertedPrices, setConvertedPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const updatePrices = async () => {
      if (!isLoading && currency.code !== 'USD') {
        const prices: Record<string, number> = {};
        for (const category of categories) {
          prices[category.slug] = await convertPrice(category.price);
        }
        setConvertedPrices(prices);
      }
    };
    updatePrices();
  }, [categories, currency, isLoading, convertPrice]);
  return (
    <section id="create" className="category-grid-section">
      <div className="container">
        <div className="section-header">
          <div className="header-badge">
            <span className="badge-dot"></span>
            <span>Personalized Music</span>
          </div>
          <h2>Choose Your Perfect Song Category</h2>
          <p>Each song is crafted with any name you love, woven into beautiful lyrics</p>
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-number">12,847+</div>
              <div className="stat-label">Songs Created</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">Customer Rating</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Happy Listeners</div>
            </div>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => {
            const badge = FEATURED_CATEGORIES[category.slug as keyof typeof FEATURED_CATEGORIES];
            return (
              <a
                key={category.slug}
                href={`/${category.slug}`}
                className="category-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {badge && (
                  <div className="card-badge">{badge}</div>
                )}

                <div className="card-inner">
                  <div className="category-icon-wrapper">
                    <div className="icon-pulse"></div>
                    <div className="category-icon">{category.icon}</div>
                  </div>

                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>

                  <div className="card-footer">
                    <div className="category-price">
                      <span className="price-label">Starting at</span>
                      <span className="price-amount">
                        {isLoading || !convertedPrices[category.slug]
                          ? `$${category.price}`
                          : formatPrice(convertedPrices[category.slug])}
                      </span>
                    </div>

                    <div className="category-cta">
                      <span className="cta-text">Create Now</span>
                      <span className="cta-arrow">→</span>
                    </div>
                  </div>

                  <div className="card-stats">
                    <span className="card-stat">🎵 Professional Quality</span>
                  </div>
                </div>

                <div className="shine-effect"></div>
              </a>
            );
          })}
        </div>

        <div className="grid-footer">
          <p className="footer-text">
            ✨ All songs include lifetime access, unlimited replays, and free downloads
          </p>
          <div className="trust-badges">
            <span className="trust-badge">🔒 Secure Checkout</span>
            <span className="trust-badge">⚡ Fast Delivery</span>
            <span className="trust-badge">💝 Perfect for Gifting</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .category-grid-section {
          padding: 80px 0;
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%);
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #3B82F6;
          margin-bottom: 20px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .section-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.75rem);
          color: #1a1a1a;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .section-header p {
          color: #666;
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto 32px;
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 1.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #888;
          font-weight: 500;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(180deg, transparent, #ddd, transparent);
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .category-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .category-card {
          background: white;
          border-radius: 20px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid #f0f0f0;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .category-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.2);
          border-color: #3B82F6;
        }

        .card-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #1a1a1a;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
          animation: subtlePulse 3s ease-in-out infinite;
        }

        .card-inner {
          padding: 36px 24px 24px;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          z-index: 2;
        }

        .category-icon-wrapper {
          position: relative;
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }

        .icon-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
          border-radius: 50%;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .category-card:hover .icon-pulse {
          opacity: 1;
          animation: iconPulseAnim 1.5s ease-in-out infinite;
        }

        .category-icon {
          font-size: 64px;
          position: relative;
          z-index: 1;
          transition: transform 0.4s ease;
        }

        .category-card:hover .category-icon {
          transform: scale(1.15) rotate(5deg);
        }

        .category-name {
          font-size: 1.375rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .category-description {
          color: #666;
          font-size: 0.9375rem;
          line-height: 1.6;
          margin-bottom: 20px;
          flex-grow: 1;
          position: relative;
          z-index: 1;
        }

        .card-footer {
          margin-top: auto;
        }

        .category-price {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-bottom: 16px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.05));
          border-radius: 12px;
          position: relative;
          z-index: 1;
        }

        .price-label {
          font-size: 0.75rem;
          color: #888;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .price-amount {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: var(--font-serif);
        }

        .category-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .category-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .category-card:hover .category-cta::before {
          left: 100%;
        }

        .cta-arrow {
          transition: transform 0.3s ease;
          font-size: 1.2rem;
        }

        .category-card:hover .cta-arrow {
          transform: translateX(4px);
        }

        .card-stats {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .card-stat {
          font-size: 0.8125rem;
          color: #888;
          font-weight: 500;
        }

        .shine-effect {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 60%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .category-card:hover .shine-effect {
          opacity: 1;
          animation: shine 1.5s ease;
        }

        .grid-footer {
          text-align: center;
          margin-top: 60px;
        }

        .footer-text {
          font-size: 1.0625rem;
          color: #666;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .trust-badges {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .trust-badge {
          font-size: 0.9375rem;
          color: #888;
          font-weight: 500;
          padding: 10px 20px;
          background: white;
          border-radius: 30px;
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
        }

        .trust-badge:hover {
          border-color: #3B82F6;
          color: #3B82F6;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes subtlePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
          }
        }

        @keyframes iconPulseAnim {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        @media (max-width: 768px) {
          .category-grid-section {
            padding: 60px 0;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .stats-bar {
            gap: 20px;
          }

          .stat-divider {
            display: none;
          }

          .category-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .card-badge {
            top: 12px;
            right: 12px;
            font-size: 0.6875rem;
            padding: 5px 12px;
          }

          .grid-footer {
            margin-top: 40px;
          }

          .trust-badges {
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
