import { Flex, Text } from '@chakra-ui/react'

const daysStrings: string[][] = [
  ['Do', 'min', 'go'],
  ['Lu', 'nes'],
  ['Mar', 'tes'],
  ['Miér', 'co', 'les'],
  ['Jue', 'ves'],
  ['Vier', 'nes'],
  ['Sá', 'ba', 'do'],
]

type CalendarRowDayProps = {
  weekDay: number
  monthDay: number
}

const CalendarRowDay: React.FC<CalendarRowDayProps> = ({ weekDay, monthDay }) => {
  const dayStrings = daysStrings[weekDay]

  return (
    <Flex
      direction="row"
      align="baseline"
      fontWeight={700}
      lineHeight="1"
      textTransform="uppercase"
      pr="2rem"
      w="300px"
      justify="flex-end"
    >
      <Text fontSize="8xl" pr="1rem">
        {monthDay}
      </Text>
      <Flex
        direction="column-reverse"
        h="100%"
        align="flex-start"
        fontSize="2xl"
        w="72px"
      >
        {dayStrings.map((syllable, index) => (
          <Text key={`${monthDay}-${syllable}`} order={dayStrings.length - 1 - index}>
            {syllable}
            {index !== dayStrings.length - 1 ? '–' : null}
          </Text>
        ))}
      </Flex>
    </Flex>
  )
}

export default CalendarRowDay
