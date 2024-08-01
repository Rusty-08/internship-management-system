import { cn } from '@/lib/utils'
import * as React from 'react'
import { IconType } from 'react-icons/lib'
import { Button } from './button'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType | null
  endIcon?: IconType | null
  endIconOnClick?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, endIcon: EndIcon, endIconOnClick, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {Icon && <Icon className="absolute top-[0.7rem] left-4 text-muted-foreground pointer-events-none" />}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input hover:border-text bg-transparent',
            EndIcon ? 'pe-10 ps-4' : 'px-4',
            Icon ? 'ps-10 pe-4' : 'px-4',
            'py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {EndIcon && (
          <Button
            type="button"
            className="absolute top-[.25rem] right-2 h-8 w-8"
            variant="ghost"
            size="circle"
            onClick={endIconOnClick}
            disabled={disabled}
          >
            <EndIcon
              size="1rem"
              className="text-muted-foreground pointer-events-none"
            />
          </Button>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
