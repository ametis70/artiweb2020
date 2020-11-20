import { Box } from '@chakra-ui/react'
import SEO from '../components/SEO'
import AlumnesBios from '../components/AlumnesBios'
import AlumnesList from '../components/AlumnesList'

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

export default Alumnes
