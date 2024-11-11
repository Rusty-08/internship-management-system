import { TooltipWrapper } from './tooltip'
import { Button, ButtonProps } from './button'
import Link from 'next/link'
import { ReactNode } from 'react'

type IconLinkButtonProps = {
  tooltip: string
  path: string
  children: ReactNode
} & ButtonProps

export const IconLinkButton = ({
  path,
  tooltip,
  children,
  ...props
}: IconLinkButtonProps) => {
  return (
    <TooltipWrapper tooltip={tooltip}>
      <Button variant="ghost" size="circle" {...props}>
        <Link
          href={path}
          className="h-full w-full flex items-center justify-center"
        >
          {children}
        </Link>
      </Button>
    </TooltipWrapper>
  )
}
