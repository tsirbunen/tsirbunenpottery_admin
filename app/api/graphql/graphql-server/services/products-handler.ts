import admin from 'firebase-admin'
import { Category, Collection, Design, Piece, ProductsData } from '../modules/types.generated'

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

if (!projectId || !clientEmail || !privateKey) {
  throw new Error('Firebase credentials are not set in the environment variables.')
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    })
  })
}

export const db = admin.firestore()

export enum CollectionName {
  collections = 'collections',
  categories = 'categories',
  designs = 'designs',
  pieces = 'pieces'
}

type Doc = admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData, admin.firestore.DocumentData>

export class ProductsHandler {
  async fetchAllProducts(): Promise<ProductsData> {
    const products: ProductsData = {
      [CollectionName.collections]: [],
      [CollectionName.categories]: [],
      [CollectionName.designs]: [],
      [CollectionName.pieces]: []
    }

    const collectionDocs = await this.fetchCollectionDocs(CollectionName.collections)
    products[CollectionName.collections] = this.toCollections(collectionDocs)

    const categoryDocs = await this.fetchCollectionDocs(CollectionName.categories)
    products[CollectionName.categories] = this.toCategories(categoryDocs)

    const designDocs = await this.fetchCollectionDocs(CollectionName.designs)
    products[CollectionName.designs] = this.toDesigns(designDocs, products[CollectionName.categories] as Category[])

    const pieceDocs = await this.fetchCollectionDocs(CollectionName.pieces)
    products[CollectionName.pieces] = this.toPieces(
      pieceDocs,
      products[CollectionName.collections] as Collection[],
      products[CollectionName.designs] as Design[]
    )

    return products
  }

  async fetchCollectionDocs(collectionName: CollectionName): Promise<Doc[]> {
    const snapshot = await db.collection(collectionName).get()
    const docs = snapshot.docs
    return docs
  }

  toCollections(docs: Doc[]): Collection[] {
    return docs.map((doc) => {
      const data = doc.data()
      return { id: doc.id, names: data.names } as Collection
    })
  }

  toCategories(docs: Doc[]): Category[] {
    return docs.map((doc) => {
      const data = doc.data()
      return { id: doc.id, names: data.names } as Category
    })
  }

  toDesigns(docs: Doc[], categories: Category[]): Design[] {
    return docs.map((doc) => {
      const data = doc.data()
      const categoryIds: string[] = []
      data.categoryIds.forEach((catRef: admin.firestore.DocumentReference) => {
        const existingCategory = categories.find((cat) => cat.id === catRef.id)
        if (existingCategory) {
          categoryIds.push(catRef.id)
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

  toPieces(docs: Doc[], collections: Collection[], designs: Design[]): Piece[] {
    return docs.map((doc) => {
      const data = doc.data()

      const designIdRef = data.designId
      const designId = designIdRef
        ? designs.find((design) => design.id === (designIdRef as admin.firestore.DocumentReference).id)?.id
        : null

      const collectionRef = data.collectionId
      const collectionId = collectionRef
        ? collections.find((collection) => collection.id === (collectionRef as admin.firestore.DocumentReference).id)
            ?.id
        : null

      return {
        id: doc.id,
        serialNumber: data.serialNumber,
        designId,
        imageFileNames: data.imageFileNames,
        collectionId
      } as Piece
    })
  }
}
