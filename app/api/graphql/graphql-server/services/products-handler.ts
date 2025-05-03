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
import {
  createNewEntryToCloud,
  createNextId,
  fetchDocByIdFromCloud,
  idsExist,
  newNamesAreNew,
  separateThisAndOtherItems,
  translationsAreValid,
  updateDocByIdInCloud
} from './utils'

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

  async updateCollection(id: string, collectionInput: CollectionInput): Promise<Collection> {
    const collections = await fetchCurrentCollections(db)
    const { thisItem, otherItems } = separateThisAndOtherItems<Collection>(collections, id)

    if (!thisItem) {
      return Promise.reject(new Error('Collection not found, cannot update'))
    }

    if (!newNamesAreNew(otherItems, collectionInput.names)) {
      return Promise.reject(new Error('Collection names already exist'))
    }

    const updatedCollection = await updateDocByIdInCloud(CollectionName.collections, db, id, {
      names: collectionInput.names
    })

    if (!updatedCollection) {
      throw new Error('Failed to update collection')
    }

    return {
      names: collectionInput.names,
      id
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

  async updateCategory(id: string, categoryInput: CategoryInput): Promise<Category> {
    const categories = await fetchCurrentCategories(db)
    const { thisItem, otherItems } = separateThisAndOtherItems<Category>(categories, id)

    if (!thisItem) {
      return Promise.reject(new Error('Category not found, cannot update'))
    }

    if (!newNamesAreNew(otherItems, categoryInput.names)) {
      return Promise.reject(new Error('Category names already exist'))
    }

    const updatedCategory = await updateDocByIdInCloud(CollectionName.categories, db, id, {
      names: categoryInput.names
    })

    if (!updatedCategory) {
      throw new Error('Failed to update category')
    }

    return {
      names: categoryInput.names,
      id
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

  async updateDesign(id: string, input: DesignInput): Promise<Design> {
    const currentCategories = await fetchCurrentCategories(db)
    const currentDesigns = await fetchCurrentDesigns(db, currentCategories)
    const designInput = {
      ...input,
      details: Object.entries(input.details).reduce((acc, [key, value]) => {
        acc[key] = JSON.stringify(value)
        return acc
      }, {} as Record<string, string>)
    }

    const { thisItem, otherItems } = separateThisAndOtherItems<Design>(currentDesigns, id)

    if (!thisItem) {
      return Promise.reject(new Error('Design not found, cannot update'))
    }

    if (!newNamesAreNew(otherItems, designInput.names)) {
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

    const updatedDesign = await updateDocByIdInCloud(CollectionName.designs, db, id, {
      ...designInput
    })

    if (!updatedDesign) {
      throw new Error('Failed to update new design')
    }

    return {
      names: designInput.names,
      id,
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

  async updatePiece(id: string, pieceInput: PieceInput): Promise<Piece> {
    const currentCollections = await fetchCurrentCollections(db)
    const currentCategories = await fetchCurrentCategories(db)
    const currentDesigns = await fetchCurrentDesigns(db, currentCategories)
    const pieceDoc = await fetchDocByIdFromCloud(CollectionName.pieces, db, id)
    if (!pieceDoc) {
      return Promise.reject(new Error('Piece not found, cannot update'))
    }

    const thisItem = pieceDoc.data()

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
    const updatedPiece = await updateDocByIdInCloud(CollectionName.pieces, db, id, {
      ...pieceInput
    })
    if (!updatedPiece) {
      throw new Error('Failed to update piece')
    }

    return {
      id,
      serialNumber: thisItem.serialNumber,
      designId,
      imageFileNames: pieceInput.imageFileNames,
      collectionId
    }
  }
}
