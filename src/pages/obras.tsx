import { useRouter } from 'next/router'
import {
  Text,
  Heading,
  Box,
  Stack,
  Flex,
  UnorderedList,
  ListItem,
  Link,
  Image,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { MouseEvent } from 'react'

import { getAllStudents, getAllObras, login, getImage } from '../lib/api'
import SEO from '../components/SEO'
import { navBarHeight } from '../components/NavBar'

interface IObra {
  id: number
  titulo: string
  user: number
  descripcion: string
  tipo_contenido_personalizado: 'external' | 'download' | 'video'
  link_contenido_personalizado: string
  ayuda_contenido_personalizado: string
  banner: string | null
  slug: string
}

interface IStudents {
  id: number
  first_name: string
  last_name: string
  full_name: string
  obra_url: string
  avatar: string | null
  slug: string
}

type ObrasPageProps = {
  obras: Array<IObra>
  students: Array<IStudents>
}

const Obras: React.FC<ObrasPageProps> = ({ obras, students }) => {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement, MouseEvent>, to: string) => {
    e.preventDefault()
    router.push(to, undefined, { shallow: true })
  }

  const getLinkText = (obra: IObra): string => {
    switch (obra.tipo_contenido_personalizado) {
      case 'external':
        return 'Continuar a sitio externo'

      case 'video':
        return 'Ver Video'

      case 'download':
        return 'Continuar a descarga'

      default:
        return 'Tipo de link no identificado'
    }
  }
  const Content: React.FC = () => {
    const obra = obras.find((obra) => obra.slug === router.query.obra)

    if (obra) {
      return (
        <Box key={obra.slug} flex="1 1 0" p="2rem">
          <Stack maxW="840px" m="0 auto" spacing="1rem">
            <Image
              src={obra.banner ? obra.banner : 'https://source.unsplash.com/random/800x'}
              alt={`Imagen de banner de ${obra.titulo} `}
              maxH="300px"
              objectFit={obra.banner ? 'contain' : 'cover'}
            />
            <Heading> {obra.titulo} </Heading>
            <Text as={ReactMarkdown} source={obra.descripcion} />
            <Link href={obra.link_contenido_personalizado}>
              <Flex w="100%" py="1rem" bg="magenta" justify="center" mb="1rem">
                <Text textTransform="uppercase" fontWeight="bold">
                  {getLinkText(obra)}
                </Text>
              </Flex>
            </Link>
            <Text
              as={ReactMarkdown}
              source={obra.ayuda_contenido_personalizado}
              opacity={0.52}
              fontSize="md"
              textAlign="center"
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

  return (
    <>
      <SEO title="Obras" />
      <Flex
        mt="1rem"
        position="relative"
        minH={`calc(var(--vh, 1vh) * 100 - ${navBarHeight})`}
      >
        <Box flex="0 0 400px" />
        <Stack
          as={UnorderedList}
          w="400px"
          position="absolute"
          zIndex="0"
          h="100%"
          overflow="hidden auto"
          direction="column"
          py="2rem"
        >
          {students.map((student, index) => (
            <ListItem key={student.obra_url} mb="1.5rem">
              <Link
                href={student.obra_url}
                onClick={(e) => handleClick(e, student.obra_url)}
              >
                <Flex align="center">
                  <Box
                    bg={router.query.obra === student.slug ? 'green' : 'gray.400'}
                    h="128px"
                    flex="0 0 128px"
                    borderRadius="50%"
                    display="inline-block"
                    position="relative"
                    overflow="visible"
                  >
                    {index !== students.length - 1 ? (
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
          ))}
        </Stack>
        <Content />
      </Flex>
    </>
  )
}

export async function getStaticProps() {
  await login()
  const obras = await getAllObras()
  const students = await getAllStudents()

  const studentsFiltered = students.data.map((student) => {
    const { first_name, last_name, avatar, id } = student
    const full_name = `${first_name} ${last_name}`
    const slug = student.last_name.toLowerCase().replace(' ', '_')
    const obra_url = `/obras?obra=${slug}`

    return {
      id,
      first_name,
      last_name,
      full_name,
      slug,
      obra_url,
      avatar,
    }
  })

  const obrasWithSlug = await Promise.all(
    obras.data.map(async (obra) => {
      let banner = null
      if (obra.banner) {
        const imageData = await getImage(obra.banner)
        banner = imageData.data.full_url
      }
      const { slug } = studentsFiltered.find((student) => obra.user === student.id)
      return { ...obra, slug, banner }
    }),
  )

  return { props: { obras: obrasWithSlug, students: studentsFiltered } }
}

export default Obras
