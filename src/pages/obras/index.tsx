import { Flex, Text } from '@chakra-ui/react'
import { NextPage } from 'next'

const ObrasIndex: NextPage = () => (
  <Flex key="select_obra" w="100%" align="center" justify="center" p="2rem">
    <Text display={['none', 'none', 'block']}>Seleccioná una obra a la izquierda</Text>
    <Text pt="50%" display={['block', 'block', 'none']}>
      Seleccioná una obra arriba
    </Text>
  </Flex>
)

export default ObrasIndex
