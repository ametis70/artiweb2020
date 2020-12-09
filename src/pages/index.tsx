import IndexNav from '../components/IndexNav'
import { Flex, Text, Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import SEO from '../components/SEO'
import { getAllParticipantsExtended, IParticipantExtended, login } from '../lib/api'

const Hero = dynamic(() => import('../components/Hero'), { ssr: false })

const Home: React.FC<{ students: IParticipantExtended[] }> = ({ students }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      w="100%"
      bg="magenta"
      minH="calc(var(--vh, 1vh) * 100)"
    >
      <Text
        fontSize={['3xl', '3xl', '5xl']}
        textTransform="uppercase"
        fontWeight="700"
        opacity="0.5"
        py="0.5rem"
      >
        Artimañas 2020
      </Text>
      <IndexNav />
      <Box w="100%" overflow="hidden" position="relative" h="100%" alignSelf="stretch">
        <Hero students={students} />
      </Box>
    </Flex>
  )
}

// <Text position="absolute" textAlign="center" zIndex="0" pt="1rem" w="100%">
//   Cargando
// </Text>

export default Home

export async function getStaticProps() {
  await login()

  const students = await getAllParticipantsExtended()

  return { props: { students } }
}
