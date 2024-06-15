import Link from 'next/link'
import { PiCopyrightDuotone } from 'react-icons/pi'

const Footer = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-10">
      <div className="flex gap-1 items-center text-sm">
        <div className="flex items-center gap-1 text-text">
          <p>2024 - {new Date().getFullYear()}</p>
          <PiCopyrightDuotone />
        </div>
        <p>ODI - LLC Internship Portal</p>
      </div>
      <Link href="/" className="text-text text-sm">
        Privacy Policy
      </Link>
    </div>
  )
}

export default Footer
