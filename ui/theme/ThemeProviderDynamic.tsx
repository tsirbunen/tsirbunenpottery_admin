'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const ThemeProvider = dynamic(() => import('@/ui/theme/ThemeProvider'), { ssr: false })

export default function ThemeProviderDynamic({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
