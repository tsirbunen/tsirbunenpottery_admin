'use client'

import { ChakraProvider, createSystem, defaultBaseConfig, defineConfig } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { Shades } from './shades'

const customConfig = defineConfig({
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
      backgroundColor: Shades.BACKGROUND,
      color: Shades.DARK
    }
  }
})

export const system = createSystem(defaultBaseConfig, customConfig)

function AppThemeProvider(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default AppThemeProvider
