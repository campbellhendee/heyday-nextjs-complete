import Hero from '@/components/Hero'
import InquiryForm from '@/components/InquiryForm'
import { HERO_IMAGES } from '@/lib/visuals'

export default function InquiryPage(){
  return (
    <>
      <Hero
        title="Start Your Inquiry"
        subtitle="We'd love to learn about your event or floral needs"
        image={HERO_IMAGES.inquiry.src}
        imageAlt={HERO_IMAGES.inquiry.alt}
      />
      <section className="container" style={{paddingBlock:32}}>
        <InquiryForm/>
      </section>
    </>
  )
}
