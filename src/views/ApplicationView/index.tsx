import { memo } from 'react'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import { ChakraNextImage, Container, Layout, Markdown } from '@components'

interface ApplicationProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IApplication
  seo: NextSeoProps
  link: string
}

export const ApplicationView = memo<ApplicationProps>(function ApplicationView({
  source,
  pageData,
  seo,
}): JSX.Element {
  return (
    <Layout seo={seo}>
      <Container my={8}>
        <h1>{pageData.title}</h1>
        {source && <Markdown source={source} />}
        {pageData.image && <ChakraNextImage image={pageData.image} />}
      </Container>
    </Layout>
  )
})
