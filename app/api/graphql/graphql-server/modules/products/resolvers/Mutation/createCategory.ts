/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MutationResolvers } from './../../../types.generated'
import { ProductsHandler } from '../../../../services/products-handler'

export const createCategory: NonNullable<MutationResolvers['createCategory']> = async (_parent, { input }, _ctx) => {
  const productsHandler = new ProductsHandler()
  const newCollection = await productsHandler.createCategory(input)

  return newCollection
}
