"use client";
import { useEffect, useRef, useState } from 'react';
import { GiftingModal } from './GiftingModal';
import { SocialShare } from './SocialShare';

interface CustomAudioPlayerProps {
  src: string;
  title: string;
  name?: string;
  onPlay?: () => void;
  onPause?: () => void;
  showDownload?: boolean;
  downloadUrl?: string;
}

export function CustomAudioPlayer({
  src,
  title,
  name,
  onPlay,
  onPause,
  showDownload = false,
  downloadUrl
}: CustomAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showGiftingModal, setShowGiftingModal] = useState(false);
  const [showSocialShare, setShowSocialShare] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
      onPause?.();
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src, onPause]);

  // Initialize Web Audio API for visualization
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || audioContext) return;

    const initializeAudioContext = async () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = ctx.createMediaElementSource(audio);
        const analyserNode = ctx.createAnalyser();

        analyserNode.fftSize = 256;
        source.connect(analyserNode);
        analyserNode.connect(ctx.destination);

        setAudioContext(ctx);
        setAnalyser(analyserNode);
      } catch (error) {
        console.warn('Web Audio API not supported:', error);
      }
    };

    audio.addEventListener('play', initializeAudioContext, { once: true });

    return () => {
      audio.removeEventListener('play', initializeAudioContext);
    };
  }, [src, audioContext]);

  // Waveform visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;

    if (!canvas || !analyser || !isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const ctx = canvas.getContext('2d')!;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength * 2;
      let x = 0;

      // Create organic-looking bars with natural variation
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

        // Natural color gradient
        const hue = 47 + (i / bufferLength) * 30; // Warm sage to rust tones
        const saturation = 25 + (dataArray[i] / 255) * 20;
        const lightness = 45 + (dataArray[i] / 255) * 15;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);

        x += barWidth;
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, analyser]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioContext?.state === 'suspended') {
      await audioContext.resume();
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        onPlay?.();
      } catch (error) {
        console.error('Playback failed:', error);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress((newTime / duration) * 100);
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - Personalize Online`,
          text: name ? `A personalized song for ${name}` : 'A personalized song crafted just for you',
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="custom-audio-player">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Celebration Elements */}
      <div className="celebration-backdrop">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="celebration-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Player Header with Enhanced Success State */}
      <div className="player-header">
        <div className="success-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {name ? (
          <p className="player-dedication">
            A gentle dedication crafted especially for <span className="dedication-name">{name}</span>
          </p>
        ) : (
          <p className="player-dedication">
            A personal melody crafted just for your heart
          </p>
        )}
        <p className="player-subtitle">{title}</p>
        <div className="ready-message">
          <p>Take a moment to breathe, then press play when you're ready to listen</p>
        </div>
      </div>

      {/* Waveform Visualizer */}
      <div className="waveform-container">
        <canvas
          ref={canvasRef}
          className="waveform-canvas"
          width="400"
          height="120"
        />
        {!isPlaying && !isLoading && (
          <div className="waveform-overlay">
            <div className="static-waveform">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="static-bar"
                  style={{
                    height: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Preparing your song...</p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="progress-container" onClick={handleProgressClick}>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
          <div
            className="progress-handle"
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="player-controls">
        <button
          className="play-button"
          onClick={togglePlayPause}
          disabled={isLoading}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1"/>
              <rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7z" fill="currentColor"/>
            </svg>
          )}
        </button>

        <div className="time-display">
          <span className="current-time">{formatTime(currentTime)}</span>
          <span className="time-separator">/</span>
          <span className="total-time">{formatTime(duration)}</span>
        </div>

        <div className="player-actions">
          {showDownload && downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="action-button download-button"
              title="Download MP3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5"/>
                <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Download
            </a>
          )}

          <button
            onClick={() => setShowSocialShare(!showSocialShare)}
            className="action-button share-button"
            title="Share this song"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" strokeWidth="1.5"/>
              <polyline points="16,6 12,2 8,6" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            {showSocialShare ? 'Hide Sharing' : 'Share'}
          </button>

          <button
            onClick={() => setShowGiftingModal(true)}
            className="action-button gift-button"
            title="Send as a gift"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 8V6a2 2 0 0 1 4 0v2M17 8V6a2 2 0 0 1 4 0v2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Send Gift
          </button>
        </div>
      </div>

      {showSocialShare && (
        <SocialShare
          songTitle={title}
          songUrl={src}
          creatorName={name}
          theme={title.split(' - ')[0] || 'Peace'}
          onShare={(platform) => {
            console.log('Shared on:', platform);
            // Track sharing analytics
          }}
        />
      )}

      <GiftingModal
        isOpen={showGiftingModal}
        onClose={() => setShowGiftingModal(false)}
        songTitle={title}
        songUrl={src}
        creatorName={name}
      />

      <style jsx>{`
        .custom-audio-player {
          background: var(--soft-white);
          border: 1px solid var(--sand);
          border-radius: 16px;
          padding: 2rem;
          margin-top: 2rem;
          box-shadow: 0 8px 32px rgba(44, 40, 37, 0.08);
          animation: slideUpCelebrate 0.8s var(--ease-out-quart);
          position: relative;
          overflow: hidden;
        }

        .celebration-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        .celebration-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--rust);
          border-radius: 50%;
          top: -10px;
          animation: celebrationFall linear infinite;
          opacity: 0.7;
        }

        .celebration-particle:nth-child(2) {
          background: var(--sage);
          width: 6px;
          height: 6px;
        }

        .celebration-particle:nth-child(3) {
          background: var(--moss);
          width: 10px;
          height: 10px;
        }

        .celebration-particle:nth-child(4) {
          background: var(--dusty-rose);
          width: 7px;
          height: 7px;
        }

        .celebration-particle:nth-child(5) {
          background: var(--rust);
          width: 5px;
          height: 5px;
        }

        .celebration-particle:nth-child(6) {
          background: var(--sage);
          width: 9px;
          height: 9px;
        }

        @keyframes celebrationFall {
          to {
            transform: translateY(120vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes slideUpCelebrate {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .player-header {
          text-align: center;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .success-icon {
          color: var(--sage);
          margin: 0 auto 1rem;
          animation: successPulse 2s ease-in-out infinite;
        }

        @keyframes successPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        .player-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--charcoal);
          margin-bottom: 0.5rem;
        }

        .player-dedication {
          font-style: italic;
          color: var(--warm-gray);
          margin-bottom: 0.75rem;
          font-size: 1rem;
          line-height: 1.5;
        }

        .dedication-name {
          color: var(--rust);
          font-weight: 600;
          position: relative;
        }

        .dedication-name::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--rust), transparent);
          opacity: 0.4;
        }

        .ready-message {
          background: linear-gradient(135deg, var(--cream), var(--sand));
          border: 1px solid var(--sand);
          border-radius: 8px;
          padding: 1rem;
          margin-top: 1rem;
        }

        .ready-message p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--warm-gray);
          font-style: italic;
        }

        .player-subtitle {
          color: var(--warm-gray);
          font-size: 0.95rem;
        }

        .waveform-container {
          position: relative;
          height: 120px;
          background: linear-gradient(135deg, var(--cream), var(--sand));
          border-radius: 8px;
          margin-bottom: 1rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .waveform-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        .waveform-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .static-waveform {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 80px;
        }

        .static-bar {
          width: 4px;
          background: var(--sage);
          border-radius: 2px;
          opacity: 0.6;
          animation: gentle-pulse 2s ease-in-out infinite;
        }

        @keyframes gentle-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .loading-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--warm-gray);
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--sand);
          border-top-color: var(--sage);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .progress-container {
          margin-bottom: 1.5rem;
          cursor: pointer;
        }

        .progress-track {
          height: 6px;
          background: var(--sand);
          border-radius: 3px;
          position: relative;
          transition: all 0.2s ease;
        }

        .progress-track:hover {
          height: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--sage), var(--moss));
          border-radius: 3px;
          transition: width 0.1s linear;
        }

        .progress-handle {
          position: absolute;
          top: 50%;
          width: 16px;
          height: 16px;
          background: var(--moss);
          border: 2px solid var(--soft-white);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.2s ease;
          box-shadow: 0 2px 8px rgba(44, 40, 37, 0.2);
        }

        .progress-track:hover .progress-handle {
          opacity: 1;
        }

        .player-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .play-button {
          width: 56px;
          height: 56px;
          background: var(--charcoal);
          color: var(--cream);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s var(--ease-out-quart);
          box-shadow: 0 4px 16px rgba(44, 40, 37, 0.2);
        }

        .play-button:hover:not(:disabled) {
          background: var(--deep-brown);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(44, 40, 37, 0.3);
        }

        .play-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .time-display {
          font-family: var(--font-sans);
          font-weight: 500;
          color: var(--warm-gray);
          font-size: 0.95rem;
          margin-right: auto;
        }

        .time-separator {
          margin: 0 0.5rem;
          opacity: 0.6;
        }

        .player-actions {
          display: flex;
          gap: 1rem;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          color: var(--charcoal);
          border: 1px solid var(--sand);
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-button:hover {
          background: var(--sand);
          border-color: var(--sage);
          transform: translateY(-1px);
        }

        .download-button:hover {
          background: var(--sage);
          color: var(--cream);
          border-color: var(--sage);
        }

        .gift-button:hover {
          background: var(--rust);
          color: var(--cream);
          border-color: var(--rust);
        }

        /* Enhanced Responsive Design */
        @media (min-width: 1200px) {
          .custom-audio-player {
            padding: 3rem;
          }

          .waveform-container {
            height: 120px;
          }
        }

        @media (min-width: 992px) and (max-width: 1199px) {
          .custom-audio-player {
            padding: 2.5rem;
          }

          .waveform-container {
            height: 100px;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .custom-audio-player {
            padding: 2rem;
          }

          .player-controls {
            gap: 1rem;
          }

          .control-button {
            width: 50px;
            height: 50px;
          }

          .play-button {
            width: 60px;
            height: 60px;
          }

          .waveform-container {
            height: 90px;
          }
        }

        @media (min-width: 576px) and (max-width: 767px) {
          .custom-audio-player {
            padding: 1.75rem;
          }

          .player-title {
            font-size: 1.4rem;
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .player-controls {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.75rem;
          }

          .control-button {
            width: 45px;
            height: 45px;
          }

          .play-button {
            width: 55px;
            height: 55px;
          }

          .time-display {
            margin-right: 0;
            order: 3;
            width: 100%;
            text-align: center;
            margin-top: 1rem;
            font-size: 0.9rem;
          }

          .waveform-container {
            height: 80px;
            margin: 1rem 0;
          }

          .player-actions {
            margin-top: 1.25rem;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          .player-actions button {
            flex: 1;
            min-width: 120px;
            max-width: 150px;
          }
        }

        @media (min-width: 480px) and (max-width: 575px) {
          .custom-audio-player {
            padding: 1.5rem;
          }

          .player-title {
            font-size: 1.3rem;
            text-align: center;
            margin-bottom: 1.25rem;
          }

          .player-controls {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .time-display {
            font-size: 0.85rem;
            margin: 0;
          }

          .control-button {
            width: 40px;
            height: 40px;
          }

          .play-button {
            width: 50px;
            height: 50px;
          }

          .waveform-container {
            height: 70px;
            margin: 1rem 0;
          }

          .player-actions {
            flex-direction: column;
            gap: 0.75rem;
            margin-top: 1rem;
          }

          .player-actions button {
            width: 100%;
            padding: 0.875rem;
          }
        }

        @media (max-width: 479px) {
          .custom-audio-player {
            padding: 1.25rem;
          }

          .player-title {
            font-size: 1.2rem;
            text-align: center;
            margin-bottom: 1rem;
            line-height: 1.3;
          }

          .player-controls {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }

          .time-display {
            font-size: 0.8rem;
            margin: 0;
            order: 2;
          }

          .control-button {
            width: 36px;
            height: 36px;
          }

          .play-button {
            width: 45px;
            height: 45px;
          }

          .waveform-container {
            height: 60px;
            margin: 0.75rem 0;
          }

          .player-actions {
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 1rem;
          }

          .player-actions button {
            width: 100%;
            padding: 0.75rem;
            font-size: 0.9rem;
          }

          .share-button svg,
          .gift-button svg {
            width: 16px;
            height: 16px;
          }
        }

        /* Ultra-wide screens */
        @media (min-width: 1600px) {
          .custom-audio-player {
            max-width: 1000px;
            margin: 0 auto;
            padding: 3.5rem;
          }

          .waveform-container {
            height: 140px;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .control-button,
          .play-button {
            min-height: 44px;
            min-width: 44px;
          }

          .player-actions button {
            min-height: 44px;
            padding: 0.875rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}