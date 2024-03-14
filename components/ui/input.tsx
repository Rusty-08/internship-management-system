import * as React from 'react'

import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react/dist/iconify.js'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon
              icon={icon}
              width="1em"
              height="1em"
              className="text-muted-foreground"
            />
          </div>
        )}
        <input
          type={type}
          className={cn(
            `flex h-9 w-full rounded-md border border-input bg-transparent ${
              icon ? 'ps-8 pe-3' : 'px-3'
            } py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
