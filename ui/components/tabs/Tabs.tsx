'use client'

import TabsSelector from './TabSelector'
import { TabsContextProvider } from './tabsContext'
import React, { memo } from 'react'

type TabsProps = {
  options: Array<{ key: string; label: string }>
  initialTab: string
  children: React.ReactNode
}

const Tabs = memo(({ options, initialTab, children }: TabsProps) => {
  return (
    <div style={{ ...columnStyle }}>
      <TabsContextProvider initialTab={initialTab} tabOptions={options}>
        <TabsSelector />
        {children}
      </TabsContextProvider>
    </div>
  )
})

export default Tabs

const columnStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column' }
