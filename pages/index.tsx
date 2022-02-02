import { useState } from 'react'

import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Center,
  Grid,
  Heading,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import RemoveMarkdown from 'remove-markdown'

import { Container, HeroSkeleton, Layout, Navigate, Slider } from '@components'
import {
  getHashtags,
  getLatestEntry,
  getSubpages,
  useBlogPosts,
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
  const [muted, setMuted] = useState(true)

  const hashtagQuery = useHashtagsQuery(locale)
  const subpageQuery = useSubpagesQuery({
    locale,
    type: 'announcement',
  })
  const blogPosts = useBlogPosts()
  const subpageBlogDatas = subpageQuery.data?.concat(blogPosts.data)

  const { t } = useTranslation(['common'])

  const { data, isLoading } = useLatestEntry()

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
              <HeroSkeleton />
            ) : (
              <Stack spacing={8} alignItems="start">
                <Heading color="white">{data?.title}</Heading>

                <Text color="white" noOfLines={5}>
                  {RemoveMarkdown(data?.content || '')}
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

            <Box pos="relative">
              <AspectRatio
                rounded="xl"
                overflow="hidden"
                shadow="lg"
                ratio={16 / 9}
              >
                <ReactPlayer
                  url={[{ src: '/images/home-video.webm', type: 'video/webm' }]}
                  playing
                  muted={muted}
                  loop
                  width="100%"
                  height="100%"
                />
              </AspectRatio>
              <ButtonGroup
                variant="ghost"
                colorScheme="whiteAlpha"
                isAttached
                pos="absolute"
                bottom={1}
                right={1}
              >
                <IconButton
                  aria-label="sound"
                  zIndex={2}
                  icon={muted ? <FaVolumeMute /> : <FaVolumeUp />}
                  onClick={() => setMuted(!muted)}
                />
              </ButtonGroup>
            </Box>
          </Grid>
        </Container>
      </Center>
      <Box pos="relative" bg="white" mt="100vh">
        <Container>
          <Stack spacing={16} py={16}>
            <Box p={8} bg="white" shadow="lg" rounded="sm">
              <Slider
                items={subpageBlogDatas}
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
  await queryClient.prefetchQuery([locale, 'blog'], () =>
    getSubpages({ locale, type: 'blog' }),
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
