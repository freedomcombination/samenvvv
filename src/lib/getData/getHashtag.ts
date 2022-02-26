import { gql } from 'graphql-request'
import { useQuery, UseQueryOptions } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetHashtagQueryVariables = {
  locale: CommonLocale
  slug?: string
}

export type GetHashtagQuery = {
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

export const GetHashtagDocument = gql`
  query getHashtag($locale: I18NLocaleCode!, $slug: String) {
    hashtags(
      locale: $locale
      sort: "date:desc"
      filters: { slug: { eq: $slug } }
    ) {
      data {
        id
        attributes {
          slug
          title
          content
          date
          tweets
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

export const getHashtag = async (variables: GetHashtagQueryVariables) =>
  fetcher<GetHashtagQuery, GetHashtagQueryVariables>(
    GetHashtagDocument,
    variables,
  )

export const useGetHashtagQuery = <TData = GetHashtagQuery, TError = unknown>(
  variables: GetHashtagQueryVariables,
  options?: UseQueryOptions<GetHashtagQuery, TError, TData>,
) =>
  useQuery<GetHashtagQuery, TError, TData>(
    ['getHashtag', variables],
    () => getHashtag(variables),
    options,
  )
