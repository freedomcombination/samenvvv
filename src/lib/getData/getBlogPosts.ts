import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

export type GetPostsQuery = { posts?: IPost[] }

export const GET_POSTS = gql`
  query getPosts($locale: String) {
    posts(where: { locale: $locale }) {
      slug
      title
      content
      image {
        url
      }
      published_at
    }
  }
`

export const getBlogPosts = async (locale: string): Promise<IPost[] | null> => {
  const data = await graphQLClient.request<GetPostsQuery, BaseVariables>(
    GET_POSTS,
    { locale },
  )
  return data.posts ?? null
}
