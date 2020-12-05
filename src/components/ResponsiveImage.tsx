import { Box, BoxProps, SystemStyleObject } from '@chakra-ui/react'

type ResponsiveImageProps = {
  url: string | null
  avatar?: boolean
  alt: string
  imageStyle?: SystemStyleObject
  filter?: string
}

// const defaultSizes = 'sizes[]=300,sizes[]=600,sizes[]=900,sizes[]=1200,sizes[]=1800'

const ResponsiveImage: React.FC<ResponsiveImageProps & BoxProps> = ({
  url,
  avatar,
  alt,
  children,
  imageStyle,
  filter,
  ...rest
}) => {
  if (url === null) return null

  let placeholder
  let responsiveImage
  let responsiveImageWebp

  // The sizes are hardcoded because of a bug with webpack that impedes parametrization string interpolation
  // after the question mark
  // see https://github.com/cyrilwanner/next-optimized-images/issues/16
  if (avatar) {
    placeholder = require(`../assets/${url}?lqip`)
    responsiveImage = require(`../assets/${url}?resize&sizes[]=96,sizes[]=128,sizes[]=256&format=jpg`)
    responsiveImageWebp = require(`../assets/${url}?resize&sizes[]=96,sizes[]=128,sizes[]=256&format=webp`)
  } else {
    placeholder = require(`../assets/${url}?lqip`)
    responsiveImage = require(`../assets/${url}?resize&sizes[]=300,sizes[]=600,sizes[]=900,sizes[]=1200,sizes[]=1800&format=jpg`)
    responsiveImageWebp = require(`../assets/${url}?resize&sizes[]=300,sizes[]=600,sizes[]=900,sizes[]=1200,sizes[]=1800&format=webp`)
  }

  return (
    <Box
      height={responsiveImage.height}
      width={responsiveImage.width}
      background={`url(${placeholder})`}
      backgroundSize="cover"
      position="relative"
      filter={filter}
      sx={{
        '& picture img': imageStyle,
      }}
      {...rest}
    >
      {children}
      <picture>
        <source srcSet={responsiveImageWebp.srcSet} type="image/webp" />
        <img
          alt={alt}
          src={responsiveImage.src}
          srcSet={responsiveImage.srcSet}
          loading="lazy"
        />
      </picture>
    </Box>
  )
}

export default ResponsiveImage
