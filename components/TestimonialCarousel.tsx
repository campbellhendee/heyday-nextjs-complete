"use client";
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
  { id:1, quote:'Heyday transformed our wedding into a floral dreamscape. Every detail was perfect.', author:'Sarah & Michael', event:'Wedding at The Astorian' },
  { id:2, quote:'The most stunning arrangements for our corporate gala. Our clients were amazed.', author:'Jennifer Chen', event:'MSFT Houston Launch' },
  { id:3, quote:'Weekly arrangements that brighten our office. Professional and beautiful service.', author:'David Thompson', event:'Thompson Law Firm' },
]

export default function TestimonialCarousel(){
  const [current, setCurrent] = useState(0)
  useEffect(()=>{ const t = setInterval(()=> setCurrent(p=> (p+1)%TESTIMONIALS.length), 5000); return ()=>clearInterval(t) },[])
  const prev = ()=> setCurrent(p=> (p===0? TESTIMONIALS.length-1: p-1))
  const next = ()=> setCurrent(p=> (p+1)%TESTIMONIALS.length)
  const t = TESTIMONIALS[current]
  return (
    <section className="testimonial-section" aria-label="Testimonials">
      <div className="container">
        <div className="testimonial-carousel">
          <button className="carousel-nav carousel-nav--prev" onClick={prev} aria-label="Previous testimonial"><ChevronLeft size={20}/></button>
          <div className="testimonial-content">
            <blockquote className="testimonial-quote">“{t.quote}”</blockquote>
            <cite className="testimonial-author">{t.author}<span className="testimonial-event">{t.event}</span></cite>
          </div>
          <button className="carousel-nav carousel-nav--next" onClick={next} aria-label="Next testimonial"><ChevronRight size={20}/></button>
          <div className="carousel-dots">
            {TESTIMONIALS.map((_,i)=> (
              <button key={i} className={`carousel-dot ${i===current? 'active':''}`} onClick={()=>setCurrent(i)} aria-label={`Go to testimonial ${i+1}`}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
