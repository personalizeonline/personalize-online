"use client";
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Consent } from '@/components/Consent';
import { SongCreationForm } from '@/components/SongCreationForm';
import { PriceDisplay } from '@/components/PriceDisplay';
import {
  getCategoryBySlug,
  isCategoryActive,
} from '@/lib/categories';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [notifyMessage, setNotifyMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const category = getCategoryBySlug(categorySlug);
  const isActive = isCategoryActive(categorySlug);

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotifyStatus('loading');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotifyStatus('success');
      setNotifyMessage(`We'll email you at ${notifyEmail} when ${category?.name} returns!`);
      setNotifyEmail('');
    } catch {
      setNotifyStatus('error');
      setNotifyMessage('Failed to save notification. Please try again.');
    }
  };

  if (!category) {
    return (
      <>
        <Navbar />
        <main style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Category Not Found</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            The category you're looking for doesn't exist.
          </p>
          <a href="/" className="btn btn-primary">Back to Home</a>
        </main>
        <Footer />
        <Consent />
      </>
    );
  }

  if (!isActive && category.type === 'seasonal') {
    return (
      <>
        <Navbar />
        <main className="off-season-page">
          <div className="container">
            <div className="off-season-content">
              <div className="off-season-icon">{category.icon}</div>
              <h1 className="off-season-title">{category.name} Will Return Soon!</h1>
              <p className="off-season-message">
                {category.offSeasonMessage || `${category.name} are currently out of season.`}
              </p>
              <div className="season-dates">
                <p><strong>Available:</strong> {category.startDate} to {category.endDate}</p>
              </div>
              <div className="notify-form">
                <h3>Get Notified When Available</h3>
                {notifyStatus === 'success' ? (
                  <div className="notify-success">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                    <p>{notifyMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleNotifySubmit}>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      required
                      disabled={notifyStatus === 'loading'}
                      className="notify-input"
                    />
                    <button type="submit" disabled={notifyStatus === 'loading'} className="btn btn-primary notify-btn">
                      {notifyStatus === 'loading' ? 'Subscribing...' : 'Notify Me'}
                    </button>
                    {notifyStatus === 'error' && <p className="notify-error">{notifyMessage}</p>}
                  </form>
                )}
              </div>
              <div className="off-season-actions">
                <a href="/" className="btn btn-secondary">← Explore Other Categories</a>
              </div>
            </div>
          </div>
          <style jsx>{`
            .off-season-page { min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem; background: linear-gradient(to bottom, #FAF8F5, #FFF); }
            .off-season-content { text-align: center; max-width: 600px; }
            .off-season-icon { font-size: 120px; margin-bottom: 2rem; opacity: 0.5; filter: grayscale(0.5); }
            .off-season-title { font-family: var(--font-serif); font-size: clamp(2rem, 5vw, 3rem); color: #1a1a1a; margin-bottom: 1.5rem; }
            .off-season-message { font-size: 1.2rem; color: #666; margin-bottom: 2rem; line-height: 1.6; }
            .season-dates { background: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border: 2px solid #f0f0f0; }
            .season-dates p { margin: 0; font-size: 1.1rem; color: #1a1a1a; }
            .notify-form { margin: 2rem 0; padding: 2rem; background: white; border-radius: 16px; border: 2px solid #3B82F6; }
            .notify-form h3 { font-size: 1.3rem; margin-bottom: 1.5rem; color: #1a1a1a; }
            .notify-form form { display: flex; flex-direction: column; gap: 1rem; max-width: 400px; margin: 0 auto; }
            .notify-input { padding: 0.875rem 1rem; border: 2px solid #f0f0f0; border-radius: 8px; font-size: 1rem; transition: border-color 0.3s ease; }
            .notify-input:focus { outline: none; border-color: #3B82F6; }
            .notify-input:disabled { opacity: 0.6; cursor: not-allowed; }
            .notify-btn { padding: 1rem 2rem; font-size: 1rem; }
            .notify-success { padding: 2rem; text-align: center; }
            .notify-success svg { margin-bottom: 1rem; }
            .notify-success p { color: #10B981; font-weight: 600; font-size: 1.1rem; }
            .notify-error { color: #DC2626; font-size: 0.9rem; margin-top: 0.5rem; }
            .off-season-actions { margin-top: 2rem; }
            @media (max-width: 768px) {
              .off-season-icon { font-size: 80px; }
              .off-season-message { font-size: 1.1rem; }
            }
          `}</style>
        </main>
        <Footer />
        <Consent />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Category Hero Section */}
        <section className="category-hero">
          <div className="container">
            <div className="hero-grid">
              {/* Left: Content */}
              <div className="hero-content">
                <div className="category-badge">
                  <span className="badge-dot"></span>
                  <span>Personalized Music</span>
                </div>

                <div className="hero-icon-display">{category.icon}</div>

                <h1 className="hero-title">{category.headline}</h1>
                <p className="hero-subtitle">{category.subheadline}</p>

                <div className="hero-social-proof">
                  <div className="proof-avatars">
                    <div className="avatar">👤</div>
                    <div className="avatar">👤</div>
                    <div className="avatar">👤</div>
                    <div className="avatar-count">+12K</div>
                  </div>
                  <div className="proof-text">
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                    <div className="proof-label">4.9/5 from happy customers</div>
                  </div>
                </div>

                <div className="hero-cta-group">
                  <a href="#create" className="btn-hero-primary">
                    <span className="btn-text">Make My Song</span>
                    <span className="btn-price">${category.price}</span>
                  </a>
                  <div className="cta-trust">
                    <span className="trust-icon">✓</span>
                    <span>Ships in minutes • Keep forever</span>
                  </div>
                </div>
              </div>

              {/* Right: Visual Element */}
              <div className="hero-visual">
                <div className="visual-card">
                  <div className="card-header">
                    <div className="music-icon-large">{category.icon}</div>
                    <div className="playing-indicator">
                      <div className="bar bar-1"></div>
                      <div className="bar bar-2"></div>
                      <div className="bar bar-3"></div>
                      <div className="bar bar-4"></div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>Your Personalized {category.name}</h3>
                    <p>Professionally composed with your name in the lyrics</p>
                    <div className="waveform">
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="floating-badge badge-1">
                  <div className="badge-icon">⚡</div>
                  <div className="badge-text">Like, Really Fast</div>
                </div>
                <div className="floating-badge badge-2">
                  <div className="badge-icon">💝</div>
                  <div className="badge-text">Gift-Worthy AF</div>
                </div>
                <div className="floating-badge badge-3">
                  <div className="badge-icon">♾️</div>
                  <div className="badge-text">Keep 4Ever</div>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .category-hero {
              background: linear-gradient(180deg, #FAF8F5 0%, #FFF 100%);
              padding: 80px 0;
              position: relative;
              overflow: hidden;
            }

            .category-hero::before {
              content: '';
              position: absolute;
              top: -50%;
              right: -20%;
              width: 80%;
              height: 150%;
              background: radial-gradient(circle, rgba(107, 70, 193, 0.05) 0%, transparent 70%);
              pointer-events: none;
            }

            .hero-grid {
              display: grid;
              grid-template-columns: 1.1fr 1fr;
              gap: 80px;
              align-items: center;
              position: relative;
              z-index: 1;
            }

            .hero-content {
              max-width: 580px;
            }

            .category-badge {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: rgba(107, 70, 193, 0.1);
              border: 1px solid rgba(107, 70, 193, 0.2);
              padding: 8px 20px;
              border-radius: 30px;
              font-size: 0.875rem;
              font-weight: 600;
              color: #3B82F6;
              margin-bottom: 24px;
              animation: fadeInDown 0.6s ease-out;
            }

            .badge-dot {
              width: 8px;
              height: 8px;
              background: #10B981;
              border-radius: 50%;
              animation: pulse 2s ease-in-out infinite;
            }

            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(1.2); }
            }

            .hero-icon-display {
              font-size: 5rem;
              margin-bottom: 24px;
              animation: fadeInDown 0.6s ease-out 0.1s both;
            }

            .hero-title {
              font-family: var(--font-serif);
              font-size: clamp(2.5rem, 5vw, 3.75rem);
              font-weight: 800;
              color: #1a1a1a;
              line-height: 1.15;
              margin-bottom: 20px;
              animation: fadeInUp 0.6s ease-out 0.2s both;
            }

            .hero-subtitle {
              font-size: 1.125rem;
              color: #666;
              line-height: 1.7;
              margin-bottom: 32px;
              animation: fadeInUp 0.6s ease-out 0.3s both;
            }

            .hero-social-proof {
              display: flex;
              align-items: center;
              gap: 16px;
              padding: 20px;
              background: white;
              border-radius: 12px;
              margin-bottom: 32px;
              box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
              animation: fadeInUp 0.6s ease-out 0.4s both;
            }

            .proof-avatars {
              display: flex;
              align-items: center;
            }

            .avatar {
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #3B82F6, #2563EB);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid white;
              margin-left: -12px;
              font-size: 1.25rem;
            }

            .avatar:first-child {
              margin-left: 0;
            }

            .avatar-count {
              width: 40px;
              height: 40px;
              background: #1a1a1a;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.75rem;
              font-weight: 700;
              border: 2px solid white;
              margin-left: -12px;
            }

            .proof-text {
              flex: 1;
            }

            .stars {
              color: #FFD700;
              font-size: 0.9rem;
              margin-bottom: 4px;
            }

            .proof-label {
              font-size: 0.875rem;
              color: #666;
              font-weight: 500;
            }

            .hero-cta-group {
              animation: fadeInUp 0.6s ease-out 0.5s both;
            }

            .btn-hero-primary {
              display: inline-flex;
              align-items: center;
              gap: 16px;
              padding: 20px 40px;
              background: linear-gradient(135deg, #3B82F6, #2563EB);
              color: white;
              border-radius: 14px;
              text-decoration: none;
              font-weight: 700;
              transition: all 0.3s ease;
              box-shadow: 0 8px 30px rgba(107, 70, 193, 0.3);
            }

            .btn-hero-primary:hover {
              transform: translateY(-3px);
              box-shadow: 0 12px 40px rgba(107, 70, 193, 0.4);
            }

            .btn-text {
              font-size: 1.125rem;
            }

            .btn-price {
              background: rgba(255, 255, 255, 0.2);
              padding: 6px 14px;
              border-radius: 8px;
              font-size: 1.125rem;
            }

            .cta-trust {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              margin-top: 12px;
              font-size: 0.875rem;
              color: #888;
            }

            .trust-icon {
              color: #10B981;
              font-weight: 700;
            }

            /* Right Visual */
            .hero-visual {
              position: relative;
              height: 500px;
            }

            .visual-card {
              background: white;
              border-radius: 20px;
              padding: 32px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
              animation: floatCard 6s ease-in-out infinite;
            }

            @keyframes floatCard {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }

            .card-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 24px;
            }

            .music-icon-large {
              font-size: 4rem;
            }

            .playing-indicator {
              display: flex;
              align-items: flex-end;
              gap: 4px;
              height: 40px;
            }

            .bar {
              width: 6px;
              background: linear-gradient(to top, #3B82F6, #2563EB);
              border-radius: 3px;
              animation: barDance 1.2s ease-in-out infinite;
            }

            .bar-1 { height: 40%; animation-delay: 0s; }
            .bar-2 { height: 70%; animation-delay: 0.1s; }
            .bar-3 { height: 50%; animation-delay: 0.2s; }
            .bar-4 { height: 80%; animation-delay: 0.3s; }

            @keyframes barDance {
              0%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(1.5); }
            }

            .card-body h3 {
              font-size: 1.5rem;
              font-weight: 700;
              color: #1a1a1a;
              margin-bottom: 8px;
            }

            .card-body p {
              color: #666;
              margin-bottom: 24px;
            }

            .waveform {
              display: flex;
              align-items: center;
              gap: 4px;
              height: 60px;
              padding: 16px;
              background: #FAF8F5;
              border-radius: 12px;
            }

            .wave {
              flex: 1;
              background: linear-gradient(to top, #3B82F6, #2563EB);
              border-radius: 4px;
              animation: waveAnimate 1.5s ease-in-out infinite;
            }

            .wave:nth-child(1) { height: 30%; animation-delay: 0s; }
            .wave:nth-child(2) { height: 60%; animation-delay: 0.1s; }
            .wave:nth-child(3) { height: 45%; animation-delay: 0.2s; }
            .wave:nth-child(4) { height: 80%; animation-delay: 0.3s; }
            .wave:nth-child(5) { height: 55%; animation-delay: 0.4s; }
            .wave:nth-child(6) { height: 70%; animation-delay: 0.5s; }
            .wave:nth-child(7) { height: 40%; animation-delay: 0.6s; }
            .wave:nth-child(8) { height: 50%; animation-delay: 0.7s; }

            @keyframes waveAnimate {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }

            .floating-badge {
              position: absolute;
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 12px 20px;
              background: white;
              border-radius: 12px;
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
              animation: floatBadge 4s ease-in-out infinite;
            }

            .badge-1 {
              top: 10%;
              right: -40px;
              animation-delay: 0s;
            }

            .badge-2 {
              top: 45%;
              left: -40px;
              animation-delay: 1.3s;
            }

            .badge-3 {
              bottom: 15%;
              right: -40px;
              animation-delay: 2.6s;
            }

            @keyframes floatBadge {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }

            .badge-icon {
              font-size: 1.5rem;
            }

            .badge-text {
              font-size: 0.875rem;
              font-weight: 600;
              color: #1a1a1a;
            }

            @keyframes fadeInDown {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @media (max-width: 1024px) {
              .hero-grid {
                gap: 60px;
              }

              .floating-badge {
                display: none;
              }
            }

            @media (max-width: 768px) {
              .category-hero {
                padding: 60px 0;
              }

              .hero-grid {
                grid-template-columns: 1fr;
                gap: 60px;
              }

              .hero-content {
                max-width: 100%;
                text-align: center;
              }

              .hero-social-proof {
                flex-direction: column;
                text-align: center;
              }

              .btn-hero-primary {
                width: 100%;
                justify-content: center;
              }

              .hero-visual {
                height: auto;
              }
            }
          `}</style>
        </section>

        {/* Quick Benefits */}
        <section className="benefits-section">
          <div className="container">
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">🎵</div>
                <h3>Yep, Your Actual Name</h3>
                <p>Not just awkwardly saying it once. It's baked into the actual lyrics throughout the whole song.</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">⚡</div>
                <h3>Inbox in Minutes</h3>
                <p>Order now, check your email in a few. High-quality MP3, ready to blast.</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">♾️</div>
                <h3>No Takebacks</h3>
                <p>Download it, share it, play it at Thanksgiving dinner. It's yours. Forever. We won't delete it.</p>
              </div>
            </div>
          </div>

          <style jsx>{`
            .benefits-section {
              padding: 60px 0;
              background: white;
            }

            .benefits-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 32px;
            }

            .benefit-item {
              text-align: center;
              padding: 32px;
              border-radius: 16px;
              background: #FAF8F5;
              transition: all 0.3s ease;
            }

            .benefit-item:hover {
              transform: translateY(-8px);
              box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
            }

            .benefit-icon {
              font-size: 3.5rem;
              margin-bottom: 20px;
            }

            .benefit-item h3 {
              font-size: 1.25rem;
              font-weight: 700;
              color: #1a1a1a;
              margin-bottom: 12px;
            }

            .benefit-item p {
              color: #666;
              line-height: 1.6;
            }
          `}</style>
        </section>

        {/* How It Works */}
        <section className="how-it-works-section">
          <div className="container">
            <div className="section-header-centered">
              <h2>The Whole Process</h2>
              <p>Three steps. Takes like two minutes, max.</p>
            </div>

            <div className="steps-grid">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-icon">📝</div>
                <h3>Type a Name</h3>
                <p>Whose name do you want in the song? That's literally it.</p>
              </div>

              <div className="step-arrow">→</div>

              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-icon">💳</div>
                <h3>Pay the <PriceDisplay usdAmount={7.99} /></h3>
                <p>Secure checkout. Stripe handles it. Takes 30 seconds.</p>
              </div>

              <div className="step-arrow">→</div>

              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-icon">🎵</div>
                <h3>Check Your Email</h3>
                <p>Download your MP3. Play it loud. Show everyone. Keep it forever.</p>
              </div>
            </div>
          </div>

          <style jsx>{`
            .how-it-works-section {
              padding: 80px 0;
              background: linear-gradient(180deg, #FFF 0%, #FAF8F5 100%);
            }

            .section-header-centered {
              text-align: center;
              margin-bottom: 60px;
            }

            .section-header-centered h2 {
              font-family: var(--font-serif);
              font-size: clamp(2rem, 4vw, 2.75rem);
              color: #1a1a1a;
              margin-bottom: 16px;
              font-weight: 700;
            }

            .section-header-centered p {
              color: #666;
              font-size: 1.125rem;
            }

            .steps-grid {
              display: grid;
              grid-template-columns: 1fr auto 1fr auto 1fr;
              gap: 20px;
              align-items: center;
              max-width: 1100px;
              margin: 0 auto;
            }

            .step-item {
              text-align: center;
              padding: 40px 24px;
              background: white;
              border-radius: 20px;
              border: 2px solid #f0f0f0;
              position: relative;
              transition: all 0.3s ease;
            }

            .step-item:hover {
              transform: translateY(-8px);
              border-color: #3B82F6;
              box-shadow: 0 12px 40px rgba(107, 70, 193, 0.15);
            }

            .step-number {
              position: absolute;
              top: -16px;
              left: 50%;
              transform: translateX(-50%);
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #3B82F6, #2563EB);
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 800;
              font-size: 1.25rem;
              box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);
            }

            .step-icon {
              font-size: 3.5rem;
              margin-bottom: 20px;
            }

            .step-item h3 {
              font-size: 1.375rem;
              font-weight: 700;
              color: #1a1a1a;
              margin-bottom: 12px;
            }

            .step-item p {
              color: #666;
              line-height: 1.6;
            }

            .step-arrow {
              font-size: 2rem;
              color: #3B82F6;
              font-weight: 700;
            }

            @media (max-width: 968px) {
              .steps-grid {
                grid-template-columns: 1fr;
                gap: 40px;
              }

              .step-arrow {
                transform: rotate(90deg);
                justify-self: center;
              }
            }
          `}</style>
        </section>

        {/* Song Creation Form */}
        <section id="create" className="form-section">
          <div className="container">
            <div className="form-header">
              <h2>Alright, Let's Make Your {category.name}</h2>
              <p>Over 12,000 people have done this. Takes about 90 seconds.</p>
            </div>
            <SongCreationForm category={category} />
          </div>

          <style jsx>{`
            .form-section {
              padding: 80px 0;
              background: linear-gradient(180deg, #FAF8F5 0%, #FFF 100%);
            }

            .form-header {
              text-align: center;
              margin-bottom: 60px;
            }

            .form-header h2 {
              font-family: var(--font-serif);
              font-size: clamp(2rem, 4vw, 2.75rem);
              color: #1a1a1a;
              margin-bottom: 16px;
              font-weight: 700;
            }

            .form-header p {
              color: #666;
              font-size: 1.125rem;
            }
          `}</style>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section-category">
          <div className="container">
            <div className="section-header-centered">
              <div className="header-badge-test">
                <span className="badge-dot-test"></span>
                <span>Real People</span>
              </div>
              <h2>Don't Just Take Our Word For It</h2>
              <p>Here's what happened when other people ordered these</p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card-mini">
                <div className="testimonial-header-mini">
                  <div className="avatar-mini">🎂</div>
                  <div>
                    <div className="name-mini">Jessica T.</div>
                    <div className="location-mini">Miami, FL</div>
                  </div>
                  <div className="verified-badge-mini">✓</div>
                </div>
                <p className="testimonial-text-mini">
                  "Got a birthday song with my daughter Emma's name. Her eyes lit up when she heard her name in the lyrics! She's played it 50+ times. Best $8 ever!"
                </p>
                <div className="stars-mini">⭐⭐⭐⭐⭐</div>
              </div>

              <div className="testimonial-card-mini">
                <div className="testimonial-header-mini">
                  <div className="avatar-mini">❤️</div>
                  <div>
                    <div className="name-mini">Marcus W.</div>
                    <div className="location-mini">Brooklyn, NY</div>
                  </div>
                  <div className="verified-badge-mini">✓</div>
                </div>
                <p className="testimonial-text-mini">
                  "Surprised my girlfriend with a love song with her name. She cried happy tears! Way more meaningful than flowers. She plays it every morning now."
                </p>
                <div className="stars-mini">⭐⭐⭐⭐⭐</div>
              </div>

              <div className="testimonial-card-mini">
                <div className="testimonial-header-mini">
                  <div className="avatar-mini">🎁</div>
                  <div>
                    <div className="name-mini">Rodriguez Family</div>
                    <div className="location-mini">San Diego, CA</div>
                  </div>
                  <div className="verified-badge-mini">✓</div>
                </div>
                <p className="testimonial-text-mini">
                  "Got the 5-song bundle for our whole family. Now we play each person's song on their birthday. The kids are obsessed with hearing their names!"
                </p>
                <div className="stars-mini">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .testimonials-section-category {
              padding: 80px 0;
              background: linear-gradient(180deg, #FAF8F5 0%, #FFF 100%);
            }

            .header-badge-test {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: linear-gradient(135deg, rgba(107, 70, 193, 0.1), rgba(236, 72, 153, 0.1));
              border: 1px solid rgba(107, 70, 193, 0.2);
              padding: 8px 20px;
              border-radius: 30px;
              font-size: 0.875rem;
              font-weight: 600;
              color: #3B82F6;
              margin-bottom: 20px;
            }

            .badge-dot-test {
              width: 8px;
              height: 8px;
              background: linear-gradient(135deg, #3B82F6, #2563EB);
              border-radius: 50%;
              animation: pulse 2s ease-in-out infinite;
            }

            .testimonials-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
              gap: 32px;
              max-width: 1200px;
              margin: 0 auto;
            }

            .testimonial-card-mini {
              background: white;
              padding: 32px;
              border-radius: 20px;
              border: 2px solid #f0f0f0;
              transition: all 0.3s ease;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            }

            .testimonial-card-mini:hover {
              transform: translateY(-8px);
              border-color: #3B82F6;
              box-shadow: 0 12px 40px rgba(107, 70, 193, 0.15);
            }

            .testimonial-header-mini {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 20px;
            }

            .avatar-mini {
              width: 48px;
              height: 48px;
              background: linear-gradient(135deg, #3B82F6, #2563EB);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
              flex-shrink: 0;
            }

            .name-mini {
              font-weight: 700;
              color: #1a1a1a;
              font-size: 1rem;
            }

            .location-mini {
              font-size: 0.875rem;
              color: #888;
            }

            .verified-badge-mini {
              margin-left: auto;
              width: 24px;
              height: 24px;
              background: #10B981;
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.75rem;
              font-weight: 700;
            }

            .testimonial-text-mini {
              color: #333;
              line-height: 1.7;
              margin-bottom: 16px;
              font-size: 0.9375rem;
            }

            .stars-mini {
              color: #FFD700;
              font-size: 1rem;
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

            @media (max-width: 768px) {
              .testimonials-section-category {
                padding: 60px 0;
              }

              .testimonials-grid {
                grid-template-columns: 1fr;
              }
            }
          `}</style>
        </section>

        {/* FAQ Section */}
        <section className="faq-section-category">
          <div className="container">
            <div className="section-header-centered">
              <h2>Questions People Ask</h2>
              <p>The stuff you're probably wondering</p>
            </div>

            <div className="faq-list">
              <button
                className={`faq-item ${openFaqIndex === 0 ? 'active' : ''}`}
                onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
              >
                <div className="faq-question">
                  <span className="faq-icon">❓</span>
                  <h3>How fast do I get it?</h3>
                  <span className="faq-toggle">{openFaqIndex === 0 ? '−' : '+'}</span>
                </div>
                <div className={`faq-answer ${openFaqIndex === 0 ? 'open' : ''}`}>
                  <p>
                    Check your email in a few minutes. That's it. High-quality MP3, ready to download. (Check spam if you don't see it right away.)
                  </p>
                </div>
              </button>

              <button
                className={`faq-item ${openFaqIndex === 1 ? 'active' : ''}`}
                onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
              >
                <div className="faq-question">
                  <span className="faq-icon">✏️</span>
                  <h3>Does any name work?</h3>
                  <span className="faq-toggle">{openFaqIndex === 1 ? '−' : '+'}</span>
                </div>
                <div className={`faq-answer ${openFaqIndex === 1 ? 'open' : ''}`}>
                  <p>
                    Yep. Your name, your kid's name, your dog's name, whatever. We'll make it sound natural in the lyrics. (Yes, people have ordered dog songs. It's cute.)
                  </p>
                </div>
              </button>

              <button
                className={`faq-item ${openFaqIndex === 2 ? 'active' : ''}`}
                onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
              >
                <div className="faq-question">
                  <span className="faq-icon">♾️</span>
                  <h3>Can I share it?</h3>
                  <span className="faq-toggle">{openFaqIndex === 2 ? '−' : '+'}</span>
                </div>
                <div className={`faq-answer ${openFaqIndex === 2 ? 'open' : ''}`}>
                  <p>
                    Hell yeah. Download it, text it, post it, whatever. It's your file. Play it at parties. We don't care. Once you buy it, it's yours.
                  </p>
                </div>
              </button>
            </div>
          </div>

          <style jsx>{`
            .faq-section-category {
              padding: 80px 0;
              background: white;
            }

            .faq-list {
              display: flex;
              flex-direction: column;
              gap: 16px;
              max-width: 900px;
              margin: 0 auto;
            }

            .faq-item {
              width: 100%;
              background: white;
              border: 2px solid #f0f0f0;
              border-radius: 16px;
              padding: 0;
              text-align: left;
              cursor: pointer;
              transition: all 0.3s ease;
              overflow: hidden;
            }

            .faq-item:hover {
              border-color: #3B82F6;
              box-shadow: 0 4px 20px rgba(107, 70, 193, 0.1);
            }

            .faq-item.active {
              border-color: #3B82F6;
              background: linear-gradient(135deg, rgba(107, 70, 193, 0.02), rgba(236, 72, 153, 0.02));
            }

            .faq-question {
              display: flex;
              align-items: center;
              gap: 16px;
              padding: 28px 32px;
              width: 100%;
            }

            .faq-icon {
              font-size: 1.75rem;
              flex-shrink: 0;
            }

            .faq-item h3 {
              font-size: 1.125rem;
              font-weight: 700;
              color: #1a1a1a;
              margin: 0;
              flex: 1;
            }

            .faq-toggle {
              font-size: 1.75rem;
              font-weight: 700;
              color: #3B82F6;
              flex-shrink: 0;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(107, 70, 193, 0.1);
              border-radius: 50%;
              transition: all 0.3s ease;
            }

            .faq-item:hover .faq-toggle {
              background: rgba(107, 70, 193, 0.2);
              transform: scale(1.1);
            }

            .faq-answer {
              max-height: 0;
              overflow: hidden;
              transition: max-height 0.4s ease, padding 0.4s ease;
            }

            .faq-answer.open {
              max-height: 300px;
              padding: 0 32px 28px 32px;
            }

            .faq-answer p {
              color: #666;
              line-height: 1.7;
              margin: 0;
              padding-left: 60px;
            }

            @media (max-width: 768px) {
              .faq-section-category {
                padding: 60px 0;
              }

              .faq-question {
                padding: 20px 20px;
                gap: 12px;
              }

              .faq-icon {
                font-size: 1.5rem;
              }

              .faq-item h3 {
                font-size: 1rem;
              }

              .faq-toggle {
                font-size: 1.5rem;
                width: 28px;
                height: 28px;
              }

              .faq-answer.open {
                padding: 0 20px 20px 20px;
              }

              .faq-answer p {
                padding-left: 0;
              }
            }
          `}</style>
        </section>

        {/* Trust/Guarantee Section */}
        <section className="guarantee-section">
          <div className="container">
            <div className="guarantee-card">
              <div className="guarantee-icon">🛡️</div>
              <div className="guarantee-content">
                <h3>Quality Promise</h3>
                <p>We create professional-quality personalized songs with care. If you experience technical issues with delivery or playback, contact us and we'll resolve it promptly. All sales are final for digital products.</p>
              </div>
              <div className="guarantee-badges">
                <div className="g-badge">
                  <span className="g-icon">✓</span>
                  <span>Secure Payment</span>
                </div>
                <div className="g-badge">
                  <span className="g-icon">✓</span>
                  <span>Fast Delivery</span>
                </div>
                <div className="g-badge">
                  <span className="g-icon">✓</span>
                  <span>Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .guarantee-section {
              padding: 60px 0;
              background: white;
            }

            .guarantee-card {
              background: linear-gradient(135deg, rgba(107, 70, 193, 0.05), rgba(236, 72, 153, 0.05));
              border: 2px solid rgba(107, 70, 193, 0.2);
              border-radius: 20px;
              padding: 48px;
              text-align: center;
            }

            .guarantee-icon {
              font-size: 5rem;
              margin-bottom: 24px;
            }

            .guarantee-content h3 {
              font-size: 2rem;
              font-weight: 800;
              color: #1a1a1a;
              margin-bottom: 16px;
            }

            .guarantee-content p {
              font-size: 1.125rem;
              color: #666;
              max-width: 700px;
              margin: 0 auto 32px;
              line-height: 1.7;
            }

            .guarantee-badges {
              display: flex;
              justify-content: center;
              gap: 32px;
              flex-wrap: wrap;
            }

            .g-badge {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 1rem;
              font-weight: 600;
              color: #1a1a1a;
            }

            .g-icon {
              color: #10B981;
              font-weight: 700;
              font-size: 1.25rem;
            }

            @media (max-width: 768px) {
              .guarantee-card {
                padding: 32px 24px;
              }

              .guarantee-content h3 {
                font-size: 1.5rem;
              }

              .guarantee-badges {
                flex-direction: column;
                gap: 16px;
              }
            }
          `}</style>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <div className="container">
            <div className="final-cta-content">
              <h2>So, You Gonna Do It Or What?</h2>
              <p>Seven bucks. Two minutes. One really memorable gift.</p>
              <a href="#create" className="cta-button-final">
                Make My Song – ${category.price}
              </a>
            </div>
          </div>

          <style jsx>{`
            .final-cta {
              background: linear-gradient(135deg, #3B82F6, #2563EB);
              padding: 80px 0;
            }

            .final-cta-content {
              text-align: center;
              color: white;
            }

            .final-cta-content h2 {
              font-size: clamp(2rem, 4vw, 2.75rem);
              font-weight: 800;
              margin-bottom: 16px;
              font-family: var(--font-serif);
            }

            .final-cta-content p {
              font-size: 1.25rem;
              margin-bottom: 32px;
              opacity: 0.95;
            }

            .cta-button-final {
              display: inline-block;
              padding: 22px 50px;
              background: white;
              color: #3B82F6;
              font-size: 1.25rem;
              font-weight: 700;
              border-radius: 14px;
              text-decoration: none;
              transition: all 0.3s ease;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            }

            .cta-button-final:hover {
              transform: translateY(-3px);
              box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
            }

            @media (max-width: 768px) {
              .final-cta {
                padding: 60px 0;
              }

              .cta-button-final {
                width: 100%;
                max-width: 320px;
              }
            }
          `}</style>
        </section>
      </main>
      <Footer />
      <Consent />
    </>
  );
}
