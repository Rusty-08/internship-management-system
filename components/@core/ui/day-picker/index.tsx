"use client"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ClassNameValue } from "tailwind-merge"
import { Dispatch, SetStateAction } from "react"
import { formatInTimeZone } from "date-fns-tz"
import { siteConfig } from "@/configs/site"
import { Matcher } from "react-day-picker"
import { CalendarIcon } from "@radix-ui/react-icons"

type DatePickerProps = {
  date: Date | undefined
  setDate: Dispatch<SetStateAction<Date | undefined>>
  disabled?: Matcher | Matcher[] | undefined
  disableBtn?: boolean
  className?: ClassNameValue
}

export function DayPicker({ date, setDate, disabled, disableBtn, className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[250px] px-4 justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disableBtn}
        >
          <CalendarIcon className="mr-3 h-4 w-4 mb-0.5" />
          {date ? formatInTimeZone(date, siteConfig.timeZone, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
}
