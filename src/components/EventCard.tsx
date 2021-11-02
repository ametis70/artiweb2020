import { Box, Flex, Link as ChakraLink, Spacer, Text } from '@chakra-ui/react'
import { PartialItem } from '@directus/sdk'
import Link from 'next/link'
import { EventType } from '../lib/api'
import { getAlumneFullName } from '../lib/util'

type CardColor = { bg: string; color: string }

const colors: CardColor[] = [
  { bg: 'magenta', color: 'white' },
  { bg: 'white', color: 'magenta' },
  { bg: 'white', color: 'black' },
  { bg: 'green', color: 'black' },
]

const EventCard: React.FC<{ event: PartialItem<EventType>; onClick: () => void }> = ({
  event,
  onClick = undefined,
}) => {
  let cardColors: CardColor

  switch (event.tipo_de_evento) {
    case 'multimedia':
      cardColors = colors[0]
      break
    case 'performance':
      cardColors = colors[1]
      break
    case 'invitade':
      cardColors = colors[3]
      break
    case 'festival':
      cardColors = colors[2]
      break
  }

  const url = event.url
    ? event.url
    : `/obras/${event.alumne.obra.slug}${
        event.tipo_de_evento === 'performance' ? '/?ver=obra' : '/?ver=video'
      }`

  return (
    <Box px={['0.5rem', '0.5rem', '1rem']} flex="1 0 0" minW="220px">
      <Link href={url} passHref>
        <ChakraLink onClick={onClick}>
          <Flex
            flex={['0 0 250px', '0 0 250px', '0 0 600px']}
            direction="column"
            p={['0.5rem 1rem', '0.5rem 1rem', '1rem 2rem']}
            h="100%"
            align="space-between"
            fontWeight={700}
            {...cardColors}
          >
            <Text fontSize={['lg', 'lg', '5xl']} minW={['110px']} whiteSpace="nowrap">
              {(event.hora_comienzo as string).slice(0, -3)} hs
            </Text>
            <Text
              lineHeight="1.2"
              fontSize={['md', 'md', '2xl']}
              pb="1rem"
              textTransform="uppercase"
            >
              {event.titulo}
            </Text>

            <Spacer />
            {event.alumne ? (
              <Text lineHeight="1.2" fontSize={['sm', 'sm', 'lg']}>
                por {getAlumneFullName(event.alumne)}
              </Text>
            ) : null}
          </Flex>
        </ChakraLink>
      </Link>
    </Box>
  )
}

export default EventCard
