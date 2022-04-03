import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { Container, Hero, Layout, Markdown } from '@components'
import { request } from '@lib'
import { truncateText } from '@utils'

interface PrivacyProps {
  privacy: Privacy
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const Privacy = ({ privacy, seo, source }: PrivacyProps): JSX.Element => {
  return (
    <Layout seo={seo} scrollHeight={100}>
      <Hero title={privacy.title} isFullHeight={false} />
      <Container>
        <Markdown source={source} />
      </Container>
    </Layout>
  )
}

export default Privacy

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale

  const data = (await request<Privacy>({ url: 'api/privacy', locale })) as {
    result: Privacy
  }

  if (!data.result)
    return {
      notFound: true,
    }

  const source = await serialize(data.result?.content ?? '')

  const seo: NextSeoProps = {
    title: data.result?.title,
    description: truncateText(data.result?.content || '', 200),
  }

  return {
    props: {
      privacy: data.result,
      source,
      seo,
      ...(await serverSideTranslations(locale as StrapiLocale, ['common'])),
    },
  }
}
