import type { Metadata } from 'next'
import HeroRotator from '@/components/HeroRotator'
import GalleryGrid from '@/components/GalleryGrid'
import CTAStrip from '@/components/CTAStrip'
import { privateEvents } from '@/lib/galleries'
import { HERO_ROTATIONS } from '@/lib/visuals'
import { BRAND } from '@/lib/brand'

const PRIVATE_OG = HERO_ROTATIONS.private[0]?.src ?? '/images/hero/private.jpg'

export const metadata: Metadata = {
  title: 'Private Events',
  description: 'Intimate dinners, milestone parties, and at-home gatherings elevated with couture florals and candlelight.',
  alternates: { canonical: '/private-events' },
  keywords: ['private event florist', 'houston dinner party flowers', 'milestone celebration florals', 'luxury home florals'],
  openGraph: {
    title: 'Private Events — Heyday Flower Co',
    description: 'Atmospheric florals, layered tablescapes, and concierge styling for intimate celebrations.',
    url: '/private-events',
    type: 'website',
    siteName: BRAND.name,
    images: [{ url: PRIVATE_OG, width: 1600, height: 900, alt: 'Private event tablescape by Heyday Flower Co' }],
  },
  twitter: {
    title: 'Private Events — Heyday Flower Co',
    description: 'Candlelit dinners and milestone soirées styled with bespoke floral design.',
    images: [PRIVATE_OG],
  },
}

export default function Private(){
  return (
    <>
      <HeroRotator
        images={HERO_ROTATIONS.private}
        eyebrow="Private Events"
        title="Atmospheric florals for intimate gatherings"
        sub="From candlelit dinners to milestone soirées, every surface blooms with intention."
        primaryCta={{ label: 'Start Your Inquiry', href: 'mailto:HeydayFlowerCo@gmail.com' }}
        secondaryCta={{ label: 'Explore Daily Florals', href: '/daily-arrangements' }}
        align="start"
      />
      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch">
            <h2>Intimate celebrations, elevated details</h2>
            <p>Bespoke florals that transform private residences and boutique venues into immersive experiences.</p>
          </header>
          <ul className="bullet-list">
            <li>Tablescapes layered with candles, textures, and couture blooms</li>
            <li>Welcome entries and staircases styled for maximum impact</li>
            <li>Bar, lounge, and photo vignettes that feel personal and transportive</li>
          </ul>
        </div>
      </section>

      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch">
            <h2>Gallery</h2>
            <p>Recent private dinners, soirées, and milestones across Houston and beyond.</p>
          </header>
          <GalleryGrid items={privateEvents} />
        </div>
      </section>

      <CTAStrip text="Let’s design an unforgettable gathering" button="Start your inquiry" />
    </>
  )
}
