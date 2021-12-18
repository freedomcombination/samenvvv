import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { Container, Hero, Layout, Markdown } from '@components'
import { getPrivacyPage } from '@lib'
import { truncateText } from '@utils'

interface PrivacyProps {
  data: IStaticPage
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const Privacy = ({ data, seo, source }: PrivacyProps): JSX.Element => {
  return (
    <Layout seo={seo} scrollHeight={100}>
      <Hero title={data.title} isFullHeight={false} />
      <Container>
        <Markdown source={source} />
      </Container>
    </Layout>
  )
}

export default Privacy

export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context

  const data = await getPrivacyPage(locale as string)

  const source = await serialize(data?.content ?? '')

  const seo: NextSeoProps = {
    title: data?.title,
    description: truncateText(data?.content || '', 200),
  }

  return {
    props: {
      data,
      source,
      seo,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
