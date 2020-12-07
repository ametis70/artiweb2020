import { Box, ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import smoothscroll from 'smoothscroll-polyfill'

import NProgress from 'nprogress'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

// disable FitText warning
console.warn = () => undefined

import '../styles/typeface-futura.css'
import 'focus-visible/dist/focus-visible'

import theme from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== undefined) {
      smoothscroll.polyfill()
    }

    const setDocHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
    }

    const load = () => {
      NProgress.start()
    }
    const stop = () => {
      NProgress.done()
    }
    router.events.on('routeChangeStart', load)
    router.events.on('routeChangeComplete', stop)
    router.events.on('routeChangeError', stop)

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
        <Box minH="calc(var(--vh, 1vh) * 100)" w="100%" overflow="hidden">
          {router.pathname !== '/' ? <NavBar /> : null}
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.pathname}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0, y: '-50%' }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
              style={{ width: '100%' }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Box>
        <Footer />
      </ParallaxProvider>
    </ChakraProvider>
  )
}

export default App
