import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { dehydrate, QueryClient } from 'react-query'

import { BlogCard, Container, Hero, Layout } from '@components'
import { getBlogs } from '@lib'

interface BlogProps {
  seo: NextSeoProps
  blogs: BlogEntity[]
}

// TODO: Implement author filter
const Blog = ({ seo, blogs }: BlogProps): JSX.Element => {
  const hasData = (blogs.length || 0) > 0

  return (
    <Layout seo={seo} scrollHeight={hasData ? 100 : null}>
      {hasData ? (
        <>
          <Hero title="Blog" isFullHeight={false} />
          <Container maxW="container.lg">
            <SimpleGrid gap={8} py={8} columns={{ base: 1, lg: 2 }}>
              {blogs?.map((blog, index) => (
                <BlogCard
                  key={index}
                  isFeatured={index === 0}
                  blog={blog as BlogEntity}
                />
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
  const locale = context.locale as CommonLocale
  const queryClient = new QueryClient()

  const blogsData = await getBlogs({ locale })
  const blogs = blogsData.blogs?.data

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

  const seo: NextSeoProps = blogSeo[locale as CommonLocale]

  return {
    props: {
      seo,
      blogs,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale as CommonLocale, ['common'])),
    },
    revalidate: 120,
  }
}
