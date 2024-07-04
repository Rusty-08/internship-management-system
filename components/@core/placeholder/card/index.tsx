import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ClassNameValue } from 'tailwind-merge'

type TaskStatCardProps = {
  name: string
  className?: ClassNameValue
}

export const TaskStatCard = ({ name, className }: TaskStatCardProps) => {
  return (
    <Card className={cn('', className)}>
      <CardContent className="h-full">
        <div className="flex h-full text-text items-center justify-center">
          {name}
        </div>
      </CardContent>
    </Card>
  )
}
