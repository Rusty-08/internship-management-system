'use client'

import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'

const themes = [
  { icon: SunIcon, label: 'Light' },
  { icon: MoonIcon, label: 'Dark' },
  { icon: LaptopIcon, label: 'System' },
]

export function ThemeToggle() {
  const { setTheme, theme: initialTheme } = useTheme()
  const [theme, setLocalTheme] = useState<string>()

  useEffect(() => {
    setLocalTheme(initialTheme)
  }, [initialTheme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="circle" className="text-text">
          {themes.map(
            ({ icon: Icon, label }) =>
              theme === label.toLowerCase() && (
                <Icon key={label} className="size-5" />
              ),
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2 min-w-40">
        {themes.map(({ icon: Icon, label }) => (
          <DropdownMenuItem
            key={label}
            onClick={() => setTheme(label.toLowerCase())}
            className={`${
              theme === label.toLowerCase()
                ? 'bg-muted text-primary'
                : 'bg-transparent'
            } group cursor-pointer`}
          >
            <Icon className="mr-2 group-hover:text-primary size-4" />
            <span className="group-hover:text-primary">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// export function ThemeToggle() {
//   return null
// }
