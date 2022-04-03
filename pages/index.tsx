import { useState } from 'react'

import {
  AspectRatio,
  Box,
  // Button,
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
// import RemoveMarkdown from 'remove-markdown'

import { Container, Layout, PostMakerIcon } from '@components'
// import { getHomepageData, getLatestHashtag } from '@lib'

interface HomeProps {
  seo: NextSeoProps
  latestEntry: any
  hashtags: any
  latestHashtag: Hashtag & { link: string }
  homepageData: any
}

const Home = ({
  seo,
}: // latestEntry,
// homepageData,
// hashtags,
// latestHashtag,
HomeProps): JSX.Element => {
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
              {/* <Heading color="white">{latestEntry.title}</Heading> */}

              {/* <Text color="white" noOfLines={5}>
                {RemoveMarkdown(latestEntry.content || '')}
              </Text> */}

              {/* <Navigate
                href={latestEntry.link as string}
                as={Button}
                size="lg"
                colorScheme="whiteAlpha"
              >
                {t`read-more`}
              </Navigate> */}
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
        <Center p={8} bg="#9EDEF8" shadow="primary" rounded="sm" minH="100vh">
          <Container>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              alignItems="center"
              spacing={4}
            >
              <Stack
                order={{ base: 2, lg: 1 }}
                color="twitter.900"
                spacing={8}
                alignItems={{ base: 'center', lg: 'start' }}
                flex={1}
                textAlign={{ base: 'center', lg: 'left' }}
              >
                <Heading
                  as="h3"
                  size="2xl"
                  color="twitter.900"
                >{t`home.post-maker.title`}</Heading>
                <Text fontSize="xl">{t`home.post-maker.content`}</Text>
                {/* <Navigate size="lg" as={Button} href={latestHashtag.link}>
                  {t`home.post-maker.button`}
                </Navigate> */}
              </Stack>

              <PostMakerIcon
                order={{ base: 1, lg: 2 }}
                boxSize={{ base: 300, lg: 500 }}
              />
            </Stack>
          </Container>
        </Center>
        <Container>
          {/* <Stack spacing={16} py={16}>
            <Box p={8} bg="white" shadow="primary" rounded="sm">
              <Slider items={homepageData} hasThumb centeredSlides={false} />
            </Box>
            <Box p={8} bg="white" shadow="primary" rounded="sm">
              <Heading textAlign="center" mb={8}>{t`hashtag-events`}</Heading>
              <Slider items={hashtags} hasThumb centeredSlides={false} />
            </Box>
          </Stack> */}
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale

  // const homepageData = await getHomepageData(locale)

  const title: Record<string, string> = {
    en: 'Home',
    nl: 'Home',
    tr: 'Anasayfa',
  }

  // const latestHashtag = await getLatestHashtag(locale)

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // ...homepageData,
      // latestHashtag,
      seo,
    },
    revalidate: 120,
  }
}

export default Home
