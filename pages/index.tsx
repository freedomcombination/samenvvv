import { Box } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { Layout, Slider } from '@components'
import { useData } from '@hooks'

function Home(): JSX.Element {
  const { locale } = useRouter()
  const { data, isLoading } = useData<SubpageType[]>('subpages', {
    locale,
  })

  return (
    <Layout>
      <Box>
        <Slider isLoading={isLoading} items={data} />
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
