import { Box, Flex, Image, Spacer, Stack, Text } from '@chakra-ui/react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

import SocialNetworkIcon from './SocialNetworkIcon'

const Footer: React.FC = () => {
  return (
    <Box w="100%" bg="white" py="4rem">
      <Flex maxW="1170px" m="0 auto" px="2rem">
        <Image src="/images/footer.svg" />
        <Spacer />
        <Stack color="black" direction="row" spacing="1rem">
          <Text fontWeight="bold" lineHeight="1" fontSize="md" pr="1rem">
            Seguinos <br /> en nuestras <br />
            redes
          </Text>
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
