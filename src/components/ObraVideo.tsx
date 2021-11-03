import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import ReactPlayer from 'react-player'

import type { ObraComponentProps } from './Obra'

const ObraVideo: React.FC<ObraComponentProps> = ({ obra, maxW }) => {
  const { video_links, video_titles } = obra
  const alumnes = obra.alumnes

  const links = video_links.split(',')

  const titles =
    alumnes.length === 1
      ? `Presentación de ${alumnes[0].nombre} ${alumnes[0].apellido}`
      : video_titles.split(',')

  return (
    <>
      {links.map((link, i) => (
        <Box
          key={link}
          p={['1rem', '1rem', '2rem']}
          flex="1 0 0"
          fontSize={['md', 'lg', 'lg']}
        >
          <Stack maxW={maxW} m="0 auto" spacing="2rem">
            <Heading> {typeof titles === 'string' ? titles : titles[i]} </Heading>
            <Flex mt="3rem" align="center" justify="center">
              <ReactPlayer pip url={link} />
            </Flex>
          </Stack>
        </Box>
      ))}
    </>
  )
}

export default ObraVideo
