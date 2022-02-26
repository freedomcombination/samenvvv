import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { Container, Hero, Layout, Markdown } from '@components'
import { getTerm } from '@lib'
import { truncateText } from '@utils'

interface TermsProps {
  terms: TermEntity
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const Terms = ({ terms, seo, source }: TermsProps): JSX.Element => {
  return (
    <Layout seo={seo} scrollHeight={100}>
      <Hero title={terms?.attributes?.title as string} isFullHeight={false} />
      <Container>
        <Markdown source={source} />
      </Container>
    </Layout>
  )
}

export default Terms

export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context

  const termsData = await getTerm({
    locale: locale as CommonLocale,
  })

  const source = await serialize(
    termsData?.term?.data?.attributes?.content ?? '',
  )

  const seo: NextSeoProps = {
    title: termsData?.term?.data?.attributes?.title as string,
    description: truncateText(
      termsData?.term?.data?.attributes?.content || '',
      200,
    ),
  }

  return {
    props: {
      terms: termsData.term?.data,
      source,
      seo,
      ...(await serverSideTranslations(locale as CommonLocale, ['common'])),
    },
  }
}
