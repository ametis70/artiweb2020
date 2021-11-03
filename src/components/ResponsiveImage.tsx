import { Box, BoxProps, SystemStyleObject } from '@chakra-ui/react'
import { DownloadedImage, ResponsiveImageUrls } from '../lib/api'
import { getBasePath } from '../lib/util'

const basePath = getBasePath()

type ResponsiveImageProps = {
  img: ResponsiveImageUrls
  avatar?: boolean
  alt: string
  imageStyle?: SystemStyleObject
  filter?: string
}

const getSrcSet = (images: DownloadedImage[]) => {
  let srcSet = ''

  images.forEach((src, i) => {
    srcSet = `${srcSet}${basePath}/${src.path}${
      i < images.length - 1 ? ` ${src.width}w, ` : ''
    }`
  })

  return srcSet
}

const ResponsiveImage: React.FC<ResponsiveImageProps & BoxProps> = ({
  img,
  avatar,
  alt,
  children,
  imageStyle,
  filter,
  ...rest
}) => {
  const jpegSrcSet = getSrcSet(img.jpg)
  const webpSrcSet = getSrcSet(img.webp)

  return (
    <Box
      position="relative"
      filter={filter}
      sx={{
        '& picture img': imageStyle,
      }}
      {...rest}
    >
      {children}
      <picture>
        <source srcSet={webpSrcSet} type="image/webp" />
        <img
          style={{ position: 'relative', zIndex: 1 }}
          alt={alt}
          src={`${basePath}/${img.jpg[img.jpg.length - 1].path}`}
          srcSet={jpegSrcSet}
          loading="lazy"
        />
      </picture>
      <Box
        background={`url(data:image/jpeg;base64,${img.lqip})`}
        backgroundSize="cover"
        w="100%"
        h="100%"
        position="absolute"
        top="0"
        left="0"
        filter="blur(4px)"
        transform="scale(1.1)"
        zIndex="0"
      />
    </Box>
  )
}

export default ResponsiveImage
