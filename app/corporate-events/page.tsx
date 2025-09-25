import Hero from '@/components/Hero'
import GalleryGrid from '@/components/GalleryGrid'
import CTAStrip from '@/components/CTAStrip'
import { corporateGallery } from '@/public/images/_curation/corporate.gallery'

export const metadata = {
  title: 'Corporate Events',
  description: 'Elevated installations for brand experiences.'
}

export default function Corporate(){
  return (
    <>
      <Hero title="Corporate Events" subtitle="Elevating brand experiences through floristry" image="/images/hero/corporate-hero.jpg" />
      <section className="container" data-reveal>
        <h2>Overview</h2>
        <ul>
          <li>Entrances and lobbies</li>
          <li>Stages and backdrops</li>
          <li>Lounges and vignettes</li>
          <li>Step-and-repeats</li>
        </ul>
      </section>
      <section className="container" data-reveal>
        <h2>Selected work</h2>
        <GalleryGrid items={corporateGallery} />
      </section>
      <CTAStrip text="Let's create something extraordinary" />
    </>
  )
}
