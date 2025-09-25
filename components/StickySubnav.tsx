
'use client'
import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'process', label: 'Process' },
  { id: 'investment', label: 'Investment' },
]

export default function StickySubnav(){
  const [active,setActive]=useState('overview')
  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) setActive(e.target.id) })
    },{ rootMargin:'-40% 0px -55% 0px', threshold:0.01 })
    SECTIONS.forEach(s=>{ const el=document.getElementById(s.id); if(el) obs.observe(el) })
    return ()=>obs.disconnect()
  },[])

  return (
    <nav aria-label="Weddings sections" style={{position:'sticky',top:64,background:'var(--surface)',borderBottom:'1px solid var(--border)',zIndex:40}}>
      <div className="container" style={{display:'flex',gap:12,paddingBlock:12,flexWrap:'wrap'}}>
        {SECTIONS.map(s=>(
          <a key={s.id} href={`#${s.id}`} className={active===s.id?'btn button--primary':'btn'}>{s.label}</a>
        ))}
      </div>
    </nav>
  )
}
