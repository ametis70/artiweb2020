import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { getBasePath } from '../lib/util'
import { ObrasPageObra } from '../pages/obras/[slug]'

export type InvestigacionProps = {
  obra: ObrasPageObra
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
              data={`${getBasePath()}/cms/papers/${investigacion_archivo}`}
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
