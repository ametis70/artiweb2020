import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/core'
import React from 'react'
import { Textfit } from 'react-textfit'

import Container from '../components/Container'
import SEO from '../components/SEO'

const profesores: Array<string> = [
  'Federico Joselevich Puiggrós',
  'Elizabeth Toledo',
  'Nicolas Mata Lastra',
]

const Festival: React.FC = () => {
  return (
    <>
      <SEO title="Festival" />
      <Flex w="100%" direction="row" wrap="wrap">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus
              sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus
              dolor purus non enim praesent elementum facilisis leo, vel fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis
              scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis
            </Text>
            <Text flex="0 0 calc(33.33% - 2rem)" textAlign="justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus
              sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus
              dolor purus non enim praesent elementum facilisis leo, vel fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis
              scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis
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

export default Festival
