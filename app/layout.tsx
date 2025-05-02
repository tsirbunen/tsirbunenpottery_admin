import ClientGraphQLProviderDynamic from '@/ui/api-service/client/GraphQLClientProviderDynamic'
import MainAppLayout from '@/ui/components/MainAppLayout'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tsirbunen Pottery Admin',
  description: 'Admin control panel for Tsirbunen Pottery website products'
}

/**
 * A required top level element that enables modification of the initial HTML returned
 * from the server. Here the app components are wrapped with providers common to all
 * components. We need to wait for the window to be available to be able to return
 * our app with all the providers.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // biome-ignore lint/suspicious/useValidTypeof: Needs to be like this
  if (typeof window === undefined) {
    return <div>LOADING...</div>
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientGraphQLProviderDynamic>
          <MainAppLayout>{children}</MainAppLayout>
        </ClientGraphQLProviderDynamic>
      </body>
    </html>
  )
}
