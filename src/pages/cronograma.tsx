import Calendar from '../components/Calendar'
import SEO from '../components/SEO'

const Cronograma: React.FC = () => {
  return (
    <>
      <SEO title="Cronograma" />
      <Calendar start="2020-12-07" end="2020-12-13" />
    </>
  )
}

export default Cronograma
