'use client'

import { useEffect, useId, useState } from 'react'
import type { ColorFilterKey } from './GalleryGrid'

const OPTIONS: Array<{ key: ColorFilterKey; label: string; aria?: string }> = [
  { key: 'all', label: 'All palettes', aria: 'Show all color palettes' },
  { key: 'neutral', label: 'Neutral / White' },
  { key: 'blush', label: 'Blush / Pastel' },
  { key: 'bold', label: 'Bold / Color' },
  { key: 'greenery', label: 'Greenery' },
]

type ColorFilterProps = {
  initial?: ColorFilterKey
  onChange?: (value: ColorFilterKey) => void
  label?: string
}

export default function ColorFilter({ initial = 'all', onChange, label = 'Filter gallery by color palette' }: ColorFilterProps){
  const [selected, setSelected] = useState<ColorFilterKey>(initial)
  const groupId = useId()

  const activeOption = OPTIONS.find((option)=> option.key === selected) ?? OPTIONS[0]

  useEffect(()=>{
    setSelected(initial)
  },[initial])

  const handleSelect = (value: ColorFilterKey) => {
    if(value === selected) return
    setSelected(value)
    onChange?.(value)
  }

  return (
    <div className="color-filter-shell">
      <div className="color-filter__legend" role="status" aria-live="polite">
        <span className="color-filter__legend-label">Palette:</span>
        <span>{activeOption.label}</span>
      </div>
      <div
        role="group"
        aria-label={label}
        className="color-filter"
        data-color-filter
        id={groupId}
      >
        {OPTIONS.map((option)=>(
          <button
            key={option.key}
            type="button"
            className="btn color-filter__chip"
            data-chip={option.key}
            data-state={selected === option.key ? 'on' : 'off'}
            aria-pressed={selected === option.key}
            aria-label={option.aria ?? option.label}
            onClick={()=>handleSelect(option.key)}
          >
            <span className="color-filter__dot" aria-hidden data-color={option.key} />
            <span>{option.label}</span>
            {selected === option.key ? (
              <span className="color-filter__chip-indicator" aria-hidden>
                Selected
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  )
}
