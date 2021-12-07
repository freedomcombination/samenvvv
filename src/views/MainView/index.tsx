import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import { CardGroup, Container, Hero, Layout, Markdown } from '@components'

interface MainViewProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IPage
  seo: NextSeoProps
  link: string
}

const MainView = ({ source, pageData, seo }: MainViewProps): JSX.Element => {
  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero
        isFullHeight={false}
        title={pageData.title}
        image={pageData.image}
      />
      <Container>
        {source && <Markdown source={source} />}
        <CardGroup items={pageData?.subpages as ISubpage[]} isSocial hasLink />
      </Container>
    </Layout>
  )
}

export default MainView
