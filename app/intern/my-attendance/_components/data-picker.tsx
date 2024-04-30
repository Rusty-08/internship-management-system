import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import { useDebouncedCallback } from 'use-debounce'

interface DateRangeFilterProps {
  date: DateRange | undefined
  setDate: (dateRange: DateRange | undefined) => void
}

export function DateRangeFilter({ date, setDate }: DateRangeFilterProps) {
  const handleDateChange = useDebouncedCallback(
    (dateRange: DateRange | undefined) => {
      setDate(dateRange)
    },
    200,
  )

  return <DatePickerWithRange date={date} setDate={handleDateChange} />
}
