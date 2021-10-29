import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { Textfit } from 'react-textfit'

import Container from '../components/Container'
import FestivalVideo from '../components/FestivalVideo'
import SEO from '../components/SEO'
import { GeneralInfoType, getGeneralInfo, login } from '../lib/api'

const profesores: Array<string> = [
  'Federico Joselevich Puiggrós',
  'Elizabeth Toledo',
  'Nicolas Mata Lastra',
]

const Festival: React.FC<GeneralInfoType> = ({
  texto_descripcion_columna_1,
  texto_descripcion_columna_2,
  video_apertura_titulo,
  video_apertura,
  video_cierre,
  video_cierre_titulo,
}) => {
  const aperturaRef = useRef<HTMLDivElement>(null)
  const cierreRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (router.query.video) {
      if (router.query.video === 'apertura' && aperturaRef.current) {
        window.scroll({
          top: aperturaRef.current.offsetTop,
          behavior: 'smooth',
        })
      }
      if (router.query.video === 'cierre' && cierreRef.current) {
        window.scroll({
          top: cierreRef.current.offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }, [aperturaRef, aperturaRef.current, cierreRef, cierreRef.current, router.query.video])

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
            mb="4rem"
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

          <FestivalVideo
            heading={video_apertura_titulo}
            url={video_apertura}
            ref={aperturaRef}
          />
          <FestivalVideo
            heading={video_cierre_titulo}
            url={video_cierre}
            ref={cierreRef}
          />
        </Container>
      </Flex>
    </>
  )
}

export async function getStaticProps() {
  await login()
  const generalInfo = await getGeneralInfo()

  console.log(generalInfo)

  return { props: { ...generalInfo.data } }
}

export default Festival
