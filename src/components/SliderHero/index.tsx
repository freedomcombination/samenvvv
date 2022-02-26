import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaArrowRight } from 'react-icons/fa'
import RemoveMarkdown from 'remove-markdown'

import { ChakraNextImage, Navigate } from '@components'
import { getItemLink } from '@utils'

interface SliderHeroProps {
  item: AnnouncementEntity | CompetitionEntity | HashtagEntity
}

export const SliderHero = ({ item }: SliderHeroProps): JSX.Element => {
  const { locale } = useRouter()
  const { t } = useTranslation(['common'])
  const link = getItemLink(item, locale as CommonLocale)

  if (!item.attributes) return <Spinner />

  return (
    <SimpleGrid gap={8} columns={{ base: 1, lg: 2 }} mb={4} alignItems="center">
      <Stack align="start" flex={1} spacing={8}>
        <Heading size="lg">{item.attributes.title}</Heading>
        <Box>
          <Text flex={1} noOfLines={4}>
            {RemoveMarkdown(item.attributes.content)}
          </Text>
        </Box>

        <Navigate
          justifySelf="end"
          as={Button}
          href={link as string}
          colorScheme="primary"
          rightIcon={<FaArrowRight />}
        >
          {t`read-more`}
        </Navigate>
      </Stack>

      {item.attributes.image?.data?.attributes && (
        <ChakraNextImage
          display={{ base: 'none', lg: 'block' }}
          rounded="lg"
          shadow="primary"
          ratio="twitter"
          mr={2}
          overflow="hidden"
          image={item.attributes.image}
        />
      )}
    </SimpleGrid>
  )
}
