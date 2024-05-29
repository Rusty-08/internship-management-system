import React from 'react'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import TaskForm from '@/app/mentor/tasks-management/_components/create-form'

const CreateTask = () => {
  const link = [{ title: 'Task Management', path: '/mentor/tasks-management' }]

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper links={link} current='Create Task' />
      <TaskForm />
    </div>
  )
}

export default CreateTask
