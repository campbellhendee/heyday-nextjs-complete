export const BRAND = {
  name: 'Heyday Flower Co',
  region: 'Houston, Texas',
  tagline: 'Floral artistry for celebrations and spaces',
  availability: 'By appointment only',
  serviceArea: 'Serving Houston, Austin, and destination events nationwide',
  studio: {
    street: '1201 N Shepherd Dr, Suite 2',
    city: 'Houston',
    state: 'TX',
    postal: '77008',
  },
  phone: {
    display: '(281) 627-3593',
    href: 'tel:+12816273593',
  },
  email: {
    display: 'HeydayFlowerCo@gmail.com',
    href: 'mailto:HeydayFlowerCo@gmail.com',
  },
  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/heydayflowerco' },
    { name: 'Pinterest', href: 'https://www.pinterest.com/heydayflowerco' },
  ],
  nav: [
    { name: 'Home', href: '/' },
    { name: 'Weddings', href: '/weddings' },
    { name: 'Corporate Events', href: '/corporate-events' },
    { name: 'Private Events', href: '/private-events' },
    { name: 'Daily Arrangements', href: '/daily-arrangements' },
  ],
  secondaryNav: [
    { name: 'Inquiry', href: '/inquiry' },
  ],
} as const;
