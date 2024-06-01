import * as React from 'react'

import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react/dist/iconify.js'
import { IconType } from 'react-icons/lib'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative">
        {Icon && (
          <Icon
            size="1rem"
            className="text-muted-foreground top-[.7rem] absolute left-4 pointer-events-none"
          />
        )}
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border border-input hover:border-text bg-transparent ${
              Icon ? 'ps-10 pe-3' : 'px-4'
            } py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
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
