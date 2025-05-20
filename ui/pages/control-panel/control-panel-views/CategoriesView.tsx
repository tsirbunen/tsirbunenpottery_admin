import { useAppContext } from '@/ui/state/appContext'
import ItemCard from '../item-card/ItemCard'

const CategoriesView = () => {
  const { state } = useAppContext()
  const categories = state.categories

  return (
    <div>
      <div style={{ ...columnStyle }}>
        {categories.map((category) => {
          return (
            <ItemCard
              key={category.id}
              idInfo={{ id: category.id }}
              mainInfo={[{ label: 'Names', content: [Object.values(category.names)] }]}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CategoriesView

const columnStyle: React.CSSProperties = {
  justifyContent: 'center',
  flexDirection: 'column',
  display: 'flex',
  flex: 1,
  maxWidth: '500px',
  marginTop: '10px'
}
