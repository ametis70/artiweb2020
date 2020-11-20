import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { ParallaxProvider } from 'react-scroll-parallax'
import Footer from '../components/Footer'

// disable FitText warning
console.warn = () => undefined

import '../styles/typeface-futura.css'

import theme from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <ParallaxProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ParallaxProvider>
    </ChakraProvider>
  )
}

export default App
