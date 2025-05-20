import { useAppContext } from '@/ui/state/appContext'
import ItemCard from '../item-card/ItemCard'

const PiecesView = () => {
  const { state } = useAppContext()
  const pieces = state.pieces

  return (
    <div>
      <div style={{ ...columnStyle }}>
        {pieces.map((piece) => {
          const design = state.designsById[piece.designId]
          const collection = piece.collectionId ? state.collectionsById[piece.collectionId] : null
          const designNames = design.names
          const collectionNames = collection?.names ?? {}
          const idInfo = {
            id: piece.id,
            serialNumber: piece.serialNumber
          }

          return (
            <ItemCard
              key={piece.id}
              idInfo={idInfo}
              imageFileNames={piece.imageFileNames}
              mainInfo={[
                { label: 'Collections', content: [Object.values(collectionNames)] },
                { label: 'Designs', content: [Object.values(designNames)] }
              ]}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PiecesView

const columnStyle: React.CSSProperties = {
  justifyContent: 'center',
  flexDirection: 'column',
  display: 'flex',
  flex: 1,
  maxWidth: '500px',
  marginTop: '10px'
}
