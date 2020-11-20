import { Box, Flex, Heading, Text } from '@chakra-ui/react'

import students from '../students'
import Container from './Container'

const AlumnesBios: React.FC = () => {
  return (
    <Container>
      <Flex direction="row" wrap="wrap" w="100%" pt="2rem">
        {students.map((student) => {
          return (
            <Flex
              w="calc(33.33% - 2rem)"
              mx="1rem"
              direction="column"
              wrap="nowrap"
              key="student"
              pb="4rem"
            >
              <Flex direction="row" wrap="nowrap" align="flex-start" mb="2rem">
                <Box bg="magenta" borderRadius="50%" flex="0 0 30%" pt="30%" mr="1rem" />
                <Heading fontSize="xl" flex="0 0 calc(70% - 1rem)">
                  {student}
                </Heading>
              </Flex>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus
                sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus
                dolor purus non enim praesent elementum facilisis leo, vel fringilla est
                ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis
                scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu
                volutpat odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna,
              </Text>
            </Flex>
          )
        })}
      </Flex>
    </Container>
  )
}

export default AlumnesBios
