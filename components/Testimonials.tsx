"use client";
import { useEffect, useState } from 'react';

interface Testimonial {
  name: string;
  location: string;
  need: string;
  quote: string;
  avatar: string;
  verified?: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "Jessica T.",
    location: "Miami, FL",
    need: "birthday",
    quote: "I got a personalized birthday song with my daughter Emma's name for her 5th birthday. When she heard her name in the lyrics, her eyes lit up like magic! She's played it at least 50 times and makes everyone listen to 'her special song.' Best $8 I've ever spent!",
    avatar: "🎂",
    verified: true
  },
  {
    name: "Marcus W.",
    location: "Brooklyn, NY",
    need: "love",
    quote: "Surprised my girlfriend with a love song that had her name throughout the lyrics. She actually cried happy tears! Way more meaningful than flowers and the song will last forever. She plays it every morning now.",
    avatar: "❤️",
    verified: true
  },
  {
    name: "Linda K.",
    location: "Portland, OR",
    need: "manifestation",
    quote: "I ordered a manifestation song with my own name to help with my daily affirmations. Hearing 'Linda, you are worthy, Linda, you are strong' in a beautiful melody has been so powerful for my morning routine!",
    avatar: "✨",
    verified: true
  },
  {
    name: "The Rodriguez Family",
    location: "San Diego, CA",
    need: "birthday",
    quote: "We got the 5-song bundle for our whole family - Miguel, Sofia, Isabella, Diego, and Abuela Rosa. Now we play each person's song on their birthday. The kids are obsessed with hearing their names in the music!",
    avatar: "🎁",
    verified: true
  },
  {
    name: "Sarah P.",
    location: "Austin, TX",
    need: "confidence",
    quote: "My son Alex was struggling with confidence before his big presentation. I got him a confidence song with his name in it. He listened to it 10 times before going on stage and absolutely crushed it. He still plays it before important events!",
    avatar: "🌟",
    verified: true
  },
  {
    name: "David & Amy L.",
    location: "Chicago, IL",
    need: "love",
    quote: "We got personalized love songs for each other for our anniversary - one with 'David' and one with 'Amy.' It's the most thoughtful gift we've ever exchanged. Way better than anything we could buy at a store!",
    avatar: "💕",
    verified: true
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // 8 seconds per testimonial

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 15 seconds
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container narrow">
        <div className="section-header">
          <div className="header-badge">
            <span className="badge-dot"></span>
            <span>Real Customer Stories</span>
          </div>
          <h2 className="testimonials-title">Hear What Makes People Smile</h2>
          <p className="testimonials-subtitle">
            Real people sharing how personalized songs made their special moments unforgettable
          </p>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="quote-decoration">❝</div>

            <div className="testimonial-header">
              <div className="testimonial-avatar">
                <span className="avatar-emoji">{currentTestimonial.avatar}</span>
                <div className="avatar-ring"></div>
              </div>
              <div className="testimonial-meta">
                <div className="testimonial-name-row">
                  <h4 className="testimonial-name">{currentTestimonial.name}</h4>
                  {currentTestimonial.verified && (
                    <svg className="verified-icon" width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M6.267 9.267L8.933 12L13.733 7.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  )}
                </div>
                <p className="testimonial-location">📍 {currentTestimonial.location}</p>
                <span className="testimonial-need-tag">
                  {currentTestimonial.need.charAt(0).toUpperCase() + currentTestimonial.need.slice(1)} Song
                </span>
              </div>
            </div>

            <blockquote className="testimonial-quote">
              {currentTestimonial.quote}
            </blockquote>

            <div className="testimonial-footer">
              <span className="footer-badge">✓ Verified Purchase</span>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="testimonials-nav">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`View testimonial from ${testimonials[index].name}`}
              />
            ))}
          </div>

          {/* Statistics */}
          <div className="testimonials-stats">
            <div className="stat">
              <div className="stat-icon">🎵</div>
              <div className="stat-number">12,847+</div>
              <div className="stat-label">Songs Created</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">Customer Rating</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-icon">💝</div>
              <div className="stat-number">94%</div>
              <div className="stat-label">Would Gift Again</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          padding: 80px 0;
          background: linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%);
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #3B82F6;
          margin-bottom: 20px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .testimonials-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .testimonials-subtitle {
          color: #666;
          font-size: 1.125rem;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .testimonials-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: white;
          border: 2px solid #f0f0f0;
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          animation: fadeInUp 0.6s ease;
          position: relative;
          transition: all 0.4s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15);
          border-color: #3B82F6;
        }

        .quote-decoration {
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 80px;
          color: rgba(59, 130, 246, 0.08);
          line-height: 1;
          font-family: var(--font-serif);
          pointer-events: none;
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .testimonial-avatar {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
        }

        .avatar-ring {
          position: absolute;
          inset: -4px;
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          animation: ringPulse 3s ease-in-out infinite;
        }

        .avatar-emoji {
          font-size: 2rem;
          position: relative;
          z-index: 1;
        }

        .testimonial-meta {
          flex: 1;
        }

        .testimonial-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .testimonial-name {
          font-family: var(--font-sans);
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .verified-icon {
          color: #10B981;
          flex-shrink: 0;
          animation: fadeIn 0.5s ease 0.3s both;
        }

        .testimonial-location {
          color: #888;
          font-size: 0.9375rem;
          margin: 0 0 10px 0;
          font-weight: 500;
        }

        .testimonial-need-tag {
          display: inline-block;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        .testimonial-quote {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #333;
          margin: 0 0 24px 0;
          position: relative;
          z-index: 1;
        }

        .testimonial-footer {
          display: flex;
          justify-content: flex-end;
          position: relative;
          z-index: 1;
        }

        .footer-badge {
          font-size: 0.8125rem;
          color: #10B981;
          font-weight: 600;
          padding: 6px 14px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 20px;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .testimonials-nav {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
        }

        .nav-dot {
          width: 14px;
          height: 14px;
          background: #ddd;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-dot:hover {
          background: #3B82F6;
          transform: scale(1.2);
        }

        .nav-dot.active {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          width: 40px;
          border-radius: 10px;
        }

        .testimonials-stats {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 20px;
          padding: 40px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.05));
          border-radius: 20px;
          border: 2px solid rgba(59, 130, 246, 0.1);
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
          flex: 1;
          min-width: 120px;
        }

        .stat-icon {
          font-size: 2rem;
          margin-bottom: 8px;
          animation: float 3s ease-in-out infinite;
        }

        .stat-number {
          font-family: var(--font-serif);
          font-size: 2.25rem;
          font-weight: 800;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 0.9375rem;
          color: #666;
          font-weight: 600;
        }

        .stat-divider {
          width: 2px;
          height: 60px;
          background: linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.2), transparent);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes ringPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.3;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @media (max-width: 768px) {
          .testimonials-section {
            padding: 60px 0;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .testimonial-card {
            padding: 28px 24px;
          }

          .quote-decoration {
            font-size: 60px;
            top: 15px;
            right: 20px;
          }

          .testimonial-header {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .testimonial-avatar {
            width: 64px;
            height: 64px;
          }

          .avatar-emoji {
            font-size: 1.75rem;
          }

          .testimonials-stats {
            flex-direction: column;
            gap: 24px;
            padding: 32px 20px;
          }

          .stat-divider {
            display: none;
          }

          .testimonial-quote {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}