import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import getConfig from 'next/config'
import ReactMarkdown from 'react-markdown'

import { IParticipantExtended } from '../lib/api'

const { publicRuntimeConfig } = getConfig()

export type InvestigacionProps = {
  student: IParticipantExtended
  maxW: string
}

const Investigacion: React.FC<InvestigacionProps> = ({ student, maxW }) => {
  const { obra } = student

  const { investigacion_titulo, investigacion_abstract } = obra

  return (
    <Box p={['1rem', '1rem', '2rem']} flex="1 0 0" fontSize={['md', 'lg', 'lg']}>
      <Stack maxW={maxW} m="0 auto" spacing="2rem">
        <Heading> {investigacion_titulo} </Heading>
        <Text
          as={ReactMarkdown}
          source={investigacion_abstract}
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
          {student.paperUrl ? (
            <object
              type="application/pdf"
              aria-label={`Investigación de ${student.full_name}`}
              data={`${publicRuntimeConfig.basePath}/papers/${student.paperUrl}`}
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
