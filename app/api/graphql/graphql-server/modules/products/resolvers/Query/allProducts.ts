import { ProductsHandler } from '../../../../services/products-handler'
import type { QueryResolvers } from '../../../types.generated'

//FIXME: Figure out why the eslint rules not not silence these errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const allProducts: NonNullable<QueryResolvers['allProducts']> = async (_parent, _arg, _ctx) => {
  const productsHandler = new ProductsHandler()
  const allProducts = await productsHandler.fetchAllProducts()

  return allProducts
}
