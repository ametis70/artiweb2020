import { Link as ChakraLink, Stack } from '@chakra-ui/react'
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
    <Stack
      direction={['column', 'column', 'row']}
      spacing={['1rem', '1rem', '2rem']}
      align="center"
      justify="center"
    >
      {Links}
    </Stack>
  )
}

export default IndexNav
