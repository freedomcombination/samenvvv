import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

export type GetPostQuery = { posts?: IPost[] }

export const GET_POST = gql`
  query getPosts($slug: String!, $locale: String!) {
    posts(where: { slug: $slug, locale: $locale }) {
      id
      slug
      title
      content
      author {
        fullname
        avatar {
          url
        }
      }
      image {
        url
        size
        mime
        width
        height
      }
      views
      likes
      published_at
    }
  }
`

export const getBlogPost = async (
  slug: string,
  locale: CommonLocale,
): Promise<IPost | null> => {
  const data = await graphQLClient.request<GetPostQuery, BaseVariables>(
    GET_POST,
    { slug, locale },
  )

  return data.posts?.[0] ?? null
}
