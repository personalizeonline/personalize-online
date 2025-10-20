"use client";
import { useEffect, useState } from 'react';

export function Consent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const state = localStorage.getItem('consent');
    if (state !== 'accepted' && state !== 'declined') setShow(true);
  }, []);
  const accept = () => { localStorage.setItem('consent','accepted'); setShow(false); loadPlausible(); };
  const decline = () => { localStorage.setItem('consent','declined'); setShow(false); };
  return show ? (
    <div className="consent" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="container consent-inner">
        <span>We use minimal analytics to improve the experience. Do you consent?</span>
        <div className="consent-actions">
          <button className="btn btn-sm" onClick={decline}>No</button>
          <button className="btn btn-primary btn-sm" onClick={accept}>Yes</button>
        </div>
      </div>
    </div>
  ) : null;
}

function loadPlausible(){
  try {
    const s = document.createElement('script');
    s.defer = true; s.id = 'plausible';
    const domain = (window as any).__siteConfig?.plausibleDomain;
    if (!domain) return;
    s.setAttribute('data-domain', domain);
    s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  } catch {}
}

