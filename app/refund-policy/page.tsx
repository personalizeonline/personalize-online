"use client";
import { useEffect, useState } from 'react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import Seo from '@/components/Seo';

export default function RefundPolicyPage(){
  const [supportEmail, setSupportEmail] = useState('support@personalize-online.com');
  const [lastUpdated] = useState('October 2025');

  useEffect(() => {
    const cfg = window.__siteConfig;
    if (cfg?.supportEmail) {
      setSupportEmail(cfg.supportEmail);
      const supportLink = document.getElementById('support-link') as HTMLAnchorElement;
      if (supportLink) supportLink.href = `mailto:${cfg.supportEmail}`;
    }
  }, []);

  return (
    <>
      <Seo />
      <Navbar />
      <main>
        <section className="section legal-page">
          <div className="container narrow">
            <div className="legal-header">
              <h1 className="legal-title">Refund Policy</h1>
              <p className="legal-updated">Last Updated: {lastUpdated}</p>
            </div>

            <div className="legal-content">
              <div className="legal-section">
                <div className="disclaimer-box" style={{background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1))', border: '2px solid #ef4444', padding: '24px', borderRadius: '12px', marginBottom: '32px'}}>
                  <h2 style={{color: '#ef4444', marginTop: 0, marginBottom: '12px', fontSize: '1.5rem'}}>⚠️ ALL SALES ARE FINAL - NO REFUNDS</h2>
                  <p style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px'}}>
                    Due to the instant, custom nature of our digital products, we do not offer refunds,
                    exchanges, or cancellations once a song has been created and delivered.
                  </p>
                  <p style={{marginBottom: 0}}>
                    By placing an order with Personalize Online, you acknowledge and agree to this no-refund policy.
                  </p>
                </div>
              </div>

              <div className="legal-section">
                <h2>Why We Don't Offer Refunds</h2>
                <p>
                  Personalize Online creates custom songs based on your specific inputs (name, category, personal details).
                  Each song is:
                </p>
                <ul>
                  <li><strong>Instantly Generated:</strong> Created based on your personalization</li>
                  <li><strong>Unique to You:</strong> Includes your name in the lyrics and is tailored to your story</li>
                  <li><strong>Immediately Delivered:</strong> Sent to your email as soon as it's ready</li>
                  <li><strong>Non-Returnable Digital Product:</strong> Like other custom digital content, it cannot be "returned"</li>
                </ul>
                <p>
                  Once a song is generated and delivered, it is yours to keep. We cannot "undo" the creation or
                  delivery of your personalized content.
                </p>
              </div>

              <div className="legal-section">
                <h2>Before You Order</h2>
                <p>
                  To ensure you're completely happy with your purchase, we strongly recommend the following
                  <strong> before placing your order:</strong>
                </p>

                <h3>1. Listen to Samples</h3>
                <p>
                  Click "🎵 Hear a Sample First" on our homepage to preview the style and quality of our songs.
                  This gives you a clear idea of what to expect from your personalized song.
                </p>

                <h3>2. Review Your Details Carefully</h3>
                <ul>
                  <li><strong>Name Spelling:</strong> Double-check the spelling of the name you want in the lyrics</li>
                  <li><strong>Category Selection:</strong> Make sure you've chosen the right category (Birthday, Manifestation, Confidence, etc.)</li>
                  <li><strong>Personalization Details:</strong> Review any additional information you've provided</li>
                  <li><strong>Email Address:</strong> Ensure your email is correct so you receive your song</li>
                </ul>

                <h3>3. Understand What You're Getting</h3>
                <p>
                  Each personalized song includes:
                </p>
                <ul>
                  <li>Your name woven into the lyrics</li>
                  <li>Music in the style of your chosen category</li>
                  <li>A 2-3 minute MP3 file delivered via email</li>
                  <li>Unlimited personal listening and sharing rights</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>Technical Issues</h2>
                <p>
                  If you experience <strong>technical issues</strong> that prevent you from receiving or accessing
                  your song (not dissatisfaction with the content), please contact us immediately:
                </p>

                <h3>Examples of Technical Issues We Can Help With:</h3>
                <ul>
                  <li>You didn't receive your song email within 10 minutes</li>
                  <li>The download link is broken or expired</li>
                  <li>The audio file won't play or is corrupted</li>
                  <li>You were charged twice by mistake</li>
                  <li>Payment was processed but no order was created</li>
                </ul>

                <p>
                  Contact our support team at <a id="support-link" href={`mailto:${supportEmail}`}>{supportEmail}</a> with:
                </p>
                <ul>
                  <li>Your order number or email used for purchase</li>
                  <li>Description of the technical problem</li>
                  <li>Screenshots if applicable</li>
                </ul>

                <p>
                  We will work to resolve genuine technical issues promptly. This does not constitute a refund
                  but rather technical support to ensure you receive the product you paid for.
                </p>
              </div>

              <div className="legal-section">
                <h2>What Is NOT Eligible</h2>
                <p>
                  The following are <strong>NOT</strong> grounds for refunds or exceptions:
                </p>
                <ul>
                  <li><strong>Dissatisfaction with Style:</strong> "I don't like the way it sounds" or "It's not what I expected"</li>
                  <li><strong>Change of Mind:</strong> "I decided I don't want it anymore" or "I ordered by mistake"</li>
                  <li><strong>Spelling Errors:</strong> Mistakes in the name or details you provided during checkout</li>
                  <li><strong>Wrong Category:</strong> You selected Birthday but wanted Manifestation</li>
                  <li><strong>Quality Preferences:</strong> "I wanted it to sound different" or "The voice isn't perfect"</li>
                  <li><strong>Buyer's Remorse:</strong> Any reason after the song has been delivered</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>Pricing & Value</h2>
                <p>
                  Our pricing is designed to be extremely affordable compared to alternatives:
                </p>
                <ul>
                  <li><strong>Launch Pricing:</strong> $5.99 single song (first 1000 customers)</li>
                  <li><strong>Custom Songwriters:</strong> $200-500 per song</li>
                  <li><strong>Professional Studios:</strong> $500-2000+ per song</li>
                </ul>
                <p>
                  At 97% savings compared to traditional custom songs, our service provides exceptional value
                  for personalized music. However, the low price point does not change our no-refund policy.
                </p>
              </div>

              <div className="legal-section">
                <h2>Multi-Song Packages</h2>
                <p>
                  If you purchase a multi-song package (3 songs or 10 songs), the no-refund policy applies to
                  the entire package, even if you've only created one song. We recommend:
                </p>
                <ul>
                  <li>Starting with a single song to test the service first</li>
                  <li>Only purchasing bundles if you're confident you'll use all the credits</li>
                  <li>Remembering that all song credits can be used over time (they don't expire)</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>Fraudulent or Abusive Orders</h2>
                <p>
                  We reserve the right to refuse service or cancel orders that:
                </p>
                <ul>
                  <li>Contain offensive, illegal, or inappropriate content</li>
                  <li>Appear to be fraudulent or made with stolen payment methods</li>
                  <li>Violate our Terms of Service</li>
                  <li>Are placed by users who have previously abused our service</li>
                </ul>
                <p>
                  In cases of fraudulent activity, we may issue a refund and ban the account from future use.
                </p>
              </div>

              <div className="legal-section">
                <h2>Questions or Concerns?</h2>
                <p>
                  If you have questions about this policy or concerns about your order <strong>before purchasing</strong>,
                  please contact us:
                </p>
                <ul>
                  <li>Email: <a href={`mailto:${supportEmail}`}>{supportEmail}</a></li>
                  <li>Website: personalize-online.com</li>
                </ul>
                <p>
                  We're here to help ensure you have a great experience, but we cannot offer refunds after
                  your personalized song has been created and delivered.
                </p>
              </div>

              <div className="legal-section">
                <h2>Agreement</h2>
                <p>
                  By using Personalize Online and placing an order, you confirm that you have read, understood,
                  and agree to this Refund Policy. This policy is part of our <a href="/terms">Terms of Service</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
