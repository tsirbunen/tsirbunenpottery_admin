'use client'

import { useEffect, useState, ReactNode } from 'react'
import ThemeProvider from '@/ui/theme/ThemeProvider'
import { useHydrationGuard } from '../utils/useHydrationGuard'

export default function ThemeProviderDynamic({ children }: { children: ReactNode }) {
  // Note: Here we need a hydration guard because the theme provider makes changes to the DOM
  // (for example, it probably changes the HTML body class name and background color) and then
  // when hydration is done, it is noticed that there is a mismatch between the server-rendered
  // HTML and the client-rendered HTML. Therefore we use this useEffect-useState-trick. Note that
  // this happens only once when the root page is navigated to.
  const isMounted = useHydrationGuard()

  if (!isMounted) return null

  return <ThemeProvider>{children}</ThemeProvider>
}
