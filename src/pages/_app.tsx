import { ChakraProvider } from '@chakra-ui/core'
import { AppProps } from 'next/app'
import NavBar from '../components/NavBar'

// disable FitText warning
console.warn = () => undefined

import '../styles/typeface-futura.css'

import theme from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <NavBar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
