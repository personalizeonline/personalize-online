"use client";
import { useState } from 'react';

interface ExampleScenario {
  id: string;
  category: 'personal' | 'gift';
  title: string;
  situation: string;
  songType: string;
  name: string;
  description: string;
  outcome: string;
  icon: string;
}

const examples: ExampleScenario[] = [
  {
    id: 'morning-peace',
    category: 'personal',
    title: 'Daily Morning Routine',
    situation: 'Sarah feels overwhelmed starting her busy days',
    songType: 'Peace',
    name: 'Sarah',
    description: 'A gentle 60-second peace song personalized for Sarah to center herself each morning',
    outcome: 'Now starts each day with 2 minutes of calm reflection',
    icon: '🌅'
  },
  {
    id: 'grief-support',
    category: 'gift',
    title: 'Comfort During Loss',
    situation: 'Michael\'s friend lost their father and feels lost',
    songType: 'Healing',
    name: 'Emma',
    description: 'Michael creates a healing song for Emma with her name woven into gentle, comforting lyrics',
    outcome: 'Emma listens daily and feels less alone in her grief',
    icon: '🤗'
  },
  {
    id: 'birthday-blessing',
    category: 'gift',
    title: 'Meaningful Birthday Gift',
    situation: 'Lisa wants to give her mom something more personal than flowers',
    songType: 'Gratitude',
    name: 'Mom (Patricia)',
    description: 'A gratitude song celebrating Patricia, acknowledging her love and sacrifices as a mother',
    outcome: 'Patricia treasures it as the most meaningful gift she\'s ever received',
    icon: '🎂'
  },
  {
    id: 'work-stress',
    category: 'personal',
    title: 'Workplace Anxiety',
    situation: 'David experiences high stress during work presentations',
    songType: 'Strength',
    name: 'David',
    description: 'A strength-focused song that David listens to before important meetings',
    outcome: 'Feels more confident and centered before challenging situations',
    icon: '💪'
  },
  {
    id: 'new-baby',
    category: 'gift',
    title: 'New Parent Support',
    situation: 'Anna\'s sister just had a baby and is feeling overwhelmed',
    songType: 'Peace',
    name: 'Jennifer',
    description: 'A peaceful song for Jennifer to listen to during late-night feeding sessions',
    outcome: 'Brings calm to chaotic newborn days and strengthens sisterly bond',
    icon: '👶'
  },
  {
    id: 'recovery',
    category: 'personal',
    title: 'Health Recovery',
    situation: 'Robert is recovering from surgery and feeling discouraged',
    songType: 'Healing',
    name: 'Robert',
    description: 'A healing song that acknowledges Robert\'s journey and encourages patience with recovery',
    outcome: 'Provides daily motivation and reminds him healing takes time',
    icon: '🌿'
  }
];

export function Examples() {
  const [activeTab, setActiveTab] = useState<'personal' | 'gift'>('personal');
  const [selectedExample, setSelectedExample] = useState<ExampleScenario | null>(null);

  const filteredExamples = examples.filter(example => example.category === activeTab);

  return (
    <section className="examples-section">
      <div className="container">
        <div className="examples-header">
          <h2 className="examples-title">See It In Action</h2>
          <p className="examples-subtitle">
            Real scenarios where personalized songs make a meaningful difference
          </p>
        </div>

        <div className="examples-tabs">
          <button
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            For Yourself
          </button>
          <button
            className={`tab-button ${activeTab === 'gift' ? 'active' : ''}`}
            onClick={() => setActiveTab('gift')}
          >
            As Gifts
          </button>
        </div>

        <div className="examples-grid">
          {filteredExamples.map((example) => (
            <div
              key={example.id}
              className="example-card"
              onClick={() => setSelectedExample(example)}
            >
              <div className="example-icon">{example.icon}</div>
              <h3 className="example-title">{example.title}</h3>
              <p className="example-situation">{example.situation}</p>
              <div className="example-meta">
                <span className="song-type">{example.songType} Song</span>
                <span className="personalized">For {example.name}</span>
              </div>
              <button className="example-cta">See Full Story</button>
            </div>
          ))}
        </div>

        {selectedExample && (
          <div className="example-modal" onClick={() => setSelectedExample(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-button"
                onClick={() => setSelectedExample(null)}
              >
                ×
              </button>
              <div className="modal-header">
                <span className="modal-icon">{selectedExample.icon}</span>
                <h3>{selectedExample.title}</h3>
                <span className="modal-category">
                  {selectedExample.category === 'gift' ? 'Gift Example' : 'Personal Use'}
                </span>
              </div>
              <div className="modal-body">
                <div className="story-section">
                  <h4>The Situation</h4>
                  <p>{selectedExample.situation}</p>
                </div>
                <div className="story-section">
                  <h4>The Song</h4>
                  <p>{selectedExample.description}</p>
                  <div className="song-details">
                    <span className="detail-tag">Type: {selectedExample.songType}</span>
                    <span className="detail-tag">Personalized for: {selectedExample.name}</span>
                  </div>
                </div>
                <div className="story-section">
                  <h4>The Impact</h4>
                  <p>{selectedExample.outcome}</p>
                </div>
              </div>
              <div className="modal-footer">
                <a href="#create" className="btn btn-primary">Create Similar Song</a>
              </div>
            </div>
          </div>
        )}

        <div className="examples-cta">
          <h3>Ready to Create Your Own?</h3>
          <p>Whether for daily reflection or as a heartfelt gift, start creating your personalized song today.</p>
          <a href="#create" className="btn btn-primary btn-large">
            Create Your Song
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .examples-section {
          padding: var(--space-xl) 0;
          background: linear-gradient(135deg, var(--soft-white) 0%, var(--cream) 100%);
          position: relative;
        }

        .examples-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .examples-title {
          font-family: var(--font-serif);
          font-size: clamp(2.25rem, 4vw, 3.5rem);
          font-weight: 500;
          color: var(--charcoal);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .examples-subtitle {
          font-family: var(--font-sans);
          font-size: 1.2rem;
          color: var(--warm-gray);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .examples-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .tab-button {
          padding: 0.75rem 2rem;
          border: 2px solid var(--sand);
          background: var(--soft-white);
          color: var(--warm-gray);
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-button.active {
          background: var(--sage);
          color: white;
          border-color: var(--sage);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(124, 132, 113, 0.3);
        }

        .tab-button:hover:not(.active) {
          border-color: var(--sage);
          background: var(--cream);
        }

        .examples-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .example-card {
          background: var(--soft-white);
          border: 2px solid var(--sand);
          border-radius: 16px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.3s var(--ease-out-quart);
          text-align: center;
        }

        .example-card:hover {
          border-color: var(--sage);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(124, 132, 113, 0.15);
        }

        .example-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          filter: grayscale(0.3);
          transition: filter 0.3s ease;
        }

        .example-card:hover .example-icon {
          filter: none;
        }

        .example-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--charcoal);
          margin-bottom: 1rem;
        }

        .example-situation {
          font-family: var(--font-sans);
          color: var(--warm-gray);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .example-meta {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .song-type,
        .personalized {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-weight: 600;
        }

        .song-type {
          background: var(--sage);
          color: white;
        }

        .personalized {
          background: var(--cream);
          color: var(--warm-gray);
          border: 1px solid var(--sand);
        }

        .example-cta {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--sage);
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .example-cta:hover {
          color: var(--moss);
        }

        .example-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          background: var(--soft-white);
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border: none;
          background: var(--sand);
          border-radius: 50%;
          font-size: 1.5rem;
          color: var(--warm-gray);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: var(--sage);
          color: white;
        }

        .modal-header {
          text-align: center;
          padding: 2rem 2rem 1rem;
          border-bottom: 2px solid var(--sand);
        }

        .modal-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .modal-header h3 {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: var(--charcoal);
          margin-bottom: 0.5rem;
        }

        .modal-category {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--sage);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .modal-body {
          padding: 2rem;
        }

        .story-section {
          margin-bottom: 2rem;
        }

        .story-section h4 {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 0.75rem;
        }

        .story-section p {
          font-family: var(--font-sans);
          color: var(--warm-gray);
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .song-details {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .detail-tag {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          padding: 0.4rem 0.8rem;
          background: var(--cream);
          border: 1px solid var(--sand);
          border-radius: 20px;
          color: var(--warm-gray);
          font-weight: 600;
        }

        .modal-footer {
          padding: 1rem 2rem 2rem;
          text-align: center;
        }

        .examples-cta {
          text-align: center;
          background: var(--cream);
          border: 2px solid var(--sand);
          border-radius: 20px;
          padding: 3rem 2rem;
          margin-top: 2rem;
        }

        .examples-cta h3 {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--charcoal);
          margin-bottom: 1rem;
        }

        .examples-cta p {
          font-family: var(--font-sans);
          color: var(--warm-gray);
          font-size: 1.1rem;
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn-large {
          font-size: 1.1rem;
          padding: 1rem 2.5rem;
          gap: 0.75rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .examples-header {
            margin-bottom: 2rem;
          }

          .examples-tabs {
            margin-bottom: 2rem;
          }

          .tab-button {
            padding: 0.6rem 1.5rem;
            font-size: 0.9rem;
          }

          .examples-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .example-card {
            padding: 1.5rem;
          }

          .example-meta {
            flex-direction: column;
            gap: 0.75rem;
          }

          .modal-content {
            margin: 1rem;
            max-height: 70vh;
          }

          .modal-header,
          .modal-body {
            padding: 1.5rem;
          }

          .examples-cta {
            padding: 2rem 1.5rem;
          }
        }

        @media (max-width: 479px) {
          .examples-tabs {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }

          .tab-button {
            width: 200px;
          }

          .example-card {
            padding: 1.25rem;
          }

          .example-title {
            font-size: 1.25rem;
          }

          .modal-header h3 {
            font-size: 1.5rem;
          }

          .song-details {
            gap: 0.5rem;
          }

          .detail-tag {
            font-size: 0.8rem;
            padding: 0.3rem 0.6rem;
          }
        }
      `}</style>
    </section>
  );
}