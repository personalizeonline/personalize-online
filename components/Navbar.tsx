"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllActiveCategories } from '@/lib/categories';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const activeCategories = getAllActiveCategories();

  useEffect(() => {
    // Only access localStorage on client-side to prevent hydration errors
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
    setIsCategoriesOpen(false);
  }

  function toggleCategories() {
    setIsCategoriesOpen(!isCategoriesOpen);
  }

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="/" className="brand">
          <span className="brand-icon" aria-hidden="true">♪</span>
          <span className="brand-name">Personalize Online</span>
        </a>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Navigation links */}
        <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-dropdown">
            <button
              className="nav-dropdown-trigger"
              onClick={toggleCategories}
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              Categories
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div
              className={`nav-dropdown-menu ${isCategoriesOpen ? 'open' : ''}`}
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              {activeCategories.map((category) => (
                <a
                  key={category.slug}
                  href={`/${category.slug}`}
                  className={`dropdown-item ${category.type === 'seasonal' ? 'seasonal' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                  {category.type === 'seasonal' && <span className="seasonal-badge">Seasonal</span>}
                </a>
              ))}
            </div>
          </div>
          <a href="#pricing" onClick={closeMobileMenu}>Pricing</a>
          <a href="#how" onClick={closeMobileMenu}>How it works</a>
          <a href="#faq" onClick={closeMobileMenu}>FAQ</a>
          <Link href="#create" className="nav-cta-button" onClick={closeMobileMenu}>
            <span>Create Song</span>
          </Link>
        </nav>
      </div>

      <style jsx>{`
        /* Brand Styling */
        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .brand:hover {
          opacity: 0.85;
        }

        .brand-icon {
          font-size: 1.75rem;
          color: var(--rust);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: gentle-float 3s ease-in-out infinite;
        }

        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .brand-name {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--charcoal);
          letter-spacing: 0.01em;
        }

        /* Desktop Navigation Overrides */
        .nav-links {
          display: flex;
          align-items: center;
          gap: clamp(1.5rem, 3vw, 2.5rem);
        }

        .nav-links a {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--charcoal);
          text-decoration: none;
          position: relative;
          transition: color 0.3s ease;
          letter-spacing: 0.02em;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--rust);
          transition: width 0.4s var(--ease-out-quart);
          border-radius: 2px;
        }

        .nav-links a:hover {
          color: var(--rust);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-cta-button {
          font-weight: 600;
          padding: 0.75rem 1.75rem;
          background: linear-gradient(135deg, var(--moss), var(--sage));
          color: var(--soft-white) !important;
          border-radius: 12px;
          transition: all 0.3s var(--ease-out-quart);
          text-decoration: none;
          font-size: 0.9rem;
          border: 2px solid transparent;
          box-shadow: 0 2px 8px rgba(90, 102, 80, 0.15);
          position: relative;
          overflow: hidden;
        }

        .nav-cta-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--sage), var(--moss));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-cta-button:hover::before {
          opacity: 1;
        }

        .nav-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(90, 102, 80, 0.25);
        }

        .nav-cta-button::after {
          display: none !important;
        }

        /* Categories Dropdown */
        .nav-dropdown {
          position: relative;
        }

        .nav-dropdown-trigger {
          background: none;
          border: none;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--charcoal);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0;
          transition: color 0.3s ease;
          letter-spacing: 0.02em;
        }

        .nav-dropdown-trigger:hover {
          color: var(--rust);
        }

        .nav-dropdown-trigger svg {
          transition: transform 0.3s ease;
        }

        .nav-dropdown-menu.open + .nav-dropdown-trigger svg,
        .nav-dropdown-trigger:hover svg {
          transform: rotate(180deg);
        }

        .nav-dropdown-menu {
          position: absolute;
          top: calc(100% + 1rem);
          left: 0;
          background: var(--soft-white);
          border-radius: 16px;
          box-shadow: 0 12px 48px rgba(44, 40, 37, 0.12), 0 0 0 1px rgba(124, 132, 113, 0.08);
          padding: 0.75rem;
          min-width: 300px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s var(--ease-out-quart);
          z-index: 1000;
          max-height: 500px;
          overflow-y: auto;
          backdrop-filter: blur(10px);
        }

        .nav-dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.875rem 1.125rem;
          color: var(--charcoal);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s var(--ease-out-quart);
          font-size: 0.95rem;
          font-weight: 500;
          border: 1px solid transparent;
        }

        .dropdown-item:hover {
          background: var(--sand);
          color: var(--rust);
          border-color: rgba(198, 123, 92, 0.15);
          transform: translateX(4px);
        }

        .dropdown-item::after {
          display: none !important;
        }

        .category-icon {
          font-size: 1.5rem;
          line-height: 1;
          filter: grayscale(0.2);
        }

        .dropdown-item:hover .category-icon {
          filter: grayscale(0);
          transform: scale(1.1);
          transition: all 0.2s ease;
        }

        .category-name {
          flex: 1;
        }

        .seasonal-badge {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.3rem 0.6rem;
          background: linear-gradient(135deg, var(--rust), #B56B4F);
          color: var(--soft-white);
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 2px 6px rgba(198, 123, 92, 0.25);
        }

        .dropdown-item.seasonal {
          border-left: 3px solid var(--rust);
          padding-left: 1rem;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 110;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          width: 24px;
          height: 18px;
          justify-content: space-between;
          position: relative;
        }

        .hamburger span {
          width: 100%;
          height: 2px;
          background: var(--charcoal);
          border-radius: 1px;
          transition: all 0.3s var(--ease-out-quart);
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Tablet and Mobile Responsive */
        @media (max-width: 991px) {
          .nav-links {
            gap: 1.5rem;
          }

          .nav-links a {
            font-size: 0.9rem;
          }

          .nav-cta-button {
            padding: 0.5rem 1.25rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 767px) {
          .mobile-menu-btn {
            display: block;
          }

          .nav-links {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: var(--cream);
            padding: 5rem 2rem 2rem 2rem;
            flex-direction: column;
            gap: 2rem;
            text-align: center;
            transform: translateY(-100%);
            transition: transform 0.4s var(--ease-out-quart);
            z-index: 100;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .nav-links.mobile-open {
            transform: translateY(0);
          }

          .nav-links a {
            font-size: 1.1rem;
            padding: 1rem 0;
            border-bottom: 1px solid var(--sand);
            width: 100%;
            display: block;
          }

          .nav-links a:hover::after {
            width: 0;
          }

          .nav-cta-button {
            margin-top: 1rem;
            width: 100%;
            max-width: 240px;
            padding: 1rem 2rem;
            font-size: 1rem;
            border-radius: 12px;
            border-bottom: none !important;
            position: relative;
          }

          .nav-cta-button span {
            position: relative;
            z-index: 1;
          }

          /* Mobile Dropdown Styles */
          .nav-dropdown {
            width: 100%;
          }

          .nav-dropdown-trigger {
            width: 100%;
            justify-content: center;
            padding: 1rem 0;
            border-bottom: 1px solid var(--sand);
            font-size: 1.1rem;
          }

          .nav-dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            background: var(--sand);
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s var(--ease-out-quart);
            padding: 0;
          }

          .nav-dropdown-menu.open {
            max-height: 600px;
            padding: 0.5rem;
          }

          .dropdown-item {
            font-size: 1rem;
            padding: 1rem;
          }
        }

        @media (max-width: 479px) {
          .nav-links {
            padding: 4rem 1.5rem 1.5rem 1.5rem;
            gap: 1.5rem;
          }

          .nav-links a {
            font-size: 1rem;
            padding: 0.75rem 0;
          }

          .nav-cta-button {
            max-width: 200px;
            padding: 0.875rem 1.5rem;
            font-size: 0.95rem;
          }
        }

        /* Focus states for accessibility */
        .nav-links a:focus-visible,
        .nav-cta-button:focus-visible {
          outline: 2px solid var(--sage);
          outline-offset: 4px;
          border-radius: 2px;
        }
      `}</style>
    </header>
  );
}

