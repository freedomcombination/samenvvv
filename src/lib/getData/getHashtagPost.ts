import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetHashtagPostQueryVariables = {
  locale: CommonLocale
  slug?: string
}

export type GetHashtagPostQuery = {
  __typename?: 'Query'
  hashtagPosts?: {
    __typename?: 'HashtagPostEntityResponseCollection'
    data: Array<{
      __typename?: 'HashtagPostEntity'
      attributes?: {
        __typename?: 'HashtagPost'
        slug: string
        text: string
        locale?: string | null
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
        hashtag?: {
          __typename?: 'HashtagEntityResponse'
          data?: {
            __typename?: 'HashtagEntity'
            attributes?: {
              __typename?: 'Hashtag'
              slug: string
              hashtag: string
              hashtag_extra?: string | null
              title: string
              content: string
              date: any
              tweets?: any | null
            } | null
          } | null
        } | null
        localizations?: {
          __typename?: 'HashtagPostRelationResponseCollection'
          data: Array<{
            __typename?: 'HashtagPostEntity'
            attributes?: {
              __typename?: 'HashtagPost'
              slug: string
              locale?: string | null
              hashtag?: {
                __typename?: 'HashtagEntityResponse'
                data?: {
                  __typename?: 'HashtagEntity'
                  attributes?: { __typename?: 'Hashtag'; slug: string } | null
                } | null
              } | null
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export const GetHashtagPostDocument = gql`
  query getHashtagPost($locale: I18NLocaleCode!, $slug: String!) {
    hashtagPosts(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          slug
          text
          locale
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
          hashtag {
            data {
              attributes {
                slug
                hashtag
                hashtag_extra
                title
                content
                date
                tweets
              }
            }
          }
          localizations {
            data {
              attributes {
                slug
                locale
                hashtag {
                  data {
                    attributes {
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const getHashtagPost = async (variables: GetHashtagPostQueryVariables) =>
  fetcher<GetHashtagPostQuery, GetHashtagPostQueryVariables>(
    GetHashtagPostDocument,
    variables,
  )

export const useGetHashtagPostQuery = <
  TData = GetHashtagPostQuery,
  TError = unknown,
>(
  variables: GetHashtagPostQueryVariables,
) =>
  useQuery<GetHashtagPostQuery, TError, TData>(
    ['getHashtagPost', variables],
    () => getHashtagPost(variables),
  )
