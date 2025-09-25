import 'server-only'
import fs from 'node:fs/promises'
import path from 'node:path'

export type GalleryCategory = 'weddings' | 'corporate' | 'private' | 'daily'

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

function toAlt(filename: string, category: GalleryCategory) {
  const base = filename.replace(/\.[^.]+$/, '')
  const pretty = base.replace(/[-_]+/g, ' ').trim()
  const cleaned = pretty.replace(new RegExp('^' + category + '\s*', 'i'), '').trim()
  const titled = category.charAt(0).toUpperCase() + category.slice(1)
  return cleaned ? `${titled} — ${cleaned}` : titled
}

export async function listGallery(category: GalleryCategory) {
  const dir = path.join(process.cwd(), 'public', 'images', 'gallery', category)
  let entries: string[] = []
  try {
    entries = await fs.readdir(dir)
  } catch {
    return []
  }
  return entries
    .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => {
      const src = `/images/gallery/${category}/${file}`
      return { src, alt: toAlt(file, category) }
    })
}
