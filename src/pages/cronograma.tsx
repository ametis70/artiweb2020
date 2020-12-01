import { Box } from '@chakra-ui/react'

import SEO from '../components/SEO'
import { getAllEvents, IEvent, login } from '../lib/api'
import Calendar from '../components/Calendar'

export type CronogramaProps = {
  events: IEvent[]
}

const Cronograma: React.FC<CronogramaProps> = ({ events }) => {
  return (
    <>
      <SEO title="Cronograma" />
      <Calendar events={events} />
    </>
  )
}

export async function getStaticProps() {
  await login()
  const events = await getAllEvents()

  return { props: { events: events.data } }
}

export default Cronograma
