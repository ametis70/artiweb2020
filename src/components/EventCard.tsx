import { Flex, Divider, Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import { IEvent } from '../lib/api'

type EventCardProps = {
  event: IEvent
}

const colors: { bg: string; color: string }[] = [
  { bg: 'magenta', color: 'white' },
  { bg: 'green', color: 'black' },
  { bg: 'white', color: 'magenta' },
]

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link href={event.url} passHref>
      <ChakraLink>
        <Flex direction="column" {...colors[0]} mx="1rem" p="1rem" h="100%" w="300px">
          <Text>{event.hora_comienzo}</Text>
          <Heading
            fontSize="2xl"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {event.titulo}
          </Heading>

          {event.mostrar_user_asociado ? <Text> por {event.user_asociado} </Text> : null}
        </Flex>
      </ChakraLink>
    </Link>
  )
}

export default EventCard
