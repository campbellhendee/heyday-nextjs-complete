"use client"
import { useCallback, useEffect } from 'react'
import Image from 'next/image'

type LightboxImage = {
  src: string
  alt: string
  caption?: string
  event?: string
}

type LightboxProps = {
  images: ReadonlyArray<LightboxImage>
  currentIndex: number
  onNavigate: (index: number) => void
  onClose: () => void
}

export default function Lightbox({ images, currentIndex, onNavigate, onClose }: LightboxProps){
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < images.length - 1
  const current = images[currentIndex]

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if(event.key === 'Escape') onClose()
    if(event.key === 'ArrowLeft' && hasPrevious) onNavigate(currentIndex - 1)
    if(event.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1)
  }, [currentIndex, hasNext, hasPrevious, onClose, onNavigate])

  useEffect(()=>{
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="lightbox__content" onClick={(event)=> event.stopPropagation()}>
        <Image
          src={current.src}
          alt={current.alt}
          width={1200}
          height={800}
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '90vw',
            maxHeight: '90vh',
            objectFit: 'contain',
          }}
          priority
        />
        {hasPrevious && (
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={()=> onNavigate(currentIndex - 1)}
            aria-label="Previous image"
          >
            ‹
          </button>
        )}
        {hasNext && (
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={()=> onNavigate(currentIndex + 1)}
            aria-label="Next image"
          >
            ›
          </button>
        )}
        <div className="lightbox__caption">
          <p>{current.alt}</p>
          <span className="lightbox__counter">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  )
}
