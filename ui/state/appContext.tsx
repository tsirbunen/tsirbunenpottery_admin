'use client'

import React, { createContext, ReactNode, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { Category, Collection, Design, Piece } from '../types/graphql-schema-types.generated'
import { DispatchAction, reducer } from './reducer'

// FIXME: Remove this once real data is available
const testCollections: Collection[] = [
  { id: 'COL-01', names: { en: 'Collection 1', fi: 'Kokoelma 1' } },
  { id: 'COL-02', names: { en: 'Collection 2', fi: 'Kokoelma 2' } },
  { id: 'COL-03', names: { en: 'Collection 3', fi: 'Kokoelma 3' } },
  { id: 'COL-04', names: { en: 'Collection 4', fi: 'Kokoelma 4' } },
  { id: 'COL-05', names: { en: 'Collection 5', fi: 'Kokoelma 5' } }
]

const testCategories: Category[] = [
  {
    id: 'CAT-01',
    names: {
      en: 'Mugs and Cups',
      fi: 'Mukit ja kupit'
    }
  },
  {
    id: 'CAT-02',
    names: {
      en: 'Plates',
      fi: 'Laudat'
    }
  },
  {
    id: 'CAT-03',
    names: {
      en: 'Bowls',
      fi: 'Kulhot'
    }
  },
  {
    id: 'CAT-04',
    names: {
      en: 'Vases',
      fi: 'Maljakot'
    }
  },
  {
    id: 'CAT-05',
    names: {
      en: 'Decorative Items',
      fi: 'Koriste-esineet'
    }
  }
]

const testDesigns: Design[] = [
  {
    id: 'DES-01',
    names: {
      en: 'Waking Light',
      fi: 'Heräävä valo'
    },
    categoryIds: ['CAT-01', 'CAT-02', 'CAT-03'],
    description: {
      en: 'I love the ritual of a slow morning coffee, and these latte mugs are made with that in mind. Generously sized and comfortable to hold, they are perfect for your favorite latte, a cozy tea, or even a hot chocolate piled high with cream.',
      fi: 'Rakastan hitaiden aamukahvien rituaalia, ja nämä latte-mukit on tehty juuri sitä varten. Mukit ovat tilavia ja mukautuvat käteen hyvin, joten ne sopivat täydellisesti suosikkilatteesi, mukavaan teehetkeen tai jopa kuumaan suklaaseen kermavaahdon kera.'
    },
    details: {
      en: {
        'Approximate capacity': '75 ml',
        Dimensions: 'Height ~6.5 cm, Diameter ~6.8 cm',
        Material: 'High-fired stoneware',
        Glaze: 'Commercial glaze',
        Finish: 'Glazed inside, unglazed outside'
      },
      fi: {
        'Arvioitu tilavuus': '75 ml',
        Mitat: 'Korkeus ~6.5 cm, Halkaisija ~6.8 cm',
        Materiaali: 'Korkeassa lämpötilassa poltettu kivitavara',
        Päällyste: 'Teollinen lasitus',
        Viimeistely: 'Lasitettu sisältä, lasittamaton ulkoa'
      }
    }
  }
]

const testPieces: Piece[] = [
  {
    id: 'PIE-01',
    collectionId: 'COL-01',
    designId: 'DES-01',
    serialNumber: 1,
    imageFileNames: ['espresso.png', 'soap.png']
  },
  {
    id: 'PIE-02',
    collectionId: 'COL-01',
    designId: 'DES-01',
    serialNumber: 2,
    imageFileNames: ['espresso.png', 'soap.png']
  },
  {
    id: 'PIE-03',
    collectionId: 'COL-01',
    designId: 'DES-01',
    serialNumber: 3,
    imageFileNames: ['espresso.png', 'soap.png']
  }
]

export const initialAppState = {
  collections: testCollections,
  categories: testCategories,
  designs: testDesigns,
  pieces: testPieces,
  collectionsById: testCollections.reduce((acc, collection) => ({ ...acc, [collection.id]: collection }), {}),
  categoriesById: testCategories.reduce((acc, category) => ({ ...acc, [category.id]: category }), {}),
  designsById: testDesigns.reduce((acc, design) => ({ ...acc, [design.id]: design }), {}),
  piecesById: testPieces.reduce((acc, piece) => ({ ...acc, [piece.id]: piece }), {})
}

export type AppState = {
  collections: Collection[]
  categories: Category[]
  designs: Design[]
  pieces: Piece[]
  collectionsById: Record<string, Collection>
  categoriesById: Record<string, Category>
  designsById: Record<string, Design>
  piecesById: Record<string, Piece>
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
