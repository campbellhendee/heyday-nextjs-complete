import Hero from '@/components/Hero'
import ColorFilter from '@/components/ColorFilter'
import GalleryGrid from '@/components/GalleryGrid'
import CTAStrip from '@/components/CTAStrip'

export const metadata = {
  title: 'Weddings',
  description: 'Timeless floral designs for ceremonies and receptions.'
}

export default function Weddings(){
  return (
    <>
      <Hero title="Weddings" subtitle="Timeless designs for your forever moments" image="/images/hero/weddings-hero.jpg" />
      <section className="container" data-reveal>
        <h2>Overview</h2>
        <ul>
          <li>Bouquets and personal flowers</li>
          <li>Ceremony installations</li>
          <li>Reception tablescapes</li>
          <li>Large-scale installations</li>
        </ul>
      </section>
      <section className="container" data-reveal>
        <h2>Portfolio</h2>
        <ColorFilter />
        <GalleryGrid />
      </section>
      <section className="container" data-reveal>
        <h2>How we work</h2>
        <ol>
          <li>Inquiry</li>
          <li>Design</li>
          <li>Production</li>
          <li>Day-of</li>
        </ol>
      </section>
      <CTAStrip text="Ready to discuss your wedding flowers?" />
    </>
  )
}
