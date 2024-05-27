import React from 'react'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import TaskForm from '@/app/mentor/tasks-management/_components/create-form'

const page = () => {
  const link = [{ title: 'Task Management', path: '/mentor/tasks-management' }]
  const title = 'Create Task'
  return (
    <div className="mx-auto px-4">
      <BreadcrumbWrapper links={link} current={title} />
      <TaskForm />
    </div>
  )
}

export default page
