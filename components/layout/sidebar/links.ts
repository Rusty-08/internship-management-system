import { IconType } from 'react-icons/lib'
import {
  MdOutlineArchive,
  MdOutlineCalendarMonth,
  MdOutlineDashboard,
  MdOutlineListAlt,
  MdOutlineManageAccounts,
  MdOutlinePeopleOutline,
  MdOutlineRateReview,
} from 'react-icons/md'
import { PiChalkboardTeacher } from 'react-icons/pi'

export type SidebarLinkProps = {
  name: string
  path: string
  icon: IconType
}[]

export const adminSidebarLinks = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: MdOutlineDashboard,
  },
  {
    name: 'Intern Management',
    path: '/admin/intern-management',
    icon: MdOutlinePeopleOutline,
  },
  {
    name: 'Mentor Management',
    path: '/admin/mentor-management',
    icon: PiChalkboardTeacher,
  },
  {
    name: 'Internship Management',
    path: '/admin/internship-management',
    icon: MdOutlineManageAccounts,
  },
  {
    name: 'Reports',
    path: '/admin/reports',
    icon: MdOutlineListAlt,
  },
  {
    name: 'Archived Records',
    path: '/admin/archived-records',
    icon: MdOutlineArchive,
  },
]

export const internSidebarLinks = [
  {
    name: 'Dashboard',
    path: '/intern',
    icon: MdOutlineDashboard,
  },
  {
    name: 'My Attendance',
    path: '/intern/my-attendance',
    icon: MdOutlineCalendarMonth,
  },
  {
    name: 'Task Management',
    path: '/intern/task-management',
    icon: MdOutlineListAlt,
  },
]

export const mentorSidebarLinks = [
  {
    name: 'Dashboard',
    path: '/mentor',
    icon: MdOutlineDashboard,
  },
  {
    name: 'Interns Monitoring',
    path: '/mentor/interns-monitoring',
    icon: MdOutlinePeopleOutline,
  },
  {
    name: 'Tasks Management',
    path: '/mentor/tasks-management',
    icon: MdOutlineListAlt,
  },
  {
    name: 'Grading',
    path: '/mentor/grading',
    icon: MdOutlineRateReview,
  },
]
