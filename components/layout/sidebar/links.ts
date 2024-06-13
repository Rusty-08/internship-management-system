import { RiDashboardFill } from 'react-icons/ri'
import { IoIosPeople, IoIosArchive } from 'react-icons/io'
import { PiChalkboardTeacherFill } from 'react-icons/pi'
import { MdManageAccounts, MdViewList } from 'react-icons/md'
import { IoCalendar } from 'react-icons/io5'
import { IoMdChatbubbles } from 'react-icons/io'
import { FaCalendarPlus } from 'react-icons/fa6'
import { MdRateReview } from 'react-icons/md'
import { IconType } from 'react-icons/lib'

export type SidebarLinkProps = {
  name: string
  path: string
  icon: IconType
}[]

export const adminSidebarLinks = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: RiDashboardFill,
  },
  {
    name: 'Intern Management',
    path: '/admin/intern-management',
    icon: IoIosPeople,
  },
  {
    name: 'Mentor Management',
    path: '/admin/mentor-management',
    icon: PiChalkboardTeacherFill,
  },
  {
    name: 'Internship Management',
    path: '/admin/internship-management',
    icon: MdManageAccounts,
  },
  {
    name: 'Reports',
    path: '/admin/reports',
    icon: MdViewList,
  },
  {
    name: 'Archived Records',
    path: '/admin/archived-records',
    icon: IoIosArchive,
  },
]

export const internSidebarLinks = [
  {
    name: 'Dashboard',
    path: '/intern',
    icon: RiDashboardFill,
  },
  {
    name: 'Chat',
    path: '/intern/chat',
    icon: IoMdChatbubbles,
  },
  {
    name: 'My Attendance',
    path: '/intern/my-attendance',
    icon: IoCalendar,
  },
  {
    name: 'Task Management',
    path: '/intern/task-management',
    icon: MdViewList,
  },
]

export const mentorSidebarLinks = [
  {
    name: 'Dashboard',
    path: '/mentor',
    icon: RiDashboardFill,
  },
  {
    name: 'Chat',
    path: '/mentor/chat',
    icon: IoMdChatbubbles,
  },
  {
    name: 'Interns Monitoring',
    path: '/mentor/interns-monitoring',
    icon: IoIosPeople,
  },
  {
    name: 'Tasks Management',
    path: '/mentor/tasks-management',
    icon: MdViewList,
  },
  {
    name: 'Grading',
    path: '/mentor/grading',
    icon: MdRateReview,
  },
]
