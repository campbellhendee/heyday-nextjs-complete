import Image from 'next/image'
import { weddings as weddingsGallery, corporate as corporateGallery, privateEvents as privateGallery, daily as dailyGallery } from '@/lib/galleries'

const GALLERIES = {
  weddings: weddingsGallery,
  corporate: corporateGallery,
  private: privateGallery,
  daily: dailyGallery,
} as const

type GalleryCategory = keyof typeof GALLERIES

type Props = {
  category: GalleryCategory
  className?: string
  sizes?: string
}

export default function Gallery({
  category,
  className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: Props) {
  const images = GALLERIES[category] ?? []
  if (!images.length) return null

  return (
    <div className={className}>
      {images.map((img)=> (
        <div key={img.src} className="relative aspect-[4/3] w-full overflow-hidden rounded">
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
