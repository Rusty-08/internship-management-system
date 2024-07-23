import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { getAllInternAttendance } from '@/utils/attendance'
import React from 'react'
import Attendance from './_components/attendance'

const InternsAttendance = async () => {
  const allAttendance = await getAllInternAttendance()
  const currentAttendance = allAttendance.flatMap(attendance => attendance)

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Interns Attendance" />
      <Attendance currentAttendance={currentAttendance} />
    </div>
  )
}

export default InternsAttendance
