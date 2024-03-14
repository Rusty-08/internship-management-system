import React from 'react'
import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../ui/card'

type Testimonial = {
  id: number
  name: string
  text: string
  role: string
  imgUrl: string
}

const TestimonialCard = ({ id, name, text, role, imgUrl }: Testimonial) => {
  return (
    <Card key={id}>
      <CardHeader className="text-justify text-secondary-foreground text-sm text-slate-400">
        <CardDescription>{text}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row-reverse justify-end gap-4">
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{role}</CardDescription>
        </div>
        <Image
          src={imgUrl}
          width={50}
          height={50}
          alt="Avatar"
          className="rounded-full"
        />
      </CardFooter>
    </Card>
  )
}

export default TestimonialCard
