import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

const DECREASE_LIKE = gql`
  mutation ($id: ID!, $likes: Int!) {
    updatePost(input: { where: { id: $id }, data: { likes: $likes } }) {
      post {
        id
        likes
      }
    }
  }
`

export const decreasePostLike = async (
  post: IPost,
): Promise<Pick<IPost, 'id' | 'likes'> | undefined> => {
  if (post?.likes == undefined) return

  return graphQLClient.request(DECREASE_LIKE, {
    id: post.id,
    likes: post.likes - 1,
  })
}
