import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import getConfig from 'next/config'
import ReactMarkdown from 'react-markdown'

import { Obra } from '../lib/api'

const { publicRuntimeConfig } = getConfig()

export type InvestigacionProps = {
  obra: Obra
  maxW: string
}

const Investigacion: React.FC<InvestigacionProps> = ({ obra, maxW }) => {
  const { investigacion_titulo, investigacion_abstract, investigacion_archivo } = obra

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
          {investigacion_archivo ? (
            <object
              type="application/pdf"
              aria-label={`Investigación de ${obra.alumnes[0].nombre} ${obra.alumnes[0].apellido}`}
              data={`${publicRuntimeConfig.basePath}/papers/${investigacion_archivo}`}
              width="100%"
              height="100%"
            />
          ) : null}
        </Box>
      </Stack>
    </Box>
  )
}

export default Investigacion
