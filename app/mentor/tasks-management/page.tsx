import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import TaskWrapper from '@/app/mentor/tasks-management/_components/task-wrapper'
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
          startDate: true,
          endDate: true,
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
