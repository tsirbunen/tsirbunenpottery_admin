/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MutationResolvers } from './../../../types.generated'
import { ProductsHandler } from '../../../../services/products-handler'

// FIXME: Figure out why the eslint rules do not silence these errors
export const updateCollection: NonNullable<MutationResolvers['updateCollection']> = async (
  _parent,
  { input, id },
  _ctx
) => {
  const productsHandler = new ProductsHandler()
  const newCollection = await productsHandler.updateCollection(id, input)

  return newCollection
}
