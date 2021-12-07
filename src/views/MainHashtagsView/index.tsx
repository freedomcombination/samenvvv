import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { CardGroup, Container, Hero, Layout, Markdown } from '@components'
import { useRouter } from 'next/router'

interface MainHashtagsProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IPage
}

const MainHashtagsView = ({
  source,
  pageData,
}: MainHashtagsProps): JSX.Element => {
  const { locale } = useRouter()
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
        title={pageData.title}
        isFullHeight={false}
        image={pageData.image}
      />
      <Container>
        {source && <Markdown source={source} />}
        <CardGroup
          items={pageData?.hashtags as unknown as ISubpage[]}
          isSimple={true}
        />
      </Container>
    </Layout>
  )
}

export default MainHashtagsView
