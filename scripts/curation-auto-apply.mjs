#!/usr/bin/env node
/**
 * Auto-apply from staging: sequentially copy or move files from
 * public/images/_staging_raw/<category>/ to public/images/gallery/<category>/
 * with names <category>-NNN.jpg based on discovered sort order.
 *
 * Usage:
 *  node scripts/curation-auto-apply.mjs [--move] [--category=weddings|corporate|private|daily] [--dry]
 */
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const STAGING = path.join(PUBLIC_DIR, 'images', '_staging_raw');
const GALLERY = path.join(PUBLIC_DIR, 'images', 'gallery');
const CATEGORIES = ['weddings','corporate','private','daily'];

function parseArgs(){
  const opts = { move:false, dry:false, category:null };
  for (const a of process.argv.slice(2)){
    if(a==='--move') opts.move = true;
    else if(a==='--dry') opts.dry = true;
    else if(a.startsWith('--category=')) opts.category = a.split('=')[1];
  }
  return opts;
}

function pad3(n){ return n.toString().padStart(3,'0'); }

async function ensureDir(p){ await fsp.mkdir(p, { recursive:true }); }

function sortFilesChrono(a,b){
  // Filenames look like YYYY-MM-DD_HASH.jpg; lexicographic sort is chronological
  return a.localeCompare(b);
}

async function getFiles(dir){
  const entries = await fsp.readdir(dir, { withFileTypes:true });
  return entries.filter(e=>e.isFile()).map(e=>e.name)
    .filter(n=>/\.(jpg|jpeg|png|webp)$/i.test(n))
    .sort(sortFilesChrono);
}

function outName(category, index, ext){
  return `${category}-${pad3(index)}${ext.toLowerCase()}`;
}

async function processCategory(category, opts){
  const srcDir = path.join(STAGING, category);
  const dstDir = path.join(GALLERY, category);
  await ensureDir(dstDir);

  const files = await getFiles(srcDir);
  let acted = 0, skipped = 0, errors = 0, idx = 1;

  for (const file of files){
    const src = path.join(srcDir, file);
    const ext = path.extname(file) || '.jpg';
    const dst = path.join(dstDir, outName(category, idx, ext));
    idx++;

    const exists = await fsp.stat(dst).then(()=>true).catch(()=>false);
    if (exists){ skipped++; continue; }

    try {
      if (opts.dry){
        console.log(`[DRY] ${opts.move ? 'MOVE' : 'COPY'} ${src} -> ${dst}`);
        acted++;
      } else if (opts.move){
        await fsp.rename(src, dst);
        console.log(`[MOVED] ${src} -> ${dst}`);
        acted++;
      } else {
        await fsp.copyFile(src, dst);
        console.log(`[COPIED] ${src} -> ${dst}`);
        acted++;
      }
    } catch (e){
      console.error(`[ERROR] ${src} -> ${dst}:`, e.message || e);
      errors++;
    }
  }

  return { category, total: files.length, acted, skipped, errors };
}

async function main(){
  const opts = parseArgs();
  const cats = opts.category ? [opts.category] : CATEGORIES;
  const results = [];
  for (const c of cats){
    results.push(await processCategory(c, opts));
  }
  console.table(results);
}

main().catch(e=>{ console.error(e); process.exit(1); });
