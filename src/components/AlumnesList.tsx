import { Box, Flex, List, ListItem } from '@chakra-ui/core'
import React from 'react'

import students from '../students'

const AlumnesList: React.FC = () => {
  return (
    <Box
      w="100vw"
      minH="calc(100vh - 2rem)"
      bg="magenta"
      position="relative"
      color="white"
      overflow="hidden"
      py="2rem"
    >
      <Box position="absolute" w="100%" h="100%" opacity="0.1">
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
      <Flex align="center" minH="100vh" px="4rem">
        <List fontSize="3xl" fontWeight={700}>
          {students.map((student) => (
            <ListItem key={student}>{student} </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  )
}

export default AlumnesList
