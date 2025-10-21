"use client";
import { useEffect, lazy, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Consent } from '@/components/Consent';
import { Pricing } from '@/components/Pricing';
import { SocialProof } from '@/components/SocialProof';
import { Hero } from '@/components/Hero';
import { SeasonalHero } from '@/components/SeasonalHero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { SeasonalSpotlight } from '@/components/SeasonalSpotlight';
import Seo from '@/components/Seo';
import { PriceDisplay } from '@/components/PriceDisplay';
import {
  getHeroSeasonalCategory,
  getSecondarySeasonalCategories,
  getEvergreenCategories
} from '@/lib/categories';

// Lazy load heavy components for better performance
const Testimonials = lazy(() => import('@/components/Testimonials').then(module => ({ default: module.Testimonials })));

interface SiteConfig {
  checkout?: { subscription?: string; onetime?: string };
  supportEmail?: string;
  siteUrl?: string;
}

declare global {
  interface Window {
    __siteConfig?: SiteConfig;
  }
}

export default function HomePage(){
  // Get seasonal categories
  const heroCategory = getHeroSeasonalCategory();
  const secondarySeasonals = getSecondarySeasonalCategories();
  const evergreenCategories = getEvergreenCategories();

  useEffect(()=>{ // load config and set globals, checkout links
    // Set seasonal theme based on active hero category (client-side only to avoid hydration mismatch)
    if (typeof window !== 'undefined') {
      if (heroCategory) {
        document.documentElement.setAttribute('data-season', heroCategory.slug);
      } else {
        document.documentElement.removeAttribute('data-season');
      }
    }

    fetch('/config.json').then(r=>r.json()).then((cfg: SiteConfig)=>{
      window.__siteConfig = cfg;
      document.querySelectorAll('[data-checkout="subscription"]').forEach(a=>{ if (cfg.checkout?.subscription) (a as HTMLAnchorElement).href = cfg.checkout.subscription; });
      document.querySelectorAll('[data-checkout="onetime"]').forEach(a=>{ if (cfg.checkout?.onetime) (a as HTMLAnchorElement).href = cfg.checkout.onetime; });
      const support = document.getElementById('support-link') as HTMLAnchorElement | null;
      if (support && cfg.supportEmail) support.href = `mailto:${cfg.supportEmail}`;
      // Canonical + OG URL
      if (cfg.siteUrl) {
        const url = new URL('/' , cfg.siteUrl).toString();
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
        link.href = url;
        let og = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
        if (!og) { og = document.createElement('meta'); og.setAttribute('property','og:url'); document.head.appendChild(og); }
        og.setAttribute('content', url);
      }
    }).catch(()=>{});
    // FAQ accordion behavior
    const faqGrid = document.getElementById('faq-acc');
    const clickHandler = (e: Event)=>{
      const target = e.target as HTMLElement;
      const btn = target.closest('.faq-question') as HTMLElement | null;
      if (!btn) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const faqItem = btn.closest('.faq-item') as HTMLElement | null;

      // Close all other FAQ items
      faqGrid?.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(x=>{
        x.setAttribute('aria-expanded','false');
        const item = x.closest('.faq-item') as HTMLElement | null;
        if (item) item.classList.remove('active');
      });

      // Toggle current item
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        faqItem?.classList.add('active');
      }
    };
    faqGrid?.addEventListener('click', clickHandler);
    return ()=>{ faqGrid?.removeEventListener('click', clickHandler); };
  },[heroCategory]);

  return (
    <>
      <Seo />
      <Navbar />
      <SocialProof />

      {/* Conditional Seasonal Hero Banner or Default Hero */}
      {heroCategory ? <SeasonalHero category={heroCategory} /> : <Hero />}

      <main>
        {/* Section 1: Main Category Grid (Always Visible) */}
        <CategoryGrid categories={evergreenCategories} />

        {/* Section 2: Seasonal Spotlight (Conditional) */}
        {secondarySeasonals.length > 0 && (
          <SeasonalSpotlight categories={secondarySeasonals} />
        )}

        {/* Section 3: Social Proof Banner */}
        <section className="social-proof-banner">
          <div className="container">
            <div className="proof-stats">
              <div className="stat-item">
                <div className="stat-number">12,847+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">4.9/5</div>
                <div className="stat-label">Average Rating</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">Songs Created</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: How It Works (3 Steps) */}
        <section id="how" className="section how-it-works">
          <div className="container">
            <div className="section-header-natural">
              <span className="eyebrow">Simple Process</span>
              <h2 className="title-handwritten">Three steps to your song</h2>
              <p className="subtitle-natural">
                No hassle. No waiting. Just pure musical magic.
              </p>
            </div>

            <div className="journey-path">
              <div className="path-line"></div>

              <div className="journey-step">
                <div className="step-marker">
                  <span className="marker-icon">🎯</span>
                  <div className="marker-pulse"></div>
                </div>
                <div className="step-info">
                  <span className="step-label">Step 1</span>
                  <h3>Choose a Vibe</h3>
                  <p>Birthday? Love? Motivation? Pick the category that fits your moment.</p>
                </div>
              </div>

              <div className="journey-step">
                <div className="step-marker">
                  <span className="marker-icon">✨</span>
                  <div className="marker-pulse"></div>
                </div>
                <div className="step-info">
                  <span className="step-label">Step 2</span>
                  <h3>Add the Name</h3>
                  <p>Type any name. We weave it beautifully into the lyrics.</p>
                </div>
              </div>

              <div className="journey-step">
                <div className="step-marker">
                  <span className="marker-icon">🎵</span>
                  <div className="marker-pulse"></div>
                </div>
                <div className="step-info">
                  <span className="step-label">Step 3</span>
                  <h3>Receive & Share</h3>
                  <p>Get your high-quality MP3 in minutes. Yours to keep forever.</p>
                </div>
              </div>
            </div>

            <div className="process-cta">
              <a href="#create" className="btn-natural-primary">
                Start Creating
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <span className="cta-note">Takes less than 2 minutes</span>
            </div>
          </div>
        </section>

        {/* Section 5: Benefits / Why Choose Us */}
        <section className="benefits-section">
          <div className="container">
            <div className="benefits-intro">
              <span className="eyebrow">Why Choose Us</span>
              <h2 className="title-handwritten">What makes this special</h2>
              <p className="subtitle-natural">Real music. Real emotion. Real memories.</p>
            </div>

            <div className="benefits-showcase-natural">
              <div className="feature-highlight">
                <div className="highlight-content">
                  <span className="highlight-badge">Most Popular</span>
                  <h3>Gifts that last forever</h3>
                  <p>Forget boring gift cards. A personalized song with their name becomes a cherished memory they'll treasure for life.</p>
                  <div className="highlight-proof">
                    <div className="proof-stat">
                      <span className="stat-big">94%</span>
                      <span>would gift again</span>
                    </div>
                    <div className="proof-testimonial">
                      "Better than any birthday card"
                    </div>
                  </div>
                </div>
                <div className="highlight-visual">
                  <div className="visual-circle circle-1"></div>
                  <div className="visual-circle circle-2"></div>
                  <div className="visual-circle circle-3"></div>
                </div>
              </div>

              <div className="features-grid-natural">
                <div className="feature-card-natural">
                  <div className="feature-icon-natural">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18V5l12-2v13M9 18l-7 2V7l7-2M9 18l7-2"/>
                      <circle cx="6" cy="18" r="2"/>
                      <circle cx="18" cy="16" r="2"/>
                    </svg>
                  </div>
                  <h4>Studio Quality</h4>
                  <p>Real instruments, professional vocals, custom-crafted lyrics that flow naturally.</p>
                </div>

                <div className="feature-card-natural">
                  <div className="feature-icon-natural">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <h4>Instant Delivery</h4>
                  <p>In your inbox within minutes. Perfect for those "oh no, I forgot!" moments.</p>
                </div>

                <div className="feature-card-natural">
                  <div className="feature-icon-natural">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </div>
                  <h4>Keep Forever</h4>
                  <p>Download, share, replay. No subscriptions, no expiration dates.</p>
                </div>

                <div className="feature-card-natural">
                  <div className="feature-icon-natural">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <h4>Secure & Private</h4>
                  <p>Stripe checkout. Zero spam. Your data stays yours.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Pricing Comparison */}
        <Pricing />

        {/* Section 7: Testimonials */}
        <Suspense fallback={<div className="section" style={{minHeight: '300px'}}></div>}>
          <Testimonials />
        </Suspense>

        {/* Section 8: Urgency CTA */}
        <section className="urgency-cta-natural">
          <div className="container">
            <div className="cta-card-natural">
              <div className="cta-background-pattern"></div>

              <div className="cta-content-natural">
                <span className="cta-eyebrow">12,847+ Songs Created</span>
                <h2>Ready to create yours?</h2>
                <p>
                  <PriceDisplay usdAmount={7.99} />. Two minutes. One unforgettable song.<br/>
                  For your mom, your partner, your friend—or yourself.
                </p>

                <div className="cta-actions">
                  <a href="#create" className="btn-natural-cta">
                    Create Your Song
                    <span className="btn-shine"></span>
                  </a>
                  <div className="cta-benefits">
                    <span>✓ Instant delivery</span>
                    <span>✓ Keep forever</span>
                    <span>✓ Secure payment</span>
                  </div>
                </div>

                <div className="cta-social-proof">
                  <div className="proof-avatars">
                    <div className="avatar-circle">M</div>
                    <div className="avatar-circle">J</div>
                    <div className="avatar-circle">S</div>
                    <div className="avatar-circle">A</div>
                    <div className="avatar-more">+12K</div>
                  </div>
                  <p className="proof-message">Join thousands of happy customers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: FAQ */}
        <section id="faq" className="section faq">
          <div className="container">
            <div className="faq-header">
              <h2 className="faq-title">Frequently Asked Questions</h2>
              <p className="faq-subtitle">Everything you need to know about personalized songs</p>
            </div>
            <div className="faq-grid" id="faq-acc">
              <div className="faq-item">
                <button className="faq-question" aria-expanded="false">
                  <span className="question-text">How does the personalization work?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>Our composers analyze your inputs (name, category, personal details) and create custom lyrics that naturally weave in the name you provide. The music is professionally produced to match your chosen category's style and emotion.</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" aria-expanded="false">
                  <span className="question-text">Can I use any name?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>Absolutely! Use your own name, your partner's name, parents, friends, children—anyone! It's perfect for gifts. Many customers create songs for birthdays, anniversaries, Mother's Day, Father's Day, or just to make someone smile.</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" aria-expanded="false">
                  <span className="question-text">How long is each song?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>Each personalized song is approximately 2-3 minutes long—perfect for listening on repeat without getting too lengthy. You'll receive a high-quality MP3 file that works on any device.</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" aria-expanded="false">
                  <span className="question-text">How fast will I receive my song?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>Most songs are delivered within minutes to the email you provide at checkout. Check your inbox (and spam folder just in case!) shortly after purchase. If you don't receive it, contact our support team.</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" aria-expanded="false">
                  <span className="question-text">Can I create multiple songs?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>Yes! Many customers create songs for different occasions and people. Each song is a separate purchase (<PriceDisplay usdAmount={7.99} /> each), and you can create as many as you'd like. Perfect for gifting to your whole family!</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" aria-expanded="false">
                  <span className="question-text">What is your refund policy?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>All sales are final due to the instant, custom nature of digital products. However, if you experience technical issues (file won't play, didn't receive email, payment errors, etc.), contact our support team and we'll resolve it promptly. We're here to help!</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" aria-expanded="false">
                  <span className="question-text">Can I share my song with others?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>Of course! Share it on social media, send it to friends, play it at parties—it's yours to use however you'd like for personal use. The song belongs to you forever with unlimited personal listening and sharing rights.</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" aria-expanded="false">
                  <span className="question-text">Are there any hidden fees or subscriptions?</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>Absolutely not! What you see is what you pay. <PriceDisplay usdAmount={7.99} /> per song (or seasonal pricing for special categories). No subscriptions, no recurring charges, no hidden fees. One payment, lifetime access to your song.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Final CTA */}
        <section className="final-cta-natural">
          <div className="container">
            <div className="final-cta-wrapper">
              <div className="final-cta-visual">
                <div className="musical-note note-1">♪</div>
                <div className="musical-note note-2">♫</div>
                <div className="musical-note note-3">♪</div>
                <div className="musical-note note-4">♫</div>
              </div>

              <div className="final-cta-message">
                <h2>Let's create something special</h2>
                <p>A song. A memory. A moment they'll never forget.</p>

                <a href="#create" className="btn-final">
                  <span>Start Creating</span>
                  <span className="price-tag"><PriceDisplay usdAmount={7.99} /></span>
                </a>

                <div className="final-meta">
                  <span>⚡ Delivered in minutes</span>
                  <span>•</span>
                  <span>💝 Perfect for gifting</span>
                  <span>•</span>
                  <span>♾️ Yours forever</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Consent />

      <style jsx>{`
        /* Social Proof Banner */
        .social-proof-banner {
          background: linear-gradient(135deg, var(--moss), var(--sage));
          padding: 40px 0;
          margin-bottom: 60px;
        }

        .proof-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 60px;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
          color: var(--soft-white);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 8px;
          font-family: var(--font-serif);
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.95;
        }

        .stat-divider {
          width: 1px;
          height: 60px;
          background: rgba(255, 255, 255, 0.3);
        }

        /* Natural Design System */
        .eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--rust);
          padding: 6px 16px;
          background: linear-gradient(135deg, rgba(198, 123, 92, 0.1), rgba(198, 123, 92, 0.05));
          border-radius: 20px;
          border: 1px solid rgba(198, 123, 92, 0.2);
          margin-bottom: 16px;
        }

        .title-handwritten {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 500;
          color: var(--charcoal);
          line-height: 1.3;
          margin-bottom: 12px;
        }

        .subtitle-natural {
          font-size: 1.125rem;
          color: var(--muted);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Section 8: How It Works - New Design */
        .how-it-works {
          background: var(--sand);
          padding: 60px 0;
          position: relative;
        }

        .section-header-natural {
          text-align: center;
          margin-bottom: 50px;
        }

        /* Journey Path - How It Works */
        .journey-path {
          display: flex;
          flex-direction: column;
          gap: 48px;
          max-width: 700px;
          margin: 0 auto 40px;
          position: relative;
        }

        .path-line {
          position: absolute;
          left: 30px;
          top: 60px;
          bottom: 60px;
          width: 2px;
          background: linear-gradient(180deg, var(--sage), var(--rust));
          opacity: 0.3;
        }

        .journey-step {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          position: relative;
        }

        .step-marker {
          flex-shrink: 0;
          width: 60px;
          height: 60px;
          background: var(--soft-white);
          border: 3px solid var(--sage);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          position: relative;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(124, 132, 113, 0.15);
        }

        .marker-pulse {
          position: absolute;
          inset: -8px;
          border: 2px solid var(--sage);
          border-radius: 50%;
          opacity: 0;
          animation: pulse 2s ease-out infinite;
        }

        @keyframes pulse {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.3);
          }
        }

        .step-info {
          flex: 1;
          padding-top: 8px;
        }

        .step-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--rust);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .step-info h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--charcoal);
          margin-bottom: 8px;
        }

        .step-info p {
          color: var(--muted);
          line-height: 1.6;
        }

        .process-cta {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .btn-natural-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 32px;
          background: var(--sage);
          color: var(--soft-white);
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.0625rem;
          transition: all 0.3s var(--ease-out-quart);
          box-shadow: 0 4px 12px rgba(124, 132, 113, 0.2);
        }

        .btn-natural-primary:hover {
          background: var(--moss);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(124, 132, 113, 0.3);
        }

        .btn-natural-primary svg {
          transition: transform 0.3s ease;
        }

        .btn-natural-primary:hover svg {
          transform: translateX(4px);
        }

        .cta-note {
          font-size: 0.875rem;
          color: var(--muted);
          font-style: italic;
        }

        /* Benefits Natural */
        .benefits-intro {
          text-align: center;
          margin-bottom: 48px;
        }

        .benefits-showcase-natural {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .feature-highlight {
          background: linear-gradient(135deg, var(--moss), var(--sage));
          border-radius: 20px;
          padding: 48px;
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 40px;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(90, 102, 80, 0.2);
        }

        .highlight-content {
          color: var(--soft-white);
        }

        .highlight-badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .highlight-content h3 {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .highlight-content p {
          font-size: 1.125rem;
          line-height: 1.6;
          opacity: 0.95;
          margin-bottom: 24px;
        }

        .highlight-proof {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .proof-stat {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .stat-big {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 600;
          line-height: 1;
        }

        .proof-stat span:last-child {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .proof-testimonial {
          font-style: italic;
          opacity: 0.9;
          padding-left: 24px;
          border-left: 2px solid rgba(255, 255, 255, 0.3);
        }

        .highlight-visual {
          position: relative;
          height: 150px;
        }

        .visual-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .circle-1 {
          width: 80px;
          height: 80px;
          top: 0;
          right: 40px;
          animation: float 3s ease-in-out infinite;
        }

        .circle-2 {
          width: 60px;
          height: 60px;
          top: 50px;
          right: 0;
          animation: float 4s ease-in-out infinite 0.5s;
        }

        .circle-3 {
          width: 100px;
          height: 100px;
          bottom: 0;
          right: 60px;
          animation: float 5s ease-in-out infinite 1s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .features-grid-natural {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .feature-card-natural {
          background: var(--soft-white);
          border: 1px solid rgba(139, 134, 128, 0.1);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s var(--ease-out-quart);
        }

        .feature-card-natural:hover {
          border-color: var(--sage);
          box-shadow: 0 8px 24px rgba(124, 132, 113, 0.12);
          transform: translateY(-4px);
        }

        .feature-icon-natural {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, rgba(124, 132, 113, 0.1), rgba(124, 132, 113, 0.05));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--sage);
          margin-bottom: 16px;
        }

        .feature-card-natural h4 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--charcoal);
          margin-bottom: 8px;
        }

        .feature-card-natural p {
          color: var(--muted);
          line-height: 1.6;
          font-size: 0.9375rem;
        }

        /* Urgency CTA Natural */
        .urgency-cta-natural {
          padding: 60px 0;
          background: var(--cream);
        }

        .cta-card-natural {
          background: linear-gradient(135deg, var(--sage), var(--moss));
          border-radius: 24px;
          padding: 56px 48px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(124, 132, 113, 0.25);
        }

        .cta-background-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.1) 2px, transparent 0);
          background-size: 40px 40px;
          opacity: 0.3;
        }

        .cta-content-natural {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          color: var(--soft-white);
        }

        .cta-eyebrow {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          font-size: 0.8125rem;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .cta-content-natural h2 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 500;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .cta-content-natural p {
          font-size: 1.125rem;
          line-height: 1.7;
          opacity: 0.95;
          margin-bottom: 32px;
        }

        .cta-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }

        .btn-natural-cta {
          position: relative;
          display: inline-block;
          padding: 16px 40px;
          background: var(--soft-white);
          color: var(--moss);
          border-radius: 14px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.125rem;
          transition: all 0.3s var(--ease-out-quart);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .btn-natural-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        }

        .btn-natural-cta:hover .btn-shine {
          animation: shine 0.6s ease-in-out;
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        .cta-benefits {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          font-size: 0.9375rem;
          opacity: 0.9;
        }

        .cta-social-proof {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .proof-avatars {
          display: flex;
          align-items: center;
          gap: -8px;
        }

        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid var(--sage);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-left: -8px;
        }

        .avatar-circle:first-child {
          margin-left: 0;
        }

        .avatar-more {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid var(--sage);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          margin-left: -8px;
        }

        .proof-message {
          font-size: 0.9375rem;
          opacity: 0.9;
        }

        /* Final CTA Natural */
        .final-cta-natural {
          padding: 60px 0;
          background: linear-gradient(180deg, var(--sand), var(--cream));
        }

        .final-cta-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        .final-cta-visual {
          flex-shrink: 0;
          width: 200px;
          height: 200px;
          position: relative;
        }

        .musical-note {
          position: absolute;
          font-size: 3rem;
          color: var(--sage);
          opacity: 0.6;
          animation: noteFloat 3s ease-in-out infinite;
        }

        .note-1 {
          top: 0;
          left: 20px;
          animation-delay: 0s;
        }

        .note-2 {
          top: 40px;
          right: 20px;
          animation-delay: 0.5s;
        }

        .note-3 {
          bottom: 40px;
          left: 40px;
          animation-delay: 1s;
        }

        .note-4 {
          bottom: 0;
          right: 40px;
          animation-delay: 1.5s;
        }

        @keyframes noteFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 0.3;
          }
        }

        .final-cta-message {
          flex: 1;
          text-align: center;
        }

        .final-cta-message h2 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 500;
          color: var(--charcoal);
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .final-cta-message p {
          font-size: 1.125rem;
          color: var(--muted);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .btn-final {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 16px 36px;
          background: var(--sage);
          color: var(--soft-white);
          border-radius: 14px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.125rem;
          transition: all 0.3s var(--ease-out-quart);
          box-shadow: 0 6px 20px rgba(124, 132, 113, 0.25);
          margin-bottom: 20px;
        }

        .btn-final:hover {
          background: var(--moss);
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(124, 132, 113, 0.35);
        }

        .price-tag {
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          font-size: 0.9375rem;
        }

        .final-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 0.9375rem;
          color: var(--muted);
        }

        @media (max-width: 768px) {
          .journey-path {
            padding-left: 40px;
          }

          .path-line {
            left: 20px;
          }

          .step-marker {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }

          .feature-highlight {
            grid-template-columns: 1fr;
            padding: 36px;
          }

          .highlight-visual {
            display: none;
          }

          .features-grid-natural {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .cta-card-natural {
            padding: 40px 28px;
          }

          .final-cta-wrapper {
            flex-direction: column;
            gap: 32px;
          }

          .final-cta-visual {
            width: 150px;
            height: 150px;
          }

          .musical-note {
            font-size: 2.5rem;
          }
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
          font-family: var(--font-serif);
          position: relative;
          display: inline-block;
          padding-bottom: 12px;
        }

        /* Add hand-drawn underline accent */
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='3' viewBox='0 0 100 3' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 1.5 Q 10 0.5, 20 1.5 T 40 1.5 T 60 1.5 T 80 1.5 T 100 1.5' stroke='%2310B981' stroke-width='2' fill='none' opacity='0.6'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-size: 100px 3px;
        }

        .section-header {
          text-align: center;
        }

        .section-header .section-title {
          display: inline-block;
          margin-left: auto;
          margin-right: auto;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        /* New Process Badge */
        .header-badge-wrapper {
          margin-bottom: 16px;
        }

        .process-badge {
          display: inline-block;
          padding: 8px 20px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
          border: 2px solid rgba(16, 185, 129, 0.3);
          border-radius: 50px;
          color: #059669;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* New Steps Timeline */
        .steps-timeline {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
          position: relative;
        }

        @media (max-width: 1024px) {
          .steps-timeline {
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        .step-card {
          background: white;
          padding: 32px 28px;
          border-radius: 20px;
          border: 2px solid #E5E7EB;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .step-card:hover {
          transform: translateY(-8px);
          border-color: #10B981;
          box-shadow: 0 24px 48px rgba(16, 185, 129, 0.2);
        }

        .step-number-large {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 4rem;
          font-weight: 800;
          color: rgba(16, 185, 129, 0.08);
          font-family: var(--font-serif);
          line-height: 1;
        }

        .step-content {
          position: relative;
          z-index: 1;
        }

        .step-icon-circle {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          transition: all 0.3s ease;
        }

        .step-card:hover .step-icon-circle {
          transform: scale(1.1);
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.4);
        }

        .step-icon {
          font-size: 2rem;
        }

        .step-arrow {
          display: none;
          position: absolute;
          right: -16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 2rem;
          color: #10B981;
          font-weight: 300;
        }

        @media (min-width: 1024px) {
          .step-arrow {
            display: block;
          }

          .step-card:last-child .step-arrow {
            display: none;
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-15px); }
          50% { transform: translateY(-7px); }
          75% { transform: translateY(-12px); }
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .step-description {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
        }

        /* How CTA - New Design */
        .how-cta {
          text-align: center;
          margin-top: 40px;
        }

        .cta-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .cta-glow {
          background: linear-gradient(135deg, #10B981, #059669);
          padding: 0;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.3);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 32px;
          min-width: 300px;
        }

        .cta-glow:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(16, 185, 129, 0.5);
        }

        .cta-text {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .cta-price {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 700;
        }

        .cta-features {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .feature-item {
          color: #666;
          font-size: 0.95rem;
          font-weight: 500;
        }

        /* Benefits Section - New Design */
        .benefits-section {
          padding: 60px 0;
          background: linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%);
          position: relative;
        }

        .benefits-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .benefits-tag {
          display: inline-block;
          padding: 8px 20px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(37, 99, 235, 0.08));
          border: 2px solid rgba(59, 130, 246, 0.25);
          border-radius: 50px;
          color: #2563EB;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 16px;
        }

        .section-title-large {
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 800;
          color: #111827;
          margin-bottom: 16px;
          font-family: var(--font-serif);
          line-height: 1.2;
        }

        .benefits-subtitle {
          font-size: 1.125rem;
          color: #6B7280;
          font-weight: 500;
          line-height: 1.5;
        }

        .benefits-showcase {
          display: grid;
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .benefit-card-new {
          background: white;
          padding: 32px;
          border-radius: 16px;
          border: 2px solid #f0f0f0;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .benefit-card-new:hover {
          border-color: #3B82F6;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
        }

        .primary-benefit {
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: white;
          padding: 40px;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 20px 50px rgba(37, 99, 235, 0.3);
        }

        .primary-benefit:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 56px rgba(37, 99, 235, 0.35);
        }

        .benefit-gradient {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
          border-radius: 50%;
        }

        .benefit-number {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 5rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.08);
          font-family: var(--font-serif);
          line-height: 1;
        }

        .benefit-content {
          position: relative;
          z-index: 1;
        }

        .primary-benefit h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: white;
        }

        .primary-benefit p {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 20px;
        }

        .benefit-stat {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding-top: 20px;
          border-top: 2px solid rgba(255, 255, 255, 0.2);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          font-family: var(--font-serif);
        }

        .stat-label {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .benefits-grid-compact {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (max-width: 768px) {
          .benefits-grid-compact {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .benefit-icon-modern {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: #3B82F6;
          transition: all 0.3s ease;
        }

        .benefit-card-new:hover .benefit-icon-modern {
          transform: translateY(-4px) rotate(5deg);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15));
        }

        .benefit-card-new h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .benefit-card-new p {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
        }

        /* Urgency CTA - New Modern Design */
        .urgency-cta-section {
          padding: 60px 0;
          background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
        }

        .urgency-card-modern {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          padding: 48px 40px;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(5, 150, 105, 0.3);
          max-width: 1100px;
          margin: 0 auto;
        }

        .urgency-background-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0.1;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: white;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: -150px;
          right: -100px;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          bottom: -80px;
          left: -60px;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: -50px;
        }

        .urgency-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
        }

        .urgency-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          margin-bottom: 24px;
          font-size: 0.875rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: badgePulse 2s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        .urgency-title-modern {
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 800;
          margin-bottom: 16px;
          font-family: var(--font-serif);
          line-height: 1.2;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .urgency-subtitle-modern {
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
          color: rgba(255, 255, 255, 0.98);
          font-weight: 400;
        }

        .urgency-cta-box {
          margin-bottom: 32px;
        }

        .cta-button-hero {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px 44px;
          background: white;
          color: #047857;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 24px;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .cta-button-hero:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
          border-color: white;
        }

        .button-content {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.125rem;
        }

        .button-arrow {
          font-size: 1.375rem;
          transition: transform 0.3s ease;
        }

        .cta-button-hero:hover .button-arrow {
          transform: translateX(4px);
        }

        .button-price {
          font-size: 0.9rem;
          color: #6B7280;
          font-weight: 600;
        }

        .urgency-features {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .feature-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .social-proof-mini {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .avatar-stack {
          display: flex;
          align-items: center;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
          border: 2px solid rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          margin-left: -12px;
        }

        .avatar:first-child {
          margin-left: 0;
        }

        .proof-text {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.95);
        }

        /* Final CTA */
        .final-cta {
          background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%);
          padding: 60px 0;
          position: relative;
          overflow: hidden;
        }

        .final-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .final-cta-content {
          text-align: center;
          color: white;
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .final-cta-content h2 {
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 800;
          margin-bottom: 16px;
          font-family: var(--font-serif);
          line-height: 1.2;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
        }

        .final-cta-content p {
          font-size: 1.125rem;
          margin-bottom: 32px;
          opacity: 0.98;
          line-height: 1.6;
        }

        .cta-hero {
          background: white;
          color: #7C3AED;
          padding: 20px 44px;
          font-size: 1.125rem;
          font-weight: 700;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .cta-hero:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 44px rgba(0, 0, 0, 0.3);
          border-color: white;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .how-it-works {
            padding: 50px 0;
          }

          .section-header {
            margin-bottom: 32px;
          }

          .steps-timeline {
            margin-bottom: 32px;
          }

          .step-card {
            padding: 28px 24px;
          }

          .step-number-large {
            font-size: 2.5rem;
          }

          .step-icon-circle {
            width: 56px;
            height: 56px;
            margin-bottom: 16px;
          }

          .step-icon {
            font-size: 1.75rem;
          }

          .step-title {
            font-size: 1.125rem;
          }

          .benefits-section {
            padding: 50px 0;
          }

          .benefits-header {
            margin-bottom: 32px;
          }

          .primary-benefit {
            padding: 32px;
            min-height: auto;
          }

          .benefit-number {
            font-size: 4rem;
          }

          .stat-divider {
            display: none;
          }

          .proof-stats {
            gap: 32px;
          }

          .urgency-cta-section {
            padding: 50px 0;
          }

          .urgency-card-modern {
            padding: 36px 28px;
          }

          .urgency-title-modern {
            font-size: 1.75rem;
          }

          .urgency-subtitle-modern {
            font-size: 1rem;
            margin-bottom: 24px;
          }

          .cta-button-hero {
            padding: 18px 36px;
          }

          .button-content {
            font-size: 1rem;
          }

          .urgency-features {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .urgency-cta-box {
            margin-bottom: 24px;
          }

          .final-cta {
            padding: 50px 0;
          }

          .final-cta-content {
            padding: 0 20px;
          }

          .final-cta-content h2 {
            font-size: 1.875rem;
          }

          .final-cta-content p {
            font-size: 1rem;
            margin-bottom: 24px;
          }

          .cta-hero {
            padding: 18px 36px;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
