'use client'

import SectionHeader from '@/components/home/header'
import { data } from '@/components/home/testimonial/data'
import TestimonialCard from '@/components/home/testimonial/testimonial-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

const Testimonials = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  return (
    <section className="py-20">
      <SectionHeader
        header="What our intern say"
        subHeader="This testimonial section is dedicated to showcasing the exceptional talent and dedication of our team members. Each testimonial reflects the individual's unique contributions and skills that they bring to our team."
      />
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ align: 'center', loop: true }}
      >
        <CarouselContent className="items-center">
          {data.map(testimonial => (
            <CarouselItem key={testimonial.id}>
              <TestimonialCard {...testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="hidden lg:flex" />
        <CarouselPrevious className="hidden lg:flex" />
      </Carousel>
    </section>
  )
}

export default Testimonials
