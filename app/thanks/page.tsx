"use client";
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Seo from '@/components/Seo';

export default function ThanksPage(){
  useEffect(()=>{
    localStorage.setItem('purchased','1');
  },[]);

  return (
    <>
      <Seo />
      <Navbar />
      <main>
        <section className="section thanks">
          <div className="container">
            <h1>Thank you!</h1>
            <p>Your purchase is confirmed. Start listening below.</p>
            <p className="fine">Tip: Bookmark this page or add it to your Home Screen.</p>
            <div className="card">
              <h3>Your song</h3>
              <p><a href="/play?purchased=1" className="btn btn-primary">Open player</a></p>
              <p className="fine">Downloads will be enabled on the player page.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
