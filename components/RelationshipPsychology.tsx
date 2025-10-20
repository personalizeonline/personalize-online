"use client";
import { useEffect, useState } from 'react';

export function RelationshipPsychology() {
  const [showRelationship, setShowRelationship] = useState(false);

  const scenarios = [
    {
      icon: '💔',
      trigger: 'Relationship Struggling?',
      pain: 'Arguments draining your connection?',
      solution: 'Send a healing song. 89% report "breakthrough conversations" after',
      urgency: 'Save your relationship tonight',
      cta: 'Create Healing Song'
    },
    {
      icon: '👥',
      trigger: 'Feel Invisible at Work?',
      pain: 'Colleagues ignoring your contributions?',
      solution: 'Confident energy is magnetic. Users report 67% more recognition',
      urgency: 'Transform how people see you',
      cta: 'Build Confidence Now'
    },
    {
      icon: '🏆',
      trigger: 'Want Higher Status?',
      pain: 'Tired of being overlooked?',
      solution: 'Inner peace = Natural leadership. Executives swear by this',
      urgency: 'Join the elite who know',
      cta: 'Access Elite Secret'
    },
    {
      icon: '💝',
      trigger: 'Be the HERO',
      pain: 'Want to be someone\'s lifesaver?',
      solution: 'Gift that saves marriages, heals trauma, stops panic attacks',
      urgency: 'Be their miracle person',
      cta: 'Send Life-Changing Gift'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRelationship(true);
    }, 90000);

    return () => clearTimeout(timer);
  }, []);

  if (!showRelationship) return null;

  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

  return (
    <div className="relationship-psychology">
      <div className="relationship-overlay" onClick={() => setShowRelationship(false)} />
      <div className="relationship-modal">
        <div className="relationship-content">
          <div className="relationship-icon">{scenario.icon}</div>
          <h3 className="relationship-trigger">{scenario.trigger}</h3>
          <p className="relationship-pain">{scenario.pain}</p>
          <div className="relationship-solution">
            <span className="solution-label">The Solution:</span>
            <p>{scenario.solution}</p>
          </div>
          <div className="relationship-urgency">{scenario.urgency}</div>
          <div className="relationship-actions">
            <button className="relationship-cta">
              {scenario.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="relationship-close" onClick={() => setShowRelationship(false)}>
              Maybe Later
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .relationship-psychology {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10000;
        }

        .relationship-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(5px);
        }

        .relationship-modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10001;
          animation: modalPop 0.5s ease-out;
        }

        @keyframes modalPop {
          0% {
            transform: translate(-50%, -50%) scale(0.7) rotate(-5deg);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05) rotate(2deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0);
            opacity: 1;
          }
        }

        .relationship-content {
          background: white;
          padding: 30px;
          border-radius: 20px;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
          border: 3px solid #ef4444;
        }

        .relationship-icon {
          font-size: 48px;
          margin-bottom: 15px;
          animation: iconPulse 2s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .relationship-trigger {
          font-size: 24px;
          font-weight: 800;
          color: #ef4444;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .relationship-pain {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 20px;
          font-style: italic;
        }

        .relationship-solution {
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 15px;
          border-left: 4px solid #10b981;
        }

        .solution-label {
          font-size: 14px;
          font-weight: 700;
          color: #059669;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .relationship-solution p {
          margin-top: 5px;
          color: #065f46;
          font-weight: 600;
        }

        .relationship-urgency {
          font-size: 18px;
          font-weight: 700;
          color: #dc2626;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          animation: urgencyFlash 1.5s ease-in-out infinite;
        }

        @keyframes urgencyFlash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .relationship-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .relationship-cta {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .relationship-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        }

        .relationship-close {
          background: none;
          border: 1px solid #d1d5db;
          color: #6b7280;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .relationship-close:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        @media (max-width: 768px) {
          .relationship-content {
            margin: 20px;
            padding: 25px;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}