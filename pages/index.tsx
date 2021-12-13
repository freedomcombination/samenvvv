import { Box } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { Container, Hero, Layout, Slider } from '@components'
import { getSubpages } from '@lib'
import { ROUTES } from '@utils'

interface HomeProps {
  hashtags: IHashtag[]
  subpages: ISubpage[]
  seo: NextSeoProps
}

const Home = ({ subpages, seo }: HomeProps): JSX.Element => {
  const { locale } = useRouter()

  const { t } = useTranslation(['common'])

  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero
        title="Welcome to this website"
        description="Ipsum esse cupidatat ex magna labore aliquip non aliqua. Minim mollit magna irure deserunt ex irure et ad ad ea culpa ad eu. Labore labore pariatur mollit culpa cupidatat consequat quis amet ut et eiusmod amet ad. Exercitation aute dolore ipsum qui amet aliqua nisi. Id dolore dolore aliquip eiusmod proident nostrud laboris aliqua dolor. Fugiat occaecat incididunt non sunt adipisicing adipisicing amet sit eu mollit aliqua incididunt exercitation exercitation."
        video="/images/Alley_hero_aug_2020-transcode.webm"
        buttonText={t`read-more`}
        link={ROUTES.event[locale as string].link}
      />
      <Container>
        <Box>
          <Slider items={subpages} hasThumb />
        </Box>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['subpages', [locale]], () =>
    getSubpages(locale as string),
  )

  const title: Record<string, string> = {
    en: 'Home',
    nl: 'Home',
    tr: 'Anasayfa',
  }

  const seo: NextSeoProps = {
    title: title[locale as string],
  }

  const subpages = queryClient.getQueryData(['subpages', [locale]]) ?? []

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      dehydratedState: dehydrate(queryClient),
      subpages,
      seo,
    },
  }
}

export default Home
