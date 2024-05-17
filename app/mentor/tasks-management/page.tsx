import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import TaskCard, { TaskCardProps } from './_components/task-card'
import TaskWrapper from './_components/task-wrapper'
import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/utils/users'

const TasksManagement = async () => {
  const user = await getCurrentUser()
  const mentorTasks = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      tasks: {
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          dueDate: true,
          files: {
            select: {
              id: true,
              name: true,
              url: true,
            },
          },
        },
      },
    },
  })
  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Tasks Management" />
      <TaskWrapper tasks={mentorTasks?.tasks || []} />
    </div>
  )
}

export default TasksManagement
