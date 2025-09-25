import Link from 'next/link'
import { BRAND } from '@/lib/brand'

export default function Hero({ title, subtitle, image, primary, secondary }:{
  title: string; subtitle?: string; image: string;
  primary?: { text: string; href: string };
  secondary?: { text: string; href: string };
}){
  return (
    <section className="hero">
      <div className="hero-bg" style={{backgroundImage:`url(${image})`}} aria-hidden="true"><div className="hero-overlay"/></div>
      <div className="hero-content">
        <div className="container">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          {(primary||secondary) && (
            <div className="hero-cta">
              {primary && <Link href={primary.href} className="btn btn--primary btn--large">{primary.text}</Link>}
              {secondary && <Link href={secondary.href} className="btn btn--large">{secondary.text}</Link>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
