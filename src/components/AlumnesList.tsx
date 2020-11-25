import { Box, Flex, Link as ChakraLink, List, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { AlumnesProps } from '../pages/alumnes'
import { navBarHeight } from './NavBar'
import { IParticipantExtended } from '../lib/api'

const AlumnesList: React.FC<AlumnesProps> = ({ students }) => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.alumne) {
      const element = document.querySelector(`#{router.query.alumne}`)
      if (element) {
        element.scrollIntoView()
      }
    }
  }, [])

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>, to: string) => {
    e.preventDefault()
    router.push(`/alumnes?alumne=${to}`, undefined, { shallow: true })
    document.querySelector(`#${to}`).scrollIntoView({ behavior: 'smooth' })
  }

  const getCarrera = (student: IParticipantExtended): JSX.Element => {
    let text = ''
    switch (student.bio.carrera) {
      case 'multimedia':
        return null // Hide
      // text = '— Lic. en Diseño Multimedial'
      // break
      case 'musica_popular':
        text = '— Música Popular'
        break
      case 'artes_audiovisuales':
        text = '— Artes Audiovisuales'
        break
      default:
        return null
    }

    return <span style={{ opacity: 0.4, fontSize: '0.7em' }}> {text} </span>
  }

  const subjectStudents = students.filter((student) => !student.guest)
  const guestStudents = students.filter((student) => student.guest)

  return (
    <Box
      w="100vw"
      bg="magenta"
      position="relative"
      color="white"
      overflow="hidden"
      py="2rem"
    >
      <Box
        position="absolute"
        w="100%"
        h="100%"
        opacity="0.1"
        transform="translateY(-100%)"
        zIndex="0"
      >
        <Box
          position="absolute"
          borderRadius="50%"
          bg="white"
          w="80%"
          pt="80%"
          left="-25%"
          top="30%"
        />
        <Flex
          align="center"
          justify="center"
          position="absolute"
          borderRadius="50%"
          bg="white"
          w="40%"
          pt="40%"
          right="-5%"
          top="-20%"
        ></Flex>
        <Box
          position="absolute"
          bg="white"
          w="120%"
          pt="10%"
          right="-20%"
          top="65%"
          transform="translate(0, -100%) rotate(-35deg)"
        />
      </Box>
      <Flex
        justify="center"
        minH={`calc(var(--vh, 1vh) * 100 - ${navBarHeight})`}
        px="4rem"
        position="relative"
        zIndex="1"
        direction="column"
      >
        <List fontSize="3xl" fontWeight={700} pb="2em">
          {subjectStudents.map((student) => (
            <ListItem key={student.alumne_slug}>
              <ChakraLink
                href={student.alumne_url}
                onClick={(e) => handleClick(e, student.alumne_slug)}
              >
                {student.full_name} {getCarrera(student)}
              </ChakraLink>
            </ListItem>
          ))}
        </List>

        <List fontSize="3xl" fontWeight={700}>
          {guestStudents.map((student) => (
            <ListItem key={student.alumne_slug}>
              <ChakraLink
                href={student.alumne_url}
                onClick={(e) => handleClick(e, student.alumne_slug)}
              >
                {student.full_name} {getCarrera(student)}
              </ChakraLink>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  )
}

export default AlumnesList
