export const BRAND = {
  name: 'Heyday Flower Co',
  region: 'Houston, Texas',
  tagline: 'By appointment',
  phone: {
    display: '(281) 627-3593',
    href: 'tel:+12816273593',
  },
  email: {
    display: 'HeydayFlowerCo@gmail.com',
    href: 'mailto:HeydayFlowerCo@gmail.com',
  },
  instagram: '', // add when available
  nav: [
    { name: 'Home', href: '/' },
    { name: 'Weddings', href: '/weddings' },
    { name: 'Corporate Events', href: '/corporate-events' },
    { name: 'Private Events', href: '/private-events' },
    { name: 'Daily Arrangements', href: '/daily-arrangements' },
  ],
} as const;
