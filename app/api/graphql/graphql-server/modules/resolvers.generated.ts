/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { allProducts as Query_allProducts } from './products/resolvers/Query/allProducts';
import    { pingQuery as Query_pingQuery } from './query/resolvers/Query/pingQuery';
import    { pingMutation as Mutation_pingMutation } from './mutation/resolvers/Mutation/pingMutation';
import    { Category } from './products/resolvers/Category';
import    { Collection } from './products/resolvers/Collection';
import    { Design } from './products/resolvers/Design';
import    { Piece } from './products/resolvers/Piece';
import    { ProductsData } from './products/resolvers/ProductsData';
import    { JSONResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { allProducts: Query_allProducts,pingQuery: Query_pingQuery },
      Mutation: { pingMutation: Mutation_pingMutation },
      
      Category: Category,
Collection: Collection,
Design: Design,
Piece: Piece,
ProductsData: ProductsData,
JSON: JSONResolver
    }