"use client";
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react'

interface LightboxImage { src: string; alt: string; caption?: string; event?: string }
export default function Lightbox({ images, initialIndex, onClose }:{ images: LightboxImage[]; initialIndex: number; onClose: ()=>void }){
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isPinned, setIsPinned] = useState(false)

  const handlePrevious = useCallback(()=> setCurrentIndex(p=> (p>0? p-1: images.length-1)), [images.length])
  const handleNext = useCallback(()=> setCurrentIndex(p=> (p<images.length-1? p+1: 0)), [images.length])

  useEffect(()=>{
    const onKey=(e: KeyboardEvent)=>{
      if(e.key==='Escape') onClose()
      if(e.key==='ArrowLeft') handlePrevious()
      if(e.key==='ArrowRight') handleNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow='hidden'
    return ()=>{ document.removeEventListener('keydown', onKey); document.body.style.overflow='unset' }
  },[onClose, handlePrevious, handleNext])

  const current = images[currentIndex]

  return (
    <div className="lightbox" role="dialog" aria-modal onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close"><X size={24}/></button>
      <button className="lightbox-nav lightbox-nav--prev" onClick={(e)=>{e.stopPropagation(); handlePrevious()}} aria-label="Previous"><ChevronLeft size={32}/></button>
      <div className="lightbox-content" onClick={e=>e.stopPropagation()}>
        <div className="lightbox-image-wrapper">
          <Image src={current.src} alt={current.alt} width={1200} height={800} className="lightbox-image" priority />
        </div>
        {(current.caption || current.event) && (
          <div className="lightbox-info">
            {current.event && <p className="lightbox-event">{current.event}</p>}
            {current.caption && <p className="lightbox-caption">{current.caption}</p>}
          </div>
        )}
        <div className="lightbox-actions">
          <button className={`lightbox-action ${isPinned?'active':''}`} onClick={()=>setIsPinned(!isPinned)} aria-label="Pin to inspiration board"><Heart size={20} fill={isPinned? 'currentColor':'none'}/><span>Pin to Board</span></button>
          <button className="lightbox-action" aria-label="Share"><Share2 size={20}/><span>Share</span></button>
        </div>
      </div>
      <button className="lightbox-nav lightbox-nav--next" onClick={(e)=>{e.stopPropagation(); handleNext()}} aria-label="Next"><ChevronRight size={32}/></button>
      <div className="lightbox-counter">{currentIndex+1} / {images.length}</div>
    </div>
  )
}
