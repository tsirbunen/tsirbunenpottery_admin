import * as dotenv from 'dotenv'
dotenv.config()

import { GraphQLJSON } from 'graphql-scalars'
import { createSchema, createYoga } from 'graphql-yoga'
import { resolvers } from './graphql-server/modules/resolvers.generated'
import { typeDefs } from './graphql-server/modules/typeDefs.generated'

const wrapSchemaWithDirectives = () => {
  const graphQLSchema = createSchema({ typeDefs, resolvers: { ...resolvers, JSON: GraphQLJSON } })
  return graphQLSchema
}

const { handleRequest } = createYoga({
  schema: wrapSchemaWithDirectives(),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response }
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
