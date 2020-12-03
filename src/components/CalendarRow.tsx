import { Flex, Divider, Box } from '@chakra-ui/react'
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
    <Box pb="1rem" minW="fit-content" flex="1 0 calc(100% + 350px / 2)">
      <Flex pb="1rem" justify="flex-start" minW="100%">
        <CalendarRowDay weekDay={weekDay} monthDay={monthDay} />
        {events ? events.map((e) => <EventCard key={e.id} event={e} />) : null}
      </Flex>
    </Box>
  )
}

export default CalendarRow
