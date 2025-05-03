/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MutationResolvers } from './../../../types.generated'
import { ProductsHandler } from '../../../../services/products-handler'

export const createDesign: NonNullable<MutationResolvers['createDesign']> = async (_parent, { input }, _ctx) => {
  const productsHandler = new ProductsHandler()
  const newCollection = await productsHandler.createDesign(input)

  return newCollection
}
