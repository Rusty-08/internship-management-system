import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image, { StaticImageData } from 'next/image'

import { GoArrowUpRight } from 'react-icons/go'

type StackProps = {
  id: string
  image: StaticImageData
  title: string
  desc: string
  link: string
}

const Stack = ({ id, image, title, desc, link }: StackProps) => {
  return (
    <Card key={id}>
      <CardHeader>
        <Image
          className="rounded-sm object-cover h-48"
          src={image}
          alt={title}
          width={400}
          height={100}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CardTitle className="leading-7">{title}</CardTitle>
          <CardDescription className="line-clamp-3">{desc}</CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <a
          href={link}
          className="text-sm flex items-center gap-1 hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
          <GoArrowUpRight size="1rem" />
        </a>
      </CardFooter>
    </Card>
  )
}

export default Stack
