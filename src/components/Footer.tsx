import { Box, Flex, Image, Spacer, Stack, Link as ChakraLink } from '@chakra-ui/react'
import getConfig from 'next/config'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

import SocialNetworkIcon from './SocialNetworkIcon'

const { publicRuntimeConfig } = getConfig()

const Footer: React.FC = () => {
  return (
    <Box w="100%" bg="white" py={['3rem', '3rem', '4rem']}>
      <Flex
        maxW={['100%', '100%', '1170px']}
        m="0 auto"
        px={['1rem', '1rem', '2rem']}
        direction={['column', 'column', 'row']}
      >
        <Box maxW={['100%', '100%', '60%']} position="relative">
          <Flex position="absolute" w="100%" h="100%">
            <ChakraLink
              href="https://taller5.ludic.cc/"
              isExternal
              display="block"
              h="100%"
              flex="17.6 0 0"
            />
            <ChakraLink
              href="https://fba.unlp.edu.ar/"
              isExternal
              display="block"
              h="100%"
              flex="38.25 0 0"
            />
            <ChakraLink
              href="https://unlp.edu.ar/"
              isExternal
              display="block"
              h="100%"
              flex="29.5 0 0"
            />
          </Flex>
          <Image
            src={`${publicRuntimeConfig.basePath}/images/footer.svg`}
            alt="Logos institucionales de Taller de Diseño Multimedial V, Facultad de Artes y Universidad Nacional de La Plata"
          />
        </Box>
        <Spacer />
        <Stack
          mx="auto"
          direction="row"
          spacing="1rem"
          pb={['3rem', '3rem', '0']}
          order={[-1, -1, 0]}
        >
          <SocialNetworkIcon
            siteName="Facebook"
            link="https://www.facebook.com/festival.de.artimanas"
            icon={<FaFacebookF />}
          />
          <SocialNetworkIcon
            siteName="Instagram"
            link="https://www.instagram.com/festivalartimanas/"
            icon={<FaInstagram />}
          />
        </Stack>
      </Flex>
    </Box>
  )
}

export default Footer
