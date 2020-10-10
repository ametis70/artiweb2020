import {
  ChakraProvider,
} from "@chakra-ui/core"

// disable FitText warning
console.warn = () => {}

import theme from '../theme'

import '../styles/typeface-futura.css'

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
