import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

import { ChakraNextImage, Container, Hero, Layout, Navigate } from '@components'
import { getBlogPosts } from '@lib'
import { getReadingTime, timeLocale } from '@utils'

interface BlogProps {
  data: IPost[]
  seo: NextSeoProps
}

const Blog = ({ data, seo }: BlogProps): JSX.Element => {
  const { locale } = useRouter()
  return (
    <Layout seo={seo} scrollHeight={100}>
      <Hero title="Blog" isFullHeight={false} />
      <Container>
        <SimpleGrid spacing={8} columns={{ base: 1, md: 2, lg: 4 }} py={4}>
          {data.map(post => (
            <Navigate key={post.slug} href={`/blog/${post.slug}`}>
              <ChakraNextImage
                ratio="twitter"
                image={post.image?.url as string}
              />
              <Flex justify="space-between" fontSize="sm" color="gray.500">
                <Text>
                  {format(new Date(post.published_at), 'dd MMMM yyyy', {
                    locale: timeLocale[locale as string],
                  })}
                </Text>
                <Text>{getReadingTime(post.content, locale as string)}</Text>
              </Flex>
              <Heading>{post.title}</Heading>
            </Navigate>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default Blog

export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context

  const data = await getBlogPosts(locale as string)

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
      data,
      seo,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
