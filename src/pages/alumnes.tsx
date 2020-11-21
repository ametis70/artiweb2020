import { Box } from '@chakra-ui/react'

import AlumnesBios from '../components/AlumnesBios'
import AlumnesList from '../components/AlumnesList'
import SEO from '../components/SEO'
import { getAllStudents, login } from '../lib/api'

const Alumnes: React.FC = () => {
  return (
    <>
      <SEO title="Alumnes" />
      <Box w="100%" overflow="hidden">
        <AlumnesList />
        <AlumnesBios />
      </Box>
    </>
  )
}

export async function getStaticProps() {
  await login()
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

  return { props: { students: studentsFiltered } }
}

export default Alumnes
