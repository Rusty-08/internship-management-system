import React from 'react'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import TaskForm from '@/components/@core/tasks/create-form'
import prisma from '@/lib/prisma'

const link = [{ title: 'Task Management', path: '/mentor/tasks-management' }]

const CreateTask = async ({ params: { id } }: { params: { id: string } }) => {
  const getData = async () => {
    if (id !== 'create-task') {
      const taskData = await prisma.task.findUnique({
        where: { id },
        include: {
          files: true
        }
      })
      return {
        id: taskData?.id,
        title: taskData?.title || '',
        description: taskData?.description || '',
        date: {
          startDate: taskData?.startDate || undefined,
          endDate: taskData?.endDate || undefined,
        },
        upload: undefined,
        taskId: taskData?.files[0].id
      }
    } else {
      return undefined
    }
  }

  const data = await getData()

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper links={link} current="Create Task" />
      <TaskForm initialState={data} />
    </div>
  )
}

export default CreateTask
