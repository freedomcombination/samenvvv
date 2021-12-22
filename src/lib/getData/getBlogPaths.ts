import { gql } from 'graphql-request'

import { graphQLClient } from '../graphql-client'

type GetBlogPathsQuery = { posts?: IPost[] }

type PathsType = {
  params: { slug: string }
  locale: string
}

const GET_BLOG_PATHS = gql`
  query getBlogPaths {
    posts {
      slug
      locale
    }
  }
`

export const getBlogPaths = async (): Promise<PathsType[]> => {
  const data = await graphQLClient.request<GetBlogPathsQuery, BaseVariables>(
    GET_BLOG_PATHS,
  )
  return (
    data.posts?.map(post => ({
      params: { slug: post.slug },
      locale: post.locale,
    })) || []
  )
}
