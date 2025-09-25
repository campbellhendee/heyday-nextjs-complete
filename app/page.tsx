import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import GalleryGrid from '@/components/GalleryGrid'
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

      <CTAStrip />
    </>
  )
}
