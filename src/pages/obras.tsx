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
} from '@chakra-ui/core'
import { getAllStudents, getAllObras, login } from '../lib/api'
import { MouseEvent } from 'react'

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
        <Box key={obra.slug} overflow="hidden scroll">
          <Text> {obra.banner} </Text>
          <Heading> {obra.titulo} </Heading>
          <Text> {obra.descripcion} </Text>
          <Link href={obra.link_contenido_personalizado}>{getLinkText(obra)}</Link>
          <Text>{obra.ayuda_contenido_personalizado} </Text>
        </Box>
      )
    }

    return (
      <Flex key="select_obra" w="100vw" align="center" justify="center">
        <Text> Seleccioná una obra a la izquierda </Text>
      </Flex>
    )
  }

  return (
    <Flex>
      <Stack as={UnorderedList} minW="300px" h="100vh" overflow="hidden auto">
        {students.map((student) => (
          <ListItem key={student.obra_url}>
            <Link
              href={student.obra_url}
              onClick={(e) => handleClick(e, student.obra_url)}
            >
              {student.full_name}
            </Link>
          </ListItem>
        ))}
      </Stack>
      <Content />
    </Flex>
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

  const obrasWithSlug = obras.data.map((obra) => {
    const { slug } = studentsFiltered.find((student) => obra.user === student.id)
    return { ...obra, slug }
  })

  return { props: { obras: obrasWithSlug, students: studentsFiltered } }
}

export default Obras
