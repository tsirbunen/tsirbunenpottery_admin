import { produce } from 'immer'
import { Collection } from '../types/graphql-schema-types.generated'
import { AppState } from './appContext'

export enum Dispatch {
  SET_COLLECTIONS = 'SET_COLLECTIONS',
  ADD_COLLECTION = 'ADD_COLLECTION',
  REMOVE_COLLECTION = 'REMOVE_COLLECTION'
}

export type DispatchAction =
  | { type: Dispatch.SET_COLLECTIONS; payload: { collections: Collection[] } }
  | { type: Dispatch.ADD_COLLECTION; payload: { collection: Collection } }
  | { type: Dispatch.REMOVE_COLLECTION; payload: { collectionId: string } }

export const reducer = produce((draft: AppState, { type, payload }: DispatchAction) => {
  switch (type) {
    case Dispatch.SET_COLLECTIONS:
      draft.collections = payload.collections
      break
    case Dispatch.ADD_COLLECTION:
      draft.collections.push(payload.collection)
      break
    case Dispatch.REMOVE_COLLECTION:
      draft.collections = draft.collections.filter((collection) => collection.id !== payload.collectionId)
      break
    default:
      throw new Error(`${JSON.stringify(type)} is not an app context reducer action type!`)
  }
})
