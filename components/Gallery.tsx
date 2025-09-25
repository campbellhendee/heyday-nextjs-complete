import Image from 'next/image'
import type { CSSProperties } from 'react'
import { listGallery, type GalleryCategory } from '@/lib/gallery.server'

type Props = {
  category: GalleryCategory
  className?: string
  sizes?: string
  ratio?: string // e.g., "4/3" or "3/2"
}

export default async function Gallery({
  category,
  className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  ratio = '4/3',
}: Props) {
  const images = await listGallery(category)
  if (!images.length) return null

  return (
    <div className={className}>
      {images.map((img) => (
        <div
          key={img.src}
          className="relative w-full overflow-hidden rounded aspect-[var(--ratio)]"
          style={{ ['--ratio' as unknown as keyof CSSProperties]: ratio } as CSSProperties}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes}
            className="object-cover"
            priority={false}
          />
        </div>
      ))}
    </div>
  )
}
