"use client";
import { useEffect, useState } from 'react';

export function SurvivalInstinct() {
  const [showSurvival, setShowSurvival] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const survivalMessages = [
    {
      icon: '💀',
      headline: 'STRESS IS KILLING YOU',
      subtext: 'Literally.',
      facts: [
        'Chronic stress = 50% higher death risk',
        'Cortisol shrinks your brain tissue',
        'Stress ages you 10 years faster'
      ],
      urgency: 'Every day you wait, you lose brain cells',
      cta: 'Save Your Life Now'
    },
    {
      icon: '🚨',
      headline: 'YOUR IMMUNE SYSTEM IS FAILING',
      subtext: 'Right now.',
      facts: [
        'Stress drops immunity by 70%',
        'Higher cancer risk every day',
        'More sick days, shorter lifespan'
      ],
      urgency: 'Your body is crying for help',
      cta: 'Heal Your Immune System'
    },
    {
      icon: '💔',
      headline: 'HEART ATTACK INCOMING',
      subtext: 'Statistics don\'t lie.',
      facts: [
        '3x more likely with chronic stress',
        'Silent killer - no warning signs',
        'Happens to "healthy" people daily'
      ],
      urgency: 'Your heart is under attack',
      cta: 'Protect Your Heart'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSurvival(true);
    }, 150000);

    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % survivalMessages.length);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageTimer);
    };
  }, []);

  if (!showSurvival) return null;

  const message = survivalMessages[currentMessage];

  return (
    <div className="survival-instinct">
      <div className="survival-popup">
        <div className="survival-header">
          <span className="survival-icon">{message.icon}</span>
          <button className="survival-close" onClick={() => setShowSurvival(false)}>×</button>
        </div>

        <div className="survival-content">
          <h2 className="survival-headline">{message.headline}</h2>
          <p className="survival-subtext">{message.subtext}</p>

          <div className="survival-facts">
            {message.facts.map((fact, index) => (
              <div key={index} className="survival-fact">
                <span className="fact-bullet">⚠️</span>
                <span className="fact-text">{fact}</span>
              </div>
            ))}
          </div>

          <div className="survival-urgency">
            <span className="urgency-icon">🚨</span>
            <span className="urgency-text">{message.urgency}</span>
          </div>

          <button className="survival-cta">
            {message.cta}
            <span className="cta-subtext">Before it is too late</span>
          </button>

          <div className="survival-proof">
            <span className="proof-text">12,847 people already saved their health</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .survival-instinct {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: survivalAppear 0.8s ease-out;
        }

        @keyframes survivalAppear {
          0% {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          100% {
            opacity: 1;
            backdrop-filter: blur(5px);
          }
        }

        .survival-popup {
          background: linear-gradient(135deg, #dc2626, #991b1b);
          color: white;
          max-width: 500px;
          width: 90%;
          border-radius: 15px;
          padding: 30px;
          text-align: center;
          position: relative;
          border: 3px solid #fecaca;
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.5);
          animation: popupShake 0.5s ease-out;
        }

        @keyframes popupShake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .survival-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .survival-icon {
          font-size: 48px;
          animation: iconPulse 1s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .survival-close {
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .survival-close:hover {
          background: rgba(255,255,255,0.3);
        }

        .survival-headline {
          font-size: 28px;
          font-weight: 900;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .survival-subtext {
          font-size: 18px;
          margin-bottom: 25px;
          opacity: 0.9;
          font-style: italic;
        }

        .survival-facts {
          background: rgba(0,0,0,0.3);
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          border: 1px solid rgba(254, 202, 202, 0.3);
        }

        .survival-fact {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 600;
        }

        .survival-fact:last-child {
          margin-bottom: 0;
        }

        .fact-bullet {
          font-size: 18px;
          flex-shrink: 0;
        }

        .fact-text {
          text-align: left;
        }

        .survival-urgency {
          background: rgba(239, 68, 68, 0.8);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          animation: urgencyBlink 1.5s ease-in-out infinite;
        }

        @keyframes urgencyBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .urgency-icon {
          font-size: 20px;
        }

        .urgency-text {
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .survival-cta {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: #111827;
          border: none;
          padding: 18px 30px;
          border-radius: 25px;
          font-size: 20px;
          font-weight: 800;
          cursor: pointer;
          margin-bottom: 15px;
          width: 100%;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(251, 191, 36, 0.4);
        }

        .survival-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(251, 191, 36, 0.6);
        }

        .cta-subtext {
          display: block;
          font-size: 12px;
          font-weight: 600;
          margin-top: 5px;
          opacity: 0.8;
        }

        .survival-proof {
          font-size: 14px;
          opacity: 0.8;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .survival-popup {
            padding: 25px;
            margin: 20px;
          }

          .survival-headline {
            font-size: 24px;
          }

          .survival-cta {
            font-size: 18px;
            padding: 15px 25px;
          }
        }
      `}</style>
    </div>
  );
}