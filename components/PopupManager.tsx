"use client";
import { useEffect, useState } from 'react';

interface PopupManagerProps {
  children: React.ReactNode;
}

interface PopupState {
  isActive: boolean;
  currentPopup: string | null;
  userEngagement: number;
  timeOnSite: number;
  popupsShown: string[];
}

export function PopupManager({ children }: PopupManagerProps) {
  const [popupState, setPopupState] = useState<PopupState>({
    isActive: false,
    currentPopup: null,
    userEngagement: 0,
    timeOnSite: 0,
    popupsShown: []
  });

  useEffect(() => {
    let timeTracker = 0;
    let engagementTracker = 0;

    // Track time on site
    const timeInterval = setInterval(() => {
      timeTracker += 1;
      setPopupState(prev => ({ ...prev, timeOnSite: timeTracker }));
    }, 1000);

    // Track user engagement
    const handleEngagement = () => {
      engagementTracker += 1;
      setPopupState(prev => ({ ...prev, userEngagement: engagementTracker }));
    };

    document.addEventListener('click', handleEngagement);
    document.addEventListener('scroll', handleEngagement);

    return () => {
      clearInterval(timeInterval);
      document.removeEventListener('click', handleEngagement);
      document.removeEventListener('scroll', handleEngagement);
    };
  }, []);

  // Smart popup scheduling based on user behavior
  useEffect(() => {
    const { timeOnSite, userEngagement, popupsShown, isActive } = popupState;

    // Don't show popups if one is already active
    if (isActive) return;

    // Progressive popup strategy based on engagement
    let nextPopup: string | null = null;

    if (timeOnSite > 10 && userEngagement > 3 && !popupsShown.includes('onboarding')) {
      nextPopup = 'onboarding';
    } else if (timeOnSite > 30 && userEngagement > 8 && !popupsShown.includes('wealth')) {
      nextPopup = 'wealth';
    } else if (timeOnSite > 60 && userEngagement > 15 && !popupsShown.includes('relationship')) {
      nextPopup = 'relationship';
    } else if (timeOnSite > 90 && userEngagement > 25 && !popupsShown.includes('premium')) {
      nextPopup = 'premium';
    } else if (timeOnSite > 120 && userEngagement > 35 && !popupsShown.includes('survival')) {
      nextPopup = 'survival';
    }

    if (nextPopup) {
      showPopup(nextPopup);
    }
  }, [popupState.timeOnSite, popupState.userEngagement]);

  const showPopup = (popupType: string) => {
    setPopupState(prev => ({
      ...prev,
      isActive: true,
      currentPopup: popupType,
      popupsShown: [...prev.popupsShown, popupType]
    }));

    // Auto-hide after 8 seconds if user doesn't interact
    setTimeout(() => {
      hidePopup();
    }, 8000);
  };

  const hidePopup = () => {
    setPopupState(prev => ({
      ...prev,
      isActive: false,
      currentPopup: null
    }));
  };

  // Provide popup state to child components
  const popupContext = {
    ...popupState,
    showPopup,
    hidePopup
  };

  return (
    <div data-popup-manager="true">
      {children}

      {/* Smart engagement rewards - only show if highly engaged */}
      {popupState.userEngagement > 0 && popupState.userEngagement % 20 === 0 && (
        <div className="smart-achievement">
          <div className="achievement-content">
            <span className="achievement-emoji">🎯</span>
            <span className="achievement-text">
              {popupState.userEngagement > 40 ? "You are in the zone!" : "Great engagement!"}
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        .smart-achievement {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          animation: achievementSlide 0.5s ease-out;
        }

        .achievement-content {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 12px 20px;
          border-radius: 25px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          font-size: 14px;
          font-weight: 600;
        }

        .achievement-emoji {
          font-size: 18px;
        }

        @keyframes achievementSlide {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .smart-achievement {
            top: 10px;
            right: 10px;
            left: 10px;
          }

          .achievement-content {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}