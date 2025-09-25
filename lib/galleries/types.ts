export type GalleryCategory = 'weddings' | 'corporate' | 'private' | 'daily'

export type ColorTag = 'neutral' | 'blush' | 'bold' | 'greenery'

export type Pic = {
  src: string
  alt: string
  color?: ColorTag | ReadonlyArray<ColorTag>
}
