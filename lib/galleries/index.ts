import fs from 'fs'
import path from 'path'

export type GalleryItem = { src: string; alt: string; color?: string }
export type GalleryCategory = 'weddings'|'corporate'|'private'|'daily'

const DEFAULTS: Record<GalleryCategory,{ alt:string; color:string }> = {
  weddings:  { alt:'Wedding floral arrangement or installation',        color:'neutral,greenery' },
  corporate: { alt:'Corporate event floral installation or centerpiece', color:'bold,greenery' },
  private:   { alt:'Private event floral arrangement',                   color:'blush,neutral' },
  daily:     { alt:'Daily floral arrangement in vase',                   color:'neutral,greenery' },
}

export function getGallery(category: GalleryCategory): GalleryItem[] {
  const dir = path.join(process.cwd(), 'public', 'images', 'gallery', category)
  if(!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f=>/\.(jpe?g|png|webp|avif|heic)$/i.test(f)).sort()
  const { alt, color } = DEFAULTS[category]
  return files.map((file)=> ({
    src: `/images/gallery/${category}/${file}`,
    alt,
    color,
  }))
}

export const getWeddingsGallery  = () => getGallery('weddings')
export const getCorporateGallery = () => getGallery('corporate')
export const getPrivateGallery   = () => getGallery('private')
export const getDailyGallery     = () => getGallery('daily')
