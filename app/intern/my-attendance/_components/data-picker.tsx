import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { cn } from '@/lib/utils'
import { DateRange } from 'react-day-picker'
import { ClassNameValue } from 'tailwind-merge'
import { useDebouncedCallback } from 'use-debounce'

interface DateRangeFilterProps {
  date: DateRange | undefined
  setDate: (dateRange: DateRange | undefined) => void
  className?: ClassNameValue
}

export function DateRangeFilter({
  date,
  setDate,
  className,
}: DateRangeFilterProps) {
  const handleDateChange = useDebouncedCallback(
    (dateRange: DateRange | undefined) => {
      setDate(dateRange)
    },
    200,
  )

  return (
    <DatePickerWithRange
      date={date}
      setDate={handleDateChange}
      className={cn('w-min lg:w-[300px]', className)}
    />
  )
}
