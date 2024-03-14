import React from 'react'
import { data } from './testimonialData'
import TestimonialCard from './testimonial-card'

const Testimonials = () => {
  return (
    <section className="py-20">
      <h1 className="text-center text-3xl font-semibold text-secondary-foreground mb-4">
        What our intern say
      </h1>
      <div className="flex justify-center">
        <p className="text-center text-slate-400 mb-9 w-[70%]">
          This testimonial section is dedicated to showcasing the exceptional
          talent and dedication of our team members. Each testimonial reflects
          the individual&#39;s unique contributions and skills that they bring
          to our team.
        </p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map(testimonial => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </section>
  )
}

export default Testimonials
