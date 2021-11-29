import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

import { getLocalizedHashtagPostSlugs } from '../getLocalizedSlugs'

export type GetHashtagPostQuery = { hashtagPosts?: IHashtagPost[] }

export const GET_HASHTAG_POST = gql`
  query getHashtagPosts($locale: String!, $slug: String) {
    hashtagPosts(locale: $locale, where: { slug: $slug }) {
      slug
      text
      locale
      image {
        url
        size
        mime
        width
        height
      }
      hashtag {
        slug
        hashtag
        title
        content
        page {
          slug
        }
      }
      localizations {
        slug
        locale
        hashtag {
          slug
          page {
            slug
          }
        }
      }
    }
  }
`

export const getHashtagPost = async (
  locale: string,
  slug: string,
): Promise<IHashtagPost | null> => {
  const data = await graphQLClient.request<GetHashtagPostQuery, BaseVariables>(
    GET_HASHTAG_POST,
    {
      locale,
      slug,
    },
  )

  const hashtagPost = data.hashtagPosts?.[0]

  if (!hashtagPost) return null

  const slugs = getLocalizedHashtagPostSlugs(hashtagPost)

  return { ...hashtagPost, slugs }
}

export const useHashtagPostQuery = (
  locale: string,
  slug: string,
): UseQueryResult<GetHashtagPostQuery> =>
  useQuery({
    queryKey: ['hashtag-posts', [locale, slug]],
    queryFn: () => getHashtagPost(locale, slug),
  })
