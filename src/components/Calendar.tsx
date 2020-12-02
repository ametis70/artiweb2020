import { Box } from '@chakra-ui/react'

import { IEvent } from '../lib/api'
import CalendarRow from './CalendarRow'

type CalendarProps = {
  start: string
  end: string
  events: IEvent[]
}

const getDaysArray = (start: string, end: string): Date[] => {
  const arr = []
  const endDate = new Date(end)
  for (let dt = new Date(start); dt < endDate; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt))
  }
  return arr
}

const Calendar: React.FC<CalendarProps> = ({ start, end, events }) => {
  const days = getDaysArray(start, end)

  const Rows = days.map((d) => {
    return <CalendarRow date={d} key={d.toISOString()} />
  })

  return (
    <Box w="100%" overflowX="scroll">
      {Rows}
    </Box>
  )
}

export default Calendar
