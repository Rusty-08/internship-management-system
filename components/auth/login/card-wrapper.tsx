import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Header } from './header'
import { BackButton } from './back-button'
import Image from 'next/image'

type CardWrapperProps = {
  children: React.ReactNode
  headerLabel: string
  subHeaderLabel: string
  backButtonLabel?: string
  backButtonHref?: string
}

export const CardWrapper = ({
  children,
  headerLabel,
  subHeaderLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="px-2 md:px-4 py-1 w-[27rem] max-w-[95vw]">
      <CardHeader>
        <Header label={headerLabel} />
        <CardDescription className="text-center">
          {subHeaderLabel}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {backButtonLabel && backButtonHref && (
        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      )}
    </Card>
  )
}
