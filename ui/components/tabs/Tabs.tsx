'use client'

import TabsSelector from './TabSelector'
import { TabsContextProvider } from './tabsContext'

type TabsProps = {
  options: Array<{ key: string; label: string }>
  initialTab?: string
  children?: React.ReactNode
}

const Tabs = ({ options, initialTab, children }: TabsProps) => {
  return (
    <TabsContextProvider options={options} initialTab={initialTab}>
      <div style={{ ...columnStyle }}>
        <TabsSelector />

        {children}
      </div>
    </TabsContextProvider>
  )
}

export default Tabs

const columnStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column' }
