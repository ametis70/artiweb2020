import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Link as ChakraLink,
  Spacer,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { AlumnesProps } from '../pages/alumnes'
import Container from './Container'

const AlumnesBios: React.FC<AlumnesProps> = ({ students, bios }) => {
  const router = useRouter()

  const releaseFocus = () => {
    router.push('/alumnes', undefined, { shallow: true })
  }

  const keyboardReleaseFocus = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && router.query.alumne) releaseFocus()
  }

  useEffect(() => {
    window.addEventListener('keyup', keyboardReleaseFocus)
    return () => {
      window.removeEventListener('keyup', keyboardReleaseFocus)
    }
  }, [router.query.alumne])

  const getOpacity = (studentSlug: string): number => {
    if (!router.query.alumne) {
      return 1
    }

    if (router.query.alumne === studentSlug) {
      return 1
    } else {
      return 0.4
    }
  }

  return (
    <Container>
      <Flex direction="row" wrap="wrap" w="100%" pt="2rem">
        {students.map((student) => {
          const bio = bios.find((b) => b.user == student.id)

          return (
            <Flex
              w="calc(33.33% - 2rem)"
              mx="1rem"
              direction="column"
              wrap="nowrap"
              key={student.slug}
              id={student.slug}
              pb="2rem"
              pt="2rem"
              opacity={getOpacity(student.slug)}
              transition="opacity 0.3s ease"
            >
              <CloseButton
                visibility={router.query.alumne === student.slug ? 'visible' : 'hidden'}
                alignSelf="flex-end"
                color="white"
                size="lg"
                onClick={() => releaseFocus()}
              />
              <Flex direction="row" wrap="nowrap" align="flex-start" mb="2rem">
                <Box
                  bg={'magenta'}
                  borderRadius="50%"
                  flex="0 0 30%"
                  pt="30%"
                  mr="1rem"
                />
                <Heading fontSize="xl" flex="0 0 calc(70% - 1rem)">
                  {student.full_name}
                </Heading>
              </Flex>
              <Text pb="2rem">
                {bio.texto
                  ? bio.texto
                  : `Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus
                sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus
                dolor purus non enim praesent elementum facilisis leo, vel fringilla est
                ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis
                scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu
                volutpat odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna`}
              </Text>
              <Spacer />
              <Link href={student.obra_url} passHref>
                <ChakraLink>
                  <Flex
                    w="100%"
                    py="0.5rem"
                    justify="center"
                    mb="1rem"
                    cursor="pointer"
                    bg="magenta"
                  >
                    <Text textTransform="uppercase" fontWeight="bold">
                      Ver Obra
                    </Text>
                  </Flex>
                </ChakraLink>
              </Link>
            </Flex>
          )
        })}
      </Flex>
    </Container>
  )
}

export default AlumnesBios
