import Hero from '@/components/home/hero-section/Hero'
import Stacks from '@/components/home/stacks'
import Testimonials from '@/components/home/testimonial'

const HeroSection = () => {
  return (
    <section className="px-4 md:px-[8%] flex flex-col">
      <Hero />
      <Stacks />
      <Testimonials />
    </section>
  )
}

export default HeroSection
