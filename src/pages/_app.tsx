import { ChakraProvider } from '@chakra-ui/core'
import { AppProps } from 'next/app'
import React from 'react'

// disable FitText warning
console.warn = () => undefined

import '../styles/typeface-futura.css'

import theme from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
