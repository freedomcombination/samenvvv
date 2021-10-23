import { Box } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { Container, Hero, Layout, Slider } from '@components'
import { useData } from '@hooks'
import { ROUTES } from '@utils'

function Home(): JSX.Element {
  const { locale } = useRouter()
  const { data, isLoading } = useData<SubpageType[]>('subpages', {
    locale,
  })
  const { t } = useTranslation(['common'])
  const hashtagQuery = useData<SubpageType[]>('hashtags', {
    locale,
  })

  return (
    <Layout scrollHeight={100}>
      <Hero
        title="Welcome to this website"
        description="Ipsum esse cupidatat ex magna labore aliquip non aliqua. Minim mollit magna irure deserunt ex irure et ad ad ea culpa ad eu. Labore labore pariatur mollit culpa cupidatat consequat quis amet ut et eiusmod amet ad. Exercitation aute dolore ipsum qui amet aliqua nisi. Id dolore dolore aliquip eiusmod proident nostrud laboris aliqua dolor. Fugiat occaecat incididunt non sunt adipisicing adipisicing amet sit eu mollit aliqua incididunt exercitation exercitation."
        video="/images/Alley_hero_aug_2020-transcode.webm"
        buttonText={t`read-more`}
        link={ROUTES.event[locale as string].link}
      />
      <Container>
        <Box>
          <Slider isLoading={isLoading} items={data} />
        </Box>
        <Box>
          <Slider
            heading={'Hastag Events'}
            isLoading={hashtagQuery.isLoading}
            items={hashtagQuery.data?.slice(0, 5)}
            hasHero
            hasSimpleCard
          />
        </Box>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient()

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
