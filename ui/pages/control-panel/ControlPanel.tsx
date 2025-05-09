import { Tab } from '@/ui/components/tabs/Tab'
import Tabs from '@/ui/components/tabs/Tabs'

type TabOption = 'collections' | 'categories' | 'designs' | 'pieces'

const options: { key: TabOption; label: string }[] = [
  { key: 'collections', label: 'Collections' },
  { key: 'categories', label: 'Categories' },
  { key: 'designs', label: 'Designs' },
  { key: 'pieces', label: 'Pieces' }
]

const ControlPanel = () => {
  return (
    <div style={{ ...columnStyle }}>
      <Tabs options={options} initialTab="collections">
        <Tab tabName="collections">
          <div>test child component</div>
        </Tab>
        <Tab tabName="categories"></Tab>
        <Tab tabName="designs"></Tab>
        <Tab tabName="pieces"></Tab>
      </Tabs>
    </div>
  )
}

export default ControlPanel

const columnStyle: React.CSSProperties = {
  justifyContent: 'center',
  alignItems: 'start',
  display: 'flex'
}
