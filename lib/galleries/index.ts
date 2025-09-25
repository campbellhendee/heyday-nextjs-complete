import type { GalleryCategory, Pic } from './types'
import { weddings as weddingsData } from './weddings'
import { corporate as corporateData } from './corporate'
import { privateEvents as privateData } from './private'
import { daily as dailyData } from './daily'

export { weddingsData as weddings }
export { corporateData as corporate }
export { privateData as privateEvents }
export { dailyData as daily }

export const galleries: Record<GalleryCategory, ReadonlyArray<Pic>> = {
  weddings: weddingsData,
  corporate: corporateData,
  private: privateData,
  daily: dailyData,
};

export const getGallery = (category: GalleryCategory) => galleries[category];

export type { GalleryCategory, Pic } from './types'
