import type { Metadata } from 'next'
import HeroRotator from '@/components/HeroRotator'
import GalleryGrid from '@/components/GalleryGrid'
import CTAStrip from '@/components/CTAStrip'
import { daily } from '@/lib/galleries'
import { HERO_ROTATIONS } from '@/lib/visuals'
import { BRAND } from '@/lib/brand'

const DAILY_OG = HERO_ROTATIONS.daily[0]?.src ?? '/images/hero/daily.jpg'

export const metadata: Metadata = {
  title: 'Daily Arrangements',
  description: 'Fresh florals for residences, hospitality suites, and corporate environments with bespoke maintenance programs.',
  alternates: { canonical: '/daily-arrangements' },
  keywords: ['weekly floral delivery', 'residential florals houston', 'hospitality floral program', 'corporate lobby flowers'],
  openGraph: {
    title: 'Daily Arrangements — Heyday Flower Co',
    description: 'Customized floral programs with flexible refresh schedules for homes, hotels, and executive offices.',
    url: '/daily-arrangements',
    type: 'website',
    siteName: BRAND.name,
    images: [{ url: DAILY_OG, width: 1600, height: 900, alt: 'Daily floral arrangement by Heyday Flower Co' }],
  },
  twitter: {
    title: 'Daily Arrangements — Heyday Flower Co',
    description: 'Residential and hospitality floral programs tailored to your interiors and cadence.',
    images: [DAILY_OG],
  },
}

export default function Daily(){
  return (
    <>
      <HeroRotator
        images={HERO_ROTATIONS.daily}
        eyebrow="Daily Arrangements"
        title="Floral programs for homes and hospitality"
        sub="Weekly, biweekly, or monthly installations curated for residences, lobbies, and suites."
        primaryCta={{ label: 'Start Your Inquiry', href: 'mailto:HeydayFlowerCo@gmail.com' }}
        secondaryCta={{ label: 'View Private Events', href: '/private-events' }}
        align="start"
      />
      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch">
            <h2>Programs tailored to your space</h2>
            <p>Fresh, seasonal blooms curated for residences, lobbies, and luxury hospitality environments.</p>
          </header>
          <ul className="bullet-list">
            <li>Homes, model residences, and penthouse suites</li>
            <li>Corporate lobbies, executive offices, and concierge desks</li>
            <li>Weekly, biweekly, or monthly deliveries with on-site refresh options</li>
          </ul>
        </div>
      </section>

      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch">
            <h2>Gallery</h2>
            <p>Signature color palettes and vessels designed to harmonize with your interiors.</p>
          </header>
          <GalleryGrid items={daily} />
        </div>
      </section>

      <CTAStrip text="Ready to style your space with florals?" button="Request a proposal" />
    </>
  )
}
