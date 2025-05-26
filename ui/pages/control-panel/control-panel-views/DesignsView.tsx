import { useAppContext } from '@/ui/state/appContext'
import { Design, Piece } from '@/ui/types/graphql-schema-types.generated'
import PanelView from './PanelView'

const DesignsView = () => {
  const { state } = useAppContext()
  const designs = state.designs

  const piecesById = state.piecesById

  const attachExampleImages = (designs: Design[], piecesById: Record<string, Piece>) => {
    const examplePieceImages = designs.map((design) => {
      const examplePiece = Object.values(piecesById).find((piece) => piece.designId === design.id)
      return examplePiece?.imageFileNames?.[0]
    })

    const designsWithExampleImages = designs.map((design, index) => ({
      ...design,
      imageFileNames: examplePieceImages[index]
    }))

    return designsWithExampleImages
  }

  const mainInfoBuilder = (design: Design) => {
    const categories = design.categoryIds.map((categoryId) => state.categoriesById[categoryId])
    const categoryNames = categories.map((category) => Object.values(category.names)) as string[][]

    return [
      { label: 'Names', content: [Object.values(design.names)] as string[][] },
      { label: 'Categories', content: categoryNames }
    ]
  }

  return <PanelView items={attachExampleImages(designs, piecesById)} mainInfoBuilder={mainInfoBuilder} />
}

export default DesignsView
