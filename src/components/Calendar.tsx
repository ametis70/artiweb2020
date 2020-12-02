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
    const ISOsliced = d.toISOString().slice(0, 10)
    const dayEvents = events.filter((e) => e.fecha === ISOsliced)
    const sortedDayEvents = dayEvents.sort((a, b) => {
      const aStart = new Date(`${a.fecha}T${a.hora_comienzo}`)
      const bStart = new Date(`${b.fecha}T${b.hora_comienzo}`)
      if (aStart === bStart) return 0
      if (aStart < bStart) return -1
      return 1
    })
    return <CalendarRow date={d} key={d.toISOString()} events={sortedDayEvents} />
  })

  return (
    <Box w="100%" overflowX="scroll">
      {Rows}
    </Box>
  )
}

export default Calendar