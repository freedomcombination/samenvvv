import { Button, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { ChakraNextImage, Navigate } from '@components'
import { getItemLink } from '@utils'

interface SliderHeroProps {
  item: ISubpage | ICompetition | IHashtag
}

export const SliderHero = ({ item }: SliderHeroProps): JSX.Element => {
  const { locale } = useRouter()
  const { t } = useTranslation(['common'])
  const link = getItemLink(item, locale as string)

  return (
    <SimpleGrid gap={8} columns={{ base: 1, lg: 2 }} mb={8}>
      <Stack align="start" h="full" flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          fontWeight={700}
          fontSize={{ base: '3xl', lg: '4xl' }}
          noOfLines={1}
          color="primary"
        >
          {item.title}
        </Heading>
        <Text flex={1} noOfLines={5} fontSize="1.3rem">
          {item.content}
        </Text>

        <Navigate
          as={Button}
          href={link as string}
          colorScheme="primary"
          size="lg"
        >
          {t`read-more`}
        </Navigate>
      </Stack>

      {item.image && (
        <ChakraNextImage
          rounded="lg"
          shadow="lg"
          minH={350}
          mr={2}
          overflow="hidden"
          image={item.image}
        />
      )}
    </SimpleGrid>
  )
}
