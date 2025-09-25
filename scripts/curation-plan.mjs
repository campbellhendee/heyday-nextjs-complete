/*
  Curation planning script (dry-run, ESM)
  - Scans public/images/_staging_raw/<category> for .jpg files
  - Generates rename plan CSV and draft TS arrays (no moves)
*/

import { readdir, mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const STAGING = path.join(ROOT, 'public', 'images', '_staging_raw')
const OUTDIR = path.join(ROOT, 'public', 'images', '_curation')

const categories = ['weddings','corporate','private','daily']

function pad(n, width = 3){
  return String(n).padStart(width, '0')
}

async function listJpgs(dir){
  const entries = await readdir(dir, { withFileTypes: true })
  return entries
    .filter(e => e.isFile() && /\.jpe?g$/i.test(e.name))
    .map(e => e.name)
    .sort()
}

function proposedName(category, index){
  const prefix = category
  return `${prefix}-${pad(index)}.jpg`
}

function draftAlt(category){
  switch(category){
    case 'weddings': return 'Wedding floral arrangement or installation'
    case 'corporate': return 'Corporate event floral installation or centerpiece'
    case 'private': return 'Private event floral arrangement'
    case 'daily': return 'Daily floral arrangement in vase'
  }
}

function draftColors(category){
  switch(category){
    case 'weddings': return 'neutral,greenery'
    case 'corporate': return 'bold,greenery'
    case 'private': return 'blush,neutral'
    case 'daily': return 'neutral,greenery'
  }
}

async function ensureDir(p){
  await mkdir(p, { recursive: true })
}

async function writeOut(p, content){
  await ensureDir(path.dirname(p))
  await writeFile(p, content)
}

async function main(){
  await ensureDir(OUTDIR)

  const combinedRows = ['category,original_path,new_path,decision,reason']

  for(const category of categories){
    const stagingDir = path.join(STAGING, category)
    let files = []
    try{
      files = await listJpgs(stagingDir)
    } catch(err){
      // skip missing category
      continue
    }

    const rows = ['original_path,new_path,decision,reason']
    const items = []

    files.forEach((name, idx) => {
      const original = path.join('/images/_staging_raw', category, name).replace(/\\/g,'/')
      const proposed = path.join('/images/gallery', category, proposedName(category, idx+1)).replace(/\\/g,'/')
      rows.push(`${original},${proposed},keep,`)
      combinedRows.push(`${category},${original},${proposed},keep,`)
      items.push({ src: proposed, alt: draftAlt(category), color: draftColors(category) })
    })

    const csvPath = path.join(OUTDIR, `rename_plan_${category}.csv`)
    await writeOut(csvPath, rows.join('\n') + '\n')

    const ts = `// Auto-generated draft — review and refine alt/color before use\nexport const ${category}Gallery = ${JSON.stringify(items, null, 2)} as const\n`
    const tsPath = path.join(OUTDIR, `${category}.gallery.ts`)
    await writeOut(tsPath, ts)
  }

  await writeOut(path.join(OUTDIR, 'rename_plan_all.csv'), combinedRows.join('\n') + '\n')
  console.log('Draft curation plans written to', OUTDIR)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
