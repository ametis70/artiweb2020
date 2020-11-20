import {
  Box,
  Flex,
  IconButton,
  Image,
  Spacer,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Headroom from 'react-headroom'
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

const strokeVariants = {
  open: {
    x: '0%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      when: 'beforeChildren',
    },
  },
  closed: {
    x: '200%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

const linkVariants = {
  open: {
    ...strokeVariants.open,
    opacity: 1,
  },
  closed: {
    ...strokeVariants.closed,
    opacity: 0,
    x: '100%',
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
    )

    if (title) {
      return title.name
    }
    return null
  }

  const toggleNav = () => {
    setOpen(!isOpen)

    const body = document.getElementsByTagName('body')[0]
    body.classList.toggle('lock-scroll')
    body.classList.toggle('enable-scroll')
  }

  const closeNav = () => {
    setOpen(false)

    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('lock-scroll')
    body.classList.add('enable-scroll')
  }

  return (
    <>
      <Headroom>
        <Flex
          w="100%"
          h={navBarHeight}
          align-items="center"
          bg="black"
          position="relative"
        >
          <Link href="/">
            <Image
              src="/images/logo.svg"
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
              onClick={() => toggleNav()}
            />
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
                minH="calc(var(--vh, 1vh) * 100)"
                zIndex={2}
                backgroundColor="rgba(0, 0, 0, 0.9)"
                style={{ backdropFilter: 'blur(5px)' }}
                position="absolute"
                top="0"
                left="0"
              >
                <Flex direction="row" align="flex-end" justify="flex-end">
                  <Flex
                    w="fit-content"
                    maxH="calc(var(--vh, 1vh) * 100)"
                    overflow="hidden auto"
                    pr="2rem"
                    pb="2rem"
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
                      onClick={() => closeNav()}
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
                          variants={linkVariants}
                          key={path.path}
                          onClick={() => closeNav()}
                        >
                          <Link href={path.path}>
                            <ChakraLink
                              fontSize="5xl"
                              color="magenta"
                              fontWeight="bold"
                              position="relative"
                              _hover={{
                                // @ts-ignore
                                '& div': {
                                  opacity: current ? 1 : 0.5,
                                },
                              }}
                            >
                              {path.name}
                              <MotionBox
                                variants={strokeVariants}
                                h="8px"
                                bg="green"
                                borderRadius="8px"
                                w="100%"
                                position="absolute"
                                top="50%"
                                opacity={current ? 1 : 0}
                                sx={{ transition: 'opacity 0.2s ease' }}
                              />
                            </ChakraLink>
                          </Link>
                        </MotionBox>
                      )
                    })}
                  </Flex>
                </Flex>
              </MotionBox>
            )}
          </AnimatePresence>
        </Flex>
      </Headroom>
    </>
  )
}

export default NavBar
