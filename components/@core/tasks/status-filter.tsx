'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const StatusFilter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = (status: string) => {
    const params = new URLSearchParams(searchParams)
    if (status) {
      params.set('status', status)
      if (status === 'all') {
        params.delete('status')
      }
    } else {
      params.delete('status')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select defaultValue="all" onValueChange={val => handleSearch(val)}>
      <SelectTrigger className="bg-card w-max">
        <SelectValue
          placeholder="Select task status"
          defaultValue={searchParams.get('status' || '')?.toString()}
        />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default StatusFilter
