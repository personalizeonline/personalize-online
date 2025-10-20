"use client";
import { useEffect, useState } from 'react';

export function EasterEggs() {
  const [discoveries, setDiscoveries] = useState<string[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Konami Code: ↑↑↓↓←→←→BA
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  useEffect(() => {
    const savedDiscoveries = JSON.parse(localStorage.getItem('easter_eggs') || '[]');
    setDiscoveries(savedDiscoveries);

    // Konami Code Detection
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami(prev => {
        const newSeq = [...prev, e.code].slice(-10);
        if (JSON.stringify(newSeq) === JSON.stringify(konamiCode)) {
          triggerEasterEgg('konami');
          return [];
        }
        return newSeq;
      });
    };

    // Triple-click detection
    const handleTripleClick = () => {
      const now = Date.now();
      if (now - lastClickTime < 400) {
        setClickCount(prev => prev + 1);
        if (clickCount >= 2) {
          triggerEasterEgg('triple-click');
          setClickCount(0);
        }
      } else {
        setClickCount(1);
      }
      setLastClickTime(now);
    };

    // Time-based easter eggs
    const hour = new Date().getHours();
    if (hour === 11 && new Date().getMinutes() === 11) {
      triggerEasterEgg('wish-time');
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleTripleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleTripleClick);
    };
  }, [clickCount, lastClickTime]);

  const triggerEasterEgg = (eggType: string) => {
    if (discoveries.includes(eggType)) return;

    const newDiscoveries = [...discoveries, eggType];
    setDiscoveries(newDiscoveries);
    localStorage.setItem('easter_eggs', JSON.stringify(newDiscoveries));

    // Show different surprises based on egg type
    switch (eggType) {
      case 'konami':
        activateMatrixMode();
        showNotification('🎮 KONAMI CODE ACTIVATED! Welcome to the Matrix...', 'matrix');
        break;
      case 'triple-click':
        activateRainbowMode();
        showNotification('🌈 RAINBOW MODE UNLOCKED! Triple-click magic discovered!', 'rainbow');
        break;
      case 'wish-time':
        activateWishMode();
        showNotification('✨ 11:11 WISH TIME! Make a wish and let the universe hear your song!', 'wish');
        break;
      case 'logo-click':
        activateHeartMode();
        showNotification('💖 HEARTBEAT MODE! You found the pulse of music!', 'heart');
        break;
    }
  };

  const activateMatrixMode = () => {
    document.body.style.filter = 'hue-rotate(120deg) contrast(1.2)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 10000);
  };

  const activateRainbowMode = () => {
    document.body.style.animation = 'rainbow-pulse 3s ease-in-out';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 3000);
  };

  const activateWishMode = () => {
    createStarfall();
  };

  const activateHeartMode = () => {
    createFloatingHearts();
  };

  const createStarfall = () => {
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.innerHTML = '✨';
      star.style.position = 'fixed';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = '-50px';
      star.style.fontSize = Math.random() * 20 + 20 + 'px';
      star.style.zIndex = '9999';
      star.style.pointerEvents = 'none';
      star.style.animation = `starfall ${Math.random() * 3 + 2}s linear forwards`;
      document.body.appendChild(star);

      setTimeout(() => star.remove(), 5000);
    }
  };

  const createFloatingHearts = () => {
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '💖';
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.bottom = '-50px';
      heart.style.fontSize = Math.random() * 15 + 15 + 'px';
      heart.style.zIndex = '9999';
      heart.style.pointerEvents = 'none';
      heart.style.animation = `float-up ${Math.random() * 4 + 3}s ease-out forwards`;
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 7000);
    }
  };

  const showNotification = (message: string, type: string) => {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, var(--sage), var(--moss));
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: var(--font-sans);
      font-weight: 600;
      max-width: 300px;
      animation: slideInRight 0.5s ease-out forwards;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
      setTimeout(() => notification.remove(), 500);
    }, 4000);
  };

  // Secret Developer Panel
  useEffect(() => {
    if (discoveries.length >= 3) {
      setShowSecret(true);
    }
  }, [discoveries]);

  return (
    <>
      {/* Hidden Logo Click Trigger */}
      <div
        onClick={() => triggerEasterEgg('logo-click')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50px',
          height: '50px',
          opacity: 0,
          cursor: 'pointer',
          zIndex: 1000
        }}
      />

      {/* Secret Developer Panel */}
      {showSecret && (
        <div className="secret-panel">
          <div className="secret-header">
            <h4>🎉 Secret Discoveries ({discoveries.length}/4)</h4>
            <button onClick={() => setShowSecret(false)}>×</button>
          </div>
          <div className="discoveries">
            {discoveries.map(egg => (
              <div key={egg} className="discovery-badge">
                {egg === 'konami' && '🎮 Matrix Mode'}
                {egg === 'triple-click' && '🌈 Rainbow Mode'}
                {egg === 'wish-time' && '✨ Wish Time'}
                {egg === 'logo-click' && '💖 Heartbeat Mode'}
              </div>
            ))}
          </div>
          {discoveries.length === 4 && (
            <div className="master-badge">
              🏆 EASTER EGG MASTER!
              <br />
              <small>You've discovered all the secrets!</small>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes rainbow-pulse {
          0%, 100% { filter: hue-rotate(0deg); }
          25% { filter: hue-rotate(90deg); }
          50% { filter: hue-rotate(180deg); }
          75% { filter: hue-rotate(270deg); }
        }

        @keyframes starfall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float-up {
          to {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .secret-panel {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: linear-gradient(135deg, var(--charcoal), var(--deep-brown));
          color: white;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          z-index: 9999;
          min-width: 250px;
          animation: slideInLeft 0.5s ease-out forwards;
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .secret-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding-bottom: 0.5rem;
        }

        .secret-header h4 {
          margin: 0;
          font-size: 0.9rem;
          font-family: var(--font-sans);
        }

        .secret-header button {
          background: none;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .secret-header button:hover {
          opacity: 1;
        }

        .discoveries {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .discovery-badge {
          background: rgba(255,255,255,0.1);
          padding: 0.5rem;
          border-radius: 6px;
          font-size: 0.8rem;
          border-left: 3px solid var(--sage);
        }

        .master-badge {
          background: linear-gradient(135deg, var(--rust), var(--dusty-rose));
          padding: 0.75rem;
          border-radius: 8px;
          text-align: center;
          margin-top: 0.75rem;
          font-weight: 600;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { box-shadow: 0 0 5px rgba(196, 123, 92, 0.5); }
          to { box-shadow: 0 0 20px rgba(196, 123, 92, 0.8); }
        }
      `}</style>
    </>
  );
}