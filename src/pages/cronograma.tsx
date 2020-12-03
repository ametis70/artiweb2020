import { Box } from '@chakra-ui/react'

import SEO from '../components/SEO'
import Calendar from '../components/Calendar'

const Cronograma: React.FC<CronogramaProps> = () => {
  return (
    <>
      <SEO title="Cronograma" />
      <Calendar start="2020-12-03" end="2020-12-13" />
    </>
  )
}

export default Cronograma
