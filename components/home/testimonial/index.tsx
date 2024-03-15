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
      <div className="mt-8 [column-fill:_balance] gap-4 sm:columns-2 lg:columns-3">
        {data.map(testimonial => (
          <div key={testimonial.id} className="mb-8 sm:break-inside-avoid">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
