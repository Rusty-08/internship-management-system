import TaskForm from '@/components/@core/tasks/task-form'
import { getTaskById } from '@/utils/tasks'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Task Form',
}

const TaskFormPage = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await getTaskById(id)

  return (
    <div className="space-y-6">
      <TaskForm initialState={data || undefined} />
    </div>
  )
}

export default TaskFormPage
