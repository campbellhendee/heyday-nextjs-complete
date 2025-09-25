"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import { Logo } from './Brand'

export default function MobileNav(){
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  useEffect(()=>{ document.body.style.overflow = isOpen? 'hidden':'unset'; return ()=>{document.body.style.overflow='unset'} },[isOpen])
  return (
    <>
      <button className="mobile-nav-toggle" onClick={()=>setIsOpen(!isOpen)} aria-label="Toggle menu">{isOpen? <X size={24}/>: <Menu size={24}/>}</button>
      <div className={`mobile-nav ${isOpen? 'mobile-nav--open':''}`}>
        <div className="mobile-nav-header"><Logo variant="horizontal" className="mobile-nav-logo"/></div>
        <nav className="mobile-nav-menu" aria-label="Primary">
          {[...BRAND.nav, ...BRAND.secondaryNav].map((item)=> (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={()=>setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mobile-nav-actions">
          <a href={BRAND.phone.href} className="mobile-cta mobile-cta--phone"><Phone size={20}/><span>Call Now</span></a>
          <a href={BRAND.email.href} className="btn btn--primary btn--large">Start Inquiry</a>
        </div>
        <div className="mobile-nav-footer">
          <p>{BRAND.region} • {BRAND.availability}</p>
          <p>{BRAND.serviceArea}</p>
        </div>
      </div>
    </>
  )
}
