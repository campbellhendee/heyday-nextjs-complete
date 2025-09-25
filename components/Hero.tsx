import Link from 'next/link'
import Image from 'next/image'

type HeroAction = { text: string; href: string }

export default function Hero({
  title,
  subtitle,
  eyebrow,
  image,
  imageAlt = '',
  align = 'center',
  primary,
  secondary,
  priority = false,
}:{
  title: string
  subtitle?: string
  eyebrow?: string
  image: string
  imageAlt?: string
  align?: 'start' | 'center' | 'end'
  primary?: HeroAction
  secondary?: HeroAction
  priority?: boolean
}){
  return (
    <section className="hero" data-align={align}>
      <div className="hero-media" aria-hidden={imageAlt ? undefined : true}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="hero-image"
        />
      </div>
      <div className="hero-content">
        <div className="container hero-shell">
          {eyebrow && <span className="hero-pill">{eyebrow}</span>}
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          {(primary || secondary) && (
            <div className="hero-cta">
              {primary && (
                <Link href={primary.href} className="btn btn--primary btn--large">
                  {primary.text}
                </Link>
              )}
              {secondary && (
                <Link href={secondary.href} className="btn btn--ghost btn--large">
                  {secondary.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
