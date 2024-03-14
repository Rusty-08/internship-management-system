import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

import { CustomIcon } from '@/components/iconify'

type StackProps = {
  image?: string
  title: string
  desc: string
  link: string
}

const Stack = ({ image, title, desc, link }: StackProps) => {
  return (
    <Card>
      <CardHeader>
        {/* <Image src={image} alt={title} /> */}
        <div className="bg-muted h-28 rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
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
          <CustomIcon icon="heroicons:arrow-right" />
        </a>
      </CardFooter>
    </Card>
  )
}

export default Stack
