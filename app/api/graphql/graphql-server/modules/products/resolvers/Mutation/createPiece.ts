/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MutationResolvers } from './../../../types.generated'
import { ProductsHandler } from '../../../../services/products-handler'

export const createPiece: NonNullable<MutationResolvers['createPiece']> = async (_parent, { input }, _ctx) => {
  const productsHandler = new ProductsHandler()
  const newCollection = await productsHandler.createPiece(input)

  return newCollection
}
