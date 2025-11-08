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
                <div className="disclaimer-box" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))', border: '2px solid #10b981', padding: '24px', borderRadius: '12px', marginBottom: '32px'}}>
                  <h2 style={{color: '#10b981', marginTop: 0, marginBottom: '12px', fontSize: '1.5rem'}}>✅ 24-Hour Satisfaction Guarantee</h2>
                  <p style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px'}}>
                    We stand behind the quality of our personalized songs. If you're not satisfied with your song,
                    you may request a full refund within 24 hours of receiving your completed song.
                  </p>
                  <p style={{marginBottom: 0}}>
                    After 24 hours, all sales are final as the song has been custom-created specifically for you.
                  </p>
                </div>
              </div>

              <div className="legal-section">
                <h2>How Our 24-Hour Guarantee Works</h2>
                <p>
                  Personalize Online creates custom songs based on your specific inputs (name, category, personal details).
                  Each song is:
                </p>
                <ul>
                  <li><strong>Professionally Created:</strong> Crafted based on your personalization</li>
                  <li><strong>Unique to You:</strong> Includes your name in the lyrics and is tailored to your story</li>
                  <li><strong>Delivered Within 24-48 Hours:</strong> Sent to your email once completed</li>
                  <li><strong>Custom Digital Product:</strong> Created specifically for you based on your details</li>
                </ul>
                <p>
                  You have 24 hours from the time you receive your completed song to review it and request a refund if
                  you're not satisfied. To request a refund, email us at <a href={`mailto:${supportEmail}`}>{supportEmail}</a> within
                  24 hours of delivery with your order number and reason for dissatisfaction.
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
                <h2>After the 24-Hour Window</h2>
                <p>
                  Refund requests must be made within 24 hours of receiving your completed song. After this period, all sales are final.
                  This includes:
                </p>
                <ul>
                  <li><strong>After 24 Hours:</strong> No refunds available regardless of reason</li>
                  <li><strong>Spelling Errors:</strong> Please review your details carefully before ordering</li>
                  <li><strong>Wrong Category:</strong> Double-check your category selection during checkout</li>
                  <li><strong>Change of Mind:</strong> Must be requested within the 24-hour window</li>
                </ul>
                <p>
                  The 24-hour window begins when your completed song is delivered to your email, not when you place the order.
                </p>
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
                <h2>How to Request a Refund</h2>
                <p>
                  To request a refund within the 24-hour window, contact us at <a href={`mailto:${supportEmail}`}>{supportEmail}</a> with:
                </p>
                <ul>
                  <li>Your order number or email used for purchase</li>
                  <li>Reason for dissatisfaction</li>
                  <li>Confirmation that you're within 24 hours of receiving the song</li>
                </ul>
                <p>
                  We will process approved refunds within 5-7 business days to the original payment method.
                </p>
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
                  and agree to this 24-Hour Refund Policy. Refunds must be requested within 24 hours of receiving
                  your completed song. This policy is part of our <a href="/terms">Terms of Service</a>.
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
