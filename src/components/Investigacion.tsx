import { Box, Flex, Heading, Stack, Text, Link as ChakraLink } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { getBasePath } from '../lib/util'
import { ObrasPageObra } from '../pages/obras/[slug]'
import useMobileDetect from 'use-mobile-detect-hook'

export type InvestigacionProps = {
  obra: ObrasPageObra
  maxW: string
}

const Investigacion: React.FC<InvestigacionProps> = ({ obra, maxW }) => {
  const { investigacion_titulo, investigacion_abstract, investigacion_archivo } = obra
  const { isMobile } = useMobileDetect()

  const link = `${getBasePath()}/cms/papers/${investigacion_archivo}`

  return (
    <Box p={['1rem', '1rem', '2rem']} flex="1 0 0" fontSize={['md', 'lg', 'lg']}>
      <Stack maxW={maxW} m="0 auto" spacing="2rem">
        <Heading> {investigacion_titulo} </Heading>

        <Text
          as={ReactMarkdown}
          children={investigacion_abstract}
          sx={{
            '& p': {
              pb: '2rem',
            },
          }}
        />
        <Box
          w="100%"
          m="0 auto"
          position="relative"
          display="block"
          h={`calc(${maxW} * 1.41)`}
          overflow="hidden"
        >
          {!isMobile() ? (
            <object
              type="application/pdf"
              aria-label={`Investigación de ${obra.alumnes[0].nombre} ${obra.alumnes[0].apellido}`}
              data={link}
              width="100%"
              height="100%"
            />
          ) : null}
        </Box>
        <ChakraLink href={link} isExternal target="_blank">
          <Flex w="100%" py="1rem" bg="magenta" justify="center">
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              textAlign="center"
              px="2rem"
            >
              Descargar PDF
            </Text>
          </Flex>
        </ChakraLink>
      </Stack>
    </Box>
  )
}

export default Investigacion
