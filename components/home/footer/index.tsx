import { CustomIcon } from '@/components/@core/iconify'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'

const socialMedia = [
  { href: '', icon: 'ri:facebook-fill' },
  { href: '', icon: 'ri:instagram-fill' },
  { href: '', icon: 'ri:linkedin-fill' },
]

const Footer = () => {
  return (
    <div className="flex w-full text-sm text-text h-20 gap-8 justify-between flex-col lg:flex-row items-center">
      <div className="space-x-2">
        <p>Internship Management System v0.1.0</p>
      </div>
      <div className="flex gap-3">
        {socialMedia.map((item, idx) => (
          <a href={item.href} key={idx} className="hover:text-primary">
            <Avatar>
              <AvatarFallback>
                <CustomIcon className="text-lg" icon={item.icon} />
              </AvatarFallback>
            </Avatar>
          </a>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <p>Copyright</p>
        <CustomIcon icon="ic:twotone-copyright" />
        <p>{new Date().getFullYear()} — All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
