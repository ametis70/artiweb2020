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
import { IParticipantExtended } from '../lib/api'

import { AlumnesProps } from '../pages/alumnes'
import Container from './Container'

const StudentBio: React.FC<{
  student: IParticipantExtended
  opacity: number
  focused: boolean
  releaseFocusCallback: () => void
  color?: 'green' | 'magenta'
}> = ({ student, opacity, focused, releaseFocusCallback, color = 'magenta' }) => (
  <Flex
    w={['100%', 'calc(33.33% - 2rem)']}
    mx="1rem"
    direction="column"
    wrap="nowrap"
    id={student.alumne_slug}
    pb="2rem"
    pt="2rem"
    opacity={opacity}
    transition="opacity 0.3s ease"
  >
    <CloseButton
      visibility={focused ? 'visible' : 'hidden'}
      alignSelf="flex-end"
      color="white"
      size="lg"
      onClick={releaseFocusCallback}
    />
    <Flex direction="row" wrap="nowrap" align="flex-start" mb="2rem">
      <Box bg={color} borderRadius="50%" flex="0 0 30%" pt="30%" mr="1rem" />
      <Heading fontSize="xl" flex="0 0 calc(70% - 1rem)">
        {student.full_name}
      </Heading>
    </Flex>
    <Text pb="2rem">
      {student.bio.texto
        ? student.bio.texto
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
        <Flex w="100%" py="0.5rem" justify="center" mb="1rem" cursor="pointer" bg={color}>
          <Text textTransform="uppercase" fontWeight="bold">
            Ver Obra
          </Text>
        </Flex>
      </ChakraLink>
    </Link>
  </Flex>
)

const AlumnesBios: React.FC<AlumnesProps> = ({ students }) => {
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

  const subjectStudents = students.filter((student) => !student.guest)
  const guestStudents = students.filter((student) => student.guest)

  return (
    <Container>
      <Flex direction="row" wrap="wrap" w="100%" pt="2rem">
        {subjectStudents.map((student) => (
          <StudentBio
            student={student}
            key={student.alumne_slug}
            focused={router.query.alumne === student.alumne_slug}
            opacity={getOpacity(student.alumne_slug)}
            releaseFocusCallback={() => releaseFocus()}
          />
        ))}
      </Flex>
      <Flex direction="row" wrap="wrap" w="100%" pt="2rem">
        {guestStudents.map((student) => (
          <StudentBio
            student={student}
            key={student.alumne_slug}
            focused={router.query.alumne === student.alumne_slug}
            opacity={getOpacity(student.alumne_slug)}
            releaseFocusCallback={() => releaseFocus()}
            color="green"
          />
        ))}
      </Flex>
    </Container>
  )
}

export default AlumnesBios
