import { RiDashboardFill } from 'react-icons/ri'
import { IoIosPeople, IoIosArchive } from 'react-icons/io'
import { PiChalkboardTeacherFill } from 'react-icons/pi'
import { MdManageAccounts, MdViewList } from 'react-icons/md'

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
