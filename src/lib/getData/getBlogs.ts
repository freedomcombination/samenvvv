import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetBlogsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']
}>

export type GetBlogsQuery = {
  __typename?: 'Query'
  blogs?: {
    __typename?: 'BlogEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Blog'
        slug: string
        title: string
        content: string
        views?: number | null
        likes?: number | null
        publishedAt?: any | null
        author?: {
          __typename?: 'UsersPermissionsUserEntityResponse'
          data?: {
            __typename?: 'UsersPermissionsUserEntity'
            attributes?: {
              __typename?: 'UsersPermissionsUser'
              fullname?: string
              avatar?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: { __typename?: 'UploadFile'; url: string } | null
                } | null
              } | null
            } | null
          } | null
        } | null
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
      } | null
    }>
  } | null
}

export const GetBlogsDocument = gql`
  query getBlogs($locale: I18NLocaleCode!) {
    blogs(locale: $locale) {
      data {
        id
        attributes {
          slug
          title
          content
          author {
            data {
              attributes {
                fullname
                avatar {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
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
          views
          likes
          publishedAt
        }
      }
    }
  }
`

export const getBlogs = async (variables: GetBlogsQueryVariables) =>
  fetcher<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, variables)

export const useGetBlogsQuery = <TData = GetBlogsQuery, TError = unknown>(
  variables: GetBlogsQueryVariables,
) =>
  useQuery<GetBlogsQuery, TError, TData>(['getBlogs', variables], () =>
    getBlogs(variables),
  )
