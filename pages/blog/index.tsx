import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { dehydrate, QueryClient } from 'react-query'

import { BlogCard, Container, Hero, Layout } from '@components'
import { getBlogPosts, useBlogPosts } from '@lib'

interface BlogProps {
  seo: NextSeoProps
}

// TODO: Implement author filter
const Blog = ({ seo }: BlogProps): JSX.Element => {
  const { data, isLoading, isFetched } = useBlogPosts()

  const hasData = isFetched && data && data.length > 0

  return (
    <Layout seo={seo} scrollHeight={hasData ? 100 : null} isLoading={isLoading}>
      {hasData ? (
        <>
          <Hero title="Blog" isFullHeight={false} />
          <Container maxW="container.lg">
            <SimpleGrid gap={8} py={8} columns={{ base: 1, lg: 2 }}>
              {data?.map((post, index) => (
                <BlogCard key={index} isFeatured={index === 0} post={post} />
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
  const { locale } = context
  const queryClient = new QueryClient()

  const queryKey = ['posts', locale]
  const queryFn = () => getBlogPosts(locale as string)

  await queryClient.prefetchQuery(queryKey, queryFn)

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

  const seo: NextSeoProps = blogSeo[locale as string]

  return {
    props: {
      seo,
      dehydratedState: dehydrate(queryClient),
      revalidate: 120,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
