import { Button, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import RemoveMarkdown from 'remove-markdown'

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
      <Stack align="start" h="full" flex={1} spacing={8}>
        <Heading fontWeight="bold" size="lg">
          {item.title}
        </Heading>
        <Text flex={1} noOfLines={4} fontSize="xl">
          {RemoveMarkdown(item.content)}
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
          ratio="twitter"
          mr={2}
          overflow="hidden"
          image={item.image}
        />
      )}
    </SimpleGrid>
  )
}
