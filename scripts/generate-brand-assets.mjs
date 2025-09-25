#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const PUBLIC_DIR = path.join(ROOT, 'public')

const COLORS = {
  surface: [0xf7, 0xf4, 0xef, 0xff],
  ink: [0x14, 0x14, 0x14, 0xff],
  sage: [0x98, 0xb2, 0xa0, 0xff],
  blush: [0xf0, 0xdc, 0xd6, 0xff],
  highlight: [0xd9, 0xb8, 0xa3, 0xff],
}

function lerp(a, b, t){
  return a + (b - a) * t
}

function mixColor(colorA, colorB, t){
  return [
    Math.round(lerp(colorA[0], colorB[0], t)),
    Math.round(lerp(colorA[1], colorB[1], t)),
    Math.round(lerp(colorA[2], colorB[2], t)),
    0xff,
  ]
}

function createPNG(width, height, fill = COLORS.surface){
  const png = new PNG({ width, height })
  for (let y = 0; y < height; y++){
    for (let x = 0; x < width; x++){
      setPixel(png, x, y, fill)
    }
  }
  return png
}

function setPixel(png, x, y, [r, g, b, a = 0xff]){
  const idx = (png.width * y + x) << 2
  png.data[idx] = r
  png.data[idx + 1] = g
  png.data[idx + 2] = b
  png.data[idx + 3] = a
}

function drawCircle(png, radius, center, color){
  const [cx, cy] = center
  const r2 = radius * radius
  for (let y = Math.max(0, cy - radius); y < Math.min(png.height, cy + radius); y++){
    for (let x = Math.max(0, cx - radius); x < Math.min(png.width, cx + radius); x++){
      const dx = x - cx
      const dy = y - cy
      if ((dx * dx) + (dy * dy) <= r2){
        setPixel(png, x, y, color)
      }
    }
  }
}

function savePNG(png, filePath){
  const buffer = PNG.sync.write(png)
  fs.writeFileSync(filePath, buffer)
  return buffer
}

function createAppleIcon(){
  const size = 180
  const png = createPNG(size, size)
  const center = [Math.floor(size / 2), Math.floor(size / 2)]
  drawCircle(png, 70, center, COLORS.ink)
  drawCircle(png, 54, [center[0], center[1] - 6], COLORS.sage)
  drawCircle(png, 32, [center[0], center[1] + 10], COLORS.blush)
  savePNG(png, path.join(PUBLIC_DIR, 'apple-touch-icon.png'))
}

function createFavicon(){
  const size = 64
  const png = createPNG(size, size)
  const center = [Math.floor(size / 2), Math.floor(size / 2)]
  drawCircle(png, 24, center, COLORS.ink)
  drawCircle(png, 18, [center[0], center[1] - 4], COLORS.sage)
  drawCircle(png, 10, [center[0], center[1] + 6], COLORS.blush)
  const pngBuffer = savePNG(png, path.join(PUBLIC_DIR, 'favicon.png'))
  const icoBuffer = createIcoFromPng(pngBuffer, size)
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer)
}

function createIcoFromPng(pngBuffer, size){
  const headerSize = 6
  const entrySize = 16
  const ico = Buffer.alloc(headerSize + entrySize + pngBuffer.length)
  // ICONDIR
  ico.writeUInt16LE(0, 0) // reserved
  ico.writeUInt16LE(1, 2) // type 1 = icon
  ico.writeUInt16LE(1, 4) // count
  // ICONDIRENTRY
  const entryOffset = headerSize
  ico[entryOffset] = size === 256 ? 0 : size // width
  ico[entryOffset + 1] = size === 256 ? 0 : size // height
  ico[entryOffset + 2] = 0 // color palette
  ico[entryOffset + 3] = 0 // reserved
  ico.writeUInt16LE(1, entryOffset + 4) // color planes
  ico.writeUInt16LE(32, entryOffset + 6) // bits per pixel
  ico.writeUInt32LE(pngBuffer.length, entryOffset + 8)
  ico.writeUInt32LE(headerSize + entrySize, entryOffset + 12)
  // Image data
  pngBuffer.copy(ico, headerSize + entrySize)
  return ico
}

function createOgImage(){
  const width = 1200
  const height = 630
  const png = new PNG({ width, height })
  for (let y = 0; y < height; y++){
    for (let x = 0; x < width; x++){
      const t = Math.min(1, (x / width) * 0.7 + (y / height) * 0.3)
      const base = mixColor(COLORS.sage, COLORS.blush, t)
      const highlightStrength = Math.max(0, 1 - Math.hypot((x - width * 0.7) / width, (y - height * 0.3) / height) * 2.2)
      const color = mixColor(base, COLORS.highlight, highlightStrength * 0.35)
      setPixel(png, x, y, color)
    }
  }
  const raw = { data: png.data, width, height }
  const jpegData = jpeg.encode(raw, 90)
  fs.writeFileSync(path.join(PUBLIC_DIR, 'og-default.jpg'), jpegData.data)
}

async function main(){
  if(!fs.existsSync(PUBLIC_DIR)){
    throw new Error(`Missing public directory at ${PUBLIC_DIR}`)
  }
  createAppleIcon()
  createFavicon()
  createOgImage()
  console.log('Generated brand assets: apple-touch-icon.png, favicon.ico, og-default.jpg')
}

main().catch((err)=>{
  console.error(err)
  process.exit(1)
})
