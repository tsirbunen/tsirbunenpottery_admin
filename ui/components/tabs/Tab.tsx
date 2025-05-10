'use client'

import { useTabs } from './tabsContext'

type TabProps = {
  tabName: string
  children?: React.ReactNode
}

export const Tab = ({ tabName, children = null }: TabProps) => {
  const { selectedTab } = useTabs()

  const isCurrentTab = selectedTab === tabName

  if (!isCurrentTab) {
    return null
  }

  return children
}
