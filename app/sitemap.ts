import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://heyday-nextjs-complete-elevair-64e50768.vercel.app'
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/weddings`, lastModified: new Date() },
    { url: `${base}/corporate-events`, lastModified: new Date() },
    { url: `${base}/private-events`, lastModified: new Date() },
    { url: `${base}/daily-arrangements`, lastModified: new Date() },
  ]
}
