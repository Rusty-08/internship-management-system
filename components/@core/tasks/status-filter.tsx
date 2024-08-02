'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { ClassNameValue } from 'tailwind-merge'

type StatusFilterProps = {
  handleSearch: (term: string) => void
  searchParams: ReadonlyURLSearchParams
  className?: ClassNameValue
}

const StatusFilter = ({ handleSearch, searchParams, className }: StatusFilterProps) => {
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
