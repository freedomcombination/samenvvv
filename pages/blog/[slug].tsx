import { useEffect } from 'react'

import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
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
import RemoveMarkdown from 'remove-markdown'

import {
  ChakraNextImage,
  Container,
  Layout,
  Markdown,
  ShareButtons,
} from '@components'
import { useLocaleTimeFormat } from '@hooks'
import { getBlog, getBlogPaths } from '@lib'
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
  blog: BlogEntity
  locale: CommonLocale
}

const Post = ({
  source,
  seo,
  link,
  description,
  blog,
  locale,
}: PostProps): JSX.Element => {
  const { views, likes } = useAppSelector(state => state.blog)
  const dispatch = useAppDispatch()

  const hasLiked = likes.some(id => id === blog?.id)
  const readingTime = getReadingTime(
    blog?.attributes?.content as string,
    locale as CommonLocale,
  )
  const { formattedDate } = useLocaleTimeFormat(
    blog?.attributes?.publishedAt as string,
  )

  const handleLikePost = () => {
    if (hasLiked) dispatch(unlikePost(blog))
    else dispatch(likePost(blog))
  }

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (blog?.attributes?.content) {
      const isViewed = views.some(id => id === blog?.id)

      if (!isViewed) {
        timer = setTimeout(() => {
          dispatch(viewPost(blog))
        }, 10000)
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [dispatch, views, blog])

  return (
    <Layout seo={seo}>
      <Container maxW="container.md">
        <Stack py={8} spacing={8}>
          <Heading textAlign="center">{blog?.attributes?.title}</Heading>
          <Wrap
            justify={{ base: 'center', md: 'space-between' }}
            color="gray.500"
            textTransform="capitalize"
            spacing={4}
          >
            <Wrap spacing={4} justify="center">
              <HStack>
                <HStack>
                  <Icon as={FaCalendarDay} />
                  <Text>{formattedDate}</Text>
                </HStack>
                <HStack>
                  <Icon as={FaClock} />
                  <Text>{readingTime}</Text>
                </HStack>
              </HStack>
              <HStack>
                <HStack>
                  <Box as={FaEye} />
                  <Text>{blog?.attributes?.views}</Text>
                </HStack>
                <HStack>
                  <Box as={AiFillHeart} />
                  <Text>{blog?.attributes?.likes}</Text>
                </HStack>
              </HStack>
            </Wrap>
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
              <ShareButtons
                title={blog?.attributes?.title as string}
                url={link}
                quote={description}
              />
            </HStack>
          </Wrap>
          {blog?.attributes?.image?.data && (
            <ChakraNextImage ratio="twitter" image={blog?.attributes?.image} />
          )}
          {source && <Markdown source={source} />}
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
  const locale = context.locale as CommonLocale
  const slug = context.params?.slug as string

  const data = await getBlog({ slug, locale })

  const blog = data?.blogs?.data?.[0]

  if (!blog?.attributes) {
    return { notFound: true }
  }

  const title = blog?.attributes?.title
  const description =
    blog?.attributes?.content &&
    RemoveMarkdown(truncateText(blog?.attributes?.content || '', 200))
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL as string
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string
  const image = blog?.attributes?.image.data?.attributes
  const url = `${siteUrl}/${locale}/blog/${blog?.attributes?.slug}`

  const seo: NextSeoProps = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      article: {
        authors: [
          blog?.attributes?.author?.data?.attributes?.fullname as string,
        ],
      },
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

  const source = await serialize(blog?.attributes?.content || '')

  return {
    props: {
      source,
      link: url,
      description,
      locale,
      blog,
      seo,
      ...(await serverSideTranslations(locale as CommonLocale, ['common'])),
    },
    revalidate: 120,
  }
}
