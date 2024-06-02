'use client'

import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { ClassNameValue } from 'tailwind-merge'
import { IoCalendar } from 'react-icons/io5'

type DatePickerProps = {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
  className?: ClassNameValue
}

export function DatePickerWithRange({
  date,
  setDate,
  className,
}: DatePickerProps) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] h-10 justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              className,
            )}
          >
            <IoCalendar size="0.9rem" className="mr-3 text-text" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
