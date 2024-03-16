import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div
      style={{ height: 'calc(100vh - 5rem)' }}
      className="flex justify-between py-10 items-center gap-10"
    >
      <div className="flex text-center md:text-left flex-grow flex-col w-1/2 gap-7 items-center md:items-start">
        <div className="space-y-3">
          <p className="text-primary">OnDemand Innovation</p>
          <h1 className="text-3xl md:text-5xl font-bold">
            A Place to enhance your <span className="text-primary">skills</span>
          </h1>
        </div>
        <p className="text-text">
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
        className="hidden lg:block object-cover w-1/2"
      />
    </div>
  )
}

export default Hero
