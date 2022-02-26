import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetHomepageDataQueryVariables = {
  locale?: CommonLocale
}

export type GetHomepageDataQuery = {
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
        publishedAt?: any | null
        author?: {
          __typename?: 'UsersPermissionsUserEntityResponse'
          data?: {
            __typename?: 'UsersPermissionsUserEntity'
            attributes?: {
              __typename?: 'UsersPermissionsUser'
              username: string
            } | null
          } | null
        } | null
        image: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        }
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
        date_end?: any | null
        slug: string
        image: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        }
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
        image: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        }
      } | null
    }>
  } | null
}

export const GetHomepageDataDocument = gql`
  query getHomepageData($locale: I18NLocaleCode) {
    blogs(
      locale: $locale
      sort: "publishedAt:desc"
      pagination: { start: 0, limit: 5 }
    ) {
      data {
        attributes {
          title
          content
          slug
          publishedAt
          author {
            data {
              attributes {
                username
              }
            }
          }
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    announcements(
      locale: $locale
      sort: "date:desc"
      pagination: { start: 0, limit: 5 }
    ) {
      data {
        attributes {
          title
          content
          date
          date_end
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    hashtags(
      locale: $locale
      sort: "date:desc"
      pagination: { start: 0, limit: 5 }
    ) {
      data {
        attributes {
          title
          content
          date
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`

export const getHomepageData = async (
  variables?: GetHomepageDataQueryVariables,
) =>
  fetcher<GetHomepageDataQuery, GetHomepageDataQueryVariables>(
    GetHomepageDataDocument,
    variables,
  )

export const useGetHomepageDataQuery = <
  TData = GetHomepageDataQuery,
  TError = unknown,
>() => {
  const router = useRouter()

  return useQuery<GetHomepageDataQuery, TError, TData>(
    ['getHomepageData', router.locale],
    () => getHomepageData({ locale: router.locale as CommonLocale }),
  )
}
