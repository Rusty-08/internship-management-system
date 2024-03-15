import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div
      style={{ height: 'calc(100vh - 5rem)' }}
      className="flex justify-between py-10 items-center gap-10"
    >
      <div className="flex flex-grow flex-col w-1/2 gap-7 items-center md:items-start">
        <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">
          A Place to enhance you skills
        </h1>
        <p className="text-sm text-text text-center md:text-left md:text-sm">
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
        src="/innovation.svg"
        width={90}
        height={90}
        className="hidden md:block object-cover w-1/2"
      />
    </div>
  )
}

export default Hero
