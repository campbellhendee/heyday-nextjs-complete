"use client"
import { useEffect, useMemo, useState } from 'react'
import type { Pic } from '@/lib/galleries'
import ImageWithSkeleton from './ImageWithSkeleton'
import Lightbox from './Lightbox'

export type ColorFilterKey = 'all' | 'neutral' | 'blush' | 'bold' | 'greenery'
type PaletteKey = Exclude<ColorFilterKey, 'all'>

type GalleryGridProps = {
  items: ReadonlyArray<Pic>
  filter?: ColorFilterKey
  heading?: string
  initialCount?: number
  showCount?: boolean
}

const DEFAULT_VISIBLE = 12

export default function GalleryGrid({
  items,
  filter = 'all',
  heading,
  initialCount = DEFAULT_VISIBLE,
  showCount = true,
}: GalleryGridProps){
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(()=>{
    setVisibleCount(initialCount)
    setLightboxIndex(null)
  }, [filter, items, initialCount])

  const filteredItems = useMemo(()=>{
    const normalized = filter.toLowerCase() as ColorFilterKey
    return items.filter((item)=>{
      if(normalized === 'all' || !item.color) return true
      const palette = item.color
      const paletteKey = normalized as PaletteKey
      if(Array.isArray(palette)){
        return palette.includes(paletteKey)
      }
      return palette === paletteKey
    })
  }, [items, filter])

  const visibleItems = filteredItems.slice(0, visibleCount)
  const canShowMore = filteredItems.length > visibleCount

  const handleLoadMore = () => {
    setIsLoading(true)
    window.setTimeout(()=>{
      setVisibleCount((prev)=> Math.min(prev + initialCount, filteredItems.length))
      setIsLoading(false)
    }, 600)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => setLightboxIndex(null)

  const handleNavigate = (nextIndex: number) => {
    setLightboxIndex(nextIndex)
  }

  return (
    <div className="gallery-block">
      {heading && <h3 className="gallery-block__heading">{heading}</h3>}
      {filteredItems.length > 0 ? (
        <ul className="gallery-grid" aria-label="Project gallery">
          {visibleItems.map((item, index)=> (
            <li
              key={item.src}
              className="gallery-card"
              data-color={Array.isArray(item.color) ? item.color.join(' ') : item.color}
            >
              <button
                type="button"
                className="gallery-card__trigger"
                onClick={()=> openLightbox(index)}
                aria-label={`Open '${item.alt}' in lightbox`}
              >
                <div className="gallery-card__media">
                  <ImageWithSkeleton
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="gallery-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="gallery-card__overlay" aria-hidden="true">
                  <span className="gallery-card__caption">{item.alt}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="gallery-empty">Gallery images are being prepared.</p>
      )}
      {showCount && filteredItems.length > 0 && (
        <p className="gallery-count" role="status">
          Showing {visibleItems.length} of {filteredItems.length} photographs
        </p>
      )}
      {canShowMore && (
        <div className="gallery-more">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
      {lightboxIndex !== null && (
        <Lightbox
          images={visibleItems}
          currentIndex={lightboxIndex}
          onNavigate={handleNavigate}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
