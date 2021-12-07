import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { CardGroup, Container, Hero, Layout, Markdown } from '@components'

interface MainViewProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IPage
}

const MainView = ({ source, pageData }: MainViewProps): JSX.Element => {
  return (
    <Layout scrollHeight={100}>
      <Hero
        isFullHeight={false}
        title={pageData.title}
        image={pageData.image}
      />
      <Container>
        {source && <Markdown source={source} />}
        <CardGroup
          items={pageData?.subpages as ISubpage[]}
          // isSimple
          isSocial
          hasLink
        />
      </Container>
    </Layout>
  )
}

export default MainView
