'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BRAND } from '@/lib/brand'

const SCROLL_TRIGGER = 480

export default function FloatingCTA(){
  const [visible, setVisible] = useState(false)

  useEffect(()=>{
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_TRIGGER)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  return (
    <>
      <aside
        className={`floating-cta floating-cta--panel${visible ? ' floating-cta--visible' : ''}`}
        role="complementary"
        aria-label="Quick inquiry"
      >
        <div className="floating-cta__inner">
          <p className="floating-cta__eyebrow">Start a conversation</p>
          <p className="floating-cta__headline">Booking 2025 weddings & brand experiences</p>
          <div className="floating-cta__actions">
            <Link href={BRAND.email.href} className="btn btn--primary">
              <span>Start your inquiry</span>
            </Link>
            <a href={BRAND.phone.href} className="floating-cta__phone">
              <span aria-hidden="true">Call {BRAND.phone.display}</span>
              <span className="sr-only">Call us at {BRAND.phone.display}</span>
            </a>
          </div>
        </div>
      </aside>

      <div
        className={`floating-cta-mobile${visible ? ' floating-cta-mobile--visible' : ''}`}
        role="complementary"
        aria-label="Quick inquiry"
      >
        <p className="floating-cta-mobile__headline">Ready to plan something unforgettable?</p>
        <div className="floating-cta-mobile__actions">
          <Link href={BRAND.email.href} className="btn btn--primary floating-cta-mobile__primary">
            Start your inquiry
          </Link>
          <a href={BRAND.phone.href} className="floating-cta-mobile__phone">
            Call {BRAND.phone.display}
          </a>
        </div>
      </div>
    </>
  )
}
