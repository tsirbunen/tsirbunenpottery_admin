import {
  Category,
  CategoryInput,
  Collection,
  CollectionInput,
  Design,
  DesignInput,
  PieceInput,
  ProductsData,
  Piece
} from '../modules/types.generated'
import { fetchCurrentCategories } from './category-utils'
import { db } from './cloud-connection'
import { fetchCurrentCollections } from './collection-utils'
import { fetchCurrentDesigns } from './design-utils'
import { CollectionName } from './models'
import { createNextSerialNumber, fetchCurrentPieces, imageFileNamesAreValid } from './piece-utils'
import { createNewEntryToCloud, createNextId, idsExist, newNamesAreNew, translationsAreValid } from './utils'

export class ProductsHandler {
  async fetchAllProducts(): Promise<ProductsData> {
    const products: ProductsData = {
      [CollectionName.collections]: [],
      [CollectionName.categories]: [],
      [CollectionName.designs]: [],
      [CollectionName.pieces]: []
    }

    products[CollectionName.collections] = await fetchCurrentCollections(db)
    products[CollectionName.categories] = await fetchCurrentCategories(db)
    products[CollectionName.designs] = await fetchCurrentDesigns(db, products[CollectionName.categories])
    products[CollectionName.pieces] = await fetchCurrentPieces(
      db,
      products[CollectionName.collections],
      products[CollectionName.designs]
    )

    return products
  }

  async createCollection(collectionInput: CollectionInput): Promise<Collection> {
    const currentCollections = await fetchCurrentCollections(db)

    if (!newNamesAreNew(currentCollections, collectionInput.names)) {
      return Promise.reject(new Error('Collection names already exist'))
    }

    const newId = createNextId(currentCollections as { id: string }[], CollectionName.collections)
    const newCollection = await createNewEntryToCloud(
      CollectionName.collections,
      newId,
      {
        names: collectionInput.names
      },
      db
    )

    if (!newCollection) {
      throw new Error('Failed to create new collection')
    }

    return {
      names: collectionInput.names,
      id: newId
    }
  }

  async createCategory(categoryInput: CategoryInput): Promise<Category> {
    const currentCategories = await fetchCurrentCategories(db)

    if (!newNamesAreNew(currentCategories, categoryInput.names)) {
      return Promise.reject(new Error('Category names already exist'))
    }

    const newId = createNextId(currentCategories as { id: string }[], CollectionName.categories)
    const newCategory = await createNewEntryToCloud(
      CollectionName.categories,
      newId,
      {
        names: categoryInput.names
      },
      db
    )

    if (!newCategory) {
      throw new Error('Failed to create new category')
    }

    return {
      names: categoryInput.names,
      id: newId
    }
  }

  async createDesign(input: DesignInput): Promise<Design> {
    const currentCategories = await fetchCurrentCategories(db)
    const currentDesigns = await fetchCurrentDesigns(db, currentCategories)
    const designInput = {
      ...input,
      details: Object.entries(input.details).reduce((acc, [key, value]) => {
        acc[key] = JSON.stringify(value)
        return acc
      }, {} as Record<string, string>)
    }

    if (!newNamesAreNew(currentDesigns, designInput.names)) {
      return Promise.reject(new Error('Design names already exist'))
    }

    if (!translationsAreValid(designInput.description, Object.keys(designInput.names))) {
      return Promise.reject(new Error('Design descriptions are not valid'))
    }

    if (!translationsAreValid(designInput.details, Object.keys(designInput.names))) {
      return Promise.reject(new Error('Design details are not valid'))
    }

    if (!idsExist(designInput.categoryIds, currentCategories as { id: string }[])) {
      return Promise.reject(new Error('Design category references do not exist'))
    }

    const newId = createNextId(currentDesigns as { id: string }[], CollectionName.designs)

    const newDesign = await createNewEntryToCloud(
      CollectionName.designs,
      newId,
      {
        ...designInput
      },
      db
    )

    if (!newDesign) {
      throw new Error('Failed to create new design')
    }

    return {
      names: designInput.names,
      id: newId,
      categoryIds: designInput.categoryIds,
      description: designInput.description,
      details: designInput.details
    }
  }

  async createPiece(pieceInput: PieceInput): Promise<Piece> {
    const currentCollections = await fetchCurrentCollections(db)
    const currentCategories = await fetchCurrentCategories(db)
    const currentDesigns = await fetchCurrentDesigns(db, currentCategories)
    const currentPieces = await fetchCurrentPieces(db, currentCollections, currentDesigns)

    const collectionId = pieceInput.collectionId
    if (collectionId && !idsExist([collectionId], currentCollections as { id: string }[])) {
      return Promise.reject(new Error('Piece collection reference does not exist'))
    }

    const designId = pieceInput.designId
    if (designId && !idsExist([designId], currentDesigns as { id: string }[])) {
      return Promise.reject(new Error('Piece design reference does not exist'))
    }

    if (!imageFileNamesAreValid(pieceInput.imageFileNames)) {
      return Promise.reject(new Error('Piece image file names are not valid'))
    }

    const serialNumber = createNextSerialNumber(currentPieces as Piece[])

    const newId = createNextId(currentPieces as { id: string }[], CollectionName.pieces)

    const newPiece = await createNewEntryToCloud(
      CollectionName.pieces,
      newId,
      {
        ...pieceInput,
        serialNumber
      },
      db
    )

    if (!newPiece) {
      throw new Error('Failed to create new piece')
    }

    return {
      id: newId,
      serialNumber,
      designId,
      imageFileNames: pieceInput.imageFileNames,
      collectionId
    }
  }
}
