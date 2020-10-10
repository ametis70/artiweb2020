import React from 'react'
import { Box } from '@chakra-ui/core'

const Container: React.FC = ({children}) => (
  <Box w="1170px" p="1rem" m="0 auto">
    {children}
  </Box>
)

export default Container

