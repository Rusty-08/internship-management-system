import { formatInTimeZone } from "date-fns-tz"

export const dateInManilaTz = (date: Date | null) => {
  return date ? formatInTimeZone(date, 'Asia/Manila', 'yyyy-MM-dd') : ''
}