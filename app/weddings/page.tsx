import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { weddings } from '@/lib/galleries'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'Weddings',
  description: 'Timeless floral designs for ceremonies, receptions, and destination weekends by Heyday Flower Co.',
  alternates: { canonical: '/weddings' },
  keywords: ['luxury wedding florist', 'ceremony flowers houston', 'destination wedding florals', 'houston wedding designer'],
  openGraph: {
    title: 'Weddings — Heyday Flower Co',
    description: 'Timeless florals, immersive installations, and detail-driven design for modern couples.',
    url: '/weddings',
    type: 'website',
    siteName: BRAND.name,
    images: [{ url: '/images/hero/weddings.jpg', width: 1600, height: 900, alt: 'Heyday Flower Co wedding installation' }],
  },
  twitter: {
    title: 'Weddings — Heyday Flower Co',
    description: 'Ceremony architecture, reception installations, and personal flowers tailored to your celebration.',
    images: ['/images/hero/weddings.jpg'],
  },
}

export default function Weddings(){
  return (
    <>
      <section className="hero">
        <div className="hero-image">
          <Image 
            src="/images/hero/weddings.jpg" 
            alt="" 
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Weddings</h1>
          <p className="hero-subtitle">Timeless Florals for Modern Couples</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Wedding Portfolio</h2>
            <p className="section-subtitle">
              Explore a range of palettes and settings from downtown penthouses to countryside estates.
            </p>
          </div>
          {weddings.length > 0 && (
            <div className="gallery">
              {weddings.map((image, index) => (
                <div key={index} className="gallery-item">
                  <Image 
                    src={typeof image === 'string' ? image : image.src}
                    alt=""
                    width={500}
                    height={500}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Ready to Discuss Your Wedding Flowers?</h2>
          <Link href="/inquiry" className="btn">
            Start Your Inquiry
          </Link>
        </div>
      </section>
    </>
  )
}
