import { Flex, Box, Text } from '@chakra-ui/react'

const LiveIndicator = () => {
  return (
    <Flex h="100%" align="center">
      <Flex
        bg="magenta"
        h="2em"
        px="1rem"
        fontSize="lg"
        fontWeight={700}
        textTransform="uppercase"
        align="center"
      >
        <Box bg="#ff0000" borderRadius="50%" w="16px" h="0" pb="16px" mr="1rem" />
        <Text>En Vivo</Text>
      </Flex>
    </Flex>
  )
}

export default LiveIndicator
