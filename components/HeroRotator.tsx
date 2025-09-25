"use client"
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type HeroImage = {
  src: string
  alt: string
}

type Alignment = 'start' | 'center' | 'end'

type HeroCta = {
  label: string
  href: string
}

type HeroRotatorProps = {
  images: ReadonlyArray<HeroImage>
  eyebrow?: string
  title: string
  sub?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  align?: Alignment
  intervalMs?: number
}

function usePrefersReducedMotion(){
  const [prefers, setPrefers] = useState(false)
  useEffect(()=>{
    if(typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefers(media.matches)
    update()
    if(typeof media.addEventListener === 'function') media.addEventListener('change', update)
    else media.addListener(update)
    return ()=>{
      if(typeof media.removeEventListener === 'function') media.removeEventListener('change', update)
      else media.removeListener(update)
    }
  },[])
  return prefers
}

export default function HeroRotator({
  images,
  eyebrow,
  title,
  sub,
  primaryCta,
  secondaryCta,
  align = 'center',
  intervalMs = 7000,
}: HeroRotatorProps){
  const heroRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isIntersecting, setIsIntersecting] = useState(true)

  const slides = useMemo(()=> (images.length ? [...images] : [{ src: '/images/hero/home.jpg', alt: title }]), [images, title])
  const canRotate = slides.length > 1 && !prefersReducedMotion && isIntersecting

  useEffect(()=>{
    if(typeof window === 'undefined') return
    const node = heroRef.current
    if(!node) return
    const observer = new IntersectionObserver(([entry])=>{
      setIsIntersecting(entry.isIntersecting)
    },{ threshold: 0.25 })
    observer.observe(node)
    return ()=>observer.disconnect()
  },[])

  useEffect(()=>{
    if(!canRotate) return
    const timer = window.setInterval(()=>{
      setActiveIndex((prev)=> (prev + 1) % slides.length)
    }, intervalMs)
    return ()=>window.clearInterval(timer)
  },[canRotate, slides.length, intervalMs])

  useEffect(()=>{
    if(!isIntersecting) return
    setActiveIndex((prev)=> prev % slides.length)
  },[slides.length, isIntersecting])

  return (
    <section className="hero hero-rotator" data-align={align} ref={heroRef}>
      <div className="hero-rotator__media" aria-hidden="true">
        {slides.map((image, idx)=>{
          const isActive = idx === activeIndex
          return (
            <div
              key={image.src}
              className={['hero-rotator__slide', isActive ? 'is-active' : '', prefersReducedMotion ? 'is-static' : ''].filter(Boolean).join(' ')}
            >
              <Image
                src={image.src}
                alt=""
                fill
                priority={idx === 0}
                className="hero-rotator__image"
                sizes="100vw"
              />
            </div>
          )
        })}
      </div>
      <div className="container hero-content">
        <div className="hero-shell" data-reveal>
          {eyebrow && <span className="hero-pill">{eyebrow}</span>}
          <h1 className="hero-title">{title}</h1>
          {sub && <p className="hero-subtitle">{sub}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="hero-cta">
              {primaryCta && (
                <Link href={primaryCta.href} className="btn btn--primary">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn btn--ghost">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
