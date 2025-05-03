import { Collection } from '../modules/types.generated'
import { DB, Doc } from './cloud-connection'
import { CollectionName } from './models'
import { fetchDocsFromCloud } from './utils'

export async function fetchCurrentCollections(db: DB) {
  const collectionDocs = await fetchDocsFromCloud(CollectionName.collections, db)
  return toCollections(collectionDocs)
}

export function toCollections(docs: Doc[]): Collection[] {
  return docs.map((doc) => {
    const data = doc.data()
    return { id: doc.id, names: data.names } as Collection
  })
}
