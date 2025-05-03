/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { allProducts as Query_allProducts } from './products/resolvers/Query/allProducts';
import    { pingQuery as Query_pingQuery } from './query/resolvers/Query/pingQuery';
import    { createCategory as Mutation_createCategory } from './products/resolvers/Mutation/createCategory';
import    { createCollection as Mutation_createCollection } from './products/resolvers/Mutation/createCollection';
import    { createDesign as Mutation_createDesign } from './products/resolvers/Mutation/createDesign';
import    { createPiece as Mutation_createPiece } from './products/resolvers/Mutation/createPiece';
import    { pingMutation as Mutation_pingMutation } from './mutation/resolvers/Mutation/pingMutation';
import    { updateCategory as Mutation_updateCategory } from './products/resolvers/Mutation/updateCategory';
import    { updateCollection as Mutation_updateCollection } from './products/resolvers/Mutation/updateCollection';
import    { updateDesign as Mutation_updateDesign } from './products/resolvers/Mutation/updateDesign';
import    { updatePiece as Mutation_updatePiece } from './products/resolvers/Mutation/updatePiece';
import    { Category } from './products/resolvers/Category';
import    { Collection } from './products/resolvers/Collection';
import    { Design } from './products/resolvers/Design';
import    { Piece } from './products/resolvers/Piece';
import    { ProductsData } from './products/resolvers/ProductsData';
import    { JSONResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { allProducts: Query_allProducts,pingQuery: Query_pingQuery },
      Mutation: { createCategory: Mutation_createCategory,createCollection: Mutation_createCollection,createDesign: Mutation_createDesign,createPiece: Mutation_createPiece,pingMutation: Mutation_pingMutation,updateCategory: Mutation_updateCategory,updateCollection: Mutation_updateCollection,updateDesign: Mutation_updateDesign,updatePiece: Mutation_updatePiece },
      
      Category: Category,
Collection: Collection,
Design: Design,
Piece: Piece,
ProductsData: ProductsData,
JSON: JSONResolver
    }