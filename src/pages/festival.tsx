import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Textfit } from 'react-textfit'

import Container from '../components/Container'
import SEO from '../components/SEO'
import { getGeneralInfo, login } from '../lib/api'

const profesores: Array<string> = [
  'Federico Joselevich Puiggrós',
  'Elizabeth Toledo',
  'Nicolas Mata Lastra',
]

type FestivalProps = {
  generalInfo: {
    texto_descripcion_columna_1: string
    texto_descripcion_columna_2: string
  }
}

const Festival: React.FC<FestivalProps> = ({ generalInfo }) => {
  const { texto_descripcion_columna_1, texto_descripcion_columna_2 } = generalInfo
  return (
    <>
      <SEO title="Festival" />
      <Flex w="100%" direction="row" wrap="wrap" mt="1rem">
        <Container>
          <Box h="fit-content">
            <Heading
              as={Textfit}
              color="green"
              textAlign="center"
              textTransform="uppercase"
              mode="single"
              lineHeight={0.8}
              forceSingleModeWidth={true}
              max={9999}
            >
              Artimañas
            </Heading>
          </Box>
          <Stack
            direction={['column', 'column', 'row']}
            spacing="1rem"
            justify="space-between"
            padding="1rem"
          >
            <Text flex="0 0 calc(33.33% - 2rem)" textAlign="justify">
              {texto_descripcion_columna_1}
            </Text>
            <Text flex="0 0 calc(33.33% - 2rem)" textAlign="justify">
              {texto_descripcion_columna_2}
            </Text>
            <Flex
              direction="column"
              wrap="wrap"
              flex="0 0 calc(33.33% - 1rem)"
              order={[-1, -1, 0]}
              justify="space-between"
            >
              <Box w="100%" h="fit-content" align-self="flex-start">
                <Heading
                  p="0 1rem"
                  as={Textfit}
                  color="magenta"
                  textAlign="center"
                  lineHeight={0.6}
                  textTransform="uppercase"
                  max={9999}
                  mode="single"
                  forceSingleModeWidth={true}
                  mb="2rem"
                >
                  20
                </Heading>
              </Box>
              <Box textAlign="right" alignSelf="flex-end" mb={['2rem', '2rem', '0']}>
                {profesores.map((p) => (
                  <Heading as="h4" fontSize="lg" m={0} key={p} lineHeight={1.2}>
                    {p}
                  </Heading>
                ))}
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Flex>
    </>
  )
}

export async function getStaticProps() {
  await login()
  const generalInfo = await getGeneralInfo()
  console.log(generalInfo)

  return { props: { generalInfo: generalInfo.data[0] } }
}

export default Festival
