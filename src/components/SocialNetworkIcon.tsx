import { IconButton, Link } from '@chakra-ui/react'

type SocialNetworkIconProps = {
  link: string
  siteName: string
  icon: JSX.Element
}
const SocialNetworkIcon: React.FC<SocialNetworkIconProps> = ({
  link,
  siteName,
  icon,
}) => (
  <IconButton
    as={Link}
    size="lg"
    borderRadius="50%"
    _hover={{ bg: 'white', color: 'magenta' }}
    borderWidth="2px"
    borderStyle="solid"
    borderColor="magenta"
    fontSize="1.5em"
    bg="magenta"
    color="white"
    isExternal
    href={link}
    icon={icon}
    aria-label={`Ver Festival Armtimañas en ${siteName}`}
  />
)

export default SocialNetworkIcon
