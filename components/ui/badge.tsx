import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        PRIMARY:
          'border-transparent bg-primary/10 text-primary hover:bg-primary/20',
        COMPLETED:
          'border-transparent bg-completed/10 text-completed hover:bg-completed/20',
        IN_PROGRESS:
          'border-transparent bg-in-progress/10 text-in-progress hover:bg-in-progress/20',
        PENDING:
          'bordertransparent bg-pending/10 text-pending hover:bg-pending/20',
        OVERDUE:
          'border-transparent bg-overdue/10 text-overdue hover:bg-overdue/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
