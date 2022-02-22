import { memo } from 'react'

import { Box, Stack } from '@chakra-ui/react'
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
  slug: CommonLocalizedSlug
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IPage
  seo: NextSeoProps
  link: string
}

export const MainHashtagsView = memo<MainHashtagsProps>(
  function MainHashtagsView({ source, pageData, seo }) {
    return (
      <Layout scrollHeight={100} seo={seo}>
        <Hero
          title={pageData.title}
          isFullHeight={false}
          image={pageData.image}
        />
        <Container overflowX="hidden">
          {source && (
            <Box my={8} maxW="container.md" mx="auto" textAlign="center">
              <Markdown source={source} />
            </Box>
          )}

          <Stack spacing={{ base: 8, lg: 16 }} mb={8}>
            {pageData.hashtags?.map((hashtag, i) => (
              <AnimatedBox
                directing={i % 2 === 0 ? 'to-left' : 'to-right'}
                delay={5}
                key={i}
              >
                <Box
                  px={{ base: 4, lg: 8 }}
                  pt={{ base: 4, lg: 8 }}
                  pb={0}
                  bg="white"
                  shadow="primary"
                >
                  <SliderHero item={hashtag} />
                  <Slider
                    slides={{ base: 1, md: 2, lg: 4 }}
                    spaces={{ base: 16, md: 24, lg: 32 }}
                    posts={hashtag.posts?.map(post => ({
                      ...post,
                      hashtag: { ...hashtag, page: pageData },
                    }))}
                    loop
                    customStyles={{ opacity: 0.5 }}
                    activeStyles={{ opacity: 1 }}
                    isSimple
                  />
                </Box>
              </AnimatedBox>
            ))}
          </Stack>
        </Container>
      </Layout>
    )
  },
)
