import React from 'react'
import { Flex, Image, Box, Text, IconButton, Spacer } from '@chakra-ui/core'
import { AiOutlineMenu } from 'react-icons/ai'

const TopBar: React.FC = () => {
return (
  <Flex w="100%" h="150px" align-items="center">
    <Image src={require('../images/logo.svg')} h="100%" p="1rem" ml="1rem" />
    <Spacer />

    <Flex align="center" mr="2rem" fontSize="3xl">
      <Text fontWeight={700} color="magenta" mr="3rem"> Festival</Text>
      <IconButton fontSize="5xl" variant="ghost" aria-label="Abrir menu de navegación" color="magenta" icon={<AiOutlineMenu />} />
    </Flex>
  </Flex>
)
}

export default TopBar
