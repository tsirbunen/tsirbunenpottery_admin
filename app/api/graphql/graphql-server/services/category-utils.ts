import { Category } from '../modules/types.generated'
import { DB, Doc } from './cloud-connection'
import { CollectionName } from './models'
import { fetchDocsFromCloud } from './utils'

export async function fetchCurrentCategories(db: DB) {
  const docs = await fetchDocsFromCloud(CollectionName.categories, db)
  return toCategories(docs)
}

export function toCategories(docs: Doc[]): Category[] {
  return docs.map((doc) => {
    const data = doc.data()
    return { id: doc.id, names: data.names } as Category
  })
}
