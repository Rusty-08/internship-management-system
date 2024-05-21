import { CustomIcon } from '@/components/@core/iconify'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { siteConfig } from '@/configs/site'
import React from 'react'

const Footer = () => {
  return (
    <div className="flex w-full text-sm text-text h-20 gap-8 justify-between flex-col lg:flex-row items-center">
      <div className="space-x-2">
        <p>Internship Management System v0.1.0</p>
      </div>
      <div className="flex gap-3">
        {siteConfig.socialMedia.map((item, idx) => (
          <a href={item.href} key={idx} className="hover:text-primary">
            <Avatar>
              <AvatarFallback>
                <item.icon size="1.1rem" />
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
