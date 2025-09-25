#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const galleryRoot = path.join(projectRoot, 'public', 'images', 'gallery')
const incomingRoot = path.join(projectRoot, 'public', '_incoming')
const libRoot = path.join(projectRoot, 'lib', 'galleries')

const CATEGORIES = [
  { key: 'weddings', exportName: 'weddings', alt: 'Wedding floral arrangement', fallback: 'weddings' },
  { key: 'corporate', exportName: 'corporate', alt: 'Corporate event floral installation', fallback: 'corporate' },
  { key: 'private', exportName: 'privateEvents', alt: 'Private event floral arrangement', fallback: 'private' },
  { key: 'daily', exportName: 'daily', alt: 'Daily floral arrangement', fallback: 'daily' },
]

const allowedExt = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const MAX_ITEMS = 18
const MIN_ITEMS = 12

async function ensureDir(dir){
  await fs.mkdir(dir, { recursive: true })
}

async function recursiveFiles(dir){
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async(entry)=>{
    const res = path.join(dir, entry.name)
    if(entry.isDirectory()) return recursiveFiles(res)
    return res
  }))
  return files.flat()
}

function formatName(key, index, ext){
  return `${key}-${String(index + 1).padStart(3, '0')}${ext.toLowerCase()}`
}

async function selectOrIngest(category){
  const galleryDir = path.join(galleryRoot, category.key)
  await ensureDir(galleryDir)
  let files = (await fs.readdir(galleryDir)).filter((file)=> allowedExt.has(path.extname(file).toLowerCase()))

  if(files.length === 0){
    const fallbackDir = path.join(incomingRoot, category.fallback ?? '')
    try {
      const candidates = (await recursiveFiles(fallbackDir)).filter((file)=> allowedExt.has(path.extname(file).toLowerCase()))
      if(candidates.length === 0) throw new Error('No fallback images found')
      const limited = candidates.slice(0, MAX_ITEMS)
      await Promise.all(limited.map(async(file, index)=>{
        const ext = path.extname(file)
        const destName = formatName(category.key, index, ext)
        await fs.copyFile(file, path.join(galleryDir, destName))
      }))
      files = (await fs.readdir(galleryDir)).filter((file)=> allowedExt.has(path.extname(file).toLowerCase()))
    } catch (error){
      console.warn(`⚠️  ${category.key}: ${error.message}`)
    }
  }

  files.sort((a,b)=> a.localeCompare(b, undefined, { numeric:true, sensitivity:'base' }))
  if(files.length > MAX_ITEMS) files = files.slice(0, MAX_ITEMS)
  if(files.length < MIN_ITEMS){
    console.warn(`⚠️  ${category.key}: only ${files.length} images found (expected at least ${MIN_ITEMS}).`)
  }

  return files.map((file)=>({
    src: `/images/gallery/${category.key}/${file}`,
    alt: category.alt,
  }))
}

function toModule(category, items){
  const { exportName, key } = category
  const lines = items.map(({ src, alt, color })=>{
    const colorLine = color ? `, color: '${color}'` : ''
    return `  { src: '${src}', alt: '${alt}'${colorLine} },`
  })
  return [
    "import type { Pic } from './types'",
    '',
    `export const ${exportName}: Pic[] = [`,
    ...lines,
    '];',
    '',
  ].join('\n')
}

async function writeCategory(category, items){
  const target = path.join(libRoot, `${category.key}.ts`)
  const contents = toModule(category, items)
  await fs.writeFile(target, contents, 'utf8')
}

async function updateIndex(){
  const exportLines = CATEGORIES.map(({ key, exportName })=> `export { ${exportName} } from './${key}'`)
  const recordEntries = CATEGORIES.map(({ key, exportName })=> key === exportName ? `  ${key},` : `  ${key}: ${exportName},`).join('\n')
  const indexTemplate = `import type { GalleryCategory, Pic } from './types'\n\n${exportLines.join('\n')}\n\nexport const galleries: Record<GalleryCategory, Pic[]> = {\n${recordEntries}\n};\n\nexport const getGallery = (category: GalleryCategory) => galleries[category];\n\nexport type { GalleryCategory, Pic } from './types'\n`
  await fs.writeFile(path.join(libRoot, 'index.ts'), indexTemplate, 'utf8')
}

async function main(){
  await ensureDir(libRoot)
  for (const category of CATEGORIES){
    const items = await selectOrIngest(category)
    await writeCategory(category, items)
  }
  await updateIndex()
  console.log('✅ Gallery manifests refreshed.')
}

main().catch((error)=>{
  console.error(error)
  process.exit(1)
})
