"use client";
import { useEffect, useState } from 'react';

export function Footer() {
  const [year] = useState(new Date().getFullYear());
  const [supportEmail, setSupportEmail] = useState('support@personalize-online.com');

  useEffect(() => {
    // Get support email from config
    const cfg = (window as any).__siteConfig;
    if (cfg?.supportEmail) {
      setSupportEmail(cfg.supportEmail);
    }
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">Personalize Online</h4>
            <p className="footer-description">
              Personalized songs for every milestone, celebration, and moment of transformation.
              From birthdays to manifestation, healing to holiday joy - your unique soundtrack awaits.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/#how">How It Works</a></li>
              <li><a href="/#create">Create a Song</a></li>
              <li><a href="/#pricing">Pricing</a></li>
              <li><a href="/#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="/play">My Songs</a></li>
              <li><a href="/#testimonials">Stories</a></li>
              <li><a href="/#daily-verse">Daily Verse</a></li>
              <li><a href={`mailto:${supportEmail}`}>Contact Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/privacy#cookies">Cookie Policy</a></li>
              <li><a href="/terms#refunds">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-disclaimer">
            <p>Content is crafted individually and provided for personal reflection only.
            All songs are unique creations tailored to your specifications.</p>
          </div>
          <div className="footer-copyright">
            <p>© {year} Personalize Online. All rights reserved. Made with ♥ for your peace.</p>
            <p className="footer-entity">A brand of PROSPERA ENTERPRISES</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

