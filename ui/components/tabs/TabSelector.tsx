'use client'

import { Button } from '@/ui/theme/button/Button'
import { Visual } from '@/ui/theme/visual-enum'
import { useTabs } from './tabsContext'

const TabsSelector = ({}: {}) => {
  const { selectedTab, setSelectedTab, options } = useTabs()

  return (
    <div style={{ ...rowStyle }}>
      {options.map(({ key, label }) => {
        const isSelected = selectedTab === key
        const visualStyle = isSelected ? Visual.SOLID_DARK : Visual.SOLID_PALE

        return (
          <Button key={label} visual={visualStyle} onClick={() => setSelectedTab(key)}>
            {label}
          </Button>
        )
      })}
    </div>
  )
}

export default TabsSelector

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '2px',
  justifyContent: 'center',
  marginTop: '10px',
  marginBottom: '10px'
}
