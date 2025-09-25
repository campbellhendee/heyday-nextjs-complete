"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BRAND } from '@/lib/brand'

export default function Header(){
  const pathname = usePathname()

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          {BRAND.name}
        </Link>
        <nav className="nav">
          {BRAND.nav.map((item)=>{
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? 'active' : ''}
              >
                {item.name}
              </Link>
            )
          })}
          {BRAND.secondaryNav.map((item)=>{
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? 'active' : ''}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
