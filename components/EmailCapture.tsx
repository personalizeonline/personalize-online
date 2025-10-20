"use client";
import { useState } from 'react';

interface EmailCaptureProps {
  trigger: 'first-song' | 'daily-verse' | 'before-play';
  onEmailSubmit: (email: string, preferences: { dailyVerse: boolean; updates: boolean }) => void;
  onSkip?: () => void;
}

export function EmailCapture({ trigger, onEmailSubmit, onSkip }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [dailyVerse, setDailyVerse] = useState(true);
  const [updates, setUpdates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const messages = {
    'first-song': {
      title: 'Your Song is Almost Ready! ✨',
      subtitle: 'Get notified when it\'s finished, plus receive a daily verse song',
      buttonText: 'Get My Song + Daily Verse',
      skipText: 'Just get my song'
    },
    'daily-verse': {
      title: 'Start Your Daily Spiritual Ritual 🌅',
      subtitle: 'Receive a new verse of the day song each morning to center your heart',
      buttonText: 'Yes, Send Daily Verses',
      skipText: 'Maybe later'
    },
    'before-play': {
      title: 'Don\'t Lose This Special Moment 💫',
      subtitle: 'Save this song to your personal library and never miss your daily verse',
      buttonText: 'Save My Songs',
      skipText: 'Play without saving'
    }
  };

  const currentMessage = messages[trigger];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onEmailSubmit(email, { dailyVerse, updates });
      setIsVisible(false);
    } catch (error) {
      console.error('Email submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    onSkip?.();
  };

  if (!isVisible) return null;

  return (
    <div className="email-capture-overlay">
      <div className="email-capture-modal">
        <div className="capture-header">
          <div className="capture-icon">
            {trigger === 'first-song' && (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
                <path d="M18 30V18l12 6-12 6z" fill="currentColor"/>
              </svg>
            )}
            {trigger === 'daily-verse' && (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 18h24M12 24h24M12 30h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
            {trigger === 'before-play' && (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M12 8v32l28-16-28-16z" fill="currentColor"/>
              </svg>
            )}
          </div>
          <h2>{currentMessage.title}</h2>
          <p>{currentMessage.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              required
              className="email-input"
            />
          </div>

          <div className="preferences">
            <label className="preference-item">
              <input
                type="checkbox"
                checked={dailyVerse}
                onChange={(e) => setDailyVerse(e.target.checked)}
              />
              <div className="checkbox-custom"></div>
              <div className="preference-content">
                <span className="preference-title">Daily Verse Songs</span>
                <span className="preference-desc">A new 60-second verse song each morning</span>
              </div>
            </label>

            <label className="preference-item">
              <input
                type="checkbox"
                checked={updates}
                onChange={(e) => setUpdates(e.target.checked)}
              />
              <div className="checkbox-custom"></div>
              <div className="preference-content">
                <span className="preference-title">Occasional Updates</span>
                <span className="preference-desc">New features and seasonal collections</span>
              </div>
            </label>
          </div>

          <div className="capture-actions">
            <button type="submit" disabled={isSubmitting || !email} className="btn-primary">
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Saving...
                </>
              ) : (
                currentMessage.buttonText
              )}
            </button>

            <button type="button" onClick={handleSkip} className="btn-skip">
              {currentMessage.skipText}
            </button>
          </div>
        </form>

        <div className="trust-note">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L10 5h4l-3 3 1 4-4-2-4 2 1-4-3-3h4L8 1z" fill="currentColor"/>
          </svg>
          <span>Unsubscribe anytime. We respect your inbox.</span>
        </div>
      </div>

      <style jsx>{`
        .email-capture-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .email-capture-modal {
          background: var(--soft-white);
          border-radius: 16px;
          padding: 2rem;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s var(--ease-out-quart);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .capture-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .capture-icon {
          color: var(--rust);
          margin-bottom: 1rem;
        }

        .capture-header h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--charcoal);
          margin-bottom: 0.75rem;
        }

        .capture-header p {
          color: var(--warm-gray);
          line-height: 1.6;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .email-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid var(--sand);
          border-radius: 12px;
          font-size: 1rem;
          font-family: var(--font-sans);
          color: var(--charcoal);
          background: var(--cream);
          transition: border-color 0.2s ease;
          text-align: center;
        }

        .email-input:focus {
          outline: none;
          border-color: var(--sage);
        }

        .email-input::placeholder {
          color: var(--warm-gray);
        }

        .preferences {
          margin-bottom: 2rem;
        }

        .preference-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          margin-bottom: 0.75rem;
        }

        .preference-item:hover {
          background: var(--sand);
        }

        .preference-item input {
          position: absolute;
          opacity: 0;
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid var(--sage);
          border-radius: 4px;
          position: relative;
          flex-shrink: 0;
          transition: all 0.2s ease;
          margin-top: 2px;
        }

        .preference-item input:checked + .checkbox-custom {
          background: var(--sage);
          border-color: var(--sage);
        }

        .preference-item input:checked + .checkbox-custom::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 6px;
          width: 6px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .preference-content {
          flex: 1;
        }

        .preference-title {
          display: block;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 0.25rem;
        }

        .preference-desc {
          display: block;
          font-size: 0.875rem;
          color: var(--warm-gray);
          line-height: 1.4;
        }

        .capture-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .btn-primary {
          background: var(--charcoal);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-family: var(--font-sans);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--deep-brown);
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-skip {
          background: transparent;
          color: var(--warm-gray);
          border: none;
          padding: 0.75rem;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: color 0.2s ease;
          text-decoration: underline;
        }

        .btn-skip:hover {
          color: var(--charcoal);
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .trust-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--warm-gray);
          text-align: center;
        }

        .trust-note svg {
          color: var(--rust);
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .email-capture-modal {
            padding: 1.5rem;
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  );
}