import { Box } from '@chakra-ui/core'
import React from 'react'

const Container: React.FC = ({ children }) => (
  <Box maxW={['100vw', '100vw', '1170px']} p="1rem" m="0 auto">
    {children}
  </Box>
)

export default Container
