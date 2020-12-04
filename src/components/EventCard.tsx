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
    <Box px={['0.5rem', '0.5rem', '1rem']} flex="1 0 0" minW="220px">
      <Link href={event.url} passHref>
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
              {event.hora_comienzo.slice(0, -3)} hs
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
            {event.mostrar_user_asociado && event.user_name ? (
              <Text lineHeight="1.2" fontSize={['sm', 'sm', 'lg']}>
                por {event.user_name}
              </Text>
            ) : null}
          </Flex>
        </ChakraLink>
      </Link>
    </Box>
  )
}

export default EventCard
