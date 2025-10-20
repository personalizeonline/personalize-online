"use client";
import { useEffect, useState } from 'react';

export function SocialProof() {
  const [liveCount, setLiveCount] = useState(247);
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  const names = ['Sarah', 'Michael', 'Emma', 'James', 'Olivia', 'William', 'Sophia', 'Benjamin', 'Isabella', 'Lucas'];
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const actions = [
    'just had their breakthrough moment',
    'says "I can\'t stop listening"',
    'reports instant anxiety relief',
    'felt peace for the first time today',
    'discovered their audio medicine',
    'is on a 7-day streak',
    'shared with 5 friends already',
    'calls this their "secret weapon"'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 3) - 1);

      if (Math.random() > 0.7) {
        const name = names[Math.floor(Math.random() * names.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const timeAgo = Math.floor(Math.random() * 10) + 1;

        const activity = `${name} from ${location} ${action} ${timeAgo} min ago`;

        setRecentActivity(prev => [activity, ...prev.slice(0, 2)]);
        setShowNotification(true);

        setTimeout(() => setShowNotification(false), 5000);
      }
    }, 8000);

    const pulseInterval = setInterval(() => {
      const viewers = document.querySelector('.live-viewers');
      if (viewers) {
        viewers.classList.add('pulse');
        setTimeout(() => viewers?.classList.remove('pulse'), 1000);
      }
    }, 15000);

    return () => {
      clearInterval(interval);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <>
      <div className="social-proof-bar">
        <div className="live-viewers">
          <span className="live-dot"></span>
          <span className="live-count" suppressHydrationWarning>{liveCount.toLocaleString()}</span>
          <span className="live-text">listening now</span>
        </div>
        <div className="trust-badges">
          <div className="badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>4.9/5 rating</span>
          </div>
          <div className="badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
            </svg>
            <span>12k+ happy listeners</span>
          </div>
        </div>
      </div>

      {showNotification && recentActivity.length > 0 && (
        <div className="activity-notification">
          <div className="notification-content">
            <span className="notification-icon">✨</span>
            <span className="notification-text">{recentActivity[0]}</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .social-proof-bar {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(124, 132, 113, 0.15);
          border-radius: 50px;
          padding: 8px 20px;
          display: flex;
          align-items: center;
          gap: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          z-index: 115;
          animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        .live-viewers {
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .live-viewers.pulse {
          animation: viewerPulse 1s ease-out;
        }

        @keyframes viewerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: livePulse 2s infinite;
        }

        @keyframes livePulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        .live-count {
          font-weight: 700;
          color: var(--brand-strong);
          font-size: 14px;
        }

        .live-text {
          font-size: 12px;
          color: var(--muted);
        }

        .trust-badges {
          display: flex;
          gap: 20px;
        }

        .badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--muted);
        }

        .badge svg {
          stroke: #f59e0b;
        }

        .activity-notification {
          position: fixed;
          bottom: 100px;
          left: 20px;
          z-index: 95;
          animation: slideInLeft 0.5s ease-out;
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .notification-content {
          background: linear-gradient(135deg, rgba(124, 132, 113, 0.95), rgba(90, 102, 80, 0.95));
          color: white;
          padding: 12px 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          max-width: 300px;
        }

        .notification-icon {
          font-size: 16px;
        }

        .notification-text {
          font-size: 13px;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .social-proof-bar {
            top: 90px;
            bottom: auto;
            padding: 6px 15px;
            gap: 15px;
            flex-direction: row;
            font-size: 12px;
          }

          .trust-badges {
            flex-direction: column;
            gap: 8px;
          }

          .activity-notification {
            left: 10px;
            right: 10px;
            bottom: 200px;
          }

          .notification-content {
            max-width: none;
          }
        }
      `}</style>
    </>
  );
}