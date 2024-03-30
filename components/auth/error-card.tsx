import { Card, CardHeader } from '@/components/ui/card'
import { CustomIcon } from '@/components/@core/iconify'
import { FormMessage } from '@/components/ui/form'
import { ReactNode } from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'

type ErrorCardProps = {
  children: ReactNode
  className?: ClassNameValue
}

const ErrorCard = ({ children, className }: ErrorCardProps) => {
  return (
    <Card
      className={twMerge('border-none shadow-none bg-destructive/5', className)}
    >
      <CardHeader className="py-2.5">
        <FormMessage className="flex items-center gap-5">
          <CustomIcon icon="solar:danger-triangle-line-duotone" />
          {children}
        </FormMessage>
      </CardHeader>
    </Card>
  )
}

export default ErrorCard
