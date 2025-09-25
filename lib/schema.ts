import { BRAND } from './brand'

export const organizationSchema = {
  '@context':'https://schema.org', '@type':'LocalBusiness', '@id':'https://heydayflowerco.com',
  name: BRAND.name, description:'Luxury floral design for weddings, events, and daily arrangements in Houston, Texas.',
  url:'https://heydayflowerco.com', telephone: BRAND.phone.display, email: BRAND.email.display,
  address:{ '@type':'PostalAddress', addressLocality:'Houston', addressRegion:'TX', postalCode:'77005', addressCountry:'US' },
  geo:{ '@type':'GeoCoordinates', latitude:29.7604, longitude:-95.3698 },
  openingHoursSpecification:{ '@type':'OpeningHoursSpecification', dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'], opens:'09:00', closes:'18:00' },
  priceRange:'$$$'
}

export const weddingServiceSchema = {
  '@context':'https://schema.org','@type':'Service', serviceType:'Wedding Floral Design', provider:{ '@id':'https://heydayflowerco.com' },
  areaServed:{ '@type':'City', name:'Houston' },
  hasOfferCatalog:{ '@type':'OfferCatalog', name:'Wedding Floral Services', itemListElement:[
    { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Bridal Bouquets', description:'Custom designed bridal and bridesmaid bouquets' }},
    { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Ceremony Installations', description:'Arches, aisle designs, and altar arrangements' }},
    { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Reception Design', description:'Centerpieces, head table designs, and room installations' }},
  ]}
}

export const faqSchema = {
  '@context':'https://schema.org','@type':'FAQPage',
  mainEntity:[
    { '@type':'Question', name:'How far in advance should I book wedding flowers?', acceptedAnswer:{ '@type':'Answer', text:'We recommend booking 6-12 months in advance for weddings, especially for peak season dates (March-May and September-November in Houston).'}},
    { '@type':'Question', name:'Do you deliver throughout Houston?', acceptedAnswer:{ '@type':'Answer', text:'Yes, we deliver throughout the Greater Houston area including River Oaks, Memorial, The Heights, Montrose, West University, and surrounding areas.'}},
    { '@type':'Question', name:'What is your design process?', acceptedAnswer:{ '@type':'Answer', text:'Our process begins with a consultation to understand your vision, followed by a custom design proposal, sourcing of premium blooms, and professional installation on your event day.'}},
  ]
}
