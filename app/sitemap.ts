import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Prefer an environment-provided canonical site URL; fall back to the default Vercel domain
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://heyday-nextjs-complete.vercel.app').replace(/\/+$/, '')
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/weddings`, lastModified: new Date() },
    { url: `${base}/corporate-events`, lastModified: new Date() },
    { url: `${base}/private-events`, lastModified: new Date() },
    { url: `${base}/daily-arrangements`, lastModified: new Date() },
  ]
}
