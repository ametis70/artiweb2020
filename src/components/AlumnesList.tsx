import { Box, Flex, Link, List, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

import { AlumnesProps } from '../pages/alumnes'

const AlumnesList: React.FC<AlumnesProps> = ({ students }) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>, to: string) => {
    e.preventDefault()
    router.push(`/alumnes?alumne=${to}`, undefined, { shallow: true })
    document.querySelector(`#${to}`).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box
      w="100vw"
      minH="calc(var(--vh, 1vh) * 100 - 2rem)"
      bg="magenta"
      position="relative"
      color="white"
      overflow="hidden"
      py="2rem"
    >
      <Box
        position="absolute"
        w="100%"
        h="100%"
        opacity="0.1"
        transform="translateY(-100%)"
        zIndex="0"
      >
        <Box
          position="absolute"
          borderRadius="50%"
          bg="white"
          w="80%"
          pt="80%"
          left="-25%"
          top="30%"
        />
        <Flex
          align="center"
          justify="center"
          position="absolute"
          borderRadius="50%"
          bg="white"
          w="40%"
          pt="40%"
          right="-5%"
          top="-20%"
        ></Flex>
        <Box
          position="absolute"
          bg="white"
          w="120%"
          pt="10%"
          right="-20%"
          top="65%"
          transform="translate(0, -100%) rotate(-35deg)"
        />
      </Box>
      <Flex align="center" h="100vh" px="4rem" position="relative" zIndex="1">
        <List fontSize="3xl" fontWeight={700}>
          {students.map((student) => (
            <ListItem key={student.slug}>
              <Link onClick={(e) => handleClick(e, student.slug)}>
                {student.full_name}
              </Link>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  )
}

export default AlumnesList
