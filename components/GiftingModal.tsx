"use client";
import { useState } from 'react';

interface GiftingModalProps {
  isOpen: boolean;
  onClose: () => void;
  songTitle: string;
  songUrl: string;
  creatorName?: string;
}

export function GiftingModal({
  isOpen,
  onClose,
  songTitle,
  songUrl,
  creatorName
}: GiftingModalProps) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [occasion, setOccasion] = useState('thinking-of-you');
  const [senderName, setSenderName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const occasions = [
    { value: 'thinking-of-you', label: 'Thinking of you', emoji: '💝' },
    { value: 'comfort', label: 'Sending comfort', emoji: '🫂' },
    { value: 'celebration', label: 'Celebrating with you', emoji: '🎉' },
    { value: 'healing', label: 'Wishing you healing', emoji: '🌿' },
    { value: 'birthday', label: 'Happy birthday', emoji: '🎂' },
    { value: 'encouragement', label: 'You\'re in my prayers', emoji: '🙏' },
    { value: 'gratitude', label: 'Grateful for you', emoji: '✨' }
  ];

  const currentOccasion = occasions.find(o => o.value === occasion);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending (in production, this would be an API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would actually send the email via your backend
      console.log('Sending gift:', {
        recipientEmail,
        recipientName,
        personalMessage,
        occasion,
        senderName,
        songTitle,
        songUrl
      });

      setIsSent(true);
    } catch (error) {
      console.error('Failed to send gift:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isSent) {
      setIsSent(false);
      setRecipientEmail('');
      setRecipientName('');
      setPersonalMessage('');
      setSenderName('');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="gifting-modal-overlay" onClick={handleClose}>
      <div className="gifting-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {!isSent ? (
          <div className="gift-form">
            <div className="modal-header">
              <div className="gift-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="16" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 16V10a4 4 0 0 1 8 0v6M32 16V10a4 4 0 0 1 8 0v6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 20h32" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h2>Share This Special Song</h2>
              <p>Send "{songTitle}" to someone who needs to hear it</p>
            </div>

            <form onSubmit={handleSend}>
              <div className="form-section">
                <h3>Who are you sending this to?</h3>

                <div className="form-group">
                  <label htmlFor="recipientName">Their name</label>
                  <input
                    id="recipientName"
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g., Sarah, Mom, John"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recipientEmail">Their email address</label>
                  <input
                    id="recipientEmail"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="their-email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>What's the occasion?</h3>
                <div className="occasion-grid">
                  {occasions.map((occ) => (
                    <label key={occ.value} className="occasion-option">
                      <input
                        type="radio"
                        name="occasion"
                        value={occ.value}
                        checked={occasion === occ.value}
                        onChange={(e) => setOccasion(e.target.value)}
                      />
                      <div className="occasion-card">
                        <span className="occasion-emoji">{occ.emoji}</span>
                        <span className="occasion-label">{occ.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h3>Add a personal message</h3>
                <div className="form-group">
                  <textarea
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder={`I thought you might find peace in this gentle song. ${currentOccasion?.emoji}`}
                    rows={3}
                    maxLength={300}
                  />
                  <div className="char-count">{personalMessage.length}/300</div>
                </div>
              </div>

              <div className="form-section">
                <h3>Sign your gift</h3>
                <div className="form-group">
                  <label htmlFor="senderName">Your name</label>
                  <input
                    id="senderName"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>

              <div className="preview-section">
                <h4>Preview:</h4>
                <div className="email-preview">
                  <p>
                    <strong>Subject:</strong> {currentOccasion?.emoji} {currentOccasion?.label} - A personal song for you
                  </p>
                  <p>
                    <strong>From:</strong> {senderName || 'Your name'}
                  </p>
                  <div className="preview-message">
                    {personalMessage || `${currentOccasion?.label} ${currentOccasion?.emoji}`}
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleClose} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={isLoading} className="btn-primary">
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending Gift...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Send Gift
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="success-state">
            <div className="success-animation">
              <div className="success-circle">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M14 24l8 8 12-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="confetti-particles">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="confetti-particle"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random()}s`
                    }}
                  />
                ))}
              </div>
            </div>

            <h2>Gift Sent Successfully! 🎁</h2>
            <p>
              {recipientName} will receive your thoughtful gift via email shortly.
              <br />
              They'll also get an invitation to create their own personal song.
            </p>

            <div className="success-stats">
              <div className="stat">
                <span className="stat-number">❤️</span>
                <span className="stat-label">Spreading joy</span>
              </div>
              <div className="stat">
                <span className="stat-number">🎵</span>
                <span className="stat-label">One song at a time</span>
              </div>
            </div>

            <button onClick={handleClose} className="btn-primary">
              Create Another Song
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .gifting-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          backdrop-filter: blur(4px);
        }

        .gifting-modal {
          background: var(--soft-white);
          border-radius: 16px;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalSlideIn 0.3s var(--ease-out-quart);
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--warm-gray);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background: var(--sand);
          color: var(--charcoal);
        }

        .modal-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .gift-icon {
          color: var(--rust);
          margin-bottom: 1rem;
        }

        .modal-header h2 {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: var(--charcoal);
          margin-bottom: 0.5rem;
        }

        .modal-header p {
          color: var(--warm-gray);
          font-style: italic;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .form-section h3 {
          font-family: var(--font-sans);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
          position: relative;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--moss);
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--sand);
          border-radius: 8px;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--charcoal);
          background: var(--cream);
          transition: border-color 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--sage);
        }

        .char-count {
          position: absolute;
          bottom: 0.5rem;
          right: 0.75rem;
          font-size: 0.75rem;
          color: var(--warm-gray);
          background: var(--cream);
          padding: 0 0.25rem;
        }

        .occasion-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0.75rem;
        }

        .occasion-option {
          cursor: pointer;
        }

        .occasion-option input {
          position: absolute;
          opacity: 0;
        }

        .occasion-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border: 2px solid var(--sand);
          border-radius: 8px;
          transition: all 0.2s ease;
          background: var(--cream);
        }

        .occasion-option input:checked + .occasion-card {
          border-color: var(--sage);
          background: var(--sage);
          color: white;
        }

        .occasion-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .occasion-emoji {
          font-size: 1.5rem;
        }

        .occasion-label {
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
        }

        .preview-section {
          background: var(--sand);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 2rem;
        }

        .preview-section h4 {
          color: var(--charcoal);
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .email-preview {
          font-size: 0.875rem;
          color: var(--warm-gray);
        }

        .email-preview p {
          margin-bottom: 0.5rem;
        }

        .preview-message {
          background: var(--cream);
          padding: 0.75rem;
          border-radius: 6px;
          margin-top: 0.5rem;
          font-style: italic;
          color: var(--charcoal);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .btn-primary,
        .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-family: var(--font-sans);
        }

        .btn-primary {
          background: var(--charcoal);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--deep-brown);
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: transparent;
          color: var(--charcoal);
          border: 2px solid var(--sand);
        }

        .btn-secondary:hover {
          background: var(--sand);
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .success-state {
          text-align: center;
          padding: 2rem 0;
        }

        .success-animation {
          position: relative;
          margin-bottom: 2rem;
        }

        .success-circle {
          width: 80px;
          height: 80px;
          background: var(--sage);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          animation: successPulse 1s ease-out;
        }

        @keyframes successPulse {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .confetti-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .confetti-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--rust);
          border-radius: 50%;
          animation: confettiFall linear infinite;
        }

        .confetti-particle:nth-child(odd) {
          background: var(--sage);
        }

        @keyframes confettiFall {
          to {
            transform: translateY(100px) rotate(360deg);
            opacity: 0;
          }
        }

        .success-state h2 {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: var(--charcoal);
          margin-bottom: 1rem;
        }

        .success-state p {
          color: var(--warm-gray);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .success-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .stat-number {
          font-size: 2rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--warm-gray);
        }

        @media (max-width: 768px) {
          .gifting-modal {
            padding: 1.5rem;
            margin: 0.5rem;
          }

          .occasion-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .form-actions {
            flex-direction: column;
          }

          .success-stats {
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
}