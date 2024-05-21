import { RiDashboardFill } from 'react-icons/ri'
import { IoMdChatbubbles, IoIosPeople } from 'react-icons/io'
import { MdRateReview, MdViewList } from 'react-icons/md'

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
