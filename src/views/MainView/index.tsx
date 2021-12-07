import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { CardGroup, Container, Hero, Layout, Markdown } from '@components'
import { useRouter } from 'next/router'

interface MainViewProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IPage
}

const MainView = ({ source, pageData }: MainViewProps): JSX.Element => {
  return (
    <Layout
      scrollHeight={100}
      seo={{
        title: pageData?.title as string,
        description: pageData?.content.split('.')[0],
        image:
          `${process.env.NEXT_PUBLIC_ADMIN_URL}${pageData?.image?.url}` as string,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${pageData?.slug}`,
        width: pageData?.image?.width as number,
        height: pageData?.image?.height as number,
        type: pageData?.image?.mime as string,
      }}
    >
      <Hero
        isFullHeight={false}
        title={pageData.title}
        image={pageData.image}
      />
      <Container>
        {source && <Markdown source={source} />}
        <CardGroup items={pageData?.subpages as ISubpage[]} isSimple={true} />
      </Container>
    </Layout>
  )
}

export default MainView
