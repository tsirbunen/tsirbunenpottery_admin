import { useAppContext } from '@/ui/state/appContext'
import ItemCard from '../item-card/ItemCard'

const DesignsView = () => {
  const { state } = useAppContext()
  const designs = state.designs

  return (
    <div>
      <div style={{ ...columnStyle }}>
        {designs.map((design) => {
          const pieces = state.pieces.filter((piece) => piece.designId === design.id)
          const imageFileNames = pieces
            .map((piece) => piece.imageFileNames[0])
            .flat()
            .filter(Boolean)

          const categories = design.categoryIds.map((categoryId) => state.categoriesById[categoryId])
          const categoryNames = categories.map((category) => Object.values(category.names)) as string[][]
          const idInfo = { id: design.id }

          return (
            <ItemCard
              key={design.id}
              idInfo={idInfo}
              imageFileNames={imageFileNames}
              mainInfo={[
                { label: 'Names', content: [Object.values(design.names)] },
                { label: 'Categories', content: categoryNames }
              ]}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DesignsView

const columnStyle: React.CSSProperties = {
  justifyContent: 'center',
  flexDirection: 'column',
  display: 'flex',
  flex: 1,
  maxWidth: '500px',
  marginTop: '10px'
}
