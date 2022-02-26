import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { fetcher } from '../graphql-client'

export type GetBlogQueryVariables = {
  locale: CommonLocale
  slug: string
}

export type GetBlogQuery = {
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

export const GetBlogDocument = gql`
  query getBlog($locale: I18NLocaleCode!, $slug: String!) {
    blogs(locale: $locale, filters: { slug: { eq: $slug } }) {
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

export const getBlog = async (variables: GetBlogQueryVariables) =>
  fetcher<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, variables)

export const useGetBlogQuery = <TData = GetBlogQuery, TError = unknown>(
  slug: string,
) => {
  const router = useRouter()
  return useQuery<GetBlogQuery, TError, TData>(
    ['getBlog', router.locale, slug],
    () => getBlog({ slug, locale: router.locale as CommonLocale }),
  )
}
