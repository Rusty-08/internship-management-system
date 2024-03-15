import React from 'react'
import { data } from './testimonialData'
import TestimonialCard from './testimonial-card'
import SectionHeader from '../header'

const Testimonials = () => {
  return (
    <section className="py-20">
      <SectionHeader
        header="What our intern say"
        subHeader="This testimonial section is dedicated to showcasing the exceptional talent and dedication of our team members. Each testimonial reflects the individual's unique contributions and skills that they bring to our team."
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map(testimonial => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </section>
  )
}

export default Testimonials
