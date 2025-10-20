"use client";
import { useEffect, useState } from 'react';

interface Song {
  id: number;
  title: string;
  purpose: string;
  plays: number;
  likes: number;
  duration: string;
  isLiked?: boolean;
}

export function RecommendationFeed() {
  const [songs, setSongs] = useState<Song[]>([]);

  const purposes = ['Peace', 'Healing', 'Gratitude', 'Focus', 'Comfort', 'Birthday', 'Anniversary'];

  const generateSongs = (): Song[] => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      title: `Personalized ${purposes[Math.floor(Math.random() * purposes.length)]} Song`,
      purpose: purposes[Math.floor(Math.random() * purposes.length)],
      plays: Math.floor(Math.random() * 10000) + 1000,
      likes: Math.floor(Math.random() * 1000) + 100,
      duration: `${Math.floor(Math.random() * 30) + 60}s`,
      isLiked: false
    }));
  };

  useEffect(() => {
    setSongs(generateSongs());
  }, []);

  const handleLike = (id: number) => {
    setSongs(prev => prev.map(song => {
      if (song.id === id) {
        const newLikes = song.isLiked ? song.likes - 1 : song.likes + 1;
        return { ...song, isLiked: !song.isLiked, likes: newLikes };
      }
      return song;
    }));

    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 100}%`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  };

  const handlePlay = (song: Song) => {
    setSongs(prev => prev.map(s =>
      s.id === song.id ? { ...s, plays: s.plays + 1 } : s
    ));
  };

  return (
    <section className="recommendation-feed">
      <div className="container">
        <div className="feed-header">
          <h2>🔥 What 12,847 Others Are Obsessed With Right Now</h2>
          <p>Warning: Scrolling may cause uncontrollable peace and repeated listening</p>
          <div className="feed-tabs">
            <button className="tab active">🎯 For You</button>
            <button className="tab">🔥 Viral Now</button>
            <button className="tab">⚡ Just Dropped</button>
            <button className="tab">💝 Most Addictive</button>
          </div>
        </div>

        <div className="songs-grid">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <div className="song-visual">
                <div className="song-waveform">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className="wave-bar"
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
                <button className="play-btn" onClick={() => handlePlay(song)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>

              <div className="song-info">
                <h3>{song.title}</h3>
                <span className="song-purpose">{song.purpose}</span>
              </div>

              <div className="song-stats">
                <div className="stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                  </svg>
                  <span>{song.plays.toLocaleString()}</span>
                </div>
                <div className="stat">
                  <button
                    className={`like-btn ${song.isLiked ? 'liked' : ''}`}
                    onClick={() => handleLike(song.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={song.isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>{song.likes.toLocaleString()}</span>
                  </button>
                </div>
                <div className="stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{song.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .recommendation-feed {
          padding: var(--space-lg) 0;
          background: linear-gradient(to bottom, var(--bg), var(--sand));
          position: relative;
        }

        .feed-header {
          text-align: center;
          margin-bottom: var(--space-md);
        }

        .feed-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--charcoal);
          margin-bottom: 0.5rem;
        }

        .feed-header p {
          color: var(--muted);
          margin-bottom: var(--space-sm);
        }

        .feed-tabs {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: var(--space-sm);
        }

        .tab {
          padding: 8px 20px;
          border: 1px solid rgba(124, 132, 113, 0.2);
          background: transparent;
          border-radius: 20px;
          font-size: 14px;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab:hover {
          background: rgba(124, 132, 113, 0.1);
        }

        .tab.active {
          background: var(--brand);
          color: white;
          border-color: var(--brand);
        }

        .songs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        @media (max-width: 1024px) {
          .songs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .songs-grid {
            grid-template-columns: 1fr;
          }
        }

        .song-card {
          background: var(--card);
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .song-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .song-visual {
          position: relative;
          height: 100px;
          background: linear-gradient(135deg, rgba(124, 132, 113, 0.05), rgba(90, 102, 80, 0.05));
          border-radius: 10px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .song-waveform {
          display: flex;
          gap: 2px;
          height: 60%;
          align-items: center;
        }

        .wave-bar {
          width: 3px;
          background: linear-gradient(to top, var(--brand), var(--brand-strong));
          border-radius: 2px;
          animation: wave 1.5s ease-in-out infinite;
        }

        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }

        .play-btn {
          position: absolute;
          width: 50px;
          height: 50px;
          background: rgba(255,255,255,0.95);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .play-btn:hover {
          transform: scale(1.1);
          background: white;
        }

        .play-btn svg {
          color: var(--brand);
          margin-left: 3px;
        }

        .song-info {
          margin-bottom: 15px;
        }

        .song-info h3 {
          font-size: 16px;
          color: var(--charcoal);
          margin-bottom: 5px;
        }

        .song-purpose {
          display: inline-block;
          padding: 3px 10px;
          background: rgba(124, 132, 113, 0.1);
          color: var(--brand);
          border-radius: 12px;
          font-size: 12px;
        }

        .song-stats {
          display: flex;
          gap: 15px;
          padding-top: 15px;
          border-top: 1px solid rgba(124, 132, 113, 0.1);
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: var(--muted);
        }

        .stat svg {
          opacity: 0.6;
        }

        .like-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--muted);
          transition: all 0.3s ease;
        }

        .like-btn:hover {
          color: #ef4444;
        }

        .like-btn.liked {
          color: #ef4444;
        }

        .load-more {
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .loader {
          display: flex;
          gap: 8px;
        }

        .loader-dot {
          width: 8px;
          height: 8px;
          background: var(--brand);
          border-radius: 50%;
          animation: loaderPulse 1.5s ease-in-out infinite;
        }

        .loader-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loader-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes loaderPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        :global(.engagement-boost) {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10000;
          animation: boostPop 0.5s ease-out;
        }

        :global(.boost-content) {
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          color: white;
          padding: 20px 30px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        :global(.boost-emoji) {
          font-size: 30px;
        }

        :global(.boost-text) {
          font-size: 18px;
          font-weight: 600;
        }

        :global(.floating-heart) {
          position: fixed;
          bottom: 100px;
          font-size: 24px;
          animation: floatUp 2s ease-out forwards;
          pointer-events: none;
          z-index: 1000;
        }

        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-100px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px) scale(0.8);
          }
        }

        @keyframes boostPop {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}