import SEO from '../components/SEO'
import AlumnesBios from '../components/AlumnesBios'
import AlumnesList from '../components/AlumnesList'

const Alumnes: React.FC = () => {
  return (
    <>
      <SEO title="Alumnes" />
      <AlumnesList />
      <AlumnesBios />
    </>
  )
}

export default Alumnes
