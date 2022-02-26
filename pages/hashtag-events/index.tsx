import { Box, Stack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
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
import { getHashtags } from '@lib'

interface HashtagsProps {
  hashtags: HashtagEntity[]
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const Hashtags = ({ source, hashtags, seo }: HashtagsProps) => {
  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero title={seo.title as string} isFullHeight={false} />
      <Container overflowX="hidden">
        {source && (
          <Box my={8} maxW="container.md" mx="auto" textAlign="center">
            <Markdown source={source} />
          </Box>
        )}

        <Stack spacing={{ base: 8, lg: 16 }} mb={8}>
          {hashtags?.map((hashtag, i) => (
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
                  posts={hashtag?.attributes?.posts?.data}
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
}

export default Hashtags

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as CommonLocale

  const hashtagsData = await getHashtags({ locale })

  const hashtags = hashtagsData.hashtags?.data
  // .map(h => ({
  //   ...h,
  //   attributes: {
  //     ...h.attributes,
  //     posts: {
  //       ...h.attributes?.posts,
  //       data: h.attributes?.posts?.data?.map(p => ({
  //         ...p,
  //         attributes: {
  //           ...p.attributes,
  //           hashtag: {
  //             data: h,
  //           },
  //         },
  //       })),
  //     },
  //   },
  // }))

  const title = {
    en: 'Hashtag Events',
    nl: 'Hashtag Evenementen',
    tr: 'Hashtag Etkinlikleri',
  }

  const description = {
    en: '',
    nl: '',
    tr: '',
  }

  const content = {
    en: `Content`,
    nl: `Inhoud`,
    tr: `Icerik`,
  }

  const seo: NextSeoProps = {
    title: title[locale],
    description: description[locale],
  }

  const source = await serialize(content[locale].trim())

  return {
    props: {
      hashtags,
      seo,
      source,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
