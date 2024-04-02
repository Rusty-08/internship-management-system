import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Header } from './header'
import { BackButton } from './back-button'

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
    <Card className="w-[25rem]">
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
