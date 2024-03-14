import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import AuthPropvider from '@/components/session'

import { siteConfig } from '@/configs/site'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme/theme-provider'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          poppins.className,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthPropvider>{children}</AuthPropvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
