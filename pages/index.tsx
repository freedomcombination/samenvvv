import { Box, Heading, Stack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { Container, Hero, Layout, Slider } from '@components'
import { ROUTES } from '@config'
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

  const hashtagQuery = useHashtagsQuery(locale)
  const subpageQuery = useSubpagesQuery({
    locale,
    type: 'announcement',
  })
  const { t } = useTranslation(['common'])

  const latestEntry = useLatestEntry()

  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero
        title={latestEntry?.data?.title}
        description={latestEntry?.data?.content}
        video="/images/home-video.webm"
        buttonText={t`read-more`}
        link={ROUTES.event[locale].link}
      />
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
