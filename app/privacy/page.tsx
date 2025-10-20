"use client";
import { useEffect, useState } from 'react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import Seo from '@/components/Seo';

export default function PrivacyPage(){
  const [supportEmail, setSupportEmail] = useState('support@personalize-online.com');
  const [lastUpdated] = useState('December 2024');

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
              <h1 className="legal-title">Privacy Policy</h1>
              <p className="legal-updated">Last Updated: {lastUpdated}</p>
            </div>

            <div className="legal-content">
              <div className="legal-section">
                <h2>We're Not Creepy About Your Data</h2>
                <p>
                  Look, we collect some data (we have to), but we're not here to stalk you or sell your info to weird third parties. This policy explains what we collect, why we collect it, and what rights you have. We tried to write it in plain English instead of legalese.
                </p>
              </div>

              <div className="legal-section">
                <h2>What We Collect (And Why)</h2>
                <h3>When You Order a Song</h3>
                <ul>
                  <li><strong>The Name:</strong> Whatever name you want in the song (obviously)</li>
                  <li><strong>Song Category:</strong> Which type of song you picked (birthday, love, etc.)</li>
                  <li><strong>Your Email:</strong> So we can send you the MP3 file</li>
                </ul>

                <h3>For Payments</h3>
                <ul>
                  <li><strong>Transaction Details:</strong> Order confirmations and purchase info (handled by Stripe, not us)</li>
                  <li><strong>Billing Email:</strong> For receipts and customer support</li>
                  <li><strong>No Credit Cards:</strong> We literally never see your payment details—Stripe handles all that</li>
                </ul>

                <h3>Website Analytics (Optional)</h3>
                <ul>
                  <li><strong>Basic Stuff:</strong> Page views, rough location (country level), device type</li>
                  <li><strong>Anonymous Only:</strong> No individual tracking or creepy cookies</li>
                  <li><strong>You Control It:</strong> Only collected if you consent via our cookie banner</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>What We Do With Your Info</h2>
                <ul>
                  <li>Make your song with the name you provided</li>
                  <li>Email you the MP3 file</li>
                  <li>Process your payment (via Stripe)</li>
                  <li>Provide customer support if something goes wrong</li>
                  <li>Send order confirmations and receipts</li>
                  <li>Send optional updates about new song categories (only if you opt in)</li>
                </ul>
                <p><strong>That's it.</strong> We don't sell your data, we don't spam you, we don't do anything shady.</p>
              </div>

              <div className="legal-section">
                <h2>How We Keep Your Data Safe</h2>
                <p>
                  We generate your song, send it to you, and that's pretty much it. We don't permanently store your song requests on our servers. Purchase records are kept for legal/tax reasons and customer support, but they're encrypted and secured.
                </p>
                <p>
                  All data transmission uses industry-standard encryption (HTTPS/TLS). Your payment details go straight to Stripe—we never see them.
                </p>
              </div>

              <div className="legal-section">
                <h2>Your Rights</h2>
                <ul>
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct your information</li>
                  <li><strong>Deletion:</strong> Request removal of your personal data</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                </ul>
              </div>

              <div className="legal-section" id="cookies">
                <h2>Cookie Policy</h2>
                <h3>Essential Cookies</h3>
                <p>
                  We use minimal essential cookies for site functionality:
                </p>
                <ul>
                  <li><strong>Session Storage:</strong> Temporary data for your current visit</li>
                  <li><strong>Preferences:</strong> Your theme selection and consent choices</li>
                  <li><strong>Purchase Status:</strong> To enable downloads for paying customers</li>
                </ul>

                <h3>Analytics Cookies</h3>
                <p>
                  Only activated with your consent. We use privacy-respecting analytics that don't track individual users.
                </p>

                <h3>Managing Cookies</h3>
                <p>
                  You can control cookies through your browser settings. Disabling essential cookies may impact site functionality.
                </p>
              </div>

              <div className="legal-section">
                <h2>Third-Party Services</h2>
                <ul>
                  <li><strong>Payment Processing:</strong> Handled securely by Stripe/PayPal (we don't store payment details)</li>
                  <li><strong>Email Delivery:</strong> For sending your songs and updates (if requested)</li>
                  <li><strong>Content Delivery:</strong> CloudFlare for fast, secure content delivery</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>Children's Privacy</h2>
                <p>
                  Our service is not directed to children under 13. We do not knowingly collect personal information
                  from children. If you believe we have inadvertently collected such information, please contact us immediately.
                </p>
              </div>

              <div className="legal-section">
                <h2>Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any significant changes
                  by posting a notice on our website or sending an email (if you've opted in for communications).
                </p>
              </div>

              <div className="legal-section">
                <h2>Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <ul>
                  <li>Email: <a id="support-link" href={`mailto:${supportEmail}`}>{supportEmail}</a></li>
                  <li>Website: personalize-online.com</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
