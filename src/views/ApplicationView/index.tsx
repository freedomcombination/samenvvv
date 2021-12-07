import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { ChakraNextImage, Container, Layout, Markdown } from '@components'
import { useRouter } from 'next/router'

interface ApplicationProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IApplication
}

const ApplicationView = ({
  source,
  pageData,
}: ApplicationProps): JSX.Element => {
  const { locale } = useRouter()
  return (
    <Layout
      seo={{
        title: pageData?.title,
        description: pageData?.content.split('.')[0],
        image:
          `${process.env.NEXT_PUBLIC_ADMIN_URL}${pageData?.image?.url}` as string,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${pageData?.slug}`,
        width: pageData?.image?.width as number,
        height: pageData?.image?.height as number,
        type: pageData?.image?.mime as string,
      }}
    >
      <Container my={8}>
        <h1>{pageData.title}</h1>
        {source && <Markdown source={source} />}
        {pageData.image && <ChakraNextImage image={pageData.image} />}
      </Container>
    </Layout>
  )
}

export default ApplicationView
