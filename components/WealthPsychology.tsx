"use client";
import { useEffect, useState } from 'react';

export function WealthPsychology() {
  const [showWealth, setShowWealth] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const wealthTips = [
    {
      icon: '💰',
      title: 'High Performers Secret',
      message: 'CEOs spend $500/month on stress management. You found their secret for $12.99',
      highlight: '$500 vs $12.99'
    },
    {
      icon: '🧠',
      title: 'Mental Clarity = More Money',
      message: 'Reduced stress = 31% better decision making = Higher income potential',
      highlight: '31% Performance Boost'
    },
    {
      icon: '⏰',
      title: 'Time is Money',
      message: 'Stop wasting $200/hour therapy time. Get instant relief in 60 seconds',
      highlight: 'Save $200/hour'
    },
    {
      icon: '📈',
      title: 'ROI on Peace',
      message: 'Calm mind = Better negotiations. Users report 23% salary increase within 6 months',
      highlight: '23% Salary Boost'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowWealth(true), 45000);

    const cycleTimer = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % wealthTips.length);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(cycleTimer);
    };
  }, []);

  if (!showWealth) return null;

  const tip = wealthTips[currentTip];

  return (
    <div className="wealth-psychology">
      <div className="wealth-content">
        <span className="wealth-icon">{tip.icon}</span>
        <div className="wealth-text">
          <div className="wealth-title">{tip.title}</div>
          <div className="wealth-message">{tip.message}</div>
          <div className="wealth-highlight">{tip.highlight}</div>
        </div>
        <button className="wealth-close" onClick={() => setShowWealth(false)}>×</button>
      </div>

      <style jsx>{`
        .wealth-psychology {
          position: fixed;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          z-index: 150;
          animation: slideInRight 0.5s ease-out;
        }

        @keyframes slideInRight {
          from {
            transform: translateY(-50%) translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateY(-50%) translateX(0);
            opacity: 1;
          }
        }

        .wealth-content {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 20px;
          border-radius: 15px;
          max-width: 280px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          position: relative;
          border: 2px solid #fbbf24;
        }

        .wealth-content::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #fbbf24, #f59e0b, #d97706, #fbbf24);
          border-radius: 15px;
          z-index: -1;
          animation: goldShimmer 2s linear infinite;
        }

        @keyframes goldShimmer {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        .wealth-icon {
          font-size: 28px;
          display: block;
          margin-bottom: 10px;
          text-align: center;
        }

        .wealth-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          text-align: center;
        }

        .wealth-message {
          font-size: 13px;
          line-height: 1.4;
          margin-bottom: 8px;
          text-align: center;
        }

        .wealth-highlight {
          font-size: 14px;
          font-weight: 800;
          text-align: center;
          background: rgba(255,255,255,0.2);
          padding: 5px 10px;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .wealth-close {
          position: absolute;
          top: 8px;
          right: 12px;
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.3s ease;
        }

        .wealth-close:hover {
          background: rgba(255,255,255,0.2);
        }

        @media (max-width: 768px) {
          .wealth-psychology {
            right: 10px;
            left: 10px;
            transform: translateY(-50%);
          }

          .wealth-content {
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}