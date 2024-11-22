'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'
import { ClassNameValue } from 'tailwind-merge'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 rounded-md bg-foreground px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  >
    {children}
    <TooltipPrimitive.Arrow className="fill-foreground" />
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

type TooltipWrapperProps = {
  children: React.ReactNode
  tooltip: React.ReactNode
  className?: ClassNameValue
}

export const TooltipWrapper = ({
  children,
  tooltip,
  className,
}: TooltipWrapperProps) => {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger asChild className={cn('relative', className)}>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-foreground font-medium" sideOffset={5}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
