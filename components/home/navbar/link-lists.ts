import { FaHome } from 'react-icons/fa'
import { RiServiceFill } from 'react-icons/ri'
import { IoIosPeople } from 'react-icons/io'
import { FaPersonCircleQuestion } from 'react-icons/fa6'
import { MdContacts } from 'react-icons/md'

export const links = [
  {
    name: 'Home',
    path: '/',
    icon: FaHome,
  },
  {
    name: 'Solutions',
    path: '/solutions',
    icon: RiServiceFill,
  },
  {
    name: 'Partners & Clients Portfolio',
    path: '/partners-and-clients',
    icon: IoIosPeople,
  },
  {
    name: 'About Us',
    path: '/about-us',
    icon: FaPersonCircleQuestion,
  },
  {
    name: 'Contact Us',
    path: '/contact-us',
    icon: MdContacts,
  },
]
