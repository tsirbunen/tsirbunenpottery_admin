'use client'

import { useHydrationGuard } from '@/ui/utils/useHydrationGuard'
import { ApolloClient, HttpLink, InMemoryCache, type NormalizedCacheObject } from '@apollo/client'
import { createContext, useState } from 'react'

export type GraphQLClient = {
  client: ApolloClient<NormalizedCacheObject>
}

const URI = process.env.NEXT_PUBLIC_API_URI_LOCAL

const getClient = () => {
  const graphqlClient = new ApolloClient({
    link: new HttpLink({
      uri: URI,
      fetchOptions: { cache: 'no-store' }
    }),
    cache: new InMemoryCache()
  })

  return graphqlClient
}

export const GraphQLClientContext = createContext<GraphQLClient>({} as GraphQLClient)

function GraphQLClientProvider({ children }: React.PropsWithChildren) {
  const [graphqlClient] = useState(getClient())
  // Note: We need a hydration guard to prevent re-renders
  const isMounted = useHydrationGuard()

  if (!isMounted) return null
  return <GraphQLClientContext.Provider value={{ client: graphqlClient }}>{children}</GraphQLClientContext.Provider>
}

export default GraphQLClientProvider
