'use client'

import React, { createContext, ReactNode, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { Collection } from '../types/graphql-schema-types.generated'
import { DispatchAction, reducer } from './reducer'

// FIXME: Remove this once real data is available
const testCollections: Collection[] = [
  { id: 'COL-01', names: { en: 'Collection 1', fi: 'Kokoelma 1' } },
  { id: 'COL-02', names: { en: 'Collection 2', fi: 'Kokoelma 2' } },
  { id: 'COL-03', names: { en: 'Collection 3', fi: 'Kokoelma 3' } },
  { id: 'COL-04', names: { en: 'Collection 4', fi: 'Kokoelma 4' } },
  { id: 'COL-05', names: { en: 'Collection 5', fi: 'Kokoelma 5' } }
]

export const initialAppState = {
  collections: testCollections
}

export type AppState = {
  collections: Collection[]
}

export type AppContextType = {
  state: AppState
  dispatch: React.Dispatch<DispatchAction>
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

function AppContextProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialAppState)

  console.log('%c<AppContextProvider> rendered', 'color: green')

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('No context! The useAppContext hook must be used within an AppContextProvider!!!')
  }

  return context
}

export default AppContextProvider
