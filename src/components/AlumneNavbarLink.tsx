import { Box, Flex, Link as ChakraLink, ListItem, Text } from '@chakra-ui/react'
import Link from 'next/link'

import ResponsiveImage from '../components/ResponsiveImage'
import { GlobalAlumnesData } from '../lib/global.preval'
import { getAlumneFullName } from '../lib/util'

type StudentNavbarLinkProps = {
  alumne: GlobalAlumnesData
  current: boolean
  lastItem: boolean
  color?: 'green' | 'magenta'
}

const StudentNavbarLink: React.FC<StudentNavbarLinkProps> = ({
  alumne,
  current,
  lastItem,
  color = 'magenta',
}) => {
  if (!alumne) return null

  return (
    <ListItem px="1rem" mb={['0', '0', '1.5rem']} id={alumne.slug} w="190px" ml="0">
      <Link href={`/obras/${alumne.obra.slug}`} passHref>
        <ChakraLink>
          <Flex align="center" direction={['column', 'column', 'row']}>
            <Box
              bg={alumne.avatar ? 'none' : 'gray.400'}
              w={['96px', '96px', '128px']}
              h={['96px', '96px', '128px']}
              flex={['0 0 96px', '0 0 96px', '0 0 128px']}
              borderRadius="50%"
              display="inline-block"
              position="relative"
              overflow="visible"
            >
              {alumne.avatar ? (
                <>
                  <ResponsiveImage
                    img={alumne.avatar}
                    filter={!current ? 'grayscale()' : 'none'}
                    overflow="hidden"
                    w="100%"
                    h="100%"
                    borderRadius="50%"
                    alt={`Avatar de ${getAlumneFullName(alumne)}`}
                    imageStyle={{ filter: 'grayscale()' }}
                    avatar
                  >
                    {current ? (
                      <Box
                        position="absolute"
                        w="100%"
                        h="100%"
                        bg={color}
                        sx={{
                          mixBlendMode: color === 'magenta' ? 'screen' : 'soft-light',
                        }}
                        zIndex="2"
                      />
                    ) : null}
                  </ResponsiveImage>
                </>
              ) : null}
              {lastItem ? (
                <Box
                  position="absolute"
                  h={['10px', '10px', '150%']}
                  w={['150%', '150%', '10px']}
                  bg={color}
                  zIndex="-1"
                  top="50%"
                  left="50%"
                  transform={['translateY(-50%)', 'translateY(-50%)', 'translateX(-50%)']}
                />
              ) : null}
            </Box>

            <Text
              textTransform="uppercase"
              fontWeight="bold"
              style={{ wordSpacing: '999px' }}
              lineHeight={1.1}
              pt={['1rem', '1rem', '0']}
              pl={['0', '0', '1rem']}
              textAlign={['center', 'center', 'left']}
              fontSize={['md', 'lg', 'lg']}
            >
              {getAlumneFullName(alumne)}
            </Text>
          </Flex>
        </ChakraLink>
      </Link>
    </ListItem>
  )
}

export default StudentNavbarLink
