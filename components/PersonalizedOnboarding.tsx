"use client";
import { useEffect, useState } from 'react';

interface UserPreferences {
  name?: string;
  purposes: string[];
  musicStyle?: string;
  frequency?: string;
}

export function PersonalizedOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    purposes: []
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('hasOnboarded');
    if (!hasOnboarded) {
      setTimeout(() => setShowOnboarding(true), 2000);
    }
  }, []);

  useEffect(() => {
    setProgress((step - 1) * 25);
  }, [step]);

  const completeOnboarding = () => {
    localStorage.setItem('hasOnboarded', 'true');
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setShowOnboarding(false);

    const celebration = document.createElement('div');
    celebration.className = 'onboarding-complete';
    celebration.innerHTML = `
      <div class="celebration-content">
        <span class="celebration-emoji">🎉</span>
        <h3>You are In! Welcome to Your New Addiction</h3>
        <p>${preferences.name || 'Legend'}, your brain is about to thank you. Daily peace incoming...</p>
      </div>
    `;
    document.body.appendChild(celebration);
    setTimeout(() => celebration.remove(), 4000);
  };

  const handlePurposeToggle = (purpose: string) => {
    setPreferences(prev => ({
      ...prev,
      purposes: prev.purposes.includes(purpose)
        ? prev.purposes.filter(p => p !== purpose)
        : [...prev.purposes, purpose]
    }));
  };

  if (!showOnboarding) return null;

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {step === 1 && (
          <div className="onboarding-step">
            <h2>🚨 Stop! Before You Continue...</h2>
            <p>What we're about to show you has a 97% addiction rate. Enter your name to unlock your personalized audio medicine:</p>
            <input
              type="text"
              placeholder="Your name"
              className="onboarding-input"
              value={preferences.name || ''}
              onChange={e => setPreferences(prev => ({ ...prev, name: e.target.value }))}
              onKeyPress={e => e.key === 'Enter' && setStep(2)}
            />
            <button className="onboarding-btn" onClick={() => setStep(2)}>
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="skip-btn" onClick={() => setStep(2)}>
              Skip for now
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <h2>{preferences.name || 'Friend'}, what's keeping you up at night?</h2>
            <p>Choose your struggle. We've helped 12,847 others conquer theirs:</p>
            <div className="purpose-grid">
              {['Prayer', 'Meditation', 'Gratitude', 'Healing', 'Focus', 'Sleep', 'Comfort', 'Joy'].map(purpose => (
                <button
                  key={purpose}
                  className={`purpose-card ${preferences.purposes.includes(purpose) ? 'selected' : ''}`}
                  onClick={() => handlePurposeToggle(purpose)}
                >
                  <span className="purpose-icon">
                    {purpose === 'Prayer' && '🙏'}
                    {purpose === 'Meditation' && '🧘'}
                    {purpose === 'Gratitude' && '💝'}
                    {purpose === 'Healing' && '💚'}
                    {purpose === 'Focus' && '🎯'}
                    {purpose === 'Sleep' && '😴'}
                    {purpose === 'Comfort' && '🤗'}
                    {purpose === 'Joy' && '😊'}
                  </span>
                  <span className="purpose-name">{purpose}</span>
                </button>
              ))}
            </div>
            <button
              className="onboarding-btn"
              onClick={() => setStep(3)}
              disabled={preferences.purposes.length === 0}
            >
              Continue ({preferences.purposes.length} selected)
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step">
            <h2>Which Sound Triggers Your Brain's Peace Response?</h2>
            <p>Science shows different frequencies heal different people:</p>
            <div className="style-options">
              {['Gentle Piano', 'Ambient Nature', 'Classical Strings', 'Modern Worship'].map(style => (
                <button
                  key={style}
                  className={`style-card ${preferences.musicStyle === style ? 'selected' : ''}`}
                  onClick={() => setPreferences(prev => ({ ...prev, musicStyle: style }))}
                >
                  <span className="style-icon">
                    {style === 'Gentle Piano' && '🎹'}
                    {style === 'Ambient Nature' && '🌿'}
                    {style === 'Classical Strings' && '🎻'}
                    {style === 'Modern Worship' && '🎵'}
                  </span>
                  <span className="style-name">{style}</span>
                </button>
              ))}
            </div>
            <button
              className="onboarding-btn"
              onClick={() => setStep(4)}
              disabled={!preferences.musicStyle}
            >
              Continue
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="onboarding-step">
            <h2>Last Question: How Addicted Do You Want to Be?</h2>
            <p>87% choose daily. They report \"cannot imagine life without it\" after week 1:</p>
            <div className="frequency-options">
              {['Daily', 'Weekly', 'Occasionally', 'Never'].map(freq => (
                <button
                  key={freq}
                  className={`frequency-card ${preferences.frequency === freq ? 'selected' : ''}`}
                  onClick={() => setPreferences(prev => ({ ...prev, frequency: freq }))}
                >
                  {freq}
                </button>
              ))}
            </div>
            <button
              className="onboarding-btn primary"
              onClick={completeOnboarding}
              disabled={!preferences.frequency}
            >
              Start My Journey
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .onboarding-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .onboarding-modal {
          background: white;
          border-radius: 20px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .progress-bar {
          height: 4px;
          background: rgba(124, 132, 113, 0.1);
          border-radius: 20px 20px 0 0;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7C8471, #5A6650);
          transition: width 0.5s ease-out;
        }

        .onboarding-step {
          padding: 40px;
          text-align: center;
        }

        .onboarding-step h2 {
          font-family: var(--font-serif);
          font-size: 28px;
          color: var(--charcoal);
          margin-bottom: 10px;
        }

        .onboarding-step p {
          color: var(--muted);
          margin-bottom: 30px;
        }

        .onboarding-input {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid rgba(124, 132, 113, 0.2);
          border-radius: 10px;
          font-size: 16px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .onboarding-input:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(124, 132, 113, 0.1);
        }

        .onboarding-btn {
          background: var(--brand);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .onboarding-btn:hover:not(:disabled) {
          background: var(--brand-strong);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .onboarding-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .onboarding-btn.primary {
          background: linear-gradient(135deg, #7C8471, #5A6650);
        }

        .skip-btn {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 14px;
          margin-top: 15px;
          cursor: pointer;
          text-decoration: underline;
        }

        .purpose-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .purpose-card {
          background: white;
          border: 2px solid rgba(124, 132, 113, 0.2);
          border-radius: 15px;
          padding: 20px 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .purpose-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .purpose-card.selected {
          background: var(--brand);
          color: white;
          border-color: var(--brand);
          animation: selectPop 0.3s ease-out;
        }

        @keyframes selectPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .purpose-icon {
          font-size: 28px;
        }

        .purpose-name {
          font-size: 14px;
          font-weight: 500;
        }

        .style-options, .frequency-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .style-card, .frequency-card {
          background: white;
          border: 2px solid rgba(124, 132, 113, 0.2);
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .style-card:hover, .frequency-card:hover {
          border-color: var(--brand);
          transform: translateY(-2px);
        }

        .style-card.selected, .frequency-card.selected {
          background: var(--brand);
          color: white;
          border-color: var(--brand);
        }

        .style-icon {
          font-size: 32px;
        }

        .style-name {
          font-size: 14px;
          font-weight: 500;
        }

        :global(.onboarding-complete) {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10001;
          animation: celebrationPop 0.5s ease-out;
        }

        :global(.celebration-content) {
          background: linear-gradient(135deg, #7C8471, #5A6650);
          color: white;
          padding: 30px 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        :global(.celebration-emoji) {
          font-size: 48px;
          display: block;
          margin-bottom: 15px;
          animation: celebrationBounce 1s ease-out;
        }

        :global(.celebration-content h3) {
          font-size: 24px;
          margin-bottom: 10px;
        }

        :global(.celebration-content p) {
          font-size: 16px;
          opacity: 0.9;
        }

        @keyframes celebrationPop {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1) rotate(10deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0);
            opacity: 1;
          }
        }

        @keyframes celebrationBounce {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-20px); }
          50% { transform: translateY(-10px); }
          75% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}