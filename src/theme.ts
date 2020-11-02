import { extendTheme } from '@chakra-ui/core'

const customTheme = extendTheme({
  colors: {
    green: '#99FF00',
    magenta: '#9800BF',
  },
  fonts: {
    body: 'Futura PT, sans-serif',
    heading: 'Futura PT, sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Futura PT, sans-serif',
        bg: 'black',
        color: 'white',
        fontSize: 'xl',
        lineHeight: 'tall',
        overflowX: 'hidden',
        width: '100%',
        minHeight: '100vh',
      },
    },
  },
})

export default customTheme
