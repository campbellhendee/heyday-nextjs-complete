import ColorFilter from '../components/ColorFilter'
import GalleryGrid from '../components/GalleryGrid'
import StickySubnav from '../components/StickySubnav'

export default function HomePage(){
  return (
    <>
      <section className="hero container" id="overview" data-reveal>
        <h1>Heyday Flower Co</h1>
        <p>Luxury floral design for weddings, brands, private dinners, and daily arrangements.</p>
      </section>

      <StickySubnav />

      <section className="container" id="portfolio" data-reveal>
        <h2>Portfolio</h2>
        <ColorFilter />
        <GalleryGrid />
      </section>

      <section className="container" id="process" data-reveal>
        <h2>Process</h2>
        <p>From concept to celebration, we partner closely to craft bespoke floral experiences.</p>
      </section>

      <section className="container" id="investment" data-reveal>
        <h2>Investment</h2>
        <p>Custom proposals tailored to your event and vision.</p>
      </section>
    </>
  )
}
