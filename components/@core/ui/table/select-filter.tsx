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

export type ItemsProps = {
  value: string
  name: string
  color?: string
}

type SelectFilterProps = {
  defaultValue: string
  className?: ClassNameValue
  placeholder?: string
  handleStatusChange: (term: string) => void
  items: ItemsProps[] | undefined
} & SelectProps

const SelectFilter = ({
  defaultValue,
  items,
  placeholder,
  handleStatusChange,
  className,
  ...props
}: SelectFilterProps) => {
  const colorMargin = [
    '-translate-x-1',
    '-translate-x-2',
    '-translate-x-3',
    '-translate-x-4',
    '-translate-x-5',
  ]

  if (!items) return null

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={handleStatusChange}
      {...props}
    >
      <SelectTrigger className={cn('bg-card w-max', className)}>
        <SelectValue placeholder={placeholder} defaultValue={defaultValue} />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          {items.map((item, idx) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex items-center gap-2">
                {item.color && (
                  <>
                    {item.color !== 'all' ? (
                      <div
                        className={cn(
                          'h-2.5 w-2.5 flex-shrink-0 rounded-full border',
                          item.color === 'all' ? 'bg-slate-100' : item.color,
                        )}
                      />
                    ) : (
                      <div className="flex items-center">
                        {items.slice(1).map((_item, index) => (
                          <div
                            key={_item.value}
                            className={cn(
                              'h-2.5 w-2.5 flex-shrink-0 rounded-full border',
                              _item.color === 'all'
                                ? 'bg-slate-100'
                                : _item.color,
                              _item.color !== 'all' && colorMargin[index - 1],
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
                <span
                  className={cn(
                    item.color === 'all'
                      ? `-translate-x-${items.length - 2}`
                      : 'ml-0',
                  )}
                >
                  {item.name}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectFilter
