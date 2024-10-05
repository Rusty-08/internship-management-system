import { Button, ButtonProps } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/@core/loading'
import { ReactNode } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { LuChevronRight } from "react-icons/lu"

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
        className="hidden md:inline-flex"
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
            <LuChevronRight size="1.1rem" className="flex-shrink-0 -me-2" />
          </>
        )}
      </Button>
    </div>
  )
}

export default SubmitCancelButton
