import { useEffect, useRef } from 'react'

import {
  AspectRatio,
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { Container, HeroSkeleeton, Layout, Navigate, Slider } from '@components'
import {
  getHashtags,
  getLatestEntry,
  getSubpages,
  useHashtagsQuery,
  useLatestEntry,
  useSubpagesQuery,
} from '@lib'

interface HomeProps {
  seo: NextSeoProps
}

const Home = ({ seo }: HomeProps): JSX.Element => {
  const router = useRouter()
  const locale = router.locale as ILocale
  const ref = useRef<HTMLVideoElement>()

  const hashtagQuery = useHashtagsQuery(locale)
  const subpageQuery = useSubpagesQuery({
    locale,
    type: 'announcement',
  })
  const { t } = useTranslation(['common'])

  const { data, isLoading } = useLatestEntry()

  useEffect(() => {
    if (ref.current) {
      if (
        ref.current.paused ||
        ref.current.ended ||
        ref.current.currentTime === 0
      ) {
        ref.current.play()
      }
    }
  }, [])

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
          <Grid
            gridTemplateColumns={{ base: '1fr', lg: '2fr 3fr' }}
            gap={16}
            alignItems="center"
          >
            {isLoading || !data ? (
              <HeroSkeleeton />
            ) : (
              <Stack spacing={8} alignItems="start">
                <Heading color="white">{data?.title}</Heading>

                <Text color="white" noOfLines={5}>
                  {data?.content}
                </Text>

                <Navigate
                  href={data?.link as string}
                  as={Button}
                  size="lg"
                  colorScheme="whiteAlpha"
                >
                  {t`read-more`}
                </Navigate>
              </Stack>
            )}

            <AspectRatio
              rounded="xl"
              overflow="hidden"
              shadow="lg"
              ratio={16 / 9}
            >
              <Box shadow="inner">
                <video
                  ref={el =>
                    ref.current && (ref.current = el as HTMLVideoElement)
                  }
                  muted
                  autoPlay={true}
                  playsInline={true}
                  loop={true}
                  style={{ width: '100%' }}
                >
                  <source src="/images/home-video.webm" type="video/webm" />
                </video>
              </Box>
            </AspectRatio>
          </Grid>
        </Container>
      </Center>
      <Box pos="relative" bg="white" mt="100vh">
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
              <Heading textAlign="center" mb={8}>{t`hashtag-events`}</Heading>
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
  await queryClient.prefetchQuery(['latest-entry', [locale]], () =>
    getLatestEntry(locale),
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
