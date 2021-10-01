import { Box, ChakraProps } from '@chakra-ui/react'
import Image, { ImageProps } from 'next/image'

import { getImageUrl, toBase64 } from '@utils'

const shimmer = (
  w: number,
  h: number,
) => `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="g">
            <stop stop-color="#EDF2F7" offset="20%" />
            <stop stop-color="white" offset="50%" />
            <stop stop-color="#F7FAFC" offset="70%" />
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#E2E8F0" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
      </svg>`

interface ChakraNextImageProps {
  image: ImageResponseType | string
  alt?: string
  format?: ImageFormatsType
  nextImageProps?: ImageProps
}

export const ChakraNextImage = ({
  image,
  alt,
  format,
  nextImageProps,
  ...rest
}: ChakraNextImageProps & ChakraProps): JSX.Element => {
  const src = getImageUrl(image, format)
  const alternativeText =
    typeof image === 'string' ? alt || '' : image.alternativeText
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
