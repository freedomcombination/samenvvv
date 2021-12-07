import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import { CardGroup, Container, Hero, Layout, Markdown } from '@components'

interface CompetitionsProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IPage
}

const MainCompetitionsView = ({
  source,
  pageData,
}: CompetitionsProps): JSX.Element => {
  const { locale } = useRouter()

  return (
    <Layout
      scrollHeight={100}
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
      <Hero
        title={pageData.title}
        image={pageData.image}
        isFullHeight={false}
      />
      <Container>
        {source && <Markdown source={source} />}
        <CardGroup
          items={pageData?.competitions as ISubpage[]}
          isSimple={true}
        />
      </Container>
    </Layout>
  )
}

export default MainCompetitionsView
