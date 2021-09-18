import {
  AspectRatio,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { FaArrowRight } from 'react-icons/fa'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { ChakraNextImage, Layout, Navigate, Slider } from '@components'
import { useData } from '@hooks'
import { ROUTES } from '@utils'

function Home(): JSX.Element {
  const { locale } = useRouter()
  const { data, isLoading } = useData<SubpageType[]>('subpages', {
    type: 'event',
    locale,
  })
  const { t } = useTranslation(['common'])

  if (isLoading) return <Spinner />

  return (
    <Layout>
      <Box>
        <Slider
          as={Box}
          items={data?.map(event => (
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gridTemplateColumns={{ base: '1f', md: '3fr 2fr' }}
              gap={4}
              key={event.id}
              minH="400px"
              bg="white"
            >
              <Box h="500px">
                {event.image && (
                  <ChakraNextImage
                    width="full"
                    height="full"
                    image={event.image}
                  />
                )}
              </Box>
              <VStack spacing={8} justify="center" align="start" px={8}>
                <Heading>{event.title}</Heading>
                <Navigate
                  as={Button}
                  href={`/${event.page.slug}/${event.slug}`}
                  pos="relative"
                  rightIcon={<FaArrowRight />}
                  size="lg"
                  cursor="pointer"
                  variant="normal"
                >
                  {t`read-more`}
                </Navigate>
              </VStack>
            </SimpleGrid>
          ))}
        />
        <SimpleGrid
          ml={{ base: 0, md: '5%' }}
          p={8}
          gap={8}
          columns={{ base: 1, md: 2 }}
          bg="primary.50"
          pos="relative"
          zIndex="1"
          top={{ base: 8, md: -8 }}
        >
          <VStack justify="space-evenly" align="start">
            <Heading>{t`about.title`}</Heading>
            <Text>{t`about.description`}</Text>
            <Navigate
              rightIcon={<FaArrowRight />}
              variant="reverse"
              href={ROUTES.about[locale!].link}
            >
              {t`read-more`}
            </Navigate>
          </VStack>
          <AspectRatio ratio={16 / 9}>
            <ChakraNextImage
              h="full"
              w="full"
              objectFit="cover"
              image="https://picsum.photos/seed/picsum/300/200"
            />
          </AspectRatio>
        </SimpleGrid>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient()

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
