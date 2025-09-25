import Link from 'next/link'
import { BRAND } from '@/lib/brand'

export default function CTAStrip({ text='Ready to bring your vision to life?', button='Start Your Inquiry' }:{ text?:string; button?:string }){
  return (
    <section className="cta-strip">
      <div className="container">
        <div className="cta-strip-content">
          <p className="cta-strip-text">{text}</p>
          <Link href={BRAND.email.href} className="btn button--primary">{button}</Link>
        </div>
      </div>
    </section>
  )
}
