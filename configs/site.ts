import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'
import odiLogoCircleWhite from '@/public/odi-white-logo.svg'
import odiLogoCircleBlack from '@/public/odi-logo.png'
import logoPlaceholder from '@/public/test-logo.svg'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Internship Portal',
  description: 'Intership Management System in OnDemand Innovation',
  timeZone: 'Asia/Manila',
  socialMedia: [
    { href: '', icon: FaFacebookF },
    { href: '', icon: FaInstagram },
    { href: '', icon: FaLinkedinIn },
  ],
  logoCircleWhite: odiLogoCircleWhite,
  logoCircleBlack: odiLogoCircleBlack,
  logoPlaceholder
}
