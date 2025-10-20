import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '6rem', fontWeight: '900', margin: '0', color: '#7c8471' }}>404</h1>
            <h2 style={{ fontSize: '2rem', marginTop: '1rem', marginBottom: '1rem' }}>Page Not Found</h2>
            <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn btn-primary">
                Go Home
              </Link>
              <Link href="/play" className="btn btn-secondary">
                Browse Songs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
