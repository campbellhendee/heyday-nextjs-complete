import { useEffect } from 'react'

export function useReveal(selector: string){
  useEffect(()=>{
    if(typeof window === 'undefined') return
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector))
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.setAttribute('data-revealed',''); obs.unobserve(e.target) }
      })
    },{ threshold: 0.15 })
    els.forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[selector])
}
