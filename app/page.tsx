import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import GalleryGrid from '@/components/GalleryGrid'
import GalleryGridEnhanced from '@/components/GalleryGridEnhanced'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import CTAStrip from '@/components/CTAStrip'
import { BRAND } from '@/lib/brand'

export const metadata = {
  title: `${BRAND.name} — Luxury Floral Design in Houston`,
  description:
    'Elevated floral design for weddings, corporate and private events, and daily arrangements. Houston, Texas — by appointment.',
}

export default function HomePage(){
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
          <GalleryGrid />
        </div>
      </section>

      <section className="container" style={{paddingBlock:32}}>
        <h2 style={{marginBottom:12}}>Featured Moments</h2>
        <GalleryGridEnhanced images={[
          { id:'1', src:'/images/gallery/01.jpg', alt:'Bouquet with blush tones', event:'Intimate Garden Wedding', color:'blush' },
          { id:'2', src:'/images/gallery/02.jpg', alt:'Centerpiece with greenery', event:'Modern Loft Reception', color:'greenery' },
          { id:'3', src:'/images/gallery/03.jpg', alt:'Bold floral installation', event:'Corporate Launch', color:'bold' },
        ]} />
      </section>

      <TestimonialCarousel />

      <CTAStrip />
    </>
  )
}
