import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

import { CustomIcon } from '@/components/@core/iconify'

type StackProps = {
  id: string
  image: string
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
        <div className="space-y-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-3 hover:line-clamp-none">
            {desc}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <a
          href={link}
          className="text-sm flex items-center gap-2 hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
          <CustomIcon width={15} icon="heroicons:arrow-right" />
        </a>
      </CardFooter>
    </Card>
  )
}

export default Stack
