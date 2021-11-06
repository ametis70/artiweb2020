import { Box, ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect, useRef, useState } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import smoothscroll from 'smoothscroll-polyfill'

import 'focus-visible/dist/focus-visible'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

// disable FitText warning
console.warn = () => undefined

import theme from '../theme'
import ObrasLayout from '../components/ObrasLayout'
import { getBasePath } from '../lib/util'

const variants: Variants = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    transition: { ease: 'easeOut', duration: 0.5 },
  },
  exit: {
    zIndex: 999,
    position: 'absolute',
    opacity: 0,
    scale: 0,
    y: '-50%',
    transition: { ease: 'easeOut', duration: 0.5 },
  },
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const [previousPath, setPreviousPath] = useState(router.asPath)

  const retainedHome = useRef(null)

  const isHome = router.asPath === '/'

  if (isHome && retainedHome.current === null) {
    retainedHome.current = <Component {...pageProps} />
  }

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

      if (
        typeof window !== undefined &&
        process.env.NODE_ENV === 'production' &&
        process.env.NEXT_PUBLIC_MATOMO_URL
      ) {
        setTimeout(() => {
          const { asPath } = router

          const { _paq } = window as any

          if (previousPath) {
            _paq.push(['setReferrerUrl', `${previousPath}`])
          }
          _paq.push(['setCustomUrl', asPath])
          _paq.push(['setDocumentTitle', document.title])
          _paq.push(['trackPageView'])
          setPreviousPath(asPath)
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

  const obras = router.asPath.includes('/obras')

  return (
    <ChakraProvider theme={theme} resetCSS>
      <style global jsx>{`
@font-face {
  font-family: 'Futura PT';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: local('Futura PT Regular'), url('${getBasePath()}/font/FuturaPTBook.otf') format('opentype'); 
}

/* roboto-700normal - latin */
@font-face {
  font-family: 'Futura PT';
  font-style: normal;
  font-display: swap;
  font-weight: 700;
  src: local('Futura PT Bold'), url('${getBasePath()}/font/FuturaPTBold.otf') format('opentype'); 
      `}</style>
      <ParallaxProvider>
        <Box
          minH="calc(var(--vh, 1vh) * 100)"
          w="100%"
          overflow={['hidden visible', 'hidden visible', 'visible visible']}
          sx={{ scrollbarWidth: 'none' }}
          className="hide-scrollbar"
        >
          <motion.div
            key="home"
            variants={variants}
            initial="initial"
            animate={isHome ? 'enter' : 'exit'}
          >
            {retainedHome.current}
          </motion.div>
          {!isHome ? <NavBar /> : null}
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={obras ? '/obras' : router.route}
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
              style={{ width: '100%' }}
            >
              {obras ? (
                <ObrasLayout>
                  <Component {...pageProps} />
                </ObrasLayout>
              ) : isHome ? null : (
                <Component {...pageProps} />
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
        <Footer />
      </ParallaxProvider>
    </ChakraProvider>
  )
}

export default App
