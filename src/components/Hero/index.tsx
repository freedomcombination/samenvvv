import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'

import { ChakraNextImage, Container, Navigate } from '@components'

interface HeroProps {
  title: string
  description?: string
  video?: string
  image?: string | IUploadFile
  buttonText?: string
  link?: string
  isFullHeight?: boolean
}

export const Hero = ({
  title,
  description,
  video,
  image,
  buttonText,
  link,
  isFullHeight = true,
}: HeroProps): JSX.Element => {
  return (
    <Box
      pos="relative"
      height={isFullHeight ? '100vh' : '300px'}
      marginTop={{ base: '-64px', lg: '-100px' }}
    >
      {video && (
        <Box
          as="video"
          top={0}
          left={0}
          w="full"
          h="full"
          objectFit="cover"
          autoPlay
          loop
          position="absolute"
        >
          <source src={video} type="video/mp4" />
        </Box>
      )}
      {image && (
        <Box position="absolute" top={0} left={0} w="full" h="full">
          <ChakraNextImage image={image} h="full" />
        </Box>
      )}
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bgGradient={`linear(to-b, purple.600 , gray.600)`}
        blendMode="multiply"
      />
      <Container h="full">
        <VStack
          position="relative"
          spacing={8}
          h="full"
          justify="center"
          maxW={900}
          mx="auto"
          textAlign="center"
        >
          <Heading
            color="white"
            fontSize="6xl"
            {...(!isFullHeight && {
              pos: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              w: 'full',
            })}
          >
            {title}
          </Heading>
          <Text
            color="white"
            fontSize="lg"
            fontWeight="medium"
            display={isFullHeight ? 'inherit' : 'none'}
          >
            {description}
          </Text>
          {buttonText && link && (
            <Navigate
              href={link}
              as={Button}
              size="lg"
              colorScheme="primary"
              display={isFullHeight ? 'inherit' : 'none'}
            >
              {buttonText}
            </Navigate>
          )}
        </VStack>
      </Container>
    </Box>
  )
}
