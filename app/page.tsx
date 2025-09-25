import Image from 'next/image'
import Link from 'next/link'
import { BRAND } from '@/lib/brand'
import { weddings, corporate, privateEvents, daily } from '@/lib/galleries'

export const metadata = {
  title: `${BRAND.name} — Luxury Floral Design in Houston`,
  description:
    'Elevated floral design for weddings, corporate and private events, and daily arrangements. Houston, Texas — by appointment.',
}

export default function HomePage(){
  const recent = [
    ...weddings.slice(0, 3),
    ...corporate.slice(0, 2),
    ...privateEvents.slice(0, 2),
    ...daily.slice(0, 3),
  ]

  const services = [
    {
      title: 'Weddings',
      description: 'Elevated floral artistry for your most important celebration.',
      image: '/images/hero/weddings.jpg',
      href: '/weddings'
    },
    {
      title: 'Corporate Events',
      description: 'Professional installations that elevate brand experiences.',
      image: '/images/hero/corporate.jpg',
      href: '/corporate-events'
    },
    {
      title: 'Private Events',
      description: 'Intimate gatherings designed with luxury and attention to detail.',
      image: '/images/hero/private.jpg',
      href: '/private-events'
    },
    {
      title: 'Daily Arrangements',
      description: 'Fresh florals to transform your daily environments.',
      image: '/images/hero/daily.jpg',
      href: '/daily-arrangements'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image">
          <Image 
            src="/images/hero/home.jpg" 
            alt="" 
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Heyday Flower Co</h1>
          <p className="hero-subtitle">Luxury Floral Design</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Elevated floral artistry for weddings, corporate events, 
              private celebrations, and refined daily environments.
            </p>
          </div>
          <div className="services">
            {services.map((service) => (
              <Link key={service.href} href={service.href} className="service-card">
                <div className="service-image">
                  <Image 
                    src={service.image}
                    alt=""
                    width={400}
                    height={500}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Recent Work</h2>
          </div>
          {recent.length > 0 && (
            <div className="gallery">
              {recent.map((image, index) => (
                <div key={index} className="gallery-item">
                  <Image 
                    src={typeof image === 'string' ? image : image.src}
                    alt=""
                    width={500}
                    height={500}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Ready to Begin?</h2>
          <Link href="/inquiry" className="btn">
            Start Your Inquiry
          </Link>
        </div>
      </section>
    </>
  )
}
