import { Box, Flex, Heading, HStack, Spinner, Text } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { FaEye } from 'react-icons/fa'
import RemoveMarkdown from 'remove-markdown'

import {
  ChakraNextImage,
  Container,
  Layout,
  Markdown,
  PageTimeLabel,
  ShareButtons,
} from '@components'
import { getAnnouncement, getAnnouncementPaths } from '@lib'
import { truncateText } from '@utils'

interface AnnouncementProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  seo: NextSeoProps
  link: string
  announcement: Announcement
}

const Announcement = ({
  source,
  seo,
  link,
  announcement,
}: AnnouncementProps) => {
  if (!announcement) return <Spinner />

  return (
    <Layout seo={seo}>
      <Container>
        <Flex py={4}>
          <Flex flexDir="column" flex={1}>
            {announcement?.image && (
              <ChakraNextImage h="300px" image={announcement.image.url} />
            )}
            <HStack justify="space-between" align="center" mt={4} spacing={8}>
              <PageTimeLabel pageData={announcement} />
              <HStack>
                <HStack display={{ base: 'none', sm: 'flex' }}>
                  <Box as={FaEye} />
                  <Text>{announcement?.views}</Text>
                </HStack>
                <ShareButtons
                  title={announcement?.title}
                  quote={announcement?.content}
                  url={link}
                />
              </HStack>
            </HStack>
            <Heading my={4}>{announcement?.title}</Heading>
            <Box flex={1}>{source && <Markdown source={source} />}</Box>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  )
}

export default Announcement

export const getStaticPaths: GetStaticPaths = async context => {
  const locales = context.locales as StrapiLocale[]
  const paths = await getAnnouncementPaths(locales)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale

  const slug = context.params?.slug as string

  const announcement = await getAnnouncement(locale, slug)

  if (!announcement) {
    return { notFound: true }
  }

  const title = announcement?.title
  const description =
    announcement?.content &&
    RemoveMarkdown(truncateText(announcement?.content, 200))
  const adminUrl = process.env.NEXT_PUBLIC_API_URL as string
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string
  const image = announcement?.image
  const url = `${siteUrl}/${locale}/blog/${announcement?.slug}`

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

  const source = await serialize(announcement?.content || '')

  return {
    props: {
      source,
      link: url,
      seo,
      announcement,
      ...(await serverSideTranslations(locale as StrapiLocale, ['common'])),
    },
    revalidate: 120,
  }
}
