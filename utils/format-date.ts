import { siteConfig } from "@/configs/site"
import { formatInTimeZone, fromZonedTime } from "date-fns-tz"

export const dateInManilaTz = (date: Date | null) => {
  return date ? formatInTimeZone(date, siteConfig.timeZone, 'yyyy-MM-dd') : ''
}

// Given a date and any time zone, returns a Date with the equivalent UTC time
export const fromZonedTimeDate = (date: Date | null) => {
  return date ? fromZonedTime(date, siteConfig.timeZone) : ''
}