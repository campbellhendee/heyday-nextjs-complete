"use client"
import { useState } from 'react'
import ColorFilter from '@/components/ColorFilter'
import GalleryGrid from '@/components/GalleryGrid'
import type { Pic } from '@/lib/galleries'

export default function WeddingsPortfolio({ items }:{ items: ReadonlyArray<Pic> }){
  const [filter,setFilter] = useState<'all'|'neutral'|'blush'|'bold'|'greenery'>('all')
  return (
    <>
      <ColorFilter onChange={setFilter} initial={filter} />
      <GalleryGrid items={items} filter={filter} />
    </>
  )
}
