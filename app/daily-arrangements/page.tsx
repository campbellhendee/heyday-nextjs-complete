import Hero from '@/components/Hero'
import GalleryGrid from '@/components/GalleryGrid'
import CTAStrip from '@/components/CTAStrip'
import { getDailyGallery } from '@/lib/galleries'

export const metadata = {
  title: 'Daily Arrangements',
  description: 'Fresh florals for homes, lobbies, and suites.'
}

export default function Daily(){
  return (
    <>
      <Hero title="Daily Arrangements" subtitle="Fresh beauty delivered to your door" image="/images/hero/daily-hero.jpg" />
      <section className="container" data-reveal>
        <h2>Overview</h2>
        <ul>
          <li>Homes and lobbies</li>
          <li>Executive suites</li>
          <li>Weekly / Biweekly / Monthly</li>
        </ul>
      </section>
      <section className="container" data-reveal>
        <h2>Gallery</h2>
        <GalleryGrid items={getDailyGallery()} />
      </section>
      <CTAStrip text="Inquire about subscriptions" />
    </>
  )
}
