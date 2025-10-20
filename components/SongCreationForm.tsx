"use client";
import { useState } from 'react';
import type { Category } from '@/lib/categories';

interface SongCreationFormProps {
  category: Category;
}

export function SongCreationForm({ category }: SongCreationFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    recipientName: '',
    specificGoal: '',
    personalStory: '',
    musicalStyle: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Create Razorpay order
      const orderResponse = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: category.slug,
          ...formData,
          price: category.price,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const { orderId, amount, currency, key } = await orderResponse.json();

      // Configure Razorpay checkout options
      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: 'Personalize Online',
        description: `Personalized ${category.name}`,
        order_id: orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: '#7c8471', // Your brand color (sage)
        },
        handler: async function (response: any) {
          // Payment successful, verify it
          try {
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Payment verified, redirect to success page
              window.location.href = `/success?payment_id=${response.razorpay_payment_id}`;
            } else {
              alert('Payment verification failed. Please contact support.');
              setIsSubmitting(false);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            // User closed the payment modal
            setIsSubmitting(false);
          },
        },
      };

      // Open Razorpay payment modal
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Musical styles based on category
  const getMusicalStyles = () => {
    const baseStyles = ['Pop', 'R&B', 'Hip Hop', 'Acoustic', 'Electronic'];

    switch (category.slug) {
      case 'christmas':
        return [...baseStyles, 'Traditional', 'Modern'];
      case 'manifestation':
      case 'prayer':
      case 'peace':
        return [...baseStyles, 'Meditative'];
      case 'birthday':
        return [...baseStyles, 'Party Upbeat'];
      default:
        return baseStyles;
    }
  };

  return (
    <div className="song-creation-form">
      {/* Progress Indicator */}
      <div className="progress-bar">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-circle">1</div>
          <div className="step-label">Details</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-circle">2</div>
          <div className="step-label">Style</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-circle">3</div>
          <div className="step-label">Review</div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Personalization Details */}
        {step === 1 && (
          <div className="form-step">
            <h3>Let's Personalize Your {category.name}</h3>
            <p className="step-description">Tell us about yourself so we can create something special</p>

            <div className="form-group">
              <label htmlFor="name">
                Your Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="The name you want in the lyrics"
                required
                className="form-input"
              />
              <small className="form-hint">This name will be woven into your song lyrics</small>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                className="form-input"
              />
              <small className="form-hint">We'll send your song here shortly after purchase</small>
            </div>

            {/* Birthday-specific field */}
            {category.slug === 'birthday' && (
              <div className="form-group">
                <label htmlFor="age">Age (Optional)</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g., 25"
                  className="form-input"
                />
              </div>
            )}

            {/* Christmas-specific field */}
            {category.slug === 'christmas' && (
              <div className="form-group">
                <label htmlFor="recipientName">Recipient's Name (Optional)</label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  placeholder="Who is this gift for?"
                  className="form-input"
                />
              </div>
            )}

            {/* Manifestation-specific field */}
            {category.slug === 'manifestation' && (
              <div className="form-group">
                <label htmlFor="specificGoal">Specific Goal</label>
                <select
                  id="specificGoal"
                  name="specificGoal"
                  value={formData.specificGoal}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Choose your focus...</option>
                  <option value="wealth">Wealth & Abundance</option>
                  <option value="success">Career Success</option>
                  <option value="love">Love & Relationships</option>
                  <option value="health">Health & Wellness</option>
                  <option value="confidence">Confidence & Self-Worth</option>
                  <option value="creativity">Creativity & Inspiration</option>
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="personalStory">
                Your Story <span className="required">*</span>
              </label>
              <textarea
                id="personalStory"
                name="personalStory"
                value={formData.personalStory}
                onChange={handleInputChange}
                placeholder="Share a few details to make your song uniquely yours. The more you share, the better it sounds! (e.g., hobbies, dreams, special moments, what makes you unique)"
                required
                className="form-textarea"
                rows={5}
              />
              <small className="form-hint">Minimum 20 characters - the more details, the more personalized your song!</small>
            </div>

            <button type="button" onClick={handleNext} className="btn btn-primary btn-block">
              Continue to Musical Style →
            </button>
          </div>
        )}

        {/* Step 2: Musical Style */}
        {step === 2 && (
          <div className="form-step">
            <h3>Choose Your Musical Style</h3>
            <p className="step-description">Pick the vibe that resonates with you</p>

            <div className="style-grid">
              {getMusicalStyles().map((style) => (
                <label key={style} className={`style-card ${formData.musicalStyle === style ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="musicalStyle"
                    value={style}
                    checked={formData.musicalStyle === style}
                    onChange={handleInputChange}
                    className="style-radio"
                  />
                  <div className="style-icon">🎵</div>
                  <div className="style-name">{style}</div>
                </label>
              ))}
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleBack} className="btn btn-secondary">
                ← Back
              </button>
              <button type="button" onClick={handleNext} className="btn btn-primary" disabled={!formData.musicalStyle}>
                Continue to Review →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Purchase */}
        {step === 3 && (
          <div className="form-step">
            <h3>Review Your Song Details</h3>
            <p className="step-description">Everything look good? Your song will be ready soon!</p>

            <div className="review-card">
              <div className="review-header">
                <div className="review-icon">{category.icon}</div>
                <div>
                  <h4>{category.name}</h4>
                  <p className="review-price">${category.price}</p>
                </div>
              </div>

              <div className="review-divider"></div>

              <div className="review-details">
                <div className="review-row">
                  <span className="review-label">Name in Song:</span>
                  <span className="review-value">{formData.name}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Email:</span>
                  <span className="review-value">{formData.email}</span>
                </div>
                {formData.age && (
                  <div className="review-row">
                    <span className="review-label">Age:</span>
                    <span className="review-value">{formData.age}</span>
                  </div>
                )}
                {formData.recipientName && (
                  <div className="review-row">
                    <span className="review-label">Recipient:</span>
                    <span className="review-value">{formData.recipientName}</span>
                  </div>
                )}
                {formData.specificGoal && (
                  <div className="review-row">
                    <span className="review-label">Goal:</span>
                    <span className="review-value">{formData.specificGoal}</span>
                  </div>
                )}
                <div className="review-row">
                  <span className="review-label">Musical Style:</span>
                  <span className="review-value">{formData.musicalStyle}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Your Story:</span>
                  <span className="review-value">{formData.personalStory}</span>
                </div>
              </div>

              <div className="review-divider"></div>

              <div className="review-features">
                <div className="feature-item">✓ Your name in the lyrics</div>
                <div className="feature-item">✓ Fast delivery to your email</div>
                <div className="feature-item">✓ Yours forever - unlimited replays</div>
                <div className="feature-item">✓ High-quality MP3 download</div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleBack} className="btn btn-secondary">
                ← Back
              </button>
              <button type="submit" className="btn btn-primary btn-large" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Checkout...' : `Create My Song - $${category.price} →`}
              </button>
            </div>

            <p className="disclaimer">
              ⚠️ All sales are final - no refunds. By proceeding, you agree to our{' '}
              <a href="/terms">Terms of Service</a> and <a href="/refund-policy">Refund Policy</a>.
            </p>
          </div>
        )}
      </form>

      <style jsx>{`
        .song-creation-form {
          max-width: 700px;
          margin: 0 auto;
          background: var(--card);
          border-radius: 20px;
          padding: 3rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .progress-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--sand);
          color: var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-circle {
          background: var(--brand);
          color: white;
        }

        .step-label {
          font-size: 0.85rem;
          color: var(--muted);
          font-weight: 500;
        }

        .progress-step.active .step-label {
          color: var(--brand);
          font-weight: 600;
        }

        .progress-line {
          width: 60px;
          height: 2px;
          background: var(--sand);
          margin: 0 0.5rem;
        }

        .form-step h3 {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--charcoal);
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .step-description {
          text-align: center;
          color: var(--muted);
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 0.5rem;
        }

        .required {
          color: #DC2626;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid var(--sand);
          border-radius: 8px;
          font-size: 1rem;
          font-family: var(--font-sans);
          transition: border-color 0.3s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--brand);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-hint {
          display: block;
          font-size: 0.85rem;
          color: var(--muted);
          margin-top: 0.25rem;
        }

        .style-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .style-card {
          position: relative;
          background: var(--bg);
          border: 2px solid var(--sand);
          border-radius: 12px;
          padding: 1.5rem 1rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .style-card:hover {
          border-color: var(--brand);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .style-card.selected {
          border-color: var(--brand);
          background: rgba(124, 132, 113, 0.05);
        }

        .style-radio {
          position: absolute;
          opacity: 0;
        }

        .style-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .style-name {
          font-weight: 600;
          color: var(--charcoal);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .form-actions button {
          flex: 1;
        }

        .btn-block {
          width: 100%;
        }

        .review-card {
          background: var(--bg);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .review-icon {
          font-size: 3rem;
        }

        .review-header h4 {
          font-size: 1.3rem;
          color: var(--charcoal);
          margin: 0;
        }

        .review-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--brand);
          margin: 0.25rem 0 0;
        }

        .review-divider {
          height: 1px;
          background: var(--sand);
          margin: 1.5rem 0;
        }

        .review-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .review-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .review-label {
          font-weight: 600;
          color: var(--muted);
        }

        .review-value {
          color: var(--charcoal);
          text-align: right;
          word-break: break-word;
        }

        .review-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .feature-item {
          font-size: 0.9rem;
          color: var(--charcoal);
        }

        .disclaimer {
          text-align: center;
          font-size: 0.85rem;
          color: var(--muted);
          margin-top: 1.5rem;
        }

        .disclaimer a {
          color: var(--brand);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .song-creation-form {
            padding: 2rem 1.5rem;
          }

          .progress-line {
            width: 40px;
          }

          .style-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .form-actions {
            flex-direction: column;
          }

          .review-features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
