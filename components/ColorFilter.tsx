
'use client'
import { useState } from 'react'
import type { ColorFilterKey } from './GalleryGrid'

const options: { key: ColorFilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'neutral', label: 'Neutral/White' },
  { key: 'blush', label: 'Blush/Pastel' },
  { key: 'bold', label: 'Bold/Color' },
  { key: 'greenery', label: 'Greenery' },
]

export default function ColorFilter({ onChange, initial='all' }:{ onChange?:(f:ColorFilterKey)=>void; initial?:ColorFilterKey }){
  const [sel,setSel]=useState<ColorFilterKey>(initial)
  return (
    <div role="toolbar" aria-label="Filter by palette" style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}} data-color-filter>
      {options.map(o=>(
        <button key={o.key} className="btn" type="button"
          data-chip={o.key} aria-selected={sel===o.key}
          onClick={()=>{ setSel(o.key); onChange?.(o.key) }}
          style={ sel===o.key ? {background:'var(--ink)',color:'#fff',borderColor:'var(--ink)'} : {} }>
          {o.label}
        </button>
      ))}
    </div>
  )
}
