"use client";
import { useEffect, useState } from 'react';

export function PremiumPsychology() {
  const [showPremium, setShowPremium] = useState(false);
  const [timeLeft, setTimeLeft] = useState(847);

  useEffect(() => {
    const timer = setTimeout(() => setShowPremium(true), 120000);

    const countdown = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, []);

  if (!showPremium) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="premium-psychology">
      <div className="premium-banner">
        <div className="premium-content">
          <div className="exclusive-badge">
            <span className="exclusive-text">EXCLUSIVE OFFER</span>
            <span className="exclusive-subtitle">Invitation Only</span>
          </div>

          <div className="premium-main">
            <h3 className="premium-title">
              🏆 Elite Access: What $500/hour Therapists Don't Want You to Know
            </h3>
            <p className="premium-subtitle">
              Beverly Hills wellness clinics charge $2,400/month for what you are about to get for $12.99
            </p>

            <div className="value-comparison">
              <div className="expensive-option">
                <div className="price-label">Therapy Sessions</div>
                <div className="price-amount">$127/hour</div>
                <div className="price-total">= $6,350/year</div>
              </div>
              <div className="vs">VS</div>
              <div className="our-option">
                <div className="price-label">Our Solution</div>
                <div className="price-amount">$12.99/month</div>
                <div className="price-total">= $155/year</div>
                <div className="savings">Save $6,195</div>
              </div>
            </div>

            <div className="premium-features">
              <div className="feature">
                <span className="feature-icon">💎</span>
                <span>Billionaire's stress-relief secret</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🧠</span>
                <span>Clinical-grade sound therapy technology</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span>Instant access (no waiting lists)</span>
              </div>
            </div>

            <div className="urgency-timer">
              <div className="timer-label">⏰ Limited Time Offer Expires:</div>
              <div className="timer-display">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="timer-subtext">Only 50 spots remaining at this price</div>
            </div>

            <div className="premium-actions">
              <button className="premium-cta">
                Claim Elite Access Now - $12.99
                <span className="original-price">Was $127/month</span>
              </button>
              <div className="guarantee">
                <span className="guarantee-icon">🛡️</span>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>

          <button className="premium-close" onClick={() => setShowPremium(false)}>×</button>
        </div>
      </div>

      <style jsx>{`
        .premium-psychology {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 200;
          animation: slideUpPremium 0.6s ease-out;
        }

        @keyframes slideUpPremium {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .premium-banner {
          background: linear-gradient(135deg, #1f2937, #111827);
          border-top: 3px solid #fbbf24;
          box-shadow: 0 -10px 30px rgba(0,0,0,0.3);
        }

        .premium-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 25px 20px;
          position: relative;
        }

        .exclusive-badge {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: #111827;
          padding: 8px 15px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 15px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 12px;
          animation: badgeGlow 2s ease-in-out infinite;
        }

        @keyframes badgeGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(251, 191, 36, 0.5); }
          50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.8); }
        }

        .exclusive-text {
          display: block;
          font-size: 14px;
        }

        .exclusive-subtitle {
          display: block;
          font-size: 10px;
          opacity: 0.8;
        }

        .premium-title {
          color: white;
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .premium-subtitle {
          color: #d1d5db;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .value-comparison {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .expensive-option, .our-option {
          background: rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 10px;
          text-align: center;
          min-width: 150px;
        }

        .our-option {
          background: linear-gradient(135deg, #065f46, #047857);
          border: 2px solid #10b981;
        }

        .price-label {
          color: #d1d5db;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .price-amount {
          color: white;
          font-size: 20px;
          font-weight: 800;
          margin: 5px 0;
        }

        .price-total {
          color: #9ca3af;
          font-size: 14px;
        }

        .savings {
          color: #10b981;
          font-size: 14px;
          font-weight: 700;
          margin-top: 5px;
        }

        .vs {
          color: #fbbf24;
          font-size: 18px;
          font-weight: 800;
        }

        .premium-features {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-size: 14px;
          background: rgba(255,255,255,0.1);
          padding: 8px 12px;
          border-radius: 20px;
        }

        .feature-icon {
          font-size: 16px;
        }

        .urgency-timer {
          text-align: center;
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(239, 68, 68, 0.2);
          border-radius: 10px;
          border: 1px solid #ef4444;
        }

        .timer-label {
          color: #fecaca;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .timer-display {
          color: #ef4444;
          font-size: 28px;
          font-weight: 800;
          font-family: monospace;
          margin-bottom: 5px;
        }

        .timer-subtext {
          color: #fca5a5;
          font-size: 12px;
        }

        .premium-actions {
          text-align: center;
        }

        .premium-cta {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: #111827;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 18px;
          font-weight: 800;
          cursor: pointer;
          margin-bottom: 10px;
          display: inline-block;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .premium-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(251, 191, 36, 0.4);
        }

        .original-price {
          display: block;
          font-size: 12px;
          text-decoration: line-through;
          opacity: 0.7;
          font-weight: 400;
        }

        .guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #10b981;
          font-size: 14px;
          font-weight: 600;
        }

        .guarantee-icon {
          font-size: 16px;
        }

        .premium-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .premium-close:hover {
          background: rgba(255,255,255,0.3);
        }

        @media (max-width: 768px) {
          .premium-title {
            font-size: 20px;
          }

          .premium-subtitle {
            font-size: 14px;
          }

          .value-comparison {
            flex-direction: column;
            gap: 10px;
          }

          .premium-features {
            flex-direction: column;
            align-items: center;
          }

          .premium-cta {
            font-size: 16px;
            padding: 12px 25px;
          }
        }
      `}</style>
    </div>
  );
}