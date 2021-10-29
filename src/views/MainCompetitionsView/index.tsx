import { MDXRemoteSerializeResult } from 'next-mdx-remote'

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
  return (
    <Layout scrollHeight={100}>
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
