import HeroRotator from '@/components/HeroRotator'
import ServicesGrid from '@/components/ServicesGrid'
import GalleryGrid from '@/components/GalleryGrid'
import GalleryGridEnhanced from '@/components/GalleryGridEnhanced'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import CTAStrip from '@/components/CTAStrip'
import FloatingCTA from '@/components/FloatingCTA'
import { BRAND } from '@/lib/brand'
import { FEATURED_SHOWCASE, HERO_ROTATIONS } from '@/lib/visuals'
import { weddings, corporate, privateEvents, daily } from '@/lib/galleries'

export const metadata = {
  title: `${BRAND.name} — Luxury Floral Design in Houston`,
  description:
    'Elevated floral design for weddings, corporate and private events, and daily arrangements. Houston, Texas — by appointment.',
}

export default function HomePage(){
  // Build dynamic image selections from the curated gallery folders
  const priv = privateEvents

  // Recent mix: a small selection across categories (only existing files)
  const recent = [
  ...weddings.slice(0, 2),
  ...corporate.slice(0, 1),
    ...priv.slice(0, 1),
    ...daily.slice(0, 2),
  ]

  return (
    <>
      <HeroRotator
        images={HERO_ROTATIONS.home}
        eyebrow="Heyday Flower Co"
        title="Floral artistry for celebrations and spaces"
        sub="Custom blooms crafted for weddings, events, and refined daily environments."
        primaryCta={{ label: 'Start Your Inquiry', href: 'mailto:HeydayFlowerCo@gmail.com' }}
        secondaryCta={{ label: 'Explore Weddings', href: '/weddings' }}
        align="start"
      />

      <ServicesGrid />

      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch" style={{ textAlign:'center' }}>
            <h2>Recent celebrations</h2>
            <p>Highlights from weddings, corporate experiences, and private gatherings designed by the Heyday team.</p>
          </header>
          {recent.length > 0 ? (
            <GalleryGrid items={recent} />
          ) : (
            <p style={{opacity:0.8}}>Photos are being prepared. Please check back soon.</p>
          )}
        </div>
      </section>

      <section className="page-section" data-reveal>
        <div className="container stack">
          <header className="pinch" style={{ textAlign:'center' }}>
            <h2>Signature showcase</h2>
            <p>Eight defining installations that capture the scale, texture, and artistry of the Heyday portfolio.</p>
          </header>
          <GalleryGridEnhanced images={FEATURED_SHOWCASE} columns={4} />
        </div>
      </section>

      <TestimonialCarousel />

      <CTAStrip />

      <FloatingCTA />
    </>
  )
}
