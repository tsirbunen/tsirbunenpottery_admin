'use client'

import React, { createContext, useState, ReactNode, useContext } from 'react'

export type TabsContextType = {
  selectedTab: string
  setSelectedTab: (newSelectedTab: string) => void
  options: Array<{ key: string; label: string }>
}

export const TabsContext = createContext<TabsContextType | undefined>(undefined)

type TabsProviderProps = {
  tabOptions: Array<{ key: string; label: string }>
  initialTab: string
  children: ReactNode
}

export const TabsContextProvider = React.memo(({ children, initialTab, tabOptions }: TabsProviderProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(initialTab)
  const [options] = useState<Array<{ key: string; label: string }>>(tabOptions)

  console.log('%c<Tabs> rendered', 'color: orange')

  return <TabsContext.Provider value={{ selectedTab, setSelectedTab, options }}>{children}</TabsContext.Provider>
})

export const useTabs = (): TabsContextType => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('No context! The useTabs hook must be used within a TabsContextProvider!!!')
  }

  return context
}
