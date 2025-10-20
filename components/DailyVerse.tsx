"use client";
import { useEffect, useState } from 'react';

interface DailyVerseData {
  date: string;
  verse: {
    text: string;
    reference: string;
  };
  theme: string;
  songUrl: string;
  reflection: string;
}

export function DailyVerse() {
  const [verseData, setVerseData] = useState<DailyVerseData | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user is subscribed to daily verse
    const email = localStorage.getItem('user_email');
    const dailyVerseSubscribed = localStorage.getItem('daily_verse_subscribed') === 'true';

    setUserEmail(email || '');
    setIsSubscribed(dailyVerseSubscribed);

    // Fetch today's verse data
    fetchTodaysVerse();
  }, []);

  const fetchTodaysVerse = async () => {
    try {
      // In production, this would fetch from your API
      // For now, we'll use sample data that changes daily
      const today = new Date().toISOString().split('T')[0];

      const sampleVerses: DailyVerseData[] = [
        {
          date: today,
          verse: {
            text: "Be still, and know that I am God",
            reference: "Psalm 46:10"
          },
          theme: "Peace",
          songUrl: "/assets/daily-verse/peace-today.mp3",
          reflection: "In the quiet moments, we find strength. Today, take time to simply be present and feel the peace that comes from knowing you are held and loved."
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setVerseData(sampleVerses[0]);
    } catch (error) {
      console.error('Failed to fetch daily verse:', error);
    }
  };

  const handleEmailSubmit = async (email: string) => {
    try {
      // In production, subscribe user to daily verse emails
      localStorage.setItem('user_email', email);
      localStorage.setItem('daily_verse_subscribed', 'true');
      setUserEmail(email);
      setIsSubscribed(true);

      console.log('Subscribed to daily verse:', email);
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  if (!verseData) {
    return (
      <div className="daily-verse-loading">
        <div className="loading-spinner"></div>
        <p>Loading today's verse...</p>

        <style jsx>{`
          .daily-verse-loading {
            text-align: center;
            padding: 2rem;
            color: var(--warm-gray);
          }

          .loading-spinner {
            width: 32px;
            height: 32px;
            border: 3px solid var(--sand);
            border-top-color: var(--sage);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <section id="daily-verse" className="daily-verse-section">
      <div className="container narrow">
        <div className="verse-header">
          <div className="date-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Today's Verse</span>
          </div>
          <h2>Daily Spiritual Companion</h2>
          <p>Start your day with a moment of peace and reflection</p>
        </div>

        <div className="verse-card">
          <div className="verse-content">
            <blockquote className="verse-text">
              "{verseData.verse.text}"
            </blockquote>
            <cite className="verse-reference">— {verseData.verse.reference}</cite>
          </div>

          <div className="theme-tag">
            <span className="theme-icon">🌿</span>
            <span>Today's Theme: {verseData.theme}</span>
          </div>

          <div className="reflection-text">
            <h4>Moment of Reflection</h4>
            <p>{verseData.reflection}</p>
          </div>

        </div>

        {!isSubscribed && (
          <div className="subscription-prompt">
            <div className="prompt-content">
              <h3>Never Miss Your Daily Verse 📧</h3>
              <p>Get a new verse song delivered to your inbox each morning to start your day with intention</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as any).email.value;
                  handleEmailSubmit(email);
                }}
                className="subscription-form"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="your-email@example.com"
                  required
                  className="email-input"
                />
                <button type="submit" className="subscribe-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Get Daily Verses
                </button>
              </form>

              <div className="subscription-benefits">
                <div className="benefit">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M7 10l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>New verse song every morning</span>
                </div>
                <div className="benefit">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M7 10l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Downloadable for offline listening</span>
                </div>
                <div className="benefit">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M7 10l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isSubscribed && (
          <div className="subscriber-message">
            <div className="success-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h4>You're all set! 🎉</h4>
            <p>Your daily verse will arrive in your inbox each morning at 7:00 AM</p>
            <p className="subscriber-email">Sending to: {userEmail}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .daily-verse-section {
          padding: var(--space-lg) 0;
          background: linear-gradient(135deg, var(--soft-white) 0%, var(--cream) 100%);
          border-top: 1px solid var(--sand);
        }

        .verse-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .date-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--sage);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .verse-header h2 {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 400;
          color: var(--charcoal);
          margin-bottom: 0.75rem;
        }

        .verse-header p {
          color: var(--warm-gray);
          font-size: 1.125rem;
        }

        .verse-card {
          background: var(--soft-white);
          border: 2px solid var(--sand);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px rgba(44, 40, 37, 0.08);
        }

        .verse-content {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .verse-text {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-style: italic;
          color: var(--charcoal);
          line-height: 1.6;
          margin: 0 0 1rem 0;
          position: relative;
        }

        .verse-text::before {
          content: '"';
          font-size: 4rem;
          color: var(--rust);
          position: absolute;
          top: -1rem;
          left: -2rem;
          opacity: 0.3;
        }

        .verse-reference {
          color: var(--sage);
          font-weight: 600;
          font-style: normal;
        }

        .theme-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 0.75rem;
          background: linear-gradient(135deg, var(--sand), var(--cream));
          border-radius: 8px;
          font-weight: 500;
          color: var(--charcoal);
        }

        .theme-icon {
          font-size: 1.25rem;
        }

        .reflection-text {
          background: var(--cream);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .reflection-text h4 {
          color: var(--charcoal);
          margin-bottom: 0.75rem;
          font-family: var(--font-sans);
          font-weight: 600;
        }

        .reflection-text p {
          color: var(--warm-gray);
          line-height: 1.7;
          margin: 0;
          font-style: italic;
        }

        .subscription-prompt {
          background: linear-gradient(135deg, var(--sage), var(--moss));
          color: white;
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          margin-top: 2rem;
        }

        .prompt-content h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .prompt-content p {
          margin-bottom: 1.5rem;
          opacity: 0.9;
          line-height: 1.6;
        }

        .subscription-form {
          display: flex;
          gap: 1rem;
          max-width: 400px;
          margin: 0 auto 2rem;
        }

        .email-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-family: var(--font-sans);
        }

        .email-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .email-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.5);
        }

        .subscribe-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--charcoal);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .subscribe-btn:hover {
          background: var(--deep-brown);
          transform: translateY(-1px);
        }

        .subscription-benefits {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .benefit {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .benefit svg {
          color: var(--cream);
          flex-shrink: 0;
        }

        .subscriber-message {
          text-align: center;
          padding: 2rem;
          background: var(--cream);
          border: 2px solid var(--sage);
          border-radius: 16px;
          margin-top: 2rem;
        }

        .success-icon {
          color: var(--sage);
          margin-bottom: 1rem;
        }

        .subscriber-message h4 {
          color: var(--charcoal);
          margin-bottom: 0.75rem;
        }

        .subscriber-message p {
          color: var(--warm-gray);
          margin-bottom: 0.5rem;
        }

        .subscriber-email {
          font-weight: 600;
          color: var(--charcoal);
        }

        @media (max-width: 768px) {
          .subscription-form {
            flex-direction: column;
          }

          .subscription-benefits {
            grid-template-columns: 1fr;
          }

          .verse-text {
            font-size: 1.25rem;
          }

          .verse-text::before {
            font-size: 3rem;
            left: -1rem;
          }
        }
      `}</style>
    </section>
  );
}