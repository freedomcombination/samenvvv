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
  })

  const { t } = useTranslation(['common'])

  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero
        title="Welcome to this website"
        description="Ipsum esse cupidatat ex magna labore aliquip non aliqua. Minim mollit magna irure deserunt ex irure et ad ad ea culpa ad eu. Labore labore pariatur mollit culpa cupidatat consequat quis amet ut et eiusmod amet ad. Exercitation aute dolore ipsum qui amet aliqua nisi. Id dolore dolore aliquip eiusmod proident nostrud laboris aliqua dolor. Fugiat occaecat incididunt non sunt adipisicing adipisicing amet sit eu mollit aliqua incididunt exercitation exercitation."
        video="/images/Alley_hero_aug_2020-transcode.webm"
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

  await queryClient.prefetchQuery(['subpages', [locale]], () =>
    getSubpages({ locale }),
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
