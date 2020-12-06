import React, { useEffect, useRef, useState } from 'react'
import { Box, Flex, Heading, Stack, Text, HeadingProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import StudentNavbarLink from '../components/StudentNavbarLink'
import Obra from '../components/Obra'
import ObraTabs from '../components/ObraTabs'

import { navBarHeight } from '../components/NavBar'
import SEO from '../components/SEO'

import { getAllParticipantsExtended, login, IParticipantExtended } from '../lib/api'

const navHeaderStyle: HeadingProps = {
  fontSize: ['md', 'md', '2xl'],
  textAlign: 'center',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: 'gray.500',
  pb: [0, 0, '3rem'],
  pl: ['0.5rem', 0, 0],
  lineHeight: 1,
  height: '1rem',
  transform: [
    'translate(0.5rem, calc(96px / 2 - 50%))',
    'translate(0.5rem, calc(96px / 2 - 50%))',
    'none',
  ],
}

type ObrasPageProps = {
  students: IParticipantExtended[]
}

const Obras: React.FC<ObrasPageProps> = ({ students }) => {
  const router = useRouter()
  const navRef = useRef<HTMLDivElement>()

  const [multimediaStudents] = useState<IParticipantExtended[]>(
    students.filter((student) => !student.guest),
  )
  const [guestStudents] = useState<IParticipantExtended[]>(
    students.filter((student) => student.guest),
  )

  useEffect(() => {
    if (navRef.current && router.query.obra) {
      const { alumne_slug } = students.find(
        (student) => student.obra_slug === router.query.obra,
      )

      const element = navRef.current.querySelector<HTMLDivElement>(`#${alumne_slug}`)
      navRef.current.scroll({
        top: element.offsetTop - window.innerHeight / 2 + 100 + element.offsetHeight / 2,
        left: element.offsetLeft - window.innerWidth / 2 + element.offsetWidth / 2,
        behavior: 'smooth',
      })
    }
  }, [navRef, navRef.current, router.query.obra])

  const Content: React.FC = () => {
    const selectedStudent = students.find(
      (student) => student.obra && student.obra_slug === (router.query.obra as string),
    )

    if (!selectedStudent) {
      return (
        <Flex key="select_obra" w="100%" align="center" justify="center" p="2rem">
          <Text display={['none', 'none', 'block']}>
            Seleccioná una obra a la izquierda
          </Text>
          <Text pt="50%" display={['block', 'block', 'none']}>
            Seleccioná una obra arriba
          </Text>
        </Flex>
      )
    }

    console.log(selectedStudent)
    let secondStudent: IParticipantExtended | null = null
    if (selectedStudent.obra.user2) {
      secondStudent = students.find(
        (student) => student.id === selectedStudent.obra.user2,
      )
    }

    const { obra } = selectedStudent

    const width = '840px'

    if (selectedStudent) {
      return (
        <ObraTabs maxW={width} student={selectedStudent} secondStudent={secondStudent} />
      )
    }
  }

  return (
    <>
      <SEO title="Obras" />
      <Flex
        mt="1rem"
        position="relative"
        minH={['auto', 'auto', `calc(var(--vh, 1vh) * 100 - ${navBarHeight})`]}
        direction={['column', 'column', 'row']}
      >
        <Stack
          id="students-list"
          as="ul"
          w={['100%', '100%', '400px']}
          position={['static', 'static', 'sticky']}
          zIndex="0"
          direction={['row', 'row', 'column']}
          py={['.5rem', '.5rem', '2rem']}
          h={['auto', 'auto', `calc(var(--vh, 1vh) * 100)`]}
          overflow={['scroll hidden', 'scroll hidden', 'hidden scroll']}
          top="1px"
          listStyleType="none"
          ref={navRef}
        >
          <Heading {...navHeaderStyle}>Multimedia</Heading>
          {multimediaStudents.map((student, index) => (
            <StudentNavbarLink
              key={student.alumne_slug}
              student={student}
              current={router.query.obra === student.obra_slug}
              lastItem={index !== multimediaStudents.length - 1}
            />
          ))}
          <Box w="100%" pb="2em" pr="2em" />
          <Flex align="center" justify="center" h="100%">
            <Heading {...navHeaderStyle}>Invitad·s</Heading>
          </Flex>
          {guestStudents.map((student, index) => (
            <StudentNavbarLink
              key={student.alumne_slug}
              student={student}
              current={router.query.obra === student.obra_slug}
              lastItem={index !== guestStudents.length - 1}
              color="green"
            />
          ))}
        </Stack>
        <Content />
      </Flex>
    </>
  )
}

export async function getStaticProps() {
  await login()
  const students = await getAllParticipantsExtended()

  return { props: { students } }
}

export default Obras
