import { Box, ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import smoothscroll from 'smoothscroll-polyfill'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

// disable FitText warning
console.warn = () => undefined

import '../styles/typeface-futura.css'
import 'focus-visible/dist/focus-visible'

import theme from '../theme'

const variants = {
  initial: { opacity: 0, x: '100%' },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    transition: { ease: 'easeOut', duration: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: '-50%',
    transition: { ease: 'easeOut', duration: 0.3 },
  },
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const [previousPath, setPreviousPath] = useState(router.pathname)

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

      if (typeof window !== undefined) {
        setTimeout(() => {
          const { pathname } = router

          const { _paq } = window as any

          if (previousPath) {
            _paq.push(['setReferrerUrl', `${previousPath}`])
          }
          _paq.push(['setCustomUrl', pathname])
          _paq.push(['setDocumentTitle', document.title])
          _paq.push(['trackPageView'])
          setPreviousPath(pathname)
        }, 0)
      }
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
        <Box
          minH="calc(var(--vh, 1vh) * 100)"
          w="100%"
          overflow={['hidden visible', 'visible', 'visible']}
        >
          {router.pathname !== '/' ? <NavBar /> : null}
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.pathname}
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
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
