import { Box, Heading, Spinner, Text } from '@chakra-ui/react'
import { formatRelative } from 'date-fns'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import RemoveMarkdown from 'remove-markdown'

import {
  ChakraNextImage,
  Container,
  Hero,
  Layout,
  Markdown,
  ShareButtons,
} from '@components'
import { getBlogPaths, getBlogPost } from '@lib'
import { getReadingTime, timeLocale, truncateText } from '@utils'

interface PostProps {
  post: IPost
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  seo: NextSeoProps
  link: string
  description: string
}

const Post = ({
  post,
  source,
  seo,
  link,
  description,
}: PostProps): JSX.Element => {
  const { locale } = useRouter()

  if (!post) return <Spinner />

  return (
    <Layout seo={seo} scrollHeight={100}>
      <Hero title="Blog" isFullHeight={false} />
      <Container>
        <Box py={4}>
          <ChakraNextImage image={post.image} />
          <Box fontSize="sm" color="gray.500">
            <Text textTransform="capitalize">
              {formatRelative(new Date(post.published_at), new Date(), {
                locale: timeLocale[locale as string],
              })}
            </Text>
            <Text>{getReadingTime(post.content, locale as string)}</Text>
          </Box>
          <ShareButtons title={post.title} url={link} quote={description} />
          <Heading>{post.title}</Heading>
          <Markdown source={source} />
        </Box>
      </Container>
    </Layout>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getBlogPaths()

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { locale, params } = context

  const post = await getBlogPost(params?.slug as string, locale as string)

  if (!post) {
    return { notFound: true }
  }

  const title = post.title
  const description =
    post.content && RemoveMarkdown(truncateText(post.content as string, 200))
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL as string
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string
  const image = post.image
  const url = `${siteUrl}/${locale}/blog/${post.slug}`

  const seo: NextSeoProps = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: adminUrl + image?.url,
          secureUrl: adminUrl + image?.url,
          type: image?.mime as string,
          width: image?.width as number,
          height: image?.height as number,
          alt: title,
        },
      ],
    },
  }

  const source = await serialize(post.content || '')

  return {
    props: {
      post,
      source,
      link: url,
      description,
      seo,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
