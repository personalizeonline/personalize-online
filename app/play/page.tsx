"use client";
import { useEffect, useState } from 'react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import Seo from '@/components/Seo';

export default function PlayPage(){
  const [map, setMap] = useState<Record<string,string>>({});
  const [src, setSrc] = useState<string>('');
  const [name, setName] = useState('');
  const [purchased, setPurchased] = useState(false);
  useEffect(()=>{ fetch('/assets/demo-audio-map.json').then(r=>r.json()).then(setMap).catch(()=>setMap({})); },[]);
  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const r = params.get('r');
    const need = params.get('need');
    const style = params.get('style');
    const n = params.get('name') || '';
    setName(n);
    const key = r || (need && style ? `${need}-${style}` : '');
    if (key) setSrc(map[key]);
    const p = params.get('purchased')==='1' || localStorage.getItem('purchased')==='1';
    setPurchased(p);
  },[map]);

  return (
    <>
      <Seo />
      <Navbar />
      <main>
        <section className="section play">
          <div className="container">
            <h1>Your personal song</h1>
            <p className="note">{name ? `A gentle dedication for ${name}.` : ''}</p>
            {src ? <audio controls preload="none" src={src}></audio> : <p>No audio found. Try creating a demo first.</p>}
            <div className="player-actions">
              <a id="download" className="btn" href={src || '#'} download hidden={!purchased}>Download MP3</a>
              <a href="/\#pricing" id="buy" className="btn btn-primary" hidden={purchased}>Get downloads</a>
            </div>
            <p className="fine">Tip: Add to Home Screen for quick daily listening.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
