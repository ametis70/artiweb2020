import { Flex, Divider, Box } from '@chakra-ui/react'
import { IEvent } from '../lib/api'
import CalendarRowDay from './CalendarRowDay'
import EventCard from './EventCard'

type CalendarRowProps = {
  date: Date
  events?: IEvent[] | null
}

const CalendarRow: React.FC<CalendarRowProps> = ({ date, events }) => {
  const weekDay = date.getDay()
  const monthDay = date.getDate()
  return (
    <Box pl="2rem" pb="1rem">
      <Flex pb="1rem">
        <CalendarRowDay weekDay={weekDay} monthDay={monthDay} />
        {events ? events.map((e) => <EventCard key={e.id} event={e} />) : null}
      </Flex>
      <Divider />
    </Box>
  )
}

export default CalendarRow
