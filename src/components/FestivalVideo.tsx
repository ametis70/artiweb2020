import { forwardRef } from 'react'
import { Heading, Box, Flex } from '@chakra-ui/react'
import ReactPlayer from 'react-player'

type FestivalVideoProps = {
  heading: string
  url: string
}

const FestivalVideo = forwardRef<HTMLDivElement, FestivalVideoProps>(
  ({ heading, url }, ref) => {
    return (
      <Box pb="2rem">
        <Heading
          ref={ref}
          as="h3"
          textAlign={['center', 'center', 'left']}
          fontSize={['2xl', '2xl', '4xl']}
        >
          {heading}
        </Heading>
        <Box maxW="100%" m="0 auto" p="1rem">
          <Flex mt="3rem" align="center" justify="center">
            <ReactPlayer pip url={url} />
          </Flex>
        </Box>
      </Box>
    )
  },
)

export default FestivalVideo
