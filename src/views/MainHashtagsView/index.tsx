import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import { CardGroup, Container, Hero, Layout, Markdown } from '@components'

interface MainHashtagsProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IPage
  seo: NextSeoProps
  link: string
}

const MainHashtagsView = ({
  source,
  pageData,
  seo,
}: MainHashtagsProps): JSX.Element => {
  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero
        title={pageData.title}
        isFullHeight={false}
        image={pageData.image}
      />
      <Container>
        {source && <Markdown source={source} />}
        <CardGroup
          items={pageData?.hashtags as unknown as ISubpage[]}
          hasLink
        />
      </Container>
    </Layout>
  )
}

export default MainHashtagsView
