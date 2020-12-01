import { Box } from '@chakra-ui/react'

import { IEvent } from '../lib/api'

type CalendarProps = {
  start: string
  end: string
  events: IEvent[]
}

const Calendar: React.FC<CalendarProps> = ({ start, end, events }) => {
  return null
}

export default Calendar
