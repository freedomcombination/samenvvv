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
import { useTranslation } from 'react-i18next'
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import RemoveMarkdown from 'remove-markdown'

import { Container, Layout, Navigate, Slider } from '@components'
import { getHomepageData } from '@lib'

interface HomeProps {
  seo: NextSeoProps
  latestEntry: any
  hashtags: any
  homepageData: any
}

const Home = ({
  seo,
  latestEntry,
  homepageData,
  hashtags,
}: HomeProps): JSX.Element => {
  const [muted, setMuted] = useState(true)

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
          <Grid
            gridTemplateColumns={{ base: '1fr', lg: '2fr 3fr' }}
            gap={16}
            alignItems="center"
          >
            <Stack spacing={8} alignItems="start">
              <Heading color="white">{latestEntry.title}</Heading>

              <Text color="white" noOfLines={5}>
                {RemoveMarkdown(latestEntry.content || '')}
              </Text>

              <Navigate
                href={latestEntry.link as string}
                as={Button}
                size="lg"
                colorScheme="whiteAlpha"
              >
                {t`read-more`}
              </Navigate>
            </Stack>

            <Box pos="relative">
              <AspectRatio
                rounded="xl"
                overflow="hidden"
                shadow="primary"
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
            <Box p={8} bg="white" shadow="primary" rounded="sm">
              <Slider items={homepageData} hasThumb centeredSlides={false} />
            </Box>
            <Box p={8} bg="white" shadow="primary" rounded="sm">
              <Heading textAlign="center" mb={8}>{t`hashtag-events`}</Heading>
              <Slider items={hashtags} hasThumb centeredSlides={false} />
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

  const homepageData = await getHomepageData(locale)

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
      ...homepageData,
      seo,
    },
    revalidate: 120,
  }
}

export default Home
