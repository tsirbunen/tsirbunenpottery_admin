import { DB, Doc, InputData } from './cloud-connection'
import { CollectionName } from './models'

export async function fetchDocsFromCloud(collectionName: CollectionName, db: DB): Promise<Doc[]> {
  const snapshot = await db.collection(collectionName).get()
  const docs = snapshot.docs
  return docs
}

export async function fetchDocByIdFromCloud(
  collectionName: CollectionName,
  db: DB,
  id: string
): Promise<Doc | undefined> {
  const snapshot = await db.collection(collectionName).doc(id).get()

  return snapshot.exists ? (snapshot as Doc) : undefined
}

export async function updateDocByIdInCloud(collectionName: CollectionName, db: DB, id: string, updateData: InputData) {
  return await db.collection(collectionName).doc(id).update(updateData)
}

export async function createNewEntryToCloud(collectionName: CollectionName, newId: string, input: InputData, db: DB) {
  return await db.collection(collectionName).doc(newId).set(input)
}

export function newNamesAreNew(
  currentItems: { names: Record<string, string> }[],
  newNames: Record<string, string>
): boolean {
  const names: Record<string, string[]> = {}
  for (const item of currentItems) {
    const itemNames = item.names
    Object.entries(itemNames).forEach(([key, value]) => {
      names[key] ??= []
      names[key].push(value as string)
    })
  }

  return Object.entries(newNames).every(([key, value]) => {
    const existingNames = names[key] ?? []
    return !existingNames.includes(value as string)
  })
}

const prefixesByCollectionName: Record<CollectionName, string> = {
  [CollectionName.collections]: 'COL',
  [CollectionName.categories]: 'CAT',
  [CollectionName.designs]: 'DES',
  [CollectionName.pieces]: 'PIE'
}

export function createNextId(currentItems: { id: string }[], collectionName: CollectionName): string {
  const idNumbers = currentItems.map((item) => parseInt((item.id as string).split('-')[1])).sort((a, b) => a - b)
  const nextNumber = idNumbers.length > 0 ? idNumbers[idNumbers.length - 1] + 1 : 1
  const prefix = prefixesByCollectionName[collectionName]

  return `${prefix}-${nextNumber < 10 ? '0' : ''}${nextNumber}`
}

export function allTranslationsExist(target: Record<string, string | Record<string, string>>, keys: string[]): boolean {
  const targetKeys = Object.keys(target).sort()
  const requiredKeys = [...keys].sort()

  return targetKeys.length === requiredKeys.length && targetKeys.every((key, index) => key === requiredKeys[index])
}

export function translationsAreValid(descriptions: Record<string, string>, keys: string[]): boolean {
  if (!allTranslationsExist(descriptions, keys)) {
    return false
  }

  return Object.values(descriptions).every((value) => {
    return typeof value === 'string' && value.trim() !== ''
  })
}

export function idsExist(requiredIds: string[], items: { id: string }[]): boolean {
  return requiredIds.every((id) => items.some((item) => item.id === id))
}

export function separateThisAndOtherItems<T extends { id: string }>(items: T[], id: string) {
  let thisItem: T | undefined = undefined
  const otherItems: T[] = []

  items.forEach((collection) => {
    if (collection.id === id) {
      thisItem = collection
    } else {
      otherItems.push(collection)
    }
  })

  return { thisItem, otherItems }
}
