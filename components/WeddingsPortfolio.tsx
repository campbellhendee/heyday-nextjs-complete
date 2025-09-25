"use client"
import { useState } from 'react'
import ColorFilter from '@/components/ColorFilter'
import GalleryGrid from '@/components/GalleryGrid'

type Item = { src: string; alt: string; color?: string }

export default function WeddingsPortfolio({ items }:{ items: ReadonlyArray<Item> }){
  const [filter,setFilter] = useState<'all'|'neutral'|'blush'|'bold'|'greenery'>('all')
  return (
    <>
      <ColorFilter onChange={setFilter} initial={filter} />
      <GalleryGrid items={items} filter={filter} />
    </>
  )
}
