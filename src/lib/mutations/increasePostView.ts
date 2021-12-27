import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

const INCREASE_VIEW = gql`
  mutation ($id: ID!, $views: Int!) {
    updatePost(input: { where: { id: $id }, data: { views: $views } }) {
      post {
        id
        views
      }
    }
  }
`

export const increasePostView = async (
  post: IPost,
): Promise<Pick<IPost, 'id' | 'views'> | undefined> => {
  if (post?.views == undefined) return

  return graphQLClient.request(INCREASE_VIEW, {
    id: post.id,
    views: post.views + 1,
  })
}
