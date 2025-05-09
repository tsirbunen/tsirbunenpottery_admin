'use client'

import { useTabs } from './tabsContext'

type TabProps = {
  tabName: string
  children?: React.ReactNode
}

export const Tab = ({ tabName, children }: TabProps) => {
  const { selectedTab: selectedTab } = useTabs()

  const isCurrentTab = selectedTab === tabName

  if (!isCurrentTab) {
    return null
  }

  return children ?? <div />
}
