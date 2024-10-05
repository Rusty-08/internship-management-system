import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'
import logoPlaceholder from '@/public/test-logo.svg'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Internship Portal',
  company: 'Baroque Works, LLC',
  description: 'Intership Management System in Baroque Works, LLC, a made up company',
  timeZone: 'Asia/Manila',
  socialMedia: [
    { href: '', icon: FaFacebookF },
    { href: '', icon: FaInstagram },
    { href: '', icon: FaLinkedinIn },
  ],
  logoPlaceholder,
  mentorsExpertise: [
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
    'Mobile Developer',
    'UI/UX Designer',
    'Data Scientist',
  ]
}
