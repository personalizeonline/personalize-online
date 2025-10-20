"use client";
import { useEffect } from 'react';

export default function Seo(){
  useEffect(()=>{
    (async () => {
      try {
        const cfg = (window as any).__siteConfig || await fetch('/config.json').then(r=>r.json()).catch(()=>({}));
        (window as any).__siteConfig = cfg;
        const siteUrl = cfg.siteUrl || location.origin;
        const abs = new URL(location.pathname + location.search, siteUrl).toString();
        // canonical
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
        link.href = abs;
        // og:url
        let og = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
        if (!og) { og = document.createElement('meta'); og.setAttribute('property','og:url'); document.head.appendChild(og); }
        og.setAttribute('content', abs);
        // JSON-LD bundle
        injectJsonLd(cfg, siteUrl);
      } catch {}
    })();
  }, []);
  return null;
}

function injectJsonLd(cfg:any, siteUrl:string){
  try {
    const brand = cfg.brand || 'Personal Song';
    const logo = cfg.brandLogoUrl || new URL('/assets/favicon.svg', location.origin).toString();
    const support = cfg.supportEmail || 'support@example.com';
    const nodes:any[] = [];
    nodes.push({ '@context':'https://schema.org','@type':'Organization', name: brand, url: siteUrl, logo, contactPoint:[{ '@type':'ContactPoint', email: support, contactType:'customer support'}] });
    nodes.push({ '@context':'https://schema.org','@type':'WebSite', name: brand, url: siteUrl, potentialAction:{ '@type':'SearchAction', target: `${siteUrl}/?q={search_term_string}`, 'query-input':'required name=search_term_string' } });
    const offers:any[] = [];
    if (cfg.checkout?.subscription) offers.push({ '@type':'Offer', url: cfg.checkout.subscription, priceCurrency:'USD', price:'12.99', availability:'https://schema.org/InStock' });
    if (cfg.checkout?.onetime) offers.push({ '@type':'Offer', url: cfg.checkout.onetime, priceCurrency:'USD', price:'4.99', availability:'https://schema.org/InStock' });
    if (offers.length) nodes.push({ '@context':'https://schema.org','@type':'Product', name:'Personalized Song', brand, offers });
    const faqs = [
      { q: 'Will my song mention my name?', a: 'Yes, if you add it. We create a gentle dedication line.' },
      { q: 'Do I need an app?', a: 'No. Everything plays on the site. Add to Home Screen for 1‑tap access.' },
      { q: 'Can I download my song?', a: 'Downloads are included on paid plans and one‑time purchases.' },
      { q: 'Is this religious?', a: 'We offer scripture‑anchored options and neutral wellness options.' },
      { q: 'Is this private?', a: 'Your selections are private. Songs are created for you and not shared unless you choose to.' }
    ];
    nodes.push({ '@context':'https://schema.org','@type':'FAQPage', mainEntity: faqs.map(f=>({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })) });

    let script = document.getElementById('ld-bundle') as HTMLScriptElement | null;
    if (!script) { script = document.createElement('script'); script.type = 'application/ld+json'; script.id = 'ld-bundle'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(nodes);
  } catch {}
}

