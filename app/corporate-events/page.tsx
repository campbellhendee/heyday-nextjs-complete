import type { Metadata } from 'next'
import HeroRotator from '@/components/HeroRotator'
import GalleryGrid from '@/components/GalleryGrid'
import CTAStrip from '@/components/CTAStrip'
import { corporate } from '@/lib/galleries'
import { HERO_ROTATIONS } from '@/lib/visuals'
import { BRAND } from '@/lib/brand'

const CORPORATE_OG = HERO_ROTATIONS.corporate[0]?.src ?? '/images/hero/corporate.jpg'

export const metadata: Metadata = {
  title: 'Corporate Events',
  description: 'Elevated floral installations for brand launches, conferences, hospitality suites, and executive gatherings.',
  alternates: { canonical: '/corporate-events' },
  keywords: ['corporate event florist', 'brand activation florals', 'houston corporate flowers', 'stage floral design'],
  openGraph: {
    title: 'Corporate Events — Heyday Flower Co',
    description: 'Immersive floral environments that amplify your brand storytelling across stages, lounges, and activations.',
    url: '/corporate-events',
    type: 'website',
    siteName: BRAND.name,
    images: [{ url: CORPORATE_OG, width: 1600, height: 900, alt: 'Corporate floral installation by Heyday Flower Co' }],
  },
  twitter: {
    title: 'Corporate Events — Heyday Flower Co',
    description: 'Strategic floral design for conferences, galas, product launches, and VIP experiences.',
    images: [CORPORATE_OG],
  },
}

export default function Corporate(){
  return (
    <>
      <HeroRotator
        images={HERO_ROTATIONS.corporate}
        eyebrow="Corporate Events"
        title="Immersive floral environments for your brand"
        sub="Transform entrances, stages, and lounges into purposeful storytelling moments."
        primaryCta={{ label: 'Plan Your Event', href: 'mailto:HeydayFlowerCo@gmail.com' }}
        secondaryCta={{ label: 'View Weddings', href: '/weddings' }}
        align="start"
      />
      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch">
            <h2>Floral experiences for brand storytelling</h2>
            <p>Strategic installations that amplify your message, welcome VIP guests, and live seamlessly with production design.</p>
          </header>
          <ul className="bullet-list">
            <li>Grand entrances and lobby transformations</li>
            <li>Stage backdrops, media walls, and keynote focal points</li>
            <li>Hospitality lounges, dining spaces, and VIP suites</li>
            <li>Press moments, photo activations, and product unveilings</li>
          </ul>
        </div>
      </section>

      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch">
            <h2>Selected work</h2>
            <p>Recent collaborations spanning conferences, galas, brand launches, and destination incentives.</p>
          </header>
          <GalleryGrid items={corporate} />
        </div>
      </section>

      <CTAStrip text="Let’s create an immersive brand moment" button="Plan your event" />
    </>
  )
}
