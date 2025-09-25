import Hero from '@/components/Hero'
import GalleryGrid from '@/components/GalleryGrid'
import CTAStrip from '@/components/CTAStrip'
import { privateGallery } from '@/public/images/_curation/private.gallery'

export const metadata = {
  title: 'Private Events',
  description: 'Intimate dinners and parties with refined florals.'
}

export default function Private(){
  return (
    <>
      <Hero title="Private Events" subtitle="Intimate celebrations deserve extraordinary flowers" image="/images/hero/private-hero.jpg" />
      <section className="container" data-reveal>
        <h2>Overview</h2>
        <ul>
          <li>Tablescapes</li>
          <li>Entry moments</li>
          <li>Bar installations</li>
        </ul>
      </section>
      <section className="container" data-reveal>
        <h2>Gallery</h2>
        <GalleryGrid items={privateGallery} />
      </section>
      <CTAStrip text="Let's design something special" />
    </>
  )
}
