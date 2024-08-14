'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { SelectProps } from '@radix-ui/react-select'
import { FC } from 'react'
import { ClassNameValue } from 'tailwind-merge'

type SelectFilterProps = {
  defaultValue: string
  className?: ClassNameValue
  handleStatusChange: (term: string) => void
  items: {
    value: string,
    name: string
    color?: string
  }[]
} & SelectProps

const SelectFilter = ({
  defaultValue,
  items,
  handleStatusChange,
  className,
  ...props
}: SelectFilterProps) => {
  const colorMargin = [
    '-translate-x-1',
    '-translate-x-2',
    '-translate-x-3',
    '-translate-x-4',
  ]

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={handleStatusChange}
      {...props}
    >
      <SelectTrigger className={cn("bg-card w-max", className)}>
        <SelectValue
          placeholder="Task status"
          defaultValue={defaultValue}
        />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          {items.map((item, idx) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex items-center gap-2">
                {item.color && (
                  <>
                    {idx !== 0 ? (
                      <div className={cn(
                        "h-2.5 w-2.5 rounded-full border",
                        item.color === 'all' ? 'bg-slate-100' : item.color
                      )} />
                    ) : (
                      <div className='flex items-center'>
                        {items.slice(1).map((_item, index) => (
                          <div key={_item.value} className={cn(
                            "h-2.5 w-2.5 rounded-full border",
                            _item.color === 'all' ? 'bg-slate-100' : _item.color,
                            index !== 0 && colorMargin[index - 1]
                          )} />
                        ))}
                      </div>
                    )}
                  </>
                )}
                <span className={cn(
                  'ml-0',
                  item.color && idx === 0 && `-ml-${items.length - 2}`
                )}>{item.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectFilter
