'use client'

import { format } from 'date-fns'
import { DateRange, DayModifiers } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, CalendarProps } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { ClassNameValue } from 'tailwind-merge'
import { IoCalendar } from 'react-icons/io5'
import { formatInTimeZone } from 'date-fns-tz'
import { siteConfig } from '@/configs/site'
import { CalendarIcon } from '@radix-ui/react-icons'

type DatePickerProps = {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
  className?: ClassNameValue
  disableBtn?: boolean
  modifiers?: DayModifiers
}

export function DatePickerWithRange({
  date,
  setDate,
  className,
  disableBtn = false,
  modifiers,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn(
            'h-10 justify-start text-left px-4 max-w-full font-normal overflow-hidden text-ellipsis',
            !date && 'text-muted-foreground',
            className,
          )}
          disabled={disableBtn}
        >
          <CalendarIcon className="mr-3 h-4 w-4 mb-0.5" />
          {date?.from ? (
            date.to ? (
              <>
                {formatInTimeZone(date.from, siteConfig.timeZone, 'LLL dd, y')}{' '}
                - {formatInTimeZone(date.to, siteConfig.timeZone, 'LLL dd, y')}
              </>
            ) : (
              formatInTimeZone(date.from, siteConfig.timeZone, 'LLL dd, y')
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
          // modifiers={{
          //   disabled: [{ before: new Date() }, { dayOfWeek: [0, 6] }],
          // }}
          modifiers={modifiers}
        />
      </PopoverContent>
    </Popover>
  )
}
