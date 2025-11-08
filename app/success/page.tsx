"use client";
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Seo from '@/components/Seo';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const paymentId = searchParams?.get('payment_id');

  useEffect(() => {
    // Log successful payment for analytics
    if (sessionId || paymentId) {
      console.log('Payment successful:', { sessionId, paymentId });
    }
  }, [sessionId, paymentId]);

  return (
    <>
      <Seo />
      <Navbar />
      <main>
        <section className="success-section">
          <div className="container">
            <div className="success-content">
              <div className="success-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>

              <h1 className="success-title">Payment Successful! 🎉</h1>
              <p className="success-message">
                Your personalized song is being created right now!
              </p>

              <div className="success-card">
                <h2>What Happens Next?</h2>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon">⚡</div>
                    <div className="timeline-content">
                      <h3>Now</h3>
                      <p>Your order is confirmed! We're starting production on your custom song</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">📧</div>
                    <div className="timeline-content">
                      <h3>Within 24-48 Hours</h3>
                      <p>Your professionally crafted song will arrive in your email inbox</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon">🎵</div>
                    <div className="timeline-content">
                      <h3>Forever</h3>
                      <p>Download, share, and enjoy unlimited times</p>
                    </div>
                  </div>
                </div>

                <div className="email-reminder">
                  <strong>📬 Watch your email inbox</strong>
                  <p>Your custom song will arrive at the email address you provided within 24-48 hours.</p>
                  <p><small>You'll receive an order confirmation shortly. Your completed song follows within 24-48 hours.</small></p>
                </div>
              </div>

              <div className="success-actions">
                <a href="/" className="btn btn-primary">
                  Back to Home
                </a>
                <a href="/play" className="btn btn-secondary">
                  My Songs
                </a>
              </div>

              <div className="social-share-prompt">
                <h3>Love your song? Share it with the world!</h3>
                <p>Tag us <strong>@personalizeonline</strong> on social media for a chance to win a free song credit!</p>
              </div>
            </div>
          </div>

          <style jsx>{`
            .success-section {
              min-height: 80vh;
              display: flex;
              align-items: center;
              padding: 4rem 2rem;
              background: linear-gradient(to bottom, var(--sand), var(--bg));
            }

            .success-content {
              max-width: 700px;
              margin: 0 auto;
              text-align: center;
            }

            .success-icon {
              margin-bottom: 2rem;
              animation: scaleIn 0.5s ease-out;
            }

            @keyframes scaleIn {
              from {
                transform: scale(0);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }

            .success-title {
              font-family: var(--font-serif);
              font-size: clamp(2rem, 5vw, 3rem);
              color: var(--charcoal);
              margin-bottom: 1rem;
            }

            .success-message {
              font-size: 1.2rem;
              color: var(--muted);
              margin-bottom: 3rem;
            }

            .success-card {
              background: var(--card);
              border-radius: 20px;
              padding: 2.5rem;
              margin-bottom: 2rem;
              box-shadow: 0 4px 20px rgba(0,0,0,0.08);
              text-align: left;
            }

            .success-card h2 {
              text-align: center;
              font-size: 1.5rem;
              color: var(--charcoal);
              margin-bottom: 2rem;
            }

            .timeline {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
              margin-bottom: 2rem;
            }

            .timeline-item {
              display: flex;
              gap: 1.5rem;
              align-items: flex-start;
            }

            .timeline-icon {
              flex-shrink: 0;
              width: 50px;
              height: 50px;
              background: linear-gradient(135deg, var(--brand), var(--brand-strong));
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
            }

            .timeline-content h3 {
              font-size: 1.1rem;
              color: var(--brand);
              margin-bottom: 0.25rem;
            }

            .timeline-content p {
              color: var(--muted);
              margin: 0;
            }

            .email-reminder {
              background: rgba(124, 132, 113, 0.1);
              padding: 1.5rem;
              border-radius: 12px;
              border-left: 4px solid var(--brand);
            }

            .email-reminder strong {
              display: block;
              color: var(--charcoal);
              font-size: 1.1rem;
              margin-bottom: 0.5rem;
            }

            .email-reminder p {
              color: var(--muted);
              margin: 0.5rem 0 0;
            }

            .success-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              margin-bottom: 3rem;
            }

            .social-share-prompt {
              padding: 2rem;
              background: linear-gradient(135deg, rgba(124, 132, 113, 0.1), rgba(90, 102, 80, 0.1));
              border-radius: 16px;
            }

            .social-share-prompt h3 {
              font-size: 1.2rem;
              color: var(--charcoal);
              margin-bottom: 0.5rem;
            }

            .social-share-prompt p {
              color: var(--muted);
              margin: 0;
            }

            @media (max-width: 768px) {
              .success-section {
                padding: 3rem 1.5rem;
              }

              .success-card {
                padding: 2rem 1.5rem;
              }

              .success-actions {
                flex-direction: column;
              }

              .success-actions .btn {
                width: 100%;
              }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
