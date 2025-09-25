"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BRAND } from '@/lib/brand'

export default function Header(){
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>10)
    window.addEventListener('scroll',onScroll)
    return ()=>window.removeEventListener('scroll',onScroll)
  },[])
  return (
    <header style={{position:'sticky',top:0,zIndex:50,backdropFilter:scrolled?'blur(6px)':'none',background:'rgba(255,255,255,.9)',borderBottom:'1px solid var(--border)'}}> 
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBlock:16,gap:12,flexWrap:'wrap'}}>
        <Link href="/" className="logo" aria-label={BRAND.name} style={{display:'inline-flex',alignItems:'center',gap:8}}>
          <Image src="/logo.svg" alt="" aria-hidden width={120} height={30} priority />
          <span className="sr-only">{BRAND.name}</span>
        </Link>
        <nav aria-label="Primary" style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
          {BRAND.nav.map(i=> (<Link key={i.href} className="btn" href={i.href}>{i.name}</Link>))}
          <a className="btn btn--primary" href={BRAND.email.href}>Start Inquiry</a>
        </nav>
      </div>
    </header>
  )
}
