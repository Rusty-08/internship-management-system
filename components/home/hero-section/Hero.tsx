import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="flex justify-between py-10 items-center gap-4">
      <div className="flex flex-grow flex-col w-1/2 gap-7 items-center md:items-start">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          A Place to enhance you skills
        </h1>
        <p className="text-sm text-center md:text-left md:text-sm">
          Our platform is dedicated to connecting talented individuals with
          dynamic internship opportunities that empower growth, innovation, and
          success. Join us in the pursuit of excellence as we champion your
          journey towards a brighter future.
        </p>
        <Button className="rounded-full w-[15rem] text-md py-7">
          Apply as intern now!
        </Button>
      </div>
      <Image
        alt="hero"
        src="/heroImage.jpg"
        width={100}
        height={100}
        className="rounded-2xl hidden md:block object-cover w-1/2"
      />
    </div>
  )
}

export default Hero
