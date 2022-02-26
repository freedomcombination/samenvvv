import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetHashtagsQueryVariables = {
  locale: CommonLocale
}

export type GetHashtagsQuery = {
  __typename?: 'Query'
  hashtags?: {
    __typename?: 'HashtagEntityResponseCollection'
    data: Array<{
      __typename?: 'HashtagEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Hashtag'
        slug: string
        title: string
        content: string
        date: any
        tweets?: any | null
        locale?: string | null
        hashtag: string | null
        hashtag_extra: string | null
        image: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              size: number
              mime: string
              width?: number | null
              height?: number | null
            } | null
          } | null
        }
        posts?: {
          __typename?: 'HashtagPostRelationResponseCollection'
          data: Array<{
            __typename?: 'HashtagPostEntity'
            attributes?: {
              __typename?: 'HashtagPost'
              slug: string
              text: string
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
        localizations?: {
          __typename?: 'HashtagRelationResponseCollection'
          data: Array<{
            __typename?: 'HashtagEntity'
            attributes?: {
              __typename?: 'Hashtag'
              slug: string
              locale?: string | null
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export const GetHashtagsDocument = gql`
  query getHashtags($locale: I18NLocaleCode!) {
    hashtags(locale: $locale, sort: "date:desc") {
      data {
        id
        attributes {
          slug
          title
          content
          date
          tweets
          hashtag
          hashtag_extra
          image {
            data {
              attributes {
                url
                size
                mime
                width
                height
              }
            }
          }
          posts {
            data {
              attributes {
                slug
                text
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
          locale
          localizations {
            data {
              attributes {
                slug
                locale
              }
            }
          }
        }
      }
    }
  }
`

export const getHashtags = async (variables: GetHashtagsQueryVariables) =>
  fetcher<GetHashtagsQuery, GetHashtagsQueryVariables>(
    GetHashtagsDocument,
    variables,
  )

export const useGetHashtagsQuery = <TData = GetHashtagsQuery, TError = unknown>(
  variables: GetHashtagsQueryVariables,
) =>
  useQuery<GetHashtagsQuery, TError, TData>(['getHashtags', variables], () =>
    getHashtags(variables),
  )
