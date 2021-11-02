import { Flex, Text } from '@chakra-ui/react'
import { NextPage } from 'next'

const ObrasIndex: NextPage = () => (
  <Flex key="select_obra" w="100%" align="center" justify="center" p="2rem">
    <Text display={['none', 'none', 'block']}>
      Seleccioná un· alumn· a la izquierda para ver su obra
    </Text>
    <Text pt="50%" display={['block', 'block', 'none']}>
      Seleccioná un· alumn· arriba para ver su obra
    </Text>
  </Flex>
)

export default ObrasIndex
