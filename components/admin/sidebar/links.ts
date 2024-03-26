export type SidebarLinkItemType = {
  name: string
  path: string
  icon: string
}

export type SidebarLinkType = {
  category: string
  links: SidebarLinkItemType[]
}

export const sidebarLinks = [
  {
    category: '',
    links: [
      {
        name: 'Dashboard',
        path: '/intern',
        icon: 'ic:twotone-dashboard',
      },
      {
        name: 'Chat',
        path: '/admin/chat',
        icon: 'ic:twotone-chat',
      },
    ],
  },
  {
    category: 'ACADEMIC',
    links: [
      {
        name: 'Pre-Registration',
        path: '/admin/pre-registration',
        icon: 'ic:twotone-group-add',
      },
      {
        name: 'Student Assessment',
        path: '/admin/student-assessment',
        icon: 'solar:notes-bold-duotone',
      },
    ],
  },
  {
    category: 'PROFILE',
    links: [
      {
        name: 'Individual Form',
        path: '/admin/individual-form',
        icon: 'solar:pen-2-bold-duotone',
      },
    ],
  },
  {
    category: 'REPORTS',
    links: [
      {
        name: 'My Grades',
        path: '/admin/my-grades',
        icon: 'solar:clipboard-list-bold-duotone',
      },
      {
        name: 'My Permanent Record',
        path: '/admin/my-permanent-record',
        icon: 'solar:square-academic-cap-2-bold-duotone',
      },
      {
        name: 'Enrollment Status',
        path: '/admin/enrollment-status',
        icon: 'solar:pen-new-square-bold-duotone',
      },
    ],
  },
]