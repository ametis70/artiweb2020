import { Box } from '@chakra-ui/react'

import AlumnesBios from '../components/AlumnesBios'
import AlumnesList from '../components/AlumnesList'
import SEO from '../components/SEO'
import { getAllParticipantsExtended, IParticipantExtended, login } from '../lib/api'

export type AlumnesProps = {
  students: IParticipantExtended[]
}

const Alumnes: React.FC<AlumnesProps> = ({ students, bios }) => {
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
  const participants = await getAllParticipantsExtended()

  return { props: { students: participants } }
}

export default Alumnes
