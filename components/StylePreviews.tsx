"use client";
import { useRef, useState } from 'react';

interface StylePreview {
  style: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  previewUrl: string; // These would be actual preview URLs in production
  characteristics: string[];
}

const stylePreviews: StylePreview[] = [
  {
    style: 'ambient',
    name: 'Ambient & Atmospheric',
    description: 'Gentle soundscapes with soft textures that create a peaceful, meditative atmosphere',
    icon: '🌊',
    color: '#7C8471',
    previewUrl: '/assets/previews/ambient-preview.mp3',
    characteristics: ['Soft synth pads', 'Natural reverb', 'Flowing textures', 'Deep peace']
  },
  {
    style: 'acoustic',
    name: 'Acoustic & Warm',
    description: 'Intimate guitar and piano melodies that feel like a gentle conversation with a friend',
    icon: '🎸',
    color: '#C67B5C',
    previewUrl: '/assets/previews/acoustic-preview.mp3',
    characteristics: ['Fingerpicked guitar', 'Warm piano', 'Natural harmonics', 'Personal touch']
  },
  {
    style: 'choir',
    name: 'Choir & Harmonic',
    description: 'Layered voices creating celestial harmonies that lift the spirit and inspire worship',
    icon: '🎵',
    color: '#5A6650',
    previewUrl: '/assets/previews/choir-preview.mp3',
    characteristics: ['Angelic voices', 'Sacred harmonies', 'Ethereal blend', 'Uplifting spirit']
  }
];

interface StylePreviewsProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

export function StylePreviews({ selectedStyle, onStyleChange }: StylePreviewsProps) {
  const [playingStyle, setPlayingStyle] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const handlePlay = async (style: string) => {
    // Stop all other audio first
    Object.values(audioRefs.current).forEach(audio => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setPlayingStyle(null);

    const audio = audioRefs.current[style];
    if (audio) {
      try {
        await audio.play();
        setPlayingStyle(style);
      } catch (error) {
        console.error('Audio play failed:', error);
      }
    }
  };

  const handlePause = (style: string) => {
    const audio = audioRefs.current[style];
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlayingStyle(null);
  };

  const handleAudioEnd = () => {
    setPlayingStyle(null);
  };

  const handleStyleSelect = (style: string) => {
    onStyleChange(style);
    // Also stop any playing audio when selecting
    if (playingStyle) {
      handlePause(playingStyle);
    }
  };

  return (
    <div className="style-previews">
      <h3 className="previews-title">Choose your musical style</h3>
      <p className="previews-subtitle">
        Listen to a sample of each style to find what resonates with your heart
      </p>

      <div className="previews-grid">
        {stylePreviews.map((preview) => {
          const isSelected = selectedStyle === preview.style;
          const isPlaying = playingStyle === preview.style;

          return (
            <div
              key={preview.style}
              className={`preview-card ${isSelected ? 'selected' : ''}`}
              style={{ '--accent-color': preview.color } as any}
            >
              <audio
                ref={(el) => {
                  if (el) {
                    audioRefs.current[preview.style] = el;
                  }
                }}
                src={preview.previewUrl}
                onEnded={handleAudioEnd}
                preload="none"
              />

              <div className="preview-header">
                <div className="preview-icon-container">
                  <span className="preview-icon">{preview.icon}</span>
                  {isSelected && (
                    <div className="selected-indicator">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M6 10l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>

                <div className="preview-info">
                  <h4 className="preview-name">{preview.name}</h4>
                  <p className="preview-description">{preview.description}</p>
                </div>
              </div>

              <div className="preview-characteristics">
                {preview.characteristics.map((characteristic, index) => (
                  <span key={index} className="characteristic-tag">
                    {characteristic}
                  </span>
                ))}
              </div>

              <div className="preview-actions">
                <button
                  className={`preview-button ${isPlaying ? 'playing' : ''}`}
                  onClick={() => isPlaying ? handlePause(preview.style) : handlePlay(preview.style)}
                  disabled={playingStyle !== null && playingStyle !== preview.style}
                >
                  {isPlaying ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1"/>
                        <rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1"/>
                      </svg>
                      <span>Pause Preview</span>
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5v14l11-7z" fill="currentColor"/>
                      </svg>
                      <span>Preview Style</span>
                    </>
                  )}
                </button>

                <button
                  className={`select-button ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleStyleSelect(preview.style)}
                >
                  {isSelected ? 'Selected' : 'Select This Style'}
                </button>
              </div>

              {isPlaying && (
                <div className="playing-indicator">
                  <div className="sound-wave">
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </div>
                  <span>Playing preview...</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .style-previews {
          margin: 1.5rem 0;
        }

        .previews-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--charcoal);
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .previews-subtitle {
          color: var(--warm-gray);
          text-align: center;
          margin-bottom: 2rem;
          font-style: italic;
          font-size: 0.95rem;
        }

        .previews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .preview-card {
          background: var(--soft-white);
          border: 2px solid var(--sand);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s var(--ease-out-quart);
          position: relative;
          cursor: pointer;
        }

        .preview-card:hover {
          border-color: var(--accent-color);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(44, 40, 37, 0.1);
        }

        .preview-card.selected {
          border-color: var(--accent-color);
          background: linear-gradient(135deg, var(--soft-white), var(--cream));
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .preview-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .preview-icon-container {
          position: relative;
          flex-shrink: 0;
        }

        .preview-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--sand), var(--cream));
          border-radius: 12px;
          font-size: 1.5rem;
        }

        .selected-indicator {
          position: absolute;
          top: -6px;
          right: -6px;
          width: 20px;
          height: 20px;
          background: var(--accent-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
        }

        .preview-info {
          flex: 1;
        }

        .preview-name {
          font-family: var(--font-sans);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0 0 0.5rem 0;
        }

        .preview-description {
          font-size: 0.875rem;
          color: var(--warm-gray);
          line-height: 1.5;
          margin: 0;
        }

        .preview-characteristics {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .characteristic-tag {
          font-size: 0.75rem;
          background: var(--sand);
          color: var(--charcoal);
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-weight: 500;
        }

        .preview-card.selected .characteristic-tag {
          background: var(--accent-color);
          color: white;
        }

        .preview-actions {
          display: flex;
          gap: 0.75rem;
        }

        .preview-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: transparent;
          color: var(--accent-color);
          border: 1px solid var(--accent-color);
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .preview-button:hover:not(:disabled) {
          background: var(--accent-color);
          color: white;
        }

        .preview-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .preview-button.playing {
          background: var(--accent-color);
          color: white;
        }

        .select-button {
          flex: 1;
          padding: 0.75rem 1rem;
          background: var(--charcoal);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .select-button:hover {
          background: var(--deep-brown);
        }

        .select-button.selected {
          background: var(--accent-color);
        }

        .playing-indicator {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 6px;
          font-size: 0.75rem;
          color: var(--warm-gray);
        }

        .sound-wave {
          display: flex;
          gap: 2px;
        }

        .wave-bar {
          width: 3px;
          height: 12px;
          background: var(--accent-color);
          border-radius: 1px;
          animation: wave 1.2s ease-in-out infinite;
        }

        .wave-bar:nth-child(2) {
          animation-delay: 0.2s;
        }

        .wave-bar:nth-child(3) {
          animation-delay: 0.4s;
        }

        .wave-bar:nth-child(4) {
          animation-delay: 0.6s;
        }

        @keyframes wave {
          0%, 100% {
            transform: scaleY(0.5);
          }
          50% {
            transform: scaleY(1);
          }
        }

        @media (max-width: 768px) {
          .previews-grid {
            grid-template-columns: 1fr;
          }

          .preview-actions {
            flex-direction: column;
          }

          .preview-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}