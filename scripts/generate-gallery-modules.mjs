#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'images', 'gallery')
const LIB_GALLERIES = path.join(ROOT, 'lib', 'galleries')

const CATEGORY_SETTINGS = {
  weddings: {
    alt: 'Wedding floral arrangement or installation',
    colors: ['neutral,greenery', 'blush', 'bold', 'greenery', 'neutral'],
  },
  corporate: {
    alt: 'Corporate event floral installation or centerpiece',
    colors: ['bold,greenery', 'neutral,greenery'],
  },
  private: {
    alt: 'Private event floral arrangement',
    colors: ['blush,neutral', 'bold', 'neutral'],
  },
  daily: {
    alt: 'Daily floral arrangement in vase',
    colors: ['neutral,greenery', 'bold', 'blush'],
  },
}

function ensureDir(dir){
  fs.mkdirSync(dir, { recursive: true })
}

function readGalleryFiles(category){
  const dir = path.join(PUBLIC_IMAGES, category)
  const files = fs.readdirSync(dir)
    .filter((file)=>/\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort()
  return files
}

function buildModule(category, files){
  const meta = CATEGORY_SETTINGS[category]
  const colors = meta.colors ?? [meta.color]
  const lines = files.map((file, idx)=>{
    const color = colors[idx % colors.length]
    const normalizedColor = color ? `,\n    color: '${color}'` : ''
    return `  {\n    src: '/images/gallery/${category}/${file}',\n    alt: '${meta.alt.replace(/'/g, "\\'")}'${normalizedColor}\n  }`
  })
  return `import type { GalleryItem } from './types'\n\nexport const ${category}Gallery = [\n${lines.join(',\n')}\n] as const satisfies ReadonlyArray<GalleryItem>\n`
}

function writeModule(category, content){
  const filePath = path.join(LIB_GALLERIES, `${category}.gallery.ts`)
  fs.writeFileSync(filePath, content)
}

function updateIndex(categories){
  const typeImport = "export type { GalleryItem, GalleryCategory } from './types'\n"
  const imports = categories.map((category)=>`export { ${category}Gallery } from './${category}.gallery'`).join('\n')
  const mapEntries = categories.map((category)=>`  ${category}: ${category}Gallery`).join(',\n')
  const aggregate = `\nexport const galleries = {\n${mapEntries}\n} as const satisfies Record<GalleryCategory, readonly GalleryItem[]>\n\nexport const getGallery = (category: GalleryCategory) => galleries[category]\n`
  const content = `${typeImport}\n${imports}\n${aggregate}\n`
  fs.writeFileSync(path.join(LIB_GALLERIES, 'index.ts'), content)
}

function main(){
  const categories = Object.keys(CATEGORY_SETTINGS)
  ensureDir(LIB_GALLERIES)
  let total = 0
  categories.forEach((category)=>{
    const files = readGalleryFiles(category)
    total += files.length
    const moduleContent = buildModule(category, files)
    writeModule(category, moduleContent)
  })
  updateIndex(categories)
  console.log(`Generated gallery modules for ${categories.length} categories with ${total} images.`)
}

main()
