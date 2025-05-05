import { Category, Design, DesignInput } from '../modules/types.generated'
import { DB, Doc, DocRef } from './cloud-connection'
import { CollectionName } from './models'
import { fetchDocsFromCloud, idsExist, newNamesAreNew, translationsAreValid } from './utils'

export async function fetchCurrentDesigns(db: DB, categories: Category[]) {
  const docs = await fetchDocsFromCloud(CollectionName.designs, db)
  return toDesigns(docs, categories)
}

export function toDesigns(docs: Doc[], categories: Category[]): Design[] {
  return docs.map((doc) => toDesign(doc, categories))
}

export function toDesign(doc: Doc, categories: Category[]): Design {
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
}

export function inputWithStringifiedDetails(input: DesignInput): DesignInput {
  return {
    ...input,
    details: Object.entries(input.details).reduce((acc, [key, value]) => {
      acc[key] = JSON.stringify(value)
      return acc
    }, {} as Record<string, string>)
  }
}

export function validateDesignInput(
  designInput: DesignInput,
  currentDesigns: Design[],
  currentCategories: { id: string }[]
) {
  if (!newNamesAreNew(currentDesigns, designInput.names)) {
    return Promise.reject(new Error('Design names already exist'))
  }

  if (!translationsAreValid(designInput.description, Object.keys(designInput.names))) {
    return Promise.reject(new Error('Design descriptions are not valid'))
  }

  if (!translationsAreValid(designInput.details, Object.keys(designInput.names))) {
    return Promise.reject(new Error('Design details are not valid'))
  }

  if (!idsExist(designInput.categoryIds, currentCategories)) {
    return Promise.reject(new Error('Design category references do not exist'))
  }
}
