import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://heyday-nextjs-complete-elevair-64e50768.vercel.app/sitemap.xml',
  }
}
