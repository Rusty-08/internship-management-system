import { Button, ButtonProps } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/@core/loading'
import { ReactNode } from 'react'
import { LuChevronRightCircle } from 'react-icons/lu'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

type SubmitCancelButtonProps = ButtonProps & {
  cancelOnclick: () => void
  loading: boolean
  children: ReactNode
  className?: ClassNameValue
}

const SubmitCancelButton = ({
  cancelOnclick,
  loading,
  children,
  className,
  ...props
}: SubmitCancelButtonProps) => {
  return (
    <div className="flex gap-2 justify-end w-full">
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        onClick={cancelOnclick}
      >
        Cancel
      </Button>
      <Button
        disabled={loading}
        type="submit"
        className={cn('gap-1.5', className)}
        {...props}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {children}
            <LuChevronRightCircle size="1.2rem" />
          </>
        )}
      </Button>
    </div>
  )
}

export default SubmitCancelButton
