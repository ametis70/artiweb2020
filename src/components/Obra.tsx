import { Box, Flex, Heading, Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

import { ObrasPageObra } from '../pages/obras/[slug]'
import ResponsiveImage from './ResponsiveImage'

export type ObraComponentProps = {
  obra: ObrasPageObra
  maxW: string
}

const getLinkText = (obra: ObrasPageObra): string => {
  switch (obra.tipo_contenido_personalizado) {
    case 'external':
      return 'Continuar a sitio externo'

    case 'video':
      return 'Ver Video'

    case 'downloadable':
      return 'Continuar a descarga'

    default:
      return 'Tipo de link no identificado'
  }
}

const Obra: React.FC<ObraComponentProps> = ({ obra, maxW }) => {
  return (
    <Box p={['1rem', '1rem', '2rem']} flex="1 0 0" fontSize={['md', 'lg', 'lg']}>
      <Stack maxW={maxW} m="0 auto" spacing="2rem">
        {/*
        <ResponsiveImage
          w="100%"
          h="0"
          pb="37.5%"
          overflow="hidden"
          maxH="300px"
          url={student.bannerUrl ? `banners/${student.bannerUrl}` : null}
          alt={`Imagen de banner de ${obra.titulo}`}
        />
        */}
        <Box>
          <Heading> {obra.titulo} </Heading>
          <Text
            as="small"
            color="gray.500"
            sx={{
              '& a': {
                color: 'gray.300',
              },
            }}
          >
            Obra realizada por{' '}
            {obra.alumnes.map((alumne, i) => (
              <span key={alumne.slug}>
                <Link href={`/alumnes?alumne=${alumne.slug}`} passHref>
                  <ChakraLink>
                    {alumne.nombre} {alumne.apellido}
                  </ChakraLink>
                </Link>
                {i < obra.alumnes.length - 1 ? ' y ' : ''}
              </span>
            ))}
          </Text>
          {obra.alumnes[0].carrera !== 'multimedia' ? (
            <Text as="small" color="gray.500">
              {' '}
              — Obra invitada
            </Text>
          ) : null}
        </Box>
        <Text
          as={ReactMarkdown}
          children={obra.descripcion}
          sx={{
            '& p': {
              pb: '2rem',
            },
          }}
        />
        <ChakraLink href={obra.link_contenido_personalizado} isExternal>
          <Flex w="100%" py="1rem" bg="magenta" justify="center">
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              textAlign="center"
              px="2rem"
            >
              {getLinkText(obra)}
            </Text>
          </Flex>
        </ChakraLink>
        <Text
          as={ReactMarkdown}
          children={obra.ayuda_contenido_personalizado}
          color="gray.500"
          fontSize="md"
          textAlign="center"
          sx={{
            '& a': {
              color: 'gray.300',
            },
          }}
        />
      </Stack>
    </Box>
  )
}

export default Obra
