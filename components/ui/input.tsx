import { cn } from '@/lib/utils'
import * as React from 'react'
import { IconType } from 'react-icons/lib'
import { Button } from './button'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType | null
  iconOnClick?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, iconOnClick, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border border-input hover:border-text bg-transparent ${
              Icon ? 'pe-10 ps-4' : 'px-4'
            } py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          ref={ref}
          {...props}
        />
        {Icon && (
          <Button
            type="button"
            className="absolute top-[.25rem] right-2 h-8 w-8"
            variant="ghost"
            size="circle"
            onClick={iconOnClick}
          >
            <Icon
              size="1rem"
              className="text-muted-foreground pointer-events-none"
              onClick={iconOnClick}
            />
          </Button>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
