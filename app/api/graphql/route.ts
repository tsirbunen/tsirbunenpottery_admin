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

// Custom plugin to mask the stack trace in original error
const maskStackTracePlugin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResultProcess({ result }: { result: { errors?: Array<{ extensions?: any }> } }) {
    if (Array.isArray(result.errors)) {
      result.errors = result.errors.map((err) => {
        console.error(`Original error: ${err.extensions?.originalError?.message}`)

        const extensions = {
          ...err.extensions,
          originalError: {
            ...err.extensions?.originalError,
            stack: 'Stack not available in production'
          }
        }

        return { ...err, extensions }
      })
    }
  }
}

const { handleRequest } = createYoga({
  schema: wrapSchemaWithDirectives(),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  plugins: [maskStackTracePlugin]
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
