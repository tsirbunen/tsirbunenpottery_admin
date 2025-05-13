'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const GraphQLClientProvider = dynamic(() => import('@/ui/api-service/client/GraphQLClientProvider'), { ssr: false })

export default function ClientGraphQLProviderDynamic({ children }: { children: ReactNode }) {
  console.log('%c<ClientGraphQLProviderDynamic> rendered', 'color: purple')
  return <GraphQLClientProvider>{children}</GraphQLClientProvider>
}
