import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import ReactPlayer from 'react-player'

import type { ObraComponentProps } from './Obra'

const ObraVideo: React.FC<ObraComponentProps> = ({ student, secondStudent, maxW }) => {
  const { obra } = student

  const { video_link } = obra

  return (
    <>
      <Box p={['1rem', '1rem', '2rem']} flex="1 0 0" fontSize={['md', 'lg', 'lg']}>
        <Stack maxW={maxW} m="0 auto" spacing="2rem">
          <Heading> Presentación de {student.full_name}</Heading>
          <Flex mt="3rem" align="center" justify="center">
            <ReactPlayer pip url={video_link} />
          </Flex>
        </Stack>
      </Box>
      {secondStudent ? (
        <Box p={['1rem', '1rem', '2rem']} flex="1 0 0" fontSize={['md', 'lg', 'lg']}>
          <Stack maxW={maxW} m="0 auto" spacing="2rem">
            <Heading> Presentación de {secondStudent.full_name}</Heading>
            <Flex mt="3rem" align="center" justify="center">
              <ReactPlayer pip url={obra.video2_link} />
            </Flex>
          </Stack>
        </Box>
      ) : null}
    </>
  )
}

export default ObraVideo
