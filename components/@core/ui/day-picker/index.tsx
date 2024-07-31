"use client"

import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ClassNameValue } from "tailwind-merge"
import { Dispatch, SetStateAction } from "react"
import { formatInTimeZone } from "date-fns-tz"
import { siteConfig } from "@/configs/site"

type DatePickerProps = {
  date: Date | undefined
  setDate: Dispatch<SetStateAction<Date | undefined>>
  className?: ClassNameValue
}

export function DayPicker({ date, setDate, className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[260px] px-4 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-3 h-4 w-4" />
          {date ? formatInTimeZone(date, siteConfig.timeZone, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
