import NoRecords from '@/components/@core/ui/no-records'
import { Accordion } from '@/components/ui/accordion'
import { getTasks } from '@/utils/tasks'
import { getCurrentUser } from '@/utils/users'
import TaskCard from './task-card'
import { TaskWrapperProps } from './types'

const TaskWrapper = async ({
  search,
  status,
  isMentoshipRole = false,
  mentorId,
}: TaskWrapperProps) => {
  const user = await getCurrentUser()
  const userId = mentorId || user?.id
  const mentorTasks = await getTasks(userId || '', search, status)

  const sortedByDate = mentorTasks?.tasks
    ? mentorTasks?.tasks.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
    : []

  const selectedTasks = status
    ? sortedByDate.filter(task => {
        return status !== 'all' ? task.status.toLowerCase() === status : task
      })
    : sortedByDate

  return (
    <div className="flex flex-col gap-6">
      {selectedTasks.length ? (
        <Accordion type="single" collapsible className="w-full">
          {selectedTasks.map(task => (
            <TaskCard key={task.id} task={task} isMentor={isMentoshipRole} />
          ))}
        </Accordion>
      ) : (
        <NoRecords
          searchOutput={search ?? ''}
          className="border bg-card rounded-md pb-8"
        />
      )}
    </div>
  )
}

export default TaskWrapper
