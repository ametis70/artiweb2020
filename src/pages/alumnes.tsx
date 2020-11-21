import { Box } from '@chakra-ui/react'

import AlumnesBios from '../components/AlumnesBios'
import AlumnesList from '../components/AlumnesList'
import SEO from '../components/SEO'
import {
  getAllBios,
  getAllStudentsWithObra,
  IBio,
  IStudentWithObra,
  login,
} from '../lib/api'

export type AlumnesProps = {
  students: IStudentWithObra[]
  bios?: IBio[]
}

const Alumnes: React.FC<AlumnesProps> = ({ students, bios }) => {
  return (
    <>
      <SEO title="Alumnes" />
      <Box w="100%" overflow="hidden">
        <AlumnesList students={students} />
        <AlumnesBios students={students} bios={bios} />
      </Box>
    </>
  )
}

export async function getStaticProps() {
  await login()
  const students = await getAllStudentsWithObra()
  const bios = await getAllBios()

  return { props: { students, bios: bios.data } }
}

export default Alumnes
