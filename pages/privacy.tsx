import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { Container, Hero, Layout, Markdown } from '@components'
import { getPrivacy } from '@lib'
import { truncateText } from '@utils'

interface PrivacyProps {
  privacy: PrivacyEntity
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const Privacy = ({ privacy, seo, source }: PrivacyProps): JSX.Element => {
  return (
    <Layout seo={seo} scrollHeight={100}>
      <Hero title={privacy?.attributes?.title as string} isFullHeight={false} />
      <Container>
        <Markdown source={source} />
      </Container>
    </Layout>
  )
}

export default Privacy

export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context

  const data = await getPrivacy({ locale: locale as CommonLocale })

  const source = await serialize(data?.privacy?.data?.attributes?.content ?? '')

  const seo: NextSeoProps = {
    title: data?.privacy?.data?.attributes?.title as string,
    description: truncateText(
      data?.privacy?.data?.attributes?.content || '',
      200,
    ),
  }

  return {
    props: {
      privacy: data.privacy?.data,
      source,
      seo,
      ...(await serverSideTranslations(locale as CommonLocale, ['common'])),
    },
  }
}
