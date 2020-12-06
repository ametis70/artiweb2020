import { Box, ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import smoothscroll from 'smoothscroll-polyfill'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

// disable FitText warning
console.warn = () => undefined

import '../styles/typeface-futura.css'
import 'focus-visible/dist/focus-visible'

import theme from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const setDocHeight = () => {
      if (typeof window !== undefined) {
        smoothscroll.polyfill()
      }

      document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
    }

    setDocHeight()
    window.addEventListener('resize', function () {
      setDocHeight()
    })
    window.addEventListener('orientationchange', function () {
      setDocHeight()
    })
  }, [])

  return (
    <ChakraProvider theme={theme} resetCSS>
      <ParallaxProvider>
        <Box minH="calc(var(--vh, 1vh) * 100)">
          <NavBar />
          <Component {...pageProps} />
        </Box>
        <Footer />
      </ParallaxProvider>
    </ChakraProvider>
  )
}

export default App
