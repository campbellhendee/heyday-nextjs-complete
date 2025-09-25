import Hero from '@/components/Hero'
import Link from 'next/link'
import Image from 'next/image'
import { HERO_IMAGES } from '@/lib/visuals'

const posts = [
  { slug:'spring-wedding-flowers-2024', title:'Spring Wedding Flowers: 2024 Trends', excerpt:'Discover the most requested blooms and color palettes for spring weddings this year.', image:'/images/blog/spring-trends.jpg', date:'2024-03-15', category:'Wedding Trends' },
  { slug:'caring-for-your-arrangement', title:'Making Your Arrangements Last', excerpt:'Professional tips to keep your flowers fresh and beautiful for as long as possible.', image:'/images/blog/flower-care.jpg', date:'2024-03-10', category:'Care Tips' },
  { slug:'houston-venue-spotlight-astorian', title:'Venue Spotlight: The Astorian', excerpt:"Exploring floral possibilities at Houston's historic Astorian venue.", image:'/images/blog/astorian.jpg', date:'2024-03-05', category:'Venues' },
]

export default function JournalPage(){
  return (
    <>
      <Hero
        title="Journal"
        subtitle="Insights and inspiration from our studio"
        image={HERO_IMAGES.journal.src}
        imageAlt={HERO_IMAGES.journal.alt}
      />
      <section className="blog-section">
        <div className="container">
          <div className="blog-grid">
            {posts.map(p=> (
              <article key={p.slug} className="blog-card">
                <Link href={`/journal/${p.slug}`} className="blog-card-link">
                  <div className="blog-card-image">
                    <Image src={p.image} alt={p.title} width={600} height={400} loading="lazy"/>
                    <span className="blog-category">{p.category}</span>
                  </div>
                  <div className="blog-card-content">
                    <time className="blog-date">{new Date(p.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</time>
                    <h2 className="blog-title">{p.title}</h2>
                    <p className="blog-excerpt">{p.excerpt}</p>
                    <span className="blog-read-more">Read More →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
