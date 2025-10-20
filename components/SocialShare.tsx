"use client";
import { useEffect, useState } from 'react';

interface SocialShareProps {
  songTitle: string;
  songUrl: string;
  creatorName?: string;
  theme: string;
  onShare?: (platform: string) => void;
}

export function SocialShare({ songTitle, songUrl, creatorName, theme, onShare }: SocialShareProps) {
  const [shareData, setShareData] = useState({
    title: '',
    text: '',
    url: '',
    hashtags: ''
  });

  useEffect(() => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/play?song=${encodeURIComponent(songTitle)}`;

    setShareData({
      title: `${songTitle} - Personal Song`,
      text: creatorName
        ? `I found peace in this personal ${theme} song created for ${creatorName}. Create your own at Personalize Online ✨`
        : `I found peace in this personal ${theme} song. Create your own at Personalize Online ✨`,
      url: shareUrl,
      hashtags: 'PersonalizeOnline,PersonalizedSongs,Peace,Healing,Spirituality,Wellness'
    });
  }, [songTitle, songUrl, creatorName, theme]);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url,
        });
        onShare?.('native');
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
      onShare?.('copy');
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handlePlatformShare = (platform: string) => {
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}&hashtags=${shareData.hashtags}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(`${shareData.text}\n\n${shareData.url}`)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      onShare?.(platform);
    }
  };

  const generateSocialCard = () => {
    // This would generate a beautiful social media card image
    // For now, we'll create a simple text-based preview
    return {
      title: shareData.title,
      description: shareData.text,
      image: '/assets/social-card-template.jpg', // You'd generate this dynamically
      url: shareData.url
    };
  };

  return (
    <div className="social-share">
      <h4 className="share-title">Share Your Song</h4>
      <p className="share-subtitle">Spread a moment of peace with others</p>

      {/* Quick Share Options */}
      <div className="quick-share">
        <button onClick={handleNativeShare} className="share-button primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" strokeWidth="2"/>
            <polyline points="16,6 12,2 8,6" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Share Song
        </button>

        <button onClick={handleCopyLink} className="share-button secondary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Copy Link
        </button>
      </div>

      {/* Platform-Specific Sharing */}
      <div className="platform-share">
        <div className="platform-grid">
          <button
            onClick={() => handlePlatformShare('whatsapp')}
            className="platform-button whatsapp"
            title="Share on WhatsApp"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
            </svg>
          </button>

          <button
            onClick={() => handlePlatformShare('twitter')}
            className="platform-button twitter"
            title="Share on Twitter"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>

          <button
            onClick={() => handlePlatformShare('facebook')}
            className="platform-button facebook"
            title="Share on Facebook"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

          <button
            onClick={() => handlePlatformShare('telegram')}
            className="platform-button telegram"
            title="Share on Telegram"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </button>

          <button
            onClick={() => handlePlatformShare('email')}
            className="platform-button email"
            title="Share via Email"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M22 6L12 13 2 6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Share Preview */}
      <div className="share-preview">
        <h5>Preview:</h5>
        <div className="preview-card">
          <div className="preview-content">
            <h6>{shareData.title}</h6>
            <p>{shareData.text}</p>
            <span className="preview-url">{shareData.url}</span>
          </div>
          <div className="preview-image">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect width="60" height="60" rx="8" fill="var(--sand)"/>
              <path d="M20 40V20l20 10-20 10z" fill="var(--sage)"/>
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-share {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--cream);
          border-radius: 12px;
          border: 1px solid var(--sand);
        }

        .share-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--charcoal);
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .share-subtitle {
          color: var(--warm-gray);
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .quick-share {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .share-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-family: var(--font-sans);
        }

        .share-button.primary {
          background: var(--sage);
          color: white;
        }

        .share-button.primary:hover {
          background: var(--moss);
          transform: translateY(-1px);
        }

        .share-button.secondary {
          background: transparent;
          color: var(--charcoal);
          border: 2px solid var(--sand);
        }

        .share-button.secondary:hover {
          background: var(--sand);
        }

        .platform-share {
          margin-bottom: 2rem;
        }

        .platform-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }

        .platform-button {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .platform-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .platform-button.whatsapp {
          background: #25D366;
          color: white;
        }

        .platform-button.twitter {
          background: #1DA1F2;
          color: white;
        }

        .platform-button.facebook {
          background: #1877F2;
          color: white;
        }

        .platform-button.telegram {
          background: #0088CC;
          color: white;
        }

        .platform-button.email {
          background: var(--charcoal);
          color: white;
        }

        .share-preview {
          background: var(--soft-white);
          border-radius: 8px;
          padding: 1rem;
        }

        .share-preview h5 {
          color: var(--charcoal);
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .preview-card {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--sand);
          border-radius: 6px;
          background: var(--cream);
        }

        .preview-content {
          flex: 1;
        }

        .preview-content h6 {
          color: var(--charcoal);
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .preview-content p {
          color: var(--warm-gray);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .preview-url {
          color: var(--sage);
          font-size: 0.8rem;
          font-weight: 500;
        }

        .preview-image {
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .quick-share {
            flex-direction: column;
          }

          .platform-grid {
            grid-template-columns: repeat(3, 1fr);
            justify-items: center;
          }

          .preview-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}