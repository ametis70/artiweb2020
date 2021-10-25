import { Box, BoxProps, SystemStyleObject } from '@chakra-ui/react'

type ResponsiveImageProps = {
  url: string | null
  avatar?: boolean
  alt: string
  imageStyle?: SystemStyleObject
  filter?: string
}

const ResponsiveImage: React.FC<ResponsiveImageProps & BoxProps> = ({
  url,
  avatar,
  alt,
  children,
  imageStyle,
  filter,
  ...rest
}) => {
  return (
    <Box
      height={0}
      width={0}
      background={`url()`}
      backgroundSize="cover"
      position="relative"
      filter={filter}
      sx={{
        '& picture img': imageStyle,
      }}
      {...rest}
    >
      {children}
      <div />
    </Box>
  )
}

export default ResponsiveImage
