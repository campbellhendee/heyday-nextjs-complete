
import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/global.css'
import { Inter, Fraunces } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import UX from '@/components/UX'
import SkipLink from '@/components/SkipLink'
import ConsoleEasterEgg from '@/components/ConsoleEasterEgg'
import { BRAND } from '@/lib/brand'

const inter = Inter({ subsets:['latin'], weight:['400','500','600'], variable:'--font-inter' })
const fraunces = Fraunces({ subsets:['latin'], weight:['400','600'], variable:'--font-fraunces' })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://heyday-nextjs-complete.vercel.app'
const META_TITLE = `${BRAND.name} — Luxury Floral Design in Houston`
const META_DESCRIPTION = 'Elevated floral design for weddings, corporate and private events, and daily arrangements. Houston, Texas — by appointment.'
const META_KEYWORDS = [
  'Houston wedding florist',
  'luxury floral design',
  'corporate event flowers',
  'destination wedding florist',
  'private event florals',
  'daily floral programs',
]

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Florist',
  name: BRAND.name,
  description: META_DESCRIPTION,
  url: SITE_URL,
  telephone: BRAND.phone.display,
  email: BRAND.email.display,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BRAND.studio.street,
    addressLocality: BRAND.studio.city,
    addressRegion: BRAND.studio.state,
    postalCode: BRAND.studio.postal,
    addressCountry: 'US',
  },
  areaServed: BRAND.serviceArea,
  sameAs: BRAND.social.map((profile)=> profile.href),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  makesOffer: BRAND.nav.map((item)=> ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: item.name,
      url: `${SITE_URL}${item.href === '/' ? '' : item.href}`,
    },
  })),
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: META_TITLE,
    template: `%s — ${BRAND.name}`,
  },
  description: META_DESCRIPTION,
  applicationName: BRAND.name,
  keywords: META_KEYWORDS,
  category: 'Lifestyle',
  creator: BRAND.name,
  publisher: BRAND.name,
  authors: [{ name: BRAND.name, url: SITE_URL }],
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: SITE_URL,
    siteName: BRAND.name,
    images: [
      { url: '/og-default.jpg', width: 1200, height: 630, alt: `${BRAND.name} floral design` },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ['/og-default.jpg'],
    creator: BRAND.name,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <SkipLink />
        <Header />
        <UX />
        <main id="main-content">{children}</main>
        <Footer />
        <ConsoleEasterEgg />
        <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(STRUCTURED_DATA)}
        </Script>
      </body>
    </html>
  )
}
