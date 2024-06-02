import { Card, CardHeader } from '@/components/ui/card'
import { FormMessage } from '@/components/ui/form'
import { ReactNode } from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import { GoAlert } from 'react-icons/go'

type ErrorCardProps = {
  children: ReactNode
  className?: ClassNameValue
}

const ErrorCard = ({ children, className }: ErrorCardProps) => {
  return (
    <Card
      className={twMerge(
        'border-destructive/50 shadow-none bg-destructive/10',
        className,
      )}
    >
      <CardHeader className="py-2.5 px-4">
        <FormMessage className="flex items-center gap-4">
          <GoAlert />
          {children}
        </FormMessage>
      </CardHeader>
    </Card>
  )
}

export default ErrorCard
