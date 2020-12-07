import { Box, Flex, Image, Spacer, Stack } from '@chakra-ui/react'
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
        <Image
          src={`${publicRuntimeConfig.basePath}/images/footer.svg`}
          px="1rem"
          maxW={['100%', '100%', '60%']}
        />
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
