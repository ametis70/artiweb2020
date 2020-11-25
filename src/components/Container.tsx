import { Box } from '@chakra-ui/react'
import React from 'react'

const Container: React.FC = ({ children }) => (
  <Box maxW={['100vw', '100vw', '1600px']} p="1rem" m="0 auto">
    {children}
  </Box>
)

export default Container
