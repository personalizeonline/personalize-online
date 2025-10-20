"use client";
import { useEffect, useState } from 'react';

export function EngagementTracker() {
  const [sessionTime, setSessionTime] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);

      if (sessionTime % 60 === 0 && sessionTime > 0) {
        const points = Math.floor(sessionTime / 60) * 10;
        localStorage.setItem('engagementPoints', String(points));
      }
    }, 1000);

    const handleInteraction = () => {
      setInteractions(prev => prev + 1);

      // Only show achievement popup for highly engaged users (every 25 interactions)
      if (interactions > 0 && interactions % 25 === 0) {
        const celebration = document.createElement('div');
        celebration.className = 'achievement-popup';
        celebration.innerHTML = `
          <div class="achievement-content">
            <span class="achievement-emoji">🎯</span>
            <span class="achievement-text">You are deeply engaged!</span>
          </div>
        `;
        document.body.appendChild(celebration);
        setTimeout(() => celebration.remove(), 2000);
      }
    };

    const checkDailyStreak = () => {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('lastVisit');
      const currentStreak = parseInt(localStorage.getItem('streak') || '0');

      if (lastVisit !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastVisit === yesterday.toDateString()) {
          setStreak(currentStreak + 1);
          localStorage.setItem('streak', String(currentStreak + 1));
        } else {
          setStreak(1);
          localStorage.setItem('streak', '1');
        }

        localStorage.setItem('lastVisit', today);
      } else {
        setStreak(currentStreak);
      }
    };

    checkDailyStreak();
    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);

    return () => {
      clearInterval(timer);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [sessionTime, interactions]);

  return (
    <div className="engagement-widget">
      <div className="engagement-stat">
        <span className="stat-icon">🔥</span>
        <span className="stat-value">{streak}</span>
        <span className="stat-label">day streak</span>
      </div>
      <div className="engagement-stat">
        <span className="stat-icon">⏱️</span>
        <span className="stat-value">{Math.floor(sessionTime / 60)}</span>
        <span className="stat-label">minutes</span>
      </div>
      <div className="engagement-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min((interactions * 2), 100)}%` }}
          />
        </div>
        <span className="progress-text">Activity Level</span>
      </div>
      <style jsx>{`
        .engagement-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(250,247,242,0.98));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(124, 132, 113, 0.2);
          border-radius: 20px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          z-index: 100;
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .engagement-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .stat-icon {
          font-size: 20px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: var(--brand-strong);
        }

        .stat-label {
          font-size: 10px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .engagement-progress {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 100px;
        }

        .progress-bar {
          height: 6px;
          background: rgba(124, 132, 113, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7C8471, #5A6650);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 10px;
          color: var(--muted);
          text-align: center;
        }

        :global(.achievement-popup) {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10000;
          animation: achievementPop 0.5s ease-out;
        }

        :global(.achievement-content) {
          background: linear-gradient(135deg, #7C8471, #5A6650);
          color: white;
          padding: 20px 30px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        :global(.achievement-emoji) {
          font-size: 30px;
          animation: bounce 0.5s ease-out;
        }

        :global(.achievement-text) {
          font-size: 18px;
          font-weight: 600;
        }

        @keyframes achievementPop {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .engagement-widget {
            bottom: 70px;
            right: 10px;
            padding: 12px 15px;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
}