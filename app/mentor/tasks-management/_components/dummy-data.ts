import { format } from 'date-fns'
import { TaskCardProps } from './task-card'

const date = format(new Date(), 'MMMM dd, yyyy')

export const tasks: TaskCardProps[] = [
  {
    taskNumber: 1,
    title: 'Update YachtSetGo Home Page',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    status: 'completed',
    date: date,
  },
  {
    taskNumber: 2,
    title: 'Updated MPB My Account Page',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    status: 'in-progress',
    date: date,
  },
]
