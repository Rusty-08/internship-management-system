import React from 'react'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import TaskForm from '@/components/@core/tasks/task-form'
import { getTaskById } from '@/utils/tasks'

const link = [{ title: 'Task Management', path: '/mentor/tasks-management' }]

const TaskFormPage = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await getTaskById(id)

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper
        links={link}
        current={data ? 'Update Task' : 'Create Task'}
      />
      <TaskForm initialState={data || undefined} />
    </div>
  )
}

export default TaskFormPage
