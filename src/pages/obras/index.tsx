import { Flex, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import SEO from '../../components/SEO'

const ObrasIndex: NextPage = () => (
  <>
    <SEO
      title="Obras"
      description="Seleccioná une alumne para ver su obra. También podes ver las video-defensas y las investigaciones que llevaron a cabo"
    />
    <Flex key="select_obra" w="100%" align="center" justify="center" p="2rem">
      <Text textAlign="center" pt={['30%', '30%', 0]}>
        Seleccioná un· alumn· para ver su obra
      </Text>
    </Flex>
  </>
)

export default ObrasIndex
