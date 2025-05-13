'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import AppContextProvider from './appContext'

// FIXME: Figure out why this would cause a massive number of re-renders
// const AppContextProvider = dynamic(() => import('@/ui/state/appContext'), { ssr: false })

export default function AppContextProviderDynamic({ children }: { children: ReactNode }) {
  return <AppContextProvider>{children}</AppContextProvider>
}
