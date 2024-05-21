import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Internship Portal',
  description: 'Intership Management System in OnDemand Innovation',
  socialMedia: [
    { href: '', icon: FaFacebookF },
    { href: '', icon: FaInstagram },
    { href: '', icon: FaLinkedinIn },
  ],
}
