import { Category, Design } from '../modules/types.generated'
import { DB, Doc, DocRef } from './cloud-connection'
import { CollectionName } from './models'
import { fetchDocsFromCloud } from './utils'

export async function fetchCurrentDesigns(db: DB, categories: Category[]) {
  const docs = await fetchDocsFromCloud(CollectionName.designs, db)
  return toDesigns(docs, categories)
}

export function toDesigns(docs: Doc[], categories: Category[]): Design[] {
  return docs.map((doc) => {
    const data = doc.data()
    const categoryIds: string[] = []

    data.categoryIds.forEach((ref: DocRef) => {
      const existingCategory = categories.find((cat) => cat.id === ref.id)
      if (existingCategory) {
        categoryIds.push(ref.id)
      }
    })

    const parsedDetails = Object.fromEntries(
      Object.entries(data.details).map(([key, value]) => [key, JSON.parse(value as string)])
    )

    return {
      id: doc.id,
      names: data.names,
      categoryIds,
      description: data.description,
      details: parsedDetails
    } as Design
  })
}
