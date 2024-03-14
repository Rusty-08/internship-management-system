import React from 'react'
import Hero from './hero-section/Hero'
import Stacks from '@/components/stacks'
import Testimonials from '@/components/testimonial'

const HeroSection = () => {
  return (
    <section className="px-[10%] flex flex-col">
      <Hero />
      <Stacks />
      <Testimonials />
    </section>
  )
}

export default HeroSection
