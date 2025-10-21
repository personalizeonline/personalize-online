"use client";
import { useEffect, useState } from 'react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import Seo from '@/components/Seo';

export default function TermsPage(){
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
              <h1 className="legal-title">Terms of Service</h1>
              <p className="legal-updated">Last Updated: {lastUpdated}</p>
            </div>

            <div className="legal-content">
              <div className="legal-section">
                <h2>The Deal</h2>
                <p>
                  By using Personalize Online (operated by PROSPERA ENTERPRISES), you're agreeing to these terms. If you don't agree with something here, unfortunately you can't use our service. We know legal stuff is boring, but we tried to make this as readable as possible.
                </p>
              </div>

              <div className="legal-section">
                <h2>What We Do</h2>
                <p>
                  Personalize Online creates custom songs with names baked right into the lyrics. Perfect for birthdays, gifts, or celebrations. Our service includes:
                </p>
                <ul>
                  <li>Creation of personalized songs with any name you provide</li>
                  <li>High-quality MP3 downloads delivered via email</li>
                  <li>Various song categories (birthday, love, motivation, etc.)</li>
                  <li>One-time purchase options (no subscriptions required)</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>The Legal Stuff (But In Plain English)</h2>
                <div className="disclaimer-box">
                  <h3>⚠️ It's Entertainment, Not Therapy</h3>
                  <p>
                    Our songs are for entertainment and gift-giving purposes. They're fun, they're personal, but they're not:
                  </p>
                  <ul>
                    <li>Medical or mental health treatment</li>
                    <li>Professional therapy or counseling</li>
                    <li>Financial or legal advice</li>
                  </ul>
                  <p>
                    Basically, these are songs with names in them, not professional services. If you need actual help, please contact qualified professionals.
                  </p>
                </div>
              </div>

              <div className="legal-section">
                <h2>What You Can (And Can't) Do</h2>
                <p>When you order a song, you agree to:</p>
                <ul>
                  <li>Use it for personal stuff—gifts, celebrations, making someone smile</li>
                  <li>Share it with friends and family all you want</li>
                  <li>Not resell our songs or use them commercially (no making money off them)</li>
                  <li>Not use the service for anything illegal or sketchy</li>
                  <li>Be cool about our intellectual property</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>How We Make Your Songs</h2>
                <h3>The Creation Process</h3>
                <p>
                  We create custom songs with the name you provide woven naturally into the lyrics.
                  We aim for quality, but hey—results can vary based on the name and category you choose.
                </p>

                <h3>What You Get</h3>
                <p>
                  When you buy a song, you get a personal license to:
                </p>
                <ul>
                  <li>Download your MP3 and keep it forever</li>
                  <li>Play it as many times as you want</li>
                  <li>Share it with family and friends for personal use</li>
                  <li>Post it on social media for personal, non-commercial purposes</li>
                </ul>

                <h3>What You Can't Do</h3>
                <ul>
                  <li>Resell our songs or use them commercially</li>
                  <li>Broadcast them publicly or use them in performances without permission</li>
                  <li>Modify them and pass them off as your own work</li>
                  <li>Use them in ways that violate any laws</li>
                </ul>
              </div>

              <div className="legal-section">
                <h2>Pricing & Payments</h2>
                <h3>How It Works</h3>
                <ul>
                  <li>Each song is a one-time purchase ($7.99 per song, or as priced for seasonal categories)</li>
                  <li>Pay once, keep forever—no subscriptions or recurring charges</li>
                  <li>Payment processing is handled securely through Stripe</li>
                  <li>You'll receive your MP3 via email within minutes of purchase</li>
                </ul>
              </div>

              <div className="legal-section" id="refunds">
                <h2>Refund Policy (The Straight Truth)</h2>
                <h3>⚠️ All Sales Are Final</h3>
                <p>
                  Because these are custom digital products created instantly and delivered immediately, <strong>all sales are final</strong>. No refunds, no returns.
                </p>
                <p>
                  Think of it like downloading any digital content—once it's delivered, that's it. We can't "un-send" a song.
                </p>

                <h3>But We'll Still Help You Out</h3>
                <p>If you run into actual technical problems, we've got your back:</p>
                <ul>
                  <li><strong>Didn't get your email?</strong> Contact us and we'll resend it</li>
                  <li><strong>File won't play?</strong> We'll help troubleshoot or send a different format</li>
                  <li><strong>Got charged twice?</strong> We'll fix billing errors immediately</li>
                  <li><strong>Payment issues?</strong> We'll sort those out</li>
                </ul>

                <h3>What We Can't Help With</h3>
                <ul>
                  <li>Changed your mind after ordering</li>
                  <li>Don't like how the song turned out</li>
                  <li>Entered the wrong name (triple-check before ordering!)</li>
                </ul>

                <p>
                  For technical support, email us at <a href={`mailto:${supportEmail}`}>{supportEmail}</a>. We'll respond within 24 hours.
                </p>
              </div>

              <div className="legal-section">
                <h2>Intellectual Property</h2>
                <p>
                  Personalize Online retains all rights to the service, software, and underlying technology.
                  You retain rights to any personal information you provide. Generated songs are provided
                  under the personal use license described above.
                </p>
              </div>

              <div className="legal-section">
                <h2>Privacy</h2>
                <p>
                  Your use of our service is also governed by our <a href="/privacy">Privacy Policy</a>,
                  which is incorporated into these terms by reference.
                </p>
              </div>

              <div className="legal-section">
                <h2>Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, PERSONALIZE ONLINE SHALL NOT BE LIABLE FOR ANY
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS
                  OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.
                </p>
                <p>
                  Our total liability for any claims under these terms shall not exceed the amount you paid
                  us in the last 12 months.
                </p>
              </div>

              <div className="legal-section">
                <h2>Termination</h2>
                <p>
                  We may terminate or suspend your access to our service immediately, without prior notice,
                  for any reason, including breach of these Terms. Upon termination, your right to use the
                  service will cease immediately.
                </p>
              </div>

              <div className="legal-section">
                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of any material
                  changes via email or website notice. Continued use after changes constitutes acceptance of new terms.
                </p>
              </div>

              <div className="legal-section">
                <h2>Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the United States,
                  without regard to its conflict of law provisions.
                </p>
              </div>

              <div className="legal-section">
                <h2>Contact Information</h2>
                <p>
                  For any questions about these Terms of Service, please contact us:
                </p>
                <ul>
                  <li><strong>Business Name:</strong> PROSPERA ENTERPRISES</li>
                  <li><strong>Brand:</strong> Personalize Online</li>
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
