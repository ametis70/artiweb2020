import { Box, Flex } from '@chakra-ui/react'

import { IEvent } from '../lib/api'
import CalendarRowDay from './CalendarRowDay'
import EventCard from './EventCard'

type CalendarRowProps = {
  date: Date
  events?: IEvent[] | undefined
}

const CalendarRow: React.FC<CalendarRowProps> = ({ date, events }) => {
  const weekDay = date.getDay()
  const monthDay = date.getDate()
  return (
    <Box py={['0.5rem', '1rem', '1rem']} minW="100vw">
      <Flex>
        <CalendarRowDay weekDay={weekDay} monthDay={monthDay} />
        {events ? events.map((e) => <EventCard key={e.id} event={e} />) : null}
      </Flex>
    </Box>
  )
}

export default CalendarRow
