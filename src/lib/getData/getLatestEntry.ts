import { compareDesc } from 'date-fns'
import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { getRoute } from '@utils'

import { fetcher } from '../graphql-client'

export type GetLatestEntryQueryVariables = {
  locale: CommonLocale
}

export type GetLatestEntryQuery = {
  __typename?: 'Query'
  blogs?: {
    __typename?: 'BlogEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogEntity'
      attributes?: {
        __typename?: 'Blog'
        title: string
        content: string
        slug: string
        date?: any | null
      } | null
    }>
  } | null
  announcements?: {
    __typename?: 'AnnouncementEntityResponseCollection'
    data: Array<{
      __typename?: 'AnnouncementEntity'
      attributes?: {
        __typename?: 'Announcement'
        title: string
        content: string
        date: any
        slug: string
      } | null
    }>
  } | null
  hashtags?: {
    __typename?: 'HashtagEntityResponseCollection'
    data: Array<{
      __typename?: 'HashtagEntity'
      attributes?: {
        __typename?: 'Hashtag'
        title: string
        content: string
        date: any
        slug: string
      } | null
    }>
  } | null
}

export const GetLatestEntryDocument = gql`
  query getLatestEntry($locale: I18NLocaleCode) {
    blogs(
      locale: $locale
      sort: "publishedAt:desc"
      pagination: { start: 0, limit: 1 }
    ) {
      data {
        attributes {
          title
          content
          slug
          date: publishedAt
        }
      }
    }
    announcements(
      locale: $locale
      sort: "date:desc"
      pagination: { start: 0, limit: 1 }
    ) {
      data {
        attributes {
          title
          content
          date
          slug
        }
      }
    }
    hashtags(
      locale: $locale
      sort: "date:desc"
      pagination: { start: 0, limit: 1 }
    ) {
      data {
        attributes {
          title
          content
          date
          slug
        }
      }
    }
  }
`

export const getLatestEntry = async (
  variables?: GetLatestEntryQueryVariables,
) => {
  const data = await fetcher<GetLatestEntryQuery, GetLatestEntryQueryVariables>(
    GetLatestEntryDocument,
    variables,
  )

  const blogData = data.blogs?.data?.[0]?.attributes ?? null
  const hashtagData = data.hashtags?.data?.[0]?.attributes ?? null
  const announcementData = data.announcements?.data?.[0]?.attributes ?? null

  const announcement = {
    ...announcementData,
    link: `${getRoute('announcement', variables?.locale as CommonLocale)}/${
      announcementData?.slug
    }`,
  }

  const blog = {
    ...blogData,
    link: `blog/${blogData?.slug}`,
  }

  const hashtag = {
    ...hashtagData,
    link: `${getRoute('hashtag', variables?.locale as CommonLocale)}/${
      hashtagData?.slug
    }`,
  }

  const latest = [blog, hashtag, announcement].sort((a, b) =>
    compareDesc(new Date(a?.date), new Date(b?.date)),
  )[0]

  return latest
}

export const useGetLatestEntryQuery = <
  TData =
    | GetLatestEntryQuery['announcements']
    | GetLatestEntryQuery['blogs']
    | GetLatestEntryQuery['hashtags'],
  TError = unknown,
>() => {
  const { locale } = useRouter()
  return useQuery<any, TError, TData>(['getLatestEntry', locale], () =>
    getLatestEntry({ locale: locale as CommonLocale }),
  )
}
