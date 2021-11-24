import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

export type GetHashtagQuery = { hashtagPosts?: IHashtagPost[] }

export const GET_HASHTAG_POSTS = gql`
  query getPosts($locale: String!, $slug: String) {
    hashtagPosts(locale: $locale, where: { hashtag: { slug: $slug } }) {
      id
      slug
      locale
      image {
        url
        size
        mime
        width
        height
      }
      locale
      localizations {
        slug
        locale
      }
    }
  }
`

export const getHashtagPosts = async (
  locale: string,
  slug: string,
): Promise<IHashtagPost[] | null> => {
  const data = await graphQLClient.request<GetHashtagQuery, BaseVariables>(
    GET_HASHTAG_POSTS,
    {
      locale,
      slug,
    },
  )

  return data.hashtagPosts ?? null
}
