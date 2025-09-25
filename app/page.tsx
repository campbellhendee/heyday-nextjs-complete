import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import GalleryGrid from '@/components/GalleryGrid'
import GalleryGridEnhanced from '@/components/GalleryGridEnhanced'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import CTAStrip from '@/components/CTAStrip'
import { BRAND } from '@/lib/brand'
import { getWeddingsGallery, getCorporateGallery, getPrivateGallery, getDailyGallery } from '@/lib/galleries'

export const metadata = {
  title: `${BRAND.name} — Luxury Floral Design in Houston`,
  description:
    'Elevated floral design for weddings, corporate and private events, and daily arrangements. Houston, Texas — by appointment.',
}

export default function HomePage(){
  // Build dynamic image selections from the curated gallery folders
  const weddings = getWeddingsGallery()
  const corporate = getCorporateGallery()
  const priv = getPrivateGallery()
  const daily = getDailyGallery()

  // Recent mix: a small selection across categories (only existing files)
  const recent = [
    ...weddings.slice(0, 2),
    ...corporate.slice(0, 1),
    ...priv.slice(0, 1),
    ...daily.slice(0, 2),
  ]

  // Featured: first three from weddings (or from recent if weddings < 3)
  const featuredBase = (weddings.length >= 3 ? weddings.slice(0,3) : recent.slice(0,3))
  const featured = featuredBase.map((it, idx)=> ({ id: String(idx+1), src: it.src, alt: it.alt, event: undefined as string|undefined, color: it.color }))

  return (
    <>
      <Hero
        title="Elevated Floral Design"
        subtitle="Creating unforgettable moments through the art of floristry"
        image="/images/hero/home-hero.jpg"
        primary={{ text:'Start Your Inquiry', href: 'mailto:HeydayFlowerCo@gmail.com' }}
        secondary={{ text:'View Weddings', href:'/weddings' }}
      />

      <ServicesGrid />

      <section className="gallery-section">
        <div className="container">
          <h2 style={{marginBottom:12}}>Recent Celebrations</h2>
          {recent.length > 0 ? (
            <GalleryGrid items={recent} />
          ) : (
            <p style={{opacity:0.8}}>Photos are being prepared. Please check back soon.</p>
          )}
        </div>
      </section>

      <section className="container" style={{paddingBlock:32}}>
        <h2 style={{marginBottom:12}}>Featured Moments</h2>
        {featured.length > 0 ? (
          <GalleryGridEnhanced images={featured} />
        ) : (
          <p style={{opacity:0.8}}>Featured images will appear here soon.</p>
        )}
      </section>

      <TestimonialCarousel />

      <CTAStrip />
    </>
  )
}
