import { Box } from '@chakra-ui/react'

import AlumnesBios from '../components/AlumnesBios'
import AlumnesList from '../components/AlumnesList'
import SEO from '../components/SEO'
import { getAllStudentsWithObra, login, StudentWithObra } from '../lib/api'

export type AlumnesProps = {
  students: StudentWithObra[]
}

const Alumnes: React.FC<AlumnesProps> = ({ students }) => {
  return (
    <>
      <SEO title="Alumnes" />
      <Box w="100%" overflow="hidden">
        <AlumnesList students={students} />
        <AlumnesBios students={students} />
      </Box>
    </>
  )
}

export async function getStaticProps() {
  await login()
  const students = await getAllStudentsWithObra()
  console.log(students)

  return { props: { students } }
}

export default Alumnes
