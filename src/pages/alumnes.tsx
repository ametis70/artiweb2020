import { GetStaticProps, NextPage } from 'next'
import { Box } from '@chakra-ui/react'

import AlumnesBios from '../components/AlumnesBios'
import AlumnesList from '../components/AlumnesList'
import SEO from '../components/SEO'
import {
  getAllAlumnes,
  AlumneType,
  ObraType,
  login,
  downloadAvatar,
  ResponsiveImageUrls,
} from '../lib/api'

export type AlumnesPageAlumne = Pick<
  AlumneType,
  'nombre' | 'apellido' | 'bio' | 'carrera' | 'slug'
> & {
  obra: Pick<ObraType, 'slug'>
  avatar: ResponsiveImageUrls
}

const Alumnes: NextPage<{ alumnes: AlumnesPageAlumne[] }> = ({ alumnes }) => {
  return (
    <>
      <SEO title="Alumnes" />
      <Box w="100%" overflow="hidden">
        <AlumnesList alumnes={alumnes} />
        <AlumnesBios alumnes={alumnes} />
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  await login()

  const alumnes = await getAllAlumnes({
    fields: 'nombre,avatar,apellido,bio,carrera,slug,obra.slug',
  })

  const alumnesWithAvatars = await Promise.all(
    alumnes.data.map(async (a) => ({ ...a, avatar: await downloadAvatar(a.avatar) })),
  )

  return { props: { alumnes: alumnesWithAvatars } }
}

export default Alumnes
