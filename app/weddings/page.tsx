import type { Metadata } from 'next'
import HeroRotator from '@/components/HeroRotator'
import WeddingsPortfolio from '@/components/WeddingsPortfolio'
import CTAStrip from '@/components/CTAStrip'
import { weddings } from '@/lib/galleries'
import { HERO_ROTATIONS } from '@/lib/visuals'
import { BRAND } from '@/lib/brand'

const WEDDINGS_OG = HERO_ROTATIONS.weddings[0]?.src ?? '/images/hero/weddings.jpg'

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
    images: [{ url: WEDDINGS_OG, width: 1600, height: 900, alt: 'Heyday Flower Co wedding installation' }],
  },
  twitter: {
    title: 'Weddings — Heyday Flower Co',
    description: 'Ceremony architecture, reception installations, and personal flowers tailored to your celebration.',
    images: [WEDDINGS_OG],
  },
}

export default function Weddings(){
  return (
    <>
      <HeroRotator
        images={HERO_ROTATIONS.weddings}
        eyebrow="Weddings"
        title="Timeless florals for the modern couple"
        sub="Romantic blooms, lush installations, and intentional details from welcome party to farewell brunch."
        primaryCta={{ label: 'Start Your Inquiry', href: 'mailto:HeydayFlowerCo@gmail.com' }}
        secondaryCta={{ label: 'View Corporate Events', href: '/corporate-events' }}
        align="start"
      />
      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch">
            <h2>Our wedding floral services</h2>
            <p>From grand ceremony architecture to detailed personal flowers, every design is bespoke to your celebration.</p>
          </header>
          <ul className="bullet-list">
            <li>Bouquets, personals, and curated ceremony party styling</li>
            <li>Statement ceremony installations and aisle treatments</li>
            <li>Reception tablescapes, suspended florals, and dance floor moments</li>
            <li>Weekend experiences including welcome party and farewell brunch</li>
          </ul>
        </div>
      </section>

      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch">
            <h2>Portfolio</h2>
            <p>Explore a range of palettes and settings from downtown penthouses to countryside estates.</p>
          </header>
          <WeddingsPortfolio items={weddings} />
        </div>
      </section>

      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch">
            <h2>The Heyday process</h2>
            <p>Our collaborative approach keeps you informed and inspired from first call through strike.</p>
          </header>
          <ol className="number-list">
            <li>Inquiry &amp; discovery call to align on vision, priorities, and investment.</li>
            <li>Concept design with moodboards, palettes, and preliminary space planning.</li>
            <li>Production management, vendor coordination, and on-site styling logistics.</li>
            <li>Wedding day installation, refreshes, and post-event strike handled by our team.</li>
          </ol>
        </div>
      </section>

      <CTAStrip text="Ready to discuss your wedding flowers?" button="Book a consultation" />
    </>
  )
}
