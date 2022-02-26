import { gql } from 'graphql-request'

import { fetcher } from '../graphql-client'

export type GetHashtagPostPathsQuery = {
  __typename?: 'Query'
  hashtagPosts?: {
    __typename?: 'HashtagPostEntityResponseCollection'
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

export const GetHashtagPostPathsDocument = gql`
  query getHashtagPostPaths {
    hashtagPosts {
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

const hashtagPostsToParams = (
  posts: GetHashtagPostPathsQuery['hashtagPosts'],
) => {
  if (!posts?.data)
    return [{ params: { slug: ['', ''] }, locale: 'en' as CommonLocale }]

  return posts?.data.flatMap(({ attributes: post }) => {
    const localizations = post?.localizations?.data || [{ attributes: null }]

    return [
      {
        params: {
          slug: [post?.hashtag?.data?.attributes?.slug || '', post?.slug || ''],
        },
        locale: post?.locale as CommonLocale,
      },
      ...localizations.flatMap(({ attributes: post }) => [
        {
          params: {
            slug: [
              post?.hashtag?.data?.attributes?.slug || '',
              post?.slug || '',
            ],
          },
          locale: post?.locale as CommonLocale,
        },
      ]),
    ]
  })
}

export const getHashtagPostPaths = async () => {
  const data = await fetcher<GetHashtagPostPathsQuery, null>(
    GetHashtagPostPathsDocument,
  )

  return hashtagPostsToParams(data.hashtagPosts)
}
