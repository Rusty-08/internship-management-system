import Hero from '@/components/home/hero-section/Hero'
import HomeWrapper from '@/components/home/layout/home-layout'
import Stacks from '@/components/home/stacks'
import Testimonials from '@/components/home/testimonial'

export default async function Home() {
  return (
    <HomeWrapper>
      <Hero />
      <Stacks />
      <Testimonials />
    </HomeWrapper>
  )
}
