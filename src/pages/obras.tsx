import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
// import getConfig from 'next/config'
import ReactMarkdown from 'react-markdown'

import { navBarHeight } from '../components/NavBar'
import SEO from '../components/SEO'
import {
  getAllObras,
  getAllParticipantsExtended,
  getImage,
  login,
  IObra,
  IParticipantExtended,
} from '../lib/api'

//const { serverRuntimeConfig } = getConfig()

interface IObraWithSlug extends IObra {
  slug: string
}

type ObrasPageProps = {
  obras: IObraWithSlug[]
  students: IParticipantExtended[]
}

const StudentSidebarLink: React.FC<{
  student: IParticipantExtended
  current: boolean
  linkCallback: (e: any) => void
  lastItem: boolean
  color?: 'green' | 'magenta'
}> = ({ student, current, linkCallback, lastItem, color = 'magenta' }) => {
  return (
    <ListItem mb="1.5rem" id={student.alumne_slug}>
      <Link href={student.obra_url} onClick={linkCallback}>
        <Flex align="center">
          <Box
            bg={current ? color : 'gray.400'}
            h="128px"
            flex="0 0 128px"
            borderRadius="50%"
            display="inline-block"
            position="relative"
            overflow="visible"
          >
            {lastItem ? (
              <Box
                position="absolute"
                h="150%"
                w="10px"
                bg="gray.400"
                zIndex="-1"
                top="50%"
                left="50%"
                transform="translateX(-50%)"
              />
            ) : null}
          </Box>

          <Text
            textTransform="uppercase"
            fontWeight="bold"
            style={{ wordSpacing: 'calc(400px - 128px)' }}
            lineHeight={1.1}
            pl="1rem"
          >
            {student.full_name}
          </Text>
        </Flex>
      </Link>
    </ListItem>
  )
}

const Obras: React.FC<ObrasPageProps> = ({ obras, students }) => {
  const router = useRouter()

  const handleClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    to: string,
    scrollId: string,
  ) => {
    e.preventDefault()
    router.push(to, undefined, { shallow: true })

    document
      .querySelector(`#${scrollId}`)
      .scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  const getLinkText = (obra: IObra): string => {
    switch (obra.tipo_contenido_personalizado) {
      case 'external':
        return 'Continuar a sitio externo'

      case 'video':
        return 'Ver Video'

      case 'downloadable':
        return 'Continuar a descarga'

      default:
        return 'Tipo de link no identificado'
    }
  }
  const Content: React.FC = () => {
    const selectedStudent = students.find(
      (student) => student.obra && student.obra_slug === (router.query.obra as string),
    )

    if (!selectedStudent) {
      return null
    }

    const { obra } = selectedStudent

    let secondUser
    if (obra.user2) {
      secondUser = students.find((student) => student.id === obra.user2)
    }

    if (obra) {
      return (
        <Box key={selectedStudent.obra_slug} flex="1 1 0" p="2rem">
          <Stack maxW="840px" m="0 auto" spacing="2rem">
            <Image
              src={
                obra.banner
                  ? obra.banner.toString()
                  : 'https://source.unsplash.com/random/800x'
              }
              alt={`Imagen de banner de ${obra.titulo} `}
              maxH="300px"
              objectFit={obra.banner ? 'contain' : 'cover'}
            />
            <Box>
              <Heading> {obra.titulo} </Heading>
              <Text
                as="small"
                color="gray.500"
                sx={{
                  '& a': {
                    color: 'gray.300',
                  },
                }}
              >
                Obra realizada por{' '}
                <Link href={selectedStudent.alumne_url}>{selectedStudent.full_name}</Link>
                {secondUser ? (
                  <>
                    {' '}
                    y <Link href={secondUser.alumne_url}>{secondUser.full_name}</Link>
                  </>
                ) : null}
              </Text>
              {selectedStudent.guest ? (
                <Text as="small" color="gray.500">
                  {' '}
                  — Obra invitada
                </Text>
              ) : null}
            </Box>
            <Text
              as={ReactMarkdown}
              source={obra.descripcion}
              sx={{
                '& p': {
                  pb: '2rem',
                },
              }}
            />
            <Link href={obra.link_contenido_personalizado} isExternal>
              <Flex w="100%" py="1rem" bg="magenta" justify="center">
                <Text textTransform="uppercase" fontWeight="bold">
                  {getLinkText(obra)}
                </Text>
              </Flex>
            </Link>
            <Text
              as={ReactMarkdown}
              source={obra.ayuda_contenido_personalizado}
              color="gray.500"
              fontSize="md"
              textAlign="center"
              sx={{
                '& a': {
                  color: 'gray.300',
                },
              }}
            />
          </Stack>
        </Box>
      )
    }

    return (
      <Flex key="select_obra" w="100%" align="center" justify="center" p="2rem">
        <Text> Seleccioná una obra a la izquierda </Text>
      </Flex>
    )
  }

  const subjectStudents = students.filter((student) => !student.guest)
  const guestStudents = students.filter((student) => student.guest)

  return (
    <>
      <SEO title="Obras" />
      <Flex
        mt="1rem"
        position="relative"
        minH={`calc(var(--vh, 1vh) * 100 - ${navBarHeight})`}
      >
        <Stack
          id="students-list"
          as="ul"
          w="400px"
          position="sticky"
          zIndex="0"
          direction="column"
          py="2rem"
          h={`calc(var(--vh, 1vh) * 100)`}
          overflow="hidden scroll"
          top="1px"
        >
          {subjectStudents.map((student, index) => (
            <StudentSidebarLink
              key={student.alumne_slug}
              student={student}
              linkCallback={(e) => handleClick(e, student.obra_url, student.alumne_slug)}
              current={router.query.obra === student.obra_slug}
              lastItem={index !== subjectStudents.length - 1}
            />
          ))}
          <Box w="100%" pb="2em" />
          {guestStudents.map((student, index) => (
            <StudentSidebarLink
              key={student.alumne_slug}
              student={student}
              linkCallback={(e) => handleClick(e, student.obra_url, student.alumne_slug)}
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

  //const path = require('path')
  //const fs = require('fs')
  //fs.mkdirSync(path.join(__dirname, './algo'))

  return { props: { students } }
}

export default Obras
