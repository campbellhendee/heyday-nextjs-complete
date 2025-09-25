#!/usr/bin/env node
/**
 * Apply curation plan: copy (default) or move (--move) files
 * from public/images/_staging_raw/<category>/... to public/images/gallery/<category>/...
 * using the mapping in public/images/_curation/rename_plan_all.csv.
 *
 * Safety defaults:
 * - Copies by default (non-destructive). Pass --move to move.
 * - Skips rows where decision != "keep".
 * - Validates source exists and destination doesn't exist.
 * - Creates destination directories as needed.
 * - Supports --category=<weddings|corporate|private|daily> to filter.
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline';

const ROOT = process.cwd();
const CURATION_CSV = path.join(ROOT, 'public', 'images', '_curation', 'rename_plan_all.csv');
const PUBLIC_DIR = path.join(ROOT, 'public');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { move: false, category: null, dryRun: false };
  for (const a of args) {
    if (a === '--move') opts.move = true;
    else if (a === '--dry') opts.dryRun = true;
    else if (a.startsWith('--category=')) opts.category = a.split('=')[1];
  }
  return opts;
}

function csvSafeSplit(line) {
  // naive CSV split; our plan doesn't contain commas in paths
  // but allow commas in reason by slicing first 4 commas
  let parts = [];
  let current = '';
  let commaCount = 0;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === ',' && commaCount < 4) {
      parts.push(current);
      current = '';
      commaCount++;
    } else {
      current += ch;
    }
  }
  parts.push(current);
  return parts;
}

async function ensureDir(p) {
  await fsp.mkdir(p, { recursive: true });
}

async function apply() {
  const opts = parseArgs();
  const rl = readline.createInterface({
    input: fs.createReadStream(CURATION_CSV, 'utf8'),
    crlfDelay: Infinity,
  });

  let total = 0;
  let acted = 0;
  let skipped = 0;
  let errors = 0;

  let headerDone = false;
  for await (const line of rl) {
    if (!line.trim()) continue;
    if (!headerDone) { headerDone = true; continue; } // skip header

    const [category, original_path, new_path, decision] = csvSafeSplit(line);

    if (opts.category && opts.category !== category) { skipped++; continue; }
    if (decision && decision.trim().toLowerCase() !== 'keep') { skipped++; continue; }

    total++;

    const src = path.join(PUBLIC_DIR, original_path.replace(/^\//, ''));
    const dst = path.join(PUBLIC_DIR, new_path.replace(/^\//, ''));

    try {
      const srcStat = await fsp.stat(src).catch(() => null);
      if (!srcStat || !srcStat.isFile()) { console.warn(`[MISS] ${src}`); errors++; continue; }

      const dstDir = path.dirname(dst);
      await ensureDir(dstDir);

      const dstExists = await fsp.stat(dst).then(() => true).catch(() => false);
      if (dstExists) { console.warn(`[SKIP EXISTS] ${dst}`); skipped++; continue; }

      if (opts.dryRun) {
        console.log(`[DRY] ${opts.move ? 'MOVE' : 'COPY'} ${src} -> ${dst}`);
        acted++;
        continue;
      }

      if (opts.move) {
        await fsp.rename(src, dst);
        console.log(`[MOVED] ${src} -> ${dst}`);
      } else {
        await fsp.copyFile(src, dst);
        console.log(`[COPIED] ${src} -> ${dst}`);
      }
      acted++;
    } catch (e) {
      console.error(`[ERROR] ${src} -> ${dst}:`, e.message || e);
      errors++;
    }
  }

  console.log(`\nSummary: considered=${total} acted=${acted} skipped=${skipped} errors=${errors} mode=${opts.move ? 'move' : 'copy'}${opts.dryRun ? ' (dry)' : ''}${opts.category ? ` category=${opts.category}` : ''}`);
}

apply().catch((e) => {
  console.error(e);
  process.exit(1);
});
