import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/core'
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
      <SEO title="Alumnes" />
      <Flex w="100%" minH="100vh" direction="column" wrap="nowrap">
        <Container>
          <Box flex="0 0 100%">
            <Heading
              as={Textfit}
              color="green"
              textAlign="center"
              textTransform="uppercase"
              mode="single"
              forceSingleModeWidth={true}
              max={9999}
            >
              Artimañas
            </Heading>
          </Box>
          <HStack spacing="1rem" align="stretch" justify="space-between">
            <Text flex="0 0 calc(33.33% - 1rem)" textAlign="justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus
              sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus
              dolor purus non enim praesent elementum facilisis leo, vel fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis
              scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis
            </Text>
            <Text flex="0 0 calc(33.33% - 1rem)" textAlign="justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus
              sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus
              dolor purus non enim praesent elementum facilisis leo, vel fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis
              scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis
            </Text>
            <Flex direction="row" wrap="wrap" flex="0 0 calc(33.33% - 1rem)">
              <Box flex="0 0 100%" h="fit-content" align-self="flex-start">
                <Heading
                  as={Textfit}
                  color="magenta"
                  textAlign="center"
                  lineHeight={0.8}
                  textTransform="uppercase"
                  max={9999}
                  mode="single"
                  forceSingleModeWidth={true}
                >
                  20
                </Heading>
              </Box>
              <Box textAlign="right" alignSelf="flex-end">
                {profesores.map((p) => (
                  <Heading as="h4" fontSize="lg" m={0} key={p}>
                    {p}
                  </Heading>
                ))}
              </Box>
            </Flex>
          </HStack>
        </Container>
      </Flex>
    </>
  )
}

export default Festival
