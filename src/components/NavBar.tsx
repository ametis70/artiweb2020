import {
  Box,
  Flex,
  IconButton,
  Image,
  Spacer,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

import paths from '../paths'

const MotionBox = motion.custom(Box)

const containerVariants = {
  open: {
    x: '0%',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  closed: {
    x: '100%',
    transition: {
      when: 'afterChildren',
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

const childrenVariants = {
  open: {
    opacity: 1,
    x: '0%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

export const navBarHeight = '100px'

const NavBar: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const currentPathTitle = () => {
    const title = paths.find(
      (path) =>
        router.pathname === '/' ||
        router.pathname.substring(1) === path.path.substring(1),
    ).name
    if (title) return title
    return null
  }

  return (
    <>
      <Flex w="100%" h={navBarHeight} align-items="center">
        <Link href="/">
          <Image
            src={require('../images/logo.svg')}
            h="100%"
            p="0.5rem"
            ml="2rem"
            transition="transform 0.1s ease-in-out"
            _hover={{ cursor: 'pointer', transform: 'scale(1.1)' }}
          />
        </Link>
        <Spacer />
        <Flex align="center" mr="2rem" fontSize="3xl">
          <Text fontWeight={700} color="magenta" mr="3rem">
            {currentPathTitle()}
          </Text>
          <IconButton
            fontSize="5xl"
            variant="ghost"
            aria-label="Abrir menu de navegación"
            color="magenta"
            icon={<AiOutlineMenu />}
            onClick={() => setOpen(true)}
          />
        </Flex>
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            key="nav"
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            w="100%"
            h="100vh"
            zIndex={2}
            backgroundColor="rgba(0, 0, 0, 0.9)"
            style={{ backdropFilter: 'blur(5px)' }}
            position="absolute"
            top="0"
            left="0"
          >
            <Flex
              w="fit-content"
              position="absolute"
              right="0"
              mr="2rem"
              mt="1.4rem"
              direction="column"
              align="flex-end"
            >
              <IconButton
                fontSize="5xl"
                variant="ghost"
                mb="2rem"
                aria-label="Cerrar menu de navegación"
                color="magenta"
                icon={<AiOutlineClose />}
                onClick={() => setOpen(false)}
              />
              {paths.map((path) => {
                const currentLocation =
                  router.pathname === '/' ? '/' : router.pathname.substring(1)
                const currentPath = path.path === '/' ? '/' : path.path.substring(1)

                const current =
                  currentLocation === currentPath ||
                  (currentPath !== '/' && currentLocation.includes(currentPath))

                return (
                  <MotionBox
                    variants={childrenVariants}
                    key={path.path}
                    onClick={() => setOpen(false)}
                  >
                    <Link href={path.path}>
                      <ChakraLink
                        fontSize="5xl"
                        color="magenta"
                        fontWeight="bold"
                        position="relative"
                      >
                        {path.name}
                        {current ? (
                          <MotionBox
                            variants={childrenVariants}
                            h="8px"
                            bg="green"
                            borderRadius="8px"
                            w="100%"
                            position="absolute"
                            top="50%"
                          />
                        ) : null}
                      </ChakraLink>
                    </Link>
                  </MotionBox>
                )
              })}
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavBar
