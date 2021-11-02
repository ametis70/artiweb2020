import { Box, Flex, Heading, HeadingProps, Stack, UnorderedList } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { navBarHeight } from '../components/NavBar'
import AlumneNavbarLink from '../components/AlumneNavbarLink'

const navHeaderStyle: HeadingProps = {
  fontSize: ['md', 'md', '2xl'],
  textAlign: 'center',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: 'gray.500',
  pb: [0, 0, '3rem'],
  pl: ['0.5rem', 0, 0],
  lineHeight: 1,
  height: '1rem',
  transform: [
    'translate(0.5rem, calc(96px / 2 - 50%))',
    'translate(0.5rem, calc(96px / 2 - 50%))',
    'none',
  ],
}

import global from '../lib/global.preval'
import { splitAlumnes } from '../lib/util'

const ObrasLayout: React.FC = ({ children }) => {
  const router = useRouter()
  const navRef = useRef<HTMLUListElement>(null)

  const [multimedia, invitades] = splitAlumnes(global.alumnes)

  useEffect(() => {
    if (navRef.current && router.query.slug) {
      const { slug } = global.alumnes.find(
        (student) => student.obra.slug === router.query.slug,
      )

      const element = navRef.current.querySelector<HTMLDivElement>(`#${slug}`)
      navRef.current.scroll({
        top: element.offsetTop - window.innerHeight / 2 + 100 + element.offsetHeight / 2,
        left: element.offsetLeft - window.innerWidth / 2 + element.offsetWidth / 2,
        behavior: 'smooth',
      })
    }
  }, [navRef, navRef.current, router.query.obra])

  return (
    <>
      <Flex
        mt="1rem"
        position="relative"
        minH={['auto', 'auto', `calc(var(--vh, 1vh) * 100 - ${navBarHeight})`]}
        direction={['column', 'column', 'row']}
      >
        <UnorderedList
          id="students-list"
          display="flex"
          flexGrow={0}
          flexShrink={0}
          flexBasis={['100%', '100%', '400px']}
          position={['static', 'static', 'sticky']}
          zIndex="0"
          flexDirection={['row', 'row', 'column']}
          py={['.5rem', '.5rem', '2rem']}
          h={['auto', 'auto', `calc(var(--vh, 1vh) * 100)`]}
          overflow={['scroll hidden', 'scroll hidden', 'hidden scroll']}
          top="1px"
          listStyleType="none"
          ref={navRef}
        >
          <Heading {...navHeaderStyle}>Multimedia</Heading>
          {multimedia.map((alumne, index) => (
            <AlumneNavbarLink
              key={alumne.slug}
              alumne={alumne}
              current={router.query.slug === alumne.obra.slug}
              lastItem={index !== multimedia.length - 1}
            />
          ))}
          <Box w="100%" pb="2em" pr="2em" />
          <Flex align="center" justify="center" h="100%">
            <Heading {...navHeaderStyle}>Invitad·s</Heading>
          </Flex>
          {invitades.map((alumne, index) => (
            <AlumneNavbarLink
              key={alumne.slug}
              alumne={alumne}
              current={router.query.slug === alumne.obra.slug}
              lastItem={index !== invitades.length - 1}
              color="green"
            />
          ))}
        </UnorderedList>
        {children}
      </Flex>
    </>
  )
}

export default ObrasLayout
