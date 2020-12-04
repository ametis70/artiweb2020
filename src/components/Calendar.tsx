import { useRef, useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import ScrollContainer from 'react-indiana-drag-scroll'

import CalendarRow from './CalendarRow'
import events from '../events.json'
import { navBarHeight } from './NavBar'

type CalendarProps = {
  start: string
  end: string
}

const getDaysArray = (start: string, end: string): Date[] => {
  const arr = []
  const endDate = new Date(end)
  for (let dt = new Date(start); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(new Date(dt).getTime() + dt.getTimezoneOffset() * 60000))
  }
  return arr
}

const Calendar: React.FC<CalendarProps> = ({ start, end }) => {
  const days = getDaysArray(start, end)

  const ref = useRef()
  const [biggerRow, setBiggerRow] = useState(0)

  useEffect(() => {
    if (ref.current) setBiggerRow(ref.current.scrollWidth)
  }, [ref, ref.current])

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
    <ScrollContainer hideScrollbars={true} vertical={false}>
      <Flex
        flexDirection="column"
        minH={[
          `calc(var(--vh, 1vh) * 100 - 72px)`,
          `calc(var(--vh, 1vh) * 100 - 72px)`,
          `calc(var(--vh, 1vh) * 100 - ${navBarHeight})`,
        ]}
        w={`${biggerRow}px`}
        cursor="grab"
        ref={ref}
      >
        {Rows}
      </Flex>
    </ScrollContainer>
  )
}

export default Calendar
