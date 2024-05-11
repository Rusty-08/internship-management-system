import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import heroImage from '@/public/home/innovation.svg'

const Hero = () => {
  return (
    <div
      style={{ height: 'calc(100vh - 6rem)' }}
      className="flex justify-between py-10 w-full items-center gap-10 relative"
    >
      <div className="flex text-center md:text-left flex-grow flex-col gap-7 items-center md:items-start">
        <div className="space-y-2 w-3/5">
          <p className="text-primary">OnDemand Innovation</p>
          <h1 className="text-3xl md:text-[4rem] font-bold leading-tight">
            A Place to enhance your{' '}
            <span className="bg-gradient-to-r from-primary to-fuchsia-900 bg-clip-text text-transparent">
              skills
            </span>
          </h1>
        </div>
        <p className="text-text w-1/2">
          Our platform is dedicated to connecting talented individuals with
          dynamic internship opportunities that empower growth, innovation, and
          success. Join us in the pursuit of excellence as we champion your
          journey towards a brighter future.
        </p>
        <Button className="rounded-full w-[15rem] text-md py-7">
          Apply as intern now!
        </Button>
      </div>
      <div className="w-1/2 flex absolute -right-14 items items-center justify-center">
        <Image
          alt="hero"
          src={heroImage}
          width="0"
          height="0"
          className="hidden lg:block object-cover w-full"
        />
      </div>
    </div>
  )
}

export default Hero
