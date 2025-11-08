"use client";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Seo from '@/components/Seo';

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams?.get('message') || 'Payment failed or was cancelled';
  const txnid = searchParams?.get('txnid');
  const errorCode = searchParams?.get('error');

  const getErrorIcon = () => {
    if (message.toLowerCase().includes('cancel')) {
      return (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#FF8C00" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      );
    }
    return (
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    );
  };

  const getErrorTitle = () => {
    if (message.toLowerCase().includes('cancel')) {
      return 'Payment Cancelled';
    }
    if (message.toLowerCase().includes('pending')) {
      return 'Payment Pending';
    }
    return 'Payment Failed';
  };

  return (
    <>
      <Seo />
      <Navbar />
      <main>
        <section className="error-section">
          <div className="container">
            <div className="error-content">
              <div className="error-icon">
                {getErrorIcon()}
              </div>

              <h1 className="error-title">{getErrorTitle()}</h1>
              <p className="error-message">{message}</p>

              {txnid && (
                <div className="transaction-info">
                  <p>
                    <strong>Transaction ID:</strong> {txnid}
                  </p>
                  <small>Save this ID if you need to contact support</small>
                </div>
              )}

              <div className="error-card">
                <h2>What to do next?</h2>

                <div className="options">
                  <div className="option-item">
                    <div className="option-icon">🔄</div>
                    <div className="option-content">
                      <h3>Try Again</h3>
                      <p>Go back and complete your payment with a different method</p>
                    </div>
                  </div>

                  <div className="option-item">
                    <div className="option-icon">💳</div>
                    <div className="option-content">
                      <h3>Check Payment Details</h3>
                      <p>Verify your card details, balance, or try a different payment method</p>
                    </div>
                  </div>

                  <div className="option-item">
                    <div className="option-icon">📧</div>
                    <div className="option-content">
                      <h3>Need Help?</h3>
                      <p>Contact support if you're experiencing technical issues</p>
                    </div>
                  </div>
                </div>

                {errorCode && (
                  <div className="error-code">
                    <small>Error Code: {errorCode}</small>
                  </div>
                )}
              </div>

              <div className="error-actions">
                <a href="/" className="btn btn-primary">
                  Try Again
                </a>
                <a href="/" className="btn btn-secondary">
                  Back to Home
                </a>
              </div>

              <div className="support-info">
                <p>
                  <strong>Having trouble?</strong> We're here to help!
                </p>
                <p>
                  Your cart is saved. You can return anytime to complete your purchase.
                </p>
              </div>
            </div>
          </div>

          <style jsx>{`
            .error-section {
              min-height: 80vh;
              display: flex;
              align-items: center;
              padding: 4rem 2rem;
              background: linear-gradient(to bottom, #FFF5F5, var(--bg));
            }

            .error-content {
              max-width: 700px;
              margin: 0 auto;
              text-align: center;
            }

            .error-icon {
              margin-bottom: 2rem;
              animation: shake 0.5s ease-out;
            }

            @keyframes shake {
              0%, 100% {
                transform: translateX(0);
              }
              25% {
                transform: translateX(-10px);
              }
              75% {
                transform: translateX(10px);
              }
            }

            .error-title {
              font-family: var(--font-serif);
              font-size: clamp(2rem, 5vw, 3rem);
              color: var(--charcoal);
              margin-bottom: 1rem;
            }

            .error-message {
              font-size: 1.2rem;
              color: var(--muted);
              margin-bottom: 1.5rem;
            }

            .transaction-info {
              background: rgba(220, 38, 38, 0.1);
              padding: 1rem 1.5rem;
              border-radius: 12px;
              margin-bottom: 2rem;
              border-left: 4px solid #DC2626;
            }

            .transaction-info p {
              margin: 0;
              color: var(--charcoal);
            }

            .transaction-info strong {
              font-weight: 600;
            }

            .transaction-info small {
              display: block;
              color: var(--muted);
              font-size: 0.85rem;
              margin-top: 0.25rem;
            }

            .error-card {
              background: var(--card);
              border-radius: 20px;
              padding: 2.5rem;
              margin-bottom: 2rem;
              box-shadow: 0 4px 20px rgba(0,0,0,0.08);
              text-align: left;
            }

            .error-card h2 {
              text-align: center;
              font-size: 1.5rem;
              color: var(--charcoal);
              margin-bottom: 2rem;
            }

            .options {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .option-item {
              display: flex;
              gap: 1.5rem;
              align-items: flex-start;
              padding: 1rem;
              background: var(--bg);
              border-radius: 12px;
              transition: transform 0.3s ease;
            }

            .option-item:hover {
              transform: translateX(4px);
            }

            .option-icon {
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

            .option-content h3 {
              font-size: 1.1rem;
              color: var(--charcoal);
              margin-bottom: 0.25rem;
            }

            .option-content p {
              color: var(--muted);
              margin: 0;
              font-size: 0.95rem;
            }

            .error-code {
              text-align: center;
              padding-top: 1rem;
              border-top: 1px solid var(--sand);
            }

            .error-code small {
              color: var(--muted);
              font-family: monospace;
            }

            .error-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              margin-bottom: 3rem;
            }

            .support-info {
              padding: 2rem;
              background: linear-gradient(135deg, rgba(124, 132, 113, 0.1), rgba(90, 102, 80, 0.1));
              border-radius: 16px;
            }

            .support-info p {
              margin: 0.5rem 0;
              color: var(--muted);
            }

            .support-info strong {
              color: var(--charcoal);
            }

            @media (max-width: 768px) {
              .error-section {
                padding: 3rem 1.5rem;
              }

              .error-card {
                padding: 2rem 1.5rem;
              }

              .error-actions {
                flex-direction: column;
              }

              .error-actions .btn {
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

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
