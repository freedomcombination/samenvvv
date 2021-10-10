import { AspectRatio, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { ChakraNextImage, Container, Navigate } from '@components'
import { ROUTES } from '@utils'

interface SliderHeroProps {
  item: SubpageType
}

export const SliderHero = ({ item }: SliderHeroProps): JSX.Element => {
  const { locale } = useRouter()
  const { t } = useTranslation(['common'])

  return (
    <Container display={{ base: 'none', md: 'initial' }} mt={10}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack align="start" flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={700}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text as={'span'} color={'primary'}>
              {item.title}
            </Text>
          </Heading>
          <Text noOfLines={5} fontSize={'1.3rem'}>
            {item.content}
          </Text>
          {item.type && (
            <Navigate
              as={Button}
              // href="/<mainpage>/<subpage>"
              href={`/${ROUTES[item.type][locale as string].link}/${item.slug}`}
              colorScheme="primary"
              size="lg"
            >
              {t`read-more`}
            </Navigate>
          )}
        </Stack>
        <AspectRatio
          rounded="2xl"
          boxShadow="2xl"
          pos="relative"
          flex={1}
          maxW="600px"
          ratio={1200 / 675}
          overflow="hidden"
        >
          {item.image && <ChakraNextImage h={'100%'} image={item.image} />}
        </AspectRatio>
      </Stack>
    </Container>
  )
}
