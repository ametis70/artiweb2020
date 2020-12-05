import { Flex, Heading, Text, Stack, Box } from '@chakra-ui/react'

import ReactPlayer from 'react-player'

import type { InvestigacionProps } from './Investigacion'

const ObraVideo: React.FC<InvestigacionProps> = ({ student, maxW }) => {
  const { obra } = student

  const { video_link } = obra

  return (
    <Box p={['1rem', '1rem', '2rem']} flex="1 0 0" fontSize={['md', 'lg', 'lg']}>
      <Stack maxW={maxW} m="0 auto" spacing="2rem">
        <Heading> Presentación por {student.full_name}</Heading>
        <Flex mt="3rem" align="center" justify="center">
          <ReactPlayer pip url={video_link} />
        </Flex>
      </Stack>
    </Box>
  )
}

export default ObraVideo
