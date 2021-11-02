import { GetStaticProps, NextPage } from 'next'
import { Box } from '@chakra-ui/react'

import AlumnesBios from '../components/AlumnesBios'
import AlumnesList from '../components/AlumnesList'
import SEO from '../components/SEO'
import { getAllAlumnes, AlumneType, login } from '../lib/api'

import global, { GlobalAlumnesData } from '../lib/global.preval'

type AlumnesPageAlumne = Pick<AlumneType, 'id' | 'bio'>
export type AlumneData = GlobalAlumnesData & AlumnesPageAlumne

const Alumnes: NextPage<{ _alumnes: AlumnesPageAlumne[] }> = ({ _alumnes }) => {
  const alumnes: AlumneData[] = _alumnes.map((_a) => ({
    ...global.alumnes.find((a) => a.id === _a.id),
    ..._a,
  }))

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

  const _alumnes = await getAllAlumnes({
    fields: 'id,bio',
  })

  return { props: { _alumnes: _alumnes.data } }
}

export default Alumnes
