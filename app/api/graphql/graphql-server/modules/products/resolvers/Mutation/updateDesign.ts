/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MutationResolvers } from './../../../types.generated'
import { ProductsHandler } from '../../../../services/products-handler'

export const updateDesign: NonNullable<MutationResolvers['updateDesign']> = async (_parent, { id, input }, _ctx) => {
  const productsHandler = new ProductsHandler()
  const newCollection = await productsHandler.updateDesign(id, input)

  return newCollection
}
