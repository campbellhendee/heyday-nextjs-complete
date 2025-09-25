/*
  Curation planning script (dry-run)
  - Scans public/images/_staging_raw/<category> for .jpg files
  - Generates rename plan CSV and draft TS arrays (no moves)
*/

import { promises as fs } from 'fs'
import path from 'path'

const ROOT = process.cwd()
const STAGING = path.join(ROOT, 'public', 'images', '_staging_raw')
const OUTDIR = path.join(ROOT, 'public', 'images', '_curation')

const categories = ['weddings','corporate','private','daily'] as const

type Category = typeof categories[number]

type PlanRow = {
  category: Category
  original: string
  proposed: string
}

function pad(n: number, width = 3){
  return String(n).padStart(width, '0')
}

async function listJpgs(dir: string){
  const entries = await fs.readdir(dir, { withFileTypes: true })
  return entries
    .filter(e => e.isFile() && /\.jpe?g$/i.test(e.name))
    .map(e => e.name)
    .sort()
}

function proposedName(category: Category, index: number){
  const prefix = category
  return `${prefix}-${pad(index)}.jpg`
}

function draftAlt(category: Category, base: string){
  // Simple heuristic: category + generic subject; to be edited later
  switch(category){
    case 'weddings': return 'Wedding floral arrangement or installation'
    case 'corporate': return 'Corporate event floral installation or centerpiece'
    case 'private': return 'Private event floral arrangement'
    case 'daily': return 'Daily floral arrangement in vase'
  }
}

function draftColors(category: Category){
  // Default tags as placeholders, refined in review
  switch(category){
    case 'weddings': return 'neutral,greenery'
    case 'corporate': return 'bold,greenery'
    case 'private': return 'blush,neutral'
    case 'daily': return 'neutral,greenery'
  }
}

async function ensureDir(p: string){
  await fs.mkdir(p, { recursive: true })
}

async function writeFile(p: string, content: string){
  await ensureDir(path.dirname(p))
  await fs.writeFile(p, content)
}

async function main(){
  await ensureDir(OUTDIR)

  const allPlans: PlanRow[] = []

  for(const category of categories){
    const stagingDir = path.join(STAGING, category)
    try{
      const files = await listJpgs(stagingDir)
      const plans: PlanRow[] = files.map((name, idx) => ({
        category,
        original: path.join('/images/_staging_raw', category, name).replace(/\\/g,'/'),
        proposed: path.join('/images/gallery', category, proposedName(category, idx+1)).replace(/\\/g,'/'),
      }))
      allPlans.push(...plans)

      // CSV per category
      const csv = ['original_path,new_path,decision,reason']
        .concat(plans.map(p => `${p.original},${p.proposed},keep,`))
        .join('\n') + '\n'
      await writeFile(path.join(OUTDIR, `rename_plan_${category}.csv`), csv)

      // Draft TS array per category
      const items = plans.map(p => ({ src: p.proposed, alt: draftAlt(category, p.proposed), color: draftColors(category) }))
      const ts = `// Auto-generated draft — review and refine alt/color before use\nexport const ${category}Gallery = ${JSON.stringify(items, null, 2)} as const\n`
      await writeFile(path.join(OUTDIR, `${category}.gallery.ts`), ts)
    } catch(err){
      // Skip if folder missing
      continue
    }
  }

  // Combined CSV
  const combined = ['category,original_path,new_path,decision,reason']
    .concat(allPlans.map(p => `${p.category},${p.original},${p.proposed},keep,`))
    .join('\n') + '\n'
  await writeFile(path.join(OUTDIR, 'rename_plan_all.csv'), combined)

  console.log('Draft curation plans written to', OUTDIR)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
