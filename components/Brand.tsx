"use client";
import Image from 'next/image'
import React from 'react'

export function Logo({ variant = 'primary', className = '' }:{variant?: 'primary'|'icon'|'horizontal'|'monogram'; className?: string}){
  switch(variant){
    case 'icon':
      return (
        <svg viewBox="0 0 50 50" className={className} aria-hidden>
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
          <text x="25" y="32" fontFamily="var(--font-fraunces)" fontSize="24" textAnchor="middle" fill="currentColor">H</text>
        </svg>
      )
    case 'horizontal':
      return (
        <svg viewBox="0 0 300 40" className={className} role="img" aria-label="Heyday Flower Co">
          <text x="0" y="28" fontFamily="var(--font-fraunces)" fontSize="24" fill="currentColor">Heyday</text>
          <text x="100" y="28" fontFamily="var(--font-inter)" fontSize="12" letterSpacing="1.5" fill="currentColor" opacity="0.7">FLOWER CO</text>
        </svg>
      )
    case 'monogram':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden>
          <text x="20" y="28" fontFamily="var(--font-fraunces)" fontSize="32" textAnchor="middle" fill="currentColor">H</text>
        </svg>
      )
    default:
      return (
        <Image src="/logo.svg" alt="Heyday Flower Co" width={120} height={30}/>
      )
  }
}

export const FloralIllustration = ({ className = '' }:{className?: string}) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden>
    <path d="M50 30 Q40 20 30 25 T20 40 Q25 50 35 55 L50 50 L65 55 Q75 50 80 40 Q75 25 65 25 T50 30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
  </svg>
)

export const WatercolorTexture = ({ className = '' }:{className?: string}) => (
  <div className={`watercolor-bg ${className}`} aria-hidden>
    <div className="watercolor-layer watercolor-layer-1" />
    <div className="watercolor-layer watercolor-layer-2" />
  </div>
)

export function SectionDivider({ type = 'floral' }:{type?: 'floral'|'dots'|'line'}){
  if(type==='dots') return <div className="section-divider dots" aria-hidden><span>•</span><span>•</span><span>•</span></div>
  if(type==='line') return <hr className="section-divider line" aria-hidden />
  return (
    <svg viewBox="0 0 200 20" className="section-divider" role="img" aria-label="Decorative divider">
      <text x="100" y="15" textAnchor="middle" fontSize="20" fill="var(--gold)">✿ ✿ ✿</text>
    </svg>
  )
}
