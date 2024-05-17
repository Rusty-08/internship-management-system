'use client'
import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const queryClient = new QueryClient()

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>
        <ProgressBar
          height="3px"
          color="#86B6F6"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
