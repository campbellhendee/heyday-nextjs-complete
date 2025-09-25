import Link from 'next/link'
import { BRAND } from '@/lib/brand'

export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <section className="site-footer__section site-footer__brand" aria-label="Studio overview">
          <p className="site-footer__logo">{BRAND.name}</p>
          <p className="site-footer__tagline">{BRAND.tagline}</p>
          <p className="site-footer__summary">{BRAND.serviceArea}</p>
        </section>
        <section className="site-footer__section" aria-label="Visit or contact">
          <h3 className="site-footer__heading">Studio</h3>
          <address className="site-footer__address">
            <span>{BRAND.studio.street}</span>
            <span>{`${BRAND.studio.city}, ${BRAND.studio.state} ${BRAND.studio.postal}`}</span>
          </address>
          <p className="site-footer__availability">{BRAND.availability}</p>
          <div className="site-footer__contact-links">
            <a href={BRAND.phone.href} className="site-footer__contact-link" aria-label={`Call ${BRAND.name}`}>
              {BRAND.phone.display}
            </a>
            <a href={BRAND.email.href} className="site-footer__contact-link">
              {BRAND.email.display}
            </a>
          </div>
        </section>
        <section className="site-footer__section" aria-label="Explore the site">
          <h3 className="site-footer__heading">Explore</h3>
          <ul className="site-footer__nav-list">
            {BRAND.nav.map((item)=> (
              <li key={item.href}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
            {BRAND.secondaryNav.map((item)=> (
              <li key={item.href}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <div className="site-footer__social" aria-label="Social links">
            {BRAND.social.map((profile)=> (
              <a key={profile.href} href={profile.href} target="_blank" rel="noreferrer" className="site-footer__social-link">
                {profile.name}
              </a>
            ))}
          </div>
        </section>
      </div>
      <div className="container site-footer__bottom">
        <span>© {year} {BRAND.name}. All rights reserved.</span>
        <span>{BRAND.region} • {BRAND.serviceArea}</span>
      </div>
    </footer>
  )
}
