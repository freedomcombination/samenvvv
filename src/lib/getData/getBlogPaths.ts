import { gql } from 'graphql-request'

import { fetcher } from '../graphql-client'

export type GetBlogPathsQuery = {
  __typename?: 'Query'
  blogs?: {
    __typename?: 'BlogEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogEntity'
      attributes?: {
        __typename?: 'Blog'
        slug: string
        locale?: string | null
        localizations?: {
          __typename?: 'BlogRelationResponseCollection'
          data: Array<{
            __typename?: 'BlogEntity'
            attributes?: {
              __typename?: 'Blog'
              slug: string
              locale?: string | null
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export const GetBlogPathsDocument = gql`
  query getBlogPaths {
    blogs {
      data {
        attributes {
          slug
          locale
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
        }
      }
    }
  }
`

export const getBlogPaths = async () => {
  const data = await fetcher<GetBlogPathsQuery, null>(GetBlogPathsDocument)

  if (!data.blogs?.data) return [{ params: { slug: '' }, locale: 'en' }]

  return data.blogs?.data.flatMap(({ attributes: blog }) => {
    const localizations = blog?.localizations?.data || [{ attributes: null }]
    return [
      {
        params: {
          slug: blog?.slug || '',
        },
        locale: blog?.locale as CommonLocale,
      },
      ...localizations.flatMap(({ attributes: blog }) => [
        {
          params: {
            slug: blog?.slug || '',
          },
          locale: blog?.locale as CommonLocale,
        },
      ]),
    ]
  })
}
