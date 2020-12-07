import {
  Box,
  CloseButton,
  Flex,
  Heading,
  HeadingProps,
  Link as ChakraLink,
  Spacer,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import { IParticipantExtended } from '../lib/api'
import { AlumnesProps } from '../pages/alumnes'
import Container from './Container'
import ResponsiveImage from './ResponsiveImage'

const headerStyle: HeadingProps = {
  fontSize: ['lg', 'lg', '2xl'],
  pt: '2em',
  textAlign: 'center',
  fontWeight: 700,
  textTransform: 'uppercase',
}

const StudentBio: React.FC<{
  student: IParticipantExtended
  opacity: number
  focused: boolean
  releaseFocusCallback: () => void
  color?: 'green' | 'magenta'
}> = ({ student, opacity, focused, releaseFocusCallback, color = 'magenta' }) => (
  <Flex
    w={['100%', '100%', 'calc(33.33% - 2rem)']}
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
      {!student.avatarUrl ? (
        <Box bg={color} flex="0 0 30%" pt="30%" mr="1rem" borderRadius="50%" />
      ) : (
        <ResponsiveImage
          overflow="hidden"
          w="100%"
          h="100%"
          mr="1rem"
          url={`avatars/${student.avatarUrl}`}
          alt={`Avatar de ${student.full_name}`}
          avatar
          borderRadius="50%"
          imageStyle={{ filter: 'grayscale()' }}
        >
          <Box
            position="absolute"
            w="100%"
            h="100%"
            bg={color}
            sx={{ mixBlendMode: color === 'magenta' ? 'screen' : 'soft-light' }}
            zIndex="1"
          />
        </ResponsiveImage>
      )}
      <Heading fontSize="xl" flex="0 0 calc(70% - 1rem)">
        {student.full_name}
      </Heading>
    </Flex>
    <Text
      as={ReactMarkdown}
      sx={{
        '& p': {
          pb: '2rem',
        },
      }}
    >
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
        <Flex
          w="100%"
          py="0.5rem"
          justify="center"
          mb="1rem"
          cursor="pointer"
          bg={color}
          color={color === 'green' ? 'black' : 'white'}
        >
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
      <Heading {...headerStyle}>Multimedia</Heading>
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
      <Heading {...headerStyle}>Invitad·s</Heading>
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
