import { Divider } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import {
  AnimatedBox,
  Container,
  Hero,
  Layout,
  Markdown,
  Slider,
  SliderHero,
} from '@components'

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
        {pageData.hashtags?.map((hashtag, i) => (
          <>
            <AnimatedBox
              directing={i % 2 === 0 ? 'to-left' : 'to-right'}
              delay={5}
              key={i}
            >
              <SliderHero item={hashtag} />
              <Slider
                slides={{ base: 1, md: 2, lg: 3 }}
                posts={hashtag.posts?.map(post => ({
                  ...post,
                  hashtag: { ...hashtag, page: pageData },
                }))}
                loop
                hasSocialCard
                customStyles={{ opacity: 0.5 }}
                activeStyles={{ opacity: 1 }}
                hasLink
              />
            </AnimatedBox>
            <Divider my={16} />
          </>
        ))}
      </Container>
    </Layout>
  )
}

export default MainHashtagsView
