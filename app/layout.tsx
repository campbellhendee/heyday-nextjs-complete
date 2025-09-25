
import type { Metadata } from 'next'
import '../styles/global.css'
import { Inter, Fraunces } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import UX from '@/components/UX'
import { BRAND } from '@/lib/brand'

const inter = Inter({ subsets:['latin'], weight:['400','500','600'], variable:'--font-inter' })
const fraunces = Fraunces({ subsets:['latin'], weight:['400','600'], variable:'--font-fraunces' })

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — Luxury Floral Design in Houston`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    'Elevated floral design for weddings, corporate and private events, and daily arrangements. Houston, Texas — by appointment.',
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <Header />
        <UX />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
