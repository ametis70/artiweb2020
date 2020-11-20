import { Box, Flex, Spacer, Image, Stack, Text } from '@chakra-ui/react'
import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import SocialNetworkIcon from './SocialNetworkIcon'

const Footer: React.FC = () => {
  return (
    <Box w="100%" bg="white" py="4rem">
      <Flex maxW="1170px" m="0 auto">
        <Image src="/images/footer.svg" />
        <Spacer />
        <Stack color="black" direction="row" spacing="1rem">
          <Text fontWeight="bold" lineHeight="1" fontSize="md">
            Seguinos <br /> en nuestras <br />
            redes
          </Text>
          <SocialNetworkIcon
            siteName="Facebook"
            link="https://facebook.com"
            icon={<FaFacebookF />}
          />
          <SocialNetworkIcon
            siteName="Instagram"
            link="https://instagram.com"
            icon={<FaInstagram />}
          />
        </Stack>
      </Flex>
    </Box>
  )
}

export default Footer
