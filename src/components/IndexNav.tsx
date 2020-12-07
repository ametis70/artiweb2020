import { Flex, Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

import paths from '../paths'

const IndexNav = () => {
  const Links = paths.map((p) => {
    if (p.path === '/') return null
    return (
      <Link href={p.path} passHref key={p.path}>
        <ChakraLink textTransform="uppercase" fontWeight="700">
          {p.name}
        </ChakraLink>
      </Link>
    )
  })
  return (
    <Flex
      direction="column"
      h="calc(var(--vh, 1h) * 100)"
      align="center"
      justify="center"
      w="100%"
    >
      <Text
        fontSize={['3xl', '3xl', '5xl']}
        textTransform="uppercase"
        fontWeight="700"
        pb="2rem"
        opacity="0.5"
      >
        Artiamañas 2020
      </Text>
      <Stack
        direction={['column', 'column', 'row']}
        spacing="2rem"
        align="center"
        justify="center"
      >
        {Links}
      </Stack>
    </Flex>
  )
}

export default IndexNav
