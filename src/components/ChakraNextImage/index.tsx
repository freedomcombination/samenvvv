import { Box, BoxProps } from '@chakra-ui/react'
import Image, { ImageProps } from 'next/image'

import { getImageUrl, toBase64 } from '@utils'

const shimmer = (
  w: number,
  h: number,
) => `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="g">
            <stop stop-color="#ccc" offset="20%" />
            <stop stop-color="#eee" offset="50%" />
            <stop stop-color="#ccc" offset="70%" />
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#333" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
      </svg>`

export const ChakraNextImage = ({
  image,
  format,
  nextImageProps,
  ...rest
}: {
  image: ImageResponseType | string
  format?: ImageFormatsType
  nextImageProps?: ImageProps
} & Omit<BoxProps, 'as'>): JSX.Element => {
  const src = getImageUrl(image, format)
  const alternativeText = typeof image === 'string' ? '' : image.alternativeText
  return (
    <Box position="relative" {...rest}>
      <Image
        objectFit="cover"
        layout="fill"
        src={src}
        alt={alternativeText}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(60, 60))}`}
        {...nextImageProps}
      />
    </Box>
  )
}
