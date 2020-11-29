import {
  Icon,
  Box,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  Stack,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import ReactPlayer from 'react-player'

import { GrCirclePlay, GrDocumentPdf, GrBrush } from 'react-icons/gr'

import { navBarHeight } from '../components/NavBar'
import SEO from '../components/SEO'
import {
  getAllParticipantsExtended,
  login,
  IObra,
  IParticipantExtended,
} from '../lib/api'
import React from 'react'
import ResponsiveImage from '../components/ResponsiveImage'

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
    <ListItem
      px="1rem"
      mb={['0', '0', '1.5rem']}
      id={student.alumne_slug}
      w="190px"
      ml="0"
    >
      <Link href={student.obra_url} onClick={linkCallback}>
        <Flex align="center" direction={['column', 'column', 'row']}>
          <Box
            bg={student.avatarUrl ? 'none' : 'gray.400'}
            w={['96px', '96px', '128px']}
            h={['96px', '96px', '128px']}
            flex={['0 0 96px', '0 0 96px', '0 0 128px']}
            borderRadius="50%"
            display="inline-block"
            position="relative"
            overflow="visible"
          >
            {student.avatarUrl ? (
              <>
                <ResponsiveImage
                  overflow="hidden"
                  w="100%"
                  h="100%"
                  borderRadius="50%"
                  url={`avatars/${student.avatarUrl}`}
                  alt={`Avatar de ${student.full_name}`}
                  imageStyle={{ filter: 'grayscale()' }}
                  avatar
                >
                  {current ? (
                    <Box
                      position="absolute"
                      w="100%"
                      h="100%"
                      bg={color}
                      sx={{ mixBlendMode: color === 'magenta' ? 'screen' : 'soft-light' }}
                      zIndex="1"
                    />
                  ) : null}
                </ResponsiveImage>
              </>
            ) : null}
            {lastItem ? (
              <Box
                position="absolute"
                h={['10px', '10px', '150%']}
                w={['150%', '150%', '10px']}
                bg={color}
                zIndex="-1"
                top="50%"
                left="50%"
                transform={['none', 'none', 'translateX(-50%)']}
              />
            ) : null}
          </Box>

          <Text
            textTransform="uppercase"
            fontWeight="bold"
            style={{ wordSpacing: '999px' }}
            lineHeight={1.1}
            pt={['1rem', '1rem', '0']}
            pl={['0', '0', '1rem']}
            textAlign={['center', 'center', 'left']}
            fontSize={['md', 'lg', 'lg']}
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

    console.log(selectedStudent)
    const width = '840px'

    const ObraComponent = () => (
      <Box
        key={selectedStudent.obra_slug}
        p={['1rem', '1rem', '2rem']}
        flex="1 0 0"
        fontSize={['md', 'lg', 'lg']}
      >
        <Stack maxW={width} m="0 auto" spacing="2rem">
          <ResponsiveImage
            w="100%"
            h="0"
            pb="37.5%"
            overflow="hidden"
            maxH="300px"
            url={
              selectedStudent.bannerUrl ? `banners/${selectedStudent.bannerUrl}` : null
            }
            alt={`Imagen de banner de ${obra.titulo}`}
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
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                textAlign="center"
                px="2rem"
              >
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

    const tabProps = {
      _selected: { color: 'white', bg: 'magenta', '& svg path': { stroke: 'white' } },
      borderColor: 'magenta',
      color: 'gray.500',
      sx: { '& svg': { mr: '0.5rem' }, '& svg path': { stroke: 'gray.500' } },
    }

    if (obra) {
      return selectedStudent.guest ? (
        <ObraComponent />
      ) : (
        <Tabs flex="1 0 0" isFitted isLazy>
          <TabList
            maxW={width}
            m="0 auto"
            display="flex"
            flexDirection={['column-reverse', 'row', 'row']}
          >
            <Tab {...tabProps}>
              <Icon as={GrBrush} />
              Obra
            </Tab>
            <Tab {...tabProps}>
              <Icon as={GrDocumentPdf} />
              Investigación
            </Tab>
            <Tab {...tabProps}>
              <Icon as={GrCirclePlay} />
              Video-defensa
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ObraComponent />
            </TabPanel>
            <TabPanel>
              <Box
                maxW={width}
                m="0 auto"
                position="relative"
                display="block"
                h={`calc(${width} * 1.41)`}
                overflow="hidden"
              >
                <object
                  type="application/pdf"
                  data="https://trackr-media.tangiblemedia.org/publishedmedia/Papers/331-Tangible%20Bits%20Towards%20Seamless/Published/PDF"
                  width="100%"
                  height="100%"
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box maxW={width} m="0 auto">
                <Flex mt="3rem" align="center" justify="center">
                  <ReactPlayer pip url="https://www.youtube.com/watch?v=0tdyU_gW6WE" />
                </Flex>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
          <Box w="100%" pb="2em" pr="2em" />
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

  return { props: { students } }
}

export default Obras
