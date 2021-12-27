import { useEffect } from 'react'

import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { AiFillHeart } from 'react-icons/ai'
import { FaCalendarDay, FaClock, FaEye } from 'react-icons/fa'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import RemoveMarkdown from 'remove-markdown'

import {
  ChakraNextImage,
  Container,
  Layout,
  Markdown,
  ShareButtons,
} from '@components'
import { useLocaleTimeFormat } from '@hooks'
import { getBlogPaths, getBlogPost } from '@lib'
import {
  likePost,
  unlikePost,
  useAppDispatch,
  useAppSelector,
  viewPost,
} from '@store'
import { getReadingTime, truncateText } from '@utils'

interface PostProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  seo: NextSeoProps
  link: string
  description: string
  slug: string
  locale: string
}

const Post = ({
  source,
  seo,
  link,
  description,
  slug,
  locale,
}: PostProps): JSX.Element => {
  const { data, isLoading, refetch } = useQuery(['post', [locale, slug]], () =>
    getBlogPost(slug, locale),
  )
  const { views, likes } = useAppSelector(state => state.blog)

  const dispatch = useAppDispatch()

  const hasLiked = likes.some(id => id === data?.id)
  const readingTime = getReadingTime(data?.content as string, locale as string)
  const date = useLocaleTimeFormat(data?.published_at as string)

  const handleLikePost = () => {
    if (hasLiked) dispatch(unlikePost(data as IPost))
    else dispatch(likePost(data as IPost))
  }

  useEffect(() => {
    refetch()
  }, [likes, views, refetch])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (data?.content) {
      const isViewed = views.some(id => id === data.id)

      if (!isViewed) {
        timer = setTimeout(() => {
          dispatch(viewPost(data))
        }, 10000)
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [data, dispatch, views])

  if (!data) return <Spinner />

  return (
    <Layout seo={seo} isLoading={isLoading}>
      <Container maxW="container.md">
        <Stack py={8} spacing={8}>
          <Heading textAlign="center">{data.title}</Heading>
          <Wrap
            justify={{ base: 'center', md: 'space-between' }}
            color="gray.500"
            textTransform="capitalize"
            spacing={4}
          >
            <HStack spacing={4}>
              <HStack>
                <Icon as={FaCalendarDay} />
                <Text>{date}</Text>
              </HStack>
              <HStack>
                <Icon as={FaClock} />
                <Text>{readingTime}</Text>
              </HStack>
              <HStack>
                <Box as={FaEye} />
                <Text>{data.views}</Text>
              </HStack>
              <HStack>
                <Box as={AiFillHeart} />
                <Text>{data.likes}</Text>
              </HStack>
            </HStack>
            <HStack>
              <IconButton
                rounded="full"
                size="sm"
                aria-label="like post"
                colorScheme="gray"
                alignSelf="start"
                color={hasLiked ? 'red.400' : 'gray.400'}
                icon={<AiFillHeart />}
                variant="outline"
                onClick={handleLikePost}
              />
              <ShareButtons title={data.title} url={link} quote={description} />
            </HStack>
          </Wrap>
          <ChakraNextImage ratio="twitter" image={data.image} />
          <Markdown source={source} />
        </Stack>
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
  const locale = context.locale as string
  const slug = context.params?.slug as string
  const queryClient = new QueryClient()

  const queryKey = ['post', [locale, slug]]
  const queryFn = () => getBlogPost(slug, locale)

  await queryClient.prefetchQuery(queryKey, queryFn)

  const post = queryClient.getQueryData<IPost>(queryKey)

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
      source,
      link: url,
      description,
      slug,
      locale,
      seo,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
