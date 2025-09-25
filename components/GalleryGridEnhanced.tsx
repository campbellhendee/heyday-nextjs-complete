"use client";
import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'
import { Eye } from 'lucide-react'

type GalleryImage = { id: string; src: string; alt: string; caption?: string; event?: string; color?: string }
export default function GalleryGridEnhanced({ images, selectedColor='all', columns=3 }:{ images: GalleryImage[]; selectedColor?: string; columns?: number }){
  const [lightboxIndex, setLightboxIndex] = useState<number|null>(null)
  const filtered = selectedColor==='all'? images: images.filter(i=>i.color===selectedColor)
  return (
    <>
      <div className={`gallery-grid gallery-grid--${columns}`}>
        {filtered.map((image, idx)=> (
          <div key={image.id} className="gallery-item gallery-item--enhanced" onClick={()=>setLightboxIndex(idx)}>
            <Image src={image.src} alt={image.alt} width={800} height={600} loading="lazy" className="gallery-img"/>
            <div className="gallery-overlay"><Eye size={24}/>{image.event && <span className="gallery-event">{image.event}</span>}</div>
          </div>
        ))}
      </div>
      {lightboxIndex!==null && (
        <Lightbox images={filtered} initialIndex={lightboxIndex} onClose={()=>setLightboxIndex(null)}/>
      )}
    </>
  )
}
