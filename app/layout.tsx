import AuthProvider from '@/components/providers/session'
import { ThemeProvider } from '@/components/providers/theme/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/configs/site'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import 'react-datepicker/dist/react-datepicker.css'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Internship Management System',
    default: 'Internship Portal',
  },
  description: siteConfig.description,
  metadataBase: new URL('https://internship-portal-beryl.vercel.app/'),
}

export const viewport = {
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
          'min-h-screen bg-background antialiased',
          poppins.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
