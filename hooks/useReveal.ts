import { useEffect } from 'react'

export function useReveal(selector: string){
  useEffect(()=>{
    if(typeof window === 'undefined') return
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector))
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    if(media.matches){
      els.forEach((el)=> el.setAttribute('data-revealed', ''))
      return
    }

    const obs = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.setAttribute('data-revealed', '')
          obs.unobserve(entry.target)
        }
      })
    },{ threshold: 0.15 })

    els.forEach((el)=> obs.observe(el))

    const handleChange = (event: MediaQueryListEvent) => {
      if(!event.matches) return
      els.forEach((el)=> el.setAttribute('data-revealed', ''))
      obs.disconnect()
    }

    if(typeof media.addEventListener === 'function') media.addEventListener('change', handleChange)
    else media.addListener(handleChange)

    return ()=>{
      obs.disconnect()
      if(typeof media.removeEventListener === 'function') media.removeEventListener('change', handleChange)
      else media.removeListener(handleChange)
    }
  },[selector])
}
