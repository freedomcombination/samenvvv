import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { Container, Hero, Layout, Markdown } from '@components'
import { request } from '@lib'
import { truncateText } from '@utils'

interface TermsProps {
  term: Term
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const Terms = ({ term, seo, source }: TermsProps): JSX.Element => {
  return (
    <Layout seo={seo} scrollHeight={100}>
      <Hero title={term.title} isFullHeight={false} />
      <Container>
        <Markdown source={source} />
      </Container>
    </Layout>
  )
}

export default Terms

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale

  const data = (await request<Term>({ url: 'api/term', locale })) as {
    result: Term
  }

  if (!data.result)
    return {
      notFound: true,
    }

  const source = await serialize(data.result.content ?? '')

  const seo: NextSeoProps = {
    title: data.result?.title,
    description: truncateText(data.result?.content || '', 200),
  }

  return {
    props: {
      term: data.result,
      source,
      seo,
      ...(await serverSideTranslations(locale as StrapiLocale, ['common'])),
    },
  }
}
