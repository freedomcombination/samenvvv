import { useEffect } from 'react'

import { Box, Flex, Heading, HStack, Spinner, Text } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { FaEye } from 'react-icons/fa'
import { dehydrate, QueryClient } from 'react-query'
import RemoveMarkdown from 'remove-markdown'

import {
  ChakraNextImage,
  Container,
  Layout,
  Markdown,
  PageTimeLabel,
  ShareButtons,
  SubpageSidebarTabs,
} from '@components'
import { getAnnouncement, getAnnouncementPaths, getAnnouncements } from '@lib'
import { useAppDispatch, useAppSelector, viewAnnouncement } from '@store'
import { truncateText } from '@utils'

interface AnnouncementProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  seo: NextSeoProps
  link: string
  description: string
  slug: string
  announcement: AnnouncementEntity
  announcements: AnnouncementEntity[]
  popularAnnouncements: AnnouncementEntity[]
  id: string
  locale: CommonLocale
}

const Announcement = ({
  source,
  seo,
  link,
  announcement,
  announcements,
  popularAnnouncements,
  id,
}: AnnouncementProps) => {
  const dispatch = useAppDispatch()

  const { views } = useAppSelector(state => state.announcement)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (announcement.attributes?.content) {
      const isViewed = views.some(_id => _id === id)

      if (!isViewed) {
        timer = setTimeout(() => {
          if (
            announcement.attributes?.views === 0 ||
            (announcement.attributes?.views &&
              isNaN(announcement.attributes?.views))
          ) {
            dispatch(
              viewAnnouncement({
                id: announcement.id as string,
                views: announcement.attributes.views + 1,
              }),
            )
          }
        }, 5000)
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [announcement, dispatch, views, id])

  if (!announcement.attributes) return <Spinner />

  return (
    <Layout seo={seo}>
      <Container>
        <Flex py={4}>
          <Flex flexDir="column" flex={1}>
            {announcement.attributes.image?.data?.attributes && (
              <ChakraNextImage
                h="300px"
                image={announcement.attributes.image}
              />
            )}
            <HStack justify="space-between" align="center" mt={4} spacing={8}>
              <PageTimeLabel pageData={announcement} />
              <HStack>
                <HStack display={{ base: 'none', sm: 'flex' }}>
                  <Box as={FaEye} />
                  <Text>{announcement.attributes.views}</Text>
                </HStack>
                <ShareButtons
                  title={announcement.attributes.title}
                  quote={announcement.attributes.content}
                  url={link}
                />
              </HStack>
            </HStack>
            <Heading my={4}>{announcement.attributes.title}</Heading>
            <Box flex={1}>{source && <Markdown source={source} />}</Box>
          </Flex>

          {(announcements || popularAnnouncements) && (
            <Box ml={8} w="350px" display={{ base: 'none', md: 'inherit' }}>
              <SubpageSidebarTabs
                announcements={announcements}
                popular={popularAnnouncements}
              />
            </Box>
          )}
        </Flex>
      </Container>
    </Layout>
  )
}

export default Announcement

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAnnouncementPaths()

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as CommonLocale
  const slug = context.params?.slug as string
  const queryClient = new QueryClient()

  const announcementData = await getAnnouncement({ slug, locale })
  const announcementsData = await getAnnouncements({ locale, limit: 5 })
  const popularAnnouncementsData = await getAnnouncements({
    locale,
    limit: 5,
    sort: 'date:desc',
  })

  const announcement = announcementData?.announcements?.data?.[0]
  const announcements = announcementsData?.announcements?.data
  const popularAnnouncements = popularAnnouncementsData?.announcements?.data

  if (!announcement?.attributes) {
    return { notFound: true }
  }

  const title = announcement.attributes.title
  const description =
    announcement.attributes?.content &&
    RemoveMarkdown(truncateText(announcement.attributes.content, 200))
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL as string
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string
  const image = announcement.attributes?.image.data?.attributes
  const url = `${siteUrl}/${locale}/blog/${announcement.attributes?.slug}`

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

  const source = await serialize(announcement.attributes?.content || '')

  return {
    props: {
      source,
      link: url,
      description,
      slug,
      locale,
      seo,
      announcement,
      announcements,
      popularAnnouncements,
      id: announcementData?.announcements?.data?.[0]?.id,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale as CommonLocale, ['common'])),
    },
    revalidate: 120,
  }
}
