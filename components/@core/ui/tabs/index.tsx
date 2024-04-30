import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode } from 'react'

type TabsWrapperProps = {
  triggers: string[]
  children: ReactNode
}

export function TabsWrapper({ triggers, children }: TabsWrapperProps) {
  return (
    <Tabs defaultValue={triggers[0].toLowerCase()}>
      <TabsList
        className="grid w-[20rem]"
        style={{
          gridTemplateColumns: `repeat(${triggers.length}, minmax(0, 1fr))`,
        }}
      >
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
