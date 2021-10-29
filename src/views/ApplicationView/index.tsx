import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { ChakraNextImage, Container, Layout, Markdown } from '@components'

interface ApplicationProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IApplication
}

const ApplicationView = ({
  source,
  pageData,
}: ApplicationProps): JSX.Element => {
  return (
    <Layout>
      <Container my={8}>
        <h1>{pageData.title}</h1>
        {source && <Markdown source={source} />}
        {pageData.image && <ChakraNextImage image={pageData.image} />}
      </Container>
    </Layout>
  )
}

export default ApplicationView
