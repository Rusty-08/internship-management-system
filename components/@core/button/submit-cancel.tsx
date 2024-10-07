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
        className={cn('gap-1.5 relative group', className)}
        {...props}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <span className='mr-2'>{children}</span>
            <LuChevronRight size="1.1rem" className="flex-shrink-0 absolute right-7 group-hover:right-6 transition-all duration-300 ease-in-out -me-2" />
          </>
        )}
      </Button>
      {/* <Link href={path} className='text-xs relative group text-muted-foreground hover:text-primary transition-all ease-in-out duration-300 font-medium flex items-center justify-center mr-4 gap-2'>
      {children}
      <LuChevronRight size="1rem" className="flex-shrink-0 absolute -right-3 group-hover:-right-4 transition-[right] duration-300 ease-in-out -me-2" />
    </Link> */}
    </div>
  )
}

export default SubmitCancelButton
