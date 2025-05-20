'use client'

import { Tab } from '@/ui/components/tabs/Tab'
import Tabs from '@/ui/components/tabs/Tabs'
import CollectionsView from './control-panel-views/CollectionsView'
import DesignsView from './control-panel-views/DesignsView'
import CategoriesView from './control-panel-views/CategoriesView'
import PiecesView from './control-panel-views/PiecesView'
import { Text } from '@chakra-ui/react'

type TabOption = 'collections' | 'categories' | 'designs' | 'pieces'

const title = 'CONTROL PANEL'

const options: { key: TabOption; label: string }[] = [
  { key: 'collections', label: 'Collections' },
  { key: 'categories', label: 'Categories' },
  { key: 'designs', label: 'Designs' },
  { key: 'pieces', label: 'Pieces' }
]

const ControlPanel = () => {
  return (
    <div {...columnCss}>
      <div {...rowCss}>
        <Text>{title}</Text>
      </div>

      <Tabs options={options} initialTab="pieces">
        <Tab tabName="collections">
          <CollectionsView />
        </Tab>
        <Tab tabName="categories">
          <CategoriesView />
        </Tab>
        <Tab tabName="designs">
          <DesignsView />
        </Tab>
        <Tab tabName="pieces">
          <PiecesView />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ControlPanel

const columnCss = {
  style: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
    flex: 1
  } as React.CSSProperties
}

const rowCss = {
  style: {
    fontSize: '20px',
    fontWeight: 'bold',
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  } as React.CSSProperties
}
