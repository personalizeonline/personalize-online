"use client";
import { Category } from '@/lib/categories';
import { PriceDisplay } from '@/components/PriceDisplay';
import { useState } from 'react';

interface SeasonalHeroProps {
  category: Category;
}

// Union type for all possible recipients across all seasonal categories
type Recipient =
  | 'mom' | 'wife' | 'dad' | 'partner' // Christmas
  | 'husband' | 'boyfriend' | 'girlfriend' // Valentines
  | 'mother' | 'grandma' | 'mother-in-law' | 'stepmom' // Mothers Day
  | 'father' | 'grandpa' | 'father-in-law' | 'stepdad' // Fathers Day
  | 'graduate' | 'son' | 'daughter' | 'friend' | 'sibling' // Graduation
  | 'family' | 'parents' | 'grandparents' | 'friends' | 'self' // Thanksgiving
  | 'myself' | 'team'; // New Year

export function SeasonalHero({ category }: SeasonalHeroProps) {
  // Move useState to top level to comply with Rules of Hooks
  // This state will be used by whichever seasonal category is active
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient>('mom');

  // Christmas Design - Ultra Premium & Mesmerizing
  if (category.slug === 'christmas') {

    const recipientData = {
      mom: {
        headline: "Watch Mom's Eyes Light Up",
        pronoun: 'her',
        emoji: '👩',
        color: '#c41e3a' // Christmas red
      },
      wife: {
        headline: "Watch Her Eyes Light Up",
        pronoun: 'her',
        emoji: '❤️',
        color: '#dc143c' // Crimson red
      },
      dad: {
        headline: "Watch Dad's Eyes Light Up",
        pronoun: 'his',
        emoji: '👨',
        color: '#1a5c1a' // Forest green
      },
      partner: {
        headline: "Watch Their Eyes Light Up",
        pronoun: 'their',
        emoji: '💑',
        color: '#d4af37' // Gold
      }
    };

    const current = recipientData[selectedRecipient as keyof typeof recipientData];

    return (
      <section className="christmas-hero-luxe">
        {/* Snowfall animation */}
        <div className="snow-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
              opacity: Math.random() * 0.6 + 0.2
            }}>❄</div>
          ))}
        </div>

        {/* Bokeh Christmas lights background */}
        <div className="bokeh-lights">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="bokeh" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${30 + Math.random() * 80}px`,
              height: `${30 + Math.random() * 80}px`,
              animationDelay: `${Math.random() * 3}s`,
              background: [
                'radial-gradient(circle, rgba(196, 30, 58, 0.15), transparent)', // Christmas red
                'radial-gradient(circle, rgba(26, 92, 26, 0.15), transparent)', // Forest green
                'radial-gradient(circle, rgba(212, 175, 55, 0.15), transparent)', // Gold
                'radial-gradient(circle, rgba(220, 20, 60, 0.2), transparent)' // Crimson
              ][Math.floor(Math.random() * 4)]
            }}></div>
          ))}
        </div>

        <div className="container-luxe">
          <div className="hero-layout">
            {/* Left: Main content */}
            <div className="hero-content-luxe">
              {/* Social proof banner */}
              <div className="social-proof-top">
                <span className="proof-icon">🎄</span>
                <span className="proof-text"><strong>5,847 families</strong> created their Christmas song this week</span>
              </div>

              {/* Floating ribbon badge */}
              <div className="ribbon-badge">
                <div className="ribbon-inner">
                  <span className="ribbon-icon">⏰</span>
                  <span className="ribbon-text">Only 2 Days Left • Order by Dec 25</span>
                  <span className="ribbon-shine"></span>
                </div>
                <div className="ribbon-tail ribbon-tail-left"></div>
                <div className="ribbon-tail ribbon-tail-right"></div>
              </div>

              {/* Headline - Emotional & Specific */}
              <h1 className="hero-headline-luxe">
                <span className="headline-script">This Christmas,</span>
                <span className="headline-main">
                  <span className="word-gold" key={selectedRecipient}>{current.headline}</span>
                </span>
                <span className="headline-emphasis">Hearing {current.pronoun === 'their' ? 'Their' : current.pronoun === 'his' ? 'His' : 'Her'} Name in a Song</span>
              </h1>

              {/* Subheadline - Specific & Emotional */}
              <p className="hero-description-luxe">
                A 2-minute personalized song with <strong>{current.pronoun} name sung 4 times</strong> by professional vocalists—
                created in 60 seconds, treasured for a lifetime.
              </p>

              {/* Recipient selector pills */}
              <div className="recipient-pills">
                <span className="recipient-label">Perfect for:</span>
                <button
                  className={`pill-btn ${selectedRecipient === 'mom' ? 'active' : ''}`}
                  onClick={() => setSelectedRecipient('mom')}
                >
                  👩 Mom
                </button>
                <button
                  className={`pill-btn ${selectedRecipient === 'wife' ? 'active' : ''}`}
                  onClick={() => setSelectedRecipient('wife')}
                >
                  ❤️ Wife
                </button>
                <button
                  className={`pill-btn ${selectedRecipient === 'dad' ? 'active' : ''}`}
                  onClick={() => setSelectedRecipient('dad')}
                >
                  👨 Dad
                </button>
                <button
                  className={`pill-btn ${selectedRecipient === 'partner' ? 'active' : ''}`}
                  onClick={() => setSelectedRecipient('partner')}
                >
                  💑 Partner
                </button>
              </div>

              {/* Premium CTA */}
              <div className="cta-luxe">
                <a href={`/${category.slug}`} className="btn-luxe">
                  <span className="btn-bg-pattern"></span>
                  <span className="btn-content-luxe">
                    <span className="btn-text-luxe">Create Their Song Now</span>
                    <span className="btn-price-luxe">Just <PriceDisplay usdAmount={category.price} /></span>
                  </span>
                  <span className="btn-sparkle"></span>
                </a>

                {/* Trust signals */}
                <div className="trust-badges">
                  <span className="trust-item">✓ Instant Download</span>
                  <span className="trust-item">✓ Keep Forever</span>
                  <span className="trust-item">✓ 100% Satisfaction</span>
                </div>
              </div>

              {/* Floating testimonial */}
              <div className="testimonial-card">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-quote">"My mom cried happy tears and played it 10 times on Christmas morning. Best gift I've ever given her."</p>
                <div className="testimonial-author">
                  <div className="author-avatar">S</div>
                  <div className="author-info">
                    <span className="author-name">Sarah M.</span>
                    <span className="author-verified">✓ Verified Buyer</span>
                  </div>
                </div>
              </div>

              {/* Price comparison */}
              <p className="price-comparison">
                Less than the cost of flowers + a card, but means so much more
              </p>
            </div>

            {/* Right: Christmas Scene */}
            <div className="hero-visual-luxe">
              <div className="christmas-scene" key={selectedRecipient}>
                {/* Large recipient emoji */}
                <div className="recipient-visual">
                  <div className="recipient-emoji">{current.emoji}</div>
                  <div className="recipient-glow" style={{ background: `radial-gradient(circle, ${current.color}33, transparent)` }}></div>
                </div>

                {/* Christmas Tree */}
                <div className="xmas-tree">
                  <div className="tree-star">⭐</div>
                  <div className="tree-layer tree-layer-1">
                    <div className="ornament-small orn-1">🔴</div>
                    <div className="ornament-small orn-2">🟡</div>
                  </div>
                  <div className="tree-layer tree-layer-2">
                    <div className="ornament-small orn-3">🔵</div>
                    <div className="ornament-small orn-4">⚪</div>
                    <div className="ornament-small orn-5">🔴</div>
                  </div>
                  <div className="tree-layer tree-layer-3">
                    <div className="ornament-small orn-6">🟡</div>
                    <div className="ornament-small orn-7">🔵</div>
                    <div className="ornament-small orn-8">⚪</div>
                    <div className="ornament-small orn-9">🔴</div>
                  </div>
                  <div className="tree-trunk"></div>
                </div>

                {/* Gift boxes with dynamic colors */}
                <div className="gift gift-1">
                  <div className="gift-box" style={{ background: `linear-gradient(135deg, ${current.color}, ${current.color}dd)` }}></div>
                  <div className="gift-ribbon"></div>
                  <div className="gift-bow">🎀</div>
                </div>
                <div className="gift gift-2">
                  <div className="gift-box"></div>
                  <div className="gift-ribbon"></div>
                  <div className="gift-bow">🎀</div>
                </div>
                <div className="gift gift-3">
                  <div className="gift-box" style={{ background: `linear-gradient(135deg, ${current.color}aa, ${current.color}88)` }}></div>
                  <div className="gift-ribbon"></div>
                  <div className="gift-bow">🎀</div>
                </div>

                {/* Sparkles */}
                <div className="sparkle-float sp-1">✨</div>
                <div className="sparkle-float sp-2">⭐</div>
                <div className="sparkle-float sp-3">✨</div>
                <div className="sparkle-float sp-4">💫</div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .christmas-hero-luxe {
            position: relative;
            min-height: 90vh;
            background: linear-gradient(165deg,
              #fef9f5 0%,
              #fef5f5 40%,
              #fef0f0 100%
            );
            padding: 120px 0 60px;
            overflow: hidden;
            display: flex;
            align-items: center;
          }

          /* Snowfall */
          .snow-container {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          .snowflake {
            position: absolute;
            top: -10%;
            font-size: clamp(0.8rem, 1.5vw, 1.5rem);
            color: rgba(255, 255, 255, 0.6);
            animation: snowfall linear infinite;
            user-select: none;
            filter: drop-shadow(0 0 2px rgba(173, 216, 230, 0.3));
          }

          @keyframes snowfall {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            100% {
              transform: translateY(110vh) rotate(360deg);
            }
          }

          /* Bokeh lights */
          .bokeh-lights {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
          }

          .bokeh {
            position: absolute;
            border-radius: 50%;
            filter: blur(40px);
            animation: bokeh-pulse 3s ease-in-out infinite;
          }

          @keyframes bokeh-pulse {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.2);
            }
          }

          /* Container */
          .container-luxe {
            width: 90%;
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }

          .hero-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
          }

          /* Content */
          .hero-content-luxe {
            color: var(--charcoal);
          }

          /* Social proof top banner */
          .social-proof-top {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(26, 92, 26, 0.1);
            border: 1px solid rgba(26, 92, 26, 0.2);
            padding: 8px 18px;
            border-radius: 50px;
            margin-bottom: 20px;
            font-size: 0.875rem;
            color: var(--charcoal);
            animation: fadeInUp 0.6s ease-out;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .proof-icon {
            font-size: 1.125rem;
            animation: gentle-spin 8s linear infinite;
          }

          @keyframes gentle-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .proof-text strong {
            color: #1a5c1a;
            font-weight: 700;
            animation: number-pulse 3s ease-in-out infinite;
          }

          @keyframes number-pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.85;
            }
          }

          /* Recipient selector pills */
          .recipient-pills {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease-out 0.2s backwards;
          }

          .recipient-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--muted);
          }

          .pill-btn {
            padding: 8px 16px;
            background: var(--soft-white);
            border: 2px solid rgba(124, 132, 113, 0.2);
            border-radius: 50px;
            font-size: 0.8125rem;
            font-weight: 600;
            color: var(--charcoal);
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
            animation: pill-pop 0.5s ease-out backwards;
          }

          .pill-btn:nth-child(2) {
            animation-delay: 0.3s;
          }

          .pill-btn:nth-child(3) {
            animation-delay: 0.4s;
          }

          .pill-btn:nth-child(4) {
            animation-delay: 0.5s;
          }

          .pill-btn:nth-child(5) {
            animation-delay: 0.6s;
          }

          @keyframes pill-pop {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .pill-btn:hover {
            border-color: var(--sage);
            background: rgba(124, 132, 113, 0.05);
            transform: translateY(-2px) scale(1.05);
          }

          .pill-btn.active {
            background: #1a5c1a;
            color: var(--soft-white);
            border-color: #1a5c1a;
            box-shadow: 0 4px 12px rgba(26, 92, 26, 0.35);
            animation: pill-pop 0.5s ease-out backwards, gentle-bounce 2s ease-in-out infinite;
          }

          @keyframes gentle-bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-2px);
            }
          }

          /* Trust badges below CTA */
          .trust-badges {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin-top: 12px;
            flex-wrap: wrap;
          }

          .trust-item {
            font-size: 0.8125rem;
            color: #1a5c1a;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
            animation: slide-in-right 0.5s ease-out backwards;
          }

          .trust-item:nth-child(1) {
            animation-delay: 0.7s;
          }

          .trust-item:nth-child(2) {
            animation-delay: 0.8s;
          }

          .trust-item:nth-child(3) {
            animation-delay: 0.9s;
          }

          @keyframes slide-in-right {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Floating testimonial card */
          .testimonial-card {
            background: var(--soft-white);
            border: 1px solid rgba(124, 132, 113, 0.2);
            border-radius: 14px;
            padding: 16px;
            margin-top: 24px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
            animation: fadeInUp 1s ease-out 0.4s backwards, card-float 4s ease-in-out infinite;
            transition: all 0.3s ease;
          }

          .testimonial-card:hover {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transform: translateY(-4px);
          }

          @keyframes card-float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          .testimonial-stars {
            color: #f59e0b;
            font-size: 1rem;
            margin-bottom: 10px;
            letter-spacing: 2px;
            animation: stars-twinkle 2s ease-in-out infinite;
          }

          @keyframes stars-twinkle {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }

          .testimonial-quote {
            font-size: 0.875rem;
            line-height: 1.6;
            color: var(--charcoal);
            font-style: italic;
            margin-bottom: 14px;
          }

          .testimonial-author {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .author-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--sage), var(--moss));
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.125rem;
            animation: avatar-glow 3s ease-in-out infinite;
          }

          @keyframes avatar-glow {
            0%, 100% {
              box-shadow: 0 0 0 rgba(90, 102, 80, 0.3);
            }
            50% {
              box-shadow: 0 0 15px rgba(90, 102, 80, 0.4);
            }
          }

          .author-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .author-name {
            font-size: 0.875rem;
            font-weight: 700;
            color: var(--charcoal);
          }

          .author-verified {
            font-size: 0.75rem;
            color: var(--sage);
            display: flex;
            align-items: center;
            gap: 4px;
          }

          /* Price comparison */
          .price-comparison {
            font-size: 0.8125rem;
            color: var(--muted);
            font-style: italic;
            text-align: center;
            margin-top: 16px;
            animation: fadeInUp 1.2s ease-out 0.6s backwards, gentle-pulse 3s ease-in-out infinite;
          }

          @keyframes gentle-pulse {
            0%, 100% {
              opacity: 0.85;
            }
            50% {
              opacity: 1;
            }
          }

          /* Ribbon badge */
          .ribbon-badge {
            position: relative;
            display: inline-block;
            margin-bottom: 24px;
            z-index: 120;
          }

          .ribbon-inner {
            position: relative;
            background: linear-gradient(135deg, #c41e3a, #dc143c);
            padding: 10px 28px;
            border-radius: 6px;
            box-shadow: 0 6px 20px rgba(196, 30, 58, 0.4);
            overflow: hidden;
            animation: ribbon-wiggle 3s ease-in-out infinite;
          }

          @keyframes ribbon-wiggle {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(-1deg);
            }
            75% {
              transform: rotate(1deg);
            }
          }

          .ribbon-icon {
            font-size: 1rem;
            margin-right: 8px;
            color: var(--soft-white);
          }

          .ribbon-text {
            font-size: 0.875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--soft-white);
            position: relative;
            z-index: 2;
          }

          .ribbon-shine {
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
            animation: ribbon-shine 3s infinite;
            z-index: 1;
          }

          @keyframes ribbon-shine {
            0% { left: -100%; }
            100% { left: 200%; }
          }

          .ribbon-tail {
            position: absolute;
            top: 100%;
            width: 0;
            height: 0;
            border-style: solid;
          }

          .ribbon-tail-left {
            left: 0;
            border-width: 12px 16px 0 0;
            border-color: #8b1a1a transparent transparent transparent;
          }

          .ribbon-tail-right {
            right: 0;
            border-width: 12px 0 0 16px;
            border-color: #8b1a1a transparent transparent transparent;
          }

          /* Headline */
          .hero-headline-luxe {
            font-family: var(--font-serif);
            margin-bottom: 18px;
            line-height: 1.15;
          }

          .headline-script {
            display: block;
            font-size: clamp(1.125rem, 2vw, 1.5rem);
            font-style: italic;
            font-weight: 400;
            color: var(--muted);
            margin-bottom: 6px;
            animation: fadeInUp 0.6s ease-out 0.1s backwards;
          }

          .headline-main {
            display: block;
            font-size: clamp(2.25rem, 4.5vw, 3.75rem);
            font-weight: 700;
            color: var(--charcoal);
            margin-bottom: 10px;
            letter-spacing: -0.02em;
            animation: fadeInUp 0.6s ease-out 0.2s backwards;
          }

          .word-gold {
            background: linear-gradient(135deg, #d4af37, #ffd700, #d4af37);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% 200%;
            animation: gold-shimmer 3s ease-in-out infinite, text-fade-in 0.5s ease-out;
            display: inline-block;
            transition: all 0.3s ease;
          }

          @keyframes gold-shimmer {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes text-fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .headline-emphasis {
            display: block;
            font-size: clamp(1.375rem, 2.75vw, 2rem);
            font-weight: 500;
            color: #1a5c1a;
            font-style: italic;
            animation: fadeInUp 0.6s ease-out 0.3s backwards;
            transition: opacity 0.3s ease;
          }

          /* Description */
          .hero-description-luxe {
            font-size: clamp(0.9375rem, 1.6vw, 1.0625rem);
            line-height: 1.65;
            color: var(--muted);
            margin-bottom: 24px;
            max-width: 520px;
            animation: fadeInUp 0.6s ease-out 0.4s backwards;
            transition: opacity 0.3s ease;
          }

          .hero-description-luxe strong {
            transition: all 0.3s ease;
          }

          .sparkle {
            font-size: 1.5rem;
            margin-right: 8px;
            display: inline-block;
            animation: sparkle-rotate 4s linear infinite;
          }

          @keyframes sparkle-rotate {
            0%, 100% {
              transform: rotate(0deg) scale(1);
            }
            50% {
              transform: rotate(180deg) scale(1.2);
            }
          }

          /* Features */
          .features-luxe {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 36px;
            flex-wrap: wrap;
          }

          .feature-item-luxe {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 0.9375rem;
            font-weight: 600;
            color: var(--charcoal);
          }

          .feature-icon-luxe {
            font-size: 1.5rem;
          }

          .feature-divider-luxe {
            width: 1px;
            height: 24px;
            background: rgba(124, 132, 113, 0.3);
          }

          /* CTA Button */
          .cta-luxe {
            margin-top: 28px;
          }

          .btn-luxe {
            position: relative;
            display: inline-block;
            text-decoration: none;
            padding: 0;
            margin-bottom: 16px;
            overflow: hidden;
            border-radius: 14px;
            box-shadow: 0 10px 35px rgba(26, 92, 26, 0.3);
            transition: all 0.4s var(--ease-out-quart);
            animation: fadeInUp 0.6s ease-out 0.5s backwards, cta-pulse 3s ease-in-out infinite;
          }

          @keyframes cta-pulse {
            0%, 100% {
              box-shadow: 0 10px 35px rgba(26, 92, 26, 0.3);
            }
            50% {
              box-shadow: 0 10px 40px rgba(26, 92, 26, 0.45);
            }
          }

          .btn-luxe:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 16px 50px rgba(26, 92, 26, 0.5);
          }

          .btn-bg-pattern {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #1a5c1a, #2d7a2d);
            z-index: 1;
          }

          .btn-content-luxe {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            padding: 18px 36px;
            color: var(--soft-white);
          }

          .btn-text-luxe {
            font-size: 1.0625rem;
            font-weight: 700;
          }

          .btn-price-luxe {
            font-size: 1rem;
            font-weight: 800;
            padding: 6px 14px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            backdrop-filter: blur(10px);
            animation: price-shimmer 2s ease-in-out infinite;
          }

          @keyframes price-shimmer {
            0%, 100% {
              background: rgba(255, 255, 255, 0.2);
            }
            50% {
              background: rgba(255, 255, 255, 0.3);
            }
          }

          .btn-sparkle {
            position: absolute;
            top: 50%;
            left: -100%;
            width: 100%;
            height: 200%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: translateY(-50%) rotate(45deg);
            transition: left 0.6s ease;
            z-index: 3;
            pointer-events: none;
          }

          .btn-luxe:hover .btn-sparkle {
            left: 200%;
          }

          .cta-subtitle-luxe {
            font-size: 0.9375rem;
            color: var(--muted);
            margin: 0;
          }

          /* Christmas Scene */
          .hero-visual-luxe {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 380px;
          }

          .christmas-scene {
            position: relative;
            width: 100%;
            max-width: 320px;
            height: 360px;
            animation: scene-float 6s ease-in-out infinite;
          }

          @keyframes scene-float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          /* Recipient Visual */
          .recipient-visual {
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            animation: recipient-appear 0.6s ease-out;
          }

          @keyframes recipient-appear {
            from {
              opacity: 0;
              transform: translateX(-50%) scale(0.5);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) scale(1);
            }
          }

          .recipient-emoji {
            font-size: 4rem;
            animation: emoji-bounce 2s ease-in-out infinite;
            filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
            position: relative;
            z-index: 2;
          }

          @keyframes emoji-bounce {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            25% {
              transform: translateY(-8px) rotate(-5deg);
            }
            75% {
              transform: translateY(-8px) rotate(5deg);
            }
          }

          .recipient-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 150px;
            height: 150px;
            border-radius: 50%;
            filter: blur(30px);
            z-index: 1;
            animation: glow-pulse 3s ease-in-out infinite;
          }

          @keyframes glow-pulse {
            0%, 100% {
              opacity: 0.4;
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              opacity: 0.7;
              transform: translate(-50%, -50%) scale(1.2);
            }
          }

          /* Christmas Tree */
          .xmas-tree {
            position: relative;
            width: 180px;
            height: 260px;
            margin: 0 auto 18px;
          }

          .tree-star {
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2rem;
            animation: star-twinkle 2s ease-in-out infinite;
            filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.7));
          }

          @keyframes star-twinkle {
            0%, 100% {
              opacity: 1;
              transform: translateX(-50%) scale(1);
            }
            50% {
              opacity: 0.6;
              transform: translateX(-50%) scale(1.2);
            }
          }

          .tree-layer {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            border-style: solid;
            border-color: transparent transparent #2d5016 transparent;
          }

          .tree-layer-1 {
            top: 20px;
            border-width: 0 40px 50px 40px;
            width: 0;
            height: 0;
          }

          .tree-layer-2 {
            top: 60px;
            border-width: 0 60px 60px 60px;
            width: 0;
            height: 0;
          }

          .tree-layer-3 {
            top: 110px;
            border-width: 0 80px 70px 80px;
            width: 0;
            height: 0;
          }

          .tree-trunk {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 40px;
            background: #4a2511;
            border-radius: 0 0 4px 4px;
          }

          .ornament-small {
            position: absolute;
            font-size: 1rem;
            animation: ornament-glow 3s ease-in-out infinite;
          }

          .orn-1 { left: 20px; top: 15px; animation-delay: 0s; }
          .orn-2 { right: 20px; top: 15px; animation-delay: 0.5s; }
          .orn-3 { left: 10px; top: 20px; animation-delay: 1s; }
          .orn-4 { right: 10px; top: 20px; animation-delay: 1.5s; }
          .orn-5 { left: 50%; transform: translateX(-50%); top: 25px; animation-delay: 2s; }
          .orn-6 { left: 5px; top: 25px; animation-delay: 2.5s; }
          .orn-7 { right: 5px; top: 25px; animation-delay: 0.3s; }
          .orn-8 { left: 50%; transform: translateX(-50%); top: 30px; animation-delay: 0.8s; }
          .orn-9 { right: 30px; top: 20px; animation-delay: 1.3s; }

          @keyframes ornament-glow {
            0%, 100% {
              filter: brightness(1) drop-shadow(0 0 5px currentColor);
            }
            50% {
              filter: brightness(1.3) drop-shadow(0 0 10px currentColor);
            }
          }

          /* Gift Boxes */
          .gift {
            position: absolute;
            bottom: 0;
          }

          .gift-1 {
            left: 20px;
            animation: gift-bounce 3s ease-in-out infinite;
            animation-delay: 0s;
          }

          .gift-2 {
            right: 20px;
            animation: gift-bounce 3s ease-in-out infinite;
            animation-delay: 1s;
          }

          .gift-3 {
            left: 50%;
            transform: translateX(-50%);
            animation: gift-bounce 3s ease-in-out infinite;
            animation-delay: 2s;
          }

          @keyframes gift-bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          .gift-1 .gift-box {
            width: 50px;
            height: 50px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transition: all 0.5s ease;
          }

          .gift-2 .gift-box {
            width: 55px;
            height: 55px;
            background: linear-gradient(135deg, var(--moss), var(--sage));
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(90, 102, 80, 0.3);
          }

          .gift-3 .gift-box {
            width: 45px;
            height: 45px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transition: all 0.5s ease;
          }

          .gift-ribbon {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 8px;
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%);
          }

          .gift-ribbon::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
          }

          .gift-bow {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.5rem;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
          }

          /* Sparkles */
          .sparkle-float {
            position: absolute;
            font-size: 1.5rem;
            animation: sparkle-drift 4s ease-in-out infinite;
          }

          .sp-1 {
            top: 15%;
            left: 10%;
            animation-delay: 0s;
          }

          .sp-2 {
            top: 25%;
            right: 5%;
            animation-delay: 1s;
          }

          .sp-3 {
            bottom: 30%;
            left: 5%;
            animation-delay: 2s;
          }

          .sp-4 {
            bottom: 20%;
            right: 10%;
            animation-delay: 3s;
          }

          @keyframes sparkle-drift {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-15px) rotate(180deg);
              opacity: 1;
            }
          }

          /* Responsive */
          @media (max-width: 1024px) {
            .hero-layout {
              grid-template-columns: 1fr;
              gap: 40px;
              text-align: center;
            }

            .hero-visual-luxe {
              order: -1;
              min-height: 320px;
            }

            .christmas-scene {
              max-width: 260px;
              height: 320px;
            }

            .xmas-tree {
              width: 160px;
              height: 230px;
            }

            .hero-description-luxe {
              margin-left: auto;
              margin-right: auto;
            }

            .features-luxe {
              justify-content: center;
            }

            .recipient-pills {
              justify-content: center;
            }

            .trust-badges {
              justify-content: center;
            }
          }

          @media (max-width: 768px) {
            .christmas-hero-luxe {
              padding: 100px 0 50px;
              min-height: auto;
            }

            .ribbon-inner {
              padding: 8px 20px;
            }

            .ribbon-text {
              font-size: 0.6875rem;
            }

            .hero-visual-luxe {
              min-height: 260px;
            }

            .christmas-scene {
              max-width: 220px;
              height: 260px;
            }

            .xmas-tree {
              width: 140px;
              height: 200px;
            }

            .tree-layer-1 {
              border-width: 0 35px 45px 35px;
            }

            .tree-layer-2 {
              border-width: 0 50px 50px 50px;
            }

            .tree-layer-3 {
              border-width: 0 65px 60px 65px;
            }

            .gift-1 .gift-box,
            .gift-2 .gift-box,
            .gift-3 .gift-box {
              width: 40px;
              height: 40px;
            }

            .btn-content-luxe {
              flex-direction: column;
              padding: 16px 28px;
              text-align: center;
              gap: 10px;
            }

            .btn-text-luxe {
              font-size: 1rem;
            }

            .btn-price-luxe {
              font-size: 0.9375rem;
            }

            .features-luxe {
              flex-direction: column;
              align-items: center;
            }

            .feature-divider-luxe {
              width: 60px;
              height: 1px;
            }

            .social-proof-top {
              font-size: 0.8125rem;
              padding: 8px 16px;
            }

            .recipient-pills {
              font-size: 0.8125rem;
            }

            .pill-btn {
              padding: 8px 14px;
              font-size: 0.8125rem;
            }

            .testimonial-card {
              padding: 16px;
            }

            .testimonial-quote {
              font-size: 0.875rem;
            }

            .trust-badges {
              flex-direction: column;
              gap: 10px;
            }
          }
        `}</style>
      </section>
    );
  }

  // Valentine's Day - Romantic & Mesmerizing
  if (category.slug === 'valentines') {
    const valentineRecipients = {
      partner: { label: '💑 Partner', pronoun: 'their', color: '#ff6b9d' },
      wife: { label: '👰 Wife', pronoun: 'her', color: '#c44569' },
      husband: { label: '🤵 Husband', pronoun: 'his', color: '#8b4789' },
      boyfriend: { label: '💙 Boyfriend', pronoun: 'his', color: '#6366f1' },
      girlfriend: { label: '💖 Girlfriend', pronoun: 'her', color: '#ff6b9d' }
    };

    const currentRecipient = valentineRecipients[selectedRecipient as keyof typeof valentineRecipients];

    return (
      <section className="valentines-hero">
        <div className="hearts-ambient">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`heart-float heart-${i}`}>❤️</div>
          ))}
        </div>

        <div className="container-valentine">
          <div className="valentine-layout">
            {/* Left Content */}
            <div className="valentine-content">
              {/* Social Proof */}
              <div className="valentine-social-proof">
                <span className="proof-icon-v">💕</span>
                <span className="proof-text-v"><strong>3,891 couples</strong> created their love song this month</span>
              </div>

              {/* Urgency Badge */}
              <div className="valentine-urgency">
                <span className="urgency-icon">💝</span>
                <span className="urgency-text">Valentine's Special • Feb 14th Delivery</span>
              </div>

              {/* Headline */}
              <h1 className="valentine-headline">
                <span className="v-line-1">Roses fade.</span>
                <span className="v-line-2">
                  Give <span className="word-love" key={selectedRecipient}>Them a Love Song</span>
                </span>
                <span className="v-line-3">They'll Treasure Forever</span>
              </h1>

              {/* Description */}
              <p className="valentine-description">
                A romantic song with <strong>{currentRecipient.pronoun} name sung by professional vocalists</strong>—
                more meaningful than flowers, more lasting than chocolates.
              </p>

              {/* Recipient Pills */}
              <div className="valentine-pills">
                <span className="pills-label">Perfect for:</span>
                {(Object.keys(valentineRecipients) as Array<keyof typeof valentineRecipients>).map((key) => (
                  <button
                    key={key}
                    className={`v-pill-btn ${selectedRecipient === key ? 'active' : ''}`}
                    onClick={() => setSelectedRecipient(key)}
                  >
                    {valentineRecipients[key].label}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="valentine-cta-section">
                <a href={`/${category.slug}`} className="btn-valentine-new">
                  <span className="btn-bg-v"></span>
                  <span className="btn-content-v">
                    <span className="btn-text-v">Create Your Love Song</span>
                    <span className="btn-price-v">Just <PriceDisplay usdAmount={category.price} /></span>
                  </span>
                  <span className="btn-shine-v"></span>
                </a>

                <div className="valentine-trust">
                  <span className="trust-item-v">✓ Instant Download</span>
                  <span className="trust-item-v">✓ Lifetime Access</span>
                  <span className="trust-item-v">✓ 100% Love Guaranteed</span>
                </div>
              </div>

              {/* Testimonial */}
              <div className="valentine-testimonial">
                <div className="testimonial-stars-v">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text-v">"She cried when she heard her name in the chorus. This is the most romantic gift I've ever given."</p>
                <div className="testimonial-author-v">
                  <div className="author-avatar-v">J</div>
                  <div className="author-details-v">
                    <span className="author-name-v">James R.</span>
                    <span className="author-badge-v">✓ Verified Purchase</span>
                  </div>
                </div>
              </div>

              {/* Price Comparison */}
              <p className="valentine-price-note">
                Less than a dozen roses, but lasts forever
              </p>
            </div>

            {/* Right Visual */}
            <div className="valentine-visual">
              <div className="valentine-scene" key={selectedRecipient}>
                {/* Large Animated Heart */}
                <div className="love-heart-big" style={{ color: currentRecipient.color }}>
                  ❤️
                </div>

                {/* Floating Hearts */}
                <div className="heart-cluster">
                  <div className="heart-small h-1" style={{ color: currentRecipient.color }}>💕</div>
                  <div className="heart-small h-2" style={{ color: currentRecipient.color }}>💖</div>
                  <div className="heart-small h-3" style={{ color: currentRecipient.color }}>💗</div>
                  <div className="heart-small h-4" style={{ color: currentRecipient.color }}>💓</div>
                  <div className="heart-small h-5" style={{ color: currentRecipient.color }}>💞</div>
                </div>

                {/* Sparkle Effects */}
                <div className="sparkle-v sp-v-1">✨</div>
                <div className="sparkle-v sp-v-2">⭐</div>
                <div className="sparkle-v sp-v-3">💫</div>
                <div className="sparkle-v sp-v-4">✨</div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .valentines-hero {
            position: relative;
            min-height: 90vh;
            background: linear-gradient(165deg,
              var(--cream) 0%,
              #fef0f5 40%,
              #fce4ec 100%
            );
            padding: 120px 0 60px;
            overflow: hidden;
            display: flex;
            align-items: center;
          }

          /* Floating Hearts Background */
          .hearts-ambient {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          .heart-float {
            position: absolute;
            font-size: clamp(1.5rem, 2vw, 2.5rem);
            opacity: 0.1;
            animation: heart-drift 20s ease-in-out infinite;
          }

          .heart-0 { top: 10%; left: 5%; animation-delay: 0s; }
          .heart-1 { top: 15%; right: 10%; animation-delay: 2s; }
          .heart-2 { top: 25%; left: 15%; animation-delay: 4s; }
          .heart-3 { top: 35%; right: 20%; animation-delay: 6s; }
          .heart-4 { top: 50%; left: 8%; animation-delay: 8s; }
          .heart-5 { top: 60%; right: 12%; animation-delay: 10s; }
          .heart-6 { top: 70%; left: 12%; animation-delay: 12s; }
          .heart-7 { top: 80%; right: 8%; animation-delay: 14s; }
          .heart-8 { bottom: 10%; left: 20%; animation-delay: 16s; }
          .heart-9 { bottom: 20%; right: 15%; animation-delay: 18s; }

          @keyframes heart-drift {
            0%, 100% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
            25% {
              transform: translate(15px, -15px) rotate(5deg) scale(1.05);
            }
            50% {
              transform: translate(0, -25px) rotate(10deg) scale(1.1);
            }
            75% {
              transform: translate(-15px, -15px) rotate(5deg) scale(1.05);
            }
          }

          /* Container */
          .container-valentine {
            width: 90%;
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }

          .valentine-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
          }

          /* Content */
          .valentine-content {
            color: var(--charcoal);
          }

          /* Social Proof */
          .valentine-social-proof {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 107, 157, 0.1);
            border: 1px solid rgba(255, 107, 157, 0.2);
            padding: 8px 18px;
            border-radius: 50px;
            margin-bottom: 20px;
            font-size: 0.875rem;
            animation: fadeInUp 0.6s ease-out;
          }

          .proof-icon-v {
            font-size: 1.125rem;
            animation: heart-beat 1.5s ease-in-out infinite;
          }

          @keyframes heart-beat {
            0%, 100% {
              transform: scale(1);
            }
            25%, 75% {
              transform: scale(1.2);
            }
            50% {
              transform: scale(1.1);
            }
          }

          .proof-text-v strong {
            color: #c44569;
            font-weight: 700;
          }

          /* Urgency Badge */
          .valentine-urgency {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #ff6b9d, #c44569);
            padding: 10px 28px;
            border-radius: 6px;
            box-shadow: 0 6px 20px rgba(255, 107, 157, 0.3);
            margin-bottom: 24px;
            animation: wiggle 3s ease-in-out infinite;
          }

          @keyframes wiggle {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(-1deg);
            }
            75% {
              transform: rotate(1deg);
            }
          }

          .urgency-icon {
            font-size: 1rem;
            color: white;
          }

          .urgency-text {
            font-size: 0.875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: white;
          }

          /* Headline */
          .valentine-headline {
            font-family: var(--font-serif);
            margin-bottom: 18px;
            line-height: 1.15;
          }

          .v-line-1 {
            display: block;
            font-size: clamp(1.125rem, 2vw, 1.5rem);
            font-style: italic;
            color: var(--muted);
            margin-bottom: 6px;
            animation: fadeInUp 0.6s ease-out 0.1s backwards;
          }

          .v-line-2 {
            display: block;
            font-size: clamp(2.25rem, 4.5vw, 3.75rem);
            font-weight: 700;
            color: var(--charcoal);
            margin-bottom: 10px;
            animation: fadeInUp 0.6s ease-out 0.2s backwards;
          }

          .word-love {
            background: linear-gradient(135deg, #ff6b9d, #c44569, #ff6b9d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% 200%;
            animation: love-shimmer 3s ease-in-out infinite, text-fade-in 0.5s ease-out;
            display: inline-block;
          }

          @keyframes love-shimmer {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          .v-line-3 {
            display: block;
            font-size: clamp(1.375rem, 2.75vw, 2rem);
            font-weight: 500;
            color: #c44569;
            font-style: italic;
            animation: fadeInUp 0.6s ease-out 0.3s backwards;
          }

          /* Description */
          .valentine-description {
            font-size: clamp(0.9375rem, 1.6vw, 1.0625rem);
            line-height: 1.65;
            color: var(--muted);
            margin-bottom: 24px;
            max-width: 520px;
            animation: fadeInUp 0.6s ease-out 0.4s backwards;
          }

          .valentine-description strong {
            color: var(--charcoal);
          }

          /* Recipient Pills */
          .valentine-pills {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease-out 0.2s backwards;
          }

          .pills-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--muted);
          }

          .v-pill-btn {
            padding: 8px 16px;
            background: var(--soft-white);
            border: 2px solid rgba(255, 107, 157, 0.2);
            border-radius: 50px;
            font-size: 0.8125rem;
            font-weight: 600;
            color: var(--charcoal);
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
            animation: pill-pop 0.5s ease-out backwards;
          }

          .v-pill-btn:nth-child(2) { animation-delay: 0.3s; }
          .v-pill-btn:nth-child(3) { animation-delay: 0.4s; }
          .v-pill-btn:nth-child(4) { animation-delay: 0.5s; }
          .v-pill-btn:nth-child(5) { animation-delay: 0.6s; }
          .v-pill-btn:nth-child(6) { animation-delay: 0.7s; }

          .v-pill-btn:hover {
            border-color: #ff6b9d;
            background: rgba(255, 107, 157, 0.05);
            transform: translateY(-2px) scale(1.05);
          }

          .v-pill-btn.active {
            background: linear-gradient(135deg, #ff6b9d, #c44569);
            color: white;
            border-color: #ff6b9d;
            box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
            animation: pill-pop 0.5s ease-out backwards, gentle-bounce 2s ease-in-out infinite;
          }

          /* CTA */
          .valentine-cta-section {
            margin-top: 28px;
          }

          .btn-valentine-new {
            position: relative;
            display: inline-block;
            text-decoration: none;
            padding: 0;
            margin-bottom: 16px;
            overflow: hidden;
            border-radius: 14px;
            box-shadow: 0 10px 35px rgba(255, 107, 157, 0.25);
            transition: all 0.4s ease;
            animation: fadeInUp 0.6s ease-out 0.5s backwards, cta-pulse-v 3s ease-in-out infinite;
          }

          @keyframes cta-pulse-v {
            0%, 100% {
              box-shadow: 0 10px 35px rgba(255, 107, 157, 0.25);
            }
            50% {
              box-shadow: 0 10px 40px rgba(255, 107, 157, 0.4);
            }
          }

          .btn-valentine-new:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 16px 50px rgba(255, 107, 157, 0.5);
          }

          .btn-bg-v {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #ff6b9d, #c44569);
            z-index: 1;
          }

          .btn-content-v {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            padding: 18px 36px;
            color: white;
          }

          .btn-text-v {
            font-size: 1.0625rem;
            font-weight: 700;
          }

          .btn-price-v {
            font-size: 1rem;
            font-weight: 800;
            padding: 6px 14px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 8px;
            backdrop-filter: blur(10px);
            animation: price-shimmer-v 2s ease-in-out infinite;
          }

          @keyframes price-shimmer-v {
            0%, 100% {
              background: rgba(255, 255, 255, 0.25);
            }
            50% {
              background: rgba(255, 255, 255, 0.35);
            }
          }

          .btn-shine-v {
            position: absolute;
            top: 50%;
            left: -100%;
            width: 100%;
            height: 200%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: translateY(-50%) rotate(45deg);
            transition: left 0.6s ease;
            z-index: 3;
            pointer-events: none;
          }

          .btn-valentine-new:hover .btn-shine-v {
            left: 200%;
          }

          /* Trust Badges */
          .valentine-trust {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin-top: 12px;
            flex-wrap: wrap;
          }

          .trust-item-v {
            font-size: 0.8125rem;
            color: #c44569;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
            animation: slide-in-right 0.5s ease-out backwards;
          }

          .trust-item-v:nth-child(1) { animation-delay: 0.7s; }
          .trust-item-v:nth-child(2) { animation-delay: 0.8s; }
          .trust-item-v:nth-child(3) { animation-delay: 0.9s; }

          /* Testimonial */
          .valentine-testimonial {
            background: var(--soft-white);
            border: 1px solid rgba(255, 107, 157, 0.2);
            border-radius: 14px;
            padding: 16px;
            margin-top: 24px;
            box-shadow: 0 6px 20px rgba(255, 107, 157, 0.08);
            animation: fadeInUp 1s ease-out 0.4s backwards, card-float 4s ease-in-out infinite;
            transition: all 0.3s ease;
          }

          .valentine-testimonial:hover {
            box-shadow: 0 10px 30px rgba(255, 107, 157, 0.15);
            transform: translateY(-4px);
          }

          .testimonial-stars-v {
            color: #f59e0b;
            font-size: 1rem;
            margin-bottom: 10px;
            letter-spacing: 2px;
            animation: stars-twinkle 2s ease-in-out infinite;
          }

          .testimonial-text-v {
            font-size: 0.875rem;
            line-height: 1.6;
            color: var(--charcoal);
            font-style: italic;
            margin-bottom: 14px;
          }

          .testimonial-author-v {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .author-avatar-v {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff6b9d, #c44569);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.125rem;
            animation: avatar-glow-v 3s ease-in-out infinite;
          }

          @keyframes avatar-glow-v {
            0%, 100% {
              box-shadow: 0 0 0 rgba(255, 107, 157, 0.3);
            }
            50% {
              box-shadow: 0 0 15px rgba(255, 107, 157, 0.5);
            }
          }

          .author-details-v {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .author-name-v {
            font-size: 0.875rem;
            font-weight: 700;
            color: var(--charcoal);
          }

          .author-badge-v {
            font-size: 0.75rem;
            color: #c44569;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          /* Price Note */
          .valentine-price-note {
            font-size: 0.8125rem;
            color: var(--muted);
            font-style: italic;
            text-align: center;
            margin-top: 16px;
            animation: fadeInUp 1.2s ease-out 0.6s backwards, gentle-pulse 3s ease-in-out infinite;
          }

          /* Visual Scene */
          .valentine-visual {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 380px;
          }

          .valentine-scene {
            position: relative;
            width: 100%;
            max-width: 320px;
            height: 360px;
            animation: scene-float 6s ease-in-out infinite;
          }

          /* Large Heart */
          .love-heart-big {
            font-size: 10rem;
            text-align: center;
            animation: heart-pulse-big 2s ease-in-out infinite;
            filter: drop-shadow(0 8px 24px rgba(255, 107, 157, 0.3));
          }

          @keyframes heart-pulse-big {
            0%, 100% {
              transform: scale(1);
            }
            25%, 75% {
              transform: scale(1.05);
            }
            50% {
              transform: scale(1.1);
            }
          }

          /* Heart Cluster */
          .heart-cluster {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .heart-small {
            position: absolute;
            font-size: 2rem;
            animation: float-heart 4s ease-in-out infinite;
          }

          .h-1 { top: 10%; left: 20%; animation-delay: 0s; }
          .h-2 { top: 15%; right: 15%; animation-delay: 0.5s; }
          .h-3 { bottom: 20%; left: 15%; animation-delay: 1s; }
          .h-4 { bottom: 25%; right: 20%; animation-delay: 1.5s; }
          .h-5 { top: 50%; left: 10%; animation-delay: 2s; }

          @keyframes float-heart {
            0%, 100% {
              transform: translateY(0) rotate(0deg) scale(1);
            }
            50% {
              transform: translateY(-20px) rotate(10deg) scale(1.1);
            }
          }

          /* Sparkles */
          .sparkle-v {
            position: absolute;
            font-size: 1.5rem;
            animation: sparkle-drift 4s ease-in-out infinite;
          }

          .sp-v-1 { top: 10%; right: 10%; animation-delay: 0s; }
          .sp-v-2 { top: 30%; left: 5%; animation-delay: 1s; }
          .sp-v-3 { bottom: 30%; right: 5%; animation-delay: 2s; }
          .sp-v-4 { bottom: 10%; left: 10%; animation-delay: 3s; }

          /* Responsive */
          @media (max-width: 1024px) {
            .valentine-layout {
              grid-template-columns: 1fr;
              gap: 40px;
              text-align: center;
            }

            .valentine-visual {
              order: -1;
              min-height: 320px;
            }

            .valentine-scene {
              max-width: 260px;
              height: 320px;
            }

            .valentine-description {
              margin-left: auto;
              margin-right: auto;
            }

            .valentine-pills {
              justify-content: center;
            }

            .valentine-trust {
              justify-content: center;
            }
          }

          @media (max-width: 768px) {
            .valentines-hero {
              padding: 100px 0 50px;
              min-height: auto;
            }

            .valentine-urgency {
              padding: 8px 20px;
            }

            .urgency-text {
              font-size: 0.6875rem;
            }

            .valentine-visual {
              min-height: 260px;
            }

            .valentine-scene {
              max-width: 220px;
              height: 260px;
            }

            .love-heart-big {
              font-size: 7rem;
            }

            .btn-content-v {
              flex-direction: column;
              padding: 16px 28px;
              text-align: center;
              gap: 10px;
            }

            .btn-text-v {
              font-size: 1rem;
            }

            .btn-price-v {
              font-size: 0.9375rem;
            }

            .valentine-social-proof {
              font-size: 0.8125rem;
              padding: 8px 16px;
            }

            .valentine-pills {
              font-size: 0.8125rem;
            }

            .v-pill-btn {
              padding: 8px 14px;
              font-size: 0.8125rem;
            }

            .valentine-testimonial {
              padding: 16px;
            }

            .testimonial-text-v {
              font-size: 0.875rem;
            }

            .valentine-trust {
              flex-direction: column;
              gap: 10px;
            }
          }
        `}</style>
      </section>
    );
  }

  // Mother's Day - Elegant & Heartfelt
  if (category.slug === 'mothers-day') {
    const mothersRecipients = {
      mom: {
        headline: "Watch Mom's Heart Melt",
        pronoun: 'her',
        emoji: '👩',
        color: '#d946a6',
        label: '👩 Mom'
      },
      mother: {
        headline: "Watch Mother's Heart Melt",
        pronoun: 'her',
        emoji: '🌸',
        color: '#c084fc',
        label: '🌸 Mother'
      },
      grandma: {
        headline: "Watch Grandma's Heart Melt",
        pronoun: 'her',
        emoji: '👵',
        color: '#f472b6',
        label: '👵 Grandma'
      },
      'mother-in-law': {
        headline: "Watch Her Heart Melt",
        pronoun: 'her',
        emoji: '💐',
        color: '#e879f9',
        label: '💐 Mother-in-Law'
      },
      stepmom: {
        headline: "Watch Stepmom's Heart Melt",
        pronoun: 'her',
        emoji: '🌺',
        color: '#ec4899',
        label: '🌺 Stepmom'
      }
    };

    const current = mothersRecipients[selectedRecipient as keyof typeof mothersRecipients];

    return (
      <section className="mothers-hero-luxe">
        {/* Floating flowers background */}
        <div className="flowers-ambient">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flower-float" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
              opacity: 0.08 + Math.random() * 0.12
            }} suppressHydrationWarning>
              {['🌸', '🌺', '🌷', '🌹', '💐'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>

        {/* Bokeh background */}
        <div className="bokeh-mothers">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="bokeh-m" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${40 + Math.random() * 90}px`,
              height: `${40 + Math.random() * 90}px`,
              animationDelay: `${Math.random() * 4}s`,
              background: [
                'radial-gradient(circle, rgba(217, 70, 166, 0.12), transparent)',
                'radial-gradient(circle, rgba(192, 132, 252, 0.12), transparent)',
                'radial-gradient(circle, rgba(244, 114, 182, 0.12), transparent)',
                'radial-gradient(circle, rgba(232, 121, 249, 0.12), transparent)'
              ][Math.floor(Math.random() * 4)]
            }}></div>
          ))}
        </div>

        <div className="container-mothers">
          <div className="mothers-layout">
            {/* Left Content */}
            <div className="mothers-content">
              {/* Social Proof */}
              <div className="mothers-social-proof">
                <span className="proof-icon-m">💝</span>
                <span className="proof-text-m"><strong>4,231 families</strong> honored their moms this month</span>
              </div>

              {/* Urgency Badge */}
              <div className="mothers-urgency">
                <div className="urgency-inner-m">
                  <span className="urgency-icon-m">⏰</span>
                  <span className="urgency-text-m">Mother's Day is May 12th • Order Today</span>
                  <span className="urgency-shine-m"></span>
                </div>
                <div className="ribbon-tail-m ribbon-tail-left-m"></div>
                <div className="ribbon-tail-m ribbon-tail-right-m"></div>
              </div>

              {/* Headline */}
              <h1 className="mothers-headline">
                <span className="m-script">She gave you everything.</span>
                <span className="m-main">
                  <span className="word-mother" key={selectedRecipient}>{current.headline}</span>
                </span>
                <span className="m-emphasis">Hearing {current.pronoun === 'his' ? 'His' : 'Her'} Name in a Song</span>
              </h1>

              {/* Description */}
              <p className="mothers-description">
                A heartfelt 2-minute song with <strong>{current.pronoun} name sung 4 times</strong> by professional vocalists—
                more meaningful than flowers, treasured for a lifetime.
              </p>

              {/* Recipient Pills */}
              <div className="mothers-pills">
                <span className="pills-label-m">Perfect for:</span>
                {(Object.keys(mothersRecipients) as Array<keyof typeof mothersRecipients>).map((key) => (
                  <button
                    key={key}
                    className={`m-pill-btn ${selectedRecipient === key ? 'active' : ''}`}
                    onClick={() => setSelectedRecipient(key)}
                  >
                    {mothersRecipients[key].label}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="mothers-cta-section">
                <a href={`/${category.slug}`} className="btn-mothers-new">
                  <span className="btn-bg-m"></span>
                  <span className="btn-content-m">
                    <span className="btn-text-m">Create Her Tribute Song</span>
                    <span className="btn-price-m">Just <PriceDisplay usdAmount={category.price} /></span>
                  </span>
                  <span className="btn-sparkle-m"></span>
                </a>

                <div className="mothers-trust">
                  <span className="trust-item-m">✓ Instant Download</span>
                  <span className="trust-item-m">✓ Keep Forever</span>
                  <span className="trust-item-m">✓ 100% Heartfelt</span>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mothers-testimonial">
                <div className="testimonial-stars-m">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text-m">"My mom cried tears of joy. She's played it every morning since Mother's Day. Best gift I've ever given her."</p>
                <div className="testimonial-author-m">
                  <div className="author-avatar-m">E</div>
                  <div className="author-details-m">
                    <span className="author-name-m">Emily S.</span>
                    <span className="author-badge-m">✓ Verified Buyer</span>
                  </div>
                </div>
              </div>

              {/* Price Comparison */}
              <p className="mothers-price-note">
                Less than a bouquet of roses, but means infinitely more
              </p>
            </div>

            {/* Right Visual */}
            <div className="mothers-visual">
              <div className="mothers-scene" key={selectedRecipient}>
                {/* Large Recipient Emoji */}
                <div className="mothers-emoji-main">
                  <div className="emoji-display-m" style={{ color: current.color }}>{current.emoji}</div>
                  <div className="emoji-glow-m" style={{ background: `radial-gradient(circle, ${current.color}30, transparent)` }}></div>
                </div>

                {/* Floating flowers around */}
                <div className="flower-cluster">
                  <div className="flower-orbit f-o-1" style={{ color: current.color }}>🌸</div>
                  <div className="flower-orbit f-o-2" style={{ color: current.color }}>🌺</div>
                  <div className="flower-orbit f-o-3" style={{ color: current.color }}>🌷</div>
                  <div className="flower-orbit f-o-4" style={{ color: current.color }}>🌹</div>
                  <div className="flower-orbit f-o-5" style={{ color: current.color }}>💐</div>
                  <div className="flower-orbit f-o-6" style={{ color: current.color }}>🌸</div>
                </div>

                {/* Heart accents */}
                <div className="heart-accent h-a-1" style={{ color: current.color }}>💕</div>
                <div className="heart-accent h-a-2" style={{ color: current.color }}>💖</div>
                <div className="heart-accent h-a-3" style={{ color: current.color }}>💗</div>

                {/* Sparkles */}
                <div className="sparkle-m sp-m-1">✨</div>
                <div className="sparkle-m sp-m-2">⭐</div>
                <div className="sparkle-m sp-m-3">💫</div>
                <div className="sparkle-m sp-m-4">✨</div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .mothers-hero-luxe {
            position: relative;
            min-height: 90vh;
            background: linear-gradient(165deg,
              #fef8fc 0%,
              #fef3f9 40%,
              #fceef7 100%
            );
            padding: 120px 0 60px;
            overflow: hidden;
            display: flex;
            align-items: center;
          }

          /* Floating Flowers */
          .flowers-ambient {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          .flower-float {
            position: absolute;
            animation: flower-drift 20s ease-in-out infinite;
          }

          @keyframes flower-drift {
            0%, 100% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(20px, -20px) rotate(90deg);
            }
            50% {
              transform: translate(0, -40px) rotate(180deg);
            }
            75% {
              transform: translate(-20px, -20px) rotate(270deg);
            }
          }

          /* Bokeh */
          .bokeh-mothers {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
          }

          .bokeh-m {
            position: absolute;
            border-radius: 50%;
            filter: blur(45px);
            animation: bokeh-pulse-m 4s ease-in-out infinite;
          }

          @keyframes bokeh-pulse-m {
            0%, 100% {
              opacity: 0.25;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.3);
            }
          }

          /* Container */
          .container-mothers {
            width: 90%;
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }

          .mothers-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
          }

          /* Content */
          .mothers-content {
            color: var(--charcoal);
          }

          /* Social Proof */
          .mothers-social-proof {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(217, 70, 166, 0.08);
            border: 1px solid rgba(217, 70, 166, 0.2);
            padding: 8px 18px;
            border-radius: 50px;
            margin-bottom: 20px;
            font-size: 0.875rem;
            animation: fadeInUp 0.6s ease-out;
          }

          .proof-icon-m {
            font-size: 1.125rem;
            animation: gentle-spin 8s linear infinite;
          }

          .proof-text-m strong {
            color: #d946a6;
            font-weight: 700;
            animation: number-pulse 3s ease-in-out infinite;
          }

          /* Urgency Badge */
          .mothers-urgency {
            position: relative;
            display: inline-block;
            margin-bottom: 24px;
            z-index: 120;
          }

          .urgency-inner-m {
            position: relative;
            background: linear-gradient(135deg, #d946a6, #c084fc);
            padding: 10px 28px;
            border-radius: 6px;
            box-shadow: 0 6px 20px rgba(217, 70, 166, 0.3);
            overflow: hidden;
            animation: ribbon-wiggle 3s ease-in-out infinite;
          }

          .urgency-icon-m {
            font-size: 1rem;
            margin-right: 8px;
            color: white;
          }

          .urgency-text-m {
            font-size: 0.875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: white;
            position: relative;
            z-index: 2;
          }

          .urgency-shine-m {
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
            animation: ribbon-shine 3s infinite;
            z-index: 1;
          }

          .ribbon-tail-m {
            position: absolute;
            top: 100%;
            width: 0;
            height: 0;
            border-style: solid;
          }

          .ribbon-tail-left-m {
            left: 0;
            border-width: 12px 16px 0 0;
            border-color: #a21caf transparent transparent transparent;
          }

          .ribbon-tail-right-m {
            right: 0;
            border-width: 12px 0 0 16px;
            border-color: #a21caf transparent transparent transparent;
          }

          /* Recipient Pills */
          .mothers-pills {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease-out 0.2s backwards;
          }

          .pills-label-m {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--muted);
          }

          .m-pill-btn {
            padding: 8px 16px;
            background: var(--soft-white);
            border: 2px solid rgba(217, 70, 166, 0.2);
            border-radius: 50px;
            font-size: 0.8125rem;
            font-weight: 600;
            color: var(--charcoal);
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
            animation: pill-pop 0.5s ease-out backwards;
          }

          .m-pill-btn:nth-child(2) { animation-delay: 0.3s; }
          .m-pill-btn:nth-child(3) { animation-delay: 0.4s; }
          .m-pill-btn:nth-child(4) { animation-delay: 0.5s; }
          .m-pill-btn:nth-child(5) { animation-delay: 0.6s; }
          .m-pill-btn:nth-child(6) { animation-delay: 0.7s; }

          .m-pill-btn:hover {
            border-color: #d946a6;
            background: rgba(217, 70, 166, 0.05);
            transform: translateY(-2px) scale(1.05);
          }

          .m-pill-btn.active {
            background: linear-gradient(135deg, #d946a6, #c084fc);
            color: white;
            border-color: #d946a6;
            box-shadow: 0 4px 12px rgba(217, 70, 166, 0.3);
            animation: pill-pop 0.5s ease-out backwards, gentle-bounce 2s ease-in-out infinite;
          }

          /* Headline */
          .mothers-headline {
            font-family: var(--font-serif);
            margin-bottom: 18px;
            line-height: 1.15;
          }

          .m-script {
            display: block;
            font-size: clamp(1.125rem, 2vw, 1.5rem);
            font-style: italic;
            font-weight: 400;
            color: var(--muted);
            margin-bottom: 6px;
            animation: fadeInUp 0.6s ease-out 0.1s backwards;
          }

          .m-main {
            display: block;
            font-size: clamp(2.25rem, 4.5vw, 3.75rem);
            font-weight: 700;
            color: var(--charcoal);
            margin-bottom: 10px;
            letter-spacing: -0.02em;
            animation: fadeInUp 0.6s ease-out 0.2s backwards;
          }

          .word-mother {
            background: linear-gradient(135deg, #d946a6, #e879f9, #d946a6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% 200%;
            animation: mother-shimmer 3s ease-in-out infinite, text-fade-in 0.5s ease-out;
            display: inline-block;
            transition: all 0.3s ease;
          }

          @keyframes mother-shimmer {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          .m-emphasis {
            display: block;
            font-size: clamp(1.375rem, 2.75vw, 2rem);
            font-weight: 500;
            color: #d946a6;
            font-style: italic;
            animation: fadeInUp 0.6s ease-out 0.3s backwards;
            transition: opacity 0.3s ease;
          }

          /* Description */
          .mothers-description {
            font-size: clamp(0.9375rem, 1.6vw, 1.0625rem);
            line-height: 1.65;
            color: var(--muted);
            margin-bottom: 24px;
            max-width: 520px;
            animation: fadeInUp 0.6s ease-out 0.4s backwards;
          }

          .mothers-description strong {
            color: var(--charcoal);
          }

          /* CTA */
          .mothers-cta-section {
            margin-top: 28px;
          }

          .btn-mothers-new {
            position: relative;
            display: inline-block;
            text-decoration: none;
            padding: 0;
            margin-bottom: 16px;
            overflow: hidden;
            border-radius: 14px;
            box-shadow: 0 10px 35px rgba(217, 70, 166, 0.25);
            transition: all 0.4s ease;
            animation: fadeInUp 0.6s ease-out 0.5s backwards, cta-pulse-m 3s ease-in-out infinite;
          }

          @keyframes cta-pulse-m {
            0%, 100% {
              box-shadow: 0 10px 35px rgba(217, 70, 166, 0.25);
            }
            50% {
              box-shadow: 0 10px 40px rgba(217, 70, 166, 0.4);
            }
          }

          .btn-mothers-new:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 16px 50px rgba(217, 70, 166, 0.5);
          }

          .btn-bg-m {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #d946a6, #c084fc);
            z-index: 1;
          }

          .btn-content-m {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            padding: 18px 36px;
            color: white;
          }

          .btn-text-m {
            font-size: 1.0625rem;
            font-weight: 700;
          }

          .btn-price-m {
            font-size: 1rem;
            font-weight: 800;
            padding: 6px 14px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 8px;
            backdrop-filter: blur(10px);
            animation: price-shimmer-m 2s ease-in-out infinite;
          }

          @keyframes price-shimmer-m {
            0%, 100% {
              background: rgba(255, 255, 255, 0.25);
            }
            50% {
              background: rgba(255, 255, 255, 0.35);
            }
          }

          .btn-sparkle-m {
            position: absolute;
            top: 50%;
            left: -100%;
            width: 100%;
            height: 200%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: translateY(-50%) rotate(45deg);
            transition: left 0.6s ease;
            z-index: 3;
            pointer-events: none;
          }

          .btn-mothers-new:hover .btn-sparkle-m {
            left: 200%;
          }

          /* Trust Badges */
          .mothers-trust {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin-top: 12px;
            flex-wrap: wrap;
          }

          .trust-item-m {
            font-size: 0.8125rem;
            color: #d946a6;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
            animation: slide-in-right 0.5s ease-out backwards;
          }

          .trust-item-m:nth-child(1) { animation-delay: 0.7s; }
          .trust-item-m:nth-child(2) { animation-delay: 0.8s; }
          .trust-item-m:nth-child(3) { animation-delay: 0.9s; }

          /* Testimonial */
          .mothers-testimonial {
            background: var(--soft-white);
            border: 1px solid rgba(217, 70, 166, 0.2);
            border-radius: 14px;
            padding: 16px;
            margin-top: 24px;
            box-shadow: 0 6px 20px rgba(217, 70, 166, 0.08);
            animation: fadeInUp 1s ease-out 0.4s backwards, card-float 4s ease-in-out infinite;
            transition: all 0.3s ease;
          }

          .mothers-testimonial:hover {
            box-shadow: 0 10px 30px rgba(217, 70, 166, 0.15);
            transform: translateY(-4px);
          }

          .testimonial-stars-m {
            color: #f59e0b;
            font-size: 1rem;
            margin-bottom: 10px;
            letter-spacing: 2px;
            animation: stars-twinkle 2s ease-in-out infinite;
          }

          .testimonial-text-m {
            font-size: 0.875rem;
            line-height: 1.6;
            color: var(--charcoal);
            font-style: italic;
            margin-bottom: 14px;
          }

          .testimonial-author-m {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .author-avatar-m {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #d946a6, #c084fc);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.125rem;
            animation: avatar-glow-m 3s ease-in-out infinite;
          }

          @keyframes avatar-glow-m {
            0%, 100% {
              box-shadow: 0 0 0 rgba(217, 70, 166, 0.3);
            }
            50% {
              box-shadow: 0 0 15px rgba(217, 70, 166, 0.5);
            }
          }

          .author-details-m {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .author-name-m {
            font-size: 0.875rem;
            font-weight: 700;
            color: var(--charcoal);
          }

          .author-badge-m {
            font-size: 0.75rem;
            color: #d946a6;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          /* Price Note */
          .mothers-price-note {
            font-size: 0.8125rem;
            color: var(--muted);
            font-style: italic;
            text-align: center;
            margin-top: 16px;
            animation: fadeInUp 1.2s ease-out 0.6s backwards, gentle-pulse 3s ease-in-out infinite;
          }

          /* Visual Scene */
          .mothers-visual {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 380px;
          }

          .mothers-scene {
            position: relative;
            width: 100%;
            max-width: 320px;
            height: 360px;
            animation: scene-float 6s ease-in-out infinite;
          }

          /* Main Emoji */
          .mothers-emoji-main {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            animation: emoji-appear-m 0.6s ease-out;
          }

          @keyframes emoji-appear-m {
            from {
              opacity: 0;
              transform: scale(0.5);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .emoji-display-m {
            font-size: 9rem;
            animation: emoji-pulse-m 3s ease-in-out infinite;
            filter: drop-shadow(0 8px 24px rgba(217, 70, 166, 0.25));
            position: relative;
            z-index: 2;
          }

          @keyframes emoji-pulse-m {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.08);
            }
          }

          .emoji-glow-m {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 250px;
            height: 250px;
            border-radius: 50%;
            filter: blur(50px);
            z-index: 1;
            animation: glow-pulse 3s ease-in-out infinite;
          }

          /* Flower Cluster */
          .flower-cluster {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .flower-orbit {
            position: absolute;
            font-size: 2rem;
            animation: orbit-flower 6s ease-in-out infinite;
          }

          .f-o-1 { top: 10%; left: 20%; animation-delay: 0s; }
          .f-o-2 { top: 15%; right: 15%; animation-delay: 1s; }
          .f-o-3 { top: 60%; left: 10%; animation-delay: 2s; }
          .f-o-4 { bottom: 20%; right: 20%; animation-delay: 3s; }
          .f-o-5 { bottom: 15%; left: 25%; animation-delay: 4s; }
          .f-o-6 { top: 50%; right: 10%; animation-delay: 5s; }

          @keyframes orbit-flower {
            0%, 100% {
              transform: translateY(0) rotate(0deg) scale(1);
            }
            50% {
              transform: translateY(-15px) rotate(180deg) scale(1.1);
            }
          }

          /* Heart Accents */
          .heart-accent {
            position: absolute;
            font-size: 1.5rem;
            animation: heart-float-m 4s ease-in-out infinite;
          }

          .h-a-1 { top: 25%; left: 5%; animation-delay: 0s; }
          .h-a-2 { top: 70%; right: 5%; animation-delay: 1.5s; }
          .h-a-3 { bottom: 30%; left: 15%; animation-delay: 3s; }

          @keyframes heart-float-m {
            0%, 100% {
              transform: translateY(0) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-12px) scale(1.2);
              opacity: 1;
            }
          }

          /* Sparkles */
          .sparkle-m {
            position: absolute;
            font-size: 1.5rem;
            animation: sparkle-drift 4s ease-in-out infinite;
          }

          .sp-m-1 { top: 5%; right: 15%; animation-delay: 0s; }
          .sp-m-2 { top: 35%; left: 8%; animation-delay: 1s; }
          .sp-m-3 { bottom: 25%; right: 8%; animation-delay: 2s; }
          .sp-m-4 { bottom: 8%; left: 12%; animation-delay: 3s; }

          /* Responsive */
          @media (max-width: 1024px) {
            .mothers-layout {
              grid-template-columns: 1fr;
              gap: 40px;
              text-align: center;
            }

            .mothers-visual {
              order: -1;
              min-height: 320px;
            }

            .mothers-scene {
              max-width: 260px;
              height: 320px;
            }

            .mothers-description {
              margin-left: auto;
              margin-right: auto;
            }

            .mothers-pills {
              justify-content: center;
            }

            .mothers-trust {
              justify-content: center;
            }
          }

          @media (max-width: 768px) {
            .mothers-hero-luxe {
              padding: 100px 0 50px;
              min-height: auto;
            }

            .urgency-inner-m {
              padding: 8px 20px;
            }

            .urgency-text-m {
              font-size: 0.6875rem;
            }

            .mothers-visual {
              min-height: 260px;
            }

            .mothers-scene {
              max-width: 220px;
              height: 260px;
            }

            .emoji-display-m {
              font-size: 6rem;
            }

            .btn-content-m {
              flex-direction: column;
              padding: 16px 28px;
              text-align: center;
              gap: 10px;
            }

            .btn-text-m {
              font-size: 1rem;
            }

            .btn-price-m {
              font-size: 0.9375rem;
            }

            .mothers-social-proof {
              font-size: 0.8125rem;
              padding: 8px 16px;
            }

            .mothers-pills {
              font-size: 0.8125rem;
            }

            .m-pill-btn {
              padding: 8px 14px;
              font-size: 0.8125rem;
            }

            .mothers-testimonial {
              padding: 16px;
            }

            .testimonial-text-m {
              font-size: 0.875rem;
            }

            .mothers-trust {
              flex-direction: column;
              gap: 10px;
            }
          }
        `}</style>
      </section>
    );
  }

  // Father's Day - Strong & Heartfelt
  if (category.slug === 'fathers-day') {
    const fathersRecipients = {
      dad: {
        headline: "Watch Dad's Face Light Up",
        pronoun: 'his',
        emoji: '👨',
        color: '#1e40af',
        label: '👨 Dad'
      },
      father: {
        headline: "Watch Father's Face Light Up",
        pronoun: 'his',
        emoji: '👔',
        color: '#0369a1',
        label: '👔 Father'
      },
      grandpa: {
        headline: "Watch Grandpa's Face Light Up",
        pronoun: 'his',
        emoji: '👴',
        color: '#0f766e',
        label: '👴 Grandpa'
      },
      'father-in-law': {
        headline: "Watch His Face Light Up",
        pronoun: 'his',
        emoji: '🎖️',
        color: '#334155',
        label: '🎖️ Father-in-Law'
      },
      stepdad: {
        headline: "Watch Stepdad's Face Light Up",
        pronoun: 'his',
        emoji: '⭐',
        color: '#0c4a6e',
        label: '⭐ Stepdad'
      }
    };

    const current = fathersRecipients[selectedRecipient as keyof typeof fathersRecipients];

    return (
      <section className="fathers-hero-luxe">
        {/* Geometric background elements */}
        <div className="geometric-ambient">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="geometric-shape" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
              opacity: 0.05 + Math.random() * 0.1,
              transform: `rotate(${Math.random() * 360}deg)`
            }}></div>
          ))}
        </div>

        {/* Bokeh background */}
        <div className="bokeh-fathers">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="bokeh-f" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${40 + Math.random() * 80}px`,
              height: `${40 + Math.random() * 80}px`,
              animationDelay: `${Math.random() * 4}s`,
              background: [
                'radial-gradient(circle, rgba(30, 64, 175, 0.1), transparent)',
                'radial-gradient(circle, rgba(3, 105, 161, 0.1), transparent)',
                'radial-gradient(circle, rgba(15, 118, 110, 0.1), transparent)',
                'radial-gradient(circle, rgba(51, 65, 85, 0.08), transparent)'
              ][Math.floor(Math.random() * 4)]
            }}></div>
          ))}
        </div>

        <div className="container-fathers">
          <div className="fathers-layout">
            {/* Left Content */}
            <div className="fathers-content">
              {/* Social Proof */}
              <div className="fathers-social-proof">
                <span className="proof-icon-f">🏆</span>
                <span className="proof-text-f"><strong>3,612 families</strong> honored their dads this month</span>
              </div>

              {/* Urgency Badge */}
              <div className="fathers-urgency">
                <div className="urgency-inner-f">
                  <span className="urgency-icon-f">⏰</span>
                  <span className="urgency-text-f">Father's Day is June 21st • Order Today</span>
                  <span className="urgency-shine-f"></span>
                </div>
                <div className="ribbon-tail-f ribbon-tail-left-f"></div>
                <div className="ribbon-tail-f ribbon-tail-right-f"></div>
              </div>

              {/* Headline */}
              <h1 className="fathers-headline">
                <span className="f-script">He's always been your hero.</span>
                <span className="f-main">
                  <span className="word-father" key={selectedRecipient}>{current.headline}</span>
                </span>
                <span className="f-emphasis">Hearing {current.pronoun === 'his' ? 'His' : 'Their'} Name in a Song</span>
              </h1>

              {/* Description */}
              <p className="fathers-description">
                A powerful 2-minute tribute with <strong>{current.pronoun} name sung 4 times</strong> by professional vocalists—
                more meaningful than a tie, treasured for a lifetime.
              </p>

              {/* Recipient Pills */}
              <div className="fathers-pills">
                <span className="pills-label-f">Perfect for:</span>
                {(Object.keys(fathersRecipients) as Array<keyof typeof fathersRecipients>).map((key) => (
                  <button
                    key={key}
                    className={`f-pill-btn ${selectedRecipient === key ? 'active' : ''}`}
                    onClick={() => setSelectedRecipient(key)}
                  >
                    {fathersRecipients[key].label}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="fathers-cta-section">
                <a href={`/${category.slug}`} className="btn-fathers-new">
                  <span className="btn-bg-f"></span>
                  <span className="btn-content-f">
                    <span className="btn-text-f">Create His Tribute Song</span>
                    <span className="btn-price-f">Just <PriceDisplay usdAmount={category.price} /></span>
                  </span>
                  <span className="btn-sparkle-f"></span>
                </a>

                <div className="fathers-trust">
                  <span className="trust-item-f">✓ Instant Download</span>
                  <span className="trust-item-f">✓ Keep Forever</span>
                  <span className="trust-item-f">✓ 100% Powerful</span>
                </div>
              </div>

              {/* Testimonial */}
              <div className="fathers-testimonial">
                <div className="testimonial-stars-f">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text-f">"Dad got emotional when he heard his name in the chorus. He said it's the best gift he's ever received. I'll never forget that moment."</p>
                <div className="testimonial-author-f">
                  <div className="author-avatar-f">M</div>
                  <div className="author-details-f">
                    <span className="author-name-f">Michael T.</span>
                    <span className="author-badge-f">✓ Verified Buyer</span>
                  </div>
                </div>
              </div>

              {/* Price Comparison */}
              <p className="fathers-price-note">
                Less than dinner out, but means infinitely more
              </p>
            </div>

            {/* Right Visual */}
            <div className="fathers-visual">
              <div className="fathers-scene" key={selectedRecipient}>
                {/* Large Recipient Emoji */}
                <div className="fathers-emoji-main">
                  <div className="emoji-display-f" style={{ color: current.color }}>{current.emoji}</div>
                  <div className="emoji-glow-f" style={{ background: `radial-gradient(circle, ${current.color}25, transparent)` }}></div>
                </div>

                {/* Floating stars/badges around */}
                <div className="star-cluster">
                  <div className="star-orbit s-o-1" style={{ color: current.color }}>⭐</div>
                  <div className="star-orbit s-o-2" style={{ color: current.color }}>🏆</div>
                  <div className="star-orbit s-o-3" style={{ color: current.color }}>⭐</div>
                  <div className="star-orbit s-o-4" style={{ color: current.color }}>🎖️</div>
                  <div className="star-orbit s-o-5" style={{ color: current.color }}>⭐</div>
                  <div className="star-orbit s-o-6" style={{ color: current.color }}>💪</div>
                </div>

                {/* Heart accents */}
                <div className="heart-accent-f h-f-1" style={{ color: current.color }}>💙</div>
                <div className="heart-accent-f h-f-2" style={{ color: current.color }}>💙</div>
                <div className="heart-accent-f h-f-3" style={{ color: current.color }}>💙</div>

                {/* Sparkles */}
                <div className="sparkle-f sp-f-1">✨</div>
                <div className="sparkle-f sp-f-2">⭐</div>
                <div className="sparkle-f sp-f-3">💫</div>
                <div className="sparkle-f sp-f-4">✨</div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .fathers-hero-luxe {
            position: relative;
            min-height: 90vh;
            background: linear-gradient(165deg,
              #f8fafc 0%,
              #f1f5f9 40%,
              #e2e8f0 100%
            );
            padding: 120px 0 60px;
            overflow: hidden;
            display: flex;
            align-items: center;
          }

          /* Geometric Shapes */
          .geometric-ambient {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          .geometric-shape {
            position: absolute;
            border: 2px solid rgba(30, 64, 175, 0.15);
            border-radius: 4px;
            animation: geometric-float 20s ease-in-out infinite;
          }

          @keyframes geometric-float {
            0%, 100% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(15px, -15px) rotate(90deg);
            }
            50% {
              transform: translate(0, -30px) rotate(180deg);
            }
            75% {
              transform: translate(-15px, -15px) rotate(270deg);
            }
          }

          /* Bokeh */
          .bokeh-fathers {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
          }

          .bokeh-f {
            position: absolute;
            border-radius: 50%;
            filter: blur(40px);
            animation: bokeh-pulse-f 4s ease-in-out infinite;
          }

          @keyframes bokeh-pulse-f {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.2);
            }
          }

          /* Container */
          .container-fathers {
            width: 90%;
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }

          .fathers-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
          }

          /* Content */
          .fathers-content {
            color: var(--charcoal);
          }

          /* Social Proof */
          .fathers-social-proof {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(30, 64, 175, 0.08);
            border: 1px solid rgba(30, 64, 175, 0.2);
            padding: 8px 18px;
            border-radius: 50px;
            margin-bottom: 20px;
            font-size: 0.875rem;
            animation: fadeInUp 0.6s ease-out;
          }

          .proof-icon-f {
            font-size: 1.125rem;
            animation: gentle-spin 8s linear infinite;
          }

          .proof-text-f strong {
            color: #1e40af;
            font-weight: 700;
            animation: number-pulse 3s ease-in-out infinite;
          }

          /* Urgency Badge */
          .fathers-urgency {
            position: relative;
            display: inline-block;
            margin-bottom: 24px;
            z-index: 120;
          }

          .urgency-inner-f {
            position: relative;
            background: linear-gradient(135deg, #1e40af, #0369a1);
            padding: 10px 28px;
            border-radius: 6px;
            box-shadow: 0 6px 20px rgba(30, 64, 175, 0.3);
            overflow: hidden;
            animation: ribbon-wiggle 3s ease-in-out infinite;
          }

          .urgency-icon-f {
            font-size: 1rem;
            margin-right: 8px;
            color: white;
          }

          .urgency-text-f {
            font-size: 0.875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: white;
            position: relative;
            z-index: 2;
          }

          .urgency-shine-f {
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
            animation: ribbon-shine 3s infinite;
            z-index: 1;
          }

          .ribbon-tail-f {
            position: absolute;
            top: 100%;
            width: 0;
            height: 0;
            border-style: solid;
          }

          .ribbon-tail-left-f {
            left: 0;
            border-width: 12px 16px 0 0;
            border-color: #1e3a8a transparent transparent transparent;
          }

          .ribbon-tail-right-f {
            right: 0;
            border-width: 12px 0 0 16px;
            border-color: #1e3a8a transparent transparent transparent;
          }

          /* Recipient Pills */
          .fathers-pills {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease-out 0.2s backwards;
          }

          .pills-label-f {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--muted);
          }

          .f-pill-btn {
            padding: 8px 16px;
            background: var(--soft-white);
            border: 2px solid rgba(30, 64, 175, 0.2);
            border-radius: 50px;
            font-size: 0.8125rem;
            font-weight: 600;
            color: var(--charcoal);
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
            animation: pill-pop 0.5s ease-out backwards;
          }

          .f-pill-btn:nth-child(2) { animation-delay: 0.3s; }
          .f-pill-btn:nth-child(3) { animation-delay: 0.4s; }
          .f-pill-btn:nth-child(4) { animation-delay: 0.5s; }
          .f-pill-btn:nth-child(5) { animation-delay: 0.6s; }
          .f-pill-btn:nth-child(6) { animation-delay: 0.7s; }

          .f-pill-btn:hover {
            border-color: #1e40af;
            background: rgba(30, 64, 175, 0.05);
            transform: translateY(-2px) scale(1.05);
          }

          .f-pill-btn.active {
            background: linear-gradient(135deg, #1e40af, #0369a1);
            color: white;
            border-color: #1e40af;
            box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
            animation: pill-pop 0.5s ease-out backwards, gentle-bounce 2s ease-in-out infinite;
          }

          /* Headline */
          .fathers-headline {
            font-family: var(--font-serif);
            margin-bottom: 18px;
            line-height: 1.15;
          }

          .f-script {
            display: block;
            font-size: clamp(1.125rem, 2vw, 1.5rem);
            font-style: italic;
            font-weight: 400;
            color: var(--muted);
            margin-bottom: 6px;
            animation: fadeInUp 0.6s ease-out 0.1s backwards;
          }

          .f-main {
            display: block;
            font-size: clamp(2.25rem, 4.5vw, 3.75rem);
            font-weight: 700;
            color: var(--charcoal);
            margin-bottom: 10px;
            letter-spacing: -0.02em;
            animation: fadeInUp 0.6s ease-out 0.2s backwards;
          }

          .word-father {
            background: linear-gradient(135deg, #1e40af, #0369a1, #1e40af);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% 200%;
            animation: father-shimmer 3s ease-in-out infinite, text-fade-in 0.5s ease-out;
            display: inline-block;
            transition: all 0.3s ease;
          }

          @keyframes father-shimmer {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          .f-emphasis {
            display: block;
            font-size: clamp(1.375rem, 2.75vw, 2rem);
            font-weight: 500;
            color: #1e40af;
            font-style: italic;
            animation: fadeInUp 0.6s ease-out 0.3s backwards;
            transition: opacity 0.3s ease;
          }

          /* Description */
          .fathers-description {
            font-size: clamp(0.9375rem, 1.6vw, 1.0625rem);
            line-height: 1.65;
            color: var(--muted);
            margin-bottom: 24px;
            max-width: 520px;
            animation: fadeInUp 0.6s ease-out 0.4s backwards;
          }

          .fathers-description strong {
            color: var(--charcoal);
          }

          /* CTA */
          .fathers-cta-section {
            margin-top: 28px;
          }

          .btn-fathers-new {
            position: relative;
            display: inline-block;
            text-decoration: none;
            padding: 0;
            margin-bottom: 16px;
            overflow: hidden;
            border-radius: 14px;
            box-shadow: 0 10px 35px rgba(30, 64, 175, 0.25);
            transition: all 0.4s ease;
            animation: fadeInUp 0.6s ease-out 0.5s backwards, cta-pulse-f 3s ease-in-out infinite;
          }

          @keyframes cta-pulse-f {
            0%, 100% {
              box-shadow: 0 10px 35px rgba(30, 64, 175, 0.25);
            }
            50% {
              box-shadow: 0 10px 40px rgba(30, 64, 175, 0.4);
            }
          }

          .btn-fathers-new:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 16px 50px rgba(30, 64, 175, 0.5);
          }

          .btn-bg-f {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #1e40af, #0369a1);
            z-index: 1;
          }

          .btn-content-f {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            padding: 18px 36px;
            color: white;
          }

          .btn-text-f {
            font-size: 1.0625rem;
            font-weight: 700;
          }

          .btn-price-f {
            font-size: 1rem;
            font-weight: 800;
            padding: 6px 14px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 8px;
            backdrop-filter: blur(10px);
            animation: price-shimmer-f 2s ease-in-out infinite;
          }

          @keyframes price-shimmer-f {
            0%, 100% {
              background: rgba(255, 255, 255, 0.25);
            }
            50% {
              background: rgba(255, 255, 255, 0.35);
            }
          }

          .btn-sparkle-f {
            position: absolute;
            top: 50%;
            left: -100%;
            width: 100%;
            height: 200%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: translateY(-50%) rotate(45deg);
            transition: left 0.6s ease;
            z-index: 3;
            pointer-events: none;
          }

          .btn-fathers-new:hover .btn-sparkle-f {
            left: 200%;
          }

          /* Trust Badges */
          .fathers-trust {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin-top: 12px;
            flex-wrap: wrap;
          }

          .trust-item-f {
            font-size: 0.8125rem;
            color: #1e40af;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
            animation: slide-in-right 0.5s ease-out backwards;
          }

          .trust-item-f:nth-child(1) { animation-delay: 0.7s; }
          .trust-item-f:nth-child(2) { animation-delay: 0.8s; }
          .trust-item-f:nth-child(3) { animation-delay: 0.9s; }

          /* Testimonial */
          .fathers-testimonial {
            background: var(--soft-white);
            border: 1px solid rgba(30, 64, 175, 0.2);
            border-radius: 14px;
            padding: 16px;
            margin-top: 24px;
            box-shadow: 0 6px 20px rgba(30, 64, 175, 0.08);
            animation: fadeInUp 1s ease-out 0.4s backwards, card-float 4s ease-in-out infinite;
            transition: all 0.3s ease;
          }

          .fathers-testimonial:hover {
            box-shadow: 0 10px 30px rgba(30, 64, 175, 0.15);
            transform: translateY(-4px);
          }

          .testimonial-stars-f {
            color: #f59e0b;
            font-size: 1rem;
            margin-bottom: 10px;
            letter-spacing: 2px;
            animation: stars-twinkle 2s ease-in-out infinite;
          }

          .testimonial-text-f {
            font-size: 0.875rem;
            line-height: 1.6;
            color: var(--charcoal);
            font-style: italic;
            margin-bottom: 14px;
          }

          .testimonial-author-f {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .author-avatar-f {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1e40af, #0369a1);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.125rem;
            animation: avatar-glow-f 3s ease-in-out infinite;
          }

          @keyframes avatar-glow-f {
            0%, 100% {
              box-shadow: 0 0 0 rgba(30, 64, 175, 0.3);
            }
            50% {
              box-shadow: 0 0 15px rgba(30, 64, 175, 0.5);
            }
          }

          .author-details-f {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .author-name-f {
            font-size: 0.875rem;
            font-weight: 700;
            color: var(--charcoal);
          }

          .author-badge-f {
            font-size: 0.75rem;
            color: #1e40af;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          /* Price Note */
          .fathers-price-note {
            font-size: 0.8125rem;
            color: var(--muted);
            font-style: italic;
            text-align: center;
            margin-top: 16px;
            animation: fadeInUp 1.2s ease-out 0.6s backwards, gentle-pulse 3s ease-in-out infinite;
          }

          /* Visual Scene */
          .fathers-visual {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 380px;
          }

          .fathers-scene {
            position: relative;
            width: 100%;
            max-width: 320px;
            height: 360px;
            animation: scene-float 6s ease-in-out infinite;
          }

          /* Main Emoji */
          .fathers-emoji-main {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            animation: emoji-appear-f 0.6s ease-out;
          }

          @keyframes emoji-appear-f {
            from {
              opacity: 0;
              transform: scale(0.5);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .emoji-display-f {
            font-size: 9rem;
            animation: emoji-pulse-f 3s ease-in-out infinite;
            filter: drop-shadow(0 8px 24px rgba(30, 64, 175, 0.25));
            position: relative;
            z-index: 2;
          }

          @keyframes emoji-pulse-f {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.08);
            }
          }

          .emoji-glow-f {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 250px;
            height: 250px;
            border-radius: 50%;
            filter: blur(50px);
            z-index: 1;
            animation: glow-pulse 3s ease-in-out infinite;
          }

          /* Star Cluster */
          .star-cluster {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .star-orbit {
            position: absolute;
            font-size: 2rem;
            animation: orbit-star 6s ease-in-out infinite;
          }

          .s-o-1 { top: 10%; left: 20%; animation-delay: 0s; }
          .s-o-2 { top: 15%; right: 15%; animation-delay: 1s; }
          .s-o-3 { top: 60%; left: 10%; animation-delay: 2s; }
          .s-o-4 { bottom: 20%; right: 20%; animation-delay: 3s; }
          .s-o-5 { bottom: 15%; left: 25%; animation-delay: 4s; }
          .s-o-6 { top: 50%; right: 10%; animation-delay: 5s; }

          @keyframes orbit-star {
            0%, 100% {
              transform: translateY(0) rotate(0deg) scale(1);
            }
            50% {
              transform: translateY(-15px) rotate(180deg) scale(1.1);
            }
          }

          /* Heart Accents */
          .heart-accent-f {
            position: absolute;
            font-size: 1.5rem;
            animation: heart-float-f 4s ease-in-out infinite;
          }

          .h-f-1 { top: 25%; left: 5%; animation-delay: 0s; }
          .h-f-2 { top: 70%; right: 5%; animation-delay: 1.5s; }
          .h-f-3 { bottom: 30%; left: 15%; animation-delay: 3s; }

          @keyframes heart-float-f {
            0%, 100% {
              transform: translateY(0) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-12px) scale(1.2);
              opacity: 1;
            }
          }

          /* Sparkles */
          .sparkle-f {
            position: absolute;
            font-size: 1.5rem;
            animation: sparkle-drift 4s ease-in-out infinite;
          }

          .sp-f-1 { top: 5%; right: 15%; animation-delay: 0s; }
          .sp-f-2 { top: 35%; left: 8%; animation-delay: 1s; }
          .sp-f-3 { bottom: 25%; right: 8%; animation-delay: 2s; }
          .sp-f-4 { bottom: 8%; left: 12%; animation-delay: 3s; }

          /* Responsive */
          @media (max-width: 1024px) {
            .fathers-layout {
              grid-template-columns: 1fr;
              gap: 40px;
              text-align: center;
            }

            .fathers-visual {
              order: -1;
              min-height: 320px;
            }

            .fathers-scene {
              max-width: 260px;
              height: 320px;
            }

            .fathers-description {
              margin-left: auto;
              margin-right: auto;
            }

            .fathers-pills {
              justify-content: center;
            }

            .fathers-trust {
              justify-content: center;
            }
          }

          @media (max-width: 768px) {
            .fathers-hero-luxe {
              padding: 100px 0 50px;
              min-height: auto;
            }

            .urgency-inner-f {
              padding: 8px 20px;
            }

            .urgency-text-f {
              font-size: 0.6875rem;
            }

            .fathers-visual {
              min-height: 260px;
            }

            .fathers-scene {
              max-width: 220px;
              height: 260px;
            }

            .emoji-display-f {
              font-size: 6rem;
            }

            .btn-content-f {
              flex-direction: column;
              padding: 16px 28px;
              text-align: center;
              gap: 10px;
            }

            .btn-text-f {
              font-size: 1rem;
            }

            .btn-price-f {
              font-size: 0.9375rem;
            }

            .fathers-social-proof {
              font-size: 0.8125rem;
              padding: 8px 16px;
            }

            .fathers-pills {
              font-size: 0.8125rem;
            }

            .f-pill-btn {
              padding: 8px 14px;
              font-size: 0.8125rem;
            }

            .fathers-testimonial {
              padding: 16px;
            }

            .testimonial-text-f {
              font-size: 0.875rem;
            }

            .fathers-trust {
              flex-direction: column;
              gap: 10px;
            }
          }
        `}</style>
      </section>
    );
  }

  // Graduation - Proud & Inspiring
  if (category.slug === 'graduation') {
    const graduationRecipients = {
      graduate: {
        headline: "Watch Them Beam with Pride",
        pronoun: 'their',
        emoji: '🎓',
        color: '#d97706',
        label: '🎓 Graduate'
      },
      son: {
        headline: "Watch Your Son Beam with Pride",
        pronoun: 'his',
        emoji: '👨‍🎓',
        color: '#0891b2',
        label: '👨‍🎓 Son'
      },
      daughter: {
        headline: "Watch Your Daughter Beam with Pride",
        pronoun: 'her',
        emoji: '👩‍🎓',
        color: '#db2777',
        label: '👩‍🎓 Daughter'
      },
      friend: {
        headline: "Watch Your Friend Beam with Pride",
        pronoun: 'their',
        emoji: '🎉',
        color: '#7c3aed',
        label: '🎉 Friend'
      },
      sibling: {
        headline: "Watch Them Beam with Pride",
        pronoun: 'their',
        emoji: '🌟',
        color: '#059669',
        label: '🌟 Sibling'
      }
    };

    const current = graduationRecipients[selectedRecipient as keyof typeof graduationRecipients];

    return (
      <section className="graduation-hero-luxe">
        {/* Confetti background elements */}
        <div className="confetti-ambient">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="confetti-piece" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${8 + Math.random() * 12}px`,
              height: `${8 + Math.random() * 12}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
              opacity: 0.15 + Math.random() * 0.15,
              backgroundColor: ['#d97706', '#0891b2', '#db2777', '#7c3aed', '#059669'][Math.floor(Math.random() * 5)],
              transform: `rotate(${Math.random() * 360}deg)`
            }} suppressHydrationWarning></div>
          ))}
        </div>

        {/* Bokeh background */}
        <div className="bokeh-graduation">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="bokeh-g" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${40 + Math.random() * 70}px`,
              height: `${40 + Math.random() * 70}px`,
              animationDelay: `${Math.random() * 4}s`,
              background: [
                'radial-gradient(circle, rgba(217, 119, 6, 0.1), transparent)',
                'radial-gradient(circle, rgba(8, 145, 178, 0.1), transparent)',
                'radial-gradient(circle, rgba(219, 39, 119, 0.1), transparent)',
                'radial-gradient(circle, rgba(124, 58, 237, 0.08), transparent)'
              ][Math.floor(Math.random() * 4)]
            }}></div>
          ))}
        </div>

        <div className="container-graduation">
          <div className="graduation-layout">
            {/* Left Content */}
            <div className="graduation-content">
              {/* Social Proof */}
              <div className="graduation-social-proof">
                <span className="proof-icon-g">🎉</span>
                <span className="proof-text-g"><strong>2,847 graduates</strong> celebrated their achievement this season</span>
              </div>

              {/* Urgency Badge */}
              <div className="graduation-urgency">
                <div className="urgency-inner-g">
                  <span className="urgency-icon-g">⏰</span>
                  <span className="urgency-text-g">Graduation Season • Order Before the Big Day</span>
                  <span className="urgency-shine-g"></span>
                </div>
                <div className="ribbon-tail-g ribbon-tail-left-g"></div>
                <div className="ribbon-tail-g ribbon-tail-right-g"></div>
              </div>

              {/* Headline */}
              <h1 className="graduation-headline">
                <span className="g-script">They did it. They conquered it all.</span>
                <span className="g-main">
                  <span className="word-graduation" key={selectedRecipient}>{current.headline}</span>
                </span>
                <span className="g-emphasis">Hearing {current.pronoun === 'his' ? 'His' : current.pronoun === 'her' ? 'Her' : 'Their'} Name in a Victory Song</span>
              </h1>

              {/* Description */}
              <p className="graduation-description">
                A triumphant 2-minute anthem with <strong>{current.pronoun} name sung 4 times</strong> by professional vocalists—
                a graduation gift they'll remember forever.
              </p>

              {/* Recipient Pills */}
              <div className="graduation-pills">
                <span className="pills-label-g">Perfect for:</span>
                {(Object.keys(graduationRecipients) as Array<keyof typeof graduationRecipients>).map((key) => (
                  <button
                    key={key}
                    className={`g-pill-btn ${selectedRecipient === key ? 'active' : ''}`}
                    onClick={() => setSelectedRecipient(key)}
                  >
                    {graduationRecipients[key].label}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="graduation-cta-section">
                <a href={`/${category.slug}`} className="btn-graduation-new">
                  <span className="btn-bg-g"></span>
                  <span className="btn-content-g">
                    <span className="btn-text-g">Create Their Victory Song</span>
                    <span className="btn-price-g">Just <PriceDisplay usdAmount={category.price} /></span>
                  </span>
                  <span className="btn-sparkle-g"></span>
                </a>

                <div className="graduation-trust">
                  <span className="trust-item-g">✓ Instant Download</span>
                  <span className="trust-item-g">✓ Keep Forever</span>
                  <span className="trust-item-g">✓ 100% Inspiring</span>
                </div>
              </div>

              {/* Testimonial */}
              <div className="graduation-testimonial">
                <div className="testimonial-stars-g">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text-g">"My daughter cried when she heard it at her graduation party. Hearing her name in the chorus made her feel so celebrated. Worth every penny!"</p>
                <div className="testimonial-author-g">
                  <div className="author-avatar-g">L</div>
                  <div className="author-details-g">
                    <span className="author-name-g">Lisa R.</span>
                    <span className="author-badge-g">✓ Verified Buyer</span>
                  </div>
                </div>
              </div>

              {/* Price Comparison */}
              <p className="graduation-price-note">
                Less than a graduation frame, but infinitely more memorable
              </p>
            </div>

            {/* Right Visual */}
            <div className="graduation-visual">
              <div className="graduation-scene" key={selectedRecipient}>
                {/* Large Recipient Emoji */}
                <div className="graduation-emoji-main">
                  <div className="emoji-display-g" style={{ color: current.color }}>{current.emoji}</div>
                  <div className="emoji-glow-g" style={{ background: `radial-gradient(circle, ${current.color}30, transparent)` }}></div>
                </div>

                {/* Floating caps/diplomas around */}
                <div className="achievement-cluster">
                  <div className="achievement-orbit a-o-1" style={{ color: current.color }}>🎓</div>
                  <div className="achievement-orbit a-o-2" style={{ color: current.color }}>📜</div>
                  <div className="achievement-orbit a-o-3" style={{ color: current.color }}>🎓</div>
                  <div className="achievement-orbit a-o-4" style={{ color: current.color }}>🏆</div>
                  <div className="achievement-orbit a-o-5" style={{ color: current.color }}>🎓</div>
                  <div className="achievement-orbit a-o-6" style={{ color: current.color }}>⭐</div>
                </div>

                {/* Celebration accents */}
                <div className="celebration-accent c-a-1" style={{ color: current.color }}>🎉</div>
                <div className="celebration-accent c-a-2" style={{ color: current.color }}>🎊</div>
                <div className="celebration-accent c-a-3" style={{ color: current.color }}>✨</div>

                {/* Sparkles */}
                <div className="sparkle-g sp-g-1">✨</div>
                <div className="sparkle-g sp-g-2">⭐</div>
                <div className="sparkle-g sp-g-3">💫</div>
                <div className="sparkle-g sp-g-4">✨</div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .graduation-hero-luxe {
            position: relative;
            min-height: 80vh;
            background: linear-gradient(165deg,
              #fffbeb 0%,
              #fef3c7 40%,
              #fde68a 100%
            );
            padding: 120px 0 50px;
            overflow: hidden;
            display: flex;
            align-items: center;
          }

          /* Confetti */
          .confetti-ambient {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          .confetti-piece {
            position: absolute;
            animation: confetti-fall 15s ease-in-out infinite;
          }

          @keyframes confetti-fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }

          /* Bokeh */
          .bokeh-graduation {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
          }

          .bokeh-g {
            position: absolute;
            border-radius: 50%;
            filter: blur(40px);
            animation: bokeh-pulse-g 4s ease-in-out infinite;
          }

          @keyframes bokeh-pulse-g {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.2);
            }
          }

          /* Container */
          .container-graduation {
            width: 90%;
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }

          .graduation-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
          }

          /* Content */
          .graduation-content {
            color: var(--charcoal);
          }

          /* Social Proof */
          .graduation-social-proof {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(217, 119, 6, 0.08);
            border: 1px solid rgba(217, 119, 6, 0.2);
            padding: 8px 18px;
            border-radius: 50px;
            margin-bottom: 20px;
            font-size: 0.875rem;
            animation: fadeInUp 0.6s ease-out;
          }

          .proof-icon-g {
            font-size: 1.125rem;
            animation: gentle-spin 8s linear infinite;
          }

          .proof-text-g strong {
            color: #d97706;
            font-weight: 700;
            animation: number-pulse 3s ease-in-out infinite;
          }

          /* Urgency Badge */
          .graduation-urgency {
            position: relative;
            display: inline-block;
            margin-bottom: 24px;
            z-index: 120;
          }

          .urgency-inner-g {
            position: relative;
            background: linear-gradient(135deg, #d97706, #ea580c);
            padding: 10px 28px;
            border-radius: 6px;
            box-shadow: 0 6px 20px rgba(217, 119, 6, 0.3);
            overflow: hidden;
            animation: ribbon-wiggle 3s ease-in-out infinite;
          }

          .urgency-icon-g {
            font-size: 1rem;
            margin-right: 8px;
            color: white;
          }

          .urgency-text-g {
            font-size: 0.875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: white;
            position: relative;
            z-index: 2;
          }

          .urgency-shine-g {
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
            animation: ribbon-shine 3s infinite;
            z-index: 1;
          }

          .ribbon-tail-g {
            position: absolute;
            top: 100%;
            width: 0;
            height: 0;
            border-style: solid;
          }

          .ribbon-tail-left-g {
            left: 0;
            border-width: 12px 16px 0 0;
            border-color: #c2410c transparent transparent transparent;
          }

          .ribbon-tail-right-g {
            right: 0;
            border-width: 12px 0 0 16px;
            border-color: #c2410c transparent transparent transparent;
          }

          /* Recipient Pills */
          .graduation-pills {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease-out 0.2s backwards;
          }

          .pills-label-g {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--muted);
          }

          .g-pill-btn {
            padding: 8px 16px;
            background: var(--soft-white);
            border: 2px solid rgba(217, 119, 6, 0.2);
            border-radius: 50px;
            font-size: 0.8125rem;
            font-weight: 600;
            color: var(--charcoal);
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
            animation: pill-pop 0.5s ease-out backwards;
          }

          .g-pill-btn:nth-child(2) { animation-delay: 0.3s; }
          .g-pill-btn:nth-child(3) { animation-delay: 0.4s; }
          .g-pill-btn:nth-child(4) { animation-delay: 0.5s; }
          .g-pill-btn:nth-child(5) { animation-delay: 0.6s; }
          .g-pill-btn:nth-child(6) { animation-delay: 0.7s; }

          .g-pill-btn:hover {
            border-color: #d97706;
            background: rgba(217, 119, 6, 0.05);
            transform: translateY(-2px) scale(1.05);
          }

          .g-pill-btn.active {
            background: linear-gradient(135deg, #d97706, #ea580c);
            color: white;
            border-color: #d97706;
            box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
            animation: pill-pop 0.5s ease-out backwards, gentle-bounce 2s ease-in-out infinite;
          }

          /* Headline */
          .graduation-headline {
            font-family: var(--font-serif);
            margin-bottom: 18px;
            line-height: 1.15;
          }

          .g-script {
            display: block;
            font-size: clamp(1.125rem, 2vw, 1.5rem);
            font-style: italic;
            font-weight: 400;
            color: var(--muted);
            margin-bottom: 6px;
            animation: fadeInUp 0.6s ease-out 0.1s backwards;
          }

          .g-main {
            display: block;
            font-size: clamp(2.25rem, 4.5vw, 3.75rem);
            font-weight: 700;
            color: var(--charcoal);
            margin-bottom: 10px;
            letter-spacing: -0.02em;
            animation: fadeInUp 0.6s ease-out 0.2s backwards;
          }

          .word-graduation {
            background: linear-gradient(135deg, #d97706, #f59e0b, #d97706);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% 200%;
            animation: graduation-shimmer 3s ease-in-out infinite, text-fade-in 0.5s ease-out;
            display: inline-block;
            transition: all 0.3s ease;
          }

          @keyframes graduation-shimmer {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          .g-emphasis {
            display: block;
            font-size: clamp(1.375rem, 2.75vw, 2rem);
            font-weight: 500;
            color: #d97706;
            font-style: italic;
            animation: fadeInUp 0.6s ease-out 0.3s backwards;
            transition: opacity 0.3s ease;
          }

          /* Description */
          .graduation-description {
            font-size: clamp(0.9375rem, 1.6vw, 1.0625rem);
            line-height: 1.65;
            color: var(--muted);
            margin-bottom: 24px;
            max-width: 520px;
            animation: fadeInUp 0.6s ease-out 0.4s backwards;
          }

          .graduation-description strong {
            color: var(--charcoal);
          }

          /* CTA */
          .graduation-cta-section {
            margin-top: 28px;
          }

          .btn-graduation-new {
            position: relative;
            display: inline-block;
            text-decoration: none;
            padding: 0;
            margin-bottom: 16px;
            overflow: hidden;
            border-radius: 14px;
            box-shadow: 0 10px 35px rgba(217, 119, 6, 0.25);
            transition: all 0.4s ease;
            animation: fadeInUp 0.6s ease-out 0.5s backwards, cta-pulse-g 3s ease-in-out infinite;
          }

          @keyframes cta-pulse-g {
            0%, 100% {
              box-shadow: 0 10px 35px rgba(217, 119, 6, 0.25);
            }
            50% {
              box-shadow: 0 10px 40px rgba(217, 119, 6, 0.4);
            }
          }

          .btn-graduation-new:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 16px 50px rgba(217, 119, 6, 0.5);
          }

          .btn-bg-g {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #d97706, #ea580c);
            z-index: 1;
          }

          .btn-content-g {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            padding: 18px 36px;
            color: white;
          }

          .btn-text-g {
            font-size: 1.0625rem;
            font-weight: 700;
          }

          .btn-price-g {
            font-size: 1rem;
            font-weight: 800;
            padding: 6px 14px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 8px;
            backdrop-filter: blur(10px);
            animation: price-shimmer-g 2s ease-in-out infinite;
          }

          @keyframes price-shimmer-g {
            0%, 100% {
              background: rgba(255, 255, 255, 0.25);
            }
            50% {
              background: rgba(255, 255, 255, 0.35);
            }
          }

          .btn-sparkle-g {
            position: absolute;
            top: 50%;
            left: -100%;
            width: 100%;
            height: 200%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: translateY(-50%) rotate(45deg);
            transition: left 0.6s ease;
            z-index: 3;
            pointer-events: none;
          }

          .btn-graduation-new:hover .btn-sparkle-g {
            left: 200%;
          }

          /* Trust Badges */
          .graduation-trust {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin-top: 12px;
            flex-wrap: wrap;
          }

          .trust-item-g {
            font-size: 0.8125rem;
            color: #d97706;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
            animation: slide-in-right 0.5s ease-out backwards;
          }

          .trust-item-g:nth-child(1) { animation-delay: 0.7s; }
          .trust-item-g:nth-child(2) { animation-delay: 0.8s; }
          .trust-item-g:nth-child(3) { animation-delay: 0.9s; }

          /* Testimonial */
          .graduation-testimonial {
            background: var(--soft-white);
            border: 1px solid rgba(217, 119, 6, 0.2);
            border-radius: 14px;
            padding: 16px;
            margin-top: 24px;
            box-shadow: 0 6px 20px rgba(217, 119, 6, 0.08);
            animation: fadeInUp 1s ease-out 0.4s backwards, card-float 4s ease-in-out infinite;
            transition: all 0.3s ease;
          }

          .graduation-testimonial:hover {
            box-shadow: 0 10px 30px rgba(217, 119, 6, 0.15);
            transform: translateY(-4px);
          }

          .testimonial-stars-g {
            color: #f59e0b;
            font-size: 1rem;
            margin-bottom: 10px;
            letter-spacing: 2px;
            animation: stars-twinkle 2s ease-in-out infinite;
          }

          .testimonial-text-g {
            font-size: 0.875rem;
            line-height: 1.6;
            color: var(--charcoal);
            font-style: italic;
            margin-bottom: 14px;
          }

          .testimonial-author-g {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .author-avatar-g {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #d97706, #ea580c);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.125rem;
            animation: avatar-glow-g 3s ease-in-out infinite;
          }

          @keyframes avatar-glow-g {
            0%, 100% {
              box-shadow: 0 0 0 rgba(217, 119, 6, 0.3);
            }
            50% {
              box-shadow: 0 0 15px rgba(217, 119, 6, 0.5);
            }
          }

          .author-details-g {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .author-name-g {
            font-size: 0.875rem;
            font-weight: 700;
            color: var(--charcoal);
          }

          .author-badge-g {
            font-size: 0.75rem;
            color: #d97706;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          /* Price Note */
          .graduation-price-note {
            font-size: 0.8125rem;
            color: var(--muted);
            font-style: italic;
            text-align: center;
            margin-top: 16px;
            animation: fadeInUp 1.2s ease-out 0.6s backwards, gentle-pulse 3s ease-in-out infinite;
          }

          /* Visual Scene */
          .graduation-visual {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 380px;
          }

          .graduation-scene {
            position: relative;
            width: 100%;
            max-width: 320px;
            height: 360px;
            animation: scene-float 6s ease-in-out infinite;
          }

          /* Main Emoji */
          .graduation-emoji-main {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            animation: emoji-appear-g 0.6s ease-out;
          }

          @keyframes emoji-appear-g {
            from {
              opacity: 0;
              transform: scale(0.5) rotate(-20deg);
            }
            to {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          .emoji-display-g {
            font-size: 7rem;
            animation: emoji-pulse-g 3s ease-in-out infinite;
            filter: drop-shadow(0 8px 24px rgba(217, 119, 6, 0.25));
            position: relative;
            z-index: 2;
          }

          @keyframes emoji-pulse-g {
            0%, 100% {
              transform: scale(1) rotate(0deg);
            }
            50% {
              transform: scale(1.08) rotate(5deg);
            }
          }

          .emoji-glow-g {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 250px;
            height: 250px;
            border-radius: 50%;
            filter: blur(50px);
            z-index: 1;
            animation: glow-pulse 3s ease-in-out infinite;
          }

          /* Achievement Cluster */
          .achievement-cluster {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .achievement-orbit {
            position: absolute;
            font-size: 2rem;
            animation: orbit-achievement 6s ease-in-out infinite;
          }

          .a-o-1 { top: 10%; left: 20%; animation-delay: 0s; }
          .a-o-2 { top: 15%; right: 15%; animation-delay: 1s; }
          .a-o-3 { top: 60%; left: 10%; animation-delay: 2s; }
          .a-o-4 { bottom: 20%; right: 20%; animation-delay: 3s; }
          .a-o-5 { bottom: 15%; left: 25%; animation-delay: 4s; }
          .a-o-6 { top: 50%; right: 10%; animation-delay: 5s; }

          @keyframes orbit-achievement {
            0%, 100% {
              transform: translateY(0) rotate(0deg) scale(1);
            }
            50% {
              transform: translateY(-15px) rotate(180deg) scale(1.1);
            }
          }

          /* Celebration Accents */
          .celebration-accent {
            position: absolute;
            font-size: 1.5rem;
            animation: celebration-float 4s ease-in-out infinite;
          }

          .c-a-1 { top: 25%; left: 5%; animation-delay: 0s; }
          .c-a-2 { top: 70%; right: 5%; animation-delay: 1.5s; }
          .c-a-3 { bottom: 30%; left: 15%; animation-delay: 3s; }

          @keyframes celebration-float {
            0%, 100% {
              transform: translateY(0) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-12px) scale(1.2);
              opacity: 1;
            }
          }

          /* Sparkles */
          .sparkle-g {
            position: absolute;
            font-size: 1.5rem;
            animation: sparkle-drift 4s ease-in-out infinite;
          }

          .sp-g-1 { top: 5%; right: 15%; animation-delay: 0s; }
          .sp-g-2 { top: 35%; left: 8%; animation-delay: 1s; }
          .sp-g-3 { bottom: 25%; right: 8%; animation-delay: 2s; }
          .sp-g-4 { bottom: 8%; left: 12%; animation-delay: 3s; }

          /* Responsive */
          @media (max-width: 1024px) {
            .graduation-layout {
              grid-template-columns: 1fr;
              gap: 40px;
              text-align: center;
            }

            .graduation-visual {
              order: -1;
              min-height: 320px;
            }

            .graduation-scene {
              max-width: 260px;
              height: 320px;
            }

            .graduation-description {
              margin-left: auto;
              margin-right: auto;
            }

            .graduation-pills {
              justify-content: center;
            }

            .graduation-trust {
              justify-content: center;
            }
          }

          @media (max-width: 768px) {
            .graduation-hero-luxe {
              padding: 100px 0 50px;
              min-height: auto;
            }

            .urgency-inner-g {
              padding: 8px 20px;
            }

            .urgency-text-g {
              font-size: 0.6875rem;
            }

            .graduation-visual {
              min-height: 260px;
            }

            .graduation-scene {
              max-width: 220px;
              height: 260px;
            }

            .emoji-display-g {
              font-size: 6rem;
            }

            .btn-content-g {
              flex-direction: column;
              padding: 16px 28px;
              text-align: center;
              gap: 10px;
            }

            .btn-text-g {
              font-size: 1rem;
            }

            .btn-price-g {
              font-size: 0.9375rem;
            }

            .graduation-social-proof {
              font-size: 0.8125rem;
              padding: 8px 16px;
            }

            .graduation-pills {
              font-size: 0.8125rem;
            }

            .g-pill-btn {
              padding: 8px 14px;
              font-size: 0.8125rem;
            }

            .graduation-testimonial {
              padding: 16px;
            }

            .testimonial-text-g {
              font-size: 0.875rem;
            }

            .graduation-trust {
              flex-direction: column;
              gap: 10px;
            }
          }
        `}</style>
      </section>
    );
  }

  // Thanksgiving - Grateful & Warm
  if (category.slug === 'thanksgiving') {
    const thanksgivingRecipients = {
      family: {
        headline: "Watch Your Family Feel Deeply Grateful",
        pronoun: 'their',
        emoji: '👨‍👩‍👧‍👦',
        color: '#ea580c',
        label: '👨‍👩‍👧‍👦 Family'
      },
      parents: {
        headline: "Watch Your Parents Feel Deeply Grateful",
        pronoun: 'their',
        emoji: '👵👴',
        color: '#dc2626',
        label: '👵👴 Parents'
      },
      grandparents: {
        headline: "Watch Your Grandparents Feel Deeply Grateful",
        pronoun: 'their',
        emoji: '🦃',
        color: '#92400e',
        label: '🦃 Grandparents'
      },
      friends: {
        headline: "Watch Your Friends Feel Deeply Grateful",
        pronoun: 'their',
        emoji: '🍂',
        color: '#f59e0b',
        label: '🍂 Friends'
      },
      self: {
        headline: "Feel Deeply Grateful This Season",
        pronoun: 'your',
        emoji: '🙏',
        color: '#78350f',
        label: '🙏 Myself'
      }
    };

    const current = thanksgivingRecipients[selectedRecipient as keyof typeof thanksgivingRecipients];

    return (
      <section className="thanksgiving-hero-luxe">
        {/* Floating autumn leaves */}
        <div className="leaves-ambient">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="leaf-float" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${16 + Math.random() * 16}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              opacity: 0.15 + Math.random() * 0.2
            }} suppressHydrationWarning>
              {['🍂', '🍁', '🌾'][Math.floor(Math.random() * 3)]}
            </div>
          ))}
        </div>

        {/* Bokeh background */}
        <div className="bokeh-thanksgiving">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bokeh-t" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${50 + Math.random() * 80}px`,
              height: `${50 + Math.random() * 80}px`,
              animationDelay: `${Math.random() * 5}s`,
              background: [
                'radial-gradient(circle, rgba(234, 88, 12, 0.12), transparent)',
                'radial-gradient(circle, rgba(220, 38, 38, 0.1), transparent)',
                'radial-gradient(circle, rgba(146, 64, 14, 0.1), transparent)',
                'radial-gradient(circle, rgba(245, 158, 11, 0.08), transparent)'
              ][Math.floor(Math.random() * 4)]
            }}></div>
          ))}
        </div>

        <div className="container-thanksgiving">
          <div className="thanksgiving-layout">
            {/* Left Content */}
            <div className="thanksgiving-content">
              {/* Social Proof */}
              <div className="thanksgiving-social-proof">
                <span className="proof-icon-t">🦃</span>
                <span className="proof-text-t"><strong>3,214 families</strong> shared their gratitude through personalized songs this season</span>
              </div>

              {/* Urgency Badge */}
              <div className="thanksgiving-urgency">
                <div className="urgency-inner-t">
                  <span className="urgency-icon-t">⏰</span>
                  <span className="urgency-text-t">Thanksgiving is November 28th • Order Today</span>
                  <span className="urgency-shine-t"></span>
                </div>
                <div className="ribbon-tail-t ribbon-tail-left-t"></div>
                <div className="ribbon-tail-t ribbon-tail-right-t"></div>
              </div>

              {/* Recipient Selector */}
              <div className="thanksgiving-pills">
                <div className="pills-label-t">🎵 Who are you thankful for?</div>
                <div className="pills-container-t">
                  {(Object.keys(thanksgivingRecipients) as Array<keyof typeof thanksgivingRecipients>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedRecipient(key)}
                      className={`pill-btn-t ${selectedRecipient === key ? 'active' : ''}`}
                    >
                      {thanksgivingRecipients[key].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Headline */}
              <h1 className="thanksgiving-headline" key={selectedRecipient}>
                <span className="t-line-1">A moment of gratitude.</span>
                <span className="t-line-2">A lifetime of warmth.</span>
                <span className="t-line-3">{current.headline}</span>
              </h1>

              {/* Description */}
              <p className="thanksgiving-description">
                This Thanksgiving, give the gift of a <strong>personalized gratitude song</strong> that brings your family together.
                Imagine {current.pronoun} faces lighting up as they hear their names woven into a heartfelt tribute.
                <span className="sparkle-t">✨</span>
              </p>

              {/* Features */}
              <div className="thanksgiving-features">
                <span className="feature-item-t"><span className="feature-icon-t">🎼</span> Unique custom melody</span>
                <span className="feature-divider-t">•</span>
                <span className="feature-item-t"><span className="feature-icon-t">🎤</span> Professional vocals</span>
                <span className="feature-divider-t">•</span>
                <span className="feature-item-t"><span className="feature-icon-t">⚡</span> Ready in 5 minutes</span>
              </div>

              {/* CTA Button */}
              <div className="thanksgiving-cta">
                <a href={`/${category.slug}`} className="btn-thanksgiving-new">
                  <div className="btn-bg-t"></div>
                  <div className="btn-content-t">
                    <span className="btn-text-t">Create My Gratitude Song</span>
                    <span className="btn-price-t"><PriceDisplay usdAmount={category.price} /></span>
                  </div>
                  <div className="btn-shine-t"></div>
                </a>
                <p className="cta-subtitle-t">🔒 Secure checkout • Instant delivery</p>
              </div>

              {/* Trust Badges */}
              <div className="thanksgiving-trust">
                <div className="trust-item-t">⭐⭐⭐⭐⭐ 4.9/5</div>
                <div className="trust-item-t">🎵 12,847 songs created</div>
                <div className="trust-item-t">💚 100% happiness guarantee</div>
              </div>

              {/* Testimonial Card */}
              <div className="thanksgiving-testimonial">
                <div className="testimonial-stars-t">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text-t">"My whole family cried happy tears when we played the Thanksgiving song together. It captured everything we're grateful for. This is our new tradition."</p>
                <div className="testimonial-author-t">
                  <div className="author-avatar-t">M</div>
                  <div className="author-details-t">
                    <div className="author-name-t">Margaret T.</div>
                    <div className="author-badge-t">✓ Verified Purchase</div>
                  </div>
                </div>
              </div>

              {/* Price Comparison */}
              <p className="thanksgiving-price-note">
                💰 Compare: Hallmark cards ($8), dinner centerpiece ($25), family photos ($100+)<br/>
                Your personalized song: <strong><PriceDisplay usdAmount={category.price} /></strong> – infinite memories
              </p>
            </div>

            {/* Right Visual */}
            <div className="thanksgiving-visual">
              <div className="thanksgiving-scene">
                {/* Large Recipient Emoji with Glow */}
                <div className="recipient-display-t" key={selectedRecipient}>
                  <div className="recipient-emoji-t" style={{ color: current.color }}>
                    {current.emoji}
                  </div>
                  <div className="recipient-glow-t" style={{
                    boxShadow: `0 0 80px ${current.color}66, 0 0 120px ${current.color}44`
                  }}></div>
                </div>

                {/* Orbiting Thanksgiving Icons */}
                <div className="thanksgiving-orbit">
                  <div className="orbit-item-t orbit-1-t">🦃</div>
                  <div className="orbit-item-t orbit-2-t">🥧</div>
                  <div className="orbit-item-t orbit-3-t">🌽</div>
                  <div className="orbit-item-t orbit-4-t">🍞</div>
                </div>

                {/* Cornucopia */}
                <div className="cornucopia-t">🌾</div>

                {/* Floating Elements */}
                <div className="floating-elements-t">
                  <div className="float-item-t float-1-t">🍂</div>
                  <div className="float-item-t float-2-t">🍁</div>
                  <div className="float-item-t float-3-t">✨</div>
                  <div className="float-item-t float-4-t">💛</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .thanksgiving-hero-luxe {
            position: relative;
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fed7aa 100%);
            padding: 120px 0 50px;
            overflow: hidden;
            min-height: 80vh;
            display: flex;
            align-items: center;
          }

          /* Floating Leaves */
          .leaves-ambient {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          .leaf-float {
            position: absolute;
            animation: leaf-fall 15s ease-in-out infinite;
          }

          @keyframes leaf-fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.3;
            }
            90% {
              opacity: 0.3;
            }
            100% {
              transform: translateY(100vh) rotate(720deg) translateX(50px);
              opacity: 0;
            }
          }

          /* Bokeh */
          .bokeh-thanksgiving {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          .bokeh-t {
            position: absolute;
            border-radius: 50%;
            animation: bokeh-pulse-t 6s ease-in-out infinite;
          }

          @keyframes bokeh-pulse-t {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.2);
            }
          }

          /* Container */
          .container-thanksgiving {
            max-width: 1300px;
            margin: 0 auto;
            padding: 0 40px;
            position: relative;
            z-index: 2;
          }

          .thanksgiving-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            align-items: center;
          }

          /* Content */
          .thanksgiving-content {
            z-index: 3;
          }

          /* Social Proof */
          .thanksgiving-social-proof {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(234, 88, 12, 0.2);
            padding: 10px 20px;
            border-radius: 50px;
            margin-bottom: 20px;
            animation: fadeInUp 0.6s ease-out;
          }

          .proof-icon-t {
            font-size: 18px;
            animation: gentle-spin 20s linear infinite;
          }

          .proof-text-t {
            font-size: 14px;
            color: var(--brand-strong);
          }

          .proof-text-t strong {
            color: #ea580c;
            animation: number-pulse 2s ease-in-out infinite;
          }

          /* Urgency Badge */
          .thanksgiving-urgency {
            position: relative;
            display: inline-block;
            margin-bottom: 30px;
          }

          .urgency-inner-t {
            position: relative;
            background: linear-gradient(135deg, #ea580c, #dc2626);
            color: white;
            padding: 12px 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 15px rgba(234, 88, 12, 0.3);
            animation: wiggle 3s ease-in-out infinite;
            overflow: hidden;
          }

          .urgency-icon-t {
            font-size: 16px;
          }

          .urgency-text-t {
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.3px;
          }

          .urgency-shine-t {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: ribbon-shine 3s ease-in-out infinite;
          }

          .ribbon-tail-t {
            position: absolute;
            top: 100%;
            width: 0;
            height: 0;
            border-style: solid;
          }

          .ribbon-tail-left-t {
            left: 0;
            border-width: 8px 0 0 15px;
            border-color: #b91c1c transparent transparent transparent;
          }

          .ribbon-tail-right-t {
            right: 0;
            border-width: 8px 15px 0 0;
            border-color: #b91c1c transparent transparent transparent;
          }

          /* Recipient Pills */
          .thanksgiving-pills {
            margin-bottom: 30px;
          }

          .pills-label-t {
            font-size: 14px;
            color: var(--muted);
            margin-bottom: 12px;
            font-weight: 600;
          }

          .pills-container-t {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .pill-btn-t {
            background: rgba(255, 255, 255, 0.8);
            border: 2px solid rgba(234, 88, 12, 0.2);
            color: var(--brand-strong);
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: pill-pop 0.5s ease-out backwards;
          }

          .pill-btn-t:nth-child(2) { animation-delay: 0.1s; }
          .pill-btn-t:nth-child(3) { animation-delay: 0.2s; }
          .pill-btn-t:nth-child(4) { animation-delay: 0.3s; }
          .pill-btn-t:nth-child(5) { animation-delay: 0.4s; }

          .pill-btn-t:hover {
            border-color: #ea580c;
            background: rgba(255, 255, 255, 0.95);
            transform: translateY(-2px);
          }

          .pill-btn-t.active {
            background: linear-gradient(135deg, #ea580c, #dc2626);
            color: white;
            border-color: transparent;
            box-shadow: 0 4px 15px rgba(234, 88, 12, 0.3);
            animation: gentle-bounce 1s ease-in-out infinite;
          }

          /* Headline */
          .thanksgiving-headline {
            font-family: var(--font-serif);
            margin-bottom: 24px;
            display: flex;
            flex-direction: column;
          }

          .t-line-1 {
            font-size: clamp(1.2rem, 2vw, 1.4rem);
            color: #92400e;
            font-weight: 400;
            font-style: italic;
            margin-bottom: 6px;
            animation: text-fade-in 0.8s ease-out 0.3s backwards;
          }

          .t-line-2 {
            font-size: clamp(1.2rem, 2vw, 1.4rem);
            color: #92400e;
            font-weight: 400;
            font-style: italic;
            margin-bottom: 16px;
            animation: text-fade-in 0.8s ease-out 0.5s backwards;
          }

          .t-line-3 {
            font-size: clamp(2.2rem, 4vw, 3.2rem);
            color: var(--brand-strong);
            font-weight: 700;
            line-height: 1.2;
            animation: text-fade-in 0.8s ease-out 0.7s backwards;
          }

          /* Description */
          .thanksgiving-description {
            font-size: clamp(1rem, 1.8vw, 1.15rem);
            line-height: 1.7;
            color: var(--brand-soft);
            margin-bottom: 24px;
            animation: text-fade-in 0.8s ease-out 0.9s backwards;
          }

          .thanksgiving-description strong {
            color: #ea580c;
          }

          .sparkle-t {
            display: inline-block;
            animation: sparkle-rotate 2s linear infinite;
          }

          /* Features */
          .thanksgiving-features {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
            margin-bottom: 32px;
            font-size: 14px;
            color: var(--muted);
          }

          .feature-item-t {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .feature-icon-t {
            font-size: 16px;
          }

          .feature-divider-t {
            color: rgba(124, 132, 113, 0.3);
          }

          /* CTA */
          .thanksgiving-cta {
            margin-bottom: 24px;
          }

          .btn-thanksgiving-new {
            position: relative;
            display: inline-flex;
            align-items: center;
            background: linear-gradient(135deg, #ea580c, #dc2626);
            color: white;
            border: none;
            border-radius: 16px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 10px 35px rgba(234, 88, 12, 0.35);
            transition: all 0.4s ease;
            text-decoration: none;
            animation: cta-pulse-t 2s ease-in-out infinite;
          }

          @keyframes cta-pulse-t {
            0%, 100% {
              box-shadow: 0 10px 35px rgba(234, 88, 12, 0.35);
            }
            50% {
              box-shadow: 0 10px 40px rgba(234, 88, 12, 0.5);
            }
          }

          .btn-thanksgiving-new:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 45px rgba(234, 88, 12, 0.45);
          }

          .btn-bg-t {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .btn-thanksgiving-new:hover .btn-bg-t {
            opacity: 1;
          }

          .btn-content-t {
            position: relative;
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 18px 40px;
            z-index: 1;
          }

          .btn-text-t {
            font-size: clamp(1rem, 1.5vw, 1.2rem);
            font-weight: 700;
          }

          .btn-price-t {
            background: rgba(255, 255, 255, 0.25);
            padding: 6px 16px;
            border-radius: 50px;
            font-weight: 700;
            animation: price-shimmer-t 2s ease-in-out infinite;
          }

          @keyframes price-shimmer-t {
            0%, 100% {
              background: rgba(255, 255, 255, 0.25);
            }
            50% {
              background: rgba(255, 255, 255, 0.4);
            }
          }

          .btn-shine-t {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.6s ease;
          }

          .btn-thanksgiving-new:hover .btn-shine-t {
            left: 100%;
          }

          .cta-subtitle-t {
            margin-top: 12px;
            font-size: 13px;
            color: var(--muted);
            text-align: center;
          }

          /* Trust Badges */
          .thanksgiving-trust {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 32px;
          }

          .trust-item-t {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--muted);
            animation: slide-in-right 0.6s ease-out backwards;
          }

          .trust-item-t:nth-child(1) { animation-delay: 1.1s; }
          .trust-item-t:nth-child(2) { animation-delay: 1.2s; }
          .trust-item-t:nth-child(3) { animation-delay: 1.3s; }

          /* Testimonial */
          .thanksgiving-testimonial {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(234, 88, 12, 0.15);
            padding: 24px;
            border-radius: 16px;
            margin-bottom: 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            animation: card-float 4s ease-in-out infinite;
            transition: all 0.3s ease;
          }

          .thanksgiving-testimonial:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }

          .testimonial-stars-t {
            color: #f59e0b;
            font-size: 18px;
            margin-bottom: 12px;
            animation: stars-twinkle 2s ease-in-out infinite;
          }

          .testimonial-text-t {
            font-size: 14px;
            line-height: 1.6;
            color: var(--brand-soft);
            margin-bottom: 16px;
            font-style: italic;
          }

          .testimonial-author-t {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .author-avatar-t {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ea580c, #dc2626);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.2);
            animation: avatar-glow-t 2s ease-in-out infinite;
          }

          @keyframes avatar-glow-t {
            0%, 100% {
              box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.2);
            }
            50% {
              box-shadow: 0 0 15px rgba(234, 88, 12, 0.4);
            }
          }

          .author-details-t {
            flex: 1;
          }

          .author-name-t {
            font-weight: 700;
            font-size: 14px;
            color: var(--brand-strong);
          }

          .author-badge-t {
            font-size: 12px;
            color: #22c55e;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          /* Price Note */
          .thanksgiving-price-note {
            font-size: 13px;
            line-height: 1.6;
            color: var(--muted);
            animation: gentle-pulse 2s ease-in-out infinite;
          }

          .thanksgiving-price-note strong {
            color: #ea580c;
            font-weight: 700;
          }

          /* Visual Scene */
          .thanksgiving-visual {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .thanksgiving-scene {
            position: relative;
            width: 100%;
            max-width: 500px;
            aspect-ratio: 1;
            animation: scene-float 6s ease-in-out infinite;
          }

          /* Recipient Display */
          .recipient-display-t {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            animation: recipient-appear 0.6s ease-out;
          }

          .recipient-emoji-t {
            font-size: clamp(5rem, 10vw, 8rem);
            animation: emoji-bounce 3s ease-in-out infinite;
            filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
          }

          .recipient-glow-t {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            border-radius: 50%;
            animation: glow-pulse 3s ease-in-out infinite;
            pointer-events: none;
            z-index: -1;
          }

          /* Orbiting Icons */
          .thanksgiving-orbit {
            position: absolute;
            inset: 0;
            animation: orbit-spin 20s linear infinite;
          }

          @keyframes orbit-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .orbit-item-t {
            position: absolute;
            font-size: 2.5rem;
            animation: orbit-float 3s ease-in-out infinite;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
          }

          .orbit-1-t {
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 0s;
          }

          .orbit-2-t {
            top: 50%;
            right: 10%;
            transform: translateY(-50%);
            animation-delay: 0.75s;
          }

          .orbit-3-t {
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 1.5s;
          }

          .orbit-4-t {
            top: 50%;
            left: 10%;
            transform: translateY(-50%);
            animation-delay: 2.25s;
          }

          @keyframes orbit-float {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-15px) scale(1.1);
            }
          }

          /* Cornucopia */
          .cornucopia-t {
            position: absolute;
            bottom: 15%;
            right: 15%;
            font-size: 3rem;
            animation: cornucopia-wiggle 4s ease-in-out infinite;
            filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
          }

          @keyframes cornucopia-wiggle {
            0%, 100% {
              transform: rotate(-5deg);
            }
            50% {
              transform: rotate(5deg);
            }
          }

          /* Floating Elements */
          .floating-elements-t {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .float-item-t {
            position: absolute;
            font-size: 2rem;
            animation: float-drift 6s ease-in-out infinite;
          }

          .float-1-t {
            top: 15%;
            left: 10%;
            animation-delay: 0s;
          }

          .float-2-t {
            top: 20%;
            right: 15%;
            animation-delay: 1.5s;
          }

          .float-3-t {
            bottom: 20%;
            left: 15%;
            animation-delay: 3s;
          }

          .float-4-t {
            bottom: 15%;
            right: 20%;
            animation-delay: 4.5s;
          }

          @keyframes float-drift {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.5;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 0.8;
            }
          }

          /* Responsive */
          @media (max-width: 1024px) {
            .thanksgiving-layout {
              gap: 40px;
            }

            .thanksgiving-visual {
              max-height: 400px;
            }

            .thanksgiving-scene {
              max-width: 400px;
            }

            .thanksgiving-description {
              font-size: 1rem;
            }

            .thanksgiving-pills {
              margin-bottom: 24px;
            }

            .thanksgiving-trust {
              flex-direction: column;
              gap: 12px;
            }
          }

          @media (max-width: 768px) {
            .thanksgiving-hero-luxe {
              padding: 80px 0 50px;
            }

            .container-thanksgiving {
              padding: 0 20px;
            }

            .thanksgiving-layout {
              grid-template-columns: 1fr;
              gap: 40px;
            }

            .thanksgiving-urgency {
              margin-bottom: 24px;
            }

            .urgency-text-t {
              font-size: 12px;
            }

            .thanksgiving-visual {
              order: -1;
              max-height: 300px;
            }

            .thanksgiving-scene {
              max-width: 300px;
            }

            .recipient-emoji-t {
              font-size: 5rem;
            }

            .orbit-item-t {
              font-size: 1.8rem;
            }

            .cornucopia-t {
              font-size: 2rem;
            }

            .btn-content-t {
              flex-direction: column;
              gap: 8px;
              padding: 16px 32px;
            }

            .btn-text-t {
              font-size: 1rem;
            }

            .btn-price-t {
              font-size: 0.9rem;
            }

            .thanksgiving-social-proof {
              font-size: 12px;
              padding: 8px 16px;
            }

            .thanksgiving-pills {
              margin-bottom: 20px;
            }

            .pills-container-t {
              gap: 8px;
            }

            .pill-btn-t {
              font-size: 12px;
              padding: 8px 16px;
            }

            .thanksgiving-testimonial {
              padding: 20px;
            }

            .testimonial-text-t {
              font-size: 13px;
            }

            .thanksgiving-trust {
              flex-direction: column;
              gap: 8px;
            }
          }
        `}</style>
      </section>
    );
  }

  // New Year Goals - Motivational & Fresh Start
  if (category.slug === 'new-year') {
    const newYearRecipients = {
      myself: {
        headline: "This Is Your Year to Shine",
        pronoun: 'your',
        emoji: '🎯',
        color: '#7c3aed',
        label: '🎯 Myself'
      },
      partner: {
        headline: "Watch Your Partner Achieve Their Dreams",
        pronoun: 'their',
        emoji: '💑',
        color: '#db2777',
        label: '💑 Partner'
      },
      friend: {
        headline: "Watch Your Friend Achieve Their Dreams",
        pronoun: 'their',
        emoji: '🤝',
        color: '#0891b2',
        label: '🤝 Friend'
      },
      family: {
        headline: "Watch Your Family Achieve Their Dreams",
        pronoun: 'their',
        emoji: '👨‍👩‍👧‍👦',
        color: '#059669',
        label: '👨‍👩‍👧‍👦 Family'
      },
      team: {
        headline: "Watch Your Team Achieve Their Dreams",
        pronoun: 'their',
        emoji: '👥',
        color: '#f59e0b',
        label: '👥 Team'
      }
    };

    const current = newYearRecipients[selectedRecipient as keyof typeof newYearRecipients];

    return (
      <section className="newyear-hero-luxe">
        {/* Firework bursts */}
        <div className="fireworks-ambient">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="firework-burst" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.2
            }} suppressHydrationWarning>
              {['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>

        {/* Bokeh background */}
        <div className="bokeh-newyear">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="bokeh-ny" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${60 + Math.random() * 90}px`,
              height: `${60 + Math.random() * 90}px`,
              animationDelay: `${Math.random() * 4}s`,
              background: [
                'radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent)',
                'radial-gradient(circle, rgba(219, 39, 119, 0.12), transparent)',
                'radial-gradient(circle, rgba(245, 158, 11, 0.1), transparent)',
                'radial-gradient(circle, rgba(8, 145, 178, 0.08), transparent)'
              ][Math.floor(Math.random() * 4)]
            }}></div>
          ))}
        </div>

        <div className="container-newyear">
          <div className="newyear-layout">
            {/* Left Content */}
            <div className="newyear-content">
              {/* Social Proof */}
              <div className="newyear-social-proof">
                <span className="proof-icon-ny">🎯</span>
                <span className="proof-text-ny"><strong>4,891 people</strong> started their year strong with a personalized resolution anthem</span>
              </div>

              {/* Urgency Badge */}
              <div className="newyear-urgency">
                <div className="urgency-inner-ny">
                  <span className="urgency-icon-ny">⚡</span>
                  <span className="urgency-text-ny">January Special • Start Fresh Today</span>
                  <span className="urgency-shine-ny"></span>
                </div>
                <div className="ribbon-tail-ny ribbon-tail-left-ny"></div>
                <div className="ribbon-tail-ny ribbon-tail-right-ny"></div>
              </div>

              {/* Recipient Selector */}
              <div className="newyear-pills">
                <div className="pills-label-ny">🎵 Who's making this their year?</div>
                <div className="pills-container-ny">
                  {(Object.keys(newYearRecipients) as Array<keyof typeof newYearRecipients>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedRecipient(key)}
                      className={`pill-btn-ny ${selectedRecipient === key ? 'active' : ''}`}
                    >
                      {newYearRecipients[key].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Headline */}
              <h1 className="newyear-headline" key={selectedRecipient}>
                <span className="ny-line-1">365 days of possibility.</span>
                <span className="ny-line-2">One powerful anthem.</span>
                <span className="ny-line-3">{current.headline}</span>
              </h1>

              {/* Description */}
              <p className="newyear-description">
                Make this year different with a <strong>personalized resolution song</strong> that keeps you motivated every single day.
                Imagine hearing {current.pronoun} goals set to music—an anthem that plays on repeat until those dreams become reality.
                <span className="sparkle-ny">✨</span>
              </p>

              {/* Features */}
              <div className="newyear-features">
                <span className="feature-item-ny"><span className="feature-icon-ny">🎯</span> Custom goal-focused lyrics</span>
                <span className="feature-divider-ny">•</span>
                <span className="feature-item-ny"><span className="feature-icon-ny">🎶</span> Motivational melody</span>
                <span className="feature-divider-ny">•</span>
                <span className="feature-item-ny"><span className="feature-icon-ny">⚡</span> Instant download</span>
              </div>

              {/* CTA Button */}
              <div className="newyear-cta">
                <a href={`/${category.slug}`} className="btn-newyear-new">
                  <div className="btn-bg-ny"></div>
                  <div className="btn-content-ny">
                    <span className="btn-text-ny">Create My Resolution Anthem</span>
                    <span className="btn-price-ny"><PriceDisplay usdAmount={category.price} /></span>
                  </div>
                  <div className="btn-shine-ny"></div>
                </a>
                <p className="cta-subtitle-ny">🔒 Secure checkout • Instant delivery</p>
              </div>

              {/* Trust Badges */}
              <div className="newyear-trust">
                <div className="trust-item-ny">⭐⭐⭐⭐⭐ 4.9/5</div>
                <div className="trust-item-ny">🎵 18,423 songs created</div>
                <div className="trust-item-ny">💪 94% goal completion rate</div>
              </div>

              {/* Testimonial Card */}
              <div className="newyear-testimonial">
                <div className="testimonial-stars-ny">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text-ny">"I listen to my New Year song every morning. It's like a personal trainer, therapist, and best friend all in one. I've already achieved 3 of my 5 goals!"</p>
                <div className="testimonial-author-ny">
                  <div className="author-avatar-ny">R</div>
                  <div className="author-details-ny">
                    <div className="author-name-ny">Rachel M.</div>
                    <div className="author-badge-ny">✓ Verified Purchase</div>
                  </div>
                </div>
              </div>

              {/* Price Comparison */}
              <p className="newyear-price-note">
                💰 Compare: Gym membership ($50/mo), life coach ($200/session), vision board kit ($30)<br/>
                Your personalized anthem: <strong><PriceDisplay usdAmount={category.price} /></strong> – motivation for life
              </p>
            </div>

            {/* Right Visual */}
            <div className="newyear-visual">
              <div className="newyear-scene">
                {/* Large Recipient Emoji with Glow */}
                <div className="recipient-display-ny" key={selectedRecipient}>
                  <div className="recipient-emoji-ny" style={{ color: current.color }}>
                    {current.emoji}
                  </div>
                  <div className="recipient-glow-ny" style={{
                    boxShadow: `0 0 80px ${current.color}66, 0 0 120px ${current.color}44`
                  }}></div>
                </div>

                {/* Orbiting New Year Icons */}
                <div className="newyear-orbit">
                  <div className="orbit-item-ny orbit-1-ny">🎊</div>
                  <div className="orbit-item-ny orbit-2-ny">🎯</div>
                  <div className="orbit-item-ny orbit-3-ny">💪</div>
                  <div className="orbit-item-ny orbit-4-ny">🚀</div>
                </div>

                {/* Shooting Stars */}
                <div className="shooting-stars-ny">
                  <div className="star-shoot star-1-ny">💫</div>
                  <div className="star-shoot star-2-ny">⭐</div>
                  <div className="star-shoot star-3-ny">✨</div>
                </div>

                {/* Floating Elements */}
                <div className="floating-elements-ny">
                  <div className="float-item-ny float-1-ny">🌟</div>
                  <div className="float-item-ny float-2-ny">✨</div>
                  <div className="float-item-ny float-3-ny">💫</div>
                  <div className="float-item-ny float-4-ny">⚡</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .newyear-hero-luxe {
            position: relative;
            background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);
            padding: 120px 0 50px;
            overflow: hidden;
            min-height: 80vh;
            display: flex;
            align-items: center;
          }

          /* Firework Bursts */
          .fireworks-ambient {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          .firework-burst {
            position: absolute;
            font-size: 2rem;
            animation: firework-explode 3s ease-out infinite;
          }

          @keyframes firework-explode {
            0% {
              transform: scale(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              transform: scale(1.5) rotate(180deg);
              opacity: 0.8;
            }
            100% {
              transform: scale(2) rotate(360deg);
              opacity: 0;
            }
          }

          /* Bokeh */
          .bokeh-newyear {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          .bokeh-ny {
            position: absolute;
            border-radius: 50%;
            animation: bokeh-pulse-ny 5s ease-in-out infinite;
          }

          @keyframes bokeh-pulse-ny {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.3);
            }
          }

          /* Container */
          .container-newyear {
            max-width: 1300px;
            margin: 0 auto;
            padding: 0 40px;
            position: relative;
            z-index: 2;
          }

          .newyear-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            align-items: center;
          }

          /* Content */
          .newyear-content {
            z-index: 3;
          }

          /* Social Proof */
          .newyear-social-proof {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(124, 58, 237, 0.3);
            padding: 10px 20px;
            border-radius: 50px;
            margin-bottom: 20px;
            animation: fadeInUp 0.6s ease-out;
          }

          .proof-icon-ny {
            font-size: 18px;
            animation: gentle-spin 20s linear infinite;
          }

          .proof-text-ny {
            font-size: 14px;
            color: white;
          }

          .proof-text-ny strong {
            color: #fbbf24;
            animation: number-pulse 2s ease-in-out infinite;
          }

          /* Urgency Badge */
          .newyear-urgency {
            position: relative;
            display: inline-block;
            margin-bottom: 30px;
          }

          .urgency-inner-ny {
            position: relative;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            color: white;
            padding: 12px 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
            animation: wiggle 3s ease-in-out infinite;
            overflow: hidden;
          }

          .urgency-icon-ny {
            font-size: 16px;
          }

          .urgency-text-ny {
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.3px;
          }

          .urgency-shine-ny {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: ribbon-shine 3s ease-in-out infinite;
          }

          .ribbon-tail-ny {
            position: absolute;
            top: 100%;
            width: 0;
            height: 0;
            border-style: solid;
          }

          .ribbon-tail-left-ny {
            left: 0;
            border-width: 8px 0 0 15px;
            border-color: #6d28d9 transparent transparent transparent;
          }

          .ribbon-tail-right-ny {
            right: 0;
            border-width: 8px 15px 0 0;
            border-color: #6d28d9 transparent transparent transparent;
          }

          /* Recipient Pills */
          .newyear-pills {
            margin-bottom: 30px;
          }

          .pills-label-ny {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 12px;
            font-weight: 600;
          }

          .pills-container-ny {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .pill-btn-ny {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(124, 58, 237, 0.3);
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: pill-pop 0.5s ease-out backwards;
          }

          .pill-btn-ny:nth-child(2) { animation-delay: 0.1s; }
          .pill-btn-ny:nth-child(3) { animation-delay: 0.2s; }
          .pill-btn-ny:nth-child(4) { animation-delay: 0.3s; }
          .pill-btn-ny:nth-child(5) { animation-delay: 0.4s; }

          .pill-btn-ny:hover {
            border-color: #7c3aed;
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
          }

          .pill-btn-ny.active {
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            color: white;
            border-color: transparent;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
            animation: gentle-bounce 1s ease-in-out infinite;
          }

          /* Headline */
          .newyear-headline {
            font-family: var(--font-serif);
            margin-bottom: 24px;
            display: flex;
            flex-direction: column;
          }

          .ny-line-1 {
            font-size: clamp(1.2rem, 2vw, 1.4rem);
            color: #fbbf24;
            font-weight: 400;
            font-style: italic;
            margin-bottom: 6px;
            animation: text-fade-in 0.8s ease-out 0.3s backwards;
          }

          .ny-line-2 {
            font-size: clamp(1.2rem, 2vw, 1.4rem);
            color: #fbbf24;
            font-weight: 400;
            font-style: italic;
            margin-bottom: 16px;
            animation: text-fade-in 0.8s ease-out 0.5s backwards;
          }

          .ny-line-3 {
            font-size: clamp(2.2rem, 4vw, 3.2rem);
            color: white;
            font-weight: 700;
            line-height: 1.2;
            animation: text-fade-in 0.8s ease-out 0.7s backwards;
          }

          /* Description */
          .newyear-description {
            font-size: clamp(1rem, 1.8vw, 1.15rem);
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 24px;
            animation: text-fade-in 0.8s ease-out 0.9s backwards;
          }

          .newyear-description strong {
            color: #fbbf24;
          }

          .sparkle-ny {
            display: inline-block;
            animation: sparkle-rotate 2s linear infinite;
          }

          /* Features */
          .newyear-features {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
            margin-bottom: 32px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
          }

          .feature-item-ny {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .feature-icon-ny {
            font-size: 16px;
          }

          .feature-divider-ny {
            color: rgba(255, 255, 255, 0.3);
          }

          /* CTA */
          .newyear-cta {
            margin-bottom: 24px;
          }

          .btn-newyear-new {
            position: relative;
            display: inline-flex;
            align-items: center;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            color: white;
            border: none;
            border-radius: 16px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 10px 35px rgba(124, 58, 237, 0.4);
            transition: all 0.4s ease;
            text-decoration: none;
            animation: cta-pulse-ny 2s ease-in-out infinite;
          }

          @keyframes cta-pulse-ny {
            0%, 100% {
              box-shadow: 0 10px 35px rgba(124, 58, 237, 0.4);
            }
            50% {
              box-shadow: 0 10px 40px rgba(124, 58, 237, 0.6);
            }
          }

          .btn-newyear-new:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 45px rgba(124, 58, 237, 0.5);
          }

          .btn-bg-ny {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #6d28d9, #7c3aed);
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .btn-newyear-new:hover .btn-bg-ny {
            opacity: 1;
          }

          .btn-content-ny {
            position: relative;
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 18px 40px;
            z-index: 1;
          }

          .btn-text-ny {
            font-size: clamp(1rem, 1.5vw, 1.2rem);
            font-weight: 700;
          }

          .btn-price-ny {
            background: rgba(255, 255, 255, 0.25);
            padding: 6px 16px;
            border-radius: 50px;
            font-weight: 700;
            animation: price-shimmer-ny 2s ease-in-out infinite;
          }

          @keyframes price-shimmer-ny {
            0%, 100% {
              background: rgba(255, 255, 255, 0.25);
            }
            50% {
              background: rgba(255, 255, 255, 0.4);
            }
          }

          .btn-shine-ny {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.6s ease;
          }

          .btn-newyear-new:hover .btn-shine-ny {
            left: 100%;
          }

          .cta-subtitle-ny {
            margin-top: 12px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
          }

          /* Trust Badges */
          .newyear-trust {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 32px;
          }

          .trust-item-ny {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.8);
            animation: slide-in-right 0.6s ease-out backwards;
          }

          .trust-item-ny:nth-child(1) { animation-delay: 1.1s; }
          .trust-item-ny:nth-child(2) { animation-delay: 1.2s; }
          .trust-item-ny:nth-child(3) { animation-delay: 1.3s; }

          /* Testimonial */
          .newyear-testimonial {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(124, 58, 237, 0.3);
            padding: 24px;
            border-radius: 16px;
            margin-bottom: 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            animation: card-float 4s ease-in-out infinite;
            transition: all 0.3s ease;
          }

          .newyear-testimonial:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          }

          .testimonial-stars-ny {
            color: #fbbf24;
            font-size: 18px;
            margin-bottom: 12px;
            animation: stars-twinkle 2s ease-in-out infinite;
          }

          .testimonial-text-ny {
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 16px;
            font-style: italic;
          }

          .testimonial-author-ny {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .author-avatar-ny {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.3);
            animation: avatar-glow-ny 2s ease-in-out infinite;
          }

          @keyframes avatar-glow-ny {
            0%, 100% {
              box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.3);
            }
            50% {
              box-shadow: 0 0 15px rgba(124, 58, 237, 0.5);
            }
          }

          .author-details-ny {
            flex: 1;
          }

          .author-name-ny {
            font-weight: 700;
            font-size: 14px;
            color: white;
          }

          .author-badge-ny {
            font-size: 12px;
            color: #22c55e;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          /* Price Note */
          .newyear-price-note {
            font-size: 13px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.7);
            animation: gentle-pulse 2s ease-in-out infinite;
          }

          .newyear-price-note strong {
            color: #fbbf24;
            font-weight: 700;
          }

          /* Visual Scene */
          .newyear-visual {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .newyear-scene {
            position: relative;
            width: 100%;
            max-width: 500px;
            aspect-ratio: 1;
            animation: scene-float 6s ease-in-out infinite;
          }

          /* Recipient Display */
          .recipient-display-ny {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            animation: recipient-appear 0.6s ease-out;
          }

          .recipient-emoji-ny {
            font-size: clamp(5rem, 10vw, 8rem);
            animation: emoji-bounce 3s ease-in-out infinite;
            filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
          }

          .recipient-glow-ny {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            border-radius: 50%;
            animation: glow-pulse 3s ease-in-out infinite;
            pointer-events: none;
            z-index: -1;
          }

          /* Orbiting Icons */
          .newyear-orbit {
            position: absolute;
            inset: 0;
            animation: orbit-spin 25s linear infinite;
          }

          .orbit-item-ny {
            position: absolute;
            font-size: 2.5rem;
            animation: orbit-float 3s ease-in-out infinite;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          }

          .orbit-1-ny {
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 0s;
          }

          .orbit-2-ny {
            top: 50%;
            right: 10%;
            transform: translateY(-50%);
            animation-delay: 0.75s;
          }

          .orbit-3-ny {
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 1.5s;
          }

          .orbit-4-ny {
            top: 50%;
            left: 10%;
            transform: translateY(-50%);
            animation-delay: 2.25s;
          }

          /* Shooting Stars */
          .shooting-stars-ny {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .star-shoot {
            position: absolute;
            font-size: 1.5rem;
            animation: shoot-across 3s ease-in-out infinite;
          }

          .star-1-ny {
            top: 20%;
            left: 0;
            animation-delay: 0s;
          }

          .star-2-ny {
            top: 50%;
            left: 0;
            animation-delay: 1s;
          }

          .star-3-ny {
            top: 70%;
            left: 0;
            animation-delay: 2s;
          }

          @keyframes shoot-across {
            0% {
              transform: translateX(0) translateY(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 0.8;
            }
            100% {
              transform: translateX(120%) translateY(-30%);
              opacity: 0;
            }
          }

          /* Floating Elements */
          .floating-elements-ny {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .float-item-ny {
            position: absolute;
            font-size: 2rem;
            animation: float-drift 6s ease-in-out infinite;
          }

          .float-1-ny {
            top: 15%;
            left: 10%;
            animation-delay: 0s;
          }

          .float-2-ny {
            top: 20%;
            right: 15%;
            animation-delay: 1.5s;
          }

          .float-3-ny {
            bottom: 20%;
            left: 15%;
            animation-delay: 3s;
          }

          .float-4-ny {
            bottom: 15%;
            right: 20%;
            animation-delay: 4.5s;
          }

          /* Responsive */
          @media (max-width: 1024px) {
            .newyear-layout {
              gap: 40px;
            }

            .newyear-visual {
              max-height: 400px;
            }

            .newyear-scene {
              max-width: 400px;
            }

            .newyear-description {
              font-size: 1rem;
            }

            .newyear-pills {
              margin-bottom: 24px;
            }

            .newyear-trust {
              flex-direction: column;
              gap: 12px;
            }
          }

          @media (max-width: 768px) {
            .newyear-hero-luxe {
              padding: 80px 0 50px;
            }

            .container-newyear {
              padding: 0 20px;
            }

            .newyear-layout {
              grid-template-columns: 1fr;
              gap: 40px;
            }

            .newyear-urgency {
              margin-bottom: 24px;
            }

            .urgency-text-ny {
              font-size: 12px;
            }

            .newyear-visual {
              order: -1;
              max-height: 300px;
            }

            .newyear-scene {
              max-width: 300px;
            }

            .recipient-emoji-ny {
              font-size: 5rem;
            }

            .orbit-item-ny {
              font-size: 1.8rem;
            }

            .btn-content-ny {
              flex-direction: column;
              gap: 8px;
              padding: 16px 32px;
            }

            .btn-text-ny {
              font-size: 1rem;
            }

            .btn-price-ny {
              font-size: 0.9rem;
            }

            .newyear-social-proof {
              font-size: 12px;
              padding: 8px 16px;
            }

            .newyear-pills {
              margin-bottom: 20px;
            }

            .pills-container-ny {
              gap: 8px;
            }

            .pill-btn-ny {
              font-size: 12px;
              padding: 8px 16px;
            }

            .newyear-testimonial {
              padding: 20px;
            }

            .testimonial-text-ny {
              font-size: 13px;
            }

            .newyear-trust {
              flex-direction: column;
              gap: 8px;
            }
          }
        `}</style>
      </section>
    );
  }

  // Default fallback
  return (
    <section className="seasonal-hero-default">
      <div className="container">
        <div className="hero-content">
          <div className="hero-icon">{category.icon}</div>
          <h1 className="hero-headline">{category.headline}</h1>
          <p className="hero-subheadline">{category.subheadline}</p>
          <div className="hero-cta">
            <a href={`/${category.slug}`} className="btn-hero">
              Create {category.name} – <PriceDisplay usdAmount={category.price} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .seasonal-hero-default {
          background: linear-gradient(135deg, var(--moss), var(--sage));
          padding: 100px 0 80px;
          text-align: center;
          color: white;
        }

        .hero-icon {
          font-size: 5rem;
          margin-bottom: 24px;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .hero-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          margin-bottom: 16px;
        }

        .hero-subheadline {
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn-hero {
          display: inline-block;
          background: white;
          color: var(--moss);
          padding: 18px 40px;
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 16px;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .btn-hero:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 768px) {
          .seasonal-hero-default {
            padding: 60px 0;
          }

          .hero-icon {
            font-size: 4rem;
          }
        }
      `}</style>
    </section>
  );
}
