import {
  Spacer,
  Flex,
  Divider,
  Box,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Link from 'next/link'
import { IEvent } from '../lib/api'

const colors: { bg: string; color: string }[] = [
  { bg: 'magenta', color: 'white' },
  { bg: 'white', color: 'magenta' },
  { bg: 'white', color: 'black' },
  { bg: 'green', color: 'black' },
]

const EventCard = ({ event, onClick = undefined }) => {
  let cardColors

  switch (event.tipo_de_evento) {
    case 'multimedia':
      cardColors = event.performance ? colors[1] : colors[0]
      break
    case 'invitado':
      cardColors = colors[3]
      break
    case 'festival':
      cardColors = colors[2]
      break
  }

  return (
    <Link href={event.url} passHref>
      <ChakraLink flex="0 0 600px" onClick={onClick}>
        <Flex
          direction="column"
          {...cardColors}
          mx="1rem"
          p="1rem 2rem"
          h="100%"
          align="flex-start"
          fontWeight={700}
        >
          <Text fontSize="5xl" w="100%">
            {event.hora_comienzo.slice(0, -3)} hs
          </Text>
          <Heading
            fontSize="2xl"
            overflow="hidden"
            pb="1rem"
            w="100%"
            textTransform="uppercase"
          >
            {event.titulo}
          </Heading>

          <Spacer />
          {event.mostrar_user_asociado && event.user_name ? (
            <Text> por {event.user_name} </Text>
          ) : null}
        </Flex>
      </ChakraLink>
    </Link>
  )
}

export default EventCard
