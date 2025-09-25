import type { Pic } from '@/lib/galleries/types'

export const HERO_IMAGES = {
  home: {
    src: '/images/hero/home.jpg',
    alt: 'Lush bridal bouquet resting on a modern pedestal',
  },
  weddings: {
    src: '/images/hero/weddings.jpg',
    alt: 'Ceremony arch layered with blush florals and greenery',
  },
  corporate: {
    src: '/images/hero/corporate.jpg',
    alt: 'Corporate lobby installation with branded floral columns',
  },
  private: {
    src: '/images/hero/private.jpg',
    alt: 'Intimate dining table styled with candles and florals',
  },
  daily: {
    src: '/images/hero/daily.jpg',
    alt: 'Daily floral arrangement in a ceramic vase on a console table',
  },
  inquiry: {
    src: '/images/gallery/daily/daily-032.jpg',
    alt: 'Designer arranging florals in the studio',
  },
  journal: {
    src: '/images/gallery/daily/daily-040.jpg',
    alt: 'Detail shot of a seasonal floral palette on a styling surface',
  },
} as const

export type HeroSlide = {
  src: Pic['src']
  alt: string
}

export type HeroRotationKey = 'home' | 'weddings' | 'corporate' | 'private' | 'daily'

export const HERO_ROTATIONS: Record<HeroRotationKey, ReadonlyArray<HeroSlide>> = {
  home: [
    {
      src: '/images/gallery/weddings/weddings-009.jpg',
      alt: 'Sweetheart table framed by cascading white delphinium and lush greenery',
    },
    {
      src: '/images/gallery/corporate/corporate-010.jpg',
      alt: 'Corporate awards dinner table with white orchids and glossy foliage',
    },
    {
      src: '/images/gallery/private/private-011.jpg',
      alt: 'Courtyard bar with citrus garlands and glowing pillar candles',
    },
    {
      src: '/images/gallery/daily/daily-007.jpg',
      alt: 'Sunny arrangement of golden ranunculus with citrus accents',
    },
  ],
  weddings: [
    {
      src: '/images/gallery/weddings/weddings-001.jpg',
      alt: 'Bride holding loose bouquet of ivory garden roses with trailing jasmine',
    },
    {
      src: '/images/gallery/weddings/weddings-010.jpg',
      alt: 'Low footed centerpiece of blush garden roses and flowering branches',
    },
    {
      src: '/images/gallery/weddings/weddings-017.jpg',
      alt: 'Aisle meadow with blush snapdragons nestled among candles',
    },
    {
      src: '/images/gallery/weddings/weddings-023.jpg',
      alt: 'Sunset ceremony arch of white roses overlooking a waterfront view',
    },
  ],
  corporate: [
    {
      src: '/images/gallery/corporate/corporate-001.jpg',
      alt: 'Lobby installation of tropical leaves and fiery orange heliconia',
    },
    {
      src: '/images/gallery/corporate/corporate-009.jpg',
      alt: 'Product launch display with neon signage and saturated florals',
    },
    {
      src: '/images/gallery/corporate/corporate-017.jpg',
      alt: 'Ceiling installation of hanging amaranthus and copper lighting',
    },
    {
      src: '/images/gallery/corporate/corporate-024.jpg',
      alt: 'Outdoor terrace reception with tropical centerpieces and lanterns',
    },
  ],
  private: [
    {
      src: '/images/gallery/private/private-002.jpg',
      alt: 'Birthday tablescape with blush ranunculus and taper candles',
    },
    {
      src: '/images/gallery/private/private-005.jpg',
      alt: 'Fireplace mantle draped with greenery garlands and cream roses',
    },
    {
      src: '/images/gallery/private/private-013.jpg',
      alt: 'Family-style dinner with meadow-inspired centerpieces and herbs',
    },
    {
      src: '/images/gallery/private/private-016.jpg',
      alt: 'Poolside lounge with tropical greenery and bold blooms',
    },
  ],
  daily: [
    {
      src: '/images/gallery/daily/daily-002.jpg',
      alt: 'Pastel arrangement of blush ranunculus in a ceramic vase',
    },
    {
      src: '/images/gallery/daily/daily-005.jpg',
      alt: 'Meadow-style centerpiece with chamomile and wild greenery',
    },
    {
      src: '/images/gallery/daily/daily-011.jpg',
      alt: 'Modern succulent garden with trailing ivy and moss',
    },
    {
      src: '/images/gallery/daily/daily-018.jpg',
      alt: 'Everyday centerpiece of blush dahlias and dusty miller',
    },
  ],
}

type ServiceImageKey = 'weddings' | 'corporate' | 'private' | 'daily'

type ServiceVisual = {
  title: string
  image: Pic['src']
  imageAlt: string
  href: string
  copy: string
  highlights: readonly string[]
}

export const SERVICE_VISUALS: Record<ServiceImageKey, ServiceVisual> = {
  weddings: {
    title: 'Weddings',
    image: '/images/gallery/weddings/weddings-027.jpg',
    imageAlt: 'Ceremony installation of ivory roses spilling over a sculptural arch',
    href: '/weddings',
    copy: 'Full-service floral styling for ceremonies, receptions, and destination weekends.',
    highlights: [
      'Comprehensive design & production management',
      'Ceremony architecture, personals, and receptions',
      'Destination weekends & multi-day celebrations',
    ],
  },
  corporate: {
    title: 'Corporate Events',
    image: '/images/gallery/corporate/corporate-011.jpg',
    imageAlt: 'Corporate event stage lined with saturated florals and branded signage',
    href: '/corporate-events',
    copy: 'Brand-forward installations for launches, galas, conferences, and VIP hospitality.',
    highlights: [
      'Stage design, activations, & media moments',
      'Hospitality lounges, dinners, and step & repeats',
      'Rapid installation teams for large venues',
    ],
  },
  private: {
    title: 'Private Events',
    image: '/images/gallery/private/private-019.jpg',
    imageAlt: 'Intimate dinner table set with taper candles and layered garden florals',
    href: '/private-events',
    copy: 'Intimate dinners, milestone celebrations, and at-home gatherings with couture details.',
    highlights: [
      'Tablescapes layered with candles & textiles',
      'Personalized entry, lounge, and bar styling',
      'Concierge team for in-home florals & resets',
    ],
  },
  daily: {
    title: 'Daily Arrangements',
    image: '/images/gallery/daily/daily-008.jpg',
    imageAlt: 'Sculptural lobby arrangement featuring seasonal greenery and pastel blooms',
    href: '/daily-arrangements',
    copy: 'Weekly, biweekly, or monthly florals tailored to residences, lobbies, and suites.',
    highlights: [
      'Residential, hospitality, & corporate programs',
      'Flexible refresh schedules & on-call service',
      'Custom vessel sourcing & styling',
    ],
  },
}

export type FeaturedVisual = {
  id: string
  src: Pic['src']
  alt: string
  event?: string
  caption?: string
  color?: string
}

export const FEATURED_SHOWCASE: FeaturedVisual[] = [
  {
    id: 'highlight-1',
    src: '/images/gallery/weddings/weddings-052.jpg',
    alt: 'Suspended floral installation draped over a ceremony aisle',
    event: 'River Oaks Garden Wedding',
    caption: 'An overhead canopy of ranunculus, garden roses, and greenery welcoming guests into the ceremony space.',
    color: 'blush',
  },
  {
    id: 'highlight-2',
    src: '/images/gallery/weddings/weddings-063.jpg',
    alt: 'Reception tablescape layered with candles and lush florals',
    event: 'Downtown Penthouse Reception',
    caption: 'Low compotes, taper candles, and soft textiles transforming a modern loft into a warm celebration.',
    color: 'neutral',
  },
  {
    id: 'highlight-3',
    src: '/images/gallery/corporate/corporate-035.jpg',
    alt: 'Grand corporate stage design with statement florals',
    event: 'Luxury Auto Launch',
    caption: 'A sculptural stage moment pairing brand colors with architectural florals for a product reveal.',
    color: 'bold',
  },
  {
    id: 'highlight-4',
    src: '/images/gallery/private/private-041.jpg',
    alt: 'Intimate dinner table styled with layered florals and candlelight',
    event: 'Museum After-Hours Dinner',
    caption: 'Artful compotes and taper clusters creating an intimate experience after the galleries close.',
    color: 'neutral',
  },
  {
    id: 'highlight-5',
    src: '/images/gallery/daily/daily-120.jpg',
    alt: 'Statement lobby arrangement in a sculptural vessel',
    event: 'Hospitality Floral Program',
    caption: 'Weekly refreshed lobby florals that mirror the marble and metallic tones of the space.',
    color: 'bold',
  },
  {
    id: 'highlight-6',
    src: '/images/gallery/weddings/weddings-088.jpg',
    alt: 'Aisle lined with floral meadow arrangements',
    event: 'Vineyard Ceremony',
    caption: 'Layered meadow arrangements guiding guests toward the altar with organic movement and texture.',
    color: 'greenery',
  },
  {
    id: 'highlight-7',
    src: '/images/gallery/corporate/corporate-048.jpg',
    alt: 'Floral bar installation with branded signage',
    event: 'Fashion Week Lounge',
    caption: 'A graphic floral bar moment designed to frame the mixology team and photo backdrop.',
    color: 'bold',
  },
  {
    id: 'highlight-8',
    src: '/images/gallery/private/private-055.jpg',
    alt: 'Garden-inspired centerpiece with taper candles for an alfresco dinner',
    event: 'River Manor Anniversary',
    caption: 'Romantic tabletop styling for an alfresco celebration along the riverbank.',
    color: 'blush',
  },
]
