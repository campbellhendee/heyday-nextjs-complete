"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
const MobileNav = dynamic(()=> import('./MobileNav'), { ssr:false })
import { BRAND } from '@/lib/brand'

export default function Header(){
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(()=>{
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  return (
    <header className="site-header" data-scrolled={scrolled ? 'true' : 'false'}>
      <div className="site-header__ribbon" aria-label="Studio availability">
        <div className="container site-header__ribbon-inner">
          <p className="site-header__tagline">{BRAND.tagline} — {BRAND.availability}</p>
          <div className="site-header__contact">
            <a href={BRAND.phone.href} className="site-header__contact-link" aria-label={`Call ${BRAND.name} at ${BRAND.phone.display}`}>
              <span aria-hidden="true">Call</span> {BRAND.phone.display}
            </a>
            <span className="site-header__divider" aria-hidden>&bull;</span>
            <a href={BRAND.email.href} className="site-header__contact-link">Email the studio</a>
          </div>
        </div>
      </div>
      <div className="container site-header__bar">
        <Link href="/" className="site-logo" aria-label={BRAND.name}>
          <Image src="/logo.svg" alt="" width={144} height={36} priority />
          <span className="sr-only">{BRAND.name}</span>
        </Link>
        <nav aria-label="Primary" className="site-header__nav">
          {BRAND.nav.map((item)=>{
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-header__nav-link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="site-header__actions">
          <nav aria-label="Secondary" className="site-header__secondary-nav">
            {BRAND.secondaryNav.map(({ href, name })=>{
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`site-header__secondary-link${isActive ? ' is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {name}
                </Link>
              )
            })}
          </nav>
          <Link className="btn btn--primary btn--large" href="/inquiry">
            Start Inquiry
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
