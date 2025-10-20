"use client";
import { useEffect, useState } from 'react';

interface Notification {
  id: number;
  type: 'success' | 'milestone' | 'reminder' | 'social';
  title: string;
  message: string;
  icon: string;
  timestamp: Date;
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showBell, setShowBell] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowBell(true), 2000);

    const notificationTypes = [
      {
        type: 'milestone' as const,
        title: '🔥 You are on Fire!',
        message: "5 days straight! Your brain is literally rewiring for peace",
        icon: '🏆'
      },
      {
        type: 'reminder' as const,
        title: 'Your Daily Dose is Waiting',
        message: '87% feel withdrawal without their morning listen',
        icon: '📖'
      },
      {
        type: 'social' as const,
        title: 'Sarah just had a breakthrough!',
        message: 'The song you sent made her cry happy tears',
        icon: '💝'
      },
      {
        type: 'success' as const,
        title: 'Your Medicine is Ready!',
        message: '60 seconds to instant calm. Users rate this 9.8/10',
        icon: '✨'
      }
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const notif = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const newNotification: Notification = {
          id: Date.now(),
          ...notif,
          timestamp: new Date()
        };

        setNotifications(prev => [newNotification, ...prev].slice(0, 10));
        setUnreadCount(prev => prev + 1);

        if (!showPanel) {
          showToastNotification(newNotification);
        }

        if (document.hidden) {
          requestNotificationPermission();
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [showPanel]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const showToastNotification = (notif: Notification) => {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${notif.icon}</span>
        <div class="toast-text">
          <div class="toast-title">${notif.title}</div>
          <div class="toast-message">${notif.message}</div>
        </div>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  const togglePanel = () => {
    setShowPanel(!showPanel);
    if (!showPanel) {
      setUnreadCount(0);
    }
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <>
      {showBell && (
        <button className="notification-bell" onClick={togglePanel}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
          )}
        </button>
      )}

      {showPanel && (
        <div className="notification-panel">
          <div className="panel-header">
            <h3>Notifications</h3>
            <button className="clear-btn" onClick={clearAll}>Clear all</button>
          </div>
          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🔔</span>
                <p>No new notifications</p>
              </div>
            ) : (
              notifications.map(notif => (
                <div key={notif.id} className={`notification-item ${notif.type}`}>
                  <span className="notif-icon">{notif.icon}</span>
                  <div className="notif-content">
                    <div className="notif-title">{notif.title}</div>
                    <div className="notif-message">{notif.message}</div>
                    <div className="notif-time">
                      {formatTime(notif.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {showPanel && <div className="overlay" onClick={togglePanel}></div>}

      <style jsx>{`
        .notification-bell {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          background: white;
          border: 1px solid rgba(124, 132, 113, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          z-index: 100;
          transition: all 0.3s ease;
          animation: bellEntrance 0.5s ease-out;
        }

        @keyframes bellEntrance {
          from {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0);
            opacity: 1;
          }
        }

        .notification-bell:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }

        .notification-bell:active {
          transform: scale(0.95);
        }

        .notification-bell svg {
          color: var(--brand);
          animation: ring 4s ease-in-out infinite;
        }

        @keyframes ring {
          0%, 90%, 100% { transform: rotate(0); }
          10%, 30%, 50%, 70% { transform: rotate(-10deg); }
          20%, 40%, 60%, 80% { transform: rotate(10deg); }
        }

        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
          animation: badgePulse 2s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .notification-panel {
          position: fixed;
          top: 80px;
          right: 20px;
          width: 360px;
          max-height: 500px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          z-index: 200;
          animation: panelSlide 0.3s ease-out;
          overflow: hidden;
        }

        @keyframes panelSlide {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .panel-header {
          padding: 20px;
          border-bottom: 1px solid rgba(124, 132, 113, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .panel-header h3 {
          font-size: 18px;
          color: var(--charcoal);
        }

        .clear-btn {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 13px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .clear-btn:hover {
          color: var(--brand);
        }

        .notifications-list {
          max-height: 400px;
          overflow-y: auto;
        }

        .notification-item {
          padding: 15px 20px;
          border-bottom: 1px solid rgba(124, 132, 113, 0.05);
          display: flex;
          gap: 12px;
          transition: background 0.3s ease;
          cursor: pointer;
        }

        .notification-item:hover {
          background: rgba(124, 132, 113, 0.03);
        }

        .notif-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .notif-content {
          flex: 1;
        }

        .notif-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 2px;
        }

        .notif-message {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.4;
        }

        .notif-time {
          font-size: 11px;
          color: var(--fine);
          margin-top: 4px;
        }

        .notification-item.milestone {
          background: linear-gradient(to right, rgba(251, 191, 36, 0.05), transparent);
        }

        .notification-item.social {
          background: linear-gradient(to right, rgba(239, 68, 68, 0.05), transparent);
        }

        .empty-state {
          padding: 60px 20px;
          text-align: center;
        }

        .empty-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 15px;
          opacity: 0.3;
        }

        .empty-state p {
          color: var(--muted);
          font-size: 14px;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.2);
          z-index: 150;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        :global(.toast-notification) {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(-100px);
          z-index: 10000;
          transition: transform 0.3s ease-out;
        }

        :global(.toast-notification.show) {
          transform: translateX(-50%) translateY(0);
        }

        :global(.toast-content) {
          background: white;
          padding: 15px 20px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 300px;
        }

        :global(.toast-icon) {
          font-size: 24px;
        }

        :global(.toast-text) {
          flex: 1;
        }

        :global(.toast-title) {
          font-size: 14px;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 2px;
        }

        :global(.toast-message) {
          font-size: 13px;
          color: var(--muted);
        }

        @media (max-width: 768px) {
          .notification-panel {
            right: 10px;
            left: 10px;
            width: auto;
          }
        }
      `}</style>
    </>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}