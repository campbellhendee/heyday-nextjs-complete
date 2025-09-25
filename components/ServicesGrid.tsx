import Link from 'next/link'

const items = [
  { title:'Weddings', image:'/images/services/weddings.jpg', href:'/weddings' },
  { title:'Corporate Events', image:'/images/services/corporate.jpg', href:'/corporate-events' },
  { title:'Private Events', image:'/images/services/private.jpg', href:'/private-events' },
  { title:'Daily Arrangements', image:'/images/services/daily.jpg', href:'/daily-arrangements' },
]

export default function ServicesGrid(){
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-grid">
          {items.map(it=> (
            <Link key={it.href} href={it.href} className="service-card">
              <div className="service-card-image"><img src={it.image} alt={it.title} loading="lazy"/></div>
              <div className="service-card-content">
                <h3 className="service-card-title">{it.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
