import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { Container, Layout, Navigate, Slider } from '@components'
import {
  getHashtags,
  getSubpages,
  useHashtagsQuery,
  useSubpagesQuery,
} from '@lib'

interface HomeProps {
  seo: NextSeoProps
}

const Home = ({ seo }: HomeProps): JSX.Element => {
  const router = useRouter()
  const locale = router.locale as ILocale

  const hashtagQuery = useHashtagsQuery(locale)
  const subpageQuery = useSubpagesQuery({
    locale,
    type: 'announcement',
  })

  const { t } = useTranslation(['common'])

  return (
    <Layout scrollHeight={100} seo={seo}>
      <Center
        pos="fixed"
        top={0}
        left={0}
        w="full"
        h="100vh"
        bgGradient="linear(to-b, primary.600, primary.300)"
        zIndex={0}
      >
        <Container>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={16}>
            <Stack spacing={8} alignItems="start">
              <Heading color="white">Welcome to this website</Heading>
              <Text color="white" noOfLines={5}>
                Ipsum esse cupidatat ex magna labore aliquip non aliqua. Minim
                mollit magna irure deserunt ex irure et ad ad ea culpa ad eu.
                Labore labore pariatur mollit culpa cupidatat consequat quis
                amet ut et eiusmod amet ad. Exercitation aute dolore ipsum qui
                amet aliqua nisi. Id dolore dolore aliquip eiusmod proident
                nostrud laboris aliqua dolor. Fugiat occaecat incididunt non
                sunt adipisicing adipisicing amet sit eu mollit aliqua
                incididunt exercitation exercitation.
              </Text>
              <Navigate href="/" as={Button} size="lg" colorScheme="whiteAlpha">
                {t`read-more`}
              </Navigate>
            </Stack>

            <AspectRatio
              rounded="xl"
              overflow="hidden"
              shadow="lg"
              ratio={16 / 9}
            >
              <Box
                as={ReactPlayer}
                playing
                loop
                url="/images/home-video.webm"
                light
              />
            </AspectRatio>
          </SimpleGrid>
        </Container>
      </Center>
      <Box bg="white" pos="relative" zIndex={1} mt="100vh">
        <Container>
          <Stack spacing={16} py={16}>
            <Box p={8} bg="white" shadow="lg" rounded="sm">
              <Slider
                items={subpageQuery.data}
                hasThumb
                isLoading={subpageQuery.isLoading}
                centeredSlides={false}
              />
            </Box>
            <Box p={8} bg="white" shadow="lg" rounded="sm">
              <Heading
                textAlign="center"
                mb={8}
                fontWeight="bold"
              >{t`hashtag-events`}</Heading>
              <Slider
                items={hashtagQuery.data}
                hasThumb
                isLoading={hashtagQuery.isLoading}
                centeredSlides={false}
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const queryClient = new QueryClient()
  const locale = context.locale as string

  await queryClient.prefetchQuery(['subpages', [locale, 'announcement']], () =>
    getSubpages({ locale, type: 'announcement' }),
  )
  await queryClient.prefetchQuery(['hashtags', [locale]], () =>
    getHashtags(locale),
  )

  const title: Record<string, string> = {
    en: 'Home',
    nl: 'Home',
    tr: 'Anasayfa',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      dehydratedState: dehydrate(queryClient),
      seo,
    },
  }
}

export default Home
