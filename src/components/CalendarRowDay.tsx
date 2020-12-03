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
      flex={['0 0 120px', '0 0 120px', '0 0 360px']}
      direction="row"
      align="center"
      fontWeight={700}
      position="sticky"
      left="0px"
      bg="black"
      lineHeight="1"
      textTransform="uppercase"
      pr={['0', '0', '2rem']}
      justify="flex-end"
    >
      <Text
        flex="1 0 0"
        fontSize={['4xl', '4xl', '9xl']}
        pr={['0.5rem', '0.5rem', '1rem']}
        textAlign="right"
      >
        {monthDay}
      </Text>
      <Flex
        direction="column-reverse"
        h="100%"
        justify="center"
        align="flex-start"
        fontSize={['sm', 'sm', '2xl']}
        flex={['0 0 55px', '0 0 55px', '0 0 72px']}
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
