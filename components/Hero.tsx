"use client";

import { useCurrency } from '@/lib/useCurrency';
import { useEffect, useState } from 'react';

export function Hero() {
  const { currency, formatPrice, convertPrice, isLoading } = useCurrency();
  const [localPrice, setLocalPrice] = useState(7.99);

  useEffect(() => {
    const updatePrice = async () => {
      if (!isLoading && currency.code !== 'USD') {
        const converted = await convertPrice(7.99);
        setLocalPrice(converted);
      }
    };
    updatePrice();
  }, [currency, isLoading, convertPrice]);
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left: Content */}
          <div className="hero-content">
            <h1 className="hero-title">
              Songs With <span className="gradient-text">Your Name</span> In Them<br />
              <span className="subtitle-accent">(Or Anyone's Name, Really)</span>
            </h1>

            <p className="hero-subtitle">
              We make custom songs with names baked right into the lyrics.
              Perfect for birthdays, anniversaries, or whenever you need a gift that'll actually get remembered.
            </p>

            <div className="quick-features">
              <span className="quick-feature">🎼 Sounds legit</span>
              <span className="quick-feature">💝 Theirs to keep</span>
              <span className="quick-feature">⚡ Ships in minutes</span>
            </div>

            <a href="#create" className="cta-btn">
              Make a Song – {isLoading ? '$7.99' : formatPrice(localPrice)}
            </a>
          </div>

          {/* Right: Visualization */}
          <div className="hero-visual">
            <div className="visual-container">
              {/* Gentle pulsing rings */}
              <div className="pulse-ring ring-1"></div>
              <div className="pulse-ring ring-2"></div>
              <div className="pulse-ring ring-3"></div>

              {/* Category icons orbiting slowly */}
              <div className="category-orbit">
                <div className="orbit-item item-1">🎯</div>
                <div className="orbit-item item-2">🎂</div>
                <div className="orbit-item item-3">💪</div>
                <div className="orbit-item item-4">🙏</div>
                <div className="orbit-item item-5">💑</div>
                <div className="orbit-item item-6">🌅</div>
                <div className="orbit-item item-7">🧘</div>
                <div className="orbit-item item-8">💼</div>
              </div>

              {/* Center music note */}
              <div className="center-note">🎵</div>

              {/* Floating notes */}
              <div className="float-note note-1">♪</div>
              <div className="float-note note-2">♫</div>
              <div className="float-note note-3">♪</div>
              <div className="float-note note-4">♫</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          background: linear-gradient(to bottom, #FAF8F5, #FFFFFF);
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        /* Add unique decorative shapes */
        .hero::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.03), rgba(6, 182, 212, 0.05));
          border-radius: 50% 40% 60% 50%;
          top: -100px;
          left: -50px;
          transform: rotate(-15deg);
          z-index: 0;
        }

        .hero::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.03), rgba(5, 150, 105, 0.05));
          border-radius: 40% 60% 50% 60%;
          bottom: -150px;
          right: -100px;
          transform: rotate(25deg);
          z-index: 0;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* LEFT CONTENT */
        .hero-content {
          max-width: 580px;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.15;
          margin-bottom: 24px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0EA5E9, #06B6D4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle-accent {
          font-size: 1.5rem;
          font-weight: 400;
          color: #888;
          font-style: italic;
          display: block;
          margin-top: 8px;
        }

        .hero-subtitle {
          font-size: 1.125rem;
          color: #666;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .quick-features {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 40px;
        }

        .quick-feature {
          font-size: 0.95rem;
          color: #555;
          font-weight: 500;
        }

        .cta-btn {
          display: inline-block;
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          padding: 18px 40px;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
          transition: all 0.3s ease;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(16, 185, 129, 0.5);
        }

        /* RIGHT VISUALIZATION */
        .hero-visual {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-container {
          position: relative;
          width: 450px;
          height: 450px;
        }

        /* Pulsing rings */
        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-radius: 50%;
          animation: pulse 3s ease-out infinite;
        }

        .ring-1 {
          width: 150px;
          height: 150px;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 250px;
          height: 250px;
          animation-delay: 1s;
        }

        .ring-3 {
          width: 350px;
          height: 350px;
          animation-delay: 2s;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }

        /* Category orbit */
        .category-orbit {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: rotate 50s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .orbit-item {
          position: absolute;
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
          animation: float 3s ease-in-out infinite;
        }

        .item-1 { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
        .item-2 { top: 15%; right: 15%; animation-delay: 0.4s; }
        .item-3 { top: 42%; right: 0; animation-delay: 0.8s; }
        .item-4 { bottom: 15%; right: 15%; animation-delay: 1.2s; }
        .item-5 { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 1.6s; }
        .item-6 { bottom: 15%; left: 15%; animation-delay: 2s; }
        .item-7 { top: 42%; left: 0; animation-delay: 2.4s; }
        .item-8 { top: 15%; left: 15%; animation-delay: 2.8s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        /* Center note */
        .center-note {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 80px;
          animation: centerPulse 2s ease-in-out infinite;
        }

        @keyframes centerPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        /* Floating notes */
        .float-note {
          position: absolute;
          font-size: 32px;
          color: #0EA5E9;
          opacity: 0;
          animation: noteFloat 5s ease-in-out infinite;
        }

        .note-1 { top: 20%; left: 30%; animation-delay: 0s; }
        .note-2 { top: 30%; right: 25%; animation-delay: 1.25s; }
        .note-3 { bottom: 30%; left: 25%; animation-delay: 2.5s; }
        .note-4 { bottom: 20%; right: 30%; animation-delay: 3.75s; }

        @keyframes noteFloat {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 0.6; transform: translateY(-40px); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-grid {
            gap: 60px;
          }

          .visual-container {
            width: 380px;
            height: 380px;
          }

          .orbit-item {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }

          .center-note {
            font-size: 70px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 60px 0;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-content {
            max-width: 100%;
            text-align: center;
          }

          .quick-features {
            justify-content: center;
          }

          .hero-visual {
            height: 400px;
          }

          .visual-container {
            width: 320px;
            height: 320px;
          }

          .orbit-item {
            width: 44px;
            height: 44px;
            font-size: 20px;
          }

          .center-note {
            font-size: 60px;
          }
        }
      `}</style>
    </section>
  );
}
