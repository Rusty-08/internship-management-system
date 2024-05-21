import { RiDashboardFill } from 'react-icons/ri'
import { IoCalendar } from 'react-icons/io5'
import { IoMdChatbubbles } from 'react-icons/io'
import { MdViewList } from 'react-icons/md'
import { FaCalendarPlus } from "react-icons/fa6"

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
