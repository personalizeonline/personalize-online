"use client";
import { Category } from '@/lib/categories';

interface SeasonalSpotlightProps {
  categories: Category[];
}

export function SeasonalSpotlight({ categories }: SeasonalSpotlightProps) {
  if (categories.length === 0) return null;

  return (
    <section className="seasonal-spotlight">
      <div className="container">
        <div className="section-header">
          <h2>🎉 Perfect for This Season</h2>
          <p>Limited time offerings - create these special songs while they're available</p>
        </div>

        <div className="spotlight-grid">
          {categories.map((category) => (
            <div key={category.slug} className="spotlight-card">
              <div className="spotlight-icon">{category.icon}</div>
              <h3 className="spotlight-name">{category.name}</h3>
              <p className="spotlight-description">{category.description}</p>
              <div className="spotlight-price">${category.price}</div>
              <a
                href={`/${category.slug}`}
                className="btn btn-primary"
              >
                Create Song
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .seasonal-spotlight {
          padding: var(--space-xl) 0;
          background: linear-gradient(to bottom, var(--sand), var(--bg));
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--space-lg);
        }

        .section-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.8rem);
          color: var(--charcoal);
          margin-bottom: 12px;
        }

        .section-header p {
          color: var(--muted);
          font-size: 1rem;
        }

        .spotlight-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .spotlight-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .spotlight-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .spotlight-card {
          background: var(--card);
          border-radius: 20px;
          padding: 40px 28px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 3px solid var(--brand);
          position: relative;
          overflow: hidden;
        }

        .spotlight-card::before {
          content: '✨';
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 24px;
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        .spotlight-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 45px rgba(0,0,0,0.15);
        }

        .spotlight-icon {
          font-size: 70px;
          margin-bottom: 20px;
        }

        .spotlight-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 12px;
        }

        .spotlight-description {
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .spotlight-price {
          color: var(--brand-strong);
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .btn {
          width: 100%;
          max-width: 200px;
        }
      `}</style>
    </section>
  );
}
