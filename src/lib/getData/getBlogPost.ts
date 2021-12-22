import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

export type GetPostQuery = { posts?: IPost[] }

export const GET_POST = gql`
  query getPosts($slug: String, $locale: String) {
    posts(where: { slug: $slug, locale: $locale }) {
      slug
      title
      content
      image {
        url
        size
        mime
        width
        height
      }
      published_at
    }
  }
`

export const getBlogPost = async (
  slug: string,
  locale: string,
): Promise<IPost | null> => {
  const data = await graphQLClient.request<GetPostQuery, BaseVariables>(
    GET_POST,
    { slug, locale },
  )

  return data.posts?.[0] ?? null
}
