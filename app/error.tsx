'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <>
      <Navbar />
      <main>
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: '900', margin: '0', color: '#ef4444' }}>Oops!</h1>
            <h2 style={{ fontSize: '2rem', marginTop: '1rem', marginBottom: '1rem' }}>Something Went Wrong</h2>
            <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              We encountered an unexpected error. Don't worry, it's not your fault!
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details style={{ marginBottom: '2rem', textAlign: 'left', maxWidth: '800px', margin: '0 auto 2rem', padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '0.5rem' }}>Error Details (Development Only)</summary>
                <pre style={{ overflow: 'auto', fontSize: '0.875rem', color: '#dc2626' }}>
                  {error.message}
                  {error.digest && `\n\nDigest: ${error.digest}`}
                </pre>
              </details>
            )}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={reset}
                className="btn btn-primary"
              >
                Try Again
              </button>
              <Link href="/" className="btn btn-secondary">
                Go Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
