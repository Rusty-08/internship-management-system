import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode } from 'react'

type TabsWrapperProps = {
  triggers: string[]
  children: ReactNode
}

export function TabsWrapper({ triggers, children }: TabsWrapperProps) {
  return (
    <Tabs defaultValue={triggers[0].toLowerCase()}>
      <TabsList className={`grid w-[20rem] grid-cols-${triggers.length}`}>
        {triggers.map((trigger, index) => (
          <TabsTrigger key={index} value={trigger.toLowerCase()}>
            {trigger}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}
