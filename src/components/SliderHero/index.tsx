import { Box, Button, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaArrowRight } from 'react-icons/fa'

import { ChakraNextImage, Navigate } from '@components'
import { RouteKeys } from '@config'
import { getItemLink } from '@utils'

interface SliderHeroProps {
  item: Hashtag
  type: RouteKeys
}

export const SliderHero = ({ item, type }: SliderHeroProps): JSX.Element => {
  const { locale } = useRouter()
  const { t } = useTranslation(['common'])
  const link = getItemLink(item, locale as StrapiLocale, type)

  return (
    <Grid
      gap={8}
      gridTemplateColumns={{ base: '1fr', lg: '4fr 3fr' }}
      alignItems="center"
    >
      <Stack
        align="start"
        flex={1}
        spacing={8}
        p={{ base: 4, lg: 8 }}
        order={{ base: 2, lg: 1 }}
      >
        <Box>
          <Heading size="lg">{item.title}</Heading>
          {(item as Hashtag).hashtag && (
            <Heading size="md" color="gray.900">
              {(item as Hashtag).hashtag}
            </Heading>
          )}
          {(item as Hashtag).hashtag_extra && (
            <Heading size="md" color="gray.900">
              {(item as Hashtag).hashtag_extra}
            </Heading>
          )}
        </Box>
        <Text>{item.date}</Text>
        <Box>
          <Text flex={1} noOfLines={4}>
            {item.description}
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

      <Box flex={1} h="full" w="full">
        {item.image && (
          <ChakraNextImage
            ratio="twitter"
            h="full"
            overflow="hidden"
            image={item.image}
          />
        )}
      </Box>
    </Grid>
  )
}
