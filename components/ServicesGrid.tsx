import Link from 'next/link'
import Image from 'next/image'
import { SERVICE_VISUALS } from '@/lib/visuals'

const items = [
  SERVICE_VISUALS.weddings,
  SERVICE_VISUALS.corporate,
  SERVICE_VISUALS.private,
  SERVICE_VISUALS.daily,
]

export default function ServicesGrid(){
  return (
    <section className="services-section" aria-labelledby="services-heading">
      <div className="container stack">
        <header className="pinch services-section__intro" data-reveal>
          <p className="hero-pill" aria-hidden>
            Signature Offerings
          </p>
          <h2 id="services-heading">Florals designed for every moment</h2>
          <p>
            Dedicated teams for weddings, brand experiences, intimate gatherings, and ongoing floral programs.
            Each service is fully produced in-house, from concept sketches to flawless strike.
          </p>
        </header>
        <div className="services-grid">
          {items.map((item, index)=> {
            const slug = item.title.toLowerCase().replace(/\s+/g, '-')
            const titleId = `service-${slug}-title`
            const descriptionId = `service-${slug}-description`
            const highlightsId = `service-${slug}-highlights`

            return (
              <Link
                key={item.href}
                href={item.href}
                className="service-card"
                data-reveal
                aria-labelledby={`${titleId} ${descriptionId}`}
                aria-describedby={highlightsId}
              >
                <div className="service-card-image">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 320px"
                    className="service-card-img"
                  />
                  <span className="service-card-badge" aria-hidden>
                    {item.title}
                  </span>
                </div>
                <div className="service-card-content">
                  <div className="service-card-header">
                    <span className="service-card-kicker">{item.title}</span>
                    <h3 className="service-card-title" id={titleId}>
                      {item.copy}
                    </h3>
                    <p className="service-card-description" id={descriptionId}>
                      Explore moodboards, timelines, and production notes tailored to your celebration.
                    </p>
                  </div>
                  <ul className="service-card-highlights" id={highlightsId}>
                    {item.highlights.map((highlight)=> (
                      <li key={highlight}>
                        <span aria-hidden="true" className="service-card-bullet" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="service-card-footer" aria-hidden>
                    <span className="service-card-cta">Explore {item.title}</span>
                    <span className="service-card-arrow" aria-hidden>
                      <svg width="26" height="12" viewBox="0 0 26 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.75 6H24.75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.75 1L24.75 6L19.75 11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
