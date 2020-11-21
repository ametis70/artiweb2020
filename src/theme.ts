import { extendTheme } from '@chakra-ui/react'

const green = '#99ff00'

const customTheme = extendTheme({
  colors: {
    green,
    magenta: '#9800BF',
  },
  fonts: {
    body: 'Futura PT, sans-serif',
    heading: 'Futura PT, sans-serif',
  },
  styles: {
    global: {
      '.headroom': {
        zIndex: '99 !important',
      },
      'html, body': {
        fontFamily: 'Futura PT, sans-serif',
        bg: 'black',
        color: 'white',
        fontSize: 'xl',
        lineHeight: 'tall',
        width: '100%',
        minHeight: '100vh',
      },
      '.enable-scroll': {
        overflow: 'hidden auto',
      },
      '.lock-scroll': {
        overflow: 'hidden !important',
      },
      '*': {
        scrollbarWidth: 'auto',
        scrollbarColor: `${green} black`,
      },

      '*::-webkit-scrollbar': {
        width: '20px',
      },
      '*::-webkit-scrollbar-track': {
        background: 'orange',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'green',
        borderRadius: '20px',
        border: '5px solid black',
      },
    },
  },
})

export default customTheme
