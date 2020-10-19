import { Box, Flex, Heading, List, ListItem, Text } from '@chakra-ui/core'
import React from 'react'

import students from '../students'
import Container from './Container'

const Alumnxs: React.FC = () => {
  return (
    <>
      <Box
        w="100vw"
        h="100vh"
        bg="magenta"
        position="relative"
        color="white"
        overflow="hidden"
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
      <Container>
        <Flex direction="row" wrap="wrap" w="100%" pt="2rem">
          {students.map((student) => {
            return (
              <Flex
                w="calc(33.33% - 2rem)"
                mx="1rem"
                direction="column"
                wrap="nowrap"
                key="student"
                pb="4rem"
              >
                <Flex direction="row" wrap="nowrap" align="flex-start" mb="2rem">
                  <Box
                    bg="magenta"
                    borderRadius="50%"
                    flex="0 0 30%"
                    pt="30%"
                    mr="1rem"
                  />
                  <Heading fontSize="xl" flex="0 0 calc(70% - 1rem)">
                    {' '}
                    {student}{' '}
                  </Heading>
                </Flex>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
                  purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
                  rhoncus dolor purus non enim praesent elementum facilisis leo, vel
                  fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis
                  enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra
                  orci sagittis eu volutpat odio. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus
                  magna fringilla urna,
                </Text>
              </Flex>
            )
          })}
        </Flex>
      </Container>
    </>
  )
}

export default Alumnxs
