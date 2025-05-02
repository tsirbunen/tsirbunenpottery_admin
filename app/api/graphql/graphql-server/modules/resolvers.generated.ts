/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { pingProducts as Query_pingProducts } from './products/resolvers/Query/pingProducts';
import    { pingQuery as Query_pingQuery } from './query/resolvers/Query/pingQuery';
import    { pingMutation as Mutation_pingMutation } from './mutation/resolvers/Mutation/pingMutation';
    export const resolvers: Resolvers = {
      Query: { pingProducts: Query_pingProducts,pingQuery: Query_pingQuery },
      Mutation: { pingMutation: Mutation_pingMutation },
      
      
    }