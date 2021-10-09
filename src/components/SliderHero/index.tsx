import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { ChakraNextImage, Container } from '@components'

interface SliderHeroProps {
  items: SubpageType[] | undefined
  currentIndex: number
}

export const SliderHero = ({
  items,
  currentIndex,
}: SliderHeroProps): JSX.Element => {
  return (
    <Container display={{ base: 'none', md: 'initial' }} mt={10}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text as={'span'} color={'primary'}>
              {items && items[currentIndex]?.title}
            </Text>
          </Heading>
          <Text noOfLines={5} fontSize={'1.3rem'}>
            {items && items[currentIndex]?.content}
          </Text>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Box
            position={'relative'}
            height={'300px'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}
          >
            {items?.[currentIndex]?.image && (
              <ChakraNextImage h={'100%'} image={items[currentIndex]?.image} />
            )}
          </Box>
        </Flex>
      </Stack>
    </Container>
  )
}
