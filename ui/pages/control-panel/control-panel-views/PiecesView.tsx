import { useAppContext } from '@/ui/state/appContext'
import { Piece } from '@/ui/types/graphql-schema-types.generated'
import PanelView from './PanelView'

const PiecesView = () => {
  const { state } = useAppContext()
  const pieces = state.pieces

  const mainInfoBuilder = (piece: Piece) => {
    const design = state.designsById[piece.designId]
    const collection = piece.collectionId ? state.collectionsById[piece.collectionId] : null
    const designNames = design.names as Record<string, string>
    const collectionNames = (collection?.names ?? {}) as Record<string, string>

    return [
      { label: 'Collections', content: [Object.values(collectionNames)] },
      { label: 'Designs', content: [Object.values(designNames)] }
    ]
  }

  return <PanelView items={pieces} mainInfoBuilder={mainInfoBuilder} />
}

export default PiecesView
