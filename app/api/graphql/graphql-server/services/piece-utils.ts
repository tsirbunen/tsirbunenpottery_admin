import { Collection, Design, Piece } from '../modules/types.generated'
import { DB, Doc, DocRef } from './cloud-connection'
import { CollectionName } from './models'
import { fetchDocsFromCloud } from './utils'

export async function fetchCurrentPieces(db: DB, collections: Collection[], designs: Design[]) {
  const docs = await fetchDocsFromCloud(CollectionName.pieces, db)
  return toPieces(docs, collections, designs)
}

export function toPieces(docs: Doc[], collections: Collection[], designs: Design[]): Piece[] {
  return docs.map((doc) => {
    const data = doc.data()

    const designIdRef = data.designId
    const designId = designIdRef ? designs.find((design) => design.id === (designIdRef as DocRef).id)?.id : null

    const collectionRef = data.collectionId
    const collectionId = collectionRef
      ? collections.find((collection) => collection.id === (collectionRef as DocRef).id)?.id
      : null

    return {
      id: doc.id,
      serialNumber: data.serialNumber,
      designId,
      imageFileNames: data.imageFileNames,
      collectionId
    } as Piece
  })
}

export function createNextSerialNumber(currentPieces: Piece[]): number {
  let highestNumber = 0
  currentPieces.forEach((piece) => {
    const serialNumber = piece.serialNumber
    if (serialNumber > highestNumber) {
      highestNumber = serialNumber
    }
  })

  return highestNumber + 1
}

export function imageFileNamesAreValid(fileNames: object): boolean {
  return (
    Array.isArray(fileNames) &&
    fileNames.every((fileName) => typeof fileName === 'string' && fileName.split('.').length > 1)
  )
}
