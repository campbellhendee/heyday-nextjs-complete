import type { Metadata } from 'next'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  title: {
    default: `Journal - ${BRAND.name}`,
    template: `%s - Journal - ${BRAND.name}`,
  },
  description: "Floral design insights, seasonal guides, and wedding inspiration from Houston's luxury florist.",
}

export default function JournalLayout({ children }:{ children: React.ReactNode }){
  return <div className="journal-layout">{children}</div>
}
