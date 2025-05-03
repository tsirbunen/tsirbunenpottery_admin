/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MutationResolvers } from './../../../types.generated'
import { ProductsHandler } from '../../../../services/products-handler'

export const updatePiece: NonNullable<MutationResolvers['updatePiece']> = async (_parent, { id, input }, _ctx) => {
  const productsHandler = new ProductsHandler()
  const newCollection = await productsHandler.updatePiece(id, input)

  return newCollection
}
