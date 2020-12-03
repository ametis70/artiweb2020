import { useEffect, useState } from 'react'
import events from '../events.json'
import EventCard from '../components/EventCard'
import Link from 'next/link'

import {
  Flex,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link as ChakraLink,
} from '@chakra-ui/react'

const getDuration = (event): [Date, Date] => {
  return [
    new Date(`${event.fecha}T${event.hora_comienzo}`),
    new Date(`${event.fecha}T${event.hora_fin}`),
  ]
}

const LiveIndicator = () => {
  const [currentEvent, setCurrentEvent] = useState(null)
  const [showIndicator, setShowIndicator] = useState<boolean>(false)
  const [[currentEventStart, currentEventEnd], setCurrentDuration] = useState([
    null,
    null,
  ])
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const checkCurrentEvent = () => {
      const currentTime = new Date()

      if (!currentEvent || !showIndicator) {
        const newEvent = events.find((event) => {
          const [start, end] = getDuration(event)
          if (currentTime > start && currentTime < end) return true
          return false
        })

        if (newEvent) {
          setShowIndicator(true)
          setCurrentEvent(newEvent)
          setCurrentDuration(getDuration(newEvent))
        }
      } else {
        if (currentTime > currentEventEnd) {
          setShowIndicator(false)
        }
      }
    }

    checkCurrentEvent()
    const checkCurrentEventInterval = setInterval(() => checkCurrentEvent(), 15000) // 15 segundos

    return () => {
      clearInterval(checkCurrentEventInterval)
    }
  }, [currentEvent, showIndicator])

  return (
    <>
      <Flex h="100%" align="center" onClick={onOpen}>
        <Flex
          display={!showIndicator ? 'none' : 'flex'}
          bg="magenta"
          h="2em"
          px={['0.5rem', '0.5rem', '1rem']}
          fontSize={['sm', 'sm', 'lg']}
          fontWeight={700}
          textTransform="uppercase"
          align="center"
          cursor="pointer"
        >
          <Box
            bg="#ff0000"
            borderRadius="50%"
            w="16px"
            h="0"
            pb="16px"
            mr={['0.5rem', '0.5rem', '1rem']}
          />
          <Text>En Vivo</Text>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          backgroundColor="rgba(0, 0, 0, 0.9)"
          style={{ backdropFilter: 'blur(5px)' }}
        />
        <ModalContent bg="none" borderRadius="none" shadow="none">
          <ModalCloseButton size="lg" transform="translateY(-50%)" />
          <ModalBody bg="none" borderRadius="none" pb="2rem" mt="2rem">
            <EventCard event={currentEvent} onClick={onClose} />
          </ModalBody>
          <ModalFooter display="block" w="100%" textAlign="center">
            <Link href="/cronograma" passHref>
              <ChakraLink>
                <Box
                  onClick={onClose}
                  display="inline-block"
                  bg="magenta"
                  color="white"
                  textAlign="center"
                  p="0.5rem 1rem"
                  textTransform="uppercase"
                  fontWeight={700}
                  fontSize={['sm', 'md', 'md']}
                >
                  Ver cronograma
                </Box>
              </ChakraLink>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LiveIndicator
