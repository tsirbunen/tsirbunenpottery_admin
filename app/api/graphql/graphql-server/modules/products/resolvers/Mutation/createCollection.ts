/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MutationResolvers } from './../../../types.generated'
import { ProductsHandler } from '../../../../services/products-handler'

// FIXME: Figure out why the eslint rules do not silence these errors
export const createCollection: NonNullable<MutationResolvers['createCollection']> = async (
  _parent,
  { input },
  _ctx
) => {
  const productsHandler = new ProductsHandler()
  const newCollection = await productsHandler.createCollection(input)

  return newCollection
}
