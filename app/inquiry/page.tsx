import Hero from '@/components/Hero'
import InquiryForm from '@/components/InquiryForm'

export default function InquiryPage(){
  return (
    <>
      <Hero title="Start Your Inquiry" subtitle="We'd love to learn about your event or floral needs" image="/images/hero/inquiry.jpg"/>
      <section className="container" style={{paddingBlock:32}}>
        <InquiryForm/>
      </section>
    </>
  )
}
