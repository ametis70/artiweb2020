import Calendar from '../components/Calendar'
import SEO from '../components/SEO'

const Cronograma: React.FC = () => {
  return (
    <>
      <SEO
        title="Cronograma"
        description="Agendá los días y horarios de las performances y lanzamientos de los videos de la muestra Artimañas 2020"
      />
      <Calendar start="2020-12-07" end="2020-12-13" />
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}

export default Cronograma
