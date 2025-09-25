import Link from 'next/link'
import { BRAND } from '@/lib/brand'

type CTAStripProps = {
  text?: string
  button?: string
  subtext?: string
}

export default function CTAStrip({ text = 'Ready to bring your vision to life?', button = 'Start Your Inquiry', subtext = 'Booking select 2025 & 2026 celebrations.' }: CTAStripProps){
  return (
    <section className="cta-strip" aria-labelledby="cta-strip-title">
      <div className="container">
        <div className="cta-strip-content" data-reveal>
          <div className="cta-strip-copy">
            <p className="cta-strip-text" id="cta-strip-title">{text}</p>
            <p className="cta-strip-subtext">{subtext}</p>
          </div>
          <div className="cta-strip-actions">
            <Link href={BRAND.email.href} className="btn btn--primary">
              <span>{button}</span>
            </Link>
            <a href={BRAND.phone.href} className="btn btn--ghost">
              <span>Call {BRAND.phone.display}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
