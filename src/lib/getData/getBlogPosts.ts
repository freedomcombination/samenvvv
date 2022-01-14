import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

export type GetPostsQuery = { posts?: IPost[] }

export const GET_POSTS = gql`
  query getPosts($locale: String) {
    posts(where: { locale: $locale }, sort: "published_at:desc") {
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
      }
      views
      likes
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

export const useBlogPosts = (): UseQueryResult<IPost[] | null> => {
  const { locale } = useRouter()
  return useQuery({
    queryKey: ['posts', [locale]],
    queryFn: () => getBlogPosts(locale as string),
  })
}
