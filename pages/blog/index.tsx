import { SimpleGrid } from '@chakra-ui/react'
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
  const { data, isLoading } = useBlogPosts()

  return (
    <Layout seo={seo} scrollHeight={100} isLoading={isLoading}>
      <Hero title="Blog" isFullHeight={false} />
      <Container maxW="container.lg">
        <SimpleGrid gap={8} py={8} columns={{ base: 1, lg: 2 }}>
          {data?.map((post, index) => (
            <BlogCard key={index} isFeatured={index === 0} post={post} />
          ))}
        </SimpleGrid>
      </Container>
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

  const posts = queryClient.getQueryData<IPost[]>(queryKey)

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
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
    notFound: !posts || posts?.length === 0,
  }
}
