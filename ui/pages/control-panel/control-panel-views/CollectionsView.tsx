import { useAppContext } from '@/ui/state/appContext'
import ItemCard from '../item-card/ItemCard'

const CollectionsView = () => {
  const { state } = useAppContext()
  const collections = state.collections

  return (
    <div>
      <div style={{ ...columnStyle }}>
        {collections.map((collection) => {
          return (
            <ItemCard
              key={collection.id}
              idInfo={{ id: collection.id }}
              mainInfo={[{ label: 'Names', content: [Object.values(collection.names)] }]}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CollectionsView

const columnStyle: React.CSSProperties = {
  justifyContent: 'center',
  flexDirection: 'column',
  display: 'flex',
  flex: 1,
  maxWidth: '500px',
  marginTop: '10px'
}
