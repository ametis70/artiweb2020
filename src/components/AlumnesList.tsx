import {
  Heading,
  Box,
  Flex,
  Link as ChakraLink,
  List,
  ListItem,
  HeadingProps,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { random } from 'lodash'

import { AlumnesProps } from '../pages/alumnes'
import { navBarHeight } from './NavBar'
import { IParticipantExtended } from '../lib/api'

const headerStyle: HeadingProps = {
  fontSize: ['sm', 'sm', '2xl'],
  pb: '1em',
  fontWeight: 700,
  textTransform: 'uppercase',
  opacity: '0.4',
}

const FloatingCircles: React.FC = () => {
  const circles = Array(15)
    .fill(null)
    .map((_, index) => {
      const size = random(5, 30)
      const parallaxMin = random(-150, 0)
      const parallaxMax = random(0, 150)
      const x = random(-10, 110)
      const y = random(-10, 110)

      return (
        <Box position="absolute" key={index} left={`${x}%`} top={`${y}%`}>
          <Parallax y={[parallaxMin, parallaxMax]}>
            <Box borderRadius="50%" bg="white" w={`${size}vw`} h={`${size}vw`} />
          </Parallax>
        </Box>
      )
    })
  return <>{circles}</>
}

const AlumnesList: React.FC<AlumnesProps> = ({ students }) => {
  const [floatingCircles, setFloatingCircles] = useState<JSX.Element>(null)
  const router = useRouter()

  useEffect(() => {
    setFloatingCircles(<FloatingCircles />)
  }, [])

  useEffect(() => {
    if (router.query?.alumne) {
      const element = document.querySelector(`#${router.query.alumne}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [router.query.alumne])

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>, to: string) => {
    e.preventDefault()
    router.push(`/alumnes?alumne=${to}`, undefined, { shallow: true })
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
      case 'composicion':
        text = '— Composición'
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
      w="100%"
      bg="magenta"
      position="relative"
      color="white"
      overflow="hidden"
      py="2rem"
    >
      <Box position="absolute" w="100%" h="100%" opacity="0.1" zIndex="0">
        {floatingCircles}
      </Box>
      <Flex
        justify="center"
        minH={`calc(var(--vh, 1vh) * 100 - ${navBarHeight})`}
        px={['1rem', '1rem', '4rem']}
        position="relative"
        zIndex="1"
        direction="column"
      >
        <Heading {...headerStyle}>Multimedia</Heading>
        <List fontSize={['md', 'md', '3xl']} fontWeight={700} pb="2em">
          {subjectStudents.map((student) => (
            <ListItem
              key={student.alumne_slug}
              pb={['1rem', '1rem', '1.5rem']}
              lineHeight="1"
            >
              <ChakraLink
                href={student.alumne_url}
                onClick={(e) => handleClick(e, student.alumne_slug)}
              >
                {student.full_name} {getCarrera(student)}
              </ChakraLink>
            </ListItem>
          ))}
        </List>

        <Heading {...headerStyle}>Invitad·s</Heading>
        <List fontSize={['md', 'md', '3xl']} fontWeight={700}>
          {guestStudents.map((student) => (
            <ListItem
              key={student.alumne_slug}
              pb={['1rem', '1rem', '1.5rem']}
              lineHeight="1"
            >
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
