"use client";
import { useEffect, useState } from 'react';
import { StylePreviews } from './StylePreviews';
import { EmailCapture } from './EmailCapture';

function todayKey(){ const d = new Date(); return `day_${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}`; }
function canPlayDemo(){ try { const k=todayKey(); const d=JSON.parse(localStorage.getItem('demo_usage')||'{}'); return (d[k]||0)<1; } catch { return true; } }
function recordDemoPlay(){ try{const k=todayKey(); const d=JSON.parse(localStorage.getItem('demo_usage')||'{}'); d[k]=(d[k]||0)+1; localStorage.setItem('demo_usage', JSON.stringify(d));}catch{}}
export function setPurchased(v:boolean){ try { localStorage.setItem('purchased', v? '1':'0'); } catch{} }

export function DemoPlayer(){
  const [selection, setSelection] = useState<{need:string;style:string;name?:string}>({need:'peace', style:'ambient'});
  const [map, setMap] = useState<Record<string,string>>({});
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [songGenerated, setSongGenerated] = useState(false);

  useEffect(()=>{ fetch('/assets/demo-audio-map.json').then(r=>r.json()).then(setMap).catch(()=>setMap({})); },[]);

  const submit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if (!canPlayDemo()) { setShowModal(true); return; }

    setIsGenerating(true);
    setSongGenerated(false);

    // Simulate song generation with elegant loading
    await new Promise(resolve => setTimeout(resolve, 3000));

    recordDemoPlay();
    setIsGenerating(false);
    setSongGenerated(true);
    setShowEmailCapture(true);
  };

  const handleEmailSubmit = async (email: string, preferences: { dailyVerse: boolean; updates: boolean }) => {
    console.log('Email submitted:', email, preferences);
    // Here you would send the email and song generation request to your backend
    setShowEmailCapture(false);

    // Show success message
    alert(`Perfect! Your personalized ${selection.need} song will be delivered to ${email} shortly.`);
  };

  const handleSkipEmail = () => {
    setShowEmailCapture(false);
    // Still allow them to hear a preview, but no email delivery
  };

  return (
    <section id="create" className="section create">
      <div className="container narrow">
        <div className="create-header">
          <h2 className="create-title">Try a Free Demo Song</h2>
          <p className="create-subtitle">Experience the power of personalized music - create a sample song in 30 seconds</p>
          <div className="gift-suggestions">
            <span className="suggestion-label">Perfect for:</span>
            <span className="suggestion-item">Get Well Wishes</span>
            <span className="suggestion-item">Birthday Blessings</span>
            <span className="suggestion-item">Comfort in Loss</span>
            <span className="suggestion-item">Daily Encouragement</span>
            <span className="suggestion-item">Thank You Gifts</span>
          </div>
        </div>

        <form className="creation-form" onSubmit={submit}>
          {/* Step 1: Purpose */}
          <div className="form-step">
            <div className="step-header">
              <div className="step-number">1</div>
              <div className="step-info">
                <h3>What do you need today?</h3>
                <p>Choose what speaks to your heart</p>
              </div>
            </div>
            <div className="need-grid">
              {['peace','healing','gratitude','focus','comfort','strength','guidance'].map(need => (
                <button
                  key={need}
                  type="button"
                  className={`need-card ${selection.need === need ? 'selected' : ''}`}
                  onClick={() => setSelection(s => ({...s, need}))}
                >
                  <div className="need-icon">
                    {need === 'peace' && '🕊️'}
                    {need === 'healing' && '🌿'}
                    {need === 'gratitude' && '🙏'}
                    {need === 'focus' && '🎯'}
                    {need === 'comfort' && '🤗'}
                    {need === 'strength' && '💪'}
                    {need === 'guidance' && '✨'}
                  </div>
                  <span className="need-label">{need.charAt(0).toUpperCase() + need.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Personal Touch */}
          <div className="form-step">
            <div className="step-header">
              <div className="step-number">2</div>
              <div className="step-info">
                <h3>Who is this song for?</h3>
                <p>Add your name or a loved one's name for personalization</p>
              </div>
            </div>
            <div className="name-input-wrapper">
              <input
                type="text"
                name="name"
                maxLength={40}
                placeholder="Enter your name or someone special's name..."
                className="name-input"
                onChange={(e) => setSelection(s => ({...s, name: e.target.value}))}
              />
              <div className="input-hint">
                {selection.name ? `Creating a personalized song for ${selection.name} ✨` : 'Skip to create a general song without a name'}
              </div>
            </div>
          </div>

          {/* Step 3: Musical Style */}
          <div className="form-step">
            <div className="step-header">
              <div className="step-number">3</div>
              <div className="step-info">
                <h3>Choose your musical style</h3>
                <p>Each style creates a different mood and feeling</p>
              </div>
            </div>
            <StylePreviews
              selectedStyle={selection.style}
              onStyleChange={(style) => setSelection(s => ({...s, style}))}
            />
          </div>

          {/* Generate Button */}
          <div className="form-submit">
            <button type="submit" className="generate-btn" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <div className="btn-loading-spinner"></div>
                  Crafting your song...
                </>
              ) : (
                <>
                  <span>Create My Song</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
            <p className="submit-note">
              {selection.name
                ? `Ready to create a ${selection.need} song for ${selection.name}`
                : `Ready to create your ${selection.need} song`
              }
            </p>
          </div>
        </form>

        {isGenerating && (
          <div className="generation-loading">
            <div className="loading-content">
              <div className="loading-animation">
                <div className="pulse-circle pulse-1"></div>
                <div className="pulse-circle pulse-2"></div>
                <div className="pulse-circle pulse-3"></div>
              </div>
              <h3 className="loading-title">Crafting Your Personal Song</h3>
              <p className="loading-description">
                {selection.name ? `Creating a gentle dedication for ${selection.name}...` : 'Weaving together harmonies just for you...'}
              </p>
              <div className="loading-steps">
                <div className="step active">
                  <div className="step-icon">🎵</div>
                  <span>Composing melody</span>
                </div>
                <div className="step active">
                  <div className="step-icon">✨</div>
                  <span>Adding personal touch</span>
                </div>
                <div className="step">
                  <div className="step-icon">🎧</div>
                  <span>Finalizing your song</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {songGenerated && showEmailCapture && (
          <EmailCapture
            trigger="first-song"
            onEmailSubmit={handleEmailSubmit}
            onSkip={handleSkipEmail}
          />
        )}

        {showModal && (
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-card">
              <h3>Out of free plays</h3>
              <p className="note">Get 20 credits per month for $12.99. Downloads included.</p>
              <div className="player-actions">
                <a className="btn btn-primary" data-checkout="subscription" href="#">Start now</a>
                <button className="btn" onClick={()=>setShowModal(false)}>Not now</button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .create {
            background: linear-gradient(135deg, var(--soft-white) 0%, var(--cream) 100%);
            padding: var(--space-xl) 0;
          }

          .create-header {
            text-align: center;
            margin-bottom: 3rem;
          }

          .create-title {
            font-family: var(--font-serif);
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 400;
            color: var(--charcoal);
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
          }

          .create-subtitle {
            font-size: 1.125rem;
            color: var(--warm-gray);
            max-width: 600px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
          }

          .gift-suggestions {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 0.75rem;
            margin-top: 1rem;
          }

          .suggestion-label {
            font-family: var(--font-sans);
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--charcoal);
            margin-right: 0.5rem;
          }

          .suggestion-item {
            font-family: var(--font-sans);
            font-size: 0.85rem;
            padding: 0.4rem 0.9rem;
            background: var(--cream);
            border: 1px solid var(--sand);
            border-radius: 20px;
            color: var(--warm-gray);
            transition: all 0.3s ease;
          }

          .suggestion-item:hover {
            background: var(--sand);
            color: var(--charcoal);
            transform: translateY(-1px);
          }

          .creation-form {
            max-width: 800px;
            margin: 0 auto;
          }

          .form-step {
            margin-bottom: 3rem;
            padding: 2rem;
            background: var(--soft-white);
            border-radius: 16px;
            border: 2px solid var(--sand);
            transition: all 0.3s ease;
          }

          .form-step:hover {
            border-color: var(--sage);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(124, 132, 113, 0.1);
          }

          .step-header {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .step-number {
            width: 40px;
            height: 40px;
            background: var(--sage);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.1rem;
            flex-shrink: 0;
          }

          .step-info h3 {
            font-family: var(--font-serif);
            font-size: 1.5rem;
            color: var(--charcoal);
            margin-bottom: 0.5rem;
            font-weight: 500;
          }

          .step-info p {
            color: var(--warm-gray);
            margin: 0;
            font-size: 1rem;
          }

          .need-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
          }

          .need-card {
            background: var(--cream);
            border: 2px solid var(--sand);
            border-radius: 12px;
            padding: 1.5rem 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }

          .need-card:hover {
            border-color: var(--sage);
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(124, 132, 113, 0.15);
          }

          .need-card.selected {
            border-color: var(--sage);
            background: var(--sage);
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(124, 132, 113, 0.25);
          }

          .need-icon {
            font-size: 2rem;
            filter: grayscale(0.3);
            transition: filter 0.3s ease;
          }

          .need-card.selected .need-icon {
            filter: none;
          }

          .need-label {
            font-weight: 600;
            font-size: 0.95rem;
            letter-spacing: 0.02em;
          }

          .name-input-wrapper {
            position: relative;
          }

          .name-input {
            width: 100%;
            padding: 1.25rem;
            border: 2px solid var(--sand);
            border-radius: 12px;
            font-size: 1.1rem;
            font-family: var(--font-sans);
            background: var(--cream);
            color: var(--charcoal);
            transition: all 0.3s ease;
          }

          .name-input:focus {
            outline: none;
            border-color: var(--sage);
            background: var(--soft-white);
            box-shadow: 0 0 0 4px rgba(124, 132, 113, 0.1);
          }

          .name-input::placeholder {
            color: var(--warm-gray);
          }

          .input-hint {
            margin-top: 0.75rem;
            font-size: 0.9rem;
            color: var(--warm-gray);
            text-align: center;
            min-height: 1.2rem;
            font-style: italic;
          }

          .form-submit {
            text-align: center;
            margin-top: 2rem;
          }

          .generate-btn {
            background: linear-gradient(135deg, var(--charcoal), var(--deep-brown));
            color: white;
            border: none;
            padding: 1.25rem 2.5rem;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            box-shadow: 0 6px 20px rgba(44, 40, 37, 0.3);
            font-family: var(--font-sans);
            letter-spacing: 0.02em;
          }

          .generate-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(44, 40, 37, 0.4);
            background: linear-gradient(135deg, var(--sage), var(--moss));
          }

          .generate-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
          }

          .btn-loading-spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          .submit-note {
            margin-top: 1rem;
            color: var(--warm-gray);
            font-style: italic;
            font-size: 0.95rem;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }


          /* Responsive Design */
          @media (max-width: 768px) {
            .create-header {
              margin-bottom: 2rem;
            }

            .gift-suggestions {
              gap: 0.5rem;
            }

            .suggestion-item {
              font-size: 0.8rem;
              padding: 0.35rem 0.75rem;
            }

            .form-step {
              padding: 1.5rem;
              margin-bottom: 2rem;
            }

            .step-header {
              flex-direction: column;
              text-align: center;
              gap: 0.75rem;
            }

            .step-number {
              margin: 0 auto;
            }

            .need-grid {
              grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
              gap: 0.75rem;
            }

            .need-card {
              padding: 1.25rem 0.75rem;
            }

            .need-icon {
              font-size: 1.75rem;
            }

            .need-label {
              font-size: 0.9rem;
            }

            .generate-btn {
              width: 100%;
              max-width: 300px;
              padding: 1rem 2rem;
            }
          }

          @media (max-width: 479px) {
            .gift-suggestions {
              gap: 0.4rem;
              margin-top: 0.75rem;
            }

            .suggestion-label {
              font-size: 0.85rem;
              width: 100%;
              text-align: center;
              margin-bottom: 0.5rem;
              margin-right: 0;
            }

            .suggestion-item {
              font-size: 0.75rem;
              padding: 0.3rem 0.6rem;
            }

            .form-step {
              padding: 1.25rem;
            }

            .need-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .need-card {
              padding: 1rem 0.5rem;
            }

            .need-icon {
              font-size: 1.5rem;
            }

            .need-label {
              font-size: 0.85rem;
            }

            .name-input {
              font-size: 1rem;
              padding: 1rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

