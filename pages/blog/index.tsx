import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { BlogCard, Container, Hero, Layout } from '@components'
import { getBlogs } from '@lib'

interface BlogProps {
  seo: NextSeoProps
  blogs: Blog[]
}

// TODO: Implement author filter
const Blog = ({ seo, blogs }: BlogProps): JSX.Element => {
  return (
    <Layout seo={seo} scrollHeight={100}>
      {blogs ? (
        <>
          <Hero title="Blog" isFullHeight={false} />
          <Container maxW="container.lg">
            <SimpleGrid gap={8} py={8} columns={{ base: 1, lg: 2 }}>
              {blogs?.map((blog, index) => (
                <BlogCard key={index} isFeatured={index === 0} post={blog} />
              ))}
            </SimpleGrid>
          </Container>
        </>
      ) : (
        <Stack minH="inherit" justify="center" align="center" spacing={8}>
          <Image h={200} src="/images/no-blog.svg" alt="no blog" />
          <Text textAlign="center" fontSize="lg">
            Sorry! No articles published in this language.
          </Text>
        </Stack>
      )}
    </Layout>
  )
}

export default Blog

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale
  const response = await getBlogs(locale)

  const blogSeo: Record<string, NextSeoProps> = {
    en: {
      title: 'Blog',
      description: 'Posts',
    },
    nl: {
      title: 'Blog',
      description: 'Posts',
    },
    tr: {
      title: 'Blog',
      description: 'Yazılar',
    },
  }

  const seo: NextSeoProps = blogSeo[locale as StrapiLocale]

  return {
    props: {
      seo,
      blogs: response?.result || null,
      ...(await serverSideTranslations(locale as StrapiLocale, ['common'])),
    },
    revalidate: 120,
  }
}
