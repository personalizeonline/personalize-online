"use client";
import { useEffect, useState } from 'react';

export function MidnightSurprise() {
  const [showMidnightMode, setShowMidnightMode] = useState(false);

  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      const hour = now.getHours();

      // Activate between 11:30 PM and 12:30 AM
      if (hour === 23 && now.getMinutes() >= 30) {
        setShowMidnightMode(true);
      } else if (hour === 0 && now.getMinutes() <= 30) {
        setShowMidnightMode(true);
      } else {
        setShowMidnightMode(false);
      }
    };

    checkMidnight();
    const interval = setInterval(checkMidnight, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showMidnightMode) {
      document.body.classList.add('midnight-mode');

      // Add shooting stars
      const createShootingStar = () => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.innerHTML = '✨';
        document.body.appendChild(star);

        setTimeout(() => star.remove(), 3000);
      };

      const starInterval = setInterval(createShootingStar, 5000);

      return () => {
        document.body.classList.remove('midnight-mode');
        clearInterval(starInterval);
      };
    }
  }, [showMidnightMode]);

  if (!showMidnightMode) return null;

  return (
    <div className="midnight-overlay">
      <div className="midnight-message">
        <h3>🌙 Midnight Serenity</h3>
        <p>The world sleeps, but your soul seeks peace...</p>
        <p><em>Perfect time for a gentle lullaby</em></p>
      </div>

      <style jsx global>{`
        .midnight-mode {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%) !important;
          transition: background 2s ease;
        }

        .midnight-mode .nav {
          background: rgba(26, 26, 46, 0.95) !important;
        }

        .midnight-mode .section {
          color: #e8e8ff !important;
        }

        .midnight-mode .headline {
          color: #ffffff !important;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .midnight-mode .brand {
          color: #ffffff !important;
        }

        .midnight-overlay {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(26, 26, 46, 0.9);
          color: white;
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          z-index: 1000;
          animation: fadeInGlow 2s ease-out;
          pointer-events: auto;
        }

        @keyframes fadeInGlow {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
            box-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
          }
        }

        .midnight-message h3 {
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-family: var(--font-serif);
        }

        .midnight-message p {
          margin: 0.5rem 0;
          opacity: 0.9;
        }

        .shooting-star {
          position: fixed;
          top: 10%;
          right: -50px;
          font-size: 20px;
          z-index: 999;
          animation: shootingStar 3s linear forwards;
          pointer-events: none;
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100vw) translateY(50vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}