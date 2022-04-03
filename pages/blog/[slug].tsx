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
  likeBlog,
  unlikeBlog,
  useAppDispatch,
  useAppSelector,
  viewBlog,
} from '@store'
import { getReadingTime } from '@utils'

interface PostProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  seo: NextSeoProps
  link: string
  blog: Blog
  readingTime: string
}

const Post = ({
  source,
  seo,
  link,
  blog,
  readingTime,
}: PostProps): JSX.Element => {
  const { views, likes } = useAppSelector(state => state.blog)

  const dispatch = useAppDispatch()

  const hasLiked = likes.some(id => id === blog.id)

  const { formattedDate } = useLocaleTimeFormat(blog?.publishedAt as string)

  const handleLikeBlog = () => {
    if (hasLiked) dispatch(unlikeBlog(blog as Blog))
    else dispatch(likeBlog(blog as Blog))
  }

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (blog?.content) {
      const isViewed = views.some(id => id === blog.id)

      if (!isViewed) {
        timer = setTimeout(() => {
          dispatch(viewBlog(blog))
        }, 10000)
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [blog, dispatch, views])

  if (!blog) return <Spinner />

  return (
    <Layout seo={seo}>
      <Container maxW="container.md">
        <Stack py={8} spacing={8}>
          <Heading textAlign="center">{blog.title}</Heading>
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
                  <Text>{blog.views}</Text>
                </HStack>
                <HStack>
                  <Box as={AiFillHeart} />
                  <Text>{blog.likes}</Text>
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
                onClick={handleLikeBlog}
              />
              <ShareButtons
                title={blog.title}
                url={link}
                quote={blog.description}
              />
            </HStack>
          </Wrap>
          <ChakraNextImage ratio="twitter" image={blog.image} />
          <Markdown source={source} />
        </Stack>
      </Container>
    </Layout>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async context => {
  const paths = await getBlogPaths(context.locales as StrapiLocale[])

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale

  const slug = context.params?.slug as string

  const blog = await getBlog(locale, slug)

  if (!blog) return { notFound: true }

  const title = blog.title
  const description = blog.description
  const adminUrl = process.env.NEXT_PUBLIC_API_URL as string
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string
  const image = blog.image
  const url = `${siteUrl}/${locale}/blog/${blog.slug}`

  const readingTime = getReadingTime(
    blog?.content as string,
    locale as StrapiLocale,
  )

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

  const source = await serialize(blog.content || '')

  return {
    props: {
      source,
      link: url,
      blog,
      readingTime,
      seo,
      ...(await serverSideTranslations(locale as StrapiLocale, ['common'])),
    },
    revalidate: 120,
  }
}
