import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { CardGroup, Container, Hero, Layout, Markdown } from '@components'

interface MainHashtagsProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IPage
}

const MainHashtagsView = ({
  source,
  pageData,
}: MainHashtagsProps): JSX.Element => {
  return (
    <Layout scrollHeight={100}>
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
